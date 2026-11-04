import { authApi, apiRequest, AuthApiError } from './auth-api'
import type { AuthUser, LoginTokens } from './auth-api'

const SESSION_KEY = 'lfc.auth.v1'
const SESSION_EVENT = 'lfc:auth-session-changed'
let version = 0
let epoch = 0

// sessionStorage survives reloads in this tab. It never contains passwords.
export function getAuthSession(): LoginTokens | null {
  try {
    const value: unknown = JSON.parse(window.sessionStorage.getItem(SESSION_KEY) ?? 'null')
    if (
      value &&
      typeof value === 'object' &&
      'accessToken' in value &&
      'refreshToken' in value &&
      typeof value.accessToken === 'string' &&
      value.accessToken &&
      typeof value.refreshToken === 'string' &&
      value.refreshToken
    ) {
      return { accessToken: value.accessToken, refreshToken: value.refreshToken }
    }
  } catch {
    /* Unavailable or corrupted storage is treated as an anonymous session. */
  }
  return null
}

export function getAuthSessionSnapshot(): string | null {
  const tokens = getAuthSession()
  return tokens ? JSON.stringify(tokens) : null
}

export function getAuthSessionVersion(): number {
  return version
}
export function getAuthSessionEpoch(): number {
  return epoch
}

function changed() {
  version++
  window.dispatchEvent(new Event(SESSION_EVENT))
}

export function saveAuthSession(tokens: LoginTokens, options: { refresh?: boolean } = {}): void {
  if (!tokens.accessToken || !tokens.refreshToken)
    throw new Error('로그인 응답이 올바르지 않습니다.')
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(tokens))
  } catch {
    throw new Error('로그인 정보를 저장할 수 없습니다. 브라우저 저장소 설정을 확인해 주세요.')
  }
  if (!options.refresh) epoch++
  changed()
}

export function clearAuthSession(): void {
  try {
    window.sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* If storage is inaccessible, it cannot supply a usable session. */
  } finally {
    epoch++
    changed()
  }
}

export function subscribeAuthSession(listener: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key === SESSION_KEY || event.key === null) {
      version++
      epoch++
      listener()
    }
  }
  window.addEventListener(SESSION_EVENT, listener)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(SESSION_EVENT, listener)
    window.removeEventListener('storage', onStorage)
  }
}

let refreshing: { version: number; promise: Promise<LoginTokens> } | null = null
let loggingOut: Promise<void> | null = null

function expiredSession(): AuthApiError {
  return new AuthApiError(
    '로그인이 만료됐습니다. 다시 로그인해 주세요.',
    401,
    'AUTH_SESSION_EXPIRED',
  )
}

function accessExpiresSoon(token: string): boolean {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const value: unknown = JSON.parse(atob(payload))
    return (
      !value ||
      typeof value !== 'object' ||
      !('exp' in value) ||
      typeof value.exp !== 'number' ||
      value.exp * 1000 <= Date.now() + 30000
    )
  } catch {
    return true
  }
}

export function refreshAuthSession(): Promise<LoginTokens> {
  const tokens = getAuthSession()
  if (!tokens) return Promise.reject(expiredSession())
  const version = getAuthSessionVersion()
  if (refreshing?.version === version) return refreshing.promise
  const promise = (async () => {
    try {
      const next = await authApi.refresh(tokens.refreshToken)
      if (
        getAuthSessionVersion() !== version ||
        getAuthSession()?.refreshToken !== tokens.refreshToken
      )
        throw expiredSession()
      saveAuthSession(next, { refresh: true })
      return next
    } catch (error) {
      if (
        error instanceof AuthApiError &&
        error.status === 401 &&
        getAuthSessionVersion() === version
      )
        clearAuthSession()
      throw error
    } finally {
      if (refreshing?.version === version) refreshing = null
    }
  })()
  refreshing = { version, promise }
  return promise
}

async function validTokens(): Promise<LoginTokens> {
  const tokens = getAuthSession()
  if (!tokens) throw expiredSession()
  return accessExpiresSoon(tokens.accessToken) ? refreshAuthSession() : tokens
}

// Same-origin backend paths only. At most one retry is made after a 401.
export async function authenticatedRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (loggingOut) throw expiredSession()
  const epoch = getAuthSessionEpoch()
  let tokens = await validTokens()
  if (getAuthSessionEpoch() !== epoch) throw expiredSession()
  const send = (accessToken: string) => {
    const headers = new Headers(options.headers)
    headers.set('Authorization', 'Bearer ' + accessToken)
    return apiRequest<T>(path, { ...options, headers })
  }
  let result: T
  try {
    result = await send(tokens.accessToken)
  } catch (error) {
    if (!(error instanceof AuthApiError) || error.status !== 401) throw error
    if (getAuthSessionEpoch() !== epoch) throw expiredSession()
    const current = getAuthSession()
    if (!current) throw expiredSession()
    tokens = current.accessToken !== tokens.accessToken ? current : await refreshAuthSession()
    try {
      result = await send(tokens.accessToken)
    } catch (retryError) {
      if (
        retryError instanceof AuthApiError &&
        retryError.status === 401 &&
        getAuthSessionEpoch() === epoch &&
        getAuthSession()?.accessToken === tokens.accessToken
      )
        clearAuthSession()
      throw retryError
    }
  }
  if (getAuthSessionEpoch() !== epoch) throw expiredSession()
  return result
}

export function getCurrentAuthUser(): Promise<AuthUser> {
  return authenticatedRequest<AuthUser>('/auth/me')
}

export async function loginSession(username: string, password: string): Promise<void> {
  if (loggingOut) await loggingOut.catch(() => undefined)
  clearAuthSession()
  const version = getAuthSessionVersion()
  const tokens = await authApi.login(username, password)
  if (getAuthSessionVersion() !== version) throw expiredSession()
  saveAuthSession(tokens)
}

export function logoutSession(): Promise<void> {
  if (loggingOut) return loggingOut
  const task = (async () => {
    await Promise.resolve()
    try {
      if (refreshing) await refreshing.promise
      if (!getAuthSession()) return
      let tokens = await validTokens()
      try {
        await authApi.logout(tokens.accessToken)
      } catch (error) {
        if (!(error instanceof AuthApiError) || error.status !== 401) throw error
        tokens = await refreshAuthSession()
        await authApi.logout(tokens.accessToken)
      }
    } catch (error) {
      if (!(error instanceof AuthApiError) || error.status !== 401) throw error
    } finally {
      clearAuthSession()
      loggingOut = null
    }
  })()
  loggingOut = task
  return task
}

export function loginDestination(state: unknown): string {
  const from = state && typeof state === 'object' && 'from' in state ? state.from : null
  if (
    typeof from !== 'string' ||
    !from.startsWith('/') ||
    from.startsWith('//') ||
    from.includes('\\') ||
    /^\/(login|signup|logout)(?:[/?#]|$)/.test(from)
  )
    return '/day/1'
  return from
}

export class AuthApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message)
    this.name = 'AuthApiError'
  }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!path.startsWith('/') || path.startsWith('//'))
    throw new Error('API 경로가 올바르지 않습니다.')
  const base = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')
  let response: Response
  try {
    response = await fetch(base + path, {
      ...options,
      signal: options.signal ?? AbortSignal.timeout(45000),
    })
  } catch {
    throw new AuthApiError('서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.', 0)
  }
  if (response.status === 204) return undefined as T
  const payload: unknown = await response.json().catch(() => null)
  if (!response.ok) {
    const object = payload && typeof payload === 'object' ? payload : null
    const message = object && 'message' in object ? object.message : null
    const code =
      object && 'code' in object && typeof object.code === 'string' ? object.code : undefined
    throw new AuthApiError(
      typeof message === 'string'
        ? message
        : Array.isArray(message)
          ? message.filter((item): item is string => typeof item === 'string').join(' ')
          : '요청을 처리하지 못했습니다.',
      response.status,
      code,
    )
  }
  return payload as T
}

export interface LoginTokens {
  accessToken: string
  refreshToken: string
}
export interface AuthUser {
  id: number
  username: string
  email: string
}
export interface SignupInput {
  username: string
  email: string
  password: string
  verificationToken: string
}

function post<T>(path: string, body: unknown): Promise<T> {
  return apiRequest<T>('/auth/' + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export const authApi = {
  sendEmail: (email: string) =>
    post<{ expiresIn: number; resendAfter: number }>('email/send', { email }),
  verifyEmail: (email: string, code: string) =>
    post<{ verificationToken: string; expiresIn: number }>('email/verify', { email, code }),
  register: (input: SignupInput) => post<AuthUser>('register', input),
  login: (username: string, password: string) => post<LoginTokens>('login', { username, password }),
  refresh: (refreshToken: string) =>
    apiRequest<LoginTokens>('/auth/refresh', {
      method: 'POST',
      headers: { 'x-refresh-token': refreshToken },
    }),
  logout: (accessToken: string) =>
    apiRequest<void>('/auth/logout', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + accessToken },
    }),
}

export function authErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '요청을 처리하지 못했습니다. 다시 시도해 주세요.'
}

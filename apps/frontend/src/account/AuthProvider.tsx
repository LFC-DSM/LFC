import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react'
import type { ReactNode } from 'react'
import type { AuthUser } from './auth-api'
import { authErrorMessage } from './auth-api'
import { getCurrentAuthUser, getAuthSessionSnapshot, subscribeAuthSession } from './auth-session'

export interface AuthState {
  status: 'loading' | 'anonymous' | 'authenticated' | 'error'
  user: AuthUser | null
  error: string | null
  retry: () => void
}
const AuthContext = createContext<AuthState | null>(null)
// eslint-disable-next-line react-refresh/only-export-components -- Context updates intentionally invalidate consumers.
export function useAuth(): AuthState {
  const state = useContext(AuthContext)
  if (!state) throw new Error('AuthProvider가 필요합니다.')
  return state
}

interface Resolution {
  snapshot: string
  user: AuthUser | null
  error: string | null
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribeAuthSession, getAuthSessionSnapshot, () => null)
  const [resolution, setResolution] = useState<Resolution | null>(null)
  const [attempt, setAttempt] = useState(0)
  const retry = useCallback(() => {
    setResolution(null)
    setAttempt((value) => value + 1)
  }, [])

  useEffect(() => {
    if (!snapshot) return
    let active = true
    void getCurrentAuthUser().then(
      (user) => {
        if (active) setResolution({ snapshot, user, error: null })
      },
      (failure: unknown) => {
        if (active) setResolution({ snapshot, user: null, error: authErrorMessage(failure) })
      },
    )
    return () => {
      active = false
    }
  }, [snapshot, attempt])

  const resolved = resolution?.snapshot === snapshot ? resolution : null
  const status = !snapshot
    ? 'anonymous'
    : !resolved
      ? 'loading'
      : resolved.error
        ? 'error'
        : 'authenticated'
  return (
    <AuthContext.Provider
      value={{
        status,
        user: status === 'authenticated' ? (resolved?.user ?? null) : null,
        error: resolved?.error ?? null,
        retry,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

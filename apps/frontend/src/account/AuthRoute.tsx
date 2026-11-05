/** @jsxImportSource @emotion/react */
import type { ReactNode } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { Btn } from '../design/Button'
import { useAuth } from './AuthProvider'
import { loginDestination } from './auth-session'

function AuthCheck() {
  const { status, error, retry } = useAuth()
  return (
    <main className="container">
      <section className="auth panel" aria-busy={status === 'loading'}>
        {status === 'error' ? (
          <>
            <p role="alert">{error}</p>
            <Btn type="button" onClick={retry}>
              다시 연결하기
            </Btn>
            <p>
              <Link to="/logout">로그아웃하고 다시 로그인</Link>
            </p>
          </>
        ) : (
          <p role="status">로그인 상태를 확인하고 있어요.</p>
        )}
      </section>
    </main>
  )
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const auth = useAuth()
  const location = useLocation()
  if (auth.status === 'anonymous')
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search + location.hash }}
      />
    )
  if (auth.status !== 'authenticated') return <AuthCheck />
  return <>{children}</>
}

export function GuestOnly({ children }: { children: ReactNode }) {
  const auth = useAuth()
  const location = useLocation()
  if (auth.status === 'loading') return <AuthCheck />
  if (auth.status === 'authenticated')
    return <Navigate to={loginDestination(location.state)} replace />
  return <>{children}</>
}

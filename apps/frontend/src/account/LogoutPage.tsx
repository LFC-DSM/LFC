import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutSession } from './auth-session'

export default function LogoutPage() {
  const navigate = useNavigate()
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    let active = true
    void logoutSession().then(
      () => {
        if (active) navigate('/login', { replace: true })
      },
      () => {
        if (active) setFailed(true)
      },
    )
    return () => {
      active = false
    }
  }, [navigate])
  return (
    <main className="container">
      <section className="auth panel">
        {failed ? (
          <>
            <p role="alert">이 브라우저에서 로그아웃했지만 서버 연결을 확인하지 못했습니다.</p>
            <Link to="/login">로그인 화면으로 이동</Link>
          </>
        ) : (
          <p role="status">로그아웃하고 있어요.</p>
        )}
      </section>
    </main>
  )
}

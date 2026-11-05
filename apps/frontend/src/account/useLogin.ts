import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { authErrorMessage } from './auth-api'
import { loginSession, loginDestination } from './auth-session'

export function useLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const signupState = location.state as { registered?: boolean; username?: string } | null
  const [username, setUsername] = useState(signupState?.username ?? '')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const busy = useRef(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy.current) return
    busy.current = true
    setPending(true)
    setError('')
    try {
      await loginSession(username, password)
      setPassword('')
      navigate(loginDestination(location.state), { replace: true })
    } catch (failure) {
      setError(authErrorMessage(failure))
    } finally {
      busy.current = false
      setPending(false)
    }
  }

  return { signupState, username, setUsername, password, setPassword, pending, error, submit }
}

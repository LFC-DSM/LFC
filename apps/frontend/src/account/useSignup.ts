import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthApiError, authApi, authErrorMessage } from './auth-api'

type SignupAction = 'send' | 'verify' | 'register'
interface EmailVerification {
  token: string
  email: string
  expiresAt: number
}

export function useSignup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [pending, setPending] = useState<SignupAction | null>(null)
  const busy = useRef(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [clock, setClock] = useState(Date.now)
  const [resendAt, setResendAt] = useState(0)
  const [codeExpiresAt, setCodeExpiresAt] = useState(0)
  const [proof, setProof] = useState<EmailVerification | null>(null)
  const normalizedEmail = email.trim().toLowerCase()
  const verified = proof !== null && proof.email === normalizedEmail && proof.expiresAt > clock
  const resendSeconds = Math.max(0, Math.ceil((resendAt - clock) / 1000))
  const codeSeconds = Math.max(0, Math.ceil((codeExpiresAt - clock) / 1000))
  const proofSeconds = proof ? Math.max(0, Math.ceil((proof.expiresAt - clock) / 1000)) : 0

  const timerActive =
    resendAt > clock || codeExpiresAt > clock || (proof !== null && proof.expiresAt > clock)
  useEffect(() => {
    if (!timerActive) return
    const timer = window.setInterval(() => setClock(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [timerActive])

  async function perform(action: SignupAction, task: () => Promise<void>) {
    if (busy.current) return
    busy.current = true
    setPending(action)
    setError('')
    setNotice('')
    try {
      await task()
    } catch (failure) {
      setError(authErrorMessage(failure))
    } finally {
      busy.current = false
      setPending(null)
      setClock(Date.now())
    }
  }

  function changeEmail(value: string) {
    setEmail(value)
    setCode('')
    setCodeExpiresAt(0)
    setProof(null)
    setError('')
    setNotice('')
  }

  function sendCode() {
    if (Date.now() < resendAt || verified) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('올바른 이메일 주소를 입력해 주세요.')
      return
    }
    void perform('send', async () => {
      setProof(null)
      setCode('')
      setCodeExpiresAt(0)
      let result: { expiresIn: number; resendAfter: number }
      try {
        result = await authApi.sendEmail(normalizedEmail)
      } catch (failure) {
        if (
          failure instanceof AuthApiError &&
          (failure.status === 429 ||
            failure.code === 'AUTH_MAIL_SEND_FAILED' ||
            failure.code === 'AUTH_MAIL_NOT_CONFIGURED')
        )
          setResendAt(Date.now() + 60000)
        throw failure
      }
      const now = Date.now()
      setClock(now)
      setResendAt(now + result.resendAfter * 1000)
      setCodeExpiresAt(now + result.expiresIn * 1000)
      setNotice('인증번호를 보냈습니다. 메일함을 확인해 주세요.')
    })
  }

  function verifyCode() {
    if (Date.now() >= codeExpiresAt) {
      setError('인증번호를 다시 발송해 주세요.')
      return
    }
    if (!/^\d{6}$/.test(code)) {
      setError('인증번호 6자리를 입력해 주세요.')
      return
    }
    void perform('verify', async () => {
      try {
        const result = await authApi.verifyEmail(normalizedEmail, code)
        setProof({
          token: result.verificationToken,
          email: normalizedEmail,
          expiresAt: Date.now() + result.expiresIn * 1000,
        })
        setNotice('이메일 인증이 완료됐습니다.')
      } catch (failure) {
        if (failure instanceof AuthApiError && failure.status === 400)
          setNotice('번호를 확인해 주세요. 5회 실패했거나 만료됐다면 재발송이 필요합니다.')
        throw failure
      }
    })
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    if (!proof || proof.email !== normalizedEmail || proof.expiresAt <= Date.now()) {
      setError('이메일 인증을 먼저 완료해 주세요.')
      return
    }
    if (password !== confirmation) {
      setError('비밀번호가 서로 일치하지 않습니다.')
      return
    }
    if (new TextEncoder().encode(password).length > 72) {
      setError('비밀번호는 UTF-8 기준 72바이트 이하여야 합니다.')
      return
    }
    void perform('register', async () => {
      try {
        const member = await authApi.register({
          username,
          email: normalizedEmail,
          password,
          verificationToken: proof.token,
        })
        navigate('/login', {
          replace: true,
          state: { registered: true, username: member.username },
        })
      } catch (failure) {
        if (
          failure instanceof AuthApiError &&
          (failure.status === 0 ||
            failure.code === 'AUTH_INVALID_EMAIL_VERIFICATION' ||
            failure.status >= 500)
        ) {
          setProof(null)
          setCodeExpiresAt(0)
          setNotice('가입을 다시 진행하려면 이메일을 재인증해 주세요.')
        }
        throw failure
      }
    })
  }

  return {
    username,
    setUsername,
    email,
    changeEmail,
    code,
    setCode,
    password,
    setPassword,
    confirmation,
    setConfirmation,
    pending,
    error,
    notice,
    verified,
    resendSeconds,
    codeSeconds,
    proofSeconds,
    codeExpiresAt,
    proof,
    sendCode,
    verifyCode,
    submit,
  }
}

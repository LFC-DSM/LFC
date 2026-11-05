/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom'
import { Btn } from '../design/Button'
import { eyeBrowCss } from '../design/Eyebrow'
import { useSignup } from './useSignup'

export default function SignupPage() {
  const {
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
  } = useSignup()

  return (
    <section className="auth panel">
      <span css={eyeBrowCss}>WELCOME TO LFC</span>
      <h1>함께 생각하는 즐거움.</h1>
      <p className="sub">나의 질문으로 새로운 토론을 시작하세요.</p>
      <form onSubmit={submit} aria-busy={pending !== null}>
        <fieldset
          disabled={pending !== null}
          css={{
            border: 0,
            margin: 0,
            padding: 0,
            minWidth: 0,
            '& button:disabled': {
              opacity: 0.55,
              cursor: 'not-allowed',
              transform: 'none',
              boxShadow: 'none',
            },
          }}
        >
          <label htmlFor="auth-username">아이디</label>
          <input
            id="auth-username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="영문 소문자, 숫자, 밑줄 4~20자"
            autoComplete="username"
            pattern="[a-z0-9_]{4,20}"
            minLength={4}
            maxLength={20}
            required
          />
          <label htmlFor="auth-email">이메일</label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(event) => changeEmail(event.target.value)}
            placeholder="이메일을 입력하세요"
            autoComplete="email"
            maxLength={255}
            required
          />
          <Btn
            type="button"
            small
            onClick={sendCode}
            disabled={resendSeconds > 0 || verified}
            css={{ marginTop: '10px', width: '100%' }}
          >
            {pending === 'send'
              ? '메일을 보내는 중…'
              : verified
                ? '이메일 인증 완료'
                : resendSeconds > 0
                  ? resendSeconds + '초 후 재발송'
                  : '인증 메일 보내기'}
          </Btn>
          <label htmlFor="auth-code">이메일 인증번호</label>
          <input
            id="auth-code"
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="인증번호 6자리"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            disabled={verified || codeSeconds === 0}
          />
          <Btn
            type="button"
            small
            onClick={verifyCode}
            disabled={verified || codeSeconds === 0 || code.length !== 6}
            css={{ marginTop: '10px', width: '100%' }}
          >
            {pending === 'verify' ? '확인하는 중…' : verified ? '인증 완료' : '인증번호 확인'}
          </Btn>
          {verified ? (
            <p className="sub">
              인증 완료 · {Math.floor(proofSeconds / 60)}분 {proofSeconds % 60}초 안에 가입해
              주세요.
            </p>
          ) : codeExpiresAt > 0 ? (
            <p className="sub">
              {codeSeconds > 0
                ? '인증번호 유효시간 ' +
                  Math.floor(codeSeconds / 60) +
                  ':' +
                  String(codeSeconds % 60).padStart(2, '0')
                : '인증번호가 만료됐습니다. 재발송해 주세요.'}
            </p>
          ) : proof ? (
            <p className="sub">인증이 만료됐습니다. 이메일을 다시 인증해 주세요.</p>
          ) : null}
          <label htmlFor="auth-pw">비밀번호</label>
          <input
            id="auth-pw"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="8자 이상 입력하세요"
            autoComplete="new-password"
            minLength={8}
            maxLength={72}
            required
          />
          <label htmlFor="auth-confirm">비밀번호 확인</label>
          <input
            id="auth-confirm"
            type="password"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            autoComplete="new-password"
            minLength={8}
            maxLength={72}
            required
          />
          <Btn
            type="submit"
            primary
            disabled={!verified}
            css={{ width: '100%', marginTop: '26px' }}
          >
            {pending === 'register' ? '가입하는 중…' : '회원가입'}
          </Btn>
        </fieldset>
        {error ? (
          <p role="alert" css={{ color: '#a62c35', marginTop: '16px' }}>
            {error}
          </p>
        ) : null}
        {notice ? (
          <p role="status" css={{ marginTop: '16px' }}>
            {notice}
          </p>
        ) : null}
      </form>
      <p className="sub" css={{ textAlign: 'center', marginTop: '24px' }}>
        이미 계정이 있나요?{' '}
        <Link css={{ color: 'var(--jade)' }} to="/login">
          로그인
        </Link>
      </p>
    </section>
  )
}

/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom'
import { Btn } from '../design/Button'
import { eyeBrowCss } from '../design/Eyebrow'
import { useLogin } from './useLogin'

export default function LoginPage() {
  const { signupState, username, setUsername, password, setPassword, pending, error, submit } =
    useLogin()

  return (
    <section className="auth panel">
      <span css={eyeBrowCss}>WELCOME TO LFC</span>
      <h1>다시 만나 반가워요.</h1>
      <p className="sub">당신의 생각이 다음 토론을 만듭니다.</p>
      {signupState?.registered ? (
        <p role="status">회원가입이 완료됐습니다. 아이디로 로그인해 주세요.</p>
      ) : null}
      <form
        onSubmit={(event) => {
          void submit(event)
        }}
        aria-busy={pending}
      >
        <fieldset
          disabled={pending}
          css={{
            border: 0,
            margin: 0,
            padding: 0,
            minWidth: 0,
            '& button:disabled': { opacity: 0.55, cursor: 'not-allowed' },
          }}
        >
          <label htmlFor="login-username">아이디</label>
          <input
            id="login-username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="아이디를 입력하세요"
            autoComplete="username"
            pattern="[a-z0-9_]{4,20}"
            minLength={4}
            maxLength={20}
            required
          />
          <label htmlFor="login-pw">비밀번호</label>
          <input
            id="login-pw"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
            minLength={8}
            maxLength={72}
            required
          />
          <Btn type="submit" primary css={{ width: '100%', marginTop: '26px' }}>
            {pending ? '로그인하는 중…' : '로그인'}
          </Btn>
        </fieldset>
        {error ? (
          <p role="alert" css={{ color: '#a62c35', marginTop: '16px' }}>
            {error}
          </p>
        ) : null}
      </form>
      <p className="sub" css={{ textAlign: 'center', marginTop: '24px' }}>
        아직 계정이 없나요?{' '}
        <Link
          css={{
            color: 'var(--deep)',
            fontWeight: 700,
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
          to="/signup"
        >
          회원가입
        </Link>
      </p>
    </section>
  )
}

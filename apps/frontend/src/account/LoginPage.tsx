/** @jsxImportSource @emotion/react */
export default function LoginPage() {
  return (
    <>
      <section className="auth panel">
        <span className="eyebrow">WELCOME TO LFC</span>
        <h1>다시 만나 반가워요.</h1>
        <p className="sub">당신의 생각이 다음 토론을 만듭니다.</p>
        <label htmlFor="auth-email">이메일</label>
        <input
          id="auth-email"
          type="email"
          placeholder="이메일을 입력하세요"
          autoComplete="email"
        />
        <label htmlFor="auth-pw">비밀번호</label>
        <input
          id="auth-pw"
          type="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
        />
        <a className="btn primary" href="?page=home">
          로그인
        </a>
        <p className="sub" css={{ textAlign: 'center', marginTop: '24px' }}>
          아직 계정이 없나요?{' '}
          <a
            css={{
              color: 'var(--deep)',
              fontWeight: 700,
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
            }}
            href="?page=signup"
          >
            회원가입
          </a>
        </p>
      </section>
    </>
  )
}

/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom'
import { Btn, BtnLink } from '../design/Button'

export default function SignupPage() {
  return (
    <>
      <section className="auth panel">
        <span className="eyebrow">WELCOME TO LFC</span>
        <h1>함께 생각하는 즐거움.</h1>
        <p className="sub">나의 질문으로 새로운 토론을 시작하세요.</p>
        <label htmlFor="auth-name">이름</label>
        <input id="auth-name" placeholder="이름을 입력하세요" autoComplete="name" />
        <label htmlFor="auth-email">이메일</label>
        <input
          id="auth-email"
          type="email"
          placeholder="이메일을 입력하세요"
          autoComplete="email"
        />
        <Btn small css={{ marginTop: '10px', width: '100%' }}>
          인증 메일 보내기
        </Btn>
        <label htmlFor="auth-code">이메일 인증번호</label>
        <input id="auth-code" placeholder="인증번호 6자리" inputMode="numeric" />
        <label htmlFor="auth-pw">비밀번호</label>
        <input
          id="auth-pw"
          type="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="new-password"
        />
        <label htmlFor="auth-confirm">비밀번호 확인</label>
        <input
          id="auth-confirm"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          autoComplete="new-password"
        />
        <BtnLink to="/login" css={{ width: '100%', marginTop: '26px' }}>
          회원가입
        </BtnLink>
        <p className="sub" css={{ textAlign: 'center', marginTop: '24px' }}>
          이미 계정이 있나요?{' '}
          <Link css={{ color: 'var(--jade)' }} to="/login">
            로그인
          </Link>
        </p>
      </section>
    </>
  )
}

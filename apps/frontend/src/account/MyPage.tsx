/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom'
import { Btn } from '../design/Button'
import { eyeBrowCss } from '../design/Eyebrow'

export default function MyPage() {
  return (
    <>
      <div className="title-row">
        <div css={eyeBrowCss}>MY SPACE</div>
        <h1 className="page-title">나의 공간</h1>
        <div className="sub">계정 정보와 나만의 토론 환경을 관리하세요.</div>
      </div>
      <div className="settings">
        <aside className="settings-menu">
          <a className="active" href="#profile">
            계정 정보
          </a>
          <a href="#balances">내 재화</a>
          <a href="#theme">테마 설정</a>
          <Link to="/login">로그아웃 ↗</Link>
        </aside>
        <section>
          <div className="panel" id="profile">
            <div className="topline">
              <h3>프로필 정보</h3>
              <span className="avatar">서</span>
            </div>
            <div className="form-row">
              <div>
                <label htmlFor="name">이름</label>
                <input id="name" defaultValue="서연" />
              </div>
              <div>
                <label htmlFor="email">이메일</label>
                <input id="email" type="email" defaultValue="seoyeon@example.com" />
              </div>
            </div>
            <Btn primary small css={{ marginTop: '22px' }}>
              변경사항 저장
            </Btn>
            <hr className="divider" />
            <h3>비밀번호 변경</h3>
            <label htmlFor="current-pw">현재 비밀번호</label>
            <input
              id="current-pw"
              type="password"
              placeholder="현재 비밀번호를 입력하세요"
              autoComplete="current-password"
            />
            <div className="form-row">
              <div>
                <label htmlFor="new-pw">새 비밀번호</label>
                <input
                  id="new-pw"
                  type="password"
                  placeholder="새 비밀번호"
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label htmlFor="confirm-pw">새 비밀번호 확인</label>
                <input
                  id="confirm-pw"
                  type="password"
                  placeholder="새 비밀번호 확인"
                  autoComplete="new-password"
                />
              </div>
            </div>
            <Btn small css={{ marginTop: '20px' }}>
              비밀번호 변경
            </Btn>
          </div>
          <div className="panel" id="balances" css={{ marginTop: '20px' }}>
            <h3>내 재화</h3>
            <div className="form-row">
              <div className="balance">
                ◈ 베팅 재화
                <strong>
                  12,500 <small>TK</small>
                </strong>
                <p className="empty-note">출석 체크 · 베팅 승리로 획득</p>
              </div>
              <div className="balance" css={{ background: '#faf5e9' }}>
                ✦ 상점 재화
                <strong>
                  2,400 <small>CRD</small>
                </strong>
                <p className="empty-note">채팅 배경 · 강조 아이템 · 이모지 구매</p>
              </div>
            </div>
          </div>
          <div className="panel" id="theme" css={{ marginTop: '20px' }}>
            <h3>테마 설정</h3>
            <label htmlFor="theme-select">화면 테마</label>
            <select id="theme-select">
              <option>라이트 · 화이트 & 비색</option>
              <option>다크</option>
              <option>시스템 설정</option>
            </select>
            <hr className="divider" />
            <div className="topline">
              <span className="sub">계정을 더 이상 사용하지 않으시나요?</span>
              <Btn small css={{ color: '#ad7870' }}>
                회원탈퇴
              </Btn>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

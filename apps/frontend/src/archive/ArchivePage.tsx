/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom'
import { eyeBrowCss } from '../design/Eyebrow'

export default function ArchivePage() {
  return (
    <>
      <div className="title-row">
        <div css={eyeBrowCss}>THE CONVERSATION CONTINUES</div>
        <h1 className="page-title">지나간 토론, 남아 있는 생각.</h1>
        <div className="sub">함께 만든 질문과 논리를 다시 만나보세요.</div>
      </div>
      <div className="topline">
        <span className="sub">
          토론 기록 <b>6</b>
        </span>
        <input className="search" aria-label="토론 검색" placeholder="⌕  토론 주제로 검색" />
      </div>
      <div className="panel" css={{ marginTop: '24px', padding: '0', overflow: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>회차</th>
              <th>토론 주제</th>
              <th>진행일</th>
              <th>상태</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="muted">11</td>
              <td>
                <Link to="/archive/replay">
                  2026. 10. 18 · AI 창작물에도 저작권을 인정해야 할까요?
                </Link>
              </td>
              <td className="muted">10. 18</td>
              <td>
                <span className="badge">토론 종료</span>
              </td>
              <td>
                <Link to="/archive/replay" aria-label="토론 다시 보기">
                  ↗
                </Link>
              </td>
            </tr>
            <tr>
              <td className="muted">10</td>
              <td>
                <Link to="/archive/replay">2026. 10. 15 · 주 4일 근무제를 도입해야 할까요?</Link>
              </td>
              <td className="muted">10. 15</td>
              <td>
                <span className="badge">토론 종료</span>
              </td>
              <td>
                <Link to="/archive/replay" aria-label="토론 다시 보기">
                  ↗
                </Link>
              </td>
            </tr>
            <tr>
              <td className="muted">09</td>
              <td>
                <Link to="/archive/replay">2026. 10. 12 · 동물실험을 계속 허용해야 할까요?</Link>
              </td>
              <td className="muted">10. 12</td>
              <td>
                <span className="badge">토론 종료</span>
              </td>
              <td>
                <Link to="/archive/replay" aria-label="토론 다시 보기">
                  ↗
                </Link>
              </td>
            </tr>
            <tr>
              <td className="muted">08</td>
              <td>
                <Link to="/archive/replay">
                  2026. 10. 09 · AI 교사가 인간 교사를 대체할 수 있을까요?
                </Link>
              </td>
              <td className="muted">10. 9</td>
              <td>
                <span className="badge">토론 종료</span>
              </td>
              <td>
                <Link to="/archive/replay" aria-label="토론 다시 보기">
                  ↗
                </Link>
              </td>
            </tr>
            <tr>
              <td className="muted">07</td>
              <td>
                <Link to="/archive/replay">2026. 10. 06 · 기본소득은 필요한 제도일까요?</Link>
              </td>
              <td className="muted">10. 6</td>
              <td>
                <span className="badge">토론 종료</span>
              </td>
              <td>
                <Link to="/archive/replay" aria-label="토론 다시 보기">
                  ↗
                </Link>
              </td>
            </tr>
            <tr>
              <td className="muted">06</td>
              <td>
                <Link to="/archive/replay">
                  2026. 10. 03 · 자율주행차의 판단을 신뢰할 수 있을까요?
                </Link>
              </td>
              <td className="muted">10. 3</td>
              <td>
                <span className="badge">토론 종료</span>
              </td>
              <td>
                <Link to="/archive/replay" aria-label="토론 다시 보기">
                  ↗
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="empty-note">디자인 구성을 위한 예시 토론 목록입니다.</p>
    </>
  )
}

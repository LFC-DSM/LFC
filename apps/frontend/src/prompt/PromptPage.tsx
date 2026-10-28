/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom'
import { Btn } from '../design/Button'

export default function PromptPage() {
  return (
    <>
      <div className="title-row">
        <div className="eyebrow">DAY 02 · CO-WRITING</div>
        <h1 className="page-title">생각을 모아, 더 단단한 논리로.</h1>
        <div className="sub">
          내가 선택한 찬성 진영의 공동 프롬프트입니다. 상대 진영의 문서는 공개되지 않습니다.
        </div>
      </div>
      <div className="editor-layout">
        <section className="document">
          <div className="toolbar">
            ↶ ↷　│　본문 ⌄　│　<b>B</b> <i>I</i>　≡　☷　↗
          </div>
          <article className="paper">
            <span className="badge">찬성 진영　·　공동 문서</span>
            <h1>창작의 새로운 가능성을 위해</h1>
            <p className="editor-note">프롬프트 문서 · 최종 수정 14:32 · 예시 화면</p>
            <hr className="divider" />
            <h3>01. AI의 역할</h3>
            <p>
              당신은 기술의 발전과 창작자의 권리를 함께 고민하는 토론자입니다. AI 창작물에도
              저작권을 인정해야 한다는 입장에서 논리를 전개합니다.
            </p>
            <h3>02. 핵심 주장과 근거</h3>
            <p>
              AI는 인간의 창작 활동을 확장하는 도구입니다. 사용자의 구체적인 기획과 반복적인 수정
              과정은 결과물에 유의미한 창작적 기여를 만듭니다.
            </p>
            <p>권리 보호의 기준을 명확히 하는 것은 새로운 창작 생태계를 위한 첫걸음입니다.</p>
            <h3>03. 반론에 대한 준비</h3>
            <p>
              인간의 개입 정도에 따라 보호 범위를 구분하고, 학습 데이터와 결과물의 권리를 구별해
              설명해 주세요.
            </p>
          </article>
        </section>
        <aside className="panel">
          <h3>
            실시간 채팅 <span className="badge">LIVE</span>
          </h3>
          <p className="empty-note">함께 만드는 토론의 공간</p>
          <div className="superchat">
            <small>✦ 상단 고정 메시지 · 디자인 예시</small>
            <div className="chatline">
              <b>지우</b>학습 데이터의 저작권도 함께 생각해 보면 좋겠어요.
            </div>
          </div>
          <div className="chatline">
            <b>서연</b>좋은 관점이에요!
          </div>
          <div className="chatline">
            <b>도윤</b>창작자의 기여도를 기준으로 하면 어떨까요?
          </div>
          <div className="chatline">
            <b>하린</b>반론도 미리 준비해 봐요 🌿
          </div>
          <div className="chatinput">
            <label htmlFor="message">메시지</label>
            <input id="message" placeholder="함께 의견을 나눠보세요" />
            <div className="topline" css={{ marginTop: '10px' }}>
              <Link className="sub" to="/shop">
                ✦ 강조 아이템
              </Link>
              <Btn small>전송 ↑</Btn>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

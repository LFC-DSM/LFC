/** @jsxImportSource @emotion/react */
export default function BetPage() {
  return (
    <>
      <div className="title-row">
        <div className="eyebrow">DAY 02 · CHOOSE YOUR SIDE</div>
        <h1 className="page-title">당신은 어느 쪽의 생각인가요?</h1>
        <div className="sub">
          진영을 선택하고 TK를 베팅하세요. 선택한 진영의 프롬프트에만 참여할 수 있습니다.
        </div>
      </div>
      <div className="split">
        <div className="panel">
          <span className="badge">이번 토론 주제</span>
          <h2 css={{ fontSize: '27px', lineHeight: '1.6' }}>
            인공지능이 만든 창작물에도
            <br />
            저작권을 인정해야 할까요?
          </h2>
          <div className="side-choice">
            <div className="card selected">
              <span className="badge">찬성</span>
              <h3>창작의 새로운 가능성</h3>
              <p>AI 창작물의 권리를 인정해야 합니다.</p>
              <span className="sub">선택된 진영　✓</span>
            </div>
            <div className="card">
              <span className="badge">반대</span>
              <h3>창작의 주체는 인간</h3>
              <p>AI 창작물의 권리는 신중해야 합니다.</p>
              <button className="btn small">진영 선택</button>
            </div>
          </div>
          <div className="notice">
            <span>♧　베팅 이후에는 진영을 변경할 수 없습니다.</span>
          </div>
        </div>
        <aside className="panel">
          <h3>베팅하기</h3>
          <div className="summary">
            <span className="muted">보유 TK</span>
            <b>12,500 TK</b>
          </div>
          <label htmlFor="bet">베팅할 TK</label>
          <input id="bet" type="number" min="0" placeholder="베팅 금액을 입력하세요" />
          <div className="amount">
            <button className="btn small">+100</button>
            <button className="btn small">+500</button>
            <button className="btn small">+1,000</button>
          </div>
          <hr className="divider" />
          <div className="summary">
            <span>선택한 진영</span>
            <b css={{ color: 'var(--jade)' }}>찬성</b>
          </div>
          <a className="btn primary" href="?page=prompt">
            베팅 후 프롬프트 작성 <span>↗</span>
          </a>
          <p className="empty-note">
            TK는 출석 체크와 베팅 승리 등으로 얻습니다. 상점에서 사용하는 CRD와는 별개입니다.
          </p>
        </aside>
      </div>
    </>
  )
}

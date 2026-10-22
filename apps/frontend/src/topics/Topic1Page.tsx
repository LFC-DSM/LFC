/** @jsxImportSource @emotion/react */
export default function Topic1Page() {
  return (
    <>
      <div className="topic-detail">
        <a className="sub" href="?page=vote">
          ← 주제 목록
        </a>
        <div className="panel" css={{ marginTop: '25px' }}>
          <span className="badge">토론 주제 02</span>
          <h1>
            주 4일 근무제,
            <br />
            전면 도입해야 할까요?
          </h1>
          <p>일하는 시간의 변화가 생산성과 삶의 질에 어떤 영향을 주는지 살펴봅니다.</p>
          <hr className="divider" />
          <h3>이런 관점을 함께 살펴봐요</h3>
          <div className="grid">
            <div className="card">
              <span className="badge">찬성 관점</span>
              <p>새로운 가능성과 사회적 이익에 주목하며 제도 변화의 필요성을 논의합니다.</p>
            </div>
            <div className="card">
              <span className="badge">반대 관점</span>
              <p>기존 권리와 예상되는 부작용을 살피며 신중한 접근을 논의합니다.</p>
            </div>
          </div>
          <div css={{ marginTop: '24px' }}>
            <button className="btn primary">이 주제에 투표하기</button>
          </div>
        </div>
      </div>
    </>
  )
}

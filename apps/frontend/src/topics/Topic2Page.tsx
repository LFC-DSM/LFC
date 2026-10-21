/** @jsxImportSource @emotion/react */
export default function Topic2Page() {
  return (
    <>
      <div className="topic-detail">
        <a className="sub" href="?page=vote">
          ← 주제 목록
        </a>
        <div className="panel" css={{ marginTop: '25px' }}>
          <span className="badge">토론 주제 03</span>
          <h1>
            동물실험은 과학 발전을 위해
            <br />
            계속 허용되어야 할까요?
          </h1>
          <p>새로운 치료법과 생명 윤리 사이에서 우리가 선택해야 할 기준을 살펴봅니다.</p>
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

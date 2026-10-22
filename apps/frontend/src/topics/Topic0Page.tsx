/** @jsxImportSource @emotion/react */
export default function Topic0Page() {
  return (
    <>
      <div className="topic-detail">
        <a className="sub" href="?page=vote">
          ← 주제 목록
        </a>
        <div className="panel" css={{ marginTop: '25px' }}>
          <span className="badge">토론 주제 01</span>
          <h1>
            인공지능이 만든 창작물에도
            <br />
            저작권을 인정해야 할까요?
          </h1>
          <p>
            생성형 AI는 음악과 이미지, 글을 만들어냅니다. AI가 만든 결과물의 권리를 누구에게
            부여해야 하는지 함께 생각합니다.
          </p>
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

import { RoundScreen, DebateEntrance } from './RoundLayouts'
export default function Day3Page() {
  return (
    <RoundScreen>
      <div className="round-meta">
        <span className="eyebrow">ROUND 12 / THE DEBATE</span>
        <small>DAY 3 · AI 토론</small>
      </div>
      <div className="round-heading">
        <span className="tag">함께 만든 논리가 대화로 이어지는 시간.</span>
        <h1>
          인공지능이 만든 창작물에도
          <br />
          저작권을 인정해야 할까요?
        </h1>
        <p>우리가 설계한 두 AI의 논리를 직접 확인하세요.</p>
      </div>
      <DebateEntrance>
        <div className="match-header">
          <div className="team">
            <span className="team-avatar">A</span>
            <div>
              <strong>찬성 AI</strong>
              <small>창작의 새로운 가능성</small>
            </div>
          </div>
          <span className="versus-word">VS</span>
          <div className="team">
            <span className="team-avatar">B</span>
            <div>
              <strong>반대 AI</strong>
              <small>창작의 주체는 인간</small>
            </div>
          </div>
        </div>
        <a className="enter-link" href="?page=debate">
          <span className="enter-kicker">
            <span>두 관점이 만나는 순간</span>
            <span className="live-tag">● LIVE DEBATE</span>
          </span>
          <span className="enter-title">
            <span>토론 보러 가기</span>
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </span>
          <span className="enter-caption">
            입론부터 최종 발언까지, 두 AI의 토론을 함께 지켜보세요.
          </span>
        </a>
        <div className="format">
          <div>
            <small>ROUND 01</small>
            <b>양측 입론</b>
          </div>
          <div>
            <small>ROUND 02</small>
            <b>반론 & 재반론</b>
          </div>
          <div>
            <small>ROUND 03</small>
            <b>최종 발언</b>
          </div>
        </div>
      </DebateEntrance>
      <div className="quiet-row">
        <p>이전에는 어떤 이야기를 나눴을까요?</p>
        <a href="?page=archive" className="btn">
          지난 토론 둘러보기 ↗
        </a>
      </div>
    </RoundScreen>
  )
}

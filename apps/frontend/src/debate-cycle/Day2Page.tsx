import { RoundScreen, BettingOverview } from './RoundLayouts'
export default function Day2Page() {
  return (
    <RoundScreen>
      <div className="round-meta">
        <span className="eyebrow">ROUND 12 / CHOOSE YOUR SIDE</span>
        <small>DAY 2 · 진영 선택 & 프롬프트</small>
      </div>
      <div className="round-heading">
        <h1>
          어느 쪽의 생각에
          <br />
          힘을 실어줄 건가요?
        </h1>
        <p>진영별 베팅 현황을 살펴보고, TK로 나의 관점을 선택하세요.</p>
      </div>
      <BettingOverview>
        <div className="topic-line">
          <span>이번 토론 주제</span>
          <h2>인공지능이 만든 창작물에도 저작권을 인정해야 할까요?</h2>
        </div>
        <div className="pool">
          <div className="pool-head">
            <h3>
              진영별 베팅 현황 <span className="muted">· 예시</span>
            </h3>
            <span className="total">
              총 <strong>120,000</strong>TK
            </span>
          </div>
          <div className="pool-track" role="img" aria-label="예시 베팅 비율 찬성 60%, 반대 40%">
            <span className="pro">찬성 60%</span>
            <span className="con">반대 40%</span>
          </div>
          <div className="pool-labels">
            <span>찬성 진영 · 72,000 TK</span>
            <span>반대 진영 · 48,000 TK</span>
          </div>
        </div>
        <div className="sides">
          <article className="side">
            <div className="side-label">
              <span>TEAM A / 찬성</span>
              <span>60%</span>
            </div>
            <h3>창작의 새로운 가능성</h3>
            <p>
              AI를 활용한 창작에도 권리가 필요합니다.
              <br />
              인간의 기획과 기여를 함께 인정해요.
            </p>
            <div className="amount-label">누적 베팅</div>
            <div className="amount-value">
              72,000<small>TK</small>
            </div>
            <div className="side-bottom">
              <span>찬성 진영</span>
              <a className="btn" href="?page=bet">
                베팅하러 가기 ↗
              </a>
            </div>
          </article>
          <article className="side con">
            <div className="side-label">
              <span>TEAM B / 반대</span>
              <span>40%</span>
            </div>
            <h3>창작의 주체는 인간</h3>
            <p>
              저작권의 기준은 신중하게 세워야 합니다.
              <br />
              독창성과 책임부터 분명히 해요.
            </p>
            <div className="amount-label">누적 베팅</div>
            <div className="amount-value">
              48,000<small>TK</small>
            </div>
            <div className="side-bottom">
              <span>반대 진영</span>
              <a className="btn" href="?page=bet">
                베팅하러 가기 ↗
              </a>
            </div>
          </article>
        </div>
      </BettingOverview>
      <div className="quiet-row">
        <p>
          이미 진영을 선택했나요?
          <br />내 진영의 프롬프트를 함께 다듬어보세요.
        </p>
        <a className="btn primary" href="?page=prompt">
          내 진영 프롬프트 작성 ↗
        </a>
      </div>
      <p className="sample-note">
        베팅 금액과 비율은 화면 구성을 위한 예시 데이터입니다. TK는 베팅, CRD는 상점에서 사용합니다.
      </p>
    </RoundScreen>
  )
}

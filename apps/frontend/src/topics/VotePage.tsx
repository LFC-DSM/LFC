/** @jsxImportSource @emotion/react */
import { Btn } from '../design/Button'

export default function VotePage() {
  return (
    <>
      <div className="title-row">
        <div className="eyebrow">DAY 01 · TOPIC VOTE</div>
        <h1 className="page-title">어떤 주제로 이야기해 볼까요?</h1>
        <div className="sub">
          다음 토론의 주제를 직접 골라주세요. 가장 많은 선택을 받은 질문으로 토론을 시작합니다.
        </div>
      </div>
      <div className="notice" css={{ margin: '0 0 24px' }}>
        <span>◷　투표 마감　2026. 10. 21 23:59</span>
        <span>1인 1개 주제 선택</span>
      </div>
      <div className="grid">
        <article className="card">
          <div className="topline">
            <span className="badge">기술 · 윤리</span>
            <span className="muted">01</span>
          </div>
          <h3>
            인공지능이 만든 창작물에도
            <br />
            저작권을 인정해야 할까요?
          </h3>
          <p>창작의 주체가 바뀌는 시대, 권리의 기준도 달라져야 할까요?</p>
          <div className="progress">
            <i css={{ width: '48%' }}></i>
          </div>
          <div className="topline">
            <span className="sub">48%</span>
            <span className="sub">예시 투표 현황</span>
          </div>
          <div className="card-footer">
            <a href="?page=topic&id=0">주제 자세히 보기 ↗</a>
            <Btn small type="button">
              투표하기
            </Btn>
          </div>
        </article>
        <article className="card">
          <div className="topline">
            <span className="badge">사회 · 노동</span>
            <span className="muted">02</span>
          </div>
          <h3>
            주 4일 근무제,
            <br />
            전면 도입해야 할까요?
          </h3>
          <p>더 짧게 일하고, 더 나은 삶을 살 수 있을까요?</p>
          <div className="progress">
            <i css={{ width: '32%' }}></i>
          </div>
          <div className="topline">
            <span className="sub">32%</span>
            <span className="sub">예시 투표 현황</span>
          </div>
          <div className="card-footer">
            <a href="?page=topic&id=1">주제 자세히 보기 ↗</a>
            <Btn small type="button">
              투표하기
            </Btn>
          </div>
        </article>
        <article className="card">
          <div className="topline">
            <span className="badge">과학 · 생명</span>
            <span className="muted">03</span>
          </div>
          <h3>
            동물실험은 과학 발전을 위해
            <br />
            계속 허용되어야 할까요?
          </h3>
          <p>과학의 진보와 생명의 존중 사이, 함께 답을 찾아봅니다.</p>
          <div className="progress">
            <i css={{ width: '20%' }}></i>
          </div>
          <div className="topline">
            <span className="sub">20%</span>
            <span className="sub">예시 투표 현황</span>
          </div>
          <div className="card-footer">
            <a href="?page=topic&id=2">주제 자세히 보기 ↗</a>
            <Btn small type="button">
              투표하기
            </Btn>
          </div>
        </article>
      </div>
      <p className="empty-note">화면의 투표 수치는 디자인 예시입니다.</p>
    </>
  )
}

import { RoundScreen, VoteSelection } from './RoundLayouts'
const topics = [
  {
    category: '기술 · 윤리',
    title: '인공지능이 만든 창작물에도 저작권을 인정해야 할까요?',
    description: '창작의 주체가 바뀌는 시대, 권리의 기준도 달라져야 할까요?',
  },
  {
    category: '사회 · 노동',
    title: '주 4일 근무제, 전면 도입해야 할까요?',
    description: '더 짧게 일하고, 더 나은 삶을 살 수 있을까요?',
  },
  {
    category: '과학 · 생명',
    title: '동물실험은 과학 발전을 위해 계속 허용되어야 할까요?',
    description: '과학의 진보와 생명의 존중 사이, 함께 답을 찾아봅니다.',
  },
]
export default function Day1Page() {
  return (
    <RoundScreen>
      <div className="round-meta">
        <span className="eyebrow">ROUND 12 / TOPIC SELECTION</span>
        <small>DAY 1 · 주제 투표</small>
      </div>
      <div className="round-heading">
        <span className="tag">오늘의 선택이 다음 토론을 만듭니다.</span>
        <h1>
          어떤 질문으로
          <br />
          시작해 볼까요?
        </h1>
        <p>세 가지 후보 중 하나를 골라주세요. 가장 많은 선택을 받은 주제로 토론합니다.</p>
      </div>
      <VoteSelection>
        {topics.map((topic, index) => (
          <article className="candidate" key={topic.title}>
            <div className="candidate-head">
              <span className="candidate-number">0{index + 1}</span>
              <span className="category">{topic.category}</span>
            </div>
            <h2>{topic.title}</h2>
            <p className="description">{topic.description}</p>
            <div className="candidate-foot">
              <a href={'?page=topic&id=' + index}>주제 자세히 보기</a>
              <span className="candidate-mark" aria-hidden="true">
                ↗
              </span>
            </div>
          </article>
        ))}
      </VoteSelection>
      <div className="quiet-row">
        <p>
          한 사람당 한 주제를 선택할 수 있어요.
          <br />
          주제의 배경과 양측 관점을 먼저 살펴보세요.
        </p>
        <a className="btn primary" href="?page=vote">
          주제 투표하러 가기 <span>↗</span>
        </a>
      </div>
    </RoundScreen>
  )
}

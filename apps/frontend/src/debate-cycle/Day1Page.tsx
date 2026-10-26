import styled from '@emotion/styled'
import { RoundScreen, RoundMeta, RoundHeading, QuietRow } from './RoundLayouts'

const topics = [
  {
    title: '인공지능이 만든 창작물에도 저작권을 인정해야 할까요?',
    description: '창작의 주체가 바뀌는 시대, 권리의 기준도 달라져야 할까요?',
  },
  {
    title: '주 4일 근무제, 전면 도입해야 할까요?',
    description: '더 짧게 일하고, 더 나은 삶을 살 수 있을까요?',
  },
  {
    title: '동물실험은 과학 발전을 위해 계속 허용되어야 할까요?',
    description: '과학의 진보와 생명의 존중 사이, 함께 답을 찾아봅니다.',
  },
]

export default function Day1Page() {
  return (
    <RoundScreen>
      <RoundMeta>
        <span>ROUND 12 / TOPIC SELECTION</span>
        <small>DAY 1 · 주제 투표</small>
      </RoundMeta>
      <RoundHeading>주제 투표</RoundHeading>
      <VoteSelection>
        {topics.map((topic, index) => (
          <Candidate key={topic.title} featured={index === 0}>
            <CandidateHead>
              <CandidateNumber>0{index + 1}</CandidateNumber>
            </CandidateHead>
            <CandidateTitle>{topic.title}</CandidateTitle>
            <CandidateDesc>{topic.description}</CandidateDesc>
            <CandidateFoot>
              <CandidateMark aria-hidden="true">↗</CandidateMark>
            </CandidateFoot>
          </Candidate>
        ))}
      </VoteSelection>
      <QuietRow>
        <p>
          한 사람당 한 주제를 선택할 수 있어요.
          <br />
          주제의 배경과 양측 관점을 먼저 살펴보세요.
        </p>
        <a className="btn primary" href="?page=vote">
          주제 투표하러 가기 <span>↗</span>
        </a>
      </QuietRow>
    </RoundScreen>
  )
}

const VoteSelection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }
`

const Candidate = styled.article<{ featured?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 26px;
  border: 1.5px solid var(--stroke);
  border-radius: 6px;
  background: #fff;
  box-shadow: ${({ featured }) => (featured ? '5px 5px 0 #91cdb8' : '4px 4px 0 #d8dfd4')};
  min-width: 0;
`

const CandidateHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  @media (max-width: 900px) {
    margin-bottom: 20px;
  }
`

const CandidateNumber = styled.span`
  font-size: 44px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -2px;
  @media (max-width: 900px) {
    font-size: 34px;
  }
`

const CandidateTitle = styled.h2`
  font-size: 23px;
  line-height: 1.65;
  letter-spacing: -0.8px;
  margin: 0 0 16px;
  @media (max-width: 900px) {
    font-size: 24px;
  }
`

const CandidateDesc = styled.p`
  font-size: 16px;
  color: var(--muted);
  line-height: 1.9;
  margin: 0 0 28px;
`

const CandidateFoot = styled.div`
  margin-top: auto;
  border-top: 1px solid var(--line);
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const CandidateMark = styled.span`
  width: 36px;
  height: 36px;
  border: 1px solid var(--stroke);
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #f5f7ef;
  font-size: 20px;
`

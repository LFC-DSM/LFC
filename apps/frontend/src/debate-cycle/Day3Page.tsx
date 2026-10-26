import styled from '@emotion/styled'
import { Btn } from '../design/Button'
import { RoundScreen, RoundMeta, RoundHeading, QuietRow } from './RoundLayouts'

export default function Day3Page() {
  return (
    <RoundScreen>
      <RoundMeta>
        <span className="eyebrow">ROUND 12 / THE DEBATE</span>
        <small>DAY 3 · AI 토론</small>
      </RoundMeta>
      <RoundHeading>
        인공지능이 만든 창작물에도
        <br />
        저작권을 인정해야 할까요?
      </RoundHeading>
      <DebateEntrance>
        <MatchHeader>
          <Team>
            <TeamAvatar>A</TeamAvatar>
            <div>
              <strong>찬성 AI</strong>
              <small>창작의 새로운 가능성</small>
            </div>
          </Team>
          <VersusWord>VS</VersusWord>
          <Team reverse>
            <TeamAvatar con>B</TeamAvatar>
            <div>
              <strong>반대 AI</strong>
              <small>창작의 주체는 인간</small>
            </div>
          </Team>
        </MatchHeader>
        <EnterLink href="?page=debate">
          <EnterKicker>
            <span>두 관점이 만나는 순간</span>
            <LiveTag>● LIVE DEBATE</LiveTag>
          </EnterKicker>
          <EnterTitle>
            <span>토론 보러 가기</span>
            <EnterArrow aria-hidden="true">↗</EnterArrow>
          </EnterTitle>
          <EnterCaption>입론부터 최종 발언까지, 두 AI의 토론을 함께 지켜보세요.</EnterCaption>
        </EnterLink>
        <Format>
          <FormatItem>
            <small>ROUND 01</small>
            <b>양측 입론</b>
          </FormatItem>
          <FormatItem>
            <small>ROUND 02</small>
            <b>반론 & 재반론</b>
          </FormatItem>
          <FormatItem>
            <small>ROUND 03</small>
            <b>최종 발언</b>
          </FormatItem>
        </Format>
      </DebateEntrance>
      <QuietRow>
        <p>이전에는 어떤 이야기를 나눴을까요?</p>
        <Btn as="a" href="?page=archive">
          지난 토론 둘러보기 ↗
        </Btn>
      </QuietRow>
    </RoundScreen>
  )
}

const DebateEntrance = styled.div``

const MatchHeader = styled.div`
  border-top: 1.5px solid var(--stroke);
  border-bottom: 1.5px solid var(--stroke);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 30px;
  margin: 28px 0;
  padding: 26px 0;
  @media (max-width: 720px) {
    gap: 12px;
    padding: 23px 0;
  }
`

const Team = styled.div<{ reverse?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  ${({ reverse }) =>
    reverse &&
    `
    flex-direction: row-reverse;
    text-align: right;
  `}
  strong {
    font-size: 20px;
  }
  small {
    display: block;
    font-size: 12px;
    color: var(--muted);
    margin-top: 6px;
  }
  @media (max-width: 720px) {
    gap: 10px;
    strong {
      font-size: 16px;
    }
    small {
      font-size: 10px;
    }
  }
`

const TeamAvatar = styled.span<{ con?: boolean }>`
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border: 1.5px solid var(--stroke);
  border-radius: 8px;
  background: ${({ con }) => (con ? '#e6daf5' : '#c6ecdb')};
  font-size: 24px;
  font-weight: 700;
  @media (max-width: 720px) {
    width: 40px;
    height: 40px;
    font-size: 18px;
    flex-shrink: 0;
  }
`

const VersusWord = styled.span`
  font-size: 17px;
  font-weight: 700;
  @media (max-width: 720px) {
    font-size: 13px;
  }
`

const EnterLink = styled.a`
  display: flex;
  flex-direction: column;
  gap: 27px;
  padding: 38px 42px;
  background: #57cbb0;
  border: 2px solid var(--stroke);
  border-radius: 7px;
  box-shadow: 7px 7px 0 var(--stroke);
  transition:
    transform 0.15s,
    box-shadow 0.15s;
  &:hover {
    transform: translate(3px, 3px);
    box-shadow: 4px 4px 0 var(--stroke);
  }
  @media (max-width: 720px) {
    padding: 25px 22px;
    gap: 23px;
    box-shadow: 5px 5px 0 var(--stroke);
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const EnterKicker = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.3px;
  @media (max-width: 720px) {
    font-size: 10px;
    letter-spacing: 0.7px;
  }
`

const LiveTag = styled.span`
  background: var(--ink);
  color: #fff;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 11px;
  letter-spacing: 1.2px;
`

const EnterTitle = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  font-size: clamp(34px, 5vw, 64px);
  font-weight: 800;
  line-height: 1.4;
  letter-spacing: -2px;
  @media (max-width: 720px) {
    font-size: 34px;
    letter-spacing: -1.2px;
  }
`

const EnterArrow = styled.span`
  font-size: 78px;
  font-weight: 400;
  line-height: 1;
  @media (max-width: 720px) {
    font-size: 49px;
  }
`

const EnterCaption = styled.span`
  font-size: 16px;
  line-height: 1.8;
  @media (max-width: 720px) {
    font-size: 14px;
  }
`

const Format = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: 1.5px solid var(--stroke);
  border-radius: 5px;
  background: white;
`

const FormatItem = styled.div`
  padding: 24px;
  border-right: 1px solid var(--stroke);
  &:last-child {
    border: 0;
  }
  small {
    font-size: 11px;
    color: var(--muted);
    display: block;
    margin-bottom: 9px;
    letter-spacing: 1px;
  }
  b {
    font-size: 17px;
  }
  @media (max-width: 720px) {
    padding: 18px 12px;
    b {
      font-size: 14px;
    }
  }
`

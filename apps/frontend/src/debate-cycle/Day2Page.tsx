import styled from '@emotion/styled'
import { Btn } from '../design/Button'
import { RoundScreen, RoundMeta, RoundHeading, QuietRow, SampleNote } from './RoundLayouts'

export default function Day2Page() {
  return (
    <RoundScreen>
      <RoundMeta>
        <span className="eyebrow">ROUND 12 / CHOOSE YOUR SIDE</span>
        <small>DAY 2 · 진영 선택 & 프롬프트</small>
      </RoundMeta>
      <RoundHeading>
        어느 쪽의 생각에
        <br />
        힘을 실어줄 건가요?
      </RoundHeading>
      <BettingOverview>
        <TopicLine>
          <span>이번 토론 주제</span>
          <h2>인공지능이 만든 창작물에도 저작권을 인정해야 할까요?</h2>
        </TopicLine>
        <Pool>
          <PoolHead>
            <h3>
              진영별 베팅 현황 <span className="muted">· 예시</span>
            </h3>
            <PoolTotal>
              총 <strong>120,000</strong>TK
            </PoolTotal>
          </PoolHead>
          <PoolTrack role="img" aria-label="예시 베팅 비율 찬성 60%, 반대 40%">
            <PoolTrackPro>찬성 60%</PoolTrackPro>
            <PoolTrackCon>반대 40%</PoolTrackCon>
          </PoolTrack>
          <PoolLabels>
            <span>찬성 진영 · 72,000 TK</span>
            <span>반대 진영 · 48,000 TK</span>
          </PoolLabels>
        </Pool>
        <Sides>
          <Side>
            <SideLabel>
              <span>TEAM A / 찬성</span>
              <span>60%</span>
            </SideLabel>
            <h3>창작의 새로운 가능성</h3>
            <p>
              AI를 활용한 창작에도 권리가 필요합니다.
              <br />
              인간의 기획과 기여를 함께 인정해요.
            </p>
            <AmountLabel>누적 베팅</AmountLabel>
            <AmountValue>
              72,000<small>TK</small>
            </AmountValue>
            <SideBottom>
              <span>찬성 진영</span>
              <Btn as="a" href="?page=bet">
                베팅하러 가기 ↗
              </Btn>
            </SideBottom>
          </Side>
          <Side con>
            <SideLabel>
              <span>TEAM B / 반대</span>
              <span>40%</span>
            </SideLabel>
            <h3>창작의 주체는 인간</h3>
            <p>
              저작권의 기준은 신중하게 세워야 합니다.
              <br />
              독창성과 책임부터 분명히 해요.
            </p>
            <AmountLabel>누적 베팅</AmountLabel>
            <AmountValue>
              48,000<small>TK</small>
            </AmountValue>
            <SideBottom>
              <span>반대 진영</span>
              <Btn as="a" href="?page=bet">
                베팅하러 가기 ↗
              </Btn>
            </SideBottom>
          </Side>
        </Sides>
      </BettingOverview>
      <QuietRow>
        <p>
          이미 진영을 선택했나요?
          <br />내 진영의 프롬프트를 함께 다듬어보세요.
        </p>
        <Btn primary as="a" href="?page=prompt">
          내 진영 프롬프트 작성 ↗
        </Btn>
      </QuietRow>
      <SampleNote>
        베팅 금액과 비율은 화면 구성을 위한 예시 데이터입니다. TK는 베팅, CRD는 상점에서 사용합니다.
      </SampleNote>
    </RoundScreen>
  )
}

const BettingOverview = styled.div``

const TopicLine = styled.div`
  padding: 22px 25px;
  border: 1.5px solid var(--stroke);
  border-radius: 5px;
  background: #fff;
  margin-bottom: 26px;
  display: flex;
  gap: 22px;
  align-items: center;
  span {
    white-space: nowrap;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
  }
  h2 {
    font-size: 23px;
    line-height: 1.65;
    letter-spacing: -0.7px;
    margin: 0;
  }
  @media (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 20px;
    h2 {
      font-size: 21px;
    }
  }
`

const Pool = styled.div`
  border: 1.5px solid var(--stroke);
  background: white;
  border-radius: 6px;
  padding: 26px;
  margin-bottom: 26px;
  @media (max-width: 720px) {
    padding: 20px;
  }
`

const PoolHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 24px;
  h3 {
    font-size: 18px;
    margin: 0;
  }
  @media (max-width: 720px) {
    flex-wrap: wrap;
  }
`

const PoolTotal = styled.span`
  font-size: 15px;
  color: var(--muted);
  strong {
    font-size: 23px;
    color: var(--ink);
    margin-right: 7px;
  }
`

const PoolTrack = styled.div`
  display: flex;
  height: 45px;
  border: 1.5px solid var(--stroke);
  border-radius: 3px;
  overflow: hidden;
  @media (max-width: 720px) {
    height: 42px;
  }
`

const poolTrackSideBase = `
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 700;
  @media (max-width: 720px) {
    padding: 0 10px;
    font-size: 14px;
  }
`

const PoolTrackPro = styled.span`
  ${poolTrackSideBase}
  width: 60%;
  background: #91d9c1;
  border-right: 1.5px solid var(--stroke);
`

const PoolTrackCon = styled.span`
  ${poolTrackSideBase}
  width: 40%;
  justify-content: flex-end;
  background: #e1d4f2;
`

const PoolLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 13px;
  color: var(--muted);
`

const Sides = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 26px;
  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Side = styled.article<{ con?: boolean }>`
  border: 1.5px solid var(--stroke);
  border-radius: 6px;
  background: ${({ con }) => (con ? '#f0eafa' : '#e5f5ed')};
  box-shadow: 5px 5px 0 #252b26;
  padding: 30px;
  min-width: 0;
  h3 {
    font-size: 29px;
    letter-spacing: -1px;
    margin: 22px 0 10px;
    line-height: 1.4;
  }
  p {
    font-size: 16px;
    color: #59675f;
    line-height: 1.9;
    min-height: 60px;
    margin: 0 0 25px;
  }
  @media (max-width: 720px) {
    padding: 25px;
    h3 {
      font-size: 27px;
    }
  }
`

const SideLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  display: flex;
  justify-content: space-between;
`

const AmountLabel = styled.div`
  font-size: 12px;
  margin-bottom: 7px;
`

const AmountValue = styled.div`
  font-size: 42px;
  font-weight: 700;
  letter-spacing: -1.8px;
  small {
    font-size: 18px;
    letter-spacing: 0;
    margin-left: 8px;
  }
  @media (max-width: 720px) {
    font-size: 36px;
  }
`

const SideBottom = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #9eafa2;
  padding-top: 22px;
  gap: 18px;
  flex-wrap: wrap;
  span {
    font-size: 14px;
  }
  @media (max-width: 720px) {
    ${Btn} {
      width: 100%;
    }
  }
`

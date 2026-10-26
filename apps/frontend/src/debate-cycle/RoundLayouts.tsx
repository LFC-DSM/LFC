import styled from '@emotion/styled'

export const RoundScreen = styled.section``

export const RoundMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin: 10px 0 24px;
  small {
    color: var(--muted);
    font-size: 13px;
  }
  @media (max-width: 720px) {
    margin-bottom: 22px;
  }
`

export const RoundHeading = styled.h1`
  margin-bottom: 32px;
  font-size: clamp(30px, 3vw, 43px);
  line-height: 1.45;
  letter-spacing: -1.6px;
  margin: 0 0 14px;
`

export const RoundTag = styled.span`
  display: inline-block;
  margin-bottom: 16px;
  font-size: 12px;
  letter-spacing: 1.5px;
  font-weight: 700;
`

export const QuietRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  flex-wrap: wrap;
  margin-top: 32px;
  p {
    margin: 0;
    font-size: 15px;
    color: var(--muted);
    line-height: 1.9;
  }
  @media (max-width: 720px) {
    .btn {
      width: 100%;
    }
  }
`

export const SampleNote = styled.p`
  margin: 20px 0 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.8;
`

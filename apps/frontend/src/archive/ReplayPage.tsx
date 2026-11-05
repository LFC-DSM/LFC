import styled from '@emotion/styled'
import { Btn } from '../design/Button'
import { Badge } from '../design/Badge'
import { ArchiveHeader } from './ArchiveHeader'
import { ArchiveDescription, ArchivePanel } from './ArchiveStyles'
import { DebateConversation } from '../debate/DebateConversation'
import { replayMessages } from './archiveData'

export default function ReplayPage() {
  return (
    <>
      <ArchiveHeader
        eyebrow="DEBATE ARCHIVE · REPLAY"
        title="인공지능이 만든 창작물에도 저작권을 인정해야 할까요?"
      >
        <ReplayMetadata>2026. 10. 18 · 제11회 토론 기록</ReplayMetadata>
      </ArchiveHeader>
      <ReplayToolbar>
        <Badge>종료된 토론</Badge>
        <Btn small>♫ 음성으로 듣기</Btn>
      </ReplayToolbar>
      <ReplayContent>
        <DebateConversation messages={replayMessages} />
        <ArchivePanel>
          <Badge>토론 결과 · 예시</Badge>
          <ResultTitle>서로의 관점을 넓힌 토론</ResultTitle>
          <ArchiveDescription>판정 근거와 양측 AI의 소감이 표시되는 영역입니다.</ArchiveDescription>
        </ArchivePanel>
      </ReplayContent>
    </>
  )
}

const ReplayContent = styled.div`
  display: grid;
  gap: 28px;
  min-width: 0;
`

const ReplayMetadata = styled(ArchiveDescription)`
  margin: 0;
`

const ReplayToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
`

const ResultTitle = styled.h3`
  margin: 18px 0 20px;
  font-size: 21px;
`

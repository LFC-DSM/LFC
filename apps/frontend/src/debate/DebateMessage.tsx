import styled from '@emotion/styled'
import type { DebateSide, DebateTurn } from './debate.types'

const speakers = {
  supporting: { name: '찬성 AI', avatar: 'A' },
  opposing: { name: '반대 AI', avatar: 'B' },
} satisfies Record<DebateSide, { name: string; avatar: string }>

interface DebateMessageProps {
  message: DebateTurn
}

export function DebateMessage({ message }: DebateMessageProps) {
  const speaker = speakers[message.side]

  return (
    <MessageRow
      id={message.id}
      $side={message.side}
      aria-label={`${speaker.name} · ${message.stage}`}
    >
      <Avatar aria-hidden="true">{speaker.avatar}</Avatar>
      <MessageBody>
        <MessageHeader>
          <strong>{speaker.name}</strong>
          <Stage>{message.stage}</Stage>
        </MessageHeader>
        <MessageBubble>{message.content}</MessageBubble>
      </MessageBody>
    </MessageRow>
  )
}

const MessageHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: var(--message-alignment);
  gap: 6px 10px;
  margin-bottom: 8px;
  font-size: 14px;
`

const Stage = styled.span`
  color: var(--muted);
  font-size: 12px;
`

const MessageBubble = styled.p`
  margin: 0;
  padding: 18px 22px;
  border: 1px solid var(--line);
  border-radius: var(--message-radius);
  background: var(--message-background);
  color: var(--ink);
  font-size: 16px;
  line-height: 1.9;
  overflow-wrap: anywhere;
  white-space: pre-wrap;

  @media (max-width: 600px) {
    padding: 14px 16px;
    font-size: 15px;
  }
`

const MessageBody = styled.div`
  min-width: 0;
  max-width: 82%;

  @media (max-width: 600px) {
    max-width: 88%;
  }
`

const Avatar = styled.span`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: 1.5px solid var(--stroke);
  border-radius: 50%;
  background: #ceefdf;
  font-size: 15px;
  font-weight: 700;
`

const MessageRow = styled.article<{ $side: DebateSide }>`
  --message-alignment: ${({ $side }) => ($side === 'opposing' ? 'flex-end' : 'flex-start')};
  --message-radius: ${({ $side }) => ($side === 'opposing' ? '18px 4px 18px 18px' : '4px 18px 18px 18px')};
  --message-background: ${({ $side }) => ($side === 'opposing' ? '#f2edf8' : 'var(--pale)')};
  display: flex;
  flex-direction: ${({ $side }) => ($side === 'opposing' ? 'row-reverse' : 'row')};
  align-items: flex-start;
  gap: 12px;
  scroll-margin-top: 20px;

  @media (max-width: 600px) {
    gap: 8px;
  }
`

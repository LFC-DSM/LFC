import styled from '@emotion/styled'
import { DebateMessage } from './DebateMessage'
import type { DebateTurn } from './debate.types'

interface DebateConversationProps {
  messages: readonly DebateTurn[]
}

export function DebateConversation({ messages }: DebateConversationProps) {
  return (
    <Conversation aria-label="AI 토론 대화">
      {messages.map((message) => (
        <li key={message.id}>
          <DebateMessage message={message} />
        </li>
      ))}
    </Conversation>
  )
}

const Conversation = styled.ol`
  display: grid;
  gap: 28px;
  margin: 0;
  padding: 28px;
  border-radius: 12px;
  background: white;
  border: 1px solid black;
  list-style: none;
  box-shadow: 3px 3px 0 #d9dfd3;

  @media (max-width: 600px) {
    padding: 20px 12px;
  }
`

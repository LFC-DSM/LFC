import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { ArchivePanel } from './ArchiveStyles'
import type { ArchivedDebate } from './archive.types'

interface DebateListProps {
  debates: readonly ArchivedDebate[]
}

export function DebateList({ debates }: DebateListProps) {
  return (
    <ListPanel>
      <List aria-label="지난 토론">
        {debates.map((debate) => (
          <li key={debate.round}>
            <DebateLink to="/archive/replay">
              <Metadata>{debate.round}회</Metadata>
              <DebateTitle>{debate.title}</DebateTitle>
              <DebateDate>{debate.date}</DebateDate>
            </DebateLink>
          </li>
        ))}
      </List>
    </ListPanel>
  )
}

const ListPanel = styled(ArchivePanel)`
  margin-top: 24px;
  padding: 0;

  @media (max-width: 720px) {
    padding: 0;
  }
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  & > li + li {
    border-top: 1px solid var(--line);
  }
`

const DebateLink = styled(Link)`
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
  padding: 23px 18px;
  border-radius: 4px;
  font-size: 16px;
  line-height: 1.8;

  &:hover {
    background: #f2f8f2;
  }

  &:focus-visible {
    outline: 2px solid var(--jade);
    outline-offset: -3px;
  }

  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
    padding: 20px 18px;
  }
`

const Metadata = styled.span`
  color: var(--muted);
  font-size: 14px;
`

const DebateTitle = styled.span`
  font-weight: 600;
  overflow-wrap: anywhere;
`

const DebateDate = styled(Metadata)`
  white-space: nowrap;
`

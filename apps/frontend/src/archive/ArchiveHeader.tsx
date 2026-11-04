import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { eyeBrowCss } from '../design/Eyebrow'

interface ArchiveHeaderProps {
  title: string
  eyebrow?: string
  children?: ReactNode
}

export function ArchiveHeader({ title, eyebrow, children }: ArchiveHeaderProps) {
  return (
    <Header>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Title>{title}</Title>
      {children}
    </Header>
  )
}

const Header = styled.div`
  margin: 12px 0 32px;
`

const Eyebrow = styled.div`
  ${eyeBrowCss}
`

const Title = styled.h1`
  margin: 12px 0;
  font-size: 39px;
  letter-spacing: -1.5px;
  line-height: 1.45;

  @media (max-width: 720px) {
    font-size: 32px;
  }
`

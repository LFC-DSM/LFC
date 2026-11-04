import styled from '@emotion/styled'

export const ArchiveDescription = styled.p`
  color: var(--muted);
  font-size: 17px;
  line-height: 1.85;

  @media (max-width: 720px) {
    font-size: 16px;
  }
`

export const ArchivePanel = styled.div`
  min-width: 0;
  padding: 28px;
  background: white;
  border: 1.5px solid var(--stroke);
  border-radius: 6px;
  box-shadow: 3px 3px 0 #d9dfd3;

  @media (max-width: 720px) {
    padding: 24px 20px;
  }
`

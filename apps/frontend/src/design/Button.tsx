import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export const Btn = styled.button<{ primary?: boolean; small?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  font-weight: 700;
  border: 1.5px solid var(--stroke);
  border-radius: 4px;
  color: var(--ink);
  background: ${({ primary }) => (primary ? 'var(--jade)' : 'white')};
  ${({ small }) =>
    small
      ? `
    font-size: 14px;
    min-height: 36px;
    padding: 8px 12px;
    box-shadow: 2px 2px 0 var(--stroke);
  `
      : `
    font-size: 16px;
    min-height: 45px;
    padding: 12px 20px;
    box-shadow: 3px 3px 0 var(--stroke);
  `}
  transition:
    transform 0.15s,
    box-shadow 0.15s;
  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 var(--stroke);
  }
  &:active {
    transform: translate(3px, 3px);
    box-shadow: none;
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const BtnLink = Btn.withComponent(Link)

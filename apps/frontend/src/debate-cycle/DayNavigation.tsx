import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
const StageNavigation = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
  margin: 0 0 32px;
  a {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
    padding: 18px 20px;
    background: #fff;
    border: 1.5px solid var(--stroke);
    border-radius: 5px;
    box-shadow: 3px 3px 0 #d5dacf;
    transition:
      transform 0.15s,
      box-shadow 0.15s;
  }
  a:hover {
    transform: translate(-1px, -1px);
    box-shadow: 4px 4px 0 var(--stroke);
  }
  a[aria-current='page'] {
    background: var(--jade);
    box-shadow: 3px 3px 0 var(--stroke);
  }
  .stage-icon {
    width: 35px;
    height: 35px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    background: #f8f8f2;
    border: 1.5px solid var(--stroke);
    border-radius: 50%;
    font-size: 15px;
    font-weight: 700;
  }
  small {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.4px;
    display: block;
    margin-bottom: 5px;
  }
  strong {
    font-size: 17px;
  }
  .stage-arrow {
    margin-left: auto;
    font-size: 23px;
  }
  @media (max-width: 900px) {
    a {
      padding: 16px 13px;
      gap: 9px;
    }
    strong {
      font-size: 16px;
    }
  }
  @media (max-width: 720px) {
    gap: 9px;
    margin-bottom: 27px;
    a {
      padding: 13px 10px;
      align-items: flex-start;
    }
    .stage-icon,
    .stage-arrow {
      display: none;
    }
    small {
      font-size: 12px;
    }
    strong {
      font-size: 14px;
      line-height: 1.6;
      display: block;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    a {
      transition: none;
    }
  }
`
const stages = [
  { day: 1, title: '주제 투표', icon: '01' },
  { day: 2, title: '진영 선택 & 설계', icon: '02' },
  { day: 3, title: 'AI 토론 관람', icon: '03' },
]
export default function DayNavigation({ day }: { day: number }) {
  return (
    <StageNavigation aria-label="일차별 페이지 이동">
      {stages.map((stage) => (
        <Link
          key={stage.day}
          to={`/day/${stage.day}`}
          aria-current={day === stage.day ? 'page' : undefined}
        >
          <span className="stage-icon" aria-hidden="true">
            {stage.icon}
          </span>
          <span>
            <small>DAY 0{stage.day}</small>
            <strong>{stage.title}</strong>
          </span>
          <span className="stage-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      ))}
    </StageNavigation>
  )
}

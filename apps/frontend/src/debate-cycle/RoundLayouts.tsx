import styled from '@emotion/styled'

export const RoundScreen = styled.section`
  .round-meta {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    margin: 10px 0 24px;
  }
  .round-meta small {
    color: var(--muted);
    font-size: 13px;
  }
  .round-heading {
    margin-bottom: 32px;
  }
  .round-heading h1 {
    font-size: clamp(30px, 3vw, 43px);
    line-height: 1.45;
    letter-spacing: -1.6px;
    margin: 0 0 14px;
  }
  .round-heading p {
    font-size: 17px;
    color: var(--muted);
    line-height: 1.9;
    margin: 0;
  }
  .round-heading .tag {
    display: inline-block;
    margin-bottom: 16px;
    font-size: 12px;
    letter-spacing: 1.5px;
    font-weight: 700;
  }
  .quiet-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 22px;
    flex-wrap: wrap;
    margin-top: 32px;
  }
  .quiet-row p {
    margin: 0;
    font-size: 15px;
    color: var(--muted);
    line-height: 1.9;
  }
  .sample-note {
    margin: 20px 0 0;
    color: var(--muted);
    font-size: 12px;
    line-height: 1.8;
  }
  @media (max-width: 720px) {
    .round-heading h1 {
      font-size: 31px;
    }
    .round-heading p {
      font-size: 16px;
    }
    .round-meta {
      margin-bottom: 22px;
    }
    .quiet-row .btn {
      width: 100%;
    }
  }
`

export const VoteSelection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  .candidate {
    display: flex;
    flex-direction: column;
    padding: 26px;
    border: 1.5px solid var(--stroke);
    border-radius: 6px;
    background: #fff;
    box-shadow: 4px 4px 0 #d8dfd4;
    min-width: 0;
  }
  .candidate:first-child {
    box-shadow: 5px 5px 0 #91cdb8;
  }
  .candidate-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  .candidate-number {
    font-size: 44px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -2px;
  }
  .category {
    border: 1px solid var(--stroke);
    padding: 7px 10px;
    border-radius: 3px;
    background: #e4f6ed;
    font-size: 12px;
  }
  .candidate:nth-child(2) .category {
    background: #eee7fb;
  }
  .candidate:nth-child(3) .category {
    background: #fff2bd;
  }
  h2 {
    font-size: 23px;
    line-height: 1.65;
    letter-spacing: -0.8px;
    margin: 0 0 16px;
  }
  .description {
    font-size: 16px;
    color: var(--muted);
    line-height: 1.9;
    margin: 0 0 28px;
  }
  .candidate-foot {
    margin-top: auto;
    border-top: 1px solid var(--line);
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    font-size: 14px;
  }
  .candidate-foot a {
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .candidate-mark {
    width: 36px;
    height: 36px;
    border: 1px solid var(--stroke);
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #f5f7ef;
    font-size: 20px;
  }
  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
    .candidate-head {
      margin-bottom: 20px;
    }
    h2 {
      font-size: 24px;
    }
    .candidate-number {
      font-size: 34px;
    }
  }
`

export const BettingOverview = styled.div`
  .topic-line {
    padding: 22px 25px;
    border: 1.5px solid var(--stroke);
    border-radius: 5px;
    background: #fff;
    margin-bottom: 26px;
    display: flex;
    gap: 22px;
    align-items: center;
  }
  .topic-line span {
    white-space: nowrap;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
  }
  .topic-line h2 {
    font-size: 23px;
    line-height: 1.65;
    letter-spacing: -0.7px;
    margin: 0;
  }
  .pool {
    border: 1.5px solid var(--stroke);
    background: white;
    border-radius: 6px;
    padding: 26px;
    margin-bottom: 26px;
  }
  .pool-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    margin-bottom: 24px;
  }
  .pool-head h3 {
    font-size: 18px;
    margin: 0;
  }
  .total {
    font-size: 15px;
    color: var(--muted);
  }
  .total strong {
    font-size: 23px;
    color: var(--ink);
    margin-right: 7px;
  }
  .pool-track {
    display: flex;
    height: 45px;
    border: 1.5px solid var(--stroke);
    border-radius: 3px;
    overflow: hidden;
  }
  .pool-track span {
    display: flex;
    align-items: center;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 700;
  }
  .pool-track .pro {
    width: 60%;
    background: #91d9c1;
    border-right: 1.5px solid var(--stroke);
  }
  .pool-track .con {
    width: 40%;
    justify-content: flex-end;
    background: #e1d4f2;
  }
  .pool-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    font-size: 13px;
    color: var(--muted);
  }
  .sides {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 26px;
  }
  .side {
    border: 1.5px solid var(--stroke);
    border-radius: 6px;
    background: #e5f5ed;
    box-shadow: 5px 5px 0 #252b26;
    padding: 30px;
    min-width: 0;
  }
  .side.con {
    background: #f0eafa;
  }
  .side-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    display: flex;
    justify-content: space-between;
  }
  .side h3 {
    font-size: 29px;
    letter-spacing: -1px;
    margin: 22px 0 10px;
    line-height: 1.4;
  }
  .side p {
    font-size: 16px;
    color: #59675f;
    line-height: 1.9;
    min-height: 60px;
    margin: 0 0 25px;
  }
  .amount-label {
    font-size: 12px;
    margin-bottom: 7px;
  }
  .side .amount-value {
    font-size: 42px;
    font-weight: 700;
    letter-spacing: -1.8px;
  }
  .amount-value small {
    font-size: 18px;
    letter-spacing: 0;
    margin-left: 8px;
  }
  .side-bottom {
    margin-top: 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #9eafa2;
    padding-top: 22px;
    gap: 18px;
    flex-wrap: wrap;
  }
  .side-bottom span {
    font-size: 14px;
  }
  @media (max-width: 720px) {
    .topic-line {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      padding: 20px;
    }
    .topic-line h2 {
      font-size: 21px;
    }
    .pool {
      padding: 20px;
    }
    .pool-head {
      flex-wrap: wrap;
    }
    .pool-track {
      height: 42px;
    }
    .pool-track span {
      padding: 0 10px;
      font-size: 14px;
    }
    .sides {
      grid-template-columns: minmax(0, 1fr);
    }
    .side {
      padding: 25px;
    }
    .side h3 {
      font-size: 27px;
    }
    .side .amount-value {
      font-size: 36px;
    }
    .side-bottom .btn {
      width: 100%;
    }
  }
`

export const DebateEntrance = styled.div`
  .match-header {
    border-top: 1.5px solid var(--stroke);
    border-bottom: 1.5px solid var(--stroke);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 30px;
    margin: 28px 0;
    padding: 26px 0;
  }
  .team {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .team:last-child {
    flex-direction: row-reverse;
    text-align: right;
  }
  .team-avatar {
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    border: 1.5px solid var(--stroke);
    border-radius: 8px;
    background: #c6ecdb;
    font-size: 24px;
    font-weight: 700;
  }
  .team:last-child .team-avatar {
    background: #e6daf5;
  }
  .team strong {
    font-size: 20px;
  }
  .team small {
    display: block;
    font-size: 12px;
    color: var(--muted);
    margin-top: 6px;
  }
  .versus-word {
    font-size: 17px;
    font-weight: 700;
  }
  .enter-link {
    display: flex;
    flex-direction: column;
    gap: 27px;
    padding: 38px 42px;
    background: #57cbb0;
    border: 2px solid var(--stroke);
    border-radius: 7px;
    box-shadow: 7px 7px 0 var(--stroke);
    transition:
      transform 0.15s,
      box-shadow 0.15s;
  }
  .enter-link:hover {
    transform: translate(3px, 3px);
    box-shadow: 4px 4px 0 var(--stroke);
  }
  .enter-kicker {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.3px;
  }
  .live-tag {
    background: var(--ink);
    color: #fff;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 11px;
    letter-spacing: 1.2px;
  }
  .enter-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    font-size: clamp(34px, 5vw, 64px);
    font-weight: 800;
    line-height: 1.4;
    letter-spacing: -2px;
  }
  .enter-title .arrow {
    font-size: 78px;
    font-weight: 400;
    line-height: 1;
  }
  .enter-caption {
    font-size: 16px;
    line-height: 1.8;
  }
  .format {
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border: 1.5px solid var(--stroke);
    border-radius: 5px;
    background: white;
  }
  .format div {
    padding: 24px;
    border-right: 1px solid var(--stroke);
  }
  .format div:last-child {
    border: 0;
  }
  .format small {
    font-size: 11px;
    color: var(--muted);
    display: block;
    margin-bottom: 9px;
    letter-spacing: 1px;
  }
  .format b {
    font-size: 17px;
  }
  @media (max-width: 720px) {
    .match-header {
      gap: 12px;
      padding: 23px 0;
    }
    .team {
      gap: 10px;
    }
    .team-avatar {
      width: 40px;
      height: 40px;
      font-size: 18px;
      flex-shrink: 0;
    }
    .team strong {
      font-size: 16px;
    }
    .team small {
      font-size: 10px;
    }
    .versus-word {
      font-size: 13px;
    }
    .enter-link {
      padding: 25px 22px;
      gap: 23px;
      box-shadow: 5px 5px 0 var(--stroke);
    }
    .enter-title {
      font-size: 34px;
      letter-spacing: -1.2px;
    }
    .enter-title .arrow {
      font-size: 49px;
    }
    .enter-kicker {
      font-size: 10px;
      letter-spacing: 0.7px;
    }
    .enter-caption {
      font-size: 14px;
    }
    .format div {
      padding: 18px 12px;
    }
    .format b {
      font-size: 14px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .enter-link {
      transition: none;
    }
  }
`

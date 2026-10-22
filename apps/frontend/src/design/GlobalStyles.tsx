import { css, Global } from '@emotion/react'

const baseStyles = css`
  :root {
    --jade: #57cbb0;
    --deep: #146958;
    --pale: #e5f7ef;
    --ink: #202622;
    --muted: #68716b;
    --line: #d8ddd6;
    --bg: #f7f7f2;
    --stroke: #252b26;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: 'DM Sans', 'Noto Sans KR', sans-serif;
    font-size: 19px;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  button,
  a,
  input {
    -webkit-tap-highlight-color: transparent;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: 3px solid #137b66;
    outline-offset: 4px;
  }

  ::selection {
    background: #aff0dc;
    color: #202622;
  }
`

export default function GlobalStyles() {
  return <Global styles={baseStyles} />
}

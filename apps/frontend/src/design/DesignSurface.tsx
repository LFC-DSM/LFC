import styled from '@emotion/styled'

export const DesignSurface = styled.div`
  min-height: 100vh;
  header {
    min-height: 88px;
    border-bottom: 2px solid var(--stroke);
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 4.5%;
    gap: 28px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 35px;
    font-weight: 800;
    letter-spacing: -1.8px;
    color: var(--ink);
  }
  .brand span {
    font-size: 12px;
    letter-spacing: 1px;
    padding-left: 12px;
    line-height: 1.6;
  }
  header nav {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  header nav a {
    font-size: 17px;
    font-weight: 600;
    padding: 8px 0;
    color: #68716b;
  }
  header nav a.active {
    color: var(--ink);
    border-bottom: 3px solid var(--jade);
  }
  .account {
    display: flex;
    align-items: center;
    gap: 18px;
    font-size: 16px;
  }
  .wallet {
    background: #f6f7f3;
    border: 1.5px solid var(--stroke);
    border-radius: 5px;
    padding: 9px 12px;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
  }
  .wallet .coin {
    margin-left: 8px;
  }
  .coin {
    color: #775e26;
  }
  .avatar {
    display: inline-grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border: 1.5px solid var(--stroke);
    background: #ceefdf;
    border-radius: 50%;
    font-size: 15px;
    font-weight: 700;
  }
  .container {
    max-width: 1320px;
    margin: auto;
    padding: 34px 30px 72px;
  }
  .topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .sub {
    color: var(--muted);
    font-size: 17px;
    line-height: 1.85;
  }
  .title-row {
    margin: 12px 0 32px;
  }
  .page-title {
    font-size: 39px;
    letter-spacing: -1.5px;
    line-height: 1.45;
    margin: 12px 0;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    padding: 6px 10px;
    border: 1.5px solid var(--stroke);
    border-radius: 4px;
    background: #e9f6ed;
    color: var(--ink);
    font-size: 14px;
    font-weight: 600;
  }
  .hero {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    margin-top: 20px;
    background: white;
    border: 2px solid var(--stroke);
    border-radius: 8px;
    box-shadow: 7px 7px 0 var(--stroke);
    overflow: hidden;
  }
  .hero-copy {
    padding: 42px 40px 44px;
  }
  .hero .badge {
    background: #fff3b7;
    transform: rotate(-2deg);
    font-size: 14px;
    padding: 8px 12px;
  }
  .hero h1 {
    font-size: clamp(37px, 4vw, 56px);
    font-weight: 800;
    line-height: 1.35;
    letter-spacing: -2.3px;
    margin: 24px 0 20px;
  }
  .hero p {
    font-size: 18px;
    line-height: 1.95;
    color: var(--muted);
    margin: 0 0 26px;
  }
  .section-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin: 38px 0 20px;
  }
  .section-title h2 {
    font-size: 26px;
    letter-spacing: -0.8px;
    margin: 0;
  }
  .section-title a {
    font-size: 15px;
    color: var(--muted);
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 22px;
  }
  .card {
    min-width: 0;
    padding: 24px;
    border: 1.5px solid var(--stroke);
    border-radius: 6px;
    background: white;
    box-shadow: 4px 4px 0 #d3dbce;
  }
  .card h3 {
    font-size: 23px;
    letter-spacing: -0.7px;
    line-height: 1.65;
    margin: 20px 0 12px;
  }
  .card p {
    color: var(--muted);
    font-size: 16px;
    line-height: 1.95;
    word-break: keep-all;
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    border-top: 1px solid var(--line);
    margin-top: 24px;
    padding-top: 18px;
    color: var(--muted);
    font-size: 14px;
  }
  .card-footer a {
    color: var(--ink);
    font-weight: 600;
  }
  .card .muted {
    font-size: 15px;
  }
  .card:nth-child(2) > .topline .badge {
    background: #eee8ff;
  }
  .card:nth-child(3) > .topline .badge {
    background: #fff2be;
  }
  .progress {
    height: 9px;
    border: 1px solid var(--stroke);
    background: #f2f3ee;
    margin: 20px 0 8px;
    overflow: hidden;
  }
  .progress i {
    height: 100%;
    display: block;
    background: var(--jade);
    border-right: 1px solid var(--stroke);
  }
  .notice {
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-top: 28px;
    border: 1.5px solid var(--stroke);
    border-radius: 5px;
    background: #fff8d7;
    font-size: 16px;
    line-height: 1.8;
  }
  footer {
    border-top: 1.5px solid var(--stroke);
    padding: 26px 4.5%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    background: white;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.7;
  }
  .split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 340px;
    gap: 26px;
  }
  .panel {
    min-width: 0;
    padding: 28px;
    background: white;
    border: 1.5px solid var(--stroke);
    border-radius: 6px;
    box-shadow: 3px 3px 0 #d9dfd3;
  }
  .panel h3 {
    font-size: 21px;
    margin: 0 0 20px;
  }
  .divider {
    border: 0;
    border-top: 1px solid var(--line);
    margin: 26px 0;
  }
  .side-choice {
    display: flex;
    gap: 18px;
  }
  .side-choice .card {
    flex: 1;
  }
  .side-choice .selected {
    background: #e4f7ee;
    border: 2px solid var(--stroke);
    box-shadow: 4px 4px 0 var(--jade);
  }
  label {
    display: block;
    font-size: 16px;
    font-weight: 500;
    margin: 22px 0 10px;
  }
  input,
  textarea,
  select {
    width: 100%;
    border: 1.5px solid #88958b;
    border-radius: 4px;
    padding: 13px;
    background: white;
    color: var(--ink);
    font-size: 17px;
  }
  textarea {
    resize: vertical;
    min-height: 110px;
  }
  .amount {
    display: flex;
    gap: 10px;
    margin-top: 12px;
  }
  .amount button {
    flex: 1;
  }
  .summary {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    margin: 22px 0;
    font-size: 16px;
  }
  .editor-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 310px;
    gap: 24px;
    align-items: start;
  }
  .editor-layout .panel {
    padding: 22px;
  }
  .document {
    min-width: 0;
    background: white;
    min-height: 670px;
    border: 1.5px solid var(--stroke);
    border-radius: 5px;
    box-shadow: 4px 4px 0 #dbe2d5;
    overflow: hidden;
  }
  .toolbar {
    border-bottom: 1.5px solid var(--stroke);
    background: #f8f8f3;
    padding: 15px 22px;
    font-size: 16px;
    color: #6c776e;
    word-spacing: 12px;
  }
  .paper {
    padding: 38px;
  }
  .paper h1 {
    font-size: 32px;
    letter-spacing: -1px;
  }
  .paper h3 {
    font-size: 21px;
    margin-top: 32px;
  }
  .paper p {
    font-size: 18px;
    line-height: 2;
    color: #59665c;
  }
  .chatline {
    font-size: 16px;
    line-height: 1.95;
    margin: 18px 0;
  }
  .chatline b {
    font-size: 14px;
    margin-right: 8px;
    color: #307659;
  }
  .chatinput {
    margin-top: 26px;
  }
  .superchat {
    background: #e0f5d5;
    border: 1.5px solid var(--stroke);
    border-radius: 4px;
    padding: 15px;
    box-shadow: 3px 3px 0 #c4d6b8;
  }
  .superchat small {
    font-size: 13px;
    font-weight: 600;
  }
  .editor-note,
  .empty-note {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.9;
    margin: 14px 0;
  }
  .debate-layout {
    display: grid;
    grid-template-columns: 190px minmax(0, 1fr) 280px;
    align-items: start;
    gap: 22px;
  }
  .toc {
    position: sticky;
    top: 20px;
    padding: 20px;
  }
  .toc a {
    display: block;
    padding: 13px 8px;
    font-size: 15px;
    line-height: 1.7;
    color: var(--muted);
  }
  .toc a:first-of-type {
    background: #d8f2e7;
    color: var(--ink);
    border-left: 3px solid var(--stroke);
  }
  .toc-toggle {
    margin-bottom: 20px;
  }
  .debate-layout.toc-closed {
    grid-template-columns: minmax(0, 1fr) 280px;
  }
  .debate-msg {
    padding: 26px;
    margin-bottom: 24px;
    border: 1.5px solid var(--stroke);
    border-radius: 6px;
    background: white;
    box-shadow: 4px 4px 0 #d0e7dc;
    scroll-margin-top: 20px;
  }
  .debate-msg.opposing {
    background: #fcfaff;
    box-shadow: 4px 4px 0 #e1d8ee;
  }
  .msghead {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    font-size: 16px;
  }
  .msghead small {
    color: var(--muted);
    margin-left: auto;
    font-size: 13px;
  }
  .debate-msg p {
    font-size: 18px;
    line-height: 2;
    color: #566259;
  }
  .reactions {
    display: flex;
    gap: 9px;
  }
  .reactions button {
    background: #fff;
    border: 1px solid var(--stroke);
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 14px;
  }
  .search {
    max-width: 330px;
  }
  .tabs {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin: 28px 0;
    padding-bottom: 20px;
    border-bottom: 1.5px solid var(--stroke);
  }
  .tabs button,
  .tabs a {
    padding: 10px 17px;
    font-size: 15px;
    background: #fff;
    border: 1.5px solid var(--stroke);
    border-radius: 4px;
    color: var(--muted);
  }
  .tabs button.active,
  .tabs a.active {
    background: var(--jade);
    color: var(--ink);
    box-shadow: 3px 3px 0 var(--stroke);
  }
  .product-art {
    height: 170px;
    display: grid;
    place-items: center;
    background: #dcf3e9;
    border: 1.5px solid var(--stroke);
    border-radius: 3px;
    font-size: 51px;
  }
  .product-art.gold {
    background: #f8edc6;
  }
  .product-art.blue {
    background: #e8e2f6;
  }
  .product .badge {
    margin-top: 20px;
    font-size: 13px;
  }
  .product h3 {
    margin-top: 12px;
    font-size: 21px;
  }
  .product-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-top: 24px;
    font-size: 16px;
  }
  .product-price .coin {
    color: var(--ink);
  }
  .chat-preview {
    padding: 15px;
    max-width: 90%;
    font-size: 13px;
    font-weight: 600;
    background: white;
    border: 1.5px solid var(--stroke);
    border-radius: 3px;
    box-shadow: 4px 4px 0 var(--stroke);
    transform: rotate(-5deg);
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 16px;
  }
  th,
  td {
    padding: 23px 18px;
    text-align: left;
    border-bottom: 1px solid var(--line);
    line-height: 1.8;
  }
  th {
    background: #f1f4ee;
    font-size: 14px;
    font-weight: 600;
    color: var(--muted);
  }
  tbody tr:hover {
    background: #f2f8f2;
  }
  .auth {
    max-width: 440px;
    margin: 45px auto;
    padding: 34px;
  }
  .auth h1 {
    font-size: 33px;
    letter-spacing: -1px;
    margin-bottom: 15px;
  }
  .muted {
    color: var(--muted);
  }
  .settings {
    display: grid;
    grid-template-columns: 190px minmax(0, 1fr);
    gap: 30px;
    max-width: 1000px;
  }
  .settings-menu a {
    display: block;
    padding: 15px 16px;
    font-size: 16px;
    color: var(--muted);
  }
  .settings-menu a.active {
    background: #d8f3e7;
    border: 1.5px solid var(--stroke);
    border-radius: 4px;
    color: var(--ink);
    box-shadow: 3px 3px 0 var(--stroke);
  }
  .form-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
  .balance {
    padding: 25px;
    background: #e4f7ed;
    border: 1.5px solid var(--stroke);
    border-radius: 4px;
  }
  .balance strong {
    font-size: 32px;
    display: block;
    margin-top: 12px;
  }
  .balance small {
    font-size: 16px;
  }
  .topic-detail {
    max-width: 830px;
    margin: auto;
  }
  .topic-detail h1 {
    font-size: 35px;
    line-height: 1.5;
    letter-spacing: -1px;
  }
  .topic-detail p {
    font-size: 18px;
    line-height: 2;
    color: var(--muted);
  }
  .topic-detail .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .mobile-only {
    display: none;
  }
  @media (min-width: 1500px) {
    .container {
      max-width: 1380px;
      padding-top: 40px;
    }
  }
  @media (max-width: 1100px) {
    .wallet {
      display: none;
    }
    header nav {
      gap: 20px;
    }
    .debate-layout {
      grid-template-columns: 180px minmax(0, 1fr);
    }
    .debate-layout > aside:last-child {
      display: none;
    }
    .debate-layout.toc-closed {
      grid-template-columns: minmax(0, 1fr);
    }
    .hero-copy {
      padding: 34px 30px;
    }
    .hero h1 {
      font-size: 42px;
    }
  }
  @media (max-width: 900px) {
    .editor-layout {
      grid-template-columns: minmax(0, 1fr);
    }
    .split {
      grid-template-columns: minmax(0, 1fr);
    }
    .grid {
      gap: 16px;
    }
    .card {
      padding: 20px;
    }
    .card h3 {
      font-size: 20px;
    }
    .hero {
      grid-template-columns: 1.1fr 1fr;
    }
    .hero h1 {
      font-size: 37px;
    }
    .hero p {
      font-size: 16px;
    }
    .card-footer {
      align-items: flex-start;
      flex-direction: column;
    }
  }
  @media (max-width: 720px) {
    header {
      padding: 16px 20px;
      flex-wrap: wrap;
      gap: 15px;
    }
    .brand {
      font-size: 32px;
    }
    header nav {
      order: 3;
      width: 100%;
      justify-content: space-between;
    }
    header nav a {
      font-size: 15px;
    }
    .account {
      margin-left: auto;
      font-size: 15px;
      gap: 8px;
    }
    .container {
      padding: 25px 20px 48px;
    }
    .topline {
      flex-wrap: wrap;
      gap: 10px;
    }
    .hero {
      grid-template-columns: minmax(0, 1fr);
      box-shadow: 5px 5px 0 var(--stroke);
    }
    .hero-copy {
      padding: 30px 24px 32px;
    }
    .hero h1 {
      font-size: 39px;
      letter-spacing: -1.7px;
    }
    .hero p {
      font-size: 17px;
    }
    .grid {
      grid-template-columns: minmax(0, 1fr);
      gap: 22px;
    }
    .card {
      padding: 24px;
    }
    .card h3 {
      font-size: 24px;
    }
    .card-footer {
      flex-direction: row;
    }
    .section-title {
      align-items: flex-start;
      flex-direction: column;
      gap: 10px;
      margin-top: 32px;
    }
    .section-title h2 {
      font-size: 25px;
    }
    .page-title {
      font-size: 32px;
    }
    .sub {
      font-size: 16px;
    }
    .notice {
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
    }
    footer {
      flex-direction: column;
      padding: 24px 20px;
      gap: 8px;
    }
    .panel {
      padding: 24px 20px;
    }
    .side-choice {
      flex-direction: column;
    }
    .paper {
      padding: 27px 22px;
    }
    .paper h1 {
      font-size: 29px;
    }
    .paper h3 {
      font-size: 20px;
    }
    .toolbar {
      font-size: 14px;
      word-spacing: 7px;
    }
    .debate-layout {
      grid-template-columns: minmax(0, 1fr);
    }
    .toc {
      position: static;
    }
    .toc a {
      display: inline-block;
      margin-right: 8px;
    }
    .debate-msg {
      padding: 22px 18px;
    }
    .msghead {
      gap: 8px;
      font-size: 14px;
    }
    .msghead .badge {
      font-size: 12px;
    }
    .search {
      max-width: 100%;
    }
    .tabs {
      gap: 8px;
    }
    .tabs button {
      padding: 9px 12px;
      font-size: 14px;
    }
    .settings {
      grid-template-columns: minmax(0, 1fr);
      gap: 24px;
    }
    .settings-menu {
      display: flex;
      overflow: auto;
      white-space: nowrap;
      padding-bottom: 5px;
    }
    .settings-menu a {
      padding: 12px;
      font-size: 15px;
    }
    .form-row {
      grid-template-columns: minmax(0, 1fr);
    }
    th,
    td {
      padding: 18px 10px;
      font-size: 14px;
    }
    th:nth-child(3),
    td:nth-child(3) {
      display: none;
    }
    .topic-detail .grid {
      grid-template-columns: minmax(0, 1fr);
    }
    .topic-detail h1 {
      font-size: 31px;
    }
    .auth {
      margin: 25px auto;
      padding: 28px 22px;
    }
  }
`

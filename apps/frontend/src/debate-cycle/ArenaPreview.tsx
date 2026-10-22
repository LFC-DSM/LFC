import styled from '@emotion/styled'
const Conversation = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  min-height: 390px;
  overflow: hidden;
  background: #b9e9d6;
  border-left: 2px solid var(--stroke);
  .board-label {
    position: absolute;
    top: 24px;
    left: 25px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #254d3e;
  }
  .speech {
    position: absolute;
    width: 215px;
    height: 175px;
    padding: 20px 22px;
    background: #fff;
    border: 2px solid var(--stroke);
    border-radius: 6px;
    box-shadow: 6px 6px 0 var(--stroke);
    transform: rotate(-7deg);
    top: 75px;
    left: 9%;
  }
  .speech.reply {
    background: #fff0b8;
    transform: rotate(7deg);
    top: 193px;
    left: auto;
    right: 8%;
  }
  .speech small {
    font-size: 12px;
    letter-spacing: 1.8px;
    font-weight: 700;
    display: block;
    margin-bottom: 17px;
  }
  .speech b {
    font-size: 32px;
    letter-spacing: -1.5px;
    line-height: 1.4;
    display: block;
  }
  .speech .number {
    position: absolute;
    right: 14px;
    top: 15px;
    font-size: 14px;
    font-weight: 700;
  }
  .asterisk {
    position: absolute;
    top: 57px;
    right: 27px;
    font-size: 88px;
    font-family: serif;
    font-weight: 700;
    line-height: 1;
    transform: rotate(15deg);
  }
  .small-cross {
    position: absolute;
    left: 29px;
    bottom: 38px;
    font-size: 43px;
    font-weight: 400;
  }
  .caption {
    position: absolute;
    right: 22px;
    bottom: 17px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
  }
  @media (max-width: 1100px) {
    .speech {
      width: 180px;
      height: 160px;
      left: 7%;
    }
    .speech b {
      font-size: 29px;
    }
    .speech.reply {
      right: 7%;
      top: 194px;
    }
  }
  @media (max-width: 900px) and (min-width: 721px) {
    .speech {
      width: 155px;
      height: 145px;
      padding: 17px;
      top: 85px;
    }
    .speech b {
      font-size: 26px;
    }
    .speech.reply {
      top: 220px;
    }
    .asterisk {
      font-size: 68px;
    }
  }
  @media (max-width: 720px) {
    border-left: 0;
    border-top: 2px solid var(--stroke);
    min-height: 395px;
    .speech {
      width: 180px;
      height: 155px;
      top: 65px;
      left: 9%;
    }
    .speech.reply {
      top: 179px;
      right: 8%;
    }
    .speech b {
      font-size: 29px;
    }
    .asterisk {
      top: 45px;
      right: 19px;
      font-size: 72px;
    }
    .small-cross {
      left: 22px;
      bottom: 28px;
    }
    .board-label {
      top: 20px;
      left: 22px;
      font-size: 12px;
    }
  }
`
export default function ArenaPreview() {
  return (
    <Conversation role="img" aria-label="서로 다른 두 관점을 담은 토론 말풍선">
      <span className="board-label">DIFFERENT TAKES. BETTER IDEAS.</span>
      <span className="asterisk" aria-hidden="true">
        ✳
      </span>
      <div className="speech">
        <small>POINT OF VIEW A</small>
        <span className="number">↗</span>
        <b>
          가능성에
          <br />한 표.
        </b>
      </div>
      <div className="speech reply">
        <small>POINT OF VIEW B</small>
        <span className="number">↙</span>
        <b>
          기준부터
          <br />
          명확하게.
        </b>
      </div>
      <span className="small-cross" aria-hidden="true">
        +
      </span>
      <span className="caption">LET'S TALK IT THROUGH.</span>
    </Conversation>
  )
}

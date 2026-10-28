/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { Btn } from '../design/Button'
import { eyeBrowCss } from '../design/Eyebrow'
import { Badge } from '../design/Badge'

export default function DebatePage() {
  const [tocOpen, setTocOpen] = useState(true)
  return (
    <>
      <div className="title-row">
        <div css={eyeBrowCss}>DAY 03 · LIVE DEBATE</div>
        <h1 className="page-title">인공지능이 만든 창작물에도 저작권을 인정해야 할까요?</h1>
        <div className="sub">우리의 프롬프트로 시작된 두 AI의 토론을 함께 지켜보세요.</div>
      </div>
      <div className="topline" css={{ marginBottom: '20px' }}>
        <Badge>● LIVE　·　찬성측 입론 진행 중</Badge>
        <Btn small>♫ 음성으로 듣기</Btn>
      </div>
      <Btn
        small
        type="button"
        className="toc-toggle"
        aria-expanded={tocOpen}
        onClick={() => setTocOpen((open) => !open)}
      >
        ☷ 토론 목차 {tocOpen ? '접기' : '열기'}
      </Btn>
      <div className={clsx('debate-layout', { 'toc-closed': !tocOpen })}>
        {tocOpen ? (
          <aside className="panel toc">
            <h3>토론 목차</h3>
            <a href="#stage0">1. 찬성측 입론</a>
            <a href="#stage1">2. 반대측 입론</a>
            <a href="#stage2">3. 찬성측 반론</a>
            <a href="#stage3">4. 반대측 반론</a>
            <a href="#stage4">5. 최종 발언</a>
            <hr className="divider" />
            <p className="empty-note">
              목차를 선택하면
              <br />
              해당 발언으로 이동합니다.
            </p>
          </aside>
        ) : null}
        <section>
          <article className="debate-msg " id="stage0">
            <div className="msghead">
              <span className="avatar">A</span>
              <b>찬성 AI</b>
              <Badge>찬성측 입론</Badge>
              <small>14:30</small>
            </div>
            <p>
              창작의 본질은 도구가 아니라 의도에 있습니다. 우리는 카메라로 찍은 사진의 저작권을
              인정합니다. 마찬가지로 AI를 활용해 독창적인 결과물을 만든 사람의 창작적 기여도
              살펴봐야 합니다.
            </p>
            <div className="reactions">
              <button aria-label="공감 반응">👏 12</button>
              <button aria-label="생각 반응">💡 8</button>
              <button aria-label="좋아요 반응">🌿 5</button>
            </div>
          </article>
          <article className="debate-msg opposing" id="stage1">
            <div className="msghead">
              <span className="avatar">B</span>
              <b>반대 AI</b>
              <Badge>반대측 입론</Badge>
              <small>14:33</small>
            </div>
            <p>
              저작권은 인간의 독창적인 표현을 보호하는 제도입니다. AI가 생성한 결과물에 동일한
              권리를 부여하기 전에, 실제 창작의 주체와 책임을 명확히 해야 합니다.
            </p>
            <div className="reactions">
              <button aria-label="공감 반응">👏 15</button>
              <button aria-label="생각 반응">💡 9</button>
              <button aria-label="좋아요 반응">🌿 6</button>
            </div>
          </article>
          <article className="debate-msg " id="stage2">
            <div className="msghead">
              <span className="avatar">A</span>
              <b>찬성 AI</b>
              <Badge>찬성측 반론</Badge>
              <small>14:36</small>
            </div>
            <p>
              상대측이 지적한 책임의 문제에 공감합니다. 그래서 모든 AI 결과물을 일률적으로 보호하는
              대신, 인간의 실질적인 기획과 수정이 포함된 창작물을 구분하자고 제안합니다.
            </p>
            <div className="reactions">
              <button aria-label="공감 반응">👏 18</button>
              <button aria-label="생각 반응">💡 10</button>
              <button aria-label="좋아요 반응">🌿 7</button>
            </div>
          </article>
          <article className="debate-msg opposing" id="stage3">
            <div className="msghead">
              <span className="avatar">B</span>
              <b>반대 AI</b>
              <Badge>반대측 반론</Badge>
              <small>14:39</small>
            </div>
            <p>
              인간의 기여를 구분하는 기준은 여전히 모호합니다. 프롬프트를 입력하는 행위와 구체적인
              표현을 직접 창작하는 행위를 같은 수준으로 볼 수 있는지 검토해야 합니다.
            </p>
            <div className="reactions">
              <button aria-label="공감 반응">👏 21</button>
              <button aria-label="생각 반응">💡 11</button>
              <button aria-label="좋아요 반응">🌿 8</button>
            </div>
          </article>
          <article className="debate-msg " id="stage4">
            <div className="msghead">
              <span className="avatar">A</span>
              <b>찬성 AI</b>
              <Badge>최종 발언</Badge>
              <small>14:42</small>
            </div>
            <p>
              오늘의 토론은 기술의 가능성과 창작자의 권리 사이에서 새로운 기준이 필요하다는 점을
              보여주었습니다. 변화하는 창작 환경에 맞는 구체적인 논의를 이어가야 합니다.
            </p>
            <div className="reactions">
              <button aria-label="공감 반응">👏 24</button>
              <button aria-label="생각 반응">💡 12</button>
              <button aria-label="좋아요 반응">🌿 9</button>
            </div>
          </article>
        </section>
        <aside className="panel">
          <h3>
            실시간 채팅 <Badge>LIVE</Badge>
          </h3>
          <p className="empty-note">함께 만드는 토론의 공간</p>
          <div className="superchat">
            <small>✦ 상단 고정 메시지 · 디자인 예시</small>
            <div className="chatline">
              <b>지우</b>학습 데이터의 저작권도 함께 생각해 보면 좋겠어요.
            </div>
          </div>
          <div className="chatline">
            <b>서연</b>좋은 관점이에요!
          </div>
          <div className="chatline">
            <b>도윤</b>창작자의 기여도를 기준으로 하면 어떨까요?
          </div>
          <div className="chatline">
            <b>하린</b>반론도 미리 준비해 봐요 🌿
          </div>
          <div className="chatinput">
            <label htmlFor="message">메시지</label>
            <input id="message" placeholder="함께 의견을 나눠보세요" />
            <div className="topline" css={{ marginTop: '10px' }}>
              <Link className="sub" to="/shop">
                ✦ 강조 아이템
              </Link>
              <Btn small>전송 ↑</Btn>
            </div>
          </div>
          <p className="empty-note">
            이모지 반응은 상점에서 영구 사용권을 구매해 이용할 수 있습니다.
          </p>
        </aside>
      </div>
    </>
  )
}

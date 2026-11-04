import type { ArchivedDebate } from './archive.types'
import type { DebateTurn } from '../debate/debate.types'

export const debates: readonly ArchivedDebate[] = [
  {
    round: '11',
    title: 'AI 창작물에도 저작권을 인정해야 할까요?',
    date: '2026. 10. 18',
  },
  {
    round: '10',
    title: '주 4일 근무제를 도입해야 할까요?',
    date: '2026. 10. 15',
  },
  {
    round: '09',
    title: '동물실험을 계속 허용해야 할까요?',
    date: '2026. 10. 12',
  },
  {
    round: '08',
    title: 'AI 교사가 인간 교사를 대체할 수 있을까요?',
    date: '2026. 10. 09',
  },
  {
    round: '07',
    title: '기본소득은 필요한 제도일까요?',
    date: '2026. 10. 06',
  },
  {
    round: '06',
    title: '자율주행차의 판단을 신뢰할 수 있을까요?',
    date: '2026. 10. 03',
  },
]

export const replayMessages: readonly DebateTurn[] = [
  {
    id: 'stage0',
    side: 'supporting',
    stage: '찬성측 입론',
    content:
      '창작의 본질은 도구가 아니라 의도에 있다고 생각해요. 💡 우리는 카메라로 찍은 사진의 저작권을 인정하잖아요. 마찬가지로 AI를 활용해 독창적인 결과물을 만든 사람의 창작적 기여도 살펴봐야 하지 않을까요?',
  },
  {
    id: 'stage1',
    side: 'opposing',
    stage: '반대측 입론',
    content:
      '도구를 활용한 사람의 기여를 보자는 취지는 이해해요. 다만 저작권은 인간의 독창적인 표현을 보호하는 제도예요. 🤔 AI가 생성한 결과물에 같은 권리를 부여하려면, 실제로 누가 창작했고 책임은 누구에게 있는지 먼저 명확히 해야 해요.',
  },
  {
    id: 'stage2',
    side: 'supporting',
    stage: '찬성측 반론',
    content:
      '책임의 문제를 짚어주신 점에 공감해요. 그래서 모든 AI 결과물을 똑같이 보호하자는 건 아니에요. 사람이 직접 기획하고 실질적으로 수정한 창작물을 구분해서 살펴보자는 제안이에요.',
  },
  {
    id: 'stage3',
    side: 'opposing',
    stage: '반대측 반론',
    content:
      '그렇다면 인간의 기여를 어떻게 구분할지가 핵심이겠네요. 프롬프트를 입력하는 것과 구체적인 표현을 직접 창작하는 것을 같은 수준으로 볼 수 있을까요? 그 경계에 대한 기준이 더 필요하다고 봐요.',
  },
  {
    id: 'stage4',
    side: 'supporting',
    stage: '최종 발언',
    content:
      '결국 새로운 기준이 필요하다는 점에서는 의견이 모이네요. 🌿 기술의 가능성과 창작자의 권리를 함께 살피면서, 어떤 기여를 보호할지 구체적인 논의를 이어가면 좋겠어요.',
  },
]

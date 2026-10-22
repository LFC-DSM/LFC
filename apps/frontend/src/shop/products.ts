export type ProductCategory = 'background' | 'highlight' | 'emoji'
export interface Product {
  category: ProductCategory
  tag: string
  name: string
  description: string
  price: number
  icon: string
  color: string
}
export const categories: { id: ProductCategory | 'all'; name: string }[] = [
  { id: 'all', name: '전체' },
  { id: 'background', name: '채팅 배경' },
  { id: 'highlight', name: '채팅 아이템' },
  { id: 'emoji', name: '이모지 사용권' },
]
export const products: Product[] = [
  {
    category: 'background',
    tag: '채팅 배경',
    name: '포레스트 미스트',
    description: '차분한 숲빛으로 채팅창을 채워보세요.',
    price: 600,
    icon: '🌿',
    color: '',
  },
  {
    category: 'highlight',
    tag: '채팅 아이템',
    name: '제이드 스포트라이트',
    description: '당신의 의견을 채팅 상단에 띄워보세요.',
    price: 300,
    icon: 'highlight',
    color: '',
  },
  {
    category: 'emoji',
    tag: '이모지 사용권 · 영구',
    name: '생각의 순간들',
    description: 'AI의 발언에 나만의 반응을 남기세요.',
    price: 1200,
    icon: '👏 💡',
    color: 'gold',
  },
  {
    category: 'background',
    tag: '채팅 배경',
    name: '미드나잇 블루',
    description: '깊은 밤의 분위기를 담은 채팅 배경.',
    price: 600,
    icon: '☾',
    color: 'blue',
  },
  {
    category: 'highlight',
    tag: '채팅 아이템',
    name: '골든 하이라이트',
    description: '눈에 띄는 골드빛 강조 메시지.',
    price: 500,
    icon: '✦',
    color: 'gold',
  },
  {
    category: 'emoji',
    tag: '이모지 사용권 · 영구',
    name: '그린 리액션',
    description: '마음에 닿은 논리에 초록빛 응원을.',
    price: 900,
    icon: '🌱 🌿',
    color: '',
  },
]

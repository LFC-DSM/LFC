import type { ComponentType } from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Day1Page from './debate-cycle/Day1Page'
import Day2Page from './debate-cycle/Day2Page'
import Day3Page from './debate-cycle/Day3Page'
import VotePage from './topics/VotePage'
import Topic0Page from './topics/Topic0Page'
import Topic1Page from './topics/Topic1Page'
import Topic2Page from './topics/Topic2Page'
import BetPage from './betting/BetPage'
import PromptPage from './prompt/PromptPage'
import DebatePage from './debate/DebatePage'
import ArchivePage from './archive/ArchivePage'
import ReplayPage from './archive/ReplayPage'
import ShopPage from './shop/ShopPage'
import MyPage from './account/MyPage'
import LoginPage from './account/LoginPage'
import SignupPage from './account/SignupPage'
import { DesignSurface } from './design/DesignSurface'
import GlobalStyles from './design/GlobalStyles'
import DayNavigation from './debate-cycle/DayNavigation'

// Presentation fixtures only. Replace these with authenticated service data.
const previewUser = { name: '서연', bettingBalance: 12500, shopBalance: 2400 }
const routes: Record<string, ComponentType> = {
  vote: VotePage,
  bet: BetPage,
  prompt: PromptPage,
  debate: DebatePage,
  archive: ArchivePage,
  replay: ReplayPage,
  shop: ShopPage,
  mypage: MyPage,
  login: LoginPage,
  signup: SignupPage,
}
const dayPages = [Day1Page, Day2Page, Day3Page]
const topicPages = [Topic0Page, Topic1Page, Topic2Page]
const boundedIndex = (value: string | null, fallback: number, min: number, max: number) => {
  const number = Number(value ?? fallback)
  return Number.isInteger(number) ? Math.min(max, Math.max(min, number)) : fallback
}
export default function App() {
  const params = new URLSearchParams(window.location.search)
  const page = params.get('page') ?? (params.has('day') ? 'home' : 'login')
  const day = boundedIndex(params.get('day'), 1, 1, 3)
  const topic = boundedIndex(params.get('id'), 0, 0, 2)
  const activeDay = ['bet', 'prompt'].includes(page)
    ? 2
    : ['debate', 'replay'].includes(page)
      ? 3
      : page === 'vote' || page === 'topic'
        ? 1
        : day
  const Page = page === 'topic' ? topicPages[topic] : (routes[page] ?? dayPages[day - 1])
  const guest = ['login', 'signup', 'home-guest'].includes(page)
  return (
    <DesignSurface>
      <GlobalStyles />
      <Header user={guest ? null : previewUser} />
      <main className="container">
        {!['login', 'signup'].includes(page) ? <DayNavigation day={activeDay} /> : null}
        <Page />
      </main>
      <Footer />
    </DesignSurface>
  )
}

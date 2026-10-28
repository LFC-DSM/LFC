import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import DayNavigation from '../debate-cycle/DayNavigation'

const previewUser = { name: '서연', bettingBalance: 12500, shopBalance: 2400 }

const DAY_BY_PATH: Record<string, number> = {
  '/': 1,
  '/day/1': 1,
  '/vote': 1,
  '/day/2': 2,
  '/bet': 2,
  '/prompt': 2,
  '/day/3': 3,
  '/debate': 3,
  '/archive/replay': 3,
}

export default function RootLayout() {
  const { pathname } = useLocation()
  const activeDay = DAY_BY_PATH[pathname] ?? 1
  return (
    <>
      <Header user={previewUser} />
      <main className="container">
        <DayNavigation day={activeDay} />
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

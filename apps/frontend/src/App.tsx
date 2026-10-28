import { Routes, Route, Navigate } from 'react-router-dom'
import Day1Page from './debate-cycle/Day1Page'
import Day2Page from './debate-cycle/Day2Page'
import Day3Page from './debate-cycle/Day3Page'
import VotePage from './topics/VotePage'
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
import RootLayout from './layout/RootLayout'
import AuthLayout from './layout/AuthLayout'

export default function App() {
  return (
    <DesignSurface>
      <GlobalStyles />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route index element={<Navigate to="/day/1" replace />} />
          <Route path="/day/1" element={<Day1Page />} />
          <Route path="/day/2" element={<Day2Page />} />
          <Route path="/day/3" element={<Day3Page />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/bet" element={<BetPage />} />
          <Route path="/prompt" element={<PromptPage />} />
          <Route path="/debate" element={<DebatePage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/archive/replay" element={<ReplayPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/me" element={<MyPage />} />
        </Route>
      </Routes>
    </DesignSurface>
  )
}

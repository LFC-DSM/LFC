import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function AuthLayout() {
  return (
    <>
      <Header user={null} />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

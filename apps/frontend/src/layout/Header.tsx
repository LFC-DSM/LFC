import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import { Btn, BtnLink } from '../design/Button'

export interface HeaderUser {
  name: string
  bettingBalance: number
  shopBalance: number
}

export interface HeaderProps {
  user: HeaderUser | null
}

export default function Header({ user }: HeaderProps) {
  const { pathname } = useLocation()
  const onArchive = pathname.startsWith('/archive')
  const onShop = pathname === '/shop'
  const onMe = pathname === '/me'

  return user ? (
    <header>
      <Link className="brand" to="/day/1">
        ◈ LFC{' '}
      </Link>
      <nav>
        <Link className={clsx({ active: !onArchive && !onShop && !onMe })} to="/day/1">
          이번 토론
        </Link>
        <Link className={clsx({ active: onArchive })} to="/archive">
          지난 토론
        </Link>
        <Link className={clsx({ active: onShop })} to="/shop">
          상점
        </Link>
      </nav>
      <div className="account">
        <span className="wallet">
          ◈ {user.bettingBalance.toLocaleString()} <span className="muted">TK</span>&nbsp;
          <span className="coin">✦ {user.shopBalance.toLocaleString()}</span>{' '}
          <span className="muted">CRD</span>
        </span>
        <Link to="/me">
          <span className="avatar">{user.name.slice(0, 1)}</span>&nbsp;{user.name} 님⌄
        </Link>
      </div>
    </header>
  ) : (
    <header>
      <Link className="brand" to="/login">
        ◈ LFC
      </Link>
      <div className="account">
        <Link to="/login">로그인</Link>
        <BtnLink primary small to="/signup">
          회원가입
        </BtnLink>
      </div>
    </header>
  )
}

import clsx from 'clsx'

export interface HeaderUser {
  name: string
  bettingBalance: number
  shopBalance: number
}

export interface HeaderProps {
  user: HeaderUser | null
}

export default function Header({ user }: HeaderProps) {
  const page = new URLSearchParams(window.location.search).get('page') ?? 'home'

  return user ? (
    <header>
      <a className="brand" href="?page=home">
        ◈ LFC{' '}
      </a>
      <nav>
        <a
          className={clsx({ active: !['archive', 'replay', 'shop', 'mypage'].includes(page) })}
          href="?page=home"
        >
          이번 토론
        </a>
        <a className={clsx({ active: ['archive', 'replay'].includes(page) })} href="?page=archive">
          지난 토론
        </a>
        <a className={clsx({ active: page === 'shop' })} href="?page=shop">
          상점
        </a>
      </nav>
      <div className="account">
        <span className="wallet">
          ◈ {user.bettingBalance.toLocaleString()} <span className="muted">TK</span>&nbsp;
          <span className="coin">✦ {user.shopBalance.toLocaleString()}</span>{' '}
          <span className="muted">CRD</span>
        </span>
        <a href="?page=mypage">
          <span className="avatar">{user.name.slice(0, 1)}</span>&nbsp;{user.name} 님⌄
        </a>
      </div>
    </header>
  ) : (
    <header>
      <a className="brand" href="?page=login">
        ◈ LFC
      </a>
      <div className="account">
        <a href="?page=login">로그인</a>
        <a className="btn primary small" href="?page=signup">
          회원가입
        </a>
      </div>
    </header>
  )
}

export interface HeaderUser {
  name: string
  bettingBalance: number
  shopBalance: number
}
export default function Header({ user }: { user: HeaderUser | null }) {
  const page = new URLSearchParams(window.location.search).get('page') ?? 'home'
  return user ? (
    <header>
      <a className="brand" href="?page=home">
        ◈ LFC{' '}
      </a>
      <nav>
        <a
          className={!['archive', 'replay', 'shop', 'mypage'].includes(page) ? 'active' : ''}
          href="?page=home"
        >
          이번 토론
        </a>
        <a className={['archive', 'replay'].includes(page) ? 'active' : ''} href="?page=archive">
          지난 토론
        </a>
        <a className={page === 'shop' ? 'active' : ''} href="?page=shop">
          상점
        </a>
      </nav>
      <div className="account">
        <span className="wallet">
          ◈ {user.bettingBalance.toLocaleString()} <span className="muted">TK</span>　
          <span className="coin">✦ {user.shopBalance.toLocaleString()}</span>{' '}
          <span className="muted">CRD</span>
        </span>
        <a href="?page=mypage">
          <span className="avatar">{user.name.slice(0, 1)}</span>　{user.name} 님⌄
        </a>
      </div>
    </header>
  ) : (
    <header>
      <a className="brand" href="?page=login">
        ◈ LFC{' '}
        <span>
          LET'S FORM
          <br />
          THE CONVERSATION
        </span>
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

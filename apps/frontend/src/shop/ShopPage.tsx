import clsx from 'clsx'
import { Btn } from '../design/Button'
import { categories, products } from './products'

export default function ShopPage() {
  return (
    <>
      <div className="title-row">
        <div className="eyebrow">A LITTLE MORE YOU</div>
        <h1 className="page-title">생각을 표현하는, 나만의 방식.</h1>
        <div className="sub">채팅을 꾸미고, 의견을 강조하고, 마음에 드는 논리에 반응해 보세요.</div>
      </div>
      <div className="topline">
        <div className="badge">✦ 보유 상점 재화　2,400 CRD</div>
        <input
          className="search"
          id="product-search"
          placeholder="⌕  아이템 검색"
          aria-label="아이템 검색"
        />
      </div>
      <div className="tabs" aria-label="상품 분류">
        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            className={clsx({ active: category.id === 'all' })}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="grid" id="products">
        {products.map((product) => (
          <article key={product.name} className="card product">
            <div className={clsx('product-art', product.color)}>
              {product.icon === 'highlight' ? (
                <div className="chat-preview">✦ 서연　좋은 생각은 더 잘 보이게.</div>
              ) : (
                product.icon
              )}
            </div>
            <span className="badge">{product.tag}</span>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="product-price">
              <b className="coin">✦ {product.price.toLocaleString()} CRD</b>
              <Btn small type="button">
                구매하기
              </Btn>
            </div>
          </article>
        ))}
      </div>
      <p className="empty-note">상점에서는 CRD만 사용합니다. TK는 베팅 전용 재화입니다.</p>
    </>
  )
}

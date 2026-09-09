import Link from "next/link"
export default function Page(){return <main className="section shell"><div className="eyebrow">CART</div><h1>장바구니</h1><p className="sub">현재 UI 골격까지 구현되어 있습니다. 실제 상품 추가·수량·금액·주문 생성은 Medusa Cart API 연결 후 활성화됩니다.</p><div className="cat"><b>아직 담긴 상품이 없습니다.</b><span>상품을 고른 뒤 수령 지역과 가능 시간을 결제 전에 확인하도록 설계합니다.</span><br/><Link href="/refill">REFILL 보기 →</Link></div></main>}

import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import {products} from "@/lib/products"
export default function Home(){return <main>
 <section className="hero"><div className="shell"><div className="eyebrow">WORKNIC STATION · TOOL NETWORK</div><h1>필요한 도구를,<br/>필요한 곳 가까이.</h1><p>상품 수보다 선택의 기준을 먼저 만듭니다. 포천의 상품 기반과 지역 STATION을 연결해 작업이 멈추는 시간을 줄입니다.</p></div></section>
 <section className="section shell"><h2>무엇을 찾고 계신가요?</h2><p className="sub">상품 이름보다 지금 하려는 일에서 시작해도 됩니다.</p><div className="grid4">
 <Link className="cat" href="/refill"><b>리필</b><span>다 쓰고, 닳고, 떨어져 다시 필요한 것<br/>REFILL</span></Link>
 <Link className="cat" href="/tools"><b>도구</b><span>자주 꺼내 쓰는 기본 도구<br/>TOOLS</span></Link>
 <Link className="cat" href="/select"><b>워크닉 셀렉트</b><span>이유가 있어 오래 함께 고른 제품<br/>SELECT</span></Link>
 <Link className="cat" href="/project"><b>작업별 찾기</b><span>재다 · 자르다 · 뚫다 · 체결하다<br/>PROJECT</span></Link></div></section>
 <section className="section shell"><h2>지금 시작하는 상품</h2><p className="sub">검증된 모델과 가격부터 공개합니다. 현재 재고 수량은 운영 데이터 연결 후 표시합니다.</p><div className="products">{products.slice(0,4).map(p=><ProductCard key={p.slug} p={p}/>)}</div></section>
 <section className="section shell"><div className="network"><div><div className="eyebrow">STATION NETWORK</div><h2>포천에서 구리로,<br/>필요한 도구를 연결합니다.</h2><p className="sub">경기도 · 포천은 운영 기반입니다. 경기도 · 구리는 실제 수령 장소 확정 전까지 서비스 예정 권역으로 표시합니다.</p><Link href="/station"><b>STATION 보기 →</b></Link></div><div className="route"><span className="node p"></span><label className="lp">경기도 · 포천</label><span className="node g"></span><label className="lg">경기도 · 구리</label></div></div></section>
 </main>}

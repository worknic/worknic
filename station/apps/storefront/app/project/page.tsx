import Link from "next/link"
const jobs=["재다","표시하다","자르다","뚫다","체결하다","고정하다","잡다","다듬다","갈다","보수하다","정리하다","운반하다"]
export default function Page(){return <main className="section shell"><div className="eyebrow">PROJECT · TOOL MAP</div><h1>제품보다 작업에서 시작합니다.</h1><p className="sub">PROJECT는 별도 재고가 아니라 REFILL·TOOLS·SELECT의 상품을 작업 순서로 다시 연결하는 방식입니다.</p><div className="grid4">{jobs.map(j=><Link className="cat" key={j} href={`/search?q=${encodeURIComponent(j)}`}><b>{j}</b><span>이 작업에 필요한 구성 보기</span></Link>)}</div></main>}

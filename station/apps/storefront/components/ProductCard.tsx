import Link from "next/link"
import {money,WorknicProduct} from "@/lib/products"
export default function ProductCard({p}:{p:WorknicProduct}){return <Link href={`/products/${p.slug}`} className="product"><div className="thumb">공식 상품 이미지 연결 예정</div><div className="info"><div className="brand">{p.brand} · {p.model}</div><div className="title">{p.name}</div><div className="price">{money(p.price)}</div><div className="pickup">{p.pickup}</div></div></Link>}

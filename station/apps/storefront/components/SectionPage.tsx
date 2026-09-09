import ProductCard from "./ProductCard"
import {products} from "@/lib/products"
export default function SectionPage({section,title,description}:{section:"REFILL"|"TOOLS"|"SELECT";title:string;description:string}){const list=products.filter(p=>p.section===section);return <main className="section shell"><div className="eyebrow">{section}</div><h1>{title}</h1><p className="sub">{description}</p><div className="products">{list.map(p=><ProductCard key={p.slug} p={p}/>)}</div></main>}

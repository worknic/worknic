import "./globals.css"
import Link from "next/link"

export const metadata = {
  title: "WORKNIC STATION",
  description: "도구를 고르는 기준은, 결국 삶의 태도입니다.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://worknic.company"),
}

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="ko"><body>
  <header className="top"><div className="shell head">
   <Link className="logo" href="/">WORKNIC<small>STATION</small></Link>
   <form action="/search"><input className="search" name="q" placeholder="어떤 제품을 찾고 계신가요?" aria-label="상품 검색" /></form>
   <div className="utility"><Link href="/station">경기도 · 포천</Link>　<Link href="/cart">장바구니</Link></div>
  </div></header>
  <nav className="nav"><div className="shell navin"><Link href="/refill">리필 <small>REFILL</small></Link><Link href="/tools">도구 <small>TOOLS</small></Link><Link href="/select">워크닉 셀렉트 <small>SELECT</small></Link><Link href="/project">작업별 찾기 <small>PROJECT</small></Link><Link href="/station">스테이션</Link></div></nav>
  {children}
  <footer className="footer"><div className="shell"><b>WORKNIC</b><br/>도구를 고르는 기준은, 결국 삶의 태도입니다.<br/>경기도 포천시 화현면 · worknic.company</div></footer>
  <div className="mobilebar"><Link href="/">홈</Link><Link href="/search">검색</Link><Link href="/station">수령</Link><Link href="/cart">장바구니</Link></div>
 </body></html>
}

# worknic.company deployment checklist

## 1. Backend
- PostgreSQL 15+ 생성
- `apps/backend/.env`에 DATABASE_URL, JWT_SECRET, COOKIE_SECRET 설정
- STORE_CORS/AUTH_CORS에 `https://worknic.company` 등록
- Medusa migration 실행
- Admin 사용자 생성
- KRW region / sales channel / stock location 생성
- Publishable API key 발급

## 2. Storefront
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` 설정
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` 설정
- `NEXT_PUBLIC_SITE_URL=https://worknic.company`
- Next.js production build 검증

## 3. Domain
- 배포 서비스에서 `worknic.company` custom domain 등록
- 가비아 DNS를 배포 서비스가 안내한 A/CNAME으로 변경
- HTTPS 인증서 발급 확인
- www 사용 시 canonical을 worknic.company로 통일

## 4. Products
- `data/products-opening.csv`의 검증 상품부터 관리자 등록
- 공식/공급사 승인 상품 이미지 적용
- Draft 상태에서 검수 후 Published
- 실제 현재고 소스가 연결되기 전 재고 수량을 임의 표시하지 않음

## 5. Pickup
- POCHEON = ACTIVE
- GURI = PLANNED로 시작
- 구리 실제 주소/운영시간/인계 책임자 확정 후 PICKUP 활성화
- 결제 전에 수령 지역과 promised time 확인

## 6. Payment
- 개발 단계에서는 테스트 결제만 사용
- PG 사업자 심사/라이브 키 완료 후 카드/간편결제 활성화
- 네이버페이/카카오페이 노출은 실제 계약 및 PG 지원 상태 확인 후 표시

## 7. Go-live gate
- 모바일 360/390/430px QA
- 검색/상품/장바구니/주문/취소/픽업 상태 QA
- 개인정보처리방침/이용약관/사업자정보/환불정책 검토
- 주문 알림과 관리자 처리 테스트
- 20~30명 closed beta 후 public launch

## 현재 외부 권한 blocker
- PostgreSQL 운영 인스턴스/접속 문자열
- 배포 서비스(Netlify 등) 프로젝트 생성 및 환경변수
- worknic.company DNS 변경 권한
- PG merchant 계약/라이브 credentials
- 구리 실제 수령지 확정

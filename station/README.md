# WORKNIC STATION

WORKNIC STATION의 실제 운영형 커머스 개발 베이스입니다.

- Storefront: Next.js 15
- Commerce backend/Admin: Medusa 2.20.1
- Database: PostgreSQL
- Target domain: https://worknic.company
- Initial regions: 경기도 · 포천 / 경기도 · 구리
- Navigation: REFILL / TOOLS / SELECT / PROJECT

## 현재 구현

`apps/storefront`
- WORKNIC 모바일 우선 shell/navigation
- 홈
- REFILL / TOOLS / SELECT
- PROJECT task navigation
- 검색
- 상품 상세
- STATION network
- 장바구니 연결 지점
- 검증된 시작 상품 fixture

`apps/backend`
- Medusa 2 backend package
- production CORS/config skeleton
- environment template

`data`
- 검증된 opening product master CSV

`docs`
- WORKNIC product identity + STATION/ROUTE data model
- 상품등록 운영 기준
- worknic.company 배포/go-live checklist

## 운영 원칙

1. 디자인은 교체 가능하지만 상품·주문·픽업 구조는 유지한다.
2. 고객에게는 실제 운영 상태만 표시한다.
3. POS 전체를 바로 공개하지 않고 identity가 검증된 상품부터 Published 한다.
4. Medusa Admin을 직원용 상품/가격/재고/주문 운영 화면으로 사용한다.
5. Next.js는 고객이 보는 WORKNIC 경험을 담당한다.
6. REFILL은 반복 소모와 규격 깊이, SELECT는 관계와 선택 이유를 중심으로 한다.
7. PROJECT는 별도 재고가 아니라 SKU 간 작업 관계다.

## 다음 연결 단계

코드만으로 완료할 수 없는 항목은 외부 credentials가 필요합니다.

- PostgreSQL 운영 DB 생성 + migration
- Medusa Admin 사용자/Publishable key
- 실제 Inventory Location
- 배포 서비스 프로젝트와 환경변수
- worknic.company DNS
- PG merchant 테스트/라이브 credentials
- 구리 실제 수령지/운영시간

세부 절차: `docs/DEPLOYMENT.md`

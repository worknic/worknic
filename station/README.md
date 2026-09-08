# WORKNIC STATION

WORKNIC STATION의 실제 운영형 커머스 프로젝트입니다.

- 고객 화면: Next.js 15
- 커머스 백엔드/관리자: Medusa 2
- 데이터베이스: PostgreSQL
- 운영 도메인: https://worknic.company
- 1차 지역: 경기도 · 포천 / 경기도 · 구리
- 핵심 탐색: REFILL / TOOLS / SELECT / PROJECT

## 원칙

1. 디자인은 교체 가능하지만 상품·주문·픽업 구조는 유지합니다.
2. 고객에게는 지역을 과장하지 않고 실제 운영 상태만 표시합니다.
3. 상품은 POS 전체를 바로 공개하지 않고 선별 상품부터 Published 합니다.
4. Medusa 관리자에서 상품/가격/재고/주문을 관리하고 Next.js가 고객 화면을 담당합니다.

## 앱 구조

- `apps/backend`: Medusa 백엔드 + Admin
- `apps/storefront`: WORKNIC 고객용 Next.js

## 배포 방향

- `worknic.company`: Storefront
- Medusa backend/admin: 별도 서비스 URL로 배포 후 storefront에서 API 연결
- 운영 전 PG/Npay/Kakao/Toss 실결제와 구리 실제 수령지를 별도 승인합니다.

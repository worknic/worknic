# WORKNIC STATION data model v0.1

## Product identity
`POS 상품코드 -> 브랜드 -> 제조사 품번/모델 -> 규격 -> 바코드 -> Medusa Product/Variant -> 판매이력 -> STATION inventory`

상품명 유사도만으로 동일 상품을 확정하지 않는다.

## Medusa core
- Product / Variant: 판매 상품, SKU, 옵션
- Price: KRW 판매가
- Inventory Item / Location: 운영 재고
- Cart / Order / Customer: 구매 흐름
- Fulfillment: 배송/수령 흐름

## WORKNIC metadata
초기에는 Product metadata로 시작하고 안정화 후 별도 module로 승격한다.

- `worknic_section`: REFILL | TOOLS | SELECT
- `manufacturer_model`: 제조사 품번
- `pos_product_code`: POS 상품코드
- `task_tags`: 작업 태그 배열
- `worknic_note`: 선택 이유
- `recommended_for`: 권함
- `not_recommended_for`: 권하지 않음
- `brand_story_ref`: 브랜드 관계 기록 참조
- `publish_verified`: 상품 identity 검증 여부

## Station model
별도 WORKNIC module 목표 구조:

### Station
- id
- code: POCHEON / GURI
- display_name: 경기도 · 포천 / 경기도 · 구리
- status: ACTIVE | PLANNED | PAUSED
- public_address
- latitude / longitude
- pickup_enabled
- cutoff_time
- public_note

### StationAvailability
- station_id
- variant_id
- source: NODE_STOCK | ROUTE_TRANSFER | BASE_ONLY
- promised_at
- quantity_bucket: AVAILABLE | LOW | NEXT_ROUTE | UNAVAILABLE

정확한 현재고가 연결되지 않은 상태에서는 `quantity`를 고객에게 추정 표시하지 않는다.

### Route
- code: ROUTE_01
- from_station
- to_station
- status
- cutoff_time
- departure_window
- arrival_window

## Order metadata
- fulfillment_mode: PICKUP | DELIVERY
- pickup_station_id
- promised_at
- route_code
- station_status: NEW | PICKING | IN_ROUTE | READY | COMPLETE

## Project / TOOL MAP
PROJECT는 별도 재고 카테고리가 아니다. `task -> ordered product relationships`로 관리한다.
예: 벽에 선반 달기 = 측정 -> 표시 -> 드릴비트 -> 앙카 -> 피스 -> 비트 -> 수평 확인.

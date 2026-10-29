# WORKNIC Naver Commerce Relay

Runs inside the WORKNIC network so outbound Naver Commerce API requests originate from the already allowlisted public IP.

## Environment variables

- NAVER_COMMERCE_CLIENT_ID
- NAVER_COMMERCE_CLIENT_SECRET
- WORKNIC_RELAY_TOKEN
- PORT (default 8787)

## Start

```bash
npm install
npm start
```

## Endpoints

- GET /health
- POST /products/search
- GET /products/:originProductNo
- PUT /products/:originProductNo

PUT defaults to dry-run. Actual Naver modification requires `confirm: true`.

Do not commit secrets.

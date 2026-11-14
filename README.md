# Titanium 5 Collections Enterprise

Premium fashion and lifestyle e-commerce for customers across Nigeria.

## Technology
- Node.js 24 LTS and pnpm workspaces
- React + TypeScript + Vite storefront
- NestJS + TypeScript REST API
- PostgreSQL + Prisma
- Paystack payments (server-side initialization, verification and webhooks)
- Cloudinary product media

## Repository layout
```
apps/web        React storefront
apps/api        NestJS API and Prisma schema
packages/shared shared contracts
docs            architecture and operations
```

## Prerequisites
Install Node.js 24 LTS, pnpm 10+, and Docker with Compose. With nvm:
```bash
nvm install 24
nvm use 24
corepack enable
```

## Quick start
```bash
git clone https://github.com/prosperReigns/titanium.git
cd titanium
nvm use 24
pnpm install
cp .env.example .env
cp apps/api/.env.example apps/api/.env
docker compose up -d postgres
pnpm --filter @titanium/api db:generate
pnpm --filter @titanium/api db:migrate
pnpm dev
```

Storefront: http://localhost:5173  
API: http://localhost:3000/api  
Health: http://localhost:3000/api/health

## Commands
```bash
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm typecheck
pnpm --filter @titanium/api db:studio
```

## Configuration and security
See `.env.example` and `apps/api/.env.example`. Never commit real credentials. Paystack secret keys and Cloudinary API secrets must only exist in the API environment. The server must calculate checkout totals, verify Paystack transactions server-to-server, validate webhook signatures against the raw body, and process webhook events idempotently.

Product prices are integer kobo. Orders retain product/variant/price snapshots. Stock must be reserved transactionally to prevent overselling. Nigerian delivery zones and fees must be configurable and resolved by the API.

## Demonstration catalogue
The initial storefront uses sample catalogue data for layout and interaction testing. These products are not verified inventory. Before launch, replace them with approved products, images, prices, sizes, colour variants and stock through the admin catalogue.

## Production launch checklist
- Strong unique secrets, TLS and managed PostgreSQL with tested backups/restores.
- Authentication, role-based admin authorization and rate limiting.
- Paystack live keys, webhook configuration and idempotency tests.
- Cloudinary production credentials, signed uploads and upload restrictions.
- Real product catalogue, variant stock, delivery zones, return policy and customer support details.
- Email/SMS/WhatsApp provider configuration and consent-aware notifications.
- Dependency/security scans, integration tests, payment end-to-end test, monitoring and alerting.

This project is under active development. A screen is not a production-ready feature until its business rules, security boundaries and integration tests are complete.

# Titanium 5 Collections Enterprise

A Nigeria-first fashion and lifestyle e-commerce storefront for Titanium 5 Collections Enterprise. The repository is a pnpm monorepo with React, NestJS, PostgreSQL, Prisma ORM 7, Paystack and Cloudinary.

## Technology
- Node.js 24 LTS (24.11+), pnpm 10
- React 19, TypeScript, Vite
- NestJS 11 REST API
- PostgreSQL 15+ and Prisma ORM 7 (stable)
- Paystack transaction initialization, server-side verification and signed webhooks
- Cloudinary signed product image uploads

## Repository structure
```
apps/web                 React storefront
apps/api                 NestJS API, Prisma schema and migrations
apps/api/prisma           Database schema, migrations and seed script
docs                      Architecture and deployment guides
render.yaml               Render Blueprint
```

## Run locally (Windows, macOS or Linux)
1. Install Node.js 24.11 or newer in the 24.x line. With nvm: `nvm install 24 && nvm use 24`.
2. Enable pnpm: `corepack enable`.
3. Clone and install:
   ```bash
   git clone https://github.com/prosperReigns/titanium.git
   cd titanium
   git checkout feature/complete-commerce
   nvm use
   pnpm install
   ```
4. Configure environment files:
   ```bash
   cp .env.example .env
   cp apps/api/.env.example apps/api/.env
   ```
   Change the local PostgreSQL password in both files if you change it in the Compose configuration. Set a long random `JWT_ACCESS_SECRET` and a strong `ADMIN_PASSWORD`.
5. Start PostgreSQL and prepare the schema:
   ```bash
   docker compose up -d postgres
   pnpm --filter @titanium/api db:generate
   pnpm --filter @titanium/api db:deploy
   pnpm db:seed
   ```
6. Start the API and storefront together: `pnpm dev`.

Local storefront: http://localhost:5173  
Product pages: http://localhost:5173/product.html?slug=product-slug  
Customer account: http://localhost:5173/account.html  
Checkout: http://localhost:5173/checkout.html  
Local API: http://localhost:3001/api  
Health check: http://localhost:3000/api/health  
Admin: http://localhost:5173/admin

For local development, Vite proxies `/api` to NestJS. In production, NestJS serves the built React app and API from one Render web service.

## Prisma ORM version and configuration
This project intentionally uses Prisma ORM 7, the current stable major line documented by Prisma. Prisma ORM 8 is in release-candidate status in the current documentation; it is not selected for this test build. The implementation uses the Prisma 7 `prisma-client` generator with an explicit output directory, a `prisma.config.ts` file for the database URL and migrations, and the PostgreSQL driver adapter `@prisma/adapter-pg`. See the official [Prisma ORM 7 documentation](https://www.prisma.io/docs/orm/v7), [Prisma 7 upgrade guide](https://www.prisma.io/docs/guides/upgrade-prisma-orm/postgresql) and [PostgreSQL driver adapter guide](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections).

Commands:
- `pnpm db:generate` regenerate the typed client after schema changes.
- `pnpm db:migrate` create/apply a development migration.
- `pnpm --filter @titanium/api db:deploy` apply committed migrations in staging/production.
- `pnpm db:seed` insert the demonstration catalogue, delivery zones and admin user.
- `pnpm db:studio` open Prisma Studio.

Never use `migrate dev` against production. Commit every migration generated during local development.

## Paystack test mode
Add Paystack test keys to `apps/api/.env`. Set callback URL to `http://localhost:5173/checkout/verify` locally. Configure the Paystack webhook URL to `https://YOUR_HOST/api/payments/paystack/webhook`. The server calculates the order total in kobo, initializes the transaction, verifies reference/amount/currency with Paystack, validates the webhook signature using the raw request body, and makes webhook processing idempotent. A browser redirect alone never marks an order paid.

## Cloudinary
Configure cloud name, API key and API secret in the API environment. The authenticated admin endpoint `GET /api/media/signature` returns short-lived signed upload parameters for the `titanium5/products` folder. Upload directly from the admin client; never expose the API secret in React. Store the returned secure URL and public ID on the product image record.

## Render deployment
The repository includes `render.yaml`. In Render, create a Blueprint and connect this GitHub repository. It defines a Node web service and managed PostgreSQL database. For testing, deploy the `feature/complete-commerce` branch; change the Blueprint branch to `main` when ready. Configure the Paystack test keys, Cloudinary credentials and a unique admin password in the Render dashboard. Render injects the database connection string and generates the JWT secret. The build generates Prisma Client and builds both workspaces; the start command applies committed migrations, seeds demo data idempotently and starts NestJS. Render serves the React build from the same origin.

If you choose to create Render services manually, use Node 24, repository root as the web service root, the build/start commands in `render.yaml`, and set health check path to `/api/health`. Keep the web service and database in the same Render region. Do not commit secrets or a production database URL.

## API endpoints
- `GET /api/health`
- `GET /api/catalog/categories`, `GET /api/catalog/products?category=shoes&q=loafer`, `GET /api/catalog/products/:slug`
- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/admin/login`
- `POST /api/orders/checkout`, `GET /api/orders/track/:orderNumber?email=...`
- `POST /api/payments/verify`, `POST /api/payments/paystack/webhook`
- Admin (Bearer token): `GET /api/admin/dashboard`, product CRUD, orders, delivery zones
- Admin (Bearer token): `GET /api/media/signature`

## Important testing notes
- The seeded catalogue and prices are demonstration data, not approved live inventory.
- Prices are integer kobo. Replace the demonstration products, images, prices, stock and delivery fees before launch.
- Checkout requires a configured Paystack test secret and a delivery zone matching the supplied state/area.
- Paystack webhooks require a public URL; use your Render test deployment for webhook end-to-end tests.
- Customer account registration/login endpoints are available. Checkout requires an authenticated customer account; the API verifies the customer JWT and attaches the customer ID to each order.
- Configure support email/phone, return/refund policy, privacy policy, delivery SLA and real product variants before production.

## Quality and security checklist
Before real sales, run the build and tests; add automated integration tests for payment and concurrent inventory reservation; rotate all credentials; enforce admin MFA/strong passwords; add rate limiting and request logging with PII redaction; set up email/SMS order notifications; add a scheduled reservation expiry worker; test backup/restore; configure monitoring; and perform a security review. This is a production-oriented test foundation, not a claim of completed third-party certification or a substitute for live payment testing.

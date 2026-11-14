# Architecture overview

- `apps/web`: React customer storefront. Presentation and client interaction only; it must not own authoritative pricing, inventory, payment verification or order state.
- `apps/api`: NestJS REST API. Authentication, catalogue, cart/checkout, orders, delivery and Paystack/Cloudinary integrations belong here.
- `apps/api/prisma`: PostgreSQL data model and migrations.
- `packages/shared`: shared API contracts and non-sensitive domain types.

## Commerce invariants
1. Store money as integer kobo, never floating-point naira.
2. The API calculates totals using current server-side prices and delivery configuration. Never trust client totals.
3. Order items snapshot product name, SKU, selected variant and unit price at purchase time.
4. Reserve/decrement inventory transactionally to prevent overselling.
5. A browser redirect is not proof of payment. Verify Paystack references server-to-server.
6. Verify webhook signatures against the raw request body and process events idempotently.
7. Only verified successful payments transition an order to paid/processing.
8. Demonstration catalogue data must be clearly labelled and never represent verified stock.

## Nigeria-first delivery
Capture recipient, phone, state, LGA, city/town, street address, optional landmark and postal code. Delivery zones and fees are configurable and resolved by the API. Store all amounts in NGN kobo.

## Security boundaries
Keep Paystack secret and Cloudinary API secret server-side. Validate DTOs, use explicit response DTOs, enforce role-based authorization on admin routes, rate-limit authentication/checkout/public writes, and never log passwords, tokens or payment secrets.

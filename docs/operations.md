# Local development and operations

## Node
Use Node.js 24 LTS. With nvm: `nvm install 24 && nvm use 24 && corepack enable`.

## Database
PostgreSQL runs locally through Docker Compose. Keep local credentials in ignored environment files. Production should use managed PostgreSQL, TLS, automated backups and tested restore procedures.

## Environment
Copy the root and API example files. API secrets must never be placed in frontend variables (including Vite `VITE_*` variables).

## Paystack launch checklist
- Use test keys during development.
- Initialize transactions from the API using the order amount calculated by the server.
- Persist a unique reference before redirecting the customer.
- Verify transaction status, amount, currency and reference server-side.
- Verify webhook HMAC SHA-512 signature using the configured secret and raw body.
- Process events idempotently; duplicate events must not repeat stock deductions or order transitions.
- Use live keys only after end-to-end tests and dashboard webhook configuration.

## Cloudinary
Use server-generated signed upload parameters, restrict file types and sizes, and persist the Cloudinary public ID with the delivery URL for later replacement/deletion.

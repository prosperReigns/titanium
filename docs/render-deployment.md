# Render deployment

## Blueprint deployment
1. Push the branch containing this Blueprint to GitHub.
2. In Render, choose **New → Blueprint**, connect `prosperReigns/titanium`, and select `feature/complete-commerce` for the initial test deployment.
3. Review the resources in `render.yaml`: one Node web service and one managed PostgreSQL database in Frankfurt.
4. Add the Paystack test secret/public keys, Cloudinary credentials and a strong unique admin password in the service environment.
5. Deploy and inspect build logs. The health endpoint is `/api/health`.
6. Configure the Paystack webhook URL as `https://YOUR-RENDER-HOST/api/payments/paystack/webhook`.

## Runtime
Render's Node service serves the built React SPA and NestJS API from one host. The database URL is injected from the Render PostgreSQL resource. Migrations are applied before application startup; the seed script is idempotent and inserts demo catalogue content. Set the callback URL to the deployed `/checkout/verify` route.

## Local development
Use Docker Compose for PostgreSQL, `apps/api/.env` for local secrets, Vite for the storefront and NestJS for the API. The frontend uses a relative `/api` path; Vite proxies it locally and Render serves it same-origin in production.

## Operational notes
The Render free web service may sleep and is not suitable for dependable webhook reception. Use an always-on paid web service for realistic Paystack webhook testing. Keep Render PostgreSQL backups enabled for any non-disposable data. Never use the demo admin password or Paystack test keys for live sales.

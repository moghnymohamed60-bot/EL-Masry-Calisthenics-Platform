# Backend API Reference & Authentication

The backend application resides in `backend/` and is built with **Node.js**, **Express**, and **TypeScript**.

## Separation of Concerns
1. **Routes (`backend/src/routes/index.ts`)**: Define HTTP endpoints and call services.
2. **Middleware (`backend/src/middleware/index.ts`)**: Handle JWT verification (`jose`), role checks (`ADMIN` vs `CLIENT`), login rate limiting, and `Zod` request body validation.
3. **Services (`backend/src/services/index.ts`)**: Implement business rules (subscription lifecycle, quiz level classification, weekly plan assignment, daily exchange-rate sync, CSV export).
4. **Storage (`backend/src/storage/`)**: Isolate all database access (MySQL with Prisma ORM) and media storage adapters (Cloudinary / S3).

## HTTP Endpoints (`/api/*`)
- `GET /api/auth`: Returns active user profile, subscriptions, and assigned weekly plans.
- `POST /api/auth`: Handles login, logout, and mandatory first-login password change (`CHANGE_PASSWORD`).
- `GET /api/site`: Returns public site bundle (CMS content, pricing plans, currencies, exercises, quiz config, transformations).
- `PUT /api/site`: Updates CMS content, plans, currencies, exercises, or quiz config (`ADMIN` only).
- `GET /api/subscriptions`: Lists all subscriptions and client records (`ADMIN` only).
- `POST /api/subscriptions`: Validates sign-up & quiz answers with `SignupSubscriptionSchema` and creates a subscription + client account.
- `PATCH /api/subscriptions`: Updates subscription status (`PENDING`, `PAID`, `ACTIVE`, `EXPIRED`) or extends end date (`ADMIN` only).
- `DELETE /api/subscriptions`: Deletes a subscription (`ADMIN` only).
- `GET /api/subscriptions/export/csv`: Downloads UTF-8 BOM CSV/Excel report (`ADMIN` only).
- `GET /api/weekly-plans` & `POST /api/weekly-plans`: Reads or publishes structured weekly training plans.
- `POST /api/currencies/sync`: Syncs live exchange rates relative to EGP with automatic cached fallback.


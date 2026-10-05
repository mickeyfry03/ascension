# Ascension

A verified giving platform connecting people who need help with people who want to make a direct difference.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Prisma + PostgreSQL, and an auth seam ready for Auth.js or Clerk.

## Getting started

```bash
npm install
cp .env.example .env     # optional: without DATABASE_URL the app uses in-memory sample data
npm run dev
```

Open http://localhost:3000.

### Database (PostgreSQL + Prisma)

1. Set `DATABASE_URL` in `.env`.
2. `npm run db:migrate` (or `npm run db:push` for quick prototyping).
3. Restart the app. Repositories switch from the in-memory store to Prisma automatically.

The schema (`prisma/schema.prisma`) covers users, Auth.js tables, help requests, verification status and reviews, and support actions.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string. Unset = in-memory sample data. |
| `ADMIN_EMAILS` | Comma separated emails treated as admins by the development sign-in. |
| `AUTH_SECRET` | Reserved for Auth.js. |

## Structure

```
src/app            Routes (pages, API route handlers)
src/components     Reusable UI
src/data           Sample seed data and static content
src/lib            Shared types, formatting, zod validation
src/server         Backend: auth seam, server actions, services, repositories
```

- **UI** (`components`, `app`) calls **services** (`server/services`) which hold business rules.
- Services depend only on the `Repository` interface (`server/repositories/types.ts`), implemented by an in-memory store and a Prisma store. A mobile app can reuse the same services through the JSON routes `/api/requests` and `/api/support`.

## Key flows

- `/request` submits a help request (status `PENDING`).
- `/admin` is the verification queue: mark in review, verify, or reject.
- `/needs` lists only `VERIFIED` requests; `/needs/[id]` has the support form.
- `/dashboard` shows the signed-in user's requests.

## Next steps toward production

1. **Auth**: `src/server/auth.ts` currently has a development-only cookie sign-in (disabled in production). Replace `getSessionUser()` with Auth.js (`auth()`) or Clerk; the Prisma schema already includes Auth.js adapter tables.
2. **Payments**: add Stripe in `supportRequest()` (`src/server/services/requests.ts`); support actions are currently recorded as pledges.
3. **Admin API**: expose review endpoints behind real auth for a mobile client; add rate limiting to public POST routes.
4. **Verification documents**: add file upload and storage for supporting documents.
5. **Tests and CI**: add unit tests for services and a CI workflow running `npm run lint`, `npm run typecheck`, `npm run build`.

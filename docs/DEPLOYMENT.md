# Deployment Guide

## Recommended investor-demo setup

For an in-person pitch, Docker is the most reliable option because the web app and PostgreSQL run together with known versions.

```powershell
docker compose up --build -d --wait
docker compose exec web ./node_modules/.bin/tsx prisma/seed.ts
```

Open [http://localhost:3000](http://localhost:3000). The second command intentionally restores the canonical investor dataset before a rehearsal or pitch.

Use these accounts with password `demo123`:

| Role        | Email                 | Landing page       |
| ----------- | --------------------- | ------------------ |
| Staff       | `alex.staff@ifi.demo` | `/home`            |
| Manager     | `manager@ifi.demo`    | `/manager`         |
| Super Admin | `admin@ifi.demo`      | `/admin/scenarios` |
| IFI Member  | `member@ifi.demo`     | `/member`          |

## Vercel deployment

Vercel can deploy the Next.js application, but it cannot use the local Docker PostgreSQL container. Connect a managed PostgreSQL provider from the Vercel Marketplace and use its pooled connection string for `DATABASE_URL`. Vercel now connects external Postgres providers through Marketplace integrations; the former first-party Vercel Postgres product is no longer offered for new projects.

1. Import `celineemercy/ifi-project` into Vercel.
2. Add a PostgreSQL integration from the Vercel Marketplace.
3. Configure these Production environment variables:

   - `DATABASE_URL` — pooled managed PostgreSQL connection string
   - `AUTH_SECRET` — a new long random secret
   - `NEXTAUTH_URL` — the final HTTPS production URL
   - `NEXT_PUBLIC_APP_NAME` — `IFI Savoir-Faire Hub`

4. Deploy. [`vercel.json`](../vercel.json) runs Prisma Client generation, applies committed migrations, and builds Next.js.
5. Seed the empty production database once from a trusted local terminal after pulling the Production variables:

```powershell
vercel link
vercel env pull .env.production.local --environment=production
$env:SEED_ENV_FILE = ".env.production.local"
npm run db:seed -- --if-empty
```

Remove `.env.production.local` after use and never commit downloaded environment files.

The `--if-empty` safeguard preserves an existing application dataset while adding missing member demo content; it seeds the full investor dataset only when the database is empty. The normal `npm run demo:reset` command is deliberately destructive and should only be used against the dedicated local demo database.

**Do not expose these shared `demo123` accounts on a public production URL.** The member area is a prototype: it does not verify IFI membership, handle self-registration, or provide a production account-recovery process. Resolve onboarding and replace demo credentials before opening the site to real members.

Official references:

- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Postgres on Vercel](https://vercel.com/docs/postgres)
- [Managing environment variables](https://vercel.com/docs/environment-variables/manage-across-environments)
- [Vercel build configuration](https://vercel.com/docs/builds/configure-a-build)

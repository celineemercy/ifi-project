# IFI Savoir-Faire Hub

IFI Savoir-Faire Hub is a learning prototype proposed by Pradita University for Institut français d’Indonésie (IFI). It includes staff service training and a separate IFI member self-study experience.

It extends the Business Management workshop **“Savoir-Faire in Service: Delivering Excellence in Every Interaction”** into a continuous digital learning experience:

**Learn → Practice → Assess → Improve**

This is a university prototype, not an IFI operational system or a formal employee-performance platform.

## Current status

Phases 1–9 — the original investor-demo prototype — are implemented, with a member-learning prototype added in Phase 10:

- Next.js App Router with strict TypeScript
- Tailwind CSS and shared shadcn/ui components
- Inter with Pradita-led brand tokens
- Responsive, role-specific workspace navigation
- PostgreSQL-backed credentials authentication for Staff, Manager, and Super Admin
- Server-side page-entry authorization checks with role-specific redirects
- Complete route foundation for learning, practice, assessment, progress, management, and administration
- Docker Compose PostgreSQL configuration
- Prisma 7 domain schema, migration, and verified deterministic seed data
- 12 fictional staff profiles, one demo member, five staff modules, three member courses, five service scenarios, and 20 completed simulations
- Alex's required 68% progress, 3/5 completion, seven sessions, and 84% average score
- Database-backed staff home, learning catalogue, module lessons, and progress dashboard
- Separate member dashboard, French self-study catalogue, lessons, quizzes, and progress
- Three fictional French-learning packages with a no-charge demo checkout and package-based course unlocks
- Member-only course access with a seeded demo member account; staff modules remain private to staff
- A functional three-question module quiz with idempotent completion and persisted progress
- Deterministic visitor roleplay with stored, sequenced conversation messages
- Idempotent developmental assessments with five skill scores and module recommendations
- Database-backed manager participation, completion, and skill analytics
- Admin scenario creation, editing, filtering, activation, and deactivation
- Shared loading, empty, and recoverable error states
- Automated desktop investor journey and mobile responsive smoke test with seed restoration
- Docker pitch runbook and optional Vercel deployment configuration
- ESLint, Prettier, type-check, and production-build scripts

The learning material and service scenarios are source-informed prototype content, not official IFI policy or training material. See [Content sources and status](./CONTENT_SOURCES.md).

## Technology

- Next.js 16, React 19, and TypeScript
- Tailwind CSS 4 and shadcn/ui conventions
- PostgreSQL 17 and Prisma 7
- Auth.js / NextAuth credentials authentication
- Zod, Recharts, Lucide, and Sonner
- Docker Compose

## Run with Docker (demo and handoff)

Install Docker Desktop (Linux containers), then run from the repository root:

```powershell
docker compose up --build -d --wait
```

Open [http://localhost:3000](http://localhost:3000). No local Node.js installation
or `.env.local` file is required. Compose builds the web app, waits for PostgreSQL,
applies database migrations, and seeds the demo accounts only if the database is
empty. Existing data and learning progress survive restarts and rebuilds.

Sign in with `alex.staff@ifi.demo` and `demo123` (all demo accounts are below).

```powershell
docker compose logs -f web
docker compose down
docker compose up -d --wait
```

`down` stops the containers and retains the database volume. Do not add `-v`
unless you intend to delete the database. The existing `npm run db:seed` command
still resets demo data when run manually.

The defaults are for local prototype demos. For public hosting, configure real
secrets and database credentials. Compose reads overrides from shell variables
or a root `.env` file, not `.env.local`. To use a different port, set both
`WEB_PORT=3001` and `NEXTAUTH_URL=http://localhost:3001`; `AUTH_SECRET` can also
be overridden. Containers connect to PostgreSQL at `postgres:5432`; local Node.js
development continues to use `127.0.0.1:55432`.

## Local setup (Node.js with Docker database)

Requirements:

- Node.js 20.9 or newer
- npm
- Docker Desktop with Docker Compose

```powershell
npm install
Copy-Item .env.example .env.local
docker compose up -d postgres
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route directs each authenticated role to its own workspace.

The prototype maps PostgreSQL to `localhost:55432` to avoid native PostgreSQL services on the development machine.

## Demo accounts

All prototype accounts use the prototype-only password `demo123`.

| Role        | Email                 | Destination        |
| ----------- | --------------------- | ------------------ |
| Staff       | `alex.staff@ifi.demo` | `/home`            |
| Manager     | `manager@ifi.demo`    | `/manager`         |
| Super Admin | `admin@ifi.demo`      | `/admin/scenarios` |
| IFI Member  | `member@ifi.demo`     | `/member`          |

These identities are stored in PostgreSQL and verified through the same database-backed authentication flow used by the application. The sign-in form also accepts the email of any separately provisioned account.

The member demo account starts with the fictional First Steps package and one completed course out of three. The member can preview locked courses, review sample-priced French-learning bundles, confirm a simulated purchase, and unlock courses. No real payment is collected. Member courses are original English-language prototype lessons inspired by IFI's public French-learning and cultural themes. They are **not** official IFI lessons, paid course enrollments, or certification preparation. Existing Docker databases receive the member demo account, courses, and packages idempotently on startup without resetting staff progress.

`npm run db:seed` resets the dedicated prototype data and recreates the verified demonstration dataset.

## Quality commands

```powershell
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run verify
npx playwright install chromium # first run only
npm run test:e2e
```

## Environment variables

| Variable               | Purpose                        |
| ---------------------- | ------------------------------ |
| `DATABASE_URL`         | PostgreSQL connection string   |
| `AUTH_SECRET`          | Auth.js token-signing secret   |
| `NEXTAUTH_URL`         | Authentication callback origin |
| `NEXT_PUBLIC_APP_NAME` | Public product name            |

Never commit `.env.local` or production secrets.

## Documentation

- [Architecture](./ARCHITECTURE.md)
- [Implementation checklist](./IMPLEMENTATION_CHECKLIST.md)
- [Demo script](./DEMO_SCRIPT.md)
- [Brand system](./BRAND_SYSTEM.md)
- [Content sources and status](./CONTENT_SOURCES.md)
- [Architecture decisions](./DECISIONS.md)
- [Investor pitch runbook](./PITCH_RUNBOOK.md)
- [Deployment guide](./DEPLOYMENT.md)

## Scope boundary

The prototype does not implement live AI, customer feedback, service tickets, real payment processing, course registration, member self-sign-up, membership verification, production SSO, HR integration, certificates, branch operations, or formal employee scoring. Package orders are demo records only. Actual IFI member onboarding, commercial terms, and payment integration need approval before public launch.

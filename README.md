# IFI Savoir-Faire Hub

IFI Savoir-Faire Hub is a service training and deterministic simulation prototype proposed by Pradita University for Institut français d’Indonésie (IFI).

It extends the Business Management workshop **“Savoir-Faire in Service: Delivering Excellence in Every Interaction”** into a continuous digital learning experience:

**Learn → Practice → Assess → Improve**

This is a university prototype, not an IFI operational system or a formal employee-performance platform.

## Current status

Phases 1–4 — Foundation, Database, Authentication, and Learning Hub — are implemented:

- Next.js App Router with strict TypeScript
- Tailwind CSS and shadcn/ui-compatible components
- Titillium Web with Pradita-led brand tokens
- Responsive, role-specific workspace navigation
- PostgreSQL-backed credentials authentication for Staff, Manager, and Super Admin
- Server-side page-entry authorization checks with role-specific redirects
- Complete route foundation for learning, practice, assessment, progress, management, and administration
- Docker Compose PostgreSQL configuration
- Prisma 7 domain schema, migration, and verified deterministic seed data
- 12 fictional staff profiles, five learning modules, five service scenarios, and 20 completed simulations
- Alex's required 68% progress, 3/5 completion, seven sessions, and 84% average score
- Database-backed staff home, learning catalogue, module lessons, and progress dashboard
- A functional three-question module quiz with idempotent completion and persisted progress
- ESLint, Prettier, type-check, and production-build scripts

The learning material and service scenarios are source-informed prototype content, not official IFI policy or training material. See [Content sources and status](./docs/CONTENT_SOURCES.md).

## Technology

- Next.js 16, React 19, and TypeScript
- Tailwind CSS 4 and shadcn/ui conventions
- PostgreSQL 17 and Prisma 7
- Auth.js / NextAuth credentials authentication
- Zod, Recharts, Lucide, and Sonner
- Docker Compose

## Local setup

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

These identities are stored in PostgreSQL and verified through the same database-backed authentication flow used by the application.

`npm run db:seed` resets the dedicated prototype data and recreates the verified demonstration dataset.

## Quality commands

```powershell
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run verify
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
- [Implementation checklist](./docs/IMPLEMENTATION_CHECKLIST.md)
- [Demo script](./docs/DEMO_SCRIPT.md)
- [Brand system](./docs/BRAND_SYSTEM.md)
- [Content sources and status](./docs/CONTENT_SOURCES.md)
- [Architecture decisions](./docs/DECISIONS.md)

## Scope boundary

The prototype does not implement live AI, customer feedback, service tickets, payment, course registration, production SSO, HR integration, certificates, branch operations, or formal employee scoring.

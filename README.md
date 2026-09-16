# IFI Pulse

IFI Pulse is a functional university prototype for improving service experiences at Institut français d’Indonésie (IFI). It connects visitor feedback to structured analysis, service-ticket resolution, and management insight through one continuous loop:

**Capture → Understand → Resolve → Improve**

The prototype is proposed by Pradita University. It is intentionally designed as a focused full-stack demonstration rather than an enterprise platform.

## Current status

Phase 1 — Foundation is implemented:

- Next.js App Router with strict TypeScript
- Tailwind CSS and a shadcn/ui-compatible component setup
- Pradita-led visual tokens with Titillium Web
- Official IFI artwork preserved as supplied by IFI's public website
- Responsive public and protected application shells
- Auth.js credentials flow with three local demo roles
- Docker Compose PostgreSQL configuration
- Prisma 7 configuration and an empty Phase 1 schema boundary
- ESLint, Prettier, type-check, and production-build scripts

The domain schema, migrations, and seed dataset begin in Phase 2. No analytics values are hardcoded.

## Tech stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4, shadcn/ui conventions, Lucide icons
- PostgreSQL 17, Prisma 7
- Auth.js / NextAuth credentials authentication
- Zod, Recharts, OpenAI SDK
- Docker Compose

## Local setup

Requirements:

- Node.js 20.9 or newer
- npm
- Docker Desktop with Docker Compose

Install packages and prepare environment variables:

```bash
npm install
copy .env.example .env.local
```

On macOS or Linux, use `cp` instead of `copy`.

Start PostgreSQL:

```bash
docker compose up -d postgres
```

The prototype maps PostgreSQL to `localhost:5433` to avoid colliding with an existing local PostgreSQL installation.

Generate the Prisma client and start the app:

```bash
npm run db:generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The Phase 1 schema intentionally contains no models, so no migration is needed yet.

## Demo accounts

All Phase 1 accounts use the development-only password `PulseDemo2026!`.

| Role        | Email                    |
| ----------- | ------------------------ |
| Super Admin | `admin@ifi-pulse.demo`   |
| Manager     | `manager@ifi-pulse.demo` |
| Staff       | `staff@ifi-pulse.demo`   |

These temporary bcrypt-backed local accounts are replaced by seeded PostgreSQL users in Phase 2.

## Quality commands

```bash
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run verify
```

## Environment variables

| Variable               | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `DATABASE_URL`         | PostgreSQL connection string                     |
| `AUTH_SECRET`          | Auth.js token signing secret                     |
| `NEXTAUTH_URL`         | Local authentication callback origin             |
| `AI_MODE`              | `mock` for deterministic demos or `openai` later |
| `OPENAI_API_KEY`       | Required only when `AI_MODE=openai`              |
| `NEXT_PUBLIC_APP_NAME` | Public application name                          |

Never commit `.env.local` or a real OpenAI key.

## Project documentation

- [Architecture](./ARCHITECTURE.md)
- [Implementation checklist](./docs/IMPLEMENTATION_CHECKLIST.md)
- [Brand system](./docs/BRAND_SYSTEM.md)
- [Architecture decisions](./docs/DECISIONS.md)

## Planned demo journey

1. Open `/feedback/course-jakarta`.
2. Submit a two-star registration complaint.
3. Mock AI classifies the complaint and creates a Courses ticket.
4. A staff member starts progress, adds a resolution note, and resolves it.
5. The management dashboard recalculates its metrics from PostgreSQL.

This journey is completed incrementally across Phases 2–8 and will receive an end-to-end test before polish and deployment.

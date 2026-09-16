# IFI Savoir-Faire Hub

IFI Savoir-Faire Hub is an AI-powered service training and simulation prototype proposed by Pradita University for Institut français d’Indonésie (IFI).

It extends the Business Management workshop **“Savoir-Faire in Service: Delivering Excellence in Every Interaction”** into a continuous digital learning experience:

**Learn → Practice → Assess → Improve**

This is a university prototype, not an IFI operational system or a formal employee-performance platform.

## Current status

Phase 1 — Foundation Realignment is implemented:

- Next.js App Router with strict TypeScript
- Tailwind CSS and shadcn/ui-compatible components
- Titillium Web with Pradita-led brand tokens
- Responsive, role-specific workspace navigation
- Working prototype authentication for Staff, Manager, and Super Admin
- Server-side page-entry authorization checks
- Complete route foundation for learning, practice, assessment, progress, management, and administration
- Docker Compose PostgreSQL configuration
- Prisma 7 configuration boundary
- ESLint, Prettier, type-check, and production-build scripts

The relational schema and realistic demonstration data begin in Phase 2. Learning values, assessment scores, and manager KPIs are not hardcoded as live data.

## Technology

- Next.js 16, React 19, and TypeScript
- Tailwind CSS 4 and shadcn/ui conventions
- PostgreSQL 17 and Prisma 7
- Auth.js / NextAuth credentials authentication
- Zod, Recharts, OpenAI SDK, Lucide, and Sonner
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
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route directs each authenticated role to its own workspace.

The prototype maps PostgreSQL to `localhost:5433` because the development machine already uses port `5432`.

## Demo accounts

All Phase 1 accounts use the prototype-only password `demo123`.

| Role        | Email                 | Destination        |
| ----------- | --------------------- | ------------------ |
| Staff       | `alex.staff@ifi.demo` | `/home`            |
| Manager     | `manager@ifi.demo`    | `/manager`         |
| Super Admin | `admin@ifi.demo`      | `/admin/scenarios` |

Phase 3 replaces these local bcrypt-backed identities with seeded PostgreSQL users.

## Quality commands

```powershell
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run verify
```

## Environment variables

| Variable               | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `DATABASE_URL`         | PostgreSQL connection string                         |
| `AUTH_SECRET`          | Auth.js token-signing secret                         |
| `NEXTAUTH_URL`         | Authentication callback origin                       |
| `AI_MODE`              | `mock` for reliable demonstrations or `openai` later |
| `OPENAI_API_KEY`       | Required only when `AI_MODE=openai`                  |
| `NEXT_PUBLIC_APP_NAME` | Public product name                                  |

Never commit `.env.local` or a real API key.

## Documentation

- [Architecture](./ARCHITECTURE.md)
- [Implementation checklist](./docs/IMPLEMENTATION_CHECKLIST.md)
- [Demo script](./docs/DEMO_SCRIPT.md)
- [Brand system](./docs/BRAND_SYSTEM.md)
- [Architecture decisions](./docs/DECISIONS.md)

## Scope boundary

The prototype does not implement customer feedback, service tickets, payment, course registration, production SSO, HR integration, certificates, branch operations, or formal employee scoring.

# IFI Pulse Architecture

## Purpose

IFI Pulse is a modular Next.js application that demonstrates a complete service-improvement workflow without introducing microservices or infrastructure that a university prototype does not need.

## System shape

```text
Browser
  ├─ Public feedback experience
  └─ Authenticated staff and management workspace
          │
          ▼
Next.js App Router
  ├─ Server-rendered pages and route layouts
  ├─ Route handlers / server actions
  ├─ Zod validation
  └─ Role-aware authorization
          │
          ▼
Application services
  ├─ Feedback service
  ├─ AI analysis adapter
  ├─ Ticket service
  ├─ Analytics service
  └─ Touchpoint service
          │
          ▼
Prisma Client ── PostgreSQL
```

The OpenAI integration is an adapter behind `analyzeFeedback()`. The deterministic mock analyzer implements the same validated result contract, so ticket creation does not care which analyzer produced the result.

## Directory boundaries

```text
src/app/          Routes, layouts, route handlers, and composition
src/components/   Reusable presentation and interaction components
src/config/       Stable product, brand, and navigation configuration
src/lib/          Infrastructure adapters, shared utilities, auth, validation
src/services/     Use-case orchestration and database transactions
src/types/        Shared TypeScript declarations
prisma/           Schema, migrations, and deterministic seed data
docs/             Product and engineering records
```

Pages must not contain direct database queries. They call a service or a narrowly scoped server-side query function. This keeps data rules reusable across UI, route handlers, seed verification, and tests.

## Route topology

- `/` — product introduction
- `/feedback` — public feedback submission
- `/feedback/[touchpoint]` — preselected service/branch submission
- `/login` — credentials sign-in
- `/dashboard` — management command center
- `/dashboard/analytics` — detailed analytics
- `/dashboard/insights` — suggested improvements
- `/staff` — ticket workspace
- `/staff/tickets/[id]` — ticket detail and resolution
- `/admin/touchpoints` — QR touchpoint administration
- `/admin/users` — prototype user administration
- `/coach` — deferred service coaching

Route groups separate public, authentication, and protected shells without changing the URLs.

## Authentication and authorization

Phase 1 uses Auth.js JWT sessions and local bcrypt-hashed demonstration identities. Phase 2 moves identity lookup to PostgreSQL while retaining the session shape.

Authorization is centralized in a cached server-side session helper and rechecked at protected page entry points. Layout checks support the shell but are not treated as the security boundary:

- `SUPER_ADMIN`: all routes
- `MANAGER`: dashboard, analytics, insights, tickets
- `STAFF`: ticket workspace and coach

Navigation visibility is a usability layer, not the security boundary.

## Data and consistency rules

Phase 2 will establish the complete schema. Important invariants are already agreed:

- feedback and ticket numbers are unique and transactionally generated;
- one feedback item creates at most one service ticket;
- anonymous feedback never stores a contact email;
- ticket status changes and activity records commit in one transaction;
- all timestamps are stored in UTC and displayed in Asia/Jakarta;
- analytics are database aggregations, never hardcoded KPI values.

## AI boundary

Both AI modes return the same Zod-validated object:

```ts
{
  sentiment: "positive" | "neutral" | "negative";
  category: string;
  subcategory: string;
  urgency: "low" | "medium" | "high" | "critical";
  department: string;
  summary: string;
  requiresAction: boolean;
  confidence: number;
}
```

`AI_MODE=mock` is the safe demonstration default. Invalid OpenAI output must fail closed into the documented fallback rather than interrupt public feedback submission.

## Deployment direction

Local development uses Docker PostgreSQL. A later Vercel deployment should use a managed PostgreSQL provider and production secrets. The application code must not assume the database is on localhost.

# IFI Savoir-Faire Hub Architecture

## Product boundary

IFI Savoir-Faire Hub is a modular Next.js application for service microlearning, deterministic visitor roleplay, learning assessment, staff development, and manager insight. It is a focused university prototype rather than a full learning-management or HR platform.

## System shape

```text
Browser
├── Staff learning workspace
├── Manager development dashboard
└── Admin content workspace
        │
        ▼
Next.js App Router
├── Server Components for reads
├── Client Components for chat interactions
├── Server Actions for controlled mutations
├── Route handlers for simulation messages
├── Zod validation
└── Page-entry authorization checks
        │
        ▼
Application services
├── Learning service
├── Simulation service
├── Assessment service
└── Analytics service
        │
        └── Deterministic simulation and assessment engine
        │
        ▼
Prisma Client ── PostgreSQL
```

## Code boundaries

```text
src/app/          Routes, layouts, handlers, and composition
src/components/   Reusable presentation and interaction components
src/config/       Product, role, and navigation configuration
src/lib/simulation/ Deterministic roleplay and assessment rules
src/lib/auth/     Session and authorization boundaries
src/lib/db/       Prisma client infrastructure
src/lib/validation/ Shared Zod schemas
src/services/     Learning, simulation, assessment, and analytics use cases
src/types/        Shared TypeScript declarations
prisma/           Schema, migrations, and deterministic seed data
docs/             Product, demo, brand, and engineering records
```

Pages should not contain direct database mutations. Services own domain rules and transactions. Protected page entry points verify the session and role on the server; navigation visibility is only a usability layer.

## Implemented authentication and learning flow

Credentials authentication normalizes the submitted email, loads the user through Prisma, and verifies the stored bcrypt password hash. The signed token carries the database user ID and role for an eight-hour session. Every protected page then enforces its permitted role on the server.

Learning reads are handled by the learning service and rendered with Server Components. Quiz answers are submitted through a validated Server Action. A perfect result upserts the employee's module progress to 100%; an already completed module is returned unchanged so repeated submissions cannot create duplicate completion state. Revalidated staff pages then read the persisted aggregate progress from PostgreSQL.

## Route topology

### Staff

- `/home`
- `/learning`
- `/learning/[moduleId]`
- `/practice`
- `/practice/[scenarioId]`
- `/assessment/[sessionId]`
- `/assessments`
- `/progress`

### Manager

- `/manager`
- `/manager/team`
- `/manager/skills`

### Super Admin

- `/admin/learning`
- `/admin/scenarios`
- `/admin/users`

The root route redirects unauthenticated users to `/login` and authenticated users to their role home.

## Simulation separation

Simulation and assessment are separate operations:

1. The simulation engine receives the scenario, visitor personality, problem, and conversation history. It plays only the visitor and never evaluates the employee during practice.
2. The assessment engine receives a completed transcript and returns Zod-validated skill scores, strengths, improvement guidance, and a recommended module.

Both engines are deterministic in this prototype. They do not call an external model or require an API key.

## Consistency rules

- Completing a lesson is idempotent.
- Ending a simulation creates at most one assessment.
- Conversation messages have a stable sequence.
- Assessment scores remain within `0–100`.
- Recommendations are labeled for learning and development.
- Manager metrics use database aggregation, not hardcoded KPI values.
- All timestamps are stored in UTC and displayed in Asia/Jakarta.

## Deployment direction

Local development uses Docker PostgreSQL on host port `55432`. The planned public Vercel deployment will use externally reachable managed PostgreSQL and production secrets without changing service-layer behavior.

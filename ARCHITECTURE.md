# IFI Savoir-Faire Hub Architecture

## Product boundary

IFI Savoir-Faire Hub is a modular Next.js application for service microlearning, AI visitor roleplay, learning assessment, staff development, and manager insight. It is a focused university prototype rather than a full learning-management or HR platform.

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
        ├── Deterministic mock AI
        └── OpenAI adapter
        │
        ▼
Prisma Client ── PostgreSQL
```

## Code boundaries

```text
src/app/          Routes, layouts, handlers, and composition
src/components/   Reusable presentation and interaction components
src/config/       Product, role, and navigation configuration
src/lib/ai/       AI contracts and provider adapters
src/lib/auth/     Session and authorization boundaries
src/lib/db/       Prisma client infrastructure
src/lib/validation/ Shared Zod schemas
src/services/     Learning, simulation, assessment, and analytics use cases
src/types/        Shared TypeScript declarations
prisma/           Schema, migrations, and deterministic seed data
docs/             Product, demo, brand, and engineering records
```

Pages should not contain direct database mutations. Services own domain rules and transactions. Protected page entry points verify the session and role on the server; navigation visibility is only a usability layer.

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

## AI separation

Simulation and assessment are separate operations:

1. The simulation adapter receives the scenario, customer personality, problem, and conversation history. It plays only the visitor and never evaluates the employee.
2. The assessment adapter receives a completed transcript and returns Zod-validated skill scores, strengths, improvement guidance, and a recommended module.

`AI_MODE=mock` is the demonstration default. Mock and OpenAI implementations must satisfy the same typed interfaces.

## Consistency rules

- Completing a lesson is idempotent.
- Ending a simulation creates at most one assessment.
- Conversation messages have a stable sequence.
- Assessment scores remain within `0–100`.
- Recommendations are labeled for learning and development.
- Manager metrics use database aggregation, not hardcoded KPI values.
- All timestamps are stored in UTC and displayed in Asia/Jakarta.

## Deployment direction

Local development uses Docker PostgreSQL on host port `5433`. A future Vercel deployment should use managed PostgreSQL and production secrets without changing service-layer behavior.

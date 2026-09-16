# Implementation Checklist

This document is updated at the end of every phase. A phase does not advance while its verification commands are failing.

## Phase 1 — Foundation

- [x] Initialize Next.js App Router and strict TypeScript
- [x] Add Tailwind CSS and shadcn/ui-compatible configuration
- [x] Establish brand tokens and Titillium Web typography
- [x] Create responsive public and authenticated shells
- [x] Add working credentials authentication with prototype roles
- [x] Enforce management and admin routes on the server
- [x] Add Docker Compose PostgreSQL service
- [x] Add Prisma configuration boundary
- [x] Document architecture, brand rules, setup, and decisions
- [x] Pass lint, type-check, format check, and production build
- [x] Complete desktop and mobile smoke tests

## Phase 2 — Database

- [ ] Add enums and all domain models
- [ ] Add indexes and relationship constraints
- [ ] Add safe human-readable identifier strategy
- [ ] Create and run initial migration
- [ ] Create 50–100 deterministic feedback records
- [ ] Create 20–30 linked tickets and activity history
- [ ] Seed branches, departments, touchpoints, and five staff users
- [ ] Replace local demo authentication with Prisma user lookup
- [ ] Verify record counts and relationships

## Phase 3 — Feedback

- [ ] Build accessible mobile-first feedback form
- [ ] Validate inputs with Zod
- [ ] Resolve and preselect touchpoint service/branch
- [ ] Store contact details only when not anonymous
- [ ] Create feedback confirmation and feedback number
- [ ] Add loading, error, success, and duplicate-submit protection
- [ ] Generate and list sample QR codes

## Phase 4 — AI analysis

- [ ] Define strict Zod output contract
- [ ] Implement deterministic bilingual keyword analyzer
- [ ] Implement OpenAI structured-output adapter
- [ ] Add invalid-output fallback and observability
- [ ] Store analysis fields on feedback

## Phase 5 — Ticket automation

- [ ] Decide actionability from validated analysis
- [ ] Generate a unique ticket number
- [ ] Route ticket to the detected department
- [ ] Create ticket and initial activity transactionally
- [ ] Verify the primary registration-confusion scenario

## Phase 6 — Staff ticketing

- [ ] Build staff KPIs from database queries
- [ ] Add ticket table, filters, pagination, and empty states
- [ ] Build ticket detail and analysis display
- [ ] Implement assignment and status transitions
- [ ] Implement resolution notes and activity timeline
- [ ] Enforce valid transitions and role checks server-side

## Phase 7 — Command center

- [ ] Define and document KPI formulas
- [ ] Add date, branch, and service filters
- [ ] Add feedback trend and sentiment charts
- [ ] Add service, issue, resolution, and branch reporting
- [ ] Verify all values against database fixtures

## Phase 8 — Insights

- [ ] Aggregate recurring issues and service patterns
- [ ] Generate cautious insight copy
- [ ] Label recommendations as “Suggested Improvement”
- [ ] Show evidence period and affected service

## Phase 9 — AI coach

- [ ] Add three approved training scenarios
- [ ] Implement conversation loop
- [ ] Score empathy, clarity, problem solving, and tone
- [ ] Present actionable coaching suggestions

## Phase 10 — Polish and release

- [ ] Complete responsive, accessibility, and keyboard review
- [ ] Add final loading, error, and empty states
- [ ] Add critical Playwright journey
- [ ] Add Vercel-ready managed database instructions
- [ ] Run production build and final demo rehearsal

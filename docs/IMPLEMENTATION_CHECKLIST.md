# Implementation Checklist

A phase does not advance while lint, type-check, relevant tests, or the production build are failing.

## Phase 1 — Foundation Realignment

- [x] Preserve the original IFI Pulse foundation in Git history
- [x] Rename the application to IFI Savoir-Faire Hub
- [x] Replace the product workflow with Learn → Practice → Assess → Improve
- [x] Replace demo credentials and role destinations
- [x] Add role-specific responsive navigation
- [x] Add all staff, manager, and admin route foundations
- [x] Remove feedback, ticket, QR, and operational-system routes
- [x] Remove QR-code dependencies
- [x] Update README, architecture, brand, decisions, and demo documentation
- [x] Pass lint, type-check, format check, and production build
- [x] Complete desktop and mobile role-flow smoke tests

## Phase 2 — Database

- [ ] Add domain enums and models
- [ ] Add relational constraints and indexes
- [ ] Create the initial migration
- [ ] Seed 12 realistic IFI employees
- [ ] Seed five workshop-aligned learning modules
- [ ] Seed five IFI practice scenarios
- [ ] Seed progress for every employee
- [ ] Seed 20 completed simulation sessions and assessments
- [ ] Verify Alex's required starting metrics

## Phase 3 — Authentication

- [ ] Move credential lookup to PostgreSQL
- [ ] Retain the three documented demo accounts
- [ ] Verify staff, manager, and admin boundaries
- [ ] Verify incorrect credentials and session expiration behavior

## Phase 4 — Learning Hub

- [ ] Build database-backed staff home
- [ ] Build module listing and lesson view
- [ ] Fully implement Communication & Empathy
- [ ] Add three-question quiz
- [ ] Make lesson/module completion idempotent
- [ ] Update staff progress

## Phase 5 — AI Practice

- [ ] Build service-area and scenario selection
- [ ] Build the professional chat interface
- [ ] Implement deterministic mock visitor behavior
- [ ] Implement the OpenAI visitor adapter
- [ ] Store sequenced conversation messages
- [ ] Support safe end/abandon behavior

## Phase 6 — Assessment

- [ ] Define and validate the assessment schema
- [ ] Implement deterministic mock scores
- [ ] Implement OpenAI assessment
- [ ] Make assessment creation idempotent
- [ ] Show skill scores, strength, improvement, and recommendation
- [ ] Show the learning-and-development disclaimer

## Phase 7 — Manager Dashboard

- [ ] Aggregate team participation and completion
- [ ] Aggregate skill averages
- [ ] Add database-backed charts
- [ ] Label recommendations Suggested Training Focus
- [ ] Avoid individual formal-performance framing

## Phase 8 — Admin Scenario Manager

- [ ] List and filter scenarios
- [ ] Create and edit scenarios
- [ ] Activate and deactivate scenarios
- [ ] Validate mutations and enforce admin authorization

## Phase 9 — Demo Polish

- [ ] Complete responsive and accessibility review
- [ ] Add loading, empty, and error states
- [ ] Add critical Playwright demo journey
- [ ] Rehearse mock mode without OpenAI access
- [ ] Document optional Vercel deployment
- [ ] Run final production build and demo rehearsal

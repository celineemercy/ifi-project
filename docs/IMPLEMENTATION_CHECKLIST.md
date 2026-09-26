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

- [x] Add domain enums and models
- [x] Add relational constraints and indexes
- [x] Create the initial migration
- [x] Seed 12 fictional IFI staff profiles
- [x] Seed five workshop-aligned learning modules
- [x] Seed five IFI practice scenarios
- [x] Seed progress for every employee
- [x] Seed 20 completed simulation sessions and assessments
- [x] Verify Alex's required starting metrics

## Phase 3 — Authentication

- [x] Move credential lookup to PostgreSQL
- [x] Retain the three documented demo accounts
- [x] Verify staff, manager, and admin boundaries
- [x] Verify incorrect credentials and session expiration configuration

## Phase 4 — Learning Hub

- [x] Build database-backed staff home
- [x] Build module listing and lesson view
- [x] Fully implement Communication & Empathy
- [x] Add three-question quiz
- [x] Make lesson/module completion idempotent
- [x] Update staff progress

## Phase 5 — Practice Simulator

- [ ] Build service-area and scenario selection
- [ ] Build the professional chat interface
- [ ] Implement deterministic visitor behavior
- [ ] Store sequenced conversation messages
- [ ] Support safe end/abandon behavior

## Phase 6 — Assessment

- [ ] Define and validate the assessment schema
- [ ] Implement deterministic assessment scores
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
- [ ] Rehearse the deterministic simulation journey
- [ ] Document optional Vercel deployment
- [ ] Run final production build and demo rehearsal

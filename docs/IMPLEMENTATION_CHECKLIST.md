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

- [x] Build service-area and scenario selection
- [x] Build the professional chat interface
- [x] Implement deterministic visitor behavior
- [x] Store sequenced conversation messages
- [x] Support safe end/abandon behavior

## Phase 6 — Assessment

- [x] Define and validate the assessment schema
- [x] Implement deterministic assessment scores
- [x] Make assessment creation idempotent
- [x] Show skill scores, strength, improvement, and recommendation
- [x] Show the learning-and-development disclaimer

## Phase 7 — Manager Dashboard

- [x] Aggregate team participation and completion
- [x] Aggregate skill averages
- [x] Add database-backed charts
- [x] Label recommendations Suggested Training Focus
- [x] Avoid individual formal-performance framing

## Phase 8 — Admin Scenario Manager

- [x] List and filter scenarios
- [x] Create and edit scenarios
- [x] Activate and deactivate scenarios
- [x] Validate mutations and enforce admin authorization

## Phase 9 — Demo Polish

- [x] Complete responsive and accessibility review
- [x] Add loading, empty, and error states
- [x] Add critical Playwright demo journey
- [x] Rehearse the deterministic simulation journey
- [x] Document optional Vercel deployment
- [x] Run final production build and demo rehearsal

## Phase 10 — Member Learning Prototype

- [x] Add a separate MEMBER role and module audience boundary
- [x] Add member dashboard, course catalogue, lessons, quizzes, and progress
- [x] Seed a demo member and three original French-learning courses without resetting existing data
- [x] Keep member courses out of staff and manager analytics
- [ ] Decide member onboarding and verify actual IFI membership before public access
- [ ] Obtain IFI-approved learning materials and course ownership before a real LMS launch

## Phase 11 — Member Package Prototype

- [x] Seed three clearly fictional French-learning bundles and sample IDR prices
- [x] Add a Packages menu, package comparison, and review screen
- [x] Confirm no-charge demo purchases idempotently and unlock included courses
- [x] Enforce package access in member course pages and quiz actions
- [ ] Obtain IFI-approved packages, prices, terms, and a payment provider before accepting real purchases

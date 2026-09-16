# Architecture Decisions

## ADR-001 — Replace the IFI Pulse product scope

**Status:** Accepted

Customer feedback, service tickets, touchpoints, and operational analytics are outside the current prototype. The active product is IFI Savoir-Faire Hub, centered on staff learning and simulation.

The original foundation is preserved in Git commit `aa36a4c`.

## ADR-002 — Keep the physical workspace path

**Status:** Accepted

The application and npm package are renamed, while the local folder remains `D:\webs\IFI-Pulse` to avoid unnecessary path disruption.

## ADR-003 — Modular monolith

**Status:** Accepted

A single Next.js application with service boundaries is sufficient for the prototype. Microservices would not improve the demonstration.

## ADR-004 — Mock-first AI

**Status:** Accepted

`AI_MODE=mock` is the default. It must support the complete demo without network access, API credentials, or variable model behavior.

## ADR-005 — Separate roleplay and assessment

**Status:** Accepted

The roleplay model only plays the visitor. Evaluation begins only after the employee ends the simulation. This avoids coaching leakage during practice and produces a clearer assessment boundary.

## ADR-006 — Learning feedback is not HR evaluation

**Status:** Accepted

Scores and recommendations are training aids. The UI must display the required disclaimer and avoid formal employee-ranking language.

## ADR-007 — Real progress and analytics only

**Status:** Accepted

Progress, scores, session counts, and manager KPIs must come from PostgreSQL aggregation after seed data exists. Foundation pages use clearly labeled phase previews instead of simulated live values.

## ADR-008 — Local PostgreSQL through Docker

**Status:** Accepted

Docker Compose maps PostgreSQL to `localhost:5433`. Environment configuration keeps the application portable to managed PostgreSQL for a later Vercel deployment.

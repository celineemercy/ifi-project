# Architecture Decisions

## ADR-001 — Modular monolith

**Status:** Accepted

IFI Pulse uses a single Next.js application with explicit service and infrastructure boundaries. A prototype does not benefit from microservice deployment or distributed consistency concerns.

## ADR-002 — PostgreSQL through Docker for local development

**Status:** Accepted

Docker Compose provides a repeatable PostgreSQL 17 environment. `DATABASE_URL` keeps the application portable to a managed PostgreSQL service if Vercel deployment is later approved.

## ADR-003 — Mock-first AI

**Status:** Accepted

`AI_MODE=mock` is the default so demonstrations never depend on network availability or API credits. The OpenAI adapter must implement the same Zod schema.

## ADR-004 — Credentials-only prototype authentication

**Status:** Accepted

External identity providers would add consent, tenant, and deployment complexity without proving the core service workflow. Phase 1 uses local bcrypt hashes; Phase 2 uses seeded PostgreSQL users.

## ADR-005 — English-first interface

**Status:** Accepted

The application UI and documentation use English. The analyzer will still recognize common Indonesian feedback phrases because the primary demo input is Indonesian.

## ADR-006 — Real analytics only

**Status:** Accepted

Command-center KPI cards and charts remain empty or explicitly in preview until database records and aggregate queries exist. Presentation placeholders must never resemble live metrics.

## ADR-007 — Vercel is optional, not a Phase 1 dependency

**Status:** Accepted

The architecture remains Vercel-compatible, but local reproducibility and the classroom demonstration take priority. Deployment is considered after the end-to-end workflow is stable.

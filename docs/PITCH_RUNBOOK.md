# Investor Pitch Runbook

## Five minutes before the pitch

```powershell
docker compose up -d --wait
docker compose exec web ./node_modules/.bin/tsx prisma/seed.ts
docker compose ps
```

Confirm both containers report `healthy`, then open [http://localhost:3000](http://localhost:3000).

## Canonical opening state

The seed is deterministic and verified every time it runs:

- 15 total demo users: 12 staff, one member, one manager, and one super admin
- Five staff modules and three member courses containing 24 lessons and 24 quiz questions
- Five active visitor scenarios across Courses, Culture, Médiathèque, and Campus France
- 20 completed simulation sessions with sequenced transcripts and assessments
- 38 completed staff-module records and one completed member course
- Alex starts at 68% learning progress, 3/5 modules, seven simulations, and an 84% average score

## Pitch journey

1. Sign in as Alex and establish the 68%, 3/5, seven-session, 84% baseline.
2. Complete **Elegant Communication & Active Empathy** with the three correct quiz answers. Home updates to 80% and 4/5.
3. Start **Course Registration Confusion**, send at least two thoughtful replies, then select **End and assess**.
4. Show the five skill scores, strength, improvement guidance, transcript, and **Handling Difficult Situations with Grace** recommendation.
5. Open Progress and show the session count increasing from seven to eight.
6. Sign in as Manager and show participation, aggregate skill insights, and **Suggested Training Focus**.
7. Sign in as Super Admin and show learning content, demo users, scenario editing, and activation controls.
8. Optionally sign in as `member@ifi.demo` and show the separate French-learning dashboard, course catalogue, quiz, and progress.

The simulator is intentionally deterministic rather than live AI. This keeps the pitch repeatable, removes API-key risk, and follows the approved prototype scope.

## Recovery

If a rehearsal changes data, restore the opening state with:

```powershell
docker compose exec web ./node_modules/.bin/tsx prisma/seed.ts
```

If the UI does not reflect the newest source, rebuild instead of restarting the old image:

```powershell
docker compose up --build -d --wait
```

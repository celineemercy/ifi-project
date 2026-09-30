# Primary Demo Script

The complete prototype should support this exact story without broken screens.

1. Sign in as `alex.staff@ifi.demo` with `demo123`.
2. Confirm the home screen greets Alex and shows 68% progress, 3/5 completed modules, seven practice sessions, and an 84% average score.
3. Open **Communication & Empathy**.
4. Read the lessons, answer the three-question quiz, and confirm progress updates to 80% with 4/5 completed modules.
5. Open **Practice Simulator** and select Courses.
6. Select **Course Registration Confusion**.
7. Respond to the visitor for approximately 3–5 exchanges.
8. End the simulation.
9. Review communication, empathy, problem-solving, professional-tone, clarity, and overall scores.
10. Confirm the recommended module is **Handling Difficult Situations**.
11. Open Progress and confirm the simulation count has updated.
12. Sign in as `manager@ifi.demo`.
13. Review team skill scores, learning completion, and Suggested Training Focus.

Every assessment screen must state that simulated feedback is intended for learning and development purposes and is not a formal employee-performance evaluation.

Run `npm run test:e2e` for the repeatable cross-role rehearsal. The test resets the canonical seed before and after the journey so the demonstration always begins at the documented metrics.

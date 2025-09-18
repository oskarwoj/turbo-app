We just implemented the feature described in the plan (`docs/features/0001_PLAN.md`).

Please do a thorough code review aligned with our repo conventions:

1. Verify the plan was implemented as specified in `docs/features/0001_PLAN.md`.
2. Check for obvious and subtle bugs, including data shape mismatches (snake_case vs camelCase, `{data:{}}` wrappers, etc.).
3. Ensure API boundaries use Zod schemas from `@packages/validators` and return 400 with `.format()` on validation failure.
4. Confirm all database access uses Drizzle via `@packages/db` only.
5. Review error handling for early returns and centralized Express error middleware usage.
6. Watch for over-engineering, large files that need refactoring, and style mismatches; target 0 ESLint warnings.
7. Ensure environment usage follows conventions: API via `process.env`, web via `import.meta.env`.

Document findings in `docs/features/<N>_REVIEW.md` (create a new numbered review file matching the feature ID). Include:

- Summary of what was reviewed
- Findings grouped by severity (blocker, major, minor, nit)
- Suggested fixes and references to files (use paths like `apps/api/src/...`)
- Any follow-up tasks

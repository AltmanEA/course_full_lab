# Project Coding Rules (Non-Obvious Only)

- **Educational purpose**: This is a learning project with coding exercises for students. Each task has two intentional states: **ASSIGNMENT** (tests fail) and **SOLUTION** (tests pass). Ensure that after your changes, the task transitions from ASSIGNMENT to SOLUTION (tests pass).
- **Drizzle safety**: Always provide a `where` condition when calling `db.delete()` or `db.update()`. The linter (`eslint-plugin-drizzle`) will catch omissions for `db` and `ctx.db`.
- **Type imports**: Use `import type { ... }` for types; ESLint enforces `inline-type-imports`.
- **tRPC middleware**: A timing middleware adds artificial delay (100‑500ms) in development and logs execution time. This can affect test timing; consider mocking or adjusting timeouts.
- **Task structure**: Each coding exercise lives in `src/app/{technology}/{task_name}/` with a `page.tsx`, a spec file, and a README. Tests are colocated, not in a separate `__tests__` folder.
- **Better Auth integration**: Session data is available via `auth.api.getSession()` in tRPC context. Use `ctx.session` in protected procedures.
- **Path alias**: `~/*` maps to `./src/*`. Use it for imports to avoid relative path confusion.
- **Tailwind class sorting**: Prettier with `prettier-plugin-tailwindcss` automatically sorts classes; manual sorting is unnecessary.
- **Database connection caching**: In development, the Postgres connection is cached globally to avoid HMR disconnects. Changes to `DATABASE_URL` may require a restart.
- **TypeScript strictness**: `noUncheckedIndexedAccess` is enabled, meaning array accesses may return `undefined`. Handle accordingly with optional chaining or checks.
- **E2E test location**: Playwright tests are in the same directory as the task (`{task_name}.spec.ts`). Run them with `npx playwright test src/app/{technology}/{task_name}/`.
- **Environment variables**: `BETTER_AUTH_SECRET` is optional in development; the schema is in `src/env.js`.
- **Avoid mass deletions**: The Drizzle adapter for Better Auth uses `db.delete()` without `where` in migrations; this is okay only in migration files.

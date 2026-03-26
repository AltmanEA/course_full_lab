# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Build/Lint/Test Commands

- **Unit tests**: Use `npm run test` (Vitest) for all tests, `npm run test:run` for single run.
- **E2E tests**: Use `npm run test:e2e` (Playwright). Tests run against a pre‑started Docker container (`lab_next:3000`), not a local dev server. To run a single task's E2E test: `npx playwright test src/app/{technology}/{task_name}/`.
- **Linting**: ESLint includes Drizzle‑specific rules that enforce `WHERE` clauses on `delete()` and `update()` operations for `db` and `ctx.db`. Missing `WHERE` will cause lint errors.
- **Database**: Migrations are managed with Drizzle‑Kit. Use `npm run db:generate`, `npm run db:push`, `npm run db:migrate` as needed. The database connection is cached globally in development.

## Code Style & Conventions

- **Imports**: Type imports are enforced (`type‑imports` with `inline‑type‑imports`). Use `import type { ... }` for types.
- **Drizzle safety**: Always provide a `where` condition when calling `db.delete()` or `db.update()`. The linter will catch omissions.
- **tRPC middleware**: A timing middleware adds an artificial delay (100‑500ms) in development and logs execution time. This can affect test timing.
- **Path alias**: `~/*` maps to `./src/*` (configured in `tsconfig.json`).
- **Formatting**: Prettier with `prettier‑plugin‑tailwindcss` sorts Tailwind classes automatically.

## Project‑Specific Patterns

- **Educational purpose**: This is a learning project containing coding exercises for students. Each task is designed to teach a specific technology (Next.js, Drizzle, tRPC, Better Auth).
- **Task structure**: Each coding exercise lives in `src/app/{technology}/{task_name}/` with a `page.tsx`, a spec file, and a README. Tests are colocated, not in a separate `__tests__` folder.
- **Task states**: Every task has two intentional states: **ASSIGNMENT** (tests fail) and **SOLUTION** (tests pass). The initial code is in ASSIGNMENT state with deliberate gaps or errors. After the student fixes the code, the task should transition to SOLUTION state where all tests pass.
- **Testing expectation**: When working with tasks, ensure that tests fail in the original state and pass after corrections. This is a key validation mechanism for task correctness.
- **Better Auth**: The authentication layer is built with Better Auth. Session data is available via `auth.api.getSession()` in tRPC context.
- **Environment variables**: Validated with `@t3‑oss/env‑nextjs`. The schema is in `src/env.js`. `BETTER_AUTH_SECRET` is optional in development.
- **Playwright config**: Base URL is `http://lab_next:3000` (Docker service). No webServer is defined; the app must already be running in the container.

## Gotchas & Non‑Obvious Details

- **Database connection**: In development, the Postgres connection is cached globally to avoid HMR disconnects. Changes to `DATABASE_URL` may require a restart.
- **tRPC context**: The `createTRPCContext` expects `headers` from the request. In tests, you must mock the headers or use the test utilities from `src/app/trpc/_core/testCaller.ts`.
- **E2E test isolation**: Playwright tests are run in a Docker‑based environment; localhost will not work. Use the provided `scripts/run‑playwright.js` for Docker‑based test execution.
- **TypeScript strictness**: `noUncheckedIndexedAccess` is enabled, meaning array accesses may return `undefined`. Handle accordingly.
- **Tailwind 4**: The project uses Tailwind CSS v4 with PostCSS plugin. Class sorting is automatic; manual sorting is not needed.

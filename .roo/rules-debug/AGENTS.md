# Project Debug Rules (Non-Obvious Only)

- **Task states for debugging**: Each task has two intentional states: **ASSIGNMENT** (tests fail) and **SOLUTION** (tests pass). When debugging, verify that the task is in the correct state. If tests pass unexpectedly, the task may already be in SOLUTION state.
- **Database connection caching**: In development, the Postgres connection is cached globally. If you change `DATABASE_URL`, you may need to restart the dev server to pick up the new connection.
- **tRPC timing middleware**: Adds artificial delay (100‑500ms) in development, which can make tests appear slow. Disable by commenting out the middleware in `src/server/api/trpc.ts` if needed for debugging.
- **Playwright base URL**: E2E tests run against `http://lab_next:3000` (Docker service), not localhost. Ensure the Docker container `lab_next` is running before executing `npm run test:e2e`.
- **Log locations**: tRPC procedure execution times are logged to console with `[TRPC] {path} took {ms}ms`. Look for these logs in the terminal where `npm run dev` is running.
- **Better Auth session debugging**: Session data is retrieved via `auth.api.getSession()`. If sessions are not working, check the `better-auth` configuration in `src/server/better-auth/config.ts`.
- **Linter errors for Drizzle**: Missing `where` in `db.delete()` or `db.update()` will cause ESLint errors. The error message may not clearly indicate the rule; check `eslint-plugin-drizzle`.
- **TypeScript `noUncheckedIndexedAccess`**: Array accesses may return `undefined`; use optional chaining (`arr?.[0]`) or explicit checks to avoid runtime errors.
- **Vitest mocking**: Use `vi.fn()` and `vi.mock()` for unit tests. The test utilities are in `src/app/trpc/_core/testCaller.ts` for tRPC context mocking.
- **Environment variable validation**: The env schema (`src/env.js`) may skip validation if `SKIP_ENV_VALIDATION` is set. Use this to bypass validation in Docker builds.
- **Docker‑based E2E debugging**: Use `npm run test:e2e:debug` to run Playwright in debug mode. The tests run inside the Docker network; you may need to attach to the container for inspection.
- **Database migrations**: Drizzle‑Kit migrations are forward‑only; rollbacks are not supported. Use `db:push` for schema updates in development, but be cautious with production data.

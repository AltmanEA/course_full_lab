# Project Architecture Rules (Non-Obvious Only)

- **Educational task‑based structure**: The application is organized around coding exercises for students, not features. Each task lives in `src/app/{technology}/{task_name}/` and includes a page, tests, and README. Tasks have two intentional states: **ASSIGNMENT** (tests fail) and **SOLUTION** (tests pass). This is a deliberate design for educational purposes.
- **Better Auth integration**: Authentication is handled by Better Auth with Drizzle adapter. The auth instance is configured in `src/server/better-auth/` and provides session data to tRPC context.
- **tRPC middleware layer**: A timing middleware adds artificial delay in development to simulate network latency. This affects all procedures; consider this when designing performance‑sensitive features.
- **Database connection caching**: In development, the Postgres connection is cached globally to avoid HMR disconnects. This means changes to `DATABASE_URL` require a server restart.
- **Drizzle safety rules**: ESLint enforces `WHERE` clauses on `db.delete()` and `db.update()` for `db` and `ctx.db`. This is a critical safety measure to prevent accidental mass deletions.
- **Playwright E2E isolation**: E2E tests run against a pre‑started Docker container (`lab_next:3000`), not a local dev server. This ensures environment consistency but requires Docker to be running.
- **Path alias `~/*`**: Configured in `tsconfig.json` to map to `./src/*`. Use this alias to keep imports clean and avoid deep relative paths.
- **TypeScript strictness**: `noUncheckedIndexedAccess` is enabled, meaning array and object index accesses may return `undefined`. This influences data handling throughout the codebase.
- **Tailwind 4 with PostCSS**: Uses Tailwind CSS v4 via PostCSS plugin. Class sorting is automatic; manual sorting is unnecessary.
- **Environment validation**: Environment variables are validated with `@t3‑oss/env‑nextjs`. The schema is in `src/env.js`. `BETTER_AUTH_SECRET` is optional in development.
- **Monorepo‑like organization**: Although not a monorepo, the project separates technologies (bauth, drizzle, trpc) into subdirectories under `src/app/`. Each technology has its own set of tasks.
- **Testing colocation**: Test files are placed next to source files (not in `__tests__`). This is intentional for ease of navigation in educational context.
- **Forward‑only migrations**: Drizzle‑Kit migrations are forward‑only; rollbacks are not supported. Plan schema changes carefully.

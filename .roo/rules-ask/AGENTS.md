# Project Documentation Rules (Non-Obvious Only)

- **Educational purpose**: This is a learning project with coding exercises for students. Each task is designed to teach a specific technology (Next.js, Drizzle, tRPC, Better Auth) and has two intentional states: **ASSIGNMENT** (tests fail) and **SOLUTION** (tests pass).
- **Task structure**: Each coding exercise lives in `src/app/{technology}/{task_name}/` with a `page.tsx`, a spec file, and a README. The README contains minimal description; avoid adding hints.
- **Better Auth**: The authentication layer is built with Better Auth, not NextAuth. Session management is handled via `auth.api.getSession()`. The configuration is in `src/server/better-auth/config.ts`.
- **tRPC context**: The `createTRPCContext` expects `headers` from the request. In tests, you must mock headers or use `src/app/trpc/_core/testCaller.ts`.
- **Path alias**: `~/*` maps to `./src/*`. Use it for imports to maintain consistency.
- **Drizzle safety**: ESLint rules enforce `WHERE` clauses on `db.delete()` and `db.update()`. This is a project‑specific safety measure to prevent accidental mass deletions.
- **Playwright E2E**: Tests run against a Docker container (`lab_next:3000`), not a local dev server. The base URL is configured in `playwright.config.ts`. No webServer is defined.
- **Environment variables**: Validated with `@t3‑oss/env‑nextjs`. The schema is in `src/env.js`. `BETTER_AUTH_SECRET` is optional in development.
- **TypeScript strictness**: `noUncheckedIndexedAccess` is enabled, meaning array accesses may return `undefined`. This affects many parts of the codebase.
- **Tailwind 4**: The project uses Tailwind CSS v4 with PostCSS plugin. Class sorting is automatic via Prettier plugin.
- **Database migrations**: Managed with Drizzle‑Kit. Use `npm run db:generate` (after schema changes), `npm run db:push` (to update database), `npm run db:migrate` (to create migration files).
- **Testing**: Unit tests use Vitest, E2E tests use Playwright. Test files are colocated with source files, not in a separate `__tests__` folder.
- **KODA.md**: Contains project‑specific guidelines for creating tasks (in Russian). Refer to it for task creation workflows.

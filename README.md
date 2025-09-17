# turbo-app

A Turbo app monorepo with a React 19 + Vite frontend and an Express 5 API backed by PostgreSQL (Supabase) using Drizzle ORM.

## Stack

- TypeScript 5
- React 19 + Vite
- Tailwind CSS 4 + shadcn/ui
- Express 5 (API)
- PostgreSQL on Supabase + Drizzle ORM
- Turbo, ESLint, Prettier, Vitest

See `CLAUDE.md` for architecture details and conventions.

## Workspace layout

```
apps/
  web/   # React + Vite frontend
  api/   # Express API server
packages/
  db/          # Drizzle schema and client (requires DATABASE_URL)
  validators/  # Zod schemas shared across apps
```

## Prerequisites

- Node.js >= 22
- npm 11.6.0 (locked via packageManager)
- A Supabase Postgres connection string for `DATABASE_URL`

## Install

```bash
npm install --no-fund --no-audit
```

## Development

Start everything:

```bash
npm run dev
```

Start a single app:

```bash
cd apps/web && npm run dev     # Vite dev server
cd apps/api && npm run dev     # Express dev server
```

## Environment

The API reads environment variables via `dotenv`.

Create `apps/api/.env`:

```bash
# Supabase Postgres connection string
DATABASE_URL=postgres://user:pass@host:5432/db
# Optional, defaults to 3000
PORT=3000
```

Vite reads variables from `import.meta.env`; add any web-only env to `apps/web` as needed.

## Database (Drizzle + Supabase Postgres)

Define tables in `packages/db/src/schema.ts`. The client is configured in `packages/db/src/client.ts`.

Generate/apply migrations from `packages/db`:

```bash
npm run db:generate
npm run db:push
```

## API

- Health check: `GET /health` → `{ ok: true }`
- Validation: use Zod DTOs from `@packages/validators` via a small middleware
- Data access: use Drizzle `@packages/db` (do not use `@supabase/supabase-js` for API DB queries)

Run API only:

```bash
cd apps/api && npm run dev
```

## Frontend

React 19 + Vite with Tailwind 4 and shadcn/ui.

- Aliases: `@/` (see `apps/web/tsconfig.json`)
- Components live in `apps/web/src/components` and `apps/web/src/components/ui`
- Add shadcn components from `apps/web`:

```bash
cd apps/web && npx shadcn@latest add button
```

## Quality

- Type check: `npm run typecheck`
- Lint: `npm run lint` (0 warnings tolerated)
- Test: `npm test`

## Scripts (root)

- `npm run dev` — Run all apps in parallel (web + api)
- `npm run build` — Build all
- `npm run typecheck` — TypeScript checks across workspaces
- `npm run lint` — ESLint across workspaces
- `npm test` — Vitest across workspaces

## Notes

- API errors use centralized error middleware and return `{ message }` with status 500 by default.
- Prefer guard clauses and early returns; validate inputs at the boundary.
- See `CLAUDE.md` for more details and patterns.

## Tech Stack & Architecture

This is a Turbo repo monorepo with the following structure:

- **Frontend**: React 19 + Vite + Tailwind CSS 4 + shadcn/ui components
- **Backend**: Express.js API with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Tooling**: Turbo for build orchestration, Vitest for testing, ESLint + Prettier for code quality

## Project Structure

```
├── apps/
│   ├── web/          # React frontend (Vite app)
│   └── api/          # Express.js backend API
├── packages/
│   ├── db/           # Shared database schema and client (Drizzle)
│   └── validators/   # Shared Zod validation schemas
```

## Cursor & Rules

- `.cursor/rules/shared.mdc` defines enforced Cursor rules for this repo and is always applied.
- `AGENTS.md` provides architecture, workflows, and commands for humans and AI.
- Keep both files in sync. If conventions conflict, prefer the rule file and update both.

## Common Commands

### Development

- `npm run dev` - Start all apps in parallel (web + api)
- `cd apps/web && npm run dev` - Start only the web app
- `cd apps/api && npm run dev` - Start only the API server

### Build & Quality Checks

- `npm run build` - Build all packages and apps
- `npm run typecheck` - Run TypeScript checks across all packages
- `npm run lint` - Run ESLint across all packages
- `npm test` - Run tests across all packages

### Database (from packages/db/)

- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema changes to database

## Key Architecture Patterns

### Database Layer

- Uses Drizzle ORM with PostgreSQL
- Schema defined in `packages/db/src/schema.ts`
- Database client exported from `packages/db/src/client.ts`
- Requires `DATABASE_URL` environment variable

### API Layer (apps/api)

- Express.js server with middleware for CORS, Helmet, JSON parsing
- Validation middleware using Zod schemas from `@packages/validators`
- Error handling with try/catch and global error middleware
- Uses imports from workspace packages: `@packages/db` and `@packages/validators`

### Frontend Layer (apps/web)

- React 19 with Vite as build tool
- Tailwind CSS 4 with shadcn/ui components in `src/components/ui/`
- Uses `@tanstack/react-query` for data fetching
- Component utilities in `src/lib/utils.ts`

### Shared Packages

- `@packages/validators`: Zod schemas for data validation (used by both frontend and backend)
- `@packages/db`: Database schema and client (used by backend)

## Code Quality Standards

- Pre-commit hooks configured with Husky + lint-staged
- ESLint with React plugins and TypeScript support
- Prettier for code formatting
- Maximum 0 ESLint warnings enforced

## Environment Setup

- Node.js >=22 required (npm@11.6.0 locked via workspaces)
- Uses npm workspaces for monorepo management
- Package manager locked to npm@11.6.0

## Testing

- Vitest configured across all packages
- Supertest used for API testing
- Individual packages can run tests with `npm test`

## Conventions Quick Reference

- API reads env via `process.env`; web via `import.meta.env`.
- Required env: `DATABASE_URL`; optional: `PORT` for API.
- API imports `@packages/db`, `@packages/validators`; web uses `@/` alias.
- Use Drizzle for all DB access; validate inputs with Zod DTOs.
- On validation failure, return 400 with `.format()`.
- Centralized Express error middleware; prefer guard clauses and early returns.
- Prefer optional chaining and nullish coalescing; avoid leaking secrets in logs.

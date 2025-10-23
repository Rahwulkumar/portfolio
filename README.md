# Portfolio Platform

Modern personal portfolio showcasing live GitHub activity, daily LeetCode progress, current projects, and long-form writing. Built with Next.js, Supabase, and a secure admin dashboard so updates stay effortless.

## Project Overview

- **Roadmap**: `docs/roadmap.md`
- **Phase tasks**: `docs/tasks.md`
- **Detailed setup notes**: `learnings/setup-notes.md`

Always review those documents before making changes; they define the current priorities, phase branches, and conventions.

## Tech Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui component primitives
- Supabase (Postgres, Row Level Security, Storage)
- NextAuth (GitHub OAuth) for admin access
- GitHub Actions for CI/CD and scheduled activity syncs
- pnpm for dependency management

## Getting Started

```bash
# install dependencies
pnpm install

# run the dev server
pnpm dev

# lint, type-check, and test
pnpm lint
pnpm typecheck
pnpm test -- --run

# format the codebase
pnpm format
```

The app serves on `http://localhost:3000` by default. Build with `pnpm build` to validate the production bundle.

### Environment Variables

Copy `.env.example` into `.env.local` and fill in the secrets:

- `GITHUB_PERSONAL_ACCESS_TOKEN`
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `LEETCODE_SESSION`
- `RESEND_API_KEY`
- optional extras (Redis, Postgres connection strings) as needed

Additional values will be documented in `docs/project-overview.md` as the project evolves.

## Branch Strategy

- Default branch: `main`
- Active work happens on phase branches (`phase/00-discovery`, `phase/01-foundation`, etc.)
- Feature-specific branches fork from the active phase branch (`feature/phase-03-project-gallery`)
- Pull requests require passing CI and review before merging

## Tooling Checklist (Phase 01)

- [x] Scaffold Next.js app with pnpm
- [x] Configure ESLint, Prettier, Husky, lint-staged, Commitlint
- [ ] Add placeholder pages and shared layout
- [x] Introduce `.env.example`
- [x] Create CI workflow (`.github/workflows/ci.yml`)

Track status in `docs/tasks.md` and `learnings/setup-notes.md`.

## Documentation Map

- `docs/phase-XX-*.md` - phase goals, tasks, acceptance criteria
- `docs/project-overview.md` - master plan, tech choices, budget
- `docs/tasks.md` - actionable checklist
- `docs/setup.md` - local setup instructions
- `docs/mcp-setup.md` - how to provision MCP tokens
- `learnings/setup-notes.md` - log of commands, reasoning, and lessons

## MCP Servers

- Configuration: `.cursor/mcp.json`
- Token guide: `docs/mcp-setup.md`

Launch the relevant server (shadcn, GitHub, Supabase, Prisma, Postgres, git, fetch) whenever you work in its domain to guarantee up-to-date context.

## Contributing Workflow

1. Checkout the relevant phase branch (current: `phase/01-foundation`).
2. Run `pnpm lint`, `pnpm typecheck`, and `pnpm test -- --run` before committing.
3. Update documentation whenever behaviour changes.
4. Open a PR against the phase branch; await review and CI green.
5. Merge phase into `main` only after acceptance criteria pass.

## License

TBD - choose a license once project requirements are finalized.

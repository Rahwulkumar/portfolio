# Local Development Setup

Follow these steps to get the portfolio project running on your machine.

## Prerequisites

- Node.js 20.x or later
- pnpm `>=10.19.0` (install globally with `npm install -g pnpm`)
- Git

## First-Time Installation

```bash
# install dependencies
pnpm install
```

## Running the App

```bash
pnpm dev
```

The dev server boots on `http://localhost:3000`.

## Quality Checks

```bash
pnpm lint         # ESLint (Next.js rules + custom plugins)
pnpm typecheck    # TypeScript --noEmit (auto-generates .next/types stub first)
pnpm test -- --run  # Vitest in happy-dom with coverage
pnpm build        # Production build sanity check
pnpm format       # Prettier with Tailwind plugin
```

## Environment Variables

Copy `.env.example` (added in Phase 01) into `.env.local` and fill in:

- `GITHUB_PERSONAL_ACCESS_TOKEN`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `LEETCODE_SESSION`
- `RESEND_API_KEY`

Additional values will be added as features land. Check `docs/project-overview.md` for the latest list and notes on rotation. For MCP-specific tokens, follow `docs/mcp-setup.md`.

## Development Workflow

1. Checkout the active phase branch (currently `phase/01-foundation`).
2. Open `docs/tasks.md` and complete items in order.
3. Update docs whenever behaviour changes.
4. Run lint, typecheck, format (as needed), and tests before pushing.
5. Open pull requests into the phase branch and wait for CI + review before merging.

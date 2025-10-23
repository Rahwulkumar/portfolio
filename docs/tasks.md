# Portfolio Project Task Board

Use this checklist as the working backlog for the portfolio platform. All tasks reference the living documentation in `/docs` and the Cursor rules under `.cursor/rules/`.

- Always keep `docs/project-overview.md` open; it is the source of truth for architecture, stack, and next actions.
- Cursor rules to follow:
  - `.cursor/rules/front-end-developer.mdc` - baseline front-end constraints (auto-applied).
  - `.cursor/rules/portfolio-overview.mdc` - ensures we respect the roadmap and update docs when decisions shift.
- MCP servers configured in `.cursor/mcp.json` should be launched when work touches their domains (UI via shadcn, GitHub automation, Supabase, Prisma, Postgres, git history, or fetch integrations).

## Phase 00 - Discovery (`phase/00-discovery`)

- [ ] Review `docs/phase-00-discovery.md` checklist and break into individual GitHub issues.
- [ ] Gather content inputs (bio, skills, project summaries, blog themes, contact preferences) and write them into `docs/content-brief.md`.
- [ ] Produce sitemap outline and store as `docs/sitemap-v1.drawio` (or markdown sketch for now).
- [ ] Document data entities in `docs/data-model-outline.md`.
- [ ] Capture design inspiration and integration decisions in the decision log.

## Phase 01 - Foundation (`phase/01-foundation`)

- [ ] Follow tasks in `docs/phase-01-foundation.md`.
- [x] Initialize Next.js project scaffold; commit from `phase/01-foundation` branch.
- [x] Configure tooling (pnpm, ESLint, Prettier, Husky, lint-staged, Commitlint).
- [x] Stand up base layout and placeholder pages; document setup steps in `docs/setup.md`.
- [x] Ensure `.env.example` matches secrets described in `docs/project-overview.md`.

## Phase 02 - Activity Services (`phase/02-activity-services`)

- [ ] Use `docs/phase-02-activity-services.md` to create Supabase schema migrations in `/supabase/migrations`.
- [ ] Implement GitHub and LeetCode ingestion scripts (reference MCP servers `github`, `fetch`, `supabase`).
- [ ] Configure GitHub Action workflow `activity-sync.yml`; add secrets as per `.cursor/mcp.json` placeholders.
- [ ] Document manual refresh command in README and `docs/project-overview.md`.

## Phase 03 - Core UI (`phase/03-core-ui`)

- [ ] Execute UI build tasks from `docs/phase-03-core-ui.md` on branch `phase/03-core-ui`.
- [ ] Utilize Shadcn MCP server for component references before implementing sections.
- [ ] Implement activity visualizations consuming cached APIs.
- [ ] Add RTL/Vitest suites for critical components.
- [ ] Update component notes under `docs/components/` (create directory if missing).

## Phase 04 - Blog (`phase/04-blog`)

- [ ] Follow `docs/phase-04-blog.md` while working on `phase/04-blog` branch.
- [ ] Decide on MDX workflow; configure Contentlayer with assistance from Prisma/Postgres MCP servers if schema ties in.
- [ ] Generate feeds (RSS/JSON) and verify with W3C validator.
- [ ] Draft `docs/content-workflow.md` to guide publishing steps.

## Phase 05 - Admin (`phase/05-admin`)

- [ ] Reference `docs/phase-05-admin.md`; keep `portfolio-overview.mdc` rule active to honor security expectations.
- [ ] Integrate NextAuth GitHub OAuth; ensure tokens align with `.cursor/mcp.json` env placeholders.
- [ ] Build CRUD views and audit logs, testing via Playwright (launch `git`, `supabase`, and `prisma-local` MCP servers as needed).
- [ ] Update `docs/admin-guide.md` with provisioning instructions.

## Phase 06 - Launch (`phase/06-launch`)

- [ ] Complete `docs/phase-06-launch.md` tasks on `phase/06-launch`.
- [ ] Implement contact form with Resend + hCaptcha, validating from MCP `fetch` (for LeetCode) and `supabase`.
- [ ] Run final Lighthouse, accessibility, and performance audits; record in QA log.
- [ ] Configure domain via Namecheap + Vercel, documenting steps in `docs/project-overview.md`.
- [ ] Prepare release notes, marketing copy, and `docs/backlog.md` for post-launch items.

## Cross-Phase Tasks

- [ ] Keep documentation synced after every significant change (update roadmap, phase docs, or decision logs).
- [ ] Maintain GitHub Project board (columns: Backlog, In Progress, In Review, Done) and link issues to phases.
- [ ] Rotate secrets regularly; replace `<your-token>` placeholders in `.cursor/mcp.json` once credentials are ready.
- [ ] Ensure tests and lint pass locally (`pnpm lint && pnpm test`) before opening PRs.
- [ ] Ensure `docs/mcp-setup.md` stays in sync when tokens or server commands change.
- [ ] Leverage relevant MCP servers during development for accurate context (e.g., shadcn for UI patterns, prisma-local for schema assistance).

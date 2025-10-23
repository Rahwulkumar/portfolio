# Portfolio Roadmap & Architecture Blueprint

## Vision

Build a personal portfolio that showcases current projects, highlights daily coding habits (GitHub + LeetCode), and offers an authenticated admin dashboard for ongoing updates. The experience should feel fast, polished, and trustworthy while remaining cost-effective by leveraging GitHub Student Pack perks and free tiers.

## Recommended Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, React 18, Tailwind CSS + shadcn/ui for component primitives, Framer Motion for subtle interactions.
- **Backend/Data**: Supabase (Postgres, Row Level Security, Auth, Storage). Prisma ORM optional for migrations and typing.
- **Auth**: NextAuth.js with GitHub OAuth (allowlist). Admin-only routes using server-side session checks.
- **Automation**: GitHub Actions for CI/CD, scheduled CRON workflows fetching GitHub and LeetCode data.
- **Activity Integrations**:
  - GitHub REST API v3 for recent commits, pinned repos, language stats.
  - LeetCode GraphQL endpoint accessed via session cookie stored as encrypted secret; fallback manual overrides in admin.
- **Email & Forms**: Resend (free tier) for contact form delivery and admin notifications.
- **Analytics**: Vercel Analytics (basic free) or Umami self-hosted on Railway free plan.
- **Security**: hCaptcha (free) on contact and admin forms, Zod validation, helmet-style headers via Next middleware.
- **Tooling**: pnpm, ESLint, Prettier, Husky, lint-staged, Commitlint, Playwright (E2E), Vitest/RTL (unit).
- **Design Support**: Storybook optional; Figma for mockups (free tier).

## Infrastructure & Deployment

- **Hosting**: Vercel Hobby (0 USD) connected to GitHub for preview deployments per branch.
- **Database**: Supabase free tier (500MB DB, 2GB storage, 50MB egress). Monitor usage monthly.
- **Domain**: Namecheap .me or .tech via GitHub Student Pack coupon (approx. 0 USD first year). Configure DNS on Vercel.
- **Secrets Management**: Store environment variables in Vercel and Supabase dashboards; keep `.env` local only.
- **Monitoring**: Healthchecks.io free plan for ping on scheduled tasks (optional), GitHub Actions logs for automation visibility.

## Branching Strategy

- Default protected branch: `main`.
- Phase branches (long-lived during execution, merged sequentially):
  - `phase/00-discovery`
  - `phase/01-foundation`
  - `phase/02-activity-services`
  - `phase/03-core-ui`
  - `phase/04-blog`
  - `phase/05-admin`
  - `phase/06-launch`
- For larger tasks inside a phase, create short-lived feature branches off the active phase branch (example: `feature/phase-03-project-gallery`).
- Require PR reviews and passing CI before merging into phase branches, then into `main`.
- Tag major milestones (`v0.1.0` beta, `v1.0.0` launch) after Phase 06.

## Phase Overview

| Phase | Focus             | Primary Deliverables                           | Duration     |
| ----- | ----------------- | ---------------------------------------------- | ------------ |
| 00    | Discovery & IA    | Content brief, sitemap, data-model outline     | 2-3 sessions |
| 01    | Foundation        | Next.js scaffold, tooling, base layout         | 3-4 sessions |
| 02    | Activity Services | Supabase schema, GitHub/LeetCode ingesters     | 4-5 sessions |
| 03    | Core UI           | Responsive pages, activity visualizations      | 4-6 sessions |
| 04    | Blog              | MDX pipeline, feeds, content workflow          | 3-4 sessions |
| 05    | Admin             | Authenticated dashboard, CRUD forms, overrides | 4-5 sessions |
| 06    | Launch            | Contact flow, analytics, domain, QA            | 3-4 sessions |

Detailed scope per phase lives in the respective Markdown files within `/docs/`.

## Budget & Free Tier Checklist

- Vercel Hobby: 0 USD (100GB bandwidth/mo, 10GB/month serverless executions).
- Supabase Free: 0 USD (monitor for DB size; consider upgrade around $25/mo if exceeded).
- Namecheap domain via GitHub Student Pack: free first year, plan for renewal ($8-12/year) after year one.
- Resend: free for 3,000 emails/mo.
- hCaptcha: free for non-commercial usage.
- GitHub Actions: free for private repos (2,000 build minutes/mo) under Student Pack; stay aware of usage.
- Optional post-launch upgrades: Upstash Redis (free tier), Axiom for logging (free), Fathom Analytics (paid, optional).

## Workflow & Cadence

1. Open a GitHub Project board with columns (Backlog, In Progress, In Review, Done) per phase.
2. Before each phase, review acceptance criteria and break them into issues.
3. Daily: run `pnpm lint && pnpm test` locally; push to a feature branch; open a PR into the phase branch.
4. Weekly: merge completed tasks into the phase branch, deploy preview, gather feedback.
5. After stakeholder sign-off, fast-forward merge the phase branch into `main`; create release notes.

## Data Flow Summary

1. **GitHub Activity**: CRON (GitHub Action) -> fetch -> Supabase tables -> Next.js server actions -> UI components.
2. **LeetCode Stats**: Scheduled script -> LeetCode GraphQL -> Supabase normalized tables -> Cached API route -> UI charts.
3. **Projects & Blog**: Admin dashboard or MDX commits -> Supabase/Repo -> Build-time fetch -> Render on site.
4. **Contact Form**: User submission -> Next.js route handler -> Resend email + Supabase storage -> Admin view.

## Testing Strategy

- Unit tests (Vitest/RTL) for utils, hooks, and components with logic.
- Integration tests for API routes ensuring data transforms correctly.
- Playwright for user flows (viewing homepage, submitting contact form, admin login + project creation).
- Accessibility tests with `@axe-core/playwright` and manual keyboard audits each release.

## Security & Privacy Checklist

- Enforce HTTPS, secure cookies, and same-site policy.
- Store secrets only in environment managers; never commit to the repo.
- Log admin actions with user/time metadata.
- Provide a privacy note about analytics and data usage.
- Back up Supabase weekly (automated or manual export).

## Next Steps

1. Start Phase 00 tasks using `docs/phase-00-discovery.md` as a checklist.
2. Gather API credentials and populate `.env.example` during Phase 01.
3. Set up the GitHub Project board aligning with the phase roadmap.
4. Schedule a design discussion before entering Phase 03 to lock visual direction.

This roadmap can evolve, so update Markdown files as discoveries occur. Keep the documentation close to source control to ensure onboarding and handoff remain effortless.

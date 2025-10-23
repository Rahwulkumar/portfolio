# Portfolio Platform – Master Plan

## 1. Product Summary

Create a personal portfolio platform that highlights ongoing work, daily coding habits, and thought leadership. The site will:

- Showcase projects with rich context (tech stack, status, outcomes).
- Surface real-time GitHub activity (recent commits, pinned repos, streak insights).
- Visualize LeetCode progress (daily streaks, solved counts by difficulty, recent problems).
- Host a blog for long-form writing.
- Provide a secure admin dashboard to curate content, override metrics when automation fails, and manage highlights.
- Deliver a polished public experience with excellent performance, accessibility, and responsive design.

## 2. Success Criteria

- Visitors quickly understand skills, current focus, and coding consistency.
- Projects and blog posts are easy to browse, filter, and share.
- Activity data stays fresh automatically without manual updates.
- Admin tasks (adding projects, adjusting metrics, drafting posts) are fast and safe.
- The system operates comfortably on free or student-tier infrastructure.
- Deployments are automated with reliable previews and quality gates.

## 3. Technology Stack

| Layer          | Choice                                                                         | Notes                                                          |
| -------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| Frontend       | Next.js 14 (App Router), React 18, TypeScript                                  | ISR + server actions for dynamic data, strong DX.              |
| Styling        | Tailwind CSS + shadcn/ui components, utility helpers (clsx)                    | Fast to iterate, consistent themes, dark/light support.        |
| Animations     | Framer Motion (light touch)                                                    | Enhance hero + transitions without hurting perf.               |
| Data & Auth    | Supabase (Postgres, RLS, Storage) + optional Prisma                            | Central source for projects, activity snapshots, admin assets. |
| Auth           | NextAuth.js with GitHub OAuth allowlist                                        | Restrict admin portal; session handled server-side.            |
| Automation     | GitHub Actions (CI, scheduled sync jobs)                                       | Lint/test/build on PRs, daily data ingestion.                  |
| Activity APIs  | GitHub REST API v3, LeetCode GraphQL (cookie auth)                             | Normalized and cached in Supabase tables.                      |
| Email          | Resend (free tier)                                                             | Contact form delivery + admin alerts.                          |
| Analytics      | Vercel Analytics basic or Umami on Railway                                     | Privacy friendly, free-tier viable.                            |
| Forms Security | hCaptcha                                                                       | Protect contact/admin forms.                                   |
| Tooling        | pnpm, ESLint, Prettier, Husky, lint-staged, Commitlint, Vitest/RTL, Playwright | Enforce quality, automate testing.                             |

## 4. Project Phases & Branches

| Phase | Branch                       | Focus                                                                 |
| ----- | ---------------------------- | --------------------------------------------------------------------- |
| 00    | `phase/00-discovery`         | Content inventory, personas, data requirements, sitemap, inspiration. |
| 01    | `phase/01-foundation`        | Repo scaffold, tooling, base layout, shared UI primitives.            |
| 02    | `phase/02-activity-services` | Supabase schema, API integrations, scheduled sync, caching.           |
| 03    | `phase/03-core-ui`           | Production-ready pages, activity visualizations, testing.             |
| 04    | `phase/04-blog`              | MDX pipeline, feeds, content workflow docs.                           |
| 05    | `phase/05-admin`             | Admin dashboard, GitHub OAuth, CRUD forms, audit logs.                |
| 06    | `phase/06-launch`            | Contact flow, analytics, domain setup, QA, release checklist.         |

Each phase gets its own long-lived branch merged sequentially into `main`. Feature branches (`feature/phase-03-project-gallery`) sit atop the active phase branch. CI must pass before merges; PR reviews are mandatory.

## 5. Data Flow & Automation

1. **GitHub Activity**
   - Scheduled GitHub Action runs daily.
   - Fetches recent commits, pinned repos, language stats via REST API.
   - Stores normalized data + raw JSON in Supabase (`github_activity`).
   - `src/lib/github.ts` exposes typed helpers; UI consumes cached API route.

2. **LeetCode Progress**
   - Scheduled script authenticates using session cookie secret.
   - Retrieves streaks, solved counts by difficulty, recent problems.
   - Writes to Supabase tables (`leetcode_daily`, `leetcode_topics`).
   - Admin overrides logged in `activity_log` for manual corrections.

3. **Projects & Blog**
   - Projects managed via admin dashboard (Supabase) with status + metadata.
   - Blog posts authored in MDX (Contentlayer) inside repo; optional Supabase metadata to pin/feature.
   - Build-time static generation with ISR ensures fresh content on deploy.

4. **Contact Form**
   - Next.js route handler validates input (Zod), calls Resend, saves copy to Supabase.
   - hCaptcha token validated server-side prior to processing.
   - Admin dashboard shows submissions for follow-up.

## 6. Infrastructure Plan

- **Hosting**: Vercel Hobby linked to GitHub. Preview deployments for every PR; production on `main`.
- **Database**: Supabase free tier (monitor usage; upgrade to $25/mo if limits approached).
- **Domain**: Namecheap (.me or .tech) via GitHub Student Pack (free first year).
- **Secrets**: Managed in Vercel and Supabase dashboards; `.env.example` documents required values.
- **Monitoring**: Optional Healthchecks.io ping for cron jobs; rely on Vercel + Supabase dashboards for baseline metrics.
- **Backups**: Weekly Supabase backups and zipped export stored securely (manual or automated).

## 7. Quality Gates

- Automated checks: lint, type-check, unit/integration tests on every PR.
- Playwright end-to-end tests for public flow and admin operations.
- Accessibility audits (axe + manual) before launch.
- Performance budgets: hero payload < 200KB, time-to-interactive < 3s on mobile 4G.

## 8. Admin Experience

- GitHub OAuth login restricted via allowlist.
- Dashboard sections: Overview metrics, Projects CRUD, Activity Overrides, Blog Manager, Settings.
- Optimistic updates with TanStack Query + toasts.
- Audit log tracks user, timestamp, payload diff for each mutation.
- Manual refresh button triggers server action (rate-limited) to fetch latest activity.

## 9. Launch Checklist Highlights

- Contact form tested end-to-end (email + database).
- Custom domain live with HTTPS; DNS records verified.
- Sitemap, robots, structured data validated.
- Social preview images render correctly.
- Privacy notice and analytics opt-out documented.
- Release notes + social promo copy prepared.
- Post-launch monitoring and backlog captured.

## 10. Immediate Next Steps

1. Begin Phase 00 tasks using `docs/phase-00-discovery.md`.
2. Populate GitHub Project board with issues derived from phase checklists.
3. Collect API credentials (GitHub PAT, LeetCode cookie, Supabase keys).
4. Schedule design inspiration session prior to Phase 03.
5. Keep this document updated as decisions evolve—treat it as the project’s living handbook.

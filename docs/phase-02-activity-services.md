# Phase 02 - Activity Services & Data Layer

- **Branch**: `phase/02-activity-services`
- **Duration Target**: 4-5 sessions

## Goals

1. Stand up Supabase (Postgres + Row Level Security) to persist projects, GitHub metrics snapshots, and LeetCode stats.
2. Create backend services (Next.js Route Handlers or Server Actions) that normalize data for frontend consumption.
3. Automate data ingestion from GitHub REST API and LeetCode GraphQL endpoints.
4. Establish data models and migrations resilient to schema evolution.

## Key Tasks

- Provision Supabase project (free tier) and secure API credentials.
- Model tables: `projects`, `project_tags`, `github_activity`, `leetcode_daily`, `leetcode_topics`, `activity_log`.
- Configure RLS policies allowing read for anon key and write for service role or admin.
- Write migration scripts using `supabase db push` or Prisma (if chosen as ORM).
- Build GitHub fetcher (serverless function) retrieving recent commits and pinned repos using the GitHub API.
- Implement LeetCode fetcher leveraging the public GraphQL endpoint via cloud function (handle auth cookie securely).
- Store raw JSON responses for auditing and normalized records for UI consumption.
- Add caching layer (Upstash Redis free tier optional) or fall back to Supabase caching.
- Create GitHub Action scheduled workflow (`.github/workflows/activity-sync.yml`) running fetch scripts daily and writing to Supabase via service key.
- Document manual refresh command (`pnpm scripts:refresh-activity`).

## Deliverables

- Supabase SQL schema committed under `/supabase/migrations`.
- `src/lib/github.ts` and `src/lib/leetcode.ts` services with typed responses.
- Environment variables stored via Vercel and Supabase secrets manager instructions.
- Daily sync logs accessible within Supabase and via GitHub Actions run history.

## Dependencies

- Phase 01 tooling and environment scaffolding.
- Phase 00 decisions on metrics to collect.

## Acceptance Criteria

- Running the local sync script populates Supabase with at least the latest five commits, repository list, and a 30-day LeetCode streak summary.
- API routes (for example `/api/activity/github`, `/api/activity/leetcode`) respond within 500ms locally with cached data.
- GitHub Action completes successfully using repository secrets, even on sandbox credentials.
- RLS prevents anonymous writes while keeping read access open for the public site.

## Notes

- Consider Prisma for developer experience; alternatively use the Supabase client with generated types.
- For LeetCode auth, store the cookie as an encrypted secret and rotate monthly.
- Evaluate a fallback strategy if LeetCode blocks automation (manual admin override form).

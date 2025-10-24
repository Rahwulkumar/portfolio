# Phase 02 - Activity Services & Data Layer

- **Branch**: `phase/02-activity-services`
- **Duration Target**: 4-5 sessions

## Goals

1. Stand up Supabase (Postgres + Row Level Security) to persist projects, GitHub metrics snapshots, and LeetCode stats.
2. Create backend services (Next.js Route Handlers or Server Actions) that normalize data for frontend consumption.
3. Automate GitHub data ingestion and provide helpers for manual LeetCode logging.
4. Establish data models and migrations resilient to schema evolution.

## Key Tasks

- Provision Supabase project (free tier) and secure API credentials.
- Model tables: `projects`, `project_tags`, `github_activity`, `leetcode_daily`, `leetcode_topics`, `activity_log`.
- Configure RLS policies allowing read for anon key and write for service role or admin.
- Write migration scripts using `supabase db push` or Prisma (if chosen as ORM).
- Build GitHub fetcher (serverless function) retrieving recent commits and pinned repos using the GitHub API.
- Provide helper APIs for recording LeetCode daily progress manually (admin workflow).
- Store snapshots in Supabase for auditing and normalized records for UI consumption.
- Add caching layer (Upstash Redis free tier optional) or fall back to Supabase caching.
- Create GitHub Action scheduled workflow (`.github/workflows/activity-sync.yml`) running fetch scripts daily and writing to Supabase via service key.
- Document manual refresh command (`pnpm scripts:refresh-activity`).

## Deliverables

- Supabase SQL schema committed under `/supabase/migrations`.
- `src/lib/github.ts` automated ingester and `src/lib/leetcode.ts` manual entry helpers.
- Environment variables stored via Vercel and Supabase secrets manager instructions.
- Daily GitHub sync logs accessible within Supabase and via GitHub Actions run history.

## Dependencies

- Phase 01 tooling and environment scaffolding.
- Phase 00 decisions on metrics to collect.

## Acceptance Criteria

- Running the local sync script populates Supabase with the latest commits and aggregated GitHub metrics.
- API routes (for example `/api/activity/github`) respond within 500ms locally with cached data.
- Admin (or Supabase SQL editor) can enter LeetCode daily totals manually and see them reflected in the UI.
- GitHub Action completes successfully using repository secrets, even on sandbox credentials.
- RLS prevents anonymous writes while keeping read access open for the public site.

## Notes

- Consider Prisma for developer experience; alternatively use the Supabase client with generated types.
- Manual LeetCode entry can be captured through Supabase SQL editor today and automated via admin UI in Phase 05.
- Evaluate a caching strategy if GitHub API quotas become tight.

# Phase 05 - Admin Dashboard & Auth

- **Branch**: `phase/05-admin`
- **Duration Target**: 4-5 sessions

## Goals

1. Provide a secure admin portal to manage projects, override activity metrics, and curate homepage highlights.
2. Implement authentication and authorization using GitHub OAuth (via NextAuth) restricted to approved accounts.
3. Offer rich forms with validation, previews, and audit logging.

## Key Tasks

- Configure NextAuth with GitHub provider; restrict sign-in to an allowlist (environment variable).
- Add admin route group (`/admin`) with layout, sidebar navigation, and responsive design.
- Build CRUD forms for `Project` (title, description, status, repo link, tech tags, feature image).
- Add manual entry form for LeetCode daily streak override if automation fails (write to `activity_log` with a source flag).
- Display GitHub activity logs with the ability to flag anomalies or refresh on demand (trigger server action).
- Implement optimistic UI and toast notifications using React Query or TanStack Query for data fetching.
- Integrate Supabase Row Level Security to ensure admin writes use the service role (server-side) and clients only see sanitized data.
- Create audit log table storing user, action, timestamp, and payload diff.
- Add end-to-end tests (Playwright) covering sign-in flow and critical admin actions.
- Update documentation `/docs/admin-guide.md` covering deployment secrets, account provisioning, and recovery plan.

## Deliverables

- Authenticated admin dashboard with sections: Overview, Projects, Activity Overrides, Blog Manager (draft toggle), Settings.
- Server-side mutations using Next.js Server Actions or API routes with proper input validation (Zod).
- Email notification (optional) on critical admin actions via Resend (free tier 3k emails/month).
- Playwright specs stored under `tests/e2e`.

## Dependencies

- Data layer from Phase 02.
- UI components from Phase 03.
- Blog pipeline from Phase 04 (for blog management).

## Acceptance Criteria

- Unauthorized users are redirected to the public site with a friendly message.
- Admin forms validate required fields, enforce slug uniqueness, and support image upload to Supabase Storage.
- Audit log shows before and after snapshots for edits.
- Playwright tests pass locally and in CI.

## Notes

- Consider rate limiting admin-triggered refresh actions to avoid hitting API quotas.
- Review the security checklist: CSRF protection, session expiry, secure cookies, secret rotation.

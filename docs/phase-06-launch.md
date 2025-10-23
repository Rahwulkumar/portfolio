# Phase 06 - Integrations, QA & Launch

- **Branch**: `phase/06-launch`
- **Duration Target**: 3-4 sessions

## Goals

1. Finalize contact workflows, analytics, performance optimizations, and domain configuration.
2. Harden the application with testing, monitoring, and documentation.
3. Execute launch rollout with marketing checklist and post-launch observation plan.

## Key Tasks

- Implement contact form using a serverless function that dispatches email via Resend (free tier) and stores the message in Supabase for backup.
- Add hCaptcha (free) to the contact form to prevent spam.
- Integrate analytics (Vercel Analytics basic or self-hosted Umami on Railway free tier).
- Configure SEO essentials: sitemap.xml, robots.txt, structured data (JSON-LD), canonical tags.
- Set up OpenGraph and Twitter cards for all major pages.
- Conduct a full accessibility audit (axe-core, manual keyboard testing, color contrast).
- Run performance tuning: image optimization, code splitting, prefetch strategy, analyze bundle with `next-bundle-analyzer`.
- Configure deployment: Vercel project connected to GitHub, preview deployments for PRs, production on `main`.
- Set up custom domain via Namecheap free domain (GitHub Student Pack) and configure DNS + SSL via Vercel.
- Establish CI gates (tests and lint must pass before merge).
- Draft launch checklist and marketing assets (social post copy, changelog).
- Document maintenance schedule and future backlog (`/docs/backlog.md`).

## Deliverables

- Production-ready deployment on `https://<your-domain>` with HTTPS.
- Contact form storing submissions and sending confirmation email to admin.
- Analytics dashboard accessible, with privacy notice in the site footer.
- QA report (spreadsheet or markdown) covering cross-browser and device testing results.
- Post-launch retrospective template and monitoring plan (alerts via Vercel or email).

## Dependencies

- All prior phases complete and merged into `main`.

## Acceptance Criteria

- Lighthouse performance, accessibility, best practices, and SEO scores are each greater than or equal to 90 on the production URL.
- Contact submissions are verified end-to-end (test email received, database entry created).
- Custom domain is active with no mixed content issues.
- All documentation is up to date and stored under `/docs/`.

## Notes

- Keep free tier usage in check: Supabase free limits (500MB DB, 10GB bandwidth), Resend 3k emails/month, Vercel hobby plan (100GB bandwidth).
- Optional: set up Healthchecks.io (free tier) ping using a GitHub Action to run a daily synthetic check.

# Phase 04 - Blog & Content Pipeline

- **Branch**: `phase/04-blog`
- **Duration Target**: 3-4 sessions

## Goals

1. Enable long-form content publishing with MDX (preferred) or CMS integration while keeping admin editing flexibility.
2. Provide tagging, estimated read time, and social sharing metadata.
3. Integrate blog entries with homepage highlights and RSS or Atom feeds.

## Key Tasks

- Decide between file-based MDX stored in the repo vs. Supabase-backed rich text (recommend MDX + Git-based workflow with admin uploads to Supabase Storage if needed).
- Configure Contentlayer (or next-mdx-remote) to parse MDX with custom components (callouts, code blocks, timeline).
- Create `/blog` index with search and tag filters and `/blog/[slug]` detail page.
- Add related posts module using tag similarity or manual curation.
- Generate RSS feed (`/feeds/rss.xml`) and JSON Feed (`/feeds/feed.json`).
- Integrate social preview images (OG image generation via @vercel/og).
- Extend Supabase schema to track blog metadata in case admin wants to reorder or pin posts.
- Add `pnpm blog:new` script scaffolding a new MDX file with frontmatter template.
- Provide documentation for the content workflow in `/docs/content-workflow.md`.

## Deliverables

- Blog index and post detail pages with responsive typography and accessible table of contents.
- MDX component library (Alert, Callout, CodeBlock with syntax highlighting, Image with blur placeholder).
- Automated slug validation and build-time errors for missing metadata.
- RSS and JSON feeds validated via W3C feed validator.

## Dependencies

- Design tokens and layout from Phase 03.
- Admin requirements from Phase 05 (for optional editing).

## Acceptance Criteria

- New MDX article appears on `/blog` after commit or merge with no manual steps.
- Build fails if frontmatter is incomplete (title, description, date, tags, status).
- Social preview images render correctly when shared on Twitter or LinkedIn (preview via Vercel CLI).
- Documentation explains how to add drafts, schedule posts, and promote them to live.

## Notes

- Keep the initial feature set light; advanced CMS (Hashnode, Ghost) may be deferred to a future phase if needed.
- For multi-author support, extend the schema in a later iteration.

# Phase 00 - Discovery & Information Architecture

- **Branch**: `phase/00-discovery`
- **Duration Target**: 2-3 focused working sessions

## Goals

1. Capture the full content inventory (about, skills, resume highlights, project catalog, blog categories, contact preferences).
2. Document how GitHub activity and LeetCode progress should be represented on the site (metrics, refresh cadence, archival strategy).
3. Define user personas (hiring manager, collaborator, recruiter, friend) and user journeys to shape navigation and content priorities.
4. Finalize the sitemap, page hierarchy, and information architecture flows (desktop and mobile).
5. Collect design inspiration, mood boards, and component references to guide later visual decisions.

## Key Tasks

- Draft a content brief summarizing personal story, headlines, elevator pitch, and call-to-action copy.
- Inventory all active and past projects (status, repo URL, tech stack, press/demo links, impact metrics, planned updates).
- Decide on the minimum viable data set required for tracking daily LeetCode activity and GitHub commits.
- Choose preferred LeetCode username and any alternate accounts to track.
- Outline how blog posts will be authored (MDX in repo vs. CMS) and what metadata each post needs.
- Produce a sitemap diagram and navigation wireframe (even as a hand sketch captured as an image later).
- Compile a list of must-have integrations (contact form destinations, resume PDF, Calendly, socials).

## Deliverables

- `/docs/content-brief.md` (copy guidelines and elevator pitch).
- `/docs/sitemap-v1.drawio` or alternative schematic (can start as text bullets).
- `/docs/data-model-outline.md` describing entities: Project, CommitActivity, CodingSession, BlogPost, Highlight.
- Decision log capturing required automation touchpoints (GitHub, LeetCode, admin overrides).

## Dependencies

- None; this phase bootstraps the project vision.

## Acceptance Criteria

- Stakeholder sign-off on sitemap and prioritized sections.
- Agreement on which metrics will appear on the homepage vs. dedicated dashboards.
- Confirmed list of target devices and browsers for responsive support.
- Open questions documented and assigned to later phases.

## Notes

- Begin compiling references for color palettes and typography but defer final selection until Phase 03.
- Gather API credentials (GitHub personal access token, LeetCode session cookie approach) while requirements are fresh.

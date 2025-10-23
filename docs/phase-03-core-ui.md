# Phase 03 - Core Portfolio Experience

- **Branch**: `phase/03-core-ui`
- **Duration Target**: 4-6 sessions

## Goals

1. Translate the sitemap into polished responsive pages for Home, About, Skills, Projects, and Contact summary.
2. Surface live GitHub and LeetCode data via reusable components and charts.
3. Craft accessible, performant UI with consistent theming and micro-interactions.

## Key Tasks

- Establish design system tokens (colors, fonts, spacing) based on discoveries and select UI kit or shadcn components.
- Build hero section with typing or gradient accents highlighting active roles and call-to-action buttons.
- Implement skills matrix grouped by proficiency, tooling, and soft skills.
- Create project listing with filters (tags, status, year) and detail modals pulling data from Supabase.
- Develop GitHub activity component showing recent commits, pinned repos, and contribution streak summary.
- Develop LeetCode dashboard with streak counter, problems solved by difficulty, and recent problems carousel.
- Add testimonial or highlight banners if content is available.
- Ensure pages meet Lighthouse scores: Performance above 90 and Accessibility above 95 on desktop and mobile.
- Add loading skeletons and fallback states for data fetches.
- Write React Testing Library tests covering critical components and data formatting helpers.

## Deliverables

- Fully responsive layouts for `/`, `/about`, `/skills`, `/projects`, `/contact`.
- Reusable components: `ActivityTimeline`, `MetricCard`, `ProjectCard`, `TagFilter`, `StatGrid`.
- Charting solution (Recharts or lightweight alternative) for LeetCode stats with accessible SVGs.
- Snapshot tests capturing layout for key sections.
- Updated Storybook (optional) or at least MDX documentation for components in `/docs/components`.

## Dependencies

- Activity services returning data from Phase 02.
- Design cues and copy decisions from Phase 00.

## Acceptance Criteria

- Page content is fully driven by typed data models (no hard-coded sample data except placeholders).
- Mobile navigation and scroll interactions behave smoothly (tested on iOS and Android emulators).
- All interactive elements have keyboard support and accessible names.
- Vercel Preview deployment shows pages with SSR or ISR performing under 100ms TTFB.

## Notes

- Consider incremental static regeneration for landing sections with fallback to cached API routes.
- Keep hero animations subtle to preserve performance.

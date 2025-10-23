# Phase 01 - Project Foundation & Tooling

- **Branch**: `phase/01-foundation`
- **Duration Target**: 3-4 sessions

## Goals

1. Scaffold the repository with a modern, maintainable stack (Next.js 14 App Router + TypeScript).
2. Establish engineering standards (ESLint, Prettier, Husky, lint-staged, commitlint, GitHub branch protection).
3. Configure the base styling system (Tailwind CSS + shadcn/ui or Chakra fallback).
4. Create shared layout, SEO defaults, and design tokens to accelerate future phases.
5. Prepare environment configuration scaffolding for API keys and secret management.

## Key Tasks

- Initialize the repo with `main` as the protected default branch.
- Add issue and PR templates, CODEOWNERS, and project README.
- Install core dependencies: Next.js 14, React 18, Tailwind CSS, shadcn/ui, clsx, lucide-react, date-fns.
- Configure TypeScript strict mode, path aliases, and absolute imports.
- Set up ESLint (next/core-web-vitals + custom rules) and Prettier with `.prettierrc`.
- Add Husky pre-commit hook running `pnpm lint` and `pnpm test -- --watch=false` (set up pnpm workspace).
- Configure basic CI workflow (`.github/workflows/ci.yml`) running lint and type-check on PRs.
- Implement base `<Layout>` with header, footer, responsive navigation placeholder, and dark mode toggle.
- Add SEO helper (next-seo or custom metadata) for default meta description and Open Graph data.
- Document local dev setup in `/docs/setup.md`.

## Deliverables

- Running Next.js app with placeholder pages for `/`, `/about`, `/projects`, `/blog`, `/contact`.
- Shared UI folder with button, card, badge, and typography components.
- Tailwind config with theme tokens (colors, spacing, fonts) referencing the design direction to be determined.
- Example `.env.example` listing required secrets (GitHub PAT, Supabase keys, LeetCode session token placeholder, Resend API key).
- Updated README with install, dev, lint/test instructions.

## Dependencies

- Output from Phase 00 guides navigation and required pages.

## Acceptance Criteria

- `pnpm lint`, `pnpm test`, and `pnpm build` pass locally and in CI.
- Base layout matches sitemap structure and is accessible (landmark roles, keyboard navigation).
- Dark/light theme switch is functional with system preference detection.
- Documentation exists so another developer can clone and run the project in under ten minutes.

## Notes

- Prefer `pnpm` for faster installs; fall back to `npm` if environment constraints appear.
- Defer final typography and color token decisions until Phase 03 but leave hooks ready.

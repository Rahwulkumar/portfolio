import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="grid gap-6 lg:grid-cols-[3fr_2fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm tracking-[0.35em] text-slate-500 uppercase dark:text-slate-400">
            Rahul Kumar · Full-stack Engineer
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Building data-rich experiences that track impact every single day.
          </h1>
          <p className="max-w-xl text-lg text-slate-600 dark:text-slate-300">
            This evolving portfolio will surface live GitHub activity, LeetCode streaks, and project
            milestones to show how I learn, ship, and grow. Phase 01 lays the foundation—follow
            along as we layer in data and polish.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/projects">View projects</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Let&apos;s collaborate</Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Upcoming highlights</p>
            <Badge variant="subtle">Roadmap Sneak Peek</Badge>
          </div>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li>• Live GitHub commit feed with streak insights</li>
            <li>• Daily LeetCode dashboard with topic coverage</li>
            <li>• Admin workspace for project and blog management</li>
          </ul>
          <p className="text-xs tracking-wide text-slate-400 uppercase">
            Currently in Phase 01 – Foundation
          </p>
        </div>
      </section>
      <section className="grid gap-6 sm:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Engineering principles
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Quality gates (lint, tests, type safety) and a clear Git branching strategy keep every
            phase shippable. The stack is opinionated but pragmatic: Next.js App Router, Tailwind,
            Supabase, and automation via GitHub Actions.
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            What&apos;s coming next
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Phase 02 will wire real-time data services, Phase 03 delivers the core UI, and Phase
            04–06 round out content, admin tools, and launch polish. Every milestone will be
            documented in the roadmap and learning log.
          </p>
        </article>
      </section>
    </div>
  );
}

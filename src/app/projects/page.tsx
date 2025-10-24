import { Suspense } from "react";

import { ProjectsGrid } from "@/components/projects-grid";
import { Badge } from "@/components/ui/badge";
import { loadProjects } from "@/lib/data";

export default async function ProjectsPage() {
  const projects = await loadProjects();

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <Badge
          variant="subtle"
          className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        >
          Projects
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          Work that focuses on measurable outcomes.
        </h1>
        <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-300">
          Ship fast, keep quality high, and measure impact. Many of these builds involved migrations
          from legacy stacks, creating automation pipelines, or designing systems that enable teams
          to iterate confidently.
        </p>
      </section>

      <Suspense
        fallback={<p className="text-sm text-slate-500 dark:text-slate-400">Loading projects…</p>}
      >
        <ProjectsGrid projects={projects.items} />
      </Suspense>
      {projects.isFallback ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
          Supabase wasn&apos;t reachable, so you&apos;re seeing sample project data. Once your
          database is seeded the dashboard will reflect it automatically.
        </p>
      ) : null}
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects · Rahul Kumar",
  description: "Showcase of active and archived projects with impact metrics.",
};

export default function ProjectsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Projects</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Each project card will be hydrated from Supabase with status, tech stack, metrics, and
          links. Until Phase 02 lands, this section reminds visitors what to expect.
        </p>
      </header>
      <div className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
        <p>
          Placeholder content: project grid with filters (status, year, tech) will appear here.
          Admin overrides will ensure case studies stay fresh.
        </p>
      </div>
    </section>
  );
}

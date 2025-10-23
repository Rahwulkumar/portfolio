import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About · Rahul Kumar",
  description: "Snapshot of Rahul Kumar's background, skills, and mission.",
};

export default function AboutPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">About</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Detailed biography, skills matrix, and career timeline will live here. Phase 01 keeps the
          structure ready while the content brief is assembled.
        </p>
      </header>
      <div className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
        <p>
          Coming soon: skill highlights, certifications, speaking appearances, and personal
          story—pulled directly from the discovery artifacts in `docs/content-brief.md`.
        </p>
      </div>
    </section>
  );
}

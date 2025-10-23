import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog · Rahul Kumar",
  description: "Long-form writing, changelogs, and technical deep dives.",
};

export default function BlogPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Blog</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Future MDX posts will chronicle build decisions, architecture lessons, and release notes.
          For now, use this area to outline topics you plan to cover.
        </p>
      </header>
      <div className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
        <p>
          Coming soon: searchable blog index, tags, reading time estimates, and dynamic social
          previews.
        </p>
      </div>
    </section>
  );
}

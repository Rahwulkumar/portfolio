import { StatGrid } from "@/components/stat-grid";
import { Badge } from "@/components/ui/badge";

const principles = [
  {
    title: "Ship with confidence",
    description:
      "From static sites to complex dashboards, I focus on observability early—feature flags, logging, and meaningful metrics—so new releases never feel risky.",
  },
  {
    title: "Build for humans",
    description:
      "Design systems and content architecture matter as much as code. I partner with designers, PMs, and stakeholders to keep UX approachable and accessible.",
  },
  {
    title: "Keep learning visible",
    description:
      "Daily practice, public changelogs, and strong docs. This portfolio itself is the living log of that process.",
  },
];

const stats = [
  {
    label: "Years shipping web products",
    value: "7",
    description: "From early prototypes to enterprise portals.",
  },
  {
    label: "Mentored engineers",
    value: "15+",
    description: "Helping teammates up-skill in TypeScript, testing, and CI/CD.",
  },
  {
    label: "Changelogs published",
    value: "40+",
    description: "I document decisions so teams always know why things changed.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <Badge
          variant="subtle"
          className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        >
          About
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          Building reliable products, one iteration at a time.
        </h1>
        <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-300">
          I love bringing ideas to life. Whether the project needs a greenfield stack or careful
          modernization, my goal is to make progress visible—writing changelogs, documenting design
          decisions, and building tooling that keeps teams fast.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Principles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Today&rsquo;s focus
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          I&rsquo;m currently working on a portfolio platform that surfaces activity metrics
          automatically, makes manual updates painless, and provides transparent context for anyone
          interested in collaborating.
        </p>
        <StatGrid stats={stats} columns={3} />
      </section>
    </div>
  );
}

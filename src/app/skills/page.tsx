import { Rocket, ShieldCheck, Sparkles } from "lucide-react";

import { StatGrid } from "@/components/stat-grid";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const skillGroups = [
  {
    title: "Core engineering",
    description: "Architecture, performance, and developer experience guardrails.",
    items: [
      "TypeScript",
      "Node.js",
      "Next.js (App Router)",
      "Supabase",
      "Postgres",
      "REST/GraphQL",
    ],
  },
  {
    title: "UI & UX",
    description: "Design systems that stay flexible and accessible.",
    items: [
      "Tailwind CSS",
      "shadcn/ui",
      "Radix primitives",
      "Accessibility testing",
      "Design tokens",
    ],
  },
  {
    title: "Operations & tooling",
    description: "Keep releases safe with automation and observability.",
    items: ["GitHub Actions", "pnpm", "Husky/lint-staged", "Playwright", "Vitest/RTL", "Sentry"],
  },
];

const experienceStats = [
  {
    label: "Production launches",
    value: "12+",
    description: "End-to-end releases shipped across web platforms.",
    icon: <Rocket className="h-4 w-4" aria-hidden />,
  },
  {
    label: "Audit score",
    value: "95+",
    description: "Accessibility and performance targets across devices.",
    icon: <ShieldCheck className="h-4 w-4" aria-hidden />,
  },
  {
    label: "Core stack years",
    value: "6",
    description: "TypeScript-first full-stack experience.",
    icon: <Sparkles className="h-4 w-4" aria-hidden />,
  },
];

export default function SkillsPage() {
  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <Badge
          variant="subtle"
          className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        >
          Skills & toolbox
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          Delivering quality from vision to deployment.
        </h1>
        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          My approach is pragmatic: build design systems that keep teams fast, wire automation that
          prevents regressions, and keep telemetry close so we can celebrate progress with data.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Strength snapshot
        </h2>
        <StatGrid stats={experienceStats} />
      </section>

      <section className="space-y-10">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {group.title}
              </h3>
              <p className="max-w-xl text-sm text-slate-500 dark:text-slate-400">
                {group.description}
              </p>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300",
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

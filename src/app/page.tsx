import { Flame, GitCommit, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";

import { ActivityTimeline } from "@/components/activity-timeline";
import { MetricCard } from "@/components/metric-card";
import { MiniBarChart } from "@/components/mini-bar-chart";
import { ProjectCard } from "@/components/project-card";
import { StatGrid } from "@/components/stat-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  loadGitHubActivity,
  loadGitHubDailyMetrics,
  loadLeetCodeDaily,
  loadLeetCodeTopics,
  loadProjects,
} from "@/lib/data";

export default async function Home() {
  const [projects, commits, metrics, leetDaily, leetTopics] = await Promise.all([
    loadProjects(),
    loadGitHubActivity(),
    loadGitHubDailyMetrics(),
    loadLeetCodeDaily(),
    loadLeetCodeTopics(),
  ]);

  const featuredProjects = projects.items.filter((project) => project.featured).slice(0, 2);
  const totalCommits = metrics.items.reduce((sum, metric) => sum + metric.commits, 0);
  const activeRepos = metrics.items
    .flatMap((metric) => (Array.isArray(metric.repositories) ? metric.repositories : []))
    .filter((value, index, array) => array.indexOf(value) === index);
  const latestLeetCode = leetDaily.items[0] ?? null;

  const leetCodeStats =
    latestLeetCode !== null
      ? [
          {
            label: "Total solved",
            value: latestLeetCode.total_solved,
            description: "Covering easy, medium, and hard problems.",
          },
          {
            label: "Current streak",
            value: latestLeetCode.current_streak,
            description: `Longest streak ${latestLeetCode.longest_streak} days.`,
          },
          {
            label: "Hard problems",
            value: latestLeetCode.hard_solved,
            description: "Staying uncomfortable keeps the learning curve steep.",
          },
        ]
      : [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-16 text-white shadow-xl dark:border-slate-700">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-sky-500 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-rose-500 blur-3xl" />
        </div>
        <div className="relative grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.35em] text-sky-200 uppercase">
              <Sparkles className="h-4 w-4" aria-hidden />
              Rahul Kumar - Full-stack Engineer
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Engineering data-rich experiences that speak for the work.
            </h1>
            <p className="max-w-2xl text-lg text-slate-200">
              Every commit, solved problem, and release tells a story. This portfolio brings those
              signals together so collaborators can quickly understand how I build, learn, and
              iterate.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/projects">Browse projects</Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">Let&apos;s collaborate</Link>
              </Button>
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center gap-3">
              <p className="font-semibold tracking-wide text-slate-100">Current snapshot</p>
              <Badge variant="subtle" className="bg-white/20 text-white">
                Live telemetry
              </Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <MetricCard
                label="Commits this sprint"
                value={totalCommits}
                helper={`${activeRepos.length} active repos`}
                icon={<GitCommit className="h-4 w-4" aria-hidden />}
                tone="accent"
              />
              <MetricCard
                label="Problem solving streak"
                value={latestLeetCode?.current_streak ?? 0}
                helper={`Longest ${latestLeetCode?.longest_streak ?? 0} days`}
                icon={<Flame className="h-4 w-4" aria-hidden />}
                tone="success"
              />
              <MetricCard
                label="Next milestone"
                value="Phase 04"
                helper="Blog pipeline + content workflow"
                icon={<Rocket className="h-4 w-4" aria-hidden />}
              />
            </div>
            <p className="text-xs text-slate-200/80">
              GitHub metrics update automatically. LeetCode stats are curated manually until the
              admin dashboard ships.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_3fr]">
        <ActivityTimeline items={commits.items} fallback={commits.isFallback} />
        <div className="space-y-5">
          <StatGrid stats={leetCodeStats} columns={3} />
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <MiniBarChart data={leetDaily.items} />
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Recent problems explored
              </h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {leetTopics.items.map((topic) => (
                  <div
                    key={`${topic.activity_date}-${topic.problem_slug}`}
                    className="rounded-xl border border-slate-100 px-4 py-3 dark:border-slate-800"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {topic.title}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs tracking-wide text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-300">
                        {topic.difficulty ?? "Practice"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Solved on{" "}
                      {new Date(topic.submitted_at ?? topic.activity_date).toLocaleDateString(
                        undefined,
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                ))}
              </div>
              {leetTopics.isFallback ? (
                <p className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  Add LeetCode highlights via Supabase or the upcoming admin dashboard to replace
                  this sample data.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Featured projects
          </h2>
          <Button variant="outline" asChild>
            <Link href="/projects">View all projects</Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} emphasize />
          ))}
        </div>
        {projects.isFallback ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
            Supabase wasn&apos;t reachable, so you&apos;re seeing sample project data. Once your
            database is seeded the dashboard will reflect it automatically.
          </p>
        ) : null}
      </section>
    </div>
  );
}

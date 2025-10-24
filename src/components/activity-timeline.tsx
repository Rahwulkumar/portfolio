import { CalendarDays } from "lucide-react";
import React from "react";

import type { GithubActivityRow } from "@/lib/github";
import { cn } from "@/lib/utils";

function formatDate(date: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

function compactSha(sha: string) {
  return sha.slice(0, 7);
}

export interface ActivityTimelineProps {
  items: GithubActivityRow[];
  fallback?: boolean;
}

export function ActivityTimeline({ items, fallback = false }: ActivityTimelineProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900",
        fallback && "ring-1 ring-slate-300 dark:ring-slate-700",
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Recent GitHub activity
        </h2>
        <CalendarDays className="h-5 w-5 text-slate-400 dark:text-slate-500" aria-hidden />
      </div>
      <ol className="space-y-5">
        {items.slice(0, 10).map((item) => (
          <li
            key={item.commit_sha}
            className="relative pl-6 text-sm text-slate-600 dark:text-slate-300"
          >
            <span className="absolute top-1 left-0 h-3 w-3 rounded-full border-2 border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="font-medium text-slate-900 dark:text-slate-100">
                {item.message ?? "Commit"}
              </div>
              <span className="text-xs tracking-wide text-slate-400 uppercase dark:text-slate-500">
                {formatDate(item.committed_at)}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="rounded bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
                {item.repo_name}
              </span>
              <a
                className="font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                href={item.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {compactSha(item.commit_sha)}
              </a>
              {typeof item.additions === "number" && typeof item.deletions === "number" ? (
                <span>
                  +{item.additions} / -{item.deletions}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      {fallback ? (
        <p className="mt-5 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          Unable to reach Supabase. Showing sample commits so the layout remains informative.
        </p>
      ) : null}
    </div>
  );
}

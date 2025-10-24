import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface Stat {
  label: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
}

interface StatGridProps {
  stats: Stat[];
  columns?: 2 | 3 | 4;
}

export function StatGrid({ stats, columns = 3 }: StatGridProps) {
  const gridClass =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      className={cn(
        "grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900",
        gridClass,
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col gap-1 rounded-xl border border-slate-100 p-4 dark:border-slate-800"
        >
          <span className="text-xs tracking-wide text-slate-400 uppercase dark:text-slate-500">
            {stat.label}
          </span>
          <div className="flex items-baseline gap-2">
            {stat.icon ? (
              <span className="text-slate-400 dark:text-slate-500">{stat.icon}</span>
            ) : null}
            <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {stat.value}
            </span>
          </div>
          {stat.description ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">{stat.description}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

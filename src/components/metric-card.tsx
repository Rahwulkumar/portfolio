"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface MetricCardProps {
  label: string;
  value: string | number;
  helper?: string;
  icon?: ReactNode;
  tone?: "default" | "success" | "accent";
}

const toneStyles: Record<
  NonNullable<MetricCardProps["tone"]>,
  { container: string; badge: string }
> = {
  default: {
    container: "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
    badge: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  },
  success: {
    container:
      "border-emerald-200/70 bg-emerald-50 dark:border-emerald-900/60 dark:bg-emerald-950/40",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200",
  },
  accent: {
    container: "border-sky-200/60 bg-sky-50 dark:border-sky-900/60 dark:bg-sky-950/40",
    badge: "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200",
  },
};

export function MetricCard({ label, value, helper, icon, tone = "default" }: MetricCardProps) {
  const toneClass = toneStyles[tone];

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between rounded-2xl border p-5 shadow-sm transition-transform duration-200 focus-within:-translate-y-1 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none dark:focus-visible:ring-slate-600",
        toneClass.container,
      )}
      tabIndex={0}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
            toneClass.badge,
          )}
        >
          {icon}
          {label}
        </span>
      </div>
      <div className="mt-6 text-3xl font-semibold text-slate-900 dark:text-slate-100">{value}</div>
      {helper ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{helper}</p> : null}
    </div>
  );
}

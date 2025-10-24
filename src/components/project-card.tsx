import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import React from "react";

import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  emphasize?: boolean;
}

export function ProjectCard({ project, emphasize = false }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700",
        emphasize &&
          "ring-1 ring-slate-200 ring-offset-2 dark:ring-slate-700 dark:ring-offset-slate-950",
      )}
    >
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{project.name}</h3>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium tracking-wide uppercase",
            project.status === "active"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200"
              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
          )}
        >
          {project.status}
        </span>
      </div>
      {project.summary ? (
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{project.summary}</p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3 text-sm">
        {project.repoUrl ? (
          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-slate-100"
          >
            <Github className="h-4 w-4" aria-hidden />
            Repository
          </Link>
        ) : null}
        {project.liveUrl ? (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            Live demo
          </Link>
        ) : null}
      </div>
    </article>
  );
}

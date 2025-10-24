"use client";

import React, { useMemo, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import { TagFilter } from "@/components/tag-filter";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/data";

const statuses: Array<"all" | Project["status"]> = [
  "all",
  "active",
  "planned",
  "paused",
  "archived",
];

export interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<"all" | Project["status"]>("all");

  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((project) => project.tags.forEach((tag) => set.add(tag)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTag = activeTag ? project.tags.includes(activeTag) : true;
      const matchesStatus = activeStatus === "all" ? true : project.status === activeStatus;
      return matchesTag && matchesStatus;
    });
  }, [projects, activeTag, activeStatus]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-2">
          <span className="text-xs tracking-wide text-slate-400 uppercase dark:text-slate-500">
            Filter by tag
          </span>
          <TagFilter tags={tags} onToggle={setActiveTag} />
        </div>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => {
            const label =
              status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1);
            return (
              <Button
                key={status}
                type="button"
                size="sm"
                variant={activeStatus === status ? "default" : "outline"}
                onClick={() => setActiveStatus(status)}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} emphasize={project.featured} />
        ))}
      </div>
      {filteredProjects.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No projects match that filter yet. Try clearing a tag or status.
        </p>
      ) : null}
    </div>
  );
}

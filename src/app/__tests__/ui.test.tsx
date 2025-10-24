import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { ActivityTimeline } from "@/components/activity-timeline";
import { ProjectsGrid } from "@/components/projects-grid";
import type { Project } from "@/lib/data";
import type { GithubActivityRow } from "@/lib/github";

describe("ActivityTimeline", () => {
  const commits: GithubActivityRow[] = [
    {
      id: 1,
      repo_name: "demo/repo",
      commit_sha: "abcdef123456",
      message: "Initial commit",
      committed_at: new Date("2024-01-15T12:00:00Z").toISOString(),
      author: "Rahul",
      url: "https://example.com",
      additions: 5,
      deletions: 2,
      inserted_at: new Date().toISOString(),
    },
  ];

  it("renders commit info", () => {
    render(<ActivityTimeline items={commits} />);
    expect(screen.getAllByText(/Initial commit/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/demo\/repo/i).length).toBeGreaterThan(0);
  });

  it("shows fallback note when flagged", () => {
    render(<ActivityTimeline items={commits} fallback />);
    expect(screen.getByText(/sample commits/i)).toBeInTheDocument();
  });
});

describe("ProjectsGrid", () => {
  const projects: Project[] = [
    {
      id: "1",
      name: "Automation",
      slug: "automation",
      summary: "GitHub + Supabase sync",
      status: "active",
      repoUrl: null,
      liveUrl: null,
      featured: true,
      tags: ["supabase", "automation"],
    },
    {
      id: "2",
      name: "UI overhaul",
      slug: "ui-overhaul",
      summary: "Tailwind redesign",
      status: "planned",
      repoUrl: null,
      liveUrl: null,
      featured: false,
      tags: ["design", "tailwind"],
    },
  ];

  it("filters projects by tag", () => {
    render(<ProjectsGrid projects={projects} />);

    expect(screen.getAllByText(/Automation/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/UI overhaul/i).length).toBeGreaterThan(0);

    const tailwindButton = screen.getByRole("button", { name: /tailwind/i });
    fireEvent.click(tailwindButton);

    expect(screen.queryByRole("heading", { name: /Automation/i })).not.toBeInTheDocument();
    expect(screen.getAllByText(/UI overhaul/i).length).toBeGreaterThan(0);
  });
});

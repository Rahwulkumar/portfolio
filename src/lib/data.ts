import type { GithubActivityRow, GithubDailyMetricsRow } from "@/lib/github";
import type { LeetCodeDailyRow, LeetCodeTopicRow } from "@/lib/leetcode";
import { getSupabaseClient } from "@/lib/supabase";
import type { Database, Json } from "@/types/database";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"] & {
  project_tags?: { tag: string }[];
};

export type Project = {
  id: string;
  name: string;
  slug: string;
  summary: string | null;
  status: ProjectRow["status"];
  repoUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  tags: string[];
};

type WithFallback<T> = {
  items: T[];
  isFallback: boolean;
};

const fallbackProjects: Project[] = [
  {
    id: "fallback-1",
    name: "Activity Services Blueprint",
    slug: "activity-services-blueprint",
    summary:
      "Supabase-powered pipeline that aggregates GitHub commits and captures daily LeetCode progress.",
    status: "active",
    repoUrl: "https://github.com/Rahwulkumar/portfolio",
    liveUrl: null,
    featured: true,
    tags: ["supabase", "automation", "typescript"],
  },
  {
    id: "fallback-2",
    name: "UI Foundation",
    slug: "ui-foundation",
    summary: "Responsive Next.js layout with Tailwind tokens, dark mode, and component primitives.",
    status: "active",
    repoUrl: "https://github.com/Rahwulkumar/portfolio",
    liveUrl: null,
    featured: false,
    tags: ["next.js", "tailwind"],
  },
];

const fallbackCommits: GithubActivityRow[] = [
  {
    id: 0,
    repo_name: "Rahwulkumar/portfolio",
    commit_sha: "fallback-sha",
    message: "Set up Supabase sync scaffolding",
    committed_at: new Date().toISOString(),
    author: "Rahul Kumar",
    url: "https://github.com/Rahwulkumar/portfolio",
    additions: 0,
    deletions: 0,
    inserted_at: new Date().toISOString(),
  },
];

const fallbackDailyMetrics: GithubDailyMetricsRow[] = [
  {
    activity_date: new Date().toISOString().slice(0, 10),
    commits: 3,
    additions: 120,
    deletions: 15,
    repositories: ["Rahwulkumar/portfolio"] as unknown as Json,
    refreshed_at: new Date().toISOString(),
  },
];

const fallbackLeetCodeDaily: LeetCodeDailyRow[] = [
  {
    id: 0,
    activity_date: new Date().toISOString().slice(0, 10),
    total_solved: 210,
    easy_solved: 120,
    medium_solved: 70,
    hard_solved: 20,
    current_streak: 12,
    longest_streak: 28,
    refreshed_at: new Date().toISOString(),
  },
];

const fallbackLeetCodeTopics: LeetCodeTopicRow[] = [
  {
    id: 0,
    activity_date: new Date().toISOString().slice(0, 10),
    problem_slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    url: "https://leetcode.com/problems/two-sum/",
    tags: ["array", "hash-table"],
    submitted_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
];

function withFallback<T>(loader: () => Promise<T[]>, fallback: T[]): Promise<WithFallback<T>> {
  return loader()
    .then((items) => ({
      items: items.length ? items : fallback,
      isFallback: !items.length,
    }))
    .catch(() => ({ items: fallback, isFallback: true }));
}

export async function loadProjects(): Promise<WithFallback<Project>> {
  return withFallback(async () => {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from("projects")
      .select("*, project_tags(tag)")
      .order("updated_at", { ascending: false });
    if (error || !data) {
      throw error ?? new Error("Unable to fetch projects");
    }
    return data.map((project) => ({
      id: project.id,
      name: project.name,
      slug: project.slug,
      summary: project.summary,
      status: project.status,
      repoUrl: project.repo_url,
      liveUrl: project.live_url,
      featured: project.featured,
      tags: project.project_tags?.map((tag) => tag.tag) ?? [],
    }));
  }, fallbackProjects);
}

export function loadGitHubActivity(limit = 5): Promise<WithFallback<GithubActivityRow>> {
  return withFallback(async () => {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from("github_activity")
      .select("*")
      .order("committed_at", { ascending: false })
      .limit(limit);
    if (error || !data) {
      throw error ?? new Error("Unable to fetch github activity");
    }
    return data;
  }, fallbackCommits);
}

export function loadGitHubDailyMetrics(limit = 14): Promise<WithFallback<GithubDailyMetricsRow>> {
  return withFallback(async () => {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from("github_daily_metrics")
      .select("*")
      .order("activity_date", { ascending: false })
      .limit(limit);
    if (error || !data) {
      throw error ?? new Error("Unable to fetch github metrics");
    }
    return data;
  }, fallbackDailyMetrics);
}

export function loadLeetCodeDaily(limit = 14): Promise<WithFallback<LeetCodeDailyRow>> {
  return withFallback(async () => {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from("leetcode_daily")
      .select("*")
      .order("activity_date", { ascending: false })
      .limit(limit);
    if (error || !data) {
      throw error ?? new Error("Unable to fetch leetcode daily");
    }
    return data;
  }, fallbackLeetCodeDaily);
}

export function loadLeetCodeTopics(limit = 5): Promise<WithFallback<LeetCodeTopicRow>> {
  return withFallback(async () => {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from("leetcode_topics")
      .select("*")
      .order("submitted_at", { ascending: false })
      .limit(limit);
    if (error || !data) {
      throw error ?? new Error("Unable to fetch leetcode topics");
    }
    return data;
  }, fallbackLeetCodeTopics);
}

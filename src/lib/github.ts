import { getSupabaseClient, getSupabaseServiceRoleClient } from "@/lib/supabase";
import type { Database } from "@/types/database";

const GITHUB_TOKEN = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

function ensureGitHubEnv() {
  if (!GITHUB_TOKEN) {
    throw new Error("Missing GITHUB_PERSONAL_ACCESS_TOKEN env variable.");
  }
  if (!GITHUB_USERNAME) {
    throw new Error("Missing GITHUB_USERNAME env variable.");
  }
}

interface PushCommit {
  repoName: string;
  commitSha: string;
  message: string | null;
  committedAt: string;
  author: string | null;
  url: string | null;
}

interface DailyMetrics {
  activity_date: string;
  commits: number;
  additions: number;
  deletions: number;
  repositories: string[];
}

export type GithubActivityRow = Database["public"]["Tables"]["github_activity"]["Row"];
export type GithubDailyMetricsRow = Database["public"]["Tables"]["github_daily_metrics"]["Row"];
export type GithubActivityInsert = Database["public"]["Tables"]["github_activity"]["Insert"];
export type GithubDailyMetricsInsert =
  Database["public"]["Tables"]["github_daily_metrics"]["Insert"];

async function fetchGitHubEvents(perPage = 30) {
  ensureGitHubEnv();
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=${perPage}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "User-Agent": "portfolio-sync-script",
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${body}`);
  }

  return response.json();
}

export async function fetchRecentCommits(perPage = 50): Promise<PushCommit[]> {
  const events = await fetchGitHubEvents(perPage);

  const commits: PushCommit[] = [];
  for (const event of events) {
    if (event.type !== "PushEvent" || !event.payload?.commits) continue;
    const repoName: string = event.repo?.name ?? "unknown";
    for (const commit of event.payload.commits) {
      commits.push({
        repoName,
        commitSha: commit.sha,
        message: commit.message ?? null,
        committedAt: event.created_at,
        author: commit.author?.name ?? null,
        url: commit.url ?? null,
      });
    }
  }

  return commits;
}

function aggregateDaily(commits: PushCommit[]): DailyMetrics[] {
  const map = new Map<string, DailyMetrics>();

  for (const commit of commits) {
    const dateKey = commit.committedAt.slice(0, 10);
    const existing = map.get(dateKey) ?? {
      activity_date: dateKey,
      commits: 0,
      additions: 0,
      deletions: 0,
      repositories: [],
    };
    existing.commits += 1;
    if (!existing.repositories.includes(commit.repoName)) {
      existing.repositories.push(commit.repoName);
    }
    map.set(dateKey, existing);
  }

  return Array.from(map.values());
}

export async function syncGitHubActivity(): Promise<void> {
  const commits = await fetchRecentCommits();
  if (!commits.length) return;

  const client = getSupabaseServiceRoleClient();

  const insertPayload: GithubActivityInsert[] = commits.map((commit) => ({
    repo_name: commit.repoName,
    commit_sha: commit.commitSha,
    message: commit.message,
    committed_at: commit.committedAt,
    author: commit.author,
    url: commit.url,
  }));

  const { error: commitError } = await client
    .from("github_activity")
    .upsert(insertPayload, { onConflict: "commit_sha" });
  if (commitError) {
    throw new Error(`Failed to upsert github_activity: ${commitError.message}`);
  }

  const dailyMetrics: GithubDailyMetricsInsert[] = aggregateDaily(commits).map((metric) => ({
    activity_date: metric.activity_date,
    commits: metric.commits,
    additions: metric.additions,
    deletions: metric.deletions,
    repositories: metric.repositories,
    refreshed_at: new Date().toISOString(),
  }));

  const { error: metricsError } = await client
    .from("github_daily_metrics")
    .upsert(dailyMetrics, { onConflict: "activity_date" });

  if (metricsError) {
    throw new Error(`Failed to upsert github_daily_metrics: ${metricsError.message}`);
  }
}

export async function listRecentCommits(limit = 20) {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("github_activity")
    .select("*")
    .order("committed_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to load github_activity: ${error.message}`);
  }

  return data ?? [];
}

export async function listGitHubDailyMetrics(limit = 14) {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("github_daily_metrics")
    .select("*")
    .order("activity_date", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to load github_daily_metrics: ${error.message}`);
  }

  return data ?? [];
}

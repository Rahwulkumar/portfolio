import { getSupabaseClient, getSupabaseServiceRoleClient } from "@/lib/supabase";
import type { Database } from "@/types/database";

export type LeetCodeDailyRow = Database["public"]["Tables"]["leetcode_daily"]["Row"];
export type LeetCodeTopicRow = Database["public"]["Tables"]["leetcode_topics"]["Row"];
export type LeetCodeDailyInsert = Database["public"]["Tables"]["leetcode_daily"]["Insert"];
export type LeetCodeTopicInsert = Database["public"]["Tables"]["leetcode_topics"]["Insert"];

export async function saveLeetCodeDailyEntry(entry: LeetCodeDailyInsert) {
  const client = getSupabaseServiceRoleClient();
  const { error } = await client.from("leetcode_daily").upsert([entry], {
    onConflict: "activity_date",
  });
  if (error) {
    throw new Error(`Failed to upsert leetcode_daily: ${error.message}`);
  }
}

export async function saveLeetCodeTopics(entries: LeetCodeTopicInsert[]) {
  if (!entries.length) return;
  const client = getSupabaseServiceRoleClient();
  const { error } = await client.from("leetcode_topics").upsert(entries, {
    onConflict: "activity_date,problem_slug",
  });
  if (error) {
    throw new Error(`Failed to upsert leetcode_topics: ${error.message}`);
  }
}

export async function getLeetCodeDaily(limit = 30) {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("leetcode_daily")
    .select("*")
    .order("activity_date", { ascending: false })
    .limit(limit);
  if (error) {
    throw new Error(`Failed to load leetcode_daily: ${error.message}`);
  }
  return data ?? [];
}

export async function getRecentLeetCodeTopics(limit = 20) {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("leetcode_topics")
    .select("*")
    .order("submitted_at", { ascending: false })
    .limit(limit);
  if (error) {
    throw new Error(`Failed to load leetcode_topics: ${error.message}`);
  }
  return data ?? [];
}

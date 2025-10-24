import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

type PublicClient = SupabaseClient<Database>;

let supabaseClient: PublicClient | null = null;
let supabaseServiceClient: PublicClient | null = null;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function assertEnvValue(value: string | undefined, key: string) {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

export function getSupabaseClient(): PublicClient {
  if (!supabaseClient) {
    assertEnvValue(supabaseUrl, "SUPABASE_URL");
    assertEnvValue(supabaseAnonKey, "SUPABASE_ANON_KEY");

    supabaseClient = createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: false,
      },
    });
  }

  return supabaseClient;
}

export function getSupabaseServiceRoleClient(): PublicClient {
  if (!supabaseServiceClient) {
    assertEnvValue(supabaseUrl, "SUPABASE_URL");
    assertEnvValue(supabaseServiceRoleKey, "SUPABASE_SERVICE_ROLE_KEY");

    supabaseServiceClient = createClient<Database>(supabaseUrl!, supabaseServiceRoleKey!, {
      auth: {
        persistSession: false,
      },
    });
  }

  return supabaseServiceClient;
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          created_at: string;
          description: string | null;
          featured: boolean;
          id: string;
          live_url: string | null;
          name: string;
          repo_url: string | null;
          slug: string;
          status: "active" | "paused" | "planned" | "archived";
          summary: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          featured?: boolean;
          id?: string;
          live_url?: string | null;
          name: string;
          repo_url?: string | null;
          slug: string;
          status?: "active" | "paused" | "planned" | "archived";
          summary?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          featured?: boolean;
          id?: string;
          live_url?: string | null;
          name?: string;
          repo_url?: string | null;
          slug?: string;
          status?: "active" | "paused" | "planned" | "archived";
          summary?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      project_tags: {
        Row: {
          created_at: string;
          project_id: string;
          tag: string;
        };
        Insert: {
          created_at?: string;
          project_id: string;
          tag: string;
        };
        Update: {
          created_at?: string;
          project_id?: string;
          tag?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_tags_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      github_activity: {
        Row: {
          additions: number | null;
          author: string | null;
          commit_sha: string;
          committed_at: string;
          deletions: number | null;
          id: number;
          inserted_at: string;
          message: string | null;
          repo_name: string;
          url: string | null;
        };
        Insert: {
          additions?: number | null;
          author?: string | null;
          commit_sha: string;
          committed_at: string;
          deletions?: number | null;
          id?: number;
          inserted_at?: string;
          message?: string | null;
          repo_name: string;
          url?: string | null;
        };
        Update: {
          additions?: number | null;
          author?: string | null;
          commit_sha?: string;
          committed_at?: string;
          deletions?: number | null;
          id?: number;
          inserted_at?: string;
          message?: string | null;
          repo_name?: string;
          url?: string | null;
        };
        Relationships: [];
      };
      github_daily_metrics: {
        Row: {
          activity_date: string;
          additions: number;
          commits: number;
          deletions: number;
          refreshed_at: string;
          repositories: Json;
        };
        Insert: {
          activity_date: string;
          additions?: number;
          commits?: number;
          deletions?: number;
          refreshed_at?: string;
          repositories?: Json;
        };
        Update: {
          activity_date?: string;
          additions?: number;
          commits?: number;
          deletions?: number;
          refreshed_at?: string;
          repositories?: Json;
        };
        Relationships: [];
      };
      leetcode_daily: {
        Row: {
          activity_date: string;
          current_streak: number;
          easy_solved: number;
          hard_solved: number;
          id: number;
          longest_streak: number;
          medium_solved: number;
          refreshed_at: string;
          total_solved: number;
        };
        Insert: {
          activity_date: string;
          current_streak?: number;
          easy_solved?: number;
          hard_solved?: number;
          id?: number;
          longest_streak?: number;
          medium_solved?: number;
          refreshed_at?: string;
          total_solved?: number;
        };
        Update: {
          activity_date?: string;
          current_streak?: number;
          easy_solved?: number;
          hard_solved?: number;
          id?: number;
          longest_streak?: number;
          medium_solved?: number;
          refreshed_at?: string;
          total_solved?: number;
        };
        Relationships: [];
      };
      leetcode_topics: {
        Row: {
          activity_date: string;
          created_at: string;
          difficulty: string | null;
          id: number;
          problem_slug: string;
          submitted_at: string | null;
          tags: string[] | null;
          title: string | null;
          url: string | null;
        };
        Insert: {
          activity_date: string;
          created_at?: string;
          difficulty?: string | null;
          id?: number;
          problem_slug: string;
          submitted_at?: string | null;
          tags?: string[] | null;
          title?: string | null;
          url?: string | null;
        };
        Update: {
          activity_date?: string;
          created_at?: string;
          difficulty?: string | null;
          id?: number;
          problem_slug?: string;
          submitted_at?: string | null;
          tags?: string[] | null;
          title?: string | null;
          url?: string | null;
        };
        Relationships: [];
      };
      activity_log: {
        Row: {
          action: string;
          created_at: string;
          id: number;
          payload: Json | null;
          source: string;
        };
        Insert: {
          action: string;
          created_at?: string;
          id?: number;
          payload?: Json | null;
          source: string;
        };
        Update: {
          action?: string;
          created_at?: string;
          id?: number;
          payload?: Json | null;
          source?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

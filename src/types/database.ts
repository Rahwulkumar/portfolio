export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          slug: string;
          name: string;
          status: "active" | "paused" | "planned" | "archived";
          summary: string | null;
          description: string | null;
          repo_url: string | null;
          live_url: string | null;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          status?: "active" | "paused" | "planned" | "archived";
          summary?: string | null;
          description?: string | null;
          repo_url?: string | null;
          live_url?: string | null;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          status?: "active" | "paused" | "planned" | "archived";
          summary?: string | null;
          description?: string | null;
          repo_url?: string | null;
          live_url?: string | null;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      project_tags: {
        Row: {
          project_id: string;
          tag: string;
          created_at: string;
        };
        Insert: {
          project_id: string;
          tag: string;
          created_at?: string;
        };
        Update: {
          project_id?: string;
          tag?: string;
          created_at?: string;
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
          id: number;
          repo_name: string;
          commit_sha: string;
          message: string | null;
          committed_at: string;
          author: string | null;
          url: string | null;
          additions: number | null;
          deletions: number | null;
          inserted_at: string;
        };
        Insert: {
          id?: number;
          repo_name: string;
          commit_sha: string;
          message?: string | null;
          committed_at: string;
          author?: string | null;
          url?: string | null;
          additions?: number | null;
          deletions?: number | null;
          inserted_at?: string;
        };
        Update: {
          id?: number;
          repo_name?: string;
          commit_sha?: string;
          message?: string | null;
          committed_at?: string;
          author?: string | null;
          url?: string | null;
          additions?: number | null;
          deletions?: number | null;
          inserted_at?: string;
        };
        Relationships: [];
      };
      github_daily_metrics: {
        Row: {
          activity_date: string;
          commits: number;
          additions: number;
          deletions: number;
          repositories: Json;
          refreshed_at: string;
        };
        Insert: {
          activity_date: string;
          commits?: number;
          additions?: number;
          deletions?: number;
          repositories?: Json;
          refreshed_at?: string;
        };
        Update: {
          activity_date?: string;
          commits?: number;
          additions?: number;
          deletions?: number;
          repositories?: Json;
          refreshed_at?: string;
        };
        Relationships: [];
      };
      leetcode_daily: {
        Row: {
          id: number;
          activity_date: string;
          total_solved: number;
          easy_solved: number;
          medium_solved: number;
          hard_solved: number;
          current_streak: number;
          longest_streak: number;
          refreshed_at: string;
        };
        Insert: {
          id?: number;
          activity_date: string;
          total_solved?: number;
          easy_solved?: number;
          medium_solved?: number;
          hard_solved?: number;
          current_streak?: number;
          longest_streak?: number;
          refreshed_at?: string;
        };
        Update: {
          id?: number;
          activity_date?: string;
          total_solved?: number;
          easy_solved?: number;
          medium_solved?: number;
          hard_solved?: number;
          current_streak?: number;
          longest_streak?: number;
          refreshed_at?: string;
        };
        Relationships: [];
      };
      leetcode_topics: {
        Row: {
          id: number;
          activity_date: string;
          problem_slug: string;
          title: string | null;
          difficulty: string | null;
          url: string | null;
          tags: string[] | null;
          submitted_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          activity_date: string;
          problem_slug: string;
          title?: string | null;
          difficulty?: string | null;
          url?: string | null;
          tags?: string[] | null;
          submitted_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          activity_date?: string;
          problem_slug?: string;
          title?: string | null;
          difficulty?: string | null;
          url?: string | null;
          tags?: string[] | null;
          submitted_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      activity_log: {
        Row: {
          id: number;
          source: string;
          action: string;
          payload: Json | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          source: string;
          action: string;
          payload?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          source?: string;
          action?: string;
          payload?: Json | null;
          created_at?: string;
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

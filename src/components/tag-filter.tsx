"use client";

import React from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export interface TagFilterProps {
  tags: string[];
  onToggle: (tag: string | null) => void;
}

export function TagFilter({ tags, onToggle }: TagFilterProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const handleToggle = (tag: string) => {
    const next = activeTag === tag ? null : tag;
    setActiveTag(next);
    onToggle(next);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className={cn(
          "rounded-full border border-slate-300 px-3 py-1 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-slate-100 dark:focus-visible:ring-slate-600",
          activeTag === null &&
            "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900",
        )}
        onClick={() => {
          setActiveTag(null);
          onToggle(null);
        }}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={cn(
            "rounded-full border border-slate-300 px-3 py-1 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-slate-100 dark:focus-visible:ring-slate-600",
            activeTag === tag &&
              "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900",
          )}
          onClick={() => handleToggle(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

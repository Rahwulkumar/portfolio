import type { LeetCodeDailyRow } from "@/lib/leetcode";

interface MiniBarChartProps {
  data: LeetCodeDailyRow[];
  maxBars?: number;
}

export function MiniBarChart({ data, maxBars = 7 }: MiniBarChartProps) {
  const trimmed = data.slice(0, maxBars).reverse();
  const maxSolved = Math.max(...trimmed.map((item) => item.total_solved), 1);

  return (
    <div className="grid gap-2" aria-label="LeetCode solved problems per day">
      <div className="flex items-end gap-2" role="list">
        {trimmed.map((item) => {
          const barHeight = Math.max((item.total_solved / maxSolved) * 100, 8);
          const label = new Date(item.activity_date).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          });

          return (
            <div key={item.activity_date} role="listitem" className="flex-1">
              <div
                className="block w-full rounded-t bg-sky-500/80 shadow-sm dark:bg-sky-400"
                style={{ height: `${barHeight}%`, minHeight: "0.75rem" }}
                aria-hidden="true"
              />
              <span className="mt-1 block text-center text-xs text-slate-500 dark:text-slate-400">
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Bars represent total problems solved per day. Values are scaled to the most productive day
        in view.
      </p>
    </div>
  );
}

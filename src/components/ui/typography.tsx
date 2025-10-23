import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function SectionTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100",
        className,
      )}
      {...props}
    />
  );
}

export function MutedText({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-slate-600 dark:text-slate-400", className)} {...props} />;
}

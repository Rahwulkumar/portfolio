"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { primaryNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items = useMemo(() => primaryNav, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Rahul&apos;s Portfolio
        </Link>
        <div className="flex items-center gap-2">
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 text-sm font-medium sm:flex"
          >
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-slate-900 dark:hover:text-slate-100",
                    isActive
                      ? "text-slate-900 dark:text-slate-100"
                      : "text-slate-600 dark:text-slate-400",
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {isMenuOpen ? (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-slate-200 bg-white sm:hidden dark:border-slate-800 dark:bg-slate-950"
        >
          <div className="mx-auto flex max-w-5xl flex-col px-4 py-4 sm:px-6 lg:px-8">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-slate-900 dark:text-slate-100"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

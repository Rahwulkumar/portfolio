import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} Rahul Kumar. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link
            className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
            href="mailto:rahul@example.com"
          >
            Email
          </Link>
          <Link
            className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
            href="https://github.com/Rahwulkumar"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <Link
            className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
            href="https://www.linkedin.com/in/rahul-kumar"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}

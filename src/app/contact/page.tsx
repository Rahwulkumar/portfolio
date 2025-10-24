import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact · Rahul Kumar",
  description: "Get in touch for collaborations, opportunities, or mentoring.",
};

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          Contact
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          A secure contact form with Resend email delivery and hCaptcha is scheduled for Phase 06.
          Until then, you can reach me directly.
        </p>
      </header>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <li>
            <span className="font-medium text-slate-900 dark:text-slate-100">Email:</span>{" "}
            <a className="underline underline-offset-4" href="mailto:rahwulkumar@gmail.com">
              rahwulkumar@gmail.com
            </a>
          </li>
          <li>
            <span className="font-medium text-slate-900 dark:text-slate-100">LinkedIn:</span>{" "}
            <a
              className="underline underline-offset-4"
              href="https://www.linkedin.com/in/rahul-kumar"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/rahul-kumar
            </a>
          </li>
          <li>
            <span className="font-medium text-slate-900 dark:text-slate-100">GitHub:</span>{" "}
            <a
              className="underline underline-offset-4"
              href="https://github.com/Rahwulkumar"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/Rahwulkumar
            </a>
          </li>
        </ul>
        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          Prefer async? I keep detailed changelogs and project notes so you always have context
          before we chat.
        </p>
      </div>
    </section>
  );
}

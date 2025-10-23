import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact · Rahul Kumar",
  description: "Get in touch for collaborations, opportunities, or mentoring.",
};

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Contact</h1>
        <p className="text-slate-600 dark:text-slate-400">
          A secure contact form with Resend email delivery and hCaptcha is scheduled for Phase 06.
        </p>
      </header>
      <div className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
        <p>
          Until the automated form is ready, reach me directly at{" "}
          <a
            className="font-medium text-slate-900 underline underline-offset-4 dark:text-slate-100"
            href="mailto:rahul@example.com"
          >
            rahul@example.com
          </a>{" "}
          or via LinkedIn. This area will also surface office hours and Calendly integration.
        </p>
      </div>
    </section>
  );
}

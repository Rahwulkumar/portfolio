import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rahul Kumar | Portfolio",
  description:
    "Engineering portfolio showcasing Rahul Kumar's projects, daily coding streaks, and technical writing.",
  metadataBase: new URL("https://portfolio.example.com"),
  openGraph: {
    title: "Rahul Kumar | Portfolio",
    description:
      "Explore featured projects, GitHub activity, and LeetCode progress from Rahul Kumar.",
    url: "https://portfolio.example.com",
    siteName: "Rahul Kumar Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Kumar | Portfolio",
    description: "Full-stack developer crafting data-rich, high-impact experiences.",
    creator: "@rahwulkumar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">{children}</div>
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

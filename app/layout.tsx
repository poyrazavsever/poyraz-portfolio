import type { Metadata } from "next";
import "./globals.css";

import { SiteNavbar } from "@/components/site-navbar";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { AnnouncementBar } from "poyraz-ui/organisms";

export const metadata: Metadata = {
  title:
    "Poyraz Avsever - Portfolio - Freelancer - Fullstack Developer - Web Developer",
  description:
    "Poyraz Avsever's personal portfolio website showcasing projects, skills, and services as a freelancer and fullstack web developer. A young person passionate about coding and technology.",
  icons: {
    icon: "/favicon.ico",
  },
  authors: [{ name: "Poyraz Avsever" }],
  keywords: [
    "Poyraz Avsever",
    "Portfolio",
    "Freelancer",
    "Fullstack Developer",
    "Web Developer",
    "Projects",
    "Skills",
    "Services",
    "Coding",
    "Technology",
    "Personal Website",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript",
    "React",
    "Node.js",
    "Next.js",
    "Web Development",
    "Programming",
    "Tech Enthusiast",
    "Developer Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <div className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden px-4 py-4 sm:px-6">
          <SiteNavbar />
          <AnnouncementBar
            variant="branded"
            dismissible={false}
            icon={<Icon icon="mdi:sparkles" width={16} height={16} />}
            action={
              <Link
                href="https://ui.poyrazavsever.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold underline"
              >
                Learn More -&gt;
              </Link>
            }
          >
            New components added this week!
          </AnnouncementBar>
          <main className="flex-1 overflow-hidden py-4">{children}</main>
        </div>
      </body>
    </html>
  );
}

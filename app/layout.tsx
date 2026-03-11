import type { Metadata } from "next";
import "./globals.css";

import { SiteNavbar } from "@/components/site-navbar";
import { NekoFollower } from "@/components/neko-follower";
import { ANNOUNCEMENT_ITEMS } from "@/data/site-settings";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { AnnouncementBar } from "poyraz-ui/organisms";

export const metadata: Metadata = {
  metadataBase: new URL("https://poyrazavsever.com"),
  title: {
    default: "Poyraz Avsever | Portfolyo",
    template: "%s | Poyraz Avsever",
  },
  description:
    "Poyraz Avsever'in projelerini, yazılım içeriklerini ve teknik çalışmalarını paylaştığı kişisel portfolyo sitesi.",
  applicationName: "Poyraz Avsever Portfolyo",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo/logo.jpeg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo/logo.jpeg",
  },
  authors: [{ name: "Poyraz Avsever" }],
  creator: "Poyraz Avsever",
  publisher: "Poyraz Avsever",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://poyrazavsever.com",
    siteName: "Poyraz Avsever Portfolyo",
    title: "Poyraz Avsever | Portfolyo",
    description:
      "Poyraz Avsever'in projelerini, yazılım içeriklerini ve teknik çalışmalarını paylaştığı kişisel portfolyo sitesi.",
    images: [
      {
        url: "/logo/logo.jpeg",
        width: 1200,
        height: 1200,
        alt: "Poyraz Avsever Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poyraz Avsever | Portfolyo",
    description:
      "Poyraz Avsever'in projelerini, yazılım içeriklerini ve teknik çalışmalarını paylaştığı kişisel portfolyo sitesi.",
    images: ["/logo/logo.jpeg"],
    creator: "@poyrazavsever",
  },
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
  const announcement = ANNOUNCEMENT_ITEMS[0];

  return (
    <html lang="tr">
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <NekoFollower />
        <div className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden px-4 py-4 sm:px-6">
          <SiteNavbar />
          {announcement ? (
            <AnnouncementBar
              variant="branded"
              dismissible={false}
              icon={<Icon icon="mdi:sparkles" width={16} height={16} />}
              action={
                announcement.actionLabel && announcement.actionHref ? (
                  <Link
                    href={announcement.actionHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold underline"
                  >
                    {announcement.actionLabel}
                  </Link>
                ) : null
              }
            >
              {announcement.text}
            </AnnouncementBar>
          ) : null}
          <main className="flex-1 overflow-hidden py-4">{children}</main>
        </div>
      </body>
    </html>
  );
}

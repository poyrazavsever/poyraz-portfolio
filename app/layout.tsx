import type { Metadata } from "next";
import "./globals.css";

import { AppShell } from "@/components/app-shell";
import { GoogleAnalytics } from "@/components/google-analytics";

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
  return (
    <html lang="tr">
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <GoogleAnalytics />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

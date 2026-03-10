import type { Metadata } from "next";
import { SiteNavbar } from "@/components/site-navbar";
import "./globals.css";

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
      <body className="h-dvh overflow-hidden bg-background text-foreground antialiased">
        <div className="mx-auto flex h-dvh w-full max-w-4xl flex-col overflow-hidden px-4 py-8 sm:px-6 sm:py-10">
          <SiteNavbar />
          <main className="flex-1 overflow-hidden py-4">{children}</main>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

import { AppShell } from "@/components/app-shell";
import { GoogleAnalytics } from "@/components/google-analytics";
import { PoyrazBottomRightFollower } from "@/components/poyraz-bottom-right-follower";
import { listAnimationSources } from "@/data/animation-sources";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const title = t("title");
  const titleTemplate = t("titleTemplate");
  const description = t("description");

  return {
    metadataBase: new URL("https://poyrazavsever.com"),
    title: {
      default: title,
      template: titleTemplate,
    },
    description: description,
    applicationName: "Poyraz Avsever Portfolyo",
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/logo/logo.webp", type: "image/webp" },
      ],
      shortcut: "/favicon.ico",
      apple: "/logo/apple-touch-icon.png",
    },
    authors: [{ name: "Poyraz Avsever" }],
    creator: "Poyraz Avsever",
    publisher: "Poyraz Avsever",
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: "https://poyrazavsever.com",
      siteName: title,
      title: title,
      description: description,
      images: [
        {
          url: "/logo/logo.webp",
          width: 1200,
          height: 1200,
          alt: "Poyraz Avsever Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["/logo/logo.webp"],
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
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as "tr" | "en")) {
    notFound();
  }

  // Provide messages for NextIntlClientProvider
  const [messages, animationSources] = await Promise.all([
    getMessages(),
    listAnimationSources(locale),
  ]);
  const animationSourceSearchItems = animationSources.map((source) => ({
    slug: source.slug,
    title: source.title,
    excerpt: source.excerpt,
    platform: source.platform,
    tools: source.tools,
  }));

  return (
    <html lang={locale}>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          <GoogleAnalytics />
          <AppShell animationSources={animationSourceSearchItems}>
            {children}
          </AppShell>
          <PoyrazBottomRightFollower />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

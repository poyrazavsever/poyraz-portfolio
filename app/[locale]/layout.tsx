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
import { getHomeBlogNews, getLatestAgendaArticle } from "@/data/blog";
import { SITE_URL } from "@/lib/seo";

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
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: titleTemplate,
    },
    description: description,
    applicationName: "Poyraz Avsever Portfolyo",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/logo/logo-96.webp", type: "image/webp", sizes: "96x96" },
      ],
      shortcut: "/favicon.ico",
      apple: "/logo/apple-touch-icon.png",
    },
    authors: [{ name: "Poyraz Avsever" }],
    creator: "Poyraz Avsever",
    publisher: "Poyraz Avsever",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      siteName: title,
      title: title,
      description: description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: t("socialImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["/og.png"],
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
  const [messages, animationSources, latestAgendaArticle, latestPosts] =
    await Promise.all([
      getMessages(),
      listAnimationSources(locale),
      getLatestAgendaArticle(locale),
      getHomeBlogNews(locale, 1),
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
          <AppShell
            animationSources={animationSourceSearchItems}
            latestAgenda={
              latestAgendaArticle
                ? {
                    title: latestAgendaArticle.title,
                    href: latestAgendaArticle.href,
                  }
                : null
            }
            latestPost={
              latestPosts[0]
                ? {
                    title: latestPosts[0].title,
                    href: latestPosts[0].href,
                  }
                : null
            }
          >
            {children}
          </AppShell>
          <PoyrazBottomRightFollower />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

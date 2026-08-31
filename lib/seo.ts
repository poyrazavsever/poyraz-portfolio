import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

function resolveSiteUrl() {
  const url = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.poyrazavsever.com",
  );

  // The public site redirects the apex domain to `www`. Canonicals must point
  // directly to the final URL instead of a redirecting host.
  if (url.hostname === "poyrazavsever.com") {
    url.hostname = "www.poyrazavsever.com";
  }

  return url.origin;
}

export const SITE_URL = resolveSiteUrl();

export type SiteLocale = "tr" | "en";

type LocalePaths = Partial<Record<SiteLocale, string>>;

type StaticSeoPage =
  | "home"
  | "about"
  | "references"
  | "volunteerCommunity"
  | "blog"
  | "projects"
  | "content"
  | "gallery"
  | "technologies"
  | "links"
  | "contact";

function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

export function getLocalizedPath(locale: SiteLocale, path: string) {
  const normalizedPath = normalizePath(path);
  return normalizedPath === "/"
    ? `/${locale}`
    : `/${locale}${normalizedPath}`;
}

export function getAbsoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function getLocalizedUrl(locale: SiteLocale, path: string) {
  return getAbsoluteUrl(getLocalizedPath(locale, path));
}

export function createAlternates(
  locale: SiteLocale,
  paths: LocalePaths,
): Metadata["alternates"] {
  const currentPath = paths[locale];
  if (!currentPath) return undefined;

  const languages: Record<string, string> = {};

  if (paths.tr) {
    languages["tr-TR"] = getLocalizedUrl("tr", paths.tr);
  }
  if (paths.en) {
    languages["en-US"] = getLocalizedUrl("en", paths.en);
  }

  languages["x-default"] = paths.tr
    ? getLocalizedUrl("tr", paths.tr)
    : getLocalizedUrl(locale, currentPath);

  return {
    canonical: getLocalizedUrl(locale, currentPath),
    languages,
  };
}

export function createPageMetadata({
  locale,
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  locale: SiteLocale;
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = getLocalizedUrl(locale, path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: createAlternates(locale, { tr: path, en: path }),
    openGraph: {
      type: "website",
      siteName: "Poyraz Avsever",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
      url,
      title,
      description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Poyraz Avsever",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@poyrazavsever",
      images: ["/og.png"],
    },
  };
}

export async function getStaticPageMetadata({
  locale,
  page,
  path,
  absoluteTitle = false,
}: {
  locale: string;
  page: StaticSeoPage;
  path: string;
  absoluteTitle?: boolean;
}) {
  const siteLocale = locale === "en" ? "en" : "tr";
  const t = await getTranslations({ locale: siteLocale, namespace: "Seo" });

  return createPageMetadata({
    locale: siteLocale,
    title: t(`${page}.title`),
    description: t(`${page}.description`),
    path,
    absoluteTitle,
  });
}

import type { MetadataRoute } from "next";
import { listAnimationSources } from "@/data/animation-sources";
import { isNewsletterCategory } from "@/data/blog";
import { listBlogDetails } from "@/data/blog-detail";
import { listProjectCaseStudies } from "@/data/project-case-studies";
import {
  getAbsoluteUrl,
  getLocalizedUrl,
  type SiteLocale,
} from "@/lib/seo";

const LOCALES: SiteLocale[] = ["tr", "en"];

const STATIC_ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about/references", changeFrequency: "monthly", priority: 0.5 },
  {
    path: "/about/volunteer-community",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/agenda", changeFrequency: "weekly", priority: 0.9 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
  { path: "/content", changeFrequency: "weekly", priority: 0.7 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/media-kit", changeFrequency: "monthly", priority: 0.6 },
  { path: "/links", changeFrequency: "monthly", priority: 0.4 },
  {
    path: "/animation-sources",
    changeFrequency: "monthly",
    priority: 0.7,
  },
] as const;

function toValidDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function getLanguageLinks(paths: Partial<Record<SiteLocale, string>>) {
  const languages: Record<string, string> = {};

  if (paths.tr) languages["tr-TR"] = getLocalizedUrl("tr", paths.tr);
  if (paths.en) languages["en-US"] = getLocalizedUrl("en", paths.en);
  languages["x-default"] = paths.tr
    ? getLocalizedUrl("tr", paths.tr)
    : getLocalizedUrl("en", paths.en!);

  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, animationSources] = await Promise.all([
    listBlogDetails(),
    listAnimationSources(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.flatMap((route) => {
    const paths = { tr: route.path, en: route.path };
    const languages = getLanguageLinks(paths);

    return LOCALES.map((locale) => ({
      url: getLocalizedUrl(locale, route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages },
    }));
  });

  const postGroups = new Map<string, typeof posts>();
  for (const post of posts) {
    const key = `${post.category.toLocaleLowerCase()}:${post.coverImage}`;
    postGroups.set(key, [...(postGroups.get(key) ?? []), post]);
  }

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const section = isNewsletterCategory(post.category) ? "agenda" : "blog";
    const key = `${post.category.toLocaleLowerCase()}:${post.coverImage}`;
    const translations = postGroups.get(key) ?? [post];
    const paths = Object.fromEntries(
      translations.map((translation) => [
        translation.lang,
        `/${section}/${translation.slug}`,
      ]),
    );

    return {
      url: getLocalizedUrl(post.lang, `/${section}/${post.slug}`),
      lastModified: toValidDate(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLanguageLinks(paths) },
      images: [getAbsoluteUrl(post.coverImage)],
    };
  });

  const animationGroups = new Map<string, typeof animationSources>();
  for (const source of animationSources) {
    animationGroups.set(source.slug, [
      ...(animationGroups.get(source.slug) ?? []),
      source,
    ]);
  }

  const animationSourceRoutes: MetadataRoute.Sitemap = animationSources.map(
    (source) => {
      const translations = animationGroups.get(source.slug) ?? [source];
      const paths = Object.fromEntries(
        translations.map((translation) => [
          translation.lang,
          `/animation-sources/${translation.slug}`,
        ]),
      );

      return {
        url: getLocalizedUrl(
          source.lang,
          `/animation-sources/${source.slug}`,
        ),
        lastModified: toValidDate(source.date),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: getLanguageLinks(paths) },
        images: [getAbsoluteUrl(source.coverImage)],
      };
    },
  );

  const projectCaseStudyRoutes: MetadataRoute.Sitemap = LOCALES.flatMap(
    (locale) =>
      listProjectCaseStudies(locale).map((project) => {
        const path = `/projects/${project.slug}`;
        const paths = { tr: path, en: path };

        return {
          url: getLocalizedUrl(locale, path),
          changeFrequency: "monthly" as const,
          priority: 0.8,
          alternates: { languages: getLanguageLinks(paths) },
          images: [getAbsoluteUrl(project.image)],
        };
      }),
  );

  return [
    ...staticRoutes,
    ...projectCaseStudyRoutes,
    ...blogRoutes,
    ...animationSourceRoutes,
  ];
}

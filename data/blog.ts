import "server-only";

import { listBlogDetails } from "@/data/blog-detail";
import type { PodcastEpisode } from "@/data/content-types";
import { getPodcastCollections } from "@/lib/content-page";

export type BlogNewsItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  href: string;
};

export type BlogArticleItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  href: string;
  author: string;
};

export type BlogPodcastItem = {
  id: string;
  title: string;
  date: string;
  href: string;
};

export type BlogPodcastGroup = {
  id: "yazilim" | "masa-basi";
  title: string;
  href: string;
  items: BlogPodcastItem[];
};

export type BlogPageData = {
  news: BlogNewsItem[];
  articles: BlogArticleItem[];
  categories: string[];
  podcastGroups: BlogPodcastGroup[];
  totalPages: number;
  currentPage: number;
};

const DEFAULT_IMAGE = "/news/design.svg";
const DEFAULT_READ_TIME = "5 min";

function toTimestamp(value: string) {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function sortByDateDesc<T extends { date: string; id: string }>(items: T[]) {
  return [...items].sort((a, b) => {
    const aTime = toTimestamp(a.date);
    const bTime = toTimestamp(b.date);

    if (aTime && bTime && aTime !== bTime) {
      return bTime - aTime;
    }

    if (aTime !== bTime) {
      return bTime - aTime;
    }

    return a.id.localeCompare(b.id);
  });
}

function mapEpisodeToPodcastItem(episode: PodcastEpisode): BlogPodcastItem {
  return {
    id: `${episode.podcast}-${episode.slug}`,
    title: episode.title,
    date: episode.date,
    href: "/content",
  };
}

export async function getAllBlogArticles(): Promise<BlogArticleItem[]> {
  const posts = await listBlogDetails();

  const articles = posts.map((post) => ({
    id: post.slug,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category || "General",
    image: post.coverImage || DEFAULT_IMAGE,
    date: post.date,
    readTime: post.readTime || DEFAULT_READ_TIME,
    href: `/blog/${post.slug}`,
    author: post.author || "Poyraz Avsever",
  }));

  return sortByDateDesc(articles);
}

export async function getHomeBlogNews(limit = 3): Promise<BlogNewsItem[]> {
  const articles = await getAllBlogArticles();

  return articles.slice(0, limit).map((item) => ({
    id: `home-news-${item.slug}`,
    title: item.title,
    category: item.category,
    image: item.image,
    date: item.date,
    href: item.href,
  }));
}

export async function getBlogPageData(page = 1, pageSize = 12): Promise<BlogPageData> {
  const articles = await getAllBlogArticles();
  const totalPages = Math.max(1, Math.ceil(Math.max(articles.length, 1) / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const paginated = articles.slice(start, start + pageSize);

  const categories = [
    "All",
    ...new Set(
      articles
        .map((item) => item.category.trim())
        .filter(Boolean),
    ),
  ];

  const podcastCollections = await getPodcastCollections();

  return {
    news: articles.slice(0, 4).map((item) => ({
      id: `blog-news-${item.slug}`,
      title: item.title,
      category: item.category,
      image: item.image,
      date: item.date,
      href: item.href,
    })),
    articles: paginated,
    categories,
    totalPages,
    currentPage,
    podcastGroups: [
      {
        id: "yazilim",
        title: "Poyraz ile Yazılım",
        href: "/content",
        items: podcastCollections.yazilim.slice(0, 4).map(mapEpisodeToPodcastItem),
      },
      {
        id: "masa-basi",
        title: "Poyraz ile Masa Başı",
        href: "/content",
        items: podcastCollections.masaBasi.slice(0, 4).map(mapEpisodeToPodcastItem),
      },
    ],
  };
}

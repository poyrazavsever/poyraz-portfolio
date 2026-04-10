import "server-only";

import { listBlogDetails } from "@/data/blog-detail";

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

export type BlogPageData = {
  news: BlogNewsItem[];
  articles: BlogArticleItem[];
  categories: string[];
  selectedCategory: string;
  totalPages: number;
  currentPage: number;
};

const DEFAULT_IMAGE = "/news/design.svg";
const DEFAULT_READ_TIME = "5 min";
const BLOG_CATEGORIES = ["All", "Frontend", "UX", "Yazilim", "TypeScript", "Testing", "General"];

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

function normalizeCategory(value: string) {
  return value.trim().toLocaleLowerCase();
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

export async function getBlogPageData(
  page = 1,
  pageSize = 12,
  selectedCategoryParam?: string,
): Promise<BlogPageData> {
  const articles = await getAllBlogArticles();
  const categories = BLOG_CATEGORIES;
  const categoryByNormalized = new Map(
    categories.map((category) => [normalizeCategory(category), category]),
  );
  const requestedCategory = selectedCategoryParam?.trim();
  const selectedCategory =
    (requestedCategory && categoryByNormalized.get(normalizeCategory(requestedCategory))) || "All";
  const filteredArticles =
    selectedCategory === "All"
      ? articles
      : articles.filter((item) => normalizeCategory(item.category) === normalizeCategory(selectedCategory));
  const totalPages = Math.max(1, Math.ceil(Math.max(filteredArticles.length, 1) / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const paginated = filteredArticles.slice(start, start + pageSize);

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
    selectedCategory,
    totalPages,
    currentPage,
  };
}

import "server-only";

import { listBlogDetails } from "@/data/blog-detail";

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
  articles: BlogArticleItem[];
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
  totalPages: number;
  currentPage: number;
};

const DEFAULT_IMAGE = "/news/design.svg";
const DEFAULT_READ_TIME = "5 min";
const NEWSLETTER_CATEGORY = "Newsletter";
const BLOG_CATEGORY_ORDER = [
  "Frontend",
  "UX",
  "Software",
  "TypeScript",
  "Testing",
  "General",
];

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

export function isNewsletterCategory(category: string) {
  return normalizeCategory(category) === normalizeCategory(NEWSLETTER_CATEGORY);
}

async function getAllArticles(locale?: string): Promise<BlogArticleItem[]> {
  const posts = await listBlogDetails(locale);

  const articles = posts.map((post) => ({
    id: post.slug,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category || "General",
    image: post.coverImage || DEFAULT_IMAGE,
    date: post.date,
    readTime: post.readTime || DEFAULT_READ_TIME,
    href: isNewsletterCategory(post.category)
      ? `/agenda/${post.slug}`
      : `/blog/${post.slug}`,
    author: post.author || "Poyraz Avsever",
  }));

  return sortByDateDesc(articles);
}

export async function getAllBlogArticles(locale?: string): Promise<BlogArticleItem[]> {
  const articles = await getAllArticles(locale);
  return articles.filter((article) => !isNewsletterCategory(article.category));
}

export async function getAllAgendaArticles(locale?: string): Promise<BlogArticleItem[]> {
  const articles = await getAllArticles(locale);
  return articles.filter((article) => isNewsletterCategory(article.category));
}

export async function getHomeBlogNews(locale?: string, limit = 3) {
  const articles = await getAllBlogArticles(locale);

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
  locale?: string,
  page = 1,
  pageSize = 12,
  selectedCategoryParam?: string,
  searchQueryParam?: string,
): Promise<BlogPageData> {
  const articles = await getAllBlogArticles(locale);
  const availableCategories = new Set(articles.map((article) => article.category));
  const categories = [
    "All",
    ...BLOG_CATEGORY_ORDER.filter((category) => availableCategories.has(category)),
    ...[...availableCategories]
      .filter((category) => !BLOG_CATEGORY_ORDER.includes(category))
      .sort((a, b) => a.localeCompare(b)),
  ];
  const categoryByNormalized = new Map(
    categories.map((category) => [normalizeCategory(category), category]),
  );
  const requestedCategory = selectedCategoryParam?.trim();
  const selectedCategory =
    (requestedCategory && categoryByNormalized.get(normalizeCategory(requestedCategory))) || "All";
  const searchQuery = (searchQueryParam ?? "").trim();
  const searchLower = searchQuery.toLocaleLowerCase();

  let filtered =
    selectedCategory === "All"
      ? articles
      : articles.filter((item) => normalizeCategory(item.category) === normalizeCategory(selectedCategory));

  if (searchLower) {
    filtered = filtered.filter(
      (item) =>
        item.title.toLocaleLowerCase().includes(searchLower) ||
        item.excerpt.toLocaleLowerCase().includes(searchLower),
    );
  }

  const totalPages = Math.max(1, Math.ceil(Math.max(filtered.length, 1) / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return {
    articles: paginated,
    categories,
    selectedCategory,
    searchQuery,
    totalPages,
    currentPage,
  };
}

export async function getAgendaPageData(
  locale?: string,
  page = 1,
  pageSize = 12,
  searchQueryParam?: string,
): Promise<BlogPageData> {
  const articles = await getAllAgendaArticles(locale);
  const searchQuery = (searchQueryParam ?? "").trim();
  const searchLower = searchQuery.toLocaleLowerCase();
  const filtered = searchLower
    ? articles.filter(
        (item) =>
          item.title.toLocaleLowerCase().includes(searchLower) ||
          item.excerpt.toLocaleLowerCase().includes(searchLower),
      )
    : articles;
  const totalPages = Math.max(1, Math.ceil(Math.max(filtered.length, 1) / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    articles: filtered.slice(start, start + pageSize),
    categories: ["All"],
    selectedCategory: "All",
    searchQuery,
    totalPages,
    currentPage,
  };
}

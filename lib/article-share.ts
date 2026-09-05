export type ArticleSection = "blog" | "agenda";
export type ShareCardVariant = "story" | "x";

type ShareCardParams = {
  locale: "tr" | "en";
  section: ArticleSection;
  slug: string;
  variant: ShareCardVariant;
};

export function getArticlePath({
  locale,
  section,
  slug,
}: Omit<ShareCardParams, "variant">) {
  return `/${locale}/${section}/${encodeURIComponent(slug)}`;
}

export function getShareCardPath({
  locale,
  section,
  slug,
  variant,
}: ShareCardParams) {
  const searchParams = new URLSearchParams({
    locale,
    section,
    slug,
    variant,
  });

  return `/api/share-card?${searchParams.toString()}`;
}

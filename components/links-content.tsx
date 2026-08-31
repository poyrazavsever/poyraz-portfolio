"use client";

import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useLocale, useTranslations } from "next-intl";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  Input,
  Typography,
} from "poyraz-ui/atoms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "poyraz-ui/molecules";
import { Link } from "@/i18n/routing";
import {
  getResumeHref,
  LINK_DIRECTORY,
  LINK_DIRECTORY_CATEGORIES,
  SOCIAL_LINKS,
  TOP_ICON_LINKS,
  type LinkDirectoryCategory,
} from "@/lib/links";

type CategoryFilter = "all" | LinkDirectoryCategory;

type LinksContentProps = {
  initialCategory?: string;
  initialQuery?: string;
};

const CATEGORY_ORDER = {
  resources: 0,
  navigation: 1,
  social: 2,
} as const;

const DIRECTORY_ITEMS = [...LINK_DIRECTORY].sort((left, right) => {
  const categoryCompare =
    CATEGORY_ORDER[left.category] - CATEGORY_ORDER[right.category];

  return categoryCompare !== 0
    ? categoryCompare
    : left.label.localeCompare(right.label, "tr");
});

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function formatHref(href: string) {
  if (href.startsWith("mailto:")) return href.replace("mailto:", "");
  if (href.startsWith("/")) return `poyrazavsever.com${href}`;

  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function parseCategoryFilter(value?: string): CategoryFilter {
  if (value === "navigation" || value === "social" || value === "resources") {
    return value;
  }

  return "all";
}

function LinkIcon({ icon, size = 18 }: { icon: string; size?: number }) {
  return <Icon icon={icon} width={size} height={size} />;
}

export function LinksContent({
  initialCategory,
  initialQuery = "",
}: LinksContentProps) {
  const t = useTranslations("Links");
  const tNav = useTranslations("Nav");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(() =>
    parseCategoryFilter(initialCategory),
  );
  const [query, setQuery] = useState(initialQuery);

  const filterItems = useMemo(
    () => [
      { id: "all" as const, label: t("allCategories") },
      ...LINK_DIRECTORY_CATEGORIES.map((item) => ({
        id: item.id,
        label: t(`categories.${item.id}`),
      })),
    ],
    [t],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

    return DIRECTORY_ITEMS.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }

      if (queryTokens.length === 0) return true;

      const haystack = normalize(
        [
          tNav.has(item.id) ? tNav(item.id) : item.label,
          item.href,
          t(`categories.${item.category}`),
          ...item.keywords,
        ].join(" "),
      );

      return queryTokens.every((token) => haystack.includes(token));
    });
  }, [activeCategory, query, t, tNav]);

  return (
    <section className="flex h-full flex-col gap-10">
      <header className="border-b border-border py-4 sm:py-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <Avatar className="size-16 shrink-0 rounded-sm border border-border bg-background sm:size-20">
              <AvatarImage src="/logo/logo.webp" alt="Poyraz Avsever" />
              <AvatarFallback className="rounded-sm bg-muted font-semibold">
                PA
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <Typography
                variant="h2"
                component="h1"
                className="font-secondary text-2xl font-semibold leading-none tracking-[-0.045em] text-foreground"
              >
                {t("title")}
              </Typography>
              <Typography
                variant="small"
                className="mt-2 max-w-xl text-xs leading-5 text-muted-foreground sm:text-sm"
              >
                {t("desc")}
              </Typography>
            </div>
          </div>

          <div
            className="flex max-w-sm flex-wrap gap-2 sm:justify-end"
            aria-label={t("socialLinks")}
          >
            {SOCIAL_LINKS.map((item) => (
              <Button
                key={item.id}
                asChild
                variant="secondary"
                size="icon-sm"
                radius="sm"
                effect="shine"
                aria-label={item.label}
              >
                <a
                  href={item.href}
                  target={item.id === "email" ? undefined : "_blank"}
                  rel={item.id === "email" ? undefined : "noreferrer"}
                  title={item.label}
                >
                  <LinkIcon icon={item.icon} size={16} />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </header>

      <section className="space-y-3" aria-labelledby="quick-links-title">
        <div>
          <Typography
            id="quick-links-title"
            variant="h3"
            component="h2"
            className="tracking-[-0.035em]"
          >
            {t("quickLinks")}
          </Typography>
          <Typography variant="small" className="mt-1 text-muted-foreground">
            {t("quickLinksDesc")}
          </Typography>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {TOP_ICON_LINKS.map((item) => {
            const href = item.id === "cv" ? getResumeHref(locale) : item.href;

            return (
              <a
                key={item.id}
                href={href}
                target={item.id === "cv" || item.external ? "_blank" : undefined}
                rel={item.id === "cv" || item.external ? "noreferrer" : undefined}
                className="group block"
              >
                <Card className="h-full rounded-sm border-border p-3 transition-[border-color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/40">
                  <span className="inline-flex size-9 items-center justify-center rounded-sm border border-border bg-muted/35 text-muted-foreground">
                    <LinkIcon icon={item.icon} />
                  </span>
                  <Typography variant="large" className="mt-3 text-sm leading-tight">
                    {tNav.has(item.id) ? tNav(item.id) : item.label}
                  </Typography>
                  <Typography
                    variant="small"
                    className="mt-1 truncate text-xs text-muted-foreground"
                  >
                    {formatHref(href)}
                  </Typography>
                </Card>
              </a>
            );
          })}
        </div>
      </section>

      <section className="space-y-3" aria-labelledby="all-links-title">
        <div className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Typography
              id="all-links-title"
              variant="h3"
              component="h2"
              className="tracking-[-0.035em]"
            >
              {t("allLinks")}
            </Typography>
            <Typography variant="small" className="mt-1 text-muted-foreground">
              {t("allLinksDesc")}
            </Typography>
          </div>

          <div className="grid w-full gap-2 sm:grid-cols-[180px_1fr] md:max-w-lg">
            <Select
              value={activeCategory}
              onValueChange={(value) =>
                setActiveCategory(value as CategoryFilter)
              }
            >
              <SelectTrigger className="h-10 rounded-sm border-border bg-background px-3 text-sm">
                <SelectValue placeholder={t("selectCategory")} />
              </SelectTrigger>
              <SelectContent>
                {filterItems.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchAriaLabel")}
              className="h-10 rounded-sm"
            />
          </div>
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          {filteredItems.map((item) => {
            const href = item.id === "cv" ? getResumeHref(locale) : item.href;
            const isStaticOrExternal =
              item.external ||
              item.id === "rss" ||
              item.id === "cv" ||
              href.endsWith(".xml") ||
              href.endsWith(".pdf");
            const content = (
              <Card className="h-full rounded-sm border-border p-3 transition-[border-color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/40">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-sm border border-border bg-muted/35 text-muted-foreground">
                    <LinkIcon icon={item.icon} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Typography variant="large" className="text-sm leading-tight">
                        {tNav.has(item.id) ? tNav(item.id) : item.label}
                      </Typography>
                      <Badge variant="secondary" radius="sm" className="text-[10px]">
                        {t(`categories.${item.category}`)}
                      </Badge>
                    </div>
                    <Typography
                      variant="small"
                      className="mt-1 truncate text-xs text-muted-foreground"
                    >
                      {formatHref(href)}
                    </Typography>
                  </div>

                  <Icon
                    icon={
                      isStaticOrExternal
                        ? "mdi:arrow-top-right"
                        : "mdi:arrow-right"
                    }
                    width={17}
                    height={17}
                    className="shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </div>
              </Card>
            );

            return isStaticOrExternal ? (
              <a
                key={`${item.category}-${item.id}`}
                href={href}
                target={item.id === "cv" || item.external ? "_blank" : undefined}
                rel={item.id === "cv" || item.external ? "noreferrer" : undefined}
                className="group block"
              >
                {content}
              </a>
            ) : (
              <Link
                key={`${item.category}-${item.id}`}
                href={href}
                className="group block"
              >
                {content}
              </Link>
            );
          })}

          {filteredItems.length === 0 ? (
            <Card className="rounded-sm border-border px-4 py-5 md:col-span-2">
              <Typography variant="small" className="text-muted-foreground">
                {t("empty")}
              </Typography>
            </Card>
          ) : null}
        </div>
      </section>
    </section>
  );
}

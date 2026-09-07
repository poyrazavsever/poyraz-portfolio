"use client";

import { useTranslations } from "next-intl";
import { useSiteTheme } from "@/components/site-theme-context";

type NewsletterSubscribeFormProps = {
  className?: string;
  publication?: "agenda" | "blog";
};

const SUBSTACK_EMBED_URLS = {
  agenda: "https://yazilimadair.substack.com/embed",
  blog: "https://poyrazavsever.substack.com/embed",
} as const;

export function NewsletterSubscribeForm({
  className = "",
  publication = "agenda",
}: NewsletterSubscribeFormProps) {
  const t = useTranslations("Home");
  const theme = useSiteTheme();
  const baseUrl = SUBSTACK_EMBED_URLS[publication];
  const embedUrl = `${baseUrl}?transparent=1`;

  return (
    <div
      className={`relative h-[4.25rem] w-full overflow-hidden ${className}`}
    >
      <iframe
        src={embedUrl}
        title={
          publication === "blog"
            ? t("blogNewsletterEmbedTitle")
            : t("agendaNewsletterEmbedTitle")
        }
        width="480"
        height="132"
        frameBorder="0"
        scrolling="no"
        loading="lazy"
        style={{
          border: 0,
          background: "transparent",
          filter:
            theme === "dark" ? "invert(1) hue-rotate(180deg)" : undefined,
          mixBlendMode: theme === "dark" ? "screen" : undefined,
        }}
        className="absolute inset-x-0 top-0 block h-[8.25rem] w-full bg-transparent"
      />
    </div>
  );
}

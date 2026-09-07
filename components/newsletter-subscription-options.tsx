"use client";

import { useTranslations } from "next-intl";
import { Typography } from "poyraz-ui/atoms";
import { NewsletterSubscribeForm } from "@/components/newsletter-subscribe-form";

type NewsletterSubscriptionOptionsProps = {
  className?: string;
};

export function NewsletterSubscriptionOptions({
  className = "",
}: NewsletterSubscriptionOptionsProps) {
  const t = useTranslations("Home");

  return (
    <div
      className={`grid w-full grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 ${className}`}
    >
      <div className="min-w-0 pb-3 sm:pr-4 sm:pb-0">
        <Typography
          variant="small"
          className="mb-2 text-sm font-medium text-foreground"
        >
          {t("blogNewsletter")}
        </Typography>
        <NewsletterSubscribeForm publication="blog" />
      </div>

      <div className="min-w-0 pt-3 sm:pt-0 sm:pl-4">
        <Typography
          variant="small"
          className="mb-2 text-sm font-medium text-foreground"
        >
          {t("agendaNewsletter")}
        </Typography>
        <NewsletterSubscribeForm publication="agenda" />
      </div>
    </div>
  );
}

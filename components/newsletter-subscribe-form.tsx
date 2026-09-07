"use client";

import { useId } from "react";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { Button, ButtonIcon, ButtonLabel } from "poyraz-ui/atoms";

type NewsletterSubscribeFormProps = {
  className?: string;
};

export function NewsletterSubscribeForm({
  className = "",
}: NewsletterSubscribeFormProps) {
  const t = useTranslations("Home");
  const generatedId = useId().replace(/:/g, "");
  const emailId = `newsletter-email-${generatedId}`;

  return (
    <div className={className}>
      <form
        action="https://yazilimadair.substack.com/api/v1/free?nojs=true"
        method="post"
        target="_blank"
        className="flex w-full flex-col gap-2 sm:flex-row"
      >
        <label htmlFor={emailId} className="sr-only">
          {t("newsletterEmailLabel")}
        </label>
        <div className="relative min-w-0 flex-1">
          <Icon
            icon="mdi:email-outline"
            width={16}
            height={16}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            placeholder={t("newsletterPlaceholder")}
            className="h-9 w-full rounded-sm border border-border bg-background pr-3 pl-9 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>
        <input type="hidden" name="source" value="embed" />
        <Button
          type="submit"
          size="sm"
          radius="sm"
          effect="swap"
          swapTarget="both"
          className="shrink-0 justify-center"
        >
          <ButtonLabel>{t("subscribe")}</ButtonLabel>
          <ButtonIcon>
            <Icon icon="mdi:arrow-right" width={15} height={15} />
          </ButtonIcon>
        </Button>
      </form>
    </div>
  );
}

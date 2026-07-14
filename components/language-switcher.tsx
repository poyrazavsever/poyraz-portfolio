"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Button } from "poyraz-ui/atoms";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "tr" ? "en" : "tr";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      type="button"
      variant="glass"
      size="icon-sm"
      radius="sm"
      onClick={toggleLanguage}
      className="min-w-9 cursor-pointer !border-border/80 text-xs font-semibold hover:!border-border focus-visible:!border-border"
      aria-label={locale === "tr" ? "Switch to English" : "Türkçe'ye geç"}
    >
      {locale === "tr" ? "EN" : "TR"}
    </Button>
  );
}

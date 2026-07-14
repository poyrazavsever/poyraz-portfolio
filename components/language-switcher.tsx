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
      variant="secondary"
      size="icon-sm"
      radius="sm"
      onClick={toggleLanguage}
      className="min-w-9 cursor-pointer text-xs font-semibold"
      aria-label={locale === "tr" ? "Switch to English" : "Türkçe'ye geç"}
    >
      {locale === "tr" ? "EN" : "TR"}
    </Button>
  );
}

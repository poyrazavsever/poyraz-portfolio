"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "tr" ? "en" : "tr";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex h-8 min-w-[36px] cursor-pointer items-center justify-center rounded-sm border border-border px-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
      aria-label={locale === "tr" ? "Switch to English" : "Türkçe'ye geç"}
      title={locale === "tr" ? "Switch to English" : "Türkçe'ye geç"}
    >
      {locale === "tr" ? "EN" : "TR"}
    </button>
  );
}

"use client";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { usePathname } from "@/i18n/routing";
import { AnnouncementBar } from "poyraz-ui/organisms";
import { SiteNavbar } from "@/components/site-navbar";
import { NekoFollower } from "@/components/neko-follower";
import { ANNOUNCEMENT_ITEMS, ENABLE_NEKO_FOLLOWER } from "@/data/site-settings";
import { useLocale } from "next-intl";
import { getLocalizedValue } from "@/lib/locale";
import dynamic from "next/dynamic";
import type { AnimationSourceSearchItem } from "@/lib/command-palette-links";

const AtaturkWidgetModal = dynamic(
  () => import("@/components/ataturk-widget-modal").then((mod) => mod.AtaturkWidgetModal),
  { ssr: false }
);

type AppShellProps = {
  children: React.ReactNode;
  animationSources: AnimationSourceSearchItem[];
};

export type ThemeMode = "light" | "dark";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";

  const storedTheme = localStorage.getItem("poyraz-theme");
  if (storedTheme === "dark" || storedTheme === "light") return storedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function AppShell({ children, animationSources }: AppShellProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const announcement = ANNOUNCEMENT_ITEMS[0];
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const isStandaloneLinksPage =
    pathname === "/links" || pathname.startsWith("/links/");
  const isStandaloneMediaKitPage =
    pathname === "/media-kit" || pathname.startsWith("/media-kit/");

  useEffect(() => {
    document.documentElement.dataset.poyrazTheme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("poyraz-theme", theme);
  }, [theme]);

  if (isStandaloneLinksPage || isStandaloneMediaKitPage) {
    return children;
  }

  const localizedText = announcement ? getLocalizedValue(announcement.text, locale) : "";

  return (
    <>
      <AtaturkWidgetModal theme={theme} />
      {ENABLE_NEKO_FOLLOWER ? <NekoFollower /> : null}
      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-4 ">
        <SiteNavbar
          theme={theme}
          onThemeChange={setTheme}
          animationSources={animationSources}
        />
        {announcement ? (
          <AnnouncementBar
            variant="branded"
            dismissible={false}
            icon={<Icon icon="mdi:sparkles" width={16} height={16} />}
          >
            {localizedText}
          </AnnouncementBar>
        ) : null}
        <main className="flex-1 py-4">{children}</main>
      </div>
    </>
  );
}

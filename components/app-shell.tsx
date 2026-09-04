"use client";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { AnnouncementBar } from "poyraz-ui/organisms";
import { SiteNavbar } from "@/components/site-navbar";
import { NekoFollower } from "@/components/neko-follower";
import { ANNOUNCEMENT_ITEMS, ENABLE_NEKO_FOLLOWER } from "@/data/site-settings";
import { useLocale } from "next-intl";
import { getLocalizedValue } from "@/lib/locale";
import dynamic from "next/dynamic";
import type { AnimationSourceSearchItem } from "@/lib/command-palette-links";
import {
  LayoutLeftPromoRail,
  LayoutRightPromoRail,
  type LayoutContentPromo,
} from "@/components/layout-promo-rails";

const AtaturkWidgetModal = dynamic(
  () => import("@/components/ataturk-widget-modal").then((mod) => mod.AtaturkWidgetModal),
  { ssr: false }
);

type AppShellProps = {
  children: React.ReactNode;
  animationSources: AnimationSourceSearchItem[];
  latestAgenda: LayoutContentPromo | null;
  latestPost: LayoutContentPromo | null;
};

export type ThemeMode = "light" | "dark";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";

  const storedTheme = localStorage.getItem("poyraz-theme");
  if (storedTheme === "dark" || storedTheme === "light") return storedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function AppShell({
  children,
  animationSources,
  latestAgenda,
  latestPost,
}: AppShellProps) {
  const locale = useLocale();
  const announcement = ANNOUNCEMENT_ITEMS[0];
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.poyrazTheme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("poyraz-theme", theme);
  }, [theme]);

  const localizedText = announcement ? getLocalizedValue(announcement.text, locale) : "";

  return (
    <>
      <AtaturkWidgetModal theme={theme} />
      {ENABLE_NEKO_FOLLOWER ? <NekoFollower /> : null}
      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 gap-4 px-4 min-[1420px]:grid-cols-[220px_minmax(0,896px)_220px] min-[1420px]:justify-between">
        <LayoutLeftPromoRail
          latestAgenda={latestAgenda}
          latestPost={latestPost}
        />
        <div className="min-w-0 w-full max-w-4xl justify-self-center min-[1420px]:max-w-none">
          <div className="pt-4">
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
          </div>
          <main className="min-w-0 py-4">{children}</main>
        </div>
        <LayoutRightPromoRail />
      </div>
    </>
  );
}

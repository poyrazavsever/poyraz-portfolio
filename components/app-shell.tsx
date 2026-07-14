"use client";

import { Icon } from "@iconify/react";
import { usePathname } from "@/i18n/routing";
import { AnnouncementBar } from "poyraz-ui/organisms";
import { SiteNavbar } from "@/components/site-navbar";
import { NekoFollower } from "@/components/neko-follower";
import { ANNOUNCEMENT_ITEMS, ENABLE_NEKO_FOLLOWER } from "@/data/site-settings";
import { useLocale } from "next-intl";
import { getLocalizedValue } from "@/lib/locale";
import dynamic from "next/dynamic";

const AtaturkWidgetModal = dynamic(
  () => import("@/components/ataturk-widget-modal").then((mod) => mod.AtaturkWidgetModal),
  { ssr: false }
);

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const announcement = ANNOUNCEMENT_ITEMS[0];
  const isStandaloneLinksPage =
    pathname === "/links" || pathname.startsWith("/links/");

  if (isStandaloneLinksPage) {
    return children;
  }

  const localizedText = announcement ? getLocalizedValue(announcement.text, locale) : "";

  return (
    <>
      <AtaturkWidgetModal />
      {ENABLE_NEKO_FOLLOWER ? <NekoFollower /> : null}
      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-4 sm:px-6">
        <SiteNavbar />
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

"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnnouncementBar } from "poyraz-ui/organisms";
import { SiteNavbar } from "@/components/site-navbar";
import { NekoFollower } from "@/components/neko-follower";
import { AtaturkWidgetModal } from "@/components/ataturk-widget-modal";
import { ANNOUNCEMENT_ITEMS, ENABLE_NEKO_FOLLOWER } from "@/data/site-settings";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const announcement = ANNOUNCEMENT_ITEMS[0];
  const isStandaloneLinksPage =
    pathname === "/links" || pathname.startsWith("/links/");

  if (isStandaloneLinksPage) {
    return children;
  }

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
            action={
              announcement.actionLabel && announcement.actionHref ? (
                <Link
                  href={announcement.actionHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold underline"
                >
                  {announcement.actionLabel}
                </Link>
              ) : null
            }
          >
            {announcement.text}
          </AnnouncementBar>
        ) : null}
        <main className="flex-1 py-4">{children}</main>
      </div>
    </>
  );
}

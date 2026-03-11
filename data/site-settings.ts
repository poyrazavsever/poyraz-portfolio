export type AnnouncementItem = {
  id: string;
  text: string;
  actionLabel: string;
  actionHref: string;
};

export const ANNOUNCEMENT_ITEMS: AnnouncementItem[] = [
  {
    id: "main-announcement",
    text: "UI Kit v2 yayında.",
    actionLabel: "İncele ->",
    actionHref: "https://ui.poyrazavsever.com",
  },
];

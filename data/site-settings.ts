export type AnnouncementItem = {
  id: string;
  text: string;
  actionLabel: string;
  actionHref: string;
};

export const ANNOUNCEMENT_ITEMS: AnnouncementItem[] = [
  {
    id: "main-announcement",
    text: "Bu hafta yeni bileşenler eklendi!",
    actionLabel: "İncele ->",
    actionHref: "https://ui.poyrazavsever.com",
  },
];

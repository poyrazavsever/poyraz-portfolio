export type AnnouncementItem = {
  id: string;
  text: string;
  actionLabel: string;
  actionHref: string;
};

export const ENABLE_NEKO_FOLLOWER = true;

export const ANNOUNCEMENT_ITEMS: AnnouncementItem[] = [
  {
    id: "main-announcement",
    text: "Yeni videom yayında.",
    actionLabel: "İzle ->",
    actionHref: "https://www.youtube.com/watch?v=FS9F1ttC0uw&t=344s",
  },
];

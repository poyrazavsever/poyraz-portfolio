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
    text: 'Yeni Projem "Neta" Yayında!',
    actionLabel: "İncele ->",
    actionHref: "https://www.takeneta.com",
  },
];

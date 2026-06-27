export type AnnouncementItem = {
  id: string;
  text: {
    tr: string;
    en: string;
  };
  actionLabel: {
    tr: string;
    en: string;
  };
  actionHref: string;
};

export const ENABLE_NEKO_FOLLOWER = true;

export const ANNOUNCEMENT_ITEMS: AnnouncementItem[] = [
  {
    id: "main-announcement",
    text: {
      tr: 'Yeni Projem "Neta" Yayında!',
      en: 'My New Project "Neta" is Live!',
    },
    actionLabel: {
      tr: "İncele ->",
      en: "Explore ->",
    },
    actionHref: "https://www.takeneta.com",
  },
];

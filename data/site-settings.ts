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
    actionHref: "https://youtu.be/7gduFQUT_20?si=5kesdltKlaoD9paS",
  },
];

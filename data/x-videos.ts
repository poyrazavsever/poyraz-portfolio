import { TRACKED_SOCIAL_HREFS } from "@/lib/links";

export type XVideo = {
  src: string;
  episode: number;
};

export const X_JAVASCRIPT_ANATOMY_VIDEOS: readonly XVideo[] = [
  {
    src: "/video/bolum11render.mp4",
    episode: 11,
  },
  {
    src: "/video/bolum12Render.mp4",
    episode: 12,
  },
];

export const X_JAVASCRIPT_ANATOMY_URL = TRACKED_SOCIAL_HREFS.x;

export type PodcastKind = "yazilim" | "masa-basi";

export type PodcastEpisode = {
  slug: string;
  title: string;
  date: string;
  youtubeUrl: string;
  spotifyUrl: string;
  podcast: PodcastKind;
  markdown: string;
};

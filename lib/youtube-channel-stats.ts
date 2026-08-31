export type YouTubeChannelStats = {
  subscribers: number | null;
  views: number;
  videos: number;
};

type YouTubeChannelsResponse = {
  items?: Array<{
    statistics?: {
      hiddenSubscriberCount?: boolean;
      subscriberCount?: string;
      viewCount?: string;
      videoCount?: string;
    };
  }>;
};

function parseCount(value: string | undefined) {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function getYouTubeChannelStats(): Promise<YouTubeChannelStats | null> {
  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  if (!apiKey) return null;

  const params = new URLSearchParams({
    part: "statistics",
    key: apiKey,
  });
  const channelId = process.env.YOUTUBE_CHANNEL_ID?.trim();

  if (channelId) {
    params.set("id", channelId);
  } else {
    params.set("forHandle", "@poyrazavsever");
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?${params.toString()}`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) return null;

    const data = (await response.json()) as YouTubeChannelsResponse;
    const statistics = data.items?.[0]?.statistics;
    const views = parseCount(statistics?.viewCount);
    const videos = parseCount(statistics?.videoCount);

    if (!statistics || views === null || videos === null) return null;

    return {
      subscribers: statistics.hiddenSubscriberCount
        ? null
        : parseCount(statistics.subscriberCount),
      views,
      videos,
    };
  } catch {
    return null;
  }
}

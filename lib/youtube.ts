const SUPPORTED_HOSTS = new Set([
  "youtube.com",
  "m.youtube.com",
  "youtu.be",
  "youtube-nocookie.com",
]);

const VIDEO_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

function normalizeHost(hostname: string) {
  return hostname.toLowerCase().replace(/^www\./, "");
}

function fromPathSegments(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length) return null;

  if (segments[0] === "watch") return null;
  if (segments[0] === "shorts" && segments[1]) return segments[1];
  if (segments[0] === "embed" && segments[1]) return segments[1];

  return segments[0];
}

export function getYoutubeVideoId(link: string) {
  try {
    const url = new URL(link);
    const host = normalizeHost(url.hostname);

    if (!SUPPORTED_HOSTS.has(host)) return null;

    const videoId = host === "youtu.be" ? fromPathSegments(url.pathname) : url.searchParams.get("v") ?? fromPathSegments(url.pathname);
    if (!videoId || !VIDEO_ID_REGEX.test(videoId)) return null;

    return videoId;
  } catch {
    return null;
  }
}

export function getYoutubeEmbedUrl(link: string) {
  const videoId = getYoutubeVideoId(link);
  if (!videoId) return null;

  // Use privacy-enhanced mode to reduce cross-site cookie noise in modern browsers.
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
}

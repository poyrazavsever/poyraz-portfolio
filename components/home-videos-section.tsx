import { Card, Typography } from "poyraz-ui/atoms";
import { YOUTUBE_VIDEO_LINKS } from "@/data/youtube-videos";

function getYoutubeEmbedUrl(link: string) {
  try {
    const url = new URL(link);
    const videoId = url.searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

export function HomeVideosSection() {
  return (
    <section className="space-y-2">
      <div className="grid gap-2 md:grid-cols-3">
        {YOUTUBE_VIDEO_LINKS.map((link) => {
          const embedUrl = getYoutubeEmbedUrl(link);

          return (
            <Card key={link} className="overflow-hidden rounded-sm border-border p-0">
              {embedUrl ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={embedUrl}
                    title="YouTube video player"
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="p-3">
                  <Typography variant="small" className="text-muted-foreground">
                    Invalid video link.
                  </Typography>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}

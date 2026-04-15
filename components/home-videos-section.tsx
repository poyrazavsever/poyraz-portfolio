import { Card } from "poyraz-ui/atoms";
import { YOUTUBE_VIDEO_LINKS } from "@/data/youtube-videos";
import { YoutubeLiteEmbed } from "@/components/youtube-lite-embed";

export function HomeVideosSection() {
  return (
    <section className="space-y-2">
      <div className="grid gap-2 md:grid-cols-3">
        {YOUTUBE_VIDEO_LINKS.map((link) => (
          <Card
            key={link}
            className="overflow-hidden rounded-sm border-border p-0"
          >
            <YoutubeLiteEmbed link={link} title="YouTube video oynatici" />
          </Card>
        ))}
      </div>
    </section>
  );
}

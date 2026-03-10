import { ContentContent } from "@/components/content-content";
import { YOUTUBE_VIDEO_LINKS } from "@/data/youtube-videos";
import { getPdfNotes, getPodcastCollections } from "@/lib/content-page";

export default async function ContentPage() {
  const [{ yazilim, masaBasi }, pdfFiles] = await Promise.all([
    getPodcastCollections(),
    getPdfNotes(),
  ]);

  return (
    <ContentContent
      yazilimEpisodes={yazilim}
      masaBasiEpisodes={masaBasi}
      youtubeLinks={YOUTUBE_VIDEO_LINKS}
      pdfFiles={pdfFiles}
    />
  );
}

import { ContentContent } from "@/components/content-content";
import { YOUTUBE_VIDEO_LINKS } from "@/data/youtube-videos";
import { getPdfNotes } from "@/lib/content-page";

export default async function ContentPage() {
  const pdfFiles = await getPdfNotes();

  return (
    <ContentContent
      youtubeLinks={YOUTUBE_VIDEO_LINKS}
      pdfFiles={pdfFiles}
    />
  );
}

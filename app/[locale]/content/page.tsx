import { ContentContent } from "@/components/content-content";
import { YOUTUBE_VIDEO_LINKS } from "@/data/youtube-videos";
import { X_JAVASCRIPT_ANATOMY_VIDEOS } from "@/data/x-videos";
import { getPdfNotes } from "@/lib/content-page";

export default async function ContentPage() {
  const pdfFiles = await getPdfNotes();

  return (
    <ContentContent
      youtubeLinks={YOUTUBE_VIDEO_LINKS}
      pdfFiles={pdfFiles}
      xVideos={X_JAVASCRIPT_ANATOMY_VIDEOS}
    />
  );
}

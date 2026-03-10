import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { PodcastEpisode, PodcastKind } from "@/data/content-types";

type EpisodeFrontmatter = {
  title: string;
  date: string;
  youtubeUrl: string;
  spotifyUrl: string;
  podcast: PodcastKind;
};

const PODCAST_DIR = path.join(process.cwd(), "content", "podcasts");
const PDF_DIR = path.join(process.cwd(), "public", "pdf");

function sortEpisodesByDateDesc(episodes: PodcastEpisode[]) {
  return [...episodes].sort((a, b) => {
    const aTime = Number(new Date(a.date));
    const bTime = Number(new Date(b.date));

    if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) {
      return bTime - aTime;
    }

    return a.title.localeCompare(b.title);
  });
}

async function readPodcastEpisodes(kind: PodcastKind): Promise<PodcastEpisode[]> {
  const folder = path.join(PODCAST_DIR, kind);
  const files = await readdir(folder);
  const mdFiles = files.filter((file) => file.endsWith(".md"));

  const episodes = await Promise.all(
    mdFiles.map(async (file) => {
      const fullPath = path.join(folder, file);
      const raw = await readFile(fullPath, "utf8");
      const parsed = matter(raw);
      const data = parsed.data as Partial<EpisodeFrontmatter>;

      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title ?? "Başlıksız Bölüm",
        date: data.date ?? "1970-01-01",
        youtubeUrl: data.youtubeUrl ?? "",
        spotifyUrl: data.spotifyUrl ?? "",
        podcast: data.podcast ?? kind,
        markdown: parsed.content.trim(),
      } satisfies PodcastEpisode;
    }),
  );

  return sortEpisodesByDateDesc(episodes);
}

export async function getPodcastCollections() {
  const [yazilim, masaBasi] = await Promise.all([
    readPodcastEpisodes("yazilim"),
    readPodcastEpisodes("masa-basi"),
  ]);

  return {
    yazilim,
    masaBasi,
  };
}

export async function getPdfNotes() {
  const files = await readdir(PDF_DIR);
  const pdfFiles = files.filter((file) => file.toLowerCase().endsWith(".pdf"));
  return pdfFiles.sort((a, b) => a.localeCompare(b));
}

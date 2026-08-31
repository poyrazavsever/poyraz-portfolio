import { readdir } from "node:fs/promises";
import path from "node:path";

const PDF_DIR = path.join(process.cwd(), "public", "pdf");
const PDF_THUMBNAIL_DIR = path.join(
  process.cwd(),
  "public",
  "pdf-thumbnails",
);
const PDF_LIMIT = 3;

export type PdfNote = {
  fileName: string;
  title: string;
  href: string;
  thumbnailSrc: string | null;
};

function formatPdfTitle(fileName: string) {
  return fileName
    .replace(/\.pdf$/i, "")
    .split(/[-_]+/)
    .map((part) => part.charAt(0).toLocaleUpperCase("tr-TR") + part.slice(1))
    .join(" ");
}

export async function getPdfNotes(): Promise<PdfNote[]> {
  const [files, thumbnailFiles] = await Promise.all([
    readdir(PDF_DIR),
    readdir(PDF_THUMBNAIL_DIR).catch(() => [] as string[]),
  ]);
  const thumbnails = new Set(thumbnailFiles);
  const pdfFiles = files.filter((file) => file.toLowerCase().endsWith(".pdf"));

  return pdfFiles
    .sort((a, b) => a.localeCompare(b, "tr"))
    .slice(0, PDF_LIMIT)
    .map((fileName) => {
      const thumbnailName = `${fileName.replace(/\.pdf$/i, "")}.jpg`;

      return {
        fileName,
        title: formatPdfTitle(fileName),
        href: `/pdf/${fileName}`,
        thumbnailSrc: thumbnails.has(thumbnailName)
          ? `/pdf-thumbnails/${thumbnailName}`
          : null,
      };
    });
}

import { readdir } from "node:fs/promises";
import path from "node:path";

const PDF_DIR = path.join(process.cwd(), "public", "pdf");

export async function getPdfNotes() {
  const files = await readdir(PDF_DIR);
  const pdfFiles = files.filter((file) => file.toLowerCase().endsWith(".pdf"));
  return pdfFiles.sort((a, b) => a.localeCompare(b));
}

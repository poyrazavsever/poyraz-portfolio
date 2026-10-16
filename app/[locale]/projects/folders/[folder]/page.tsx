import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectFolderContent } from "@/components/project-folder-content";
import { ProjectsJsonLd } from "@/components/json-ld";
import {
  getProjectFolder,
  getProjectFolderPath,
  PROJECT_FOLDER_SLUGS,
} from "@/data/project-folders";
import { getLocalizedValue } from "@/lib/locale";
import {
  createAlternates,
  getLocalizedUrl,
  type SiteLocale,
} from "@/lib/seo";

type ProjectFolderPageProps = {
  params: Promise<{ locale: string; folder: string }>;
};

export function generateStaticParams() {
  return (["tr", "en"] as SiteLocale[]).flatMap((locale) =>
    PROJECT_FOLDER_SLUGS.map((folder) => ({ locale, folder })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ProjectFolderPageProps): Promise<Metadata> {
  const { locale, folder: slug } = await params;
  const siteLocale: SiteLocale = locale === "en" ? "en" : "tr";
  const folder = getProjectFolder(slug);

  if (!folder) {
    return {
      title: siteLocale === "en" ? "Folder not found" : "Klasör bulunamadı",
    };
  }

  const path = getProjectFolderPath(folder.slug);
  const title = `${getLocalizedValue(folder.title, siteLocale)} | ${
    siteLocale === "en" ? "Projects" : "Projeler"
  }`;
  const description = getLocalizedValue(folder.description, siteLocale);

  return {
    title,
    description,
    alternates: createAlternates(siteLocale, { tr: path, en: path }),
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(siteLocale, path),
      siteName: "Poyraz Avsever",
      type: "website",
      locale: siteLocale === "en" ? "en_US" : "tr_TR",
      alternateLocale: siteLocale === "en" ? ["tr_TR"] : ["en_US"],
    },
  };
}

export default async function ProjectFolderPage({
  params,
}: ProjectFolderPageProps) {
  const { locale, folder: slug } = await params;
  const siteLocale: SiteLocale = locale === "en" ? "en" : "tr";
  const folder = getProjectFolder(slug);

  if (!folder) notFound();

  return (
    <>
      <ProjectsJsonLd
        name={getLocalizedValue(folder.title, siteLocale)}
        description={getLocalizedValue(folder.description, siteLocale)}
        url={getLocalizedUrl(siteLocale, getProjectFolderPath(folder.slug))}
        locale={siteLocale}
        projects={folder.items.map((project) => ({
          name: getLocalizedValue(project.title, siteLocale),
          description: getLocalizedValue(project.description, siteLocale),
          image: project.image,
          url: project.href,
          technologies: project.technologies,
        }))}
      />
      <ProjectFolderContent folder={folder} />
    </>
  );
}

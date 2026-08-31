import { ProjectsContent } from "@/components/projects-content";
import { ProjectsJsonLd } from "@/components/json-ld";
import {
  EXTENSIONS,
  FIGMA_TEMPLATES,
  MOBILE_APPS,
  WEB_APPS,
} from "@/data/projects";
import { getLocalizedValue } from "@/lib/locale";
import { getLocalizedUrl, getStaticPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getStaticPageMetadata({
    locale,
    page: "projects",
    path: "/projects",
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteLocale = locale === "en" ? "en" : "tr";
  const t = await getTranslations({
    locale: siteLocale,
    namespace: "Seo.projects",
  });
  const projects = [
    ...WEB_APPS,
    ...MOBILE_APPS,
    ...EXTENSIONS,
    ...FIGMA_TEMPLATES,
  ].map((project) => ({
    name: getLocalizedValue(project.title, siteLocale),
    description: getLocalizedValue(project.description, siteLocale),
    image: project.image,
    url: project.href,
    technologies: project.technologies,
  }));

  return (
    <>
      <ProjectsJsonLd
        name={t("title")}
        description={t("description")}
        url={getLocalizedUrl(siteLocale, "/projects")}
        locale={siteLocale}
        projects={projects}
      />
      <ProjectsContent />
    </>
  );
}

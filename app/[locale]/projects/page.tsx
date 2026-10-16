import { ProjectsContent } from "@/components/projects-content";
import { ProjectsJsonLd } from "@/components/json-ld";
import { ALL_PROJECTS } from "@/data/project-folders";
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
  const projects = ALL_PROJECTS.map((project) => ({
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

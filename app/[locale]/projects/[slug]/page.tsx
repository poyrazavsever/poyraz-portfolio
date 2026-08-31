import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudyContent } from "@/components/project-case-study-content";
import { ProjectCaseStudyJsonLd } from "@/components/json-ld";
import {
  getProjectCaseStudy,
  PROJECT_CASE_STUDY_SLUGS,
  type ProjectCaseStudyLocale,
} from "@/data/project-case-studies";
import {
  createAlternates,
  getAbsoluteUrl,
  getLocalizedUrl,
} from "@/lib/seo";

type ProjectCaseStudyPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return (["tr", "en"] as ProjectCaseStudyLocale[]).flatMap((locale) =>
    PROJECT_CASE_STUDY_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const siteLocale: ProjectCaseStudyLocale = locale === "en" ? "en" : "tr";
  const project = getProjectCaseStudy(slug, siteLocale);

  if (!project) {
    return {
      title: siteLocale === "en" ? "Project not found" : "Proje bulunamadı",
    };
  }

  const path = `/projects/${project.slug}`;
  const url = getLocalizedUrl(siteLocale, path);
  const socialImageUrl = getAbsoluteUrl(project.image);

  return {
    title: project.title,
    description: project.summary,
    alternates: createAlternates(siteLocale, { tr: path, en: path }),
    openGraph: {
      title: project.title,
      description: project.summary,
      url,
      siteName: "Poyraz Avsever",
      type: "website",
      locale: siteLocale === "en" ? "en_US" : "tr_TR",
      alternateLocale: siteLocale === "en" ? ["tr_TR"] : ["en_US"],
      images: [
        {
          url: socialImageUrl,
          width: 1080,
          height: 1080,
          alt: project.screenshotAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      creator: "@poyrazavsever",
      images: [{ url: socialImageUrl, alt: project.screenshotAlt }],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectCaseStudyPageProps) {
  const { locale, slug } = await params;
  const siteLocale: ProjectCaseStudyLocale = locale === "en" ? "en" : "tr";
  const project = getProjectCaseStudy(slug, siteLocale);

  if (!project) notFound();

  const url = getLocalizedUrl(siteLocale, `/projects/${project.slug}`);

  return (
    <>
      <ProjectCaseStudyJsonLd
        name={project.title}
        description={project.summary}
        url={url}
        liveUrl={project.liveUrl}
        image={project.image}
        locale={siteLocale}
        applicationCategory={project.applicationCategory}
        technologies={project.technologies}
        features={project.results.map((result) => result.description)}
      />
      <ProjectCaseStudyContent project={project} />
    </>
  );
}

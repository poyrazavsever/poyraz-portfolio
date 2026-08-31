import { ProjectsContent } from "@/components/projects-content";
import { getStaticPageMetadata } from "@/lib/seo";

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

export default function ProjectsPage() {
  return <ProjectsContent />;
}

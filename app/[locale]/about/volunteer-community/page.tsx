import { VolunteerCommunityContent } from "@/components/volunteer-community-content";
import { getStaticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getStaticPageMetadata({
    locale,
    page: "volunteerCommunity",
    path: "/about/volunteer-community",
  });
}

export default function AboutVolunteerCommunityPage() {
  return <VolunteerCommunityContent />;
}

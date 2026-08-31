import { AboutContent } from "@/components/about-content";
import { PersonJsonLd } from "@/components/json-ld";
import { getStaticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getStaticPageMetadata({ locale, page: "about", path: "/about" });
}

export default function AboutPage() {
  return (
    <>
      <PersonJsonLd
        name="Poyraz Avsever"
        jobTitle="Fullstack Developer"
        sameAs={[
          "https://github.com/poyrazavsever",
          "https://www.linkedin.com/in/poyrazavsever",
          "https://x.com/poyrazavsever",
        ]}
      />
      <AboutContent />
    </>
  );
}

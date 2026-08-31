import { AboutContent } from "@/components/about-content";
import { ProfilePageJsonLd } from "@/components/json-ld";
import { getLocalizedUrl, getStaticPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getStaticPageMetadata({ locale, page: "about", path: "/about" });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteLocale = locale === "en" ? "en" : "tr";
  const t = await getTranslations({
    locale: siteLocale,
    namespace: "Seo.about",
  });

  return (
    <>
      <ProfilePageJsonLd
        pageUrl={getLocalizedUrl(siteLocale, "/about")}
        pageName={t("title")}
        description={t("description")}
        locale={siteLocale}
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

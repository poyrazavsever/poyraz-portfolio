import { ContactContent } from "@/components/contact-content";
import { getStaticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getStaticPageMetadata({
    locale,
    page: "contact",
    path: "/contact",
  });
}

export default function ContactPage() {
  return <ContactContent />;
}

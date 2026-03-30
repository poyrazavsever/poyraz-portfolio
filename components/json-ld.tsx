const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://poyrazavsever.com";

export type PersonJsonLdProps = {
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  sameAs?: string[];
};

export function PersonJsonLd({
  name,
  url = SITE_URL,
  image = `${SITE_URL}/logo/logo.jpeg`,
  jobTitle = "Fullstack Developer",
  sameAs = [],
}: PersonJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    image,
    jobTitle,
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export type ArticleJsonLdProps = {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  authorName?: string;
};

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  authorName = "Poyraz Avsever",
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
    datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: authorName,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo/logo.jpeg`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

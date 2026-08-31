import { SITE_URL } from "@/lib/seo";

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

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
  image = `${SITE_URL}/logo/logo.webp`,
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
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export type ProfilePageJsonLdProps = PersonJsonLdProps & {
  pageUrl: string;
  pageName: string;
  description: string;
  locale: "tr" | "en";
};

export function ProfilePageJsonLd({
  pageUrl,
  pageName,
  description,
  locale,
  name,
  url = SITE_URL,
  image = `${SITE_URL}/logo/logo.webp`,
  jobTitle = "Fullstack Developer",
  sameAs = [],
}: ProfilePageJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profile-page`,
    url: pageUrl,
    name: pageName,
    description,
    inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name,
      url,
      image,
      jobTitle,
      sameAs,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export type ProjectsJsonLdItem = {
  name: string;
  description: string;
  image: string;
  url?: string;
  technologies: string[];
};

export function ProjectsJsonLd({
  name,
  description,
  url,
  locale,
  projects,
}: {
  name: string;
  description: string;
  url: string;
  locale: "tr" | "en";
  projects: ProjectsJsonLdItem[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#projects`,
    url,
    name,
    description,
    inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.name,
          description: project.description,
          image: project.image.startsWith("http")
            ? project.image
            : `${SITE_URL}${project.image}`,
          url: project.url,
          keywords: project.technologies,
          creator: {
            "@type": "Person",
            "@id": `${SITE_URL}/#person`,
            name: "Poyraz Avsever",
          },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export function ProjectCaseStudyJsonLd({
  name,
  description,
  url,
  liveUrl,
  image,
  locale,
  applicationCategory,
  technologies,
  features,
}: {
  name: string;
  description: string;
  url: string;
  liveUrl: string;
  image: string;
  locale: "tr" | "en";
  applicationCategory: string;
  technologies: string[];
  features: string[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software-application`,
    name,
    description,
    url,
    sameAs: liveUrl,
    image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
    inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    applicationCategory,
    operatingSystem: "Web",
    keywords: technologies,
    featureList: features,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Poyraz Avsever",
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
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
  locale?: "tr" | "en";
};

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  authorName = "Poyraz Avsever",
  locale = "tr",
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
    datePublished,
    dateModified: datePublished,
    inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    author: {
      "@type": "Person",
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: authorName,
      url: SITE_URL,
      image: `${SITE_URL}/logo/logo.webp`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

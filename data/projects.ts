export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  href?: string;
};

export const MOBILE_APPS: ProjectItem[] = [
  {
    id: "targiz-app",
    title: "Targiz App",
    badge: "Agritech",
    image: "/news/performance.svg",
    href: "https://targiz.com",
    description: "Ottoqua ekibiyle birlikte geliştirdiğimiz, küçük ölçekli üreticilere sahada destek veren yapay zeka destekli tarım uygulaması."
  }
];

export const WEB_APPS: ProjectItem[] = [
  {
    id: "arc-foreign-trade",
    title: "ARC Foreign Trade",
    description: "Ankara merkezli ihracat odaklı bir üretici firma için kurumsal web sitesi yenileme projesi.",
    image: "/news/performance.svg",
    badge: "Freelance",
    href: "https://arcforeigntrade.com"
  },
  {
    id: "ataturk-chronology",
    title: "Atatürk Kronolojisi",
    description: "Atatürk’ün hayatındaki önemli olayları, konuşmaları ve reformları etkileşimli bir zaman çizelgesiyle sunan web deneyimi.",
    image: "/news/design.svg",
    badge: "Timeline",
    href: "https://ataturk-kronolojisi.org"
  },
  {
    id: "mockup-factory",
    title: "Mockup Factory",
    description: "Görsellerin cihaz mockup’larına saniyeler içinde dönüştürüldüğü, tamamen tarayıcı üzerinde çalışan açık kaynak araç.",
    image: "/news/performance.svg",
    badge: "Open Source",
    href: "https://mockup-factory-mu.vercel.app/"
  }
];

export const FIGMA_TEMPLATES: ProjectItem[] = [
  {
    id: "hsd-website",
    title: "HSD Community Web Site",
    badge: "figma",
    image: "/projects/hsd.png",
    href: "https://www.figma.com/community/file/1613511833232376739",
    description: "HSD Community için Web Site tasarımı. Component, dashboard, landing page, profile sayfaları"
  }
];

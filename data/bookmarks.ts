export type BookmarkItem = {
  id: string;
  title: string;
  href: string;
  description: {
    tr: string;
    en: string;
  };
  tag: string;
};

export const BOOKMARKS: BookmarkItem[] = [
  {
    id: "bookmark-poyraz-ui",
    title: "Poyraz UI",
    href: "https://ui.poyrazavsever.com",
    description: {
      tr: "Bu portfolyoda kullanılan tasarım sistemi için bileşen dokümantasyonu ve örnekleri.",
      en: "Component docs and examples for the design system used in this portfolio.",
    },
    tag: "UI Kit",
  },
  {
    id: "bookmark-reactive-switcher",
    title: "Reactive Switcher",
    href: "https://reactive-switcher.vercel.app",
    description: {
      tr: "Ölçeklenebilir açık ve koyu mod kurulumu için tema değiştirici paket dokümantasyonu.",
      en: "Theme switching package docs for scalable light and dark mode setup.",
    },
    tag: "Theming",
  },
  {
    id: "bookmark-next-docs",
    title: "Next.js Docs",
    href: "https://nextjs.org/docs",
    description: {
      tr: "Resmi App Router ve render etme stratejisi referansı.",
      en: "Official App Router and rendering strategy reference.",
    },
    tag: "Framework",
  },
  {
    id: "bookmark-tailwind-docs",
    title: "Tailwind CSS Docs",
    href: "https://tailwindcss.com/docs",
    description: {
      tr: "Yardımcı sınıflar ve token özelleştirme referansı.",
      en: "Utility classes and token customization reference.",
    },
    tag: "CSS",
  },
  {
    id: "bookmark-vercel",
    title: "Vercel",
    href: "https://vercel.com/docs",
    description: {
      tr: "Dağıtım ve performans optimizasyonu referansları.",
      en: "Deployment and performance optimization references.",
    },
    tag: "Deploy",
  },
  {
    id: "bookmark-github",
    title: "GitHub",
    href: "https://github.com/poyrazavsever",
    description: {
      tr: "Açık kaynaklı depolarım ve yayınladığım deneysel projeler.",
      en: "Open-source repositories and shipped experiments.",
    },
    tag: "Profile",
  },
];

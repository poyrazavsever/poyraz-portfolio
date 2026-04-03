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
    image: "/projects/targiz.png",
    href: "https://targiz.com",
    description:
      "Ottoqua ekibiyle birlikte geliştirdiğimiz, küçük ölçekli üreticilere sahada destek veren yapay zeka destekli tarım uygulaması.",
  },
];

export const WEB_APPS: ProjectItem[] = [
  {
    id: "arc-foreign-trade",
    title: "ARC Foreign Trade",
    badge: "Freelance",
    image: "/projects/arc.png",
    href: "https://arcforeigntrade.com",
    description:
      "Ankara merkezli ihracat odaklı bir üretici firma için kurumsal web sitesi yenileme projesi.",
  },
  {
    id: "ataturk-chronology",
    title: "Atatürk Kronolojisi",
    badge: "Open Source",
    image: "/projects/ataturk.png",
    href: "https://ataturk-kronolojisi.org",
    description:
      "Atatürk’ün hayatındaki önemli olayları, konuşmaları ve reformları etkileşimli bir zaman çizelgesiyle sunan web deneyimi.",
  },
  {
    id: "mockup-factory",
    title: "Mockup Factory",
    badge: "Open Source",
    image: "/projects/mockup.png",
    href: "https://mockup-factory-mu.vercel.app/",
    description:
      "Görsellerin cihaz mockup’larına saniyeler içinde dönüştürüldüğü, tamamen tarayıcı üzerinde çalışan açık kaynak araç.",
  },
];

export const EXTENSIONS: ProjectItem[] = [
  {
    id: "shortcut-injector",
    title: "Shortcut Injector",
    badge: "Cross-Browser",
    image: "/projects/quick-fill.png",
    href: "https://github.com/poyrazavsever/shortcut-injector",
    description: "A cross-browser extension to quickly inject predefined personal data and links into web forms using custom keyboard shortcuts."
  },
  {
    id: "tab-audio-relay",
    title: "Tab Audio Relay",
    badge: "Corss-Browser Extension",
    image: "/projects/sound_sync.png",
    href: "https://github.com/poyrazavsever/tab-audio-relay",
    description: "A browser extension that synchronizes audio playback between tabs. Automatically plays your music when your tutorial/lecture video stops, and pauses it when you resume learning. Perfect for deep work and seamless study sessions."
  }
];

export const FIGMA_TEMPLATES: ProjectItem[] = [
  {
    id: "hsd-website",
    title: "HSD Community Web Site",
    badge: "figma",
    image: "/projects/hsd.png",
    href: "https://www.figma.com/community/file/1613511833232376739",
    description:
      "HSD Community için Web Site tasarımı. Component, dashboard, landing page, profile sayfaları",
  },
  {
    id: "restaurant-menu",
    title: "Restaurant Menu UI Design",
    badge: "Figma",
    image: "/projects/menu.png",
    href: "https://www.figma.com/community/file/1613577450975840169/restaurant-menu-ui-design",
    description: "Restaurant Menu UI Design Template for community",
  },
];

export type ProjectItem = {
  id: string;
  title: string;
  description: {
    tr: string;
    en: string;
  };
  image: string;
  badge?: {
    tr: string;
    en: string;
  } | string;
  href?: string;
};

export const MOBILE_APPS: ProjectItem[] = [
  {
    id: "targiz-app",
    title: "Targiz App",
    badge: "Agritech",
    image: "/projects/targiz.png",
    href: "https://targiz.com",
    description: {
      tr: "Ottoqua ekibiyle birlikte geliştirdiğimiz, küçük ölçekli üreticilere sahada destek veren yapay zeka destekli tarım uygulaması.",
      en: "An AI-powered agricultural application we developed with the Ottoqua team to support small-scale producers in the field.",
    },
  },
];

export const WEB_APPS: ProjectItem[] = [
  {
    id: "arc-foreign-trade",
    title: "ARC Foreign Trade",
    badge: {
      tr: "Freelance",
      en: "Freelance",
    },
    image: "/projects/arc.png",
    href: "https://arcforeigntrade.com",
    description: {
      tr: "Ankara merkezli ihracat odaklı bir üretici firma için kurumsal web sitesi yenileme projesi.",
      en: "Corporate website renewal project for an Ankara-based export-oriented manufacturer.",
    },
  },
  {
    id: "ataturk-chronology",
    title: "Atatürk Kronolojisi",
    badge: {
      tr: "Açık Kaynak",
      en: "Open Source",
    },
    image: "/projects/ataturk.png",
    href: "https://ataturk-kronolojisi.org",
    description: {
      tr: "Atatürk’ün hayatındaki önemli olayları, konuşmaları ve reformları etkileşimli bir zaman çizelgesiyle sunan web deneyimi.",
      en: "A web experience presenting important events, speeches, and reforms in Atatürk's life with an interactive timeline.",
    },
  },
  {
    id: "mockup-factory",
    title: "Mockup Factory",
    badge: {
      tr: "Açık Kaynak",
      en: "Open Source",
    },
    image: "/projects/mockup.png",
    href: "https://mockup-factory-mu.vercel.app/",
    description: {
      tr: "Görsellerin cihaz mockup’larına saniyeler içinde dönüştürüldüğü, tamamen tarayıcı üzerinde çalışan açık kaynak araç.",
      en: "An open-source tool running entirely in the browser that converts images into device mockups in seconds.",
    },
  },
  {
    id: "ohhike",
    title: "Ohhike Coach",
    badge: {
      tr: "Açık Kaynak",
      en: "Open Source",
    },
    image: "/projects/ohhike.png",
    href: "https://www.ohhike.com",
    description: {
      tr: "Spor takımları için açık kaynaklı, yapay zekâ destekli antrenörlük zekâ platformu. OhHike CoachOS; sporcu check-in'lerini, antrenman notlarını, akıllı saat verilerini ve antrenman geçmişini aksiyona geçirilebilir bir takım hafızasına dönüştürür.",
      en: "An open-source, AI-powered coaching intelligence platform for sports teams. OhHike CoachOS turns athlete check-ins, training notes, smartwatch data, and session history into actionable team memory.",
    },
  },
  {
    id: "neta",
    title: "Take Neta",
    badge: {
      tr: "Açık Kaynak",
      en: "Open Source",
    },
    image: "/projects/neta.png",
    href: "https://www.takeneta.com",
    description: {
      tr: "Dijital ikinci beyniniz. Bilinçli üretkenlik ve yaşam takibi için hepsi bir arada kişisel işletim sistemi. Yerel öncelikli, yapay zekâ entegrasyonlu ve açık kaynaklı.",
      en: "Your digital second brain. An all-in-one personal operating system for mindful productivity and life-tracking. Local-first, AI-integrated, and open-source.",
    },
  },
];

export const EXTENSIONS: ProjectItem[] = [
  {
    id: "shortcut-injector",
    title: "Shortcut Injector",
    badge: {
      tr: "Çapraz Tarayıcı",
      en: "Cross-Browser",
    },
    image: "/projects/quick-fill.png",
    href: "https://github.com/poyrazavsever/shortcut-injector",
    description: {
      tr: "Özel klavye kısayollarını kullanarak önceden tanımlanmış kişisel verileri ve bağlantıları web formlarına hızlıca enjekte etmek için geliştirilmiş bir tarayıcı eklentisi.",
      en: "A cross-browser extension to quickly inject predefined personal data and links into web forms using custom keyboard shortcuts.",
    },
  },
  {
    id: "tab-audio-relay",
    title: "Tab Audio Relay",
    badge: {
      tr: "Çapraz Tarayıcı",
      en: "Cross-Browser",
    },
    image: "/projects/sound_sync.png",
    href: "https://github.com/poyrazavsever/tab-audio-relay",
    description: {
      tr: "Sekmeler arasındaki ses çalma işlemlerini senkronize eden bir tarayıcı eklentisi. Eğitim videonuz durduğunda müziğinizi otomatik olarak oynatır, eğitime devam ettiğinizde ise müziği duraklatır.",
      en: "A browser extension that synchronizes audio playback between tabs. Automatically plays your music when your tutorial/lecture video stops, and pauses it when you resume learning. Perfect for deep work and seamless study sessions.",
    },
  },
];

export const FIGMA_TEMPLATES: ProjectItem[] = [
  {
    id: "hsd-website",
    title: "HSD Community Web Site",
    badge: "Figma",
    image: "/projects/hsd.png",
    href: "https://www.figma.com/community/file/1613511833232376739",
    description: {
      tr: "HSD Community için Web Site tasarımı. Bileşenler, kontrol paneli, açılış sayfası, profil sayfaları.",
      en: "Web Site design for HSD Community. Components, dashboard, landing page, profile pages.",
    },
  },
  {
    id: "restaurant-menu",
    title: "Restaurant Menu UI Design",
    badge: "Figma",
    image: "/projects/menu.png",
    href: "https://www.figma.com/community/file/1613577450975840169/restaurant-menu-ui-design",
    description: {
      tr: "Topluluk için Restaurant Menü Arayüz Tasarımı şablonu.",
      en: "Restaurant Menu UI Design Template for the community.",
    },
  },
];

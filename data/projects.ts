export type ProjectItem = {
  id: string;
  title: {
    tr: string;
    en: string;
  } | string;
  description: {
    tr: string;
    en: string;
  };
  image: string;
  technologies: string[];
  architecture: {
    tr: string;
    en: string;
  };
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
    technologies: ["Next.js", "Supabase"],
    architecture: {
      tr: "Atomic Design yaklaşımıyla oluşturulmuş, Supabase tabanlı modüler uygulama mimarisi.",
      en: "A modular, Supabase-backed application architecture built with the Atomic Design approach.",
    },
    href: "https://targiz.com",
    description: {
      tr: "Ottoqua ekibiyle birlikte geliştirdiğimiz, küçük ölçekli üreticilere sahada destek veren yapay zeka destekli tarım uygulaması.",
      en: "An AI-powered agricultural application we developed with the Ottoqua team to support small-scale producers in the field.",
    },
  },
];

const OSTIM_TECHNOLOGIES = [
  ".NET 10",
  "Angular",
  "Astro",
  "OMD UI Kit",
  "Tailwind CSS",
];

export const WEB_APPS: ProjectItem[] = [
  {
    id: "ostim-web-portal",
    title: {
      tr: "OSTİM Web Portalı",
      en: "OSTİM Web Portal",
    },
    badge: {
      tr: "Kurumsal Portal",
      en: "Corporate Portal",
    },
    image: "/projects/ostim.webp",
    href: "https://ostim.org.tr",
    technologies: OSTIM_TECHNOLOGIES,
    architecture: {
      tr: "OSTİM Organize Sanayi Bölgesi ve yedi kümeye ait kurumsal içerikleri, firma ve ürün aramasını, çevrim içi işlemleri ve iletişim akışlarını tek portalda birleştiren çok bölümlü yapı.",
      en: "A multi-section architecture combining corporate content for OSTİM Organized Industrial Zone and its seven clusters with company and product search, online services, and communication flows in one portal.",
    },
    description: {
      tr: "OSTİM Organize Sanayi Bölgesi ve yedi kümesi için geliştirdiğimiz kapsamlı kurumsal web portalı.",
      en: "A comprehensive corporate web portal we developed for OSTİM Organized Industrial Zone and its seven clusters.",
    },
  },
  {
    id: "ostim-employment",
    title: {
      tr: "OSTİM İstihdam",
      en: "OSTİM Employment",
    },
    badge: {
      tr: "İstihdam Portalı",
      en: "Employment Portal",
    },
    image: "/projects/ostim-istihdam.webp",
    href: "https://ostimistihdam.com",
    technologies: OSTIM_TECHNOLOGIES,
    architecture: {
      tr: "İŞKUR senkronizasyonu üzerine kurulu; aday, işveren, iş ve staj ilanı akışlarını yapay zekâ destekli eşleştirme katmanıyla buluşturan rol tabanlı portal mimarisi.",
      en: "A role-based portal architecture built around İŞKUR synchronization, connecting candidate, employer, job, and internship workflows through an AI-assisted matching layer.",
    },
    description: {
      tr: "İŞKUR ile senkron çalışan, adayları iş ve staj fırsatlarıyla buluşturan istihdam portalı.",
      en: "An employment portal synchronized with İŞKUR that connects candidates with job and internship opportunities.",
    },
  },
  {
    id: "ostim-foreign-trade",
    title: {
      tr: "OSTİM Dış Ticaret",
      en: "OSTİM Foreign Trade",
    },
    badge: {
      tr: "Dış Ticaret Portalı",
      en: "Foreign Trade Portal",
    },
    image: "/projects/ostim-dis-ticaret.webp",
    href: "https://ostimdisticaret.net",
    technologies: OSTIM_TECHNOLOGIES,
    architecture: {
      tr: "Dış ticaret firmaları, ilanlar ve yabancı dil bilen öğrenciler için ayrı kayıt ve başvuru akışlarını ortak bir eşleştirme ve ilan havuzunda birleştiren çok taraflı portal mimarisi.",
      en: "A multi-sided portal architecture that brings registration and application flows for foreign-trade companies, listings, and multilingual students into a shared matching and opportunity pool.",
    },
    description: {
      tr: "Dış ticaret yapan firmaları yabancı dil bilen öğrencilerle buluşturmaya odaklanan portal.",
      en: "A portal focused on matching foreign-trade companies with students who speak foreign languages.",
    },
  },
  {
    id: "arc-foreign-trade",
    title: "ARC Foreign Trade",
    badge: {
      tr: "Freelance",
      en: "Freelance",
    },
    image: "/projects/arc.webp",
    technologies: ["Wix"],
    architecture: {
      tr: "Wix üzerinde yönetilebilir içerik ve kurumsal tanıtım sayfalarından oluşan, ihracat odaklı web sitesi yapısı.",
      en: "An export-focused website architecture built on Wix with manageable content and corporate presentation pages.",
    },
    href: "https://arcforeigntrade.com",
    description: {
      tr: "Ankara merkezli ihracat odaklı bir üretici firma için kurumsal web sitesi yenileme projesi.",
      en: "Corporate website renewal project for an Ankara-based export-oriented manufacturer.",
    },
  },
  {
    id: "ataturk-chronology",
    title: {
      tr: "Atatürk Kronolojisi",
      en: "Atatürk Chronology",
    },
    badge: {
      tr: "Açık Kaynak",
      en: "Open Source",
    },
    image: "/projects/ataturk.webp",
    technologies: ["React"],
    architecture: {
      tr: "React ile geliştirilen, kronoloji verisini etkileşimli bir zaman çizelgesi arayüzünde sunan istemci taraflı uygulama.",
      en: "A client-side React application presenting chronology data through an interactive timeline interface.",
    },
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
    technologies: ["Next.js"],
    architecture: {
      tr: "Next.js tabanlı, görsel işleme akışını tamamen tarayıcıda çalıştıran istemci öncelikli araç mimarisi.",
      en: "A client-first Next.js tool architecture that runs its image-processing workflow entirely in the browser.",
    },
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
    technologies: ["React", "Express.js", "Better Auth", "better-sqlite3"],
    architecture: {
      tr: "Landing page, uygulama ve API katmanlarını aynı çalışma alanında yöneten; React arayüzü ve Express API'sinden oluşan monorepo.",
      en: "A monorepo managing the landing page, application, and API in one workspace, with a React interface and Express API.",
    },
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
    technologies: ["Next.js", "Express.js"],
    architecture: {
      tr: "Landing page, uygulama ve API paketlerini birlikte yöneten Next.js ve Express.js tabanlı monorepo mimarisi.",
      en: "A Next.js and Express.js monorepo architecture managing landing page, application, and API packages together.",
    },
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
    technologies: ["JavaScript"],
    architecture: {
      tr: "Tarayıcı eklentisi API'leriyle çalışan, kısayol tanımlarını form alanlarına bağlayan çapraz tarayıcı JavaScript yapısı.",
      en: "A cross-browser JavaScript extension architecture that connects shortcut definitions to form fields through browser extension APIs.",
    },
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
    technologies: ["JavaScript"],
    architecture: {
      tr: "Sekmelerin medya durumlarını izleyip oynatma komutlarını ileten olay tabanlı, çapraz tarayıcı eklenti mimarisi.",
      en: "An event-driven, cross-browser extension architecture that observes media state across tabs and relays playback commands.",
    },
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
    title: "HSD Community Website",
    badge: "Figma",
    image: "/projects/hsd.png",
    technologies: ["Figma"],
    architecture: {
      tr: "Bileşenler, kontrol paneli, açılış sayfası ve profil ekranlarını doğrudan Figma içinde düzenleyen bileşen tabanlı tasarım dosyası.",
      en: "A component-based design file organized directly in Figma across components, dashboard, landing page, and profile screens.",
    },
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
    technologies: ["Figma"],
    architecture: {
      tr: "Tekrar kullanılabilir arayüz parçaları ve menü varyasyonlarından oluşan, doğrudan Figma üzerinde hazırlanan tasarım şablonu.",
      en: "A design template created directly in Figma with reusable interface elements and menu variants.",
    },
    href: "https://www.figma.com/community/file/1613577450975840169/restaurant-menu-ui-design",
    description: {
      tr: "Topluluk için Restaurant Menü Arayüz Tasarımı şablonu.",
      en: "Restaurant Menu UI Design Template for the community.",
    },
  },
];

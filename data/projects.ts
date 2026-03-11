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
    description:
      "Ottoqua ekibiyle birlikte geliştirdiğimiz, küçük ölçekli üreticilere sahada destek veren yapay zeka destekli tarım uygulaması.",
    image: "/images/hero1.png",
    badge: "Agritech",
    href: "https://ottoqua.com",
  },
  {
    id: "pixel-sinav",
    title: "Pixel Sınav",
    description:
      "Pixel art odaklı arayüzüyle zamanlı deneme ve soru çözümü sunan oyunlaştırılmış sınav hazırlık platformu.",
    image: "/news/design.svg",
    badge: "Education",
    href: "https://github.com/poyrazavsever/PixelSinav-Frontend",
  },
  {
    id: "movie-app",
    title: "Movie Discovery App",
    description:
      "TMDb API kullanan, izleme listesi ve ruh haline göre filtreleme özellikleriyle film keşfini kolaylaştıran yan proje.",
    image: "/images/hero2.png",
    badge: "TMDb",
    href: "https://movie-app-v2-zcp7.vercel.app",
  },
];

export const WEB_APPS: ProjectItem[] = [
  {
    id: "arc-foreign-trade",
    title: "ARC Foreign Trade",
    description:
      "Ankara merkezli ihracat odaklı bir üretici firma için kurumsal web sitesi yenileme projesi.",
    image: "/news/performance.svg",
    badge: "Freelance",
    href: "https://arcforeigntrade.com",
  },
  {
    id: "ataturk-chronology",
    title: "Atatürk Kronolojisi",
    description:
      "Atatürk’ün hayatındaki önemli olayları, konuşmaları ve reformları etkileşimli bir zaman çizelgesiyle sunan web deneyimi.",
    image: "/news/design.svg",
    badge: "Timeline",
    href: "https://ataturk-kronolojisi.org",
  },
  {
    id: "urun-uncu",
    title: "Ürün Üncü",
    description:
      "Dijital ürün, isteğe bağlı video ve bire bir danışmanlık satışı yapılan tam kapsamlı e-ticaret platformu.",
    image: "/images/hero1.png",
    badge: "Commerce",
    href: "https://urununcu.com",
  },
  {
    id: "mockup-factory",
    title: "Mockup Factory",
    description:
      "Görsellerin cihaz mockup’larına saniyeler içinde dönüştürüldüğü, tamamen tarayıcı üzerinde çalışan açık kaynak araç.",
    image: "/news/performance.svg",
    badge: "Open Source",
    href: "https://mockup-factory-mu.vercel.app/",
  },
];

export const FIGMA_TEMPLATES: ProjectItem[] = [
  {
    id: "reactive-switcher",
    title: "Reactive Switcher",
    description:
      "React ve Tailwind v4 için type-safe, zero-runtime tema geçişi sağlayan açık kaynak paket.",
    image: "/news/design.svg",
    badge: "npm",
    href: "https://reactive-switcher-j9qb.vercel.app/",
  },
  {
    id: "reactive-image",
    title: "Reactive Image",
    description:
      "Statik görselleri animasyonlu ve tema uyumlu hale getiren, hero alanları için geliştirilmiş React bileşeni.",
    image: "/news/performance.svg",
    badge: "React",
    href: "https://reactive-image.vercel.app",
  },
  {
    id: "readme-maker",
    title: "README Maker",
    description:
      "Canlı önizleme ve dışa aktarma özellikleri sunan, GitHub profil README üretimini kolaylaştıran araç.",
    image: "/images/hero2.png",
    badge: "Tooling",
    href: "https://readme-maker-eight.vercel.app",
  },
];

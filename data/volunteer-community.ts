export type VolunteerCommunityItem = {
  id: string;
  title: string;
  timeline: {
    tr: string;
    en: string;
  } | string;
  link?: string;
  focus: {
    tr: string;
    en: string;
  };
};

export const VOLUNTEER_COMMUNITY_ITEMS: VolunteerCommunityItem[] = [
  {
    id: "youtube",
    title: "YouTube",
    timeline: {
      tr: "2025 - Günümüz",
      en: "2025 - Present",
    },
    link: "https://youtube.com/@poyrazavsever",
    focus: {
      tr: "Yeni geliştiricilerin ilk projelerini yayına almalarına yardımcı olmak için içerik üretici ekonomisi analizleri ve eğitimleri yayınlamak.",
      en: "Publishing creator economy breakdowns and tutorials to help new devs ship their first projects.",
    },
  },
  {
    id: "instagram",
    title: "Instagram",
    timeline: {
      tr: "2025 - Günümüz",
      en: "2025 - Present",
    },
    link: "https://instagram.com/poyrazavsever",
    focus: {
      tr: "Geliştirici adayları için kamera arkası iş akışı notları ve kısa biçimli içerik ipuçları paylaşmak.",
      en: "Sharing behind-the-scenes workflow notes and short-form content tips for junior creatives.",
    },
  },
  {
    id: "ostim-debate-club",
    title: "Ostim Debate Club",
    timeline: {
      tr: "2024 - Günümüz",
      en: "2024 - Present",
    },
    link: "https://ostimmunazara.com",
    focus: {
      tr: "Haftalık münazara oturumlarını modere etmek ve web sitesi içeriğini güncel tutmak.",
      en: "Moderating weekly debate sessions and keeping the website content updated.",
    },
  },
  {
    id: "huawei-student-developers",
    title: "Huawei Student Developers",
    timeline: {
      tr: "2025 - 2026",
      en: "2025 - 2026",
    },
    link: "https://hsdostim.tech",
    focus: {
      tr: "Huawei'in geliştirici araçları etrafında kampüs etkinlikleri düzenlemek ve ilk kez katkıda bulunacaklara mentorluk yapmak.",
      en: "Organizing campus events around Huawei's developer tooling and mentoring first-time contributors.",
    },
  },
  {
    id: "google-developer-student-club",
    title: "Google Developer Student Club",
    timeline: {
      tr: "2025 - 2025",
      en: "2025 - 2025",
    },
    focus: {
      tr: "Bir dönem boyunca Flutter temelleri ve Firebase başlangıçlarını kapsayan etkinlik kolaylaştırıcısı olarak görev aldım.",
      en: "Served as an event facilitator for one term, covering Flutter basics and Firebase quickstarts.",
    },
  },
  {
    id: "ottoqa-technology-team",
    title: "Ottoqa Technology Team",
    timeline: {
      tr: "2024 - Günümüz",
      en: "2024 - Present",
    },
    focus: {
      tr: "Robotik ve gömülü sistemler deneylerini dokümantasyon ve prototip incelemeleri ile desteklemek.",
      en: "Supporting robotics and embedded systems experiments with documentation and prototype reviews.",
    },
  },
];

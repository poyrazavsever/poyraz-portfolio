export type Reference = {
  id: string;
  quote: {
    tr: string;
    en: string;
  };
  author: string;
  role: {
    tr: string;
    en: string;
  } | string;
  avatar: string;
  rating?: number;
  profileHref?: string;
};

export const REFERENCES: Reference[] = [
  {
    id: "ali-korkmaz",
    author: "Ali Korkmaz",
    role: {
      tr: "Müşteri - 2025",
      en: "Client - 2025",
    },
    rating: 5,
    avatar: "/avatars/ali.png",
    quote: {
      tr: "Web sitesi tam olarak istediğim gibi oldu. Poyraz benim gözden kaçırdığım detayları da düşündü, her kararı şeffaf şekilde anlattı ve beklentimin üstünde bir iş teslim etti.",
      en: "The website turned out exactly as I wanted. Poyraz thought of the details I missed, explained every decision transparently, and delivered a job beyond my expectations.",
    },
  },
  {
    id: "halil-ibrahim-sabo",
    author: "Halil Ibrahim Sabo",
    role: {
      tr: "Ürün Yöneticisi - 2024",
      en: "Product Manager - 2024",
    },
    rating: 5,
    avatar: "/avatars/halil.png",
    profileHref: "https://www.linkedin.com/in/halil-ibrahim-sabo-18a03a251/",
    quote: {
      tr: "Poyraz çok başarılı ve çalışkan bir genç adam. Çok dürüst ve şeffaf bir yaklaşımı var. Başarılarının devam ettiğini görmekten mutluluk duyuyorum.",
      en: "Poyraz is a very successful and hardworking young man. He has a very honest and transparent approach. I am happy to see his continued success.",
    },
  },
  {
    id: "berat-arslan",
    author: "Berat Arslan",
    role: {
      tr: "Grafik Tasarımcı - 2025",
      en: "Graphic Designer - 2025",
    },
    avatar: "/avatars/berat.png",
    profileHref: "https://www.linkedin.com/in/beratarslan21/",
    quote: {
      tr: "Hem hırslı hem de işine gerçekten tutkulu bir takım arkadaşı. Poyraz ile çalışmak keyifliydi; merakını hep korudu, güvenilir şekilde teslim etti ve iş birliğini kolaylaştırdı.",
      en: "He is a teammate who is both ambitious and truly passionate about his work. Working with Poyraz was a pleasure; he always kept his curiosity, delivered reliably, and facilitated collaboration.",
    },
  },
  {
    id: "bugrahan-arici",
    author: "Buğrahan Arıcı",
    role: {
      tr: "Dış Ticaret Uzmanı - 2025",
      en: "Foreign Trade Specialist - 2025",
    },
    avatar: "/avatars/bugrahan.jpg",
    profileHref:
      "https://www.linkedin.com/in/bu%C4%9Frahan-ar%C4%B1c%C4%B1-8487b6275/",
    quote: {
      tr: "Poyraz ile ilk olarak kurucusu olduğum ARC Foreign Trade bünyesinde yarı zamanlı olarak çalıştık. İş ahlakı, yazılım konusundaki yetkinliği ve çözüm odaklı yapısıyla süreçlerimize büyük katkı sağladı. Kendisinin çalışma disiplininden o kadar memnun kaldık ki, yarı zamanlı süreci bittikten sonra da ARC Spare Parts ve diğer işlerimiz için kendisiyle freelance yazılımcı olarak çalışmaya devam ettik. Verilen işi her zaman eksiksiz ve zamanında teslim eden, son derece güvenilir biridir. Kendisiyle çalışmayı düşünen herkese kesinlikle tavsiye ederim.",
      en: "We first worked with Poyraz part-time at ARC Foreign Trade, of which I am the founder. He contributed greatly to our processes with his work ethic, software competence, and solution-oriented nature. We were so satisfied with his work discipline that we continued to work with him as a freelance developer for ARC Spare Parts and other businesses after his part-time period ended. He is extremely reliable, always delivering the given work completely and on time. I would recommend him to anyone considering working with him.",
    },
  },
  {
    id: "ada-raimova",
    author: "Ada Raimova",
    role: "Founder @ Shipin, Ambassador @ Lovable",
    avatar: "/avatars/ada.png",
    profileHref:
      "https://www.linkedin.com/in/bu%C4%9Frahan-ar%C4%B1c%C4%B1-8487b6275/",
    quote: {
      tr: "Shipin'in ilk günlerinden beri Poyraz ile çalışıyorum ve profesyonelliği beni etkilemeye devam ediyor. Güçlü teknik beceriler ile başkalarına öğretme tutkusunu nadir bulunan bir şekilde birleştiriyor. Onun hakkında tek bir şey söyleyecek olsaydım, o da güvenilirliği olurdu. Asla yapabileceğinden fazlasını vaat etmez, taahhütlerini her zaman yerine getirir ve işini geliştirmek için geri bildirimleri samimiyetle uygular.",
      en: "I've been working with Poyraz since the early days of Shipin, and he continues to impress me with his professionalism. He has a rare combination of solid technical skills and passion for teaching others. If I was to say one thing about him, it would be his reliability. He never over-promises, always delivers on his commitments, and genuinely incorporates feedback to improve his work.",
    },
  },
];

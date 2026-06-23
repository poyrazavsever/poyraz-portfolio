export type Reference = {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating?: number;
  profileHref?: string;
};

export const REFERENCES: Reference[] = [
  {
    id: "ali-korkmaz",
    author: "Ali Korkmaz",
    role: "Müşteri - 2025",
    rating: 5,
    avatar: "/avatars/ali.png",
    quote:
      "Web sitesi tam olarak istediğim gibi oldu. Poyraz benim gözden kaçırdığım detayları da düşündü, her kararı şeffaf şekilde anlattı ve beklentimin üstünde bir iş teslim etti.",
  },
  {
    id: "halil-ibrahim-sabo",
    author: "Halil Ibrahim Sabo",
    role: "Ürün Yöneticisi - 2024",
    rating: 5,
    avatar: "/avatars/halil.png",
    profileHref: "https://www.linkedin.com/in/halil-ibrahim-sabo-18a03a251/",
    quote:
      "Poyraz çok başarılı ve çalışkan bir genç adam. Çok dürüst ve şeffaf bir yaklaşımı var. Başarılarının devam ettiğini görmekten mutluluk duyuyorum.",
  },
  {
    id: "berat-arslan",
    author: "Berat Arslan",
    role: "Grafik Tasarımcı - 2025",
    avatar: "/avatars/berat.png",
    profileHref: "https://www.linkedin.com/in/beratarslan21/",
    quote:
      "Hem hırslı hem de işine gerçekten tutkulu bir takım arkadaşı. Poyraz ile çalışmak keyifliydi; merakını hep korudu, güvenilir şekilde teslim etti ve iş birliğini kolaylaştırdı.",
  },
  {
    id: "bugrahan-arici",
    author: "Buğrahan Arıcı",
    role: "Dış Ticaret Uzmanı - 2025",
    avatar: "/avatars/bugrahan.jpg",
    profileHref:
      "https://www.linkedin.com/in/bu%C4%9Frahan-ar%C4%B1c%C4%B1-8487b6275/",
    quote:
      "Poyraz ile ilk olarak kurucusu olduğum ARC Foreign Trade bünyesinde yarı zamanlı olarak çalıştık. İş ahlakı, yazılım konusundaki yetkinliği ve çözüm odaklı yapısıyla süreçlerimize büyük katkı sağladı.     Kendisinin çalışma disiplininden o kadar memnun kaldık ki, yarı zamanlı süreci bittikten sonra da ARC Spare Parts ve diğer işlerimiz için kendisiyle freelance yazılımcı olarak çalışmaya devam ettik. Verilen işi her zaman eksiksiz ve zamanında teslim eden, son derece güvenilir biridir. Kendisiyle çalışmayı düşünen herkese kesinlikle tavsiye ederim.",
  },
  {
    id: "ada-raimova",
    author: "Ada Raimova",
    role: "Founder @ Shipin, Ambassador @ Lovable",
    avatar: "/avatars/ada.png",
    profileHref:
      "https://www.linkedin.com/in/bu%C4%9Frahan-ar%C4%B1c%C4%B1-8487b6275/",
    quote:
      "I've been working with Poyraz since the early days of Shipin, and he continues to impress me with his professionalism. He has a rare combination of solid technical skills and passion for teaching others. If I was to say one thing about him, it would be his reliability. He never over-promises, always delivers on his commitments, and genuinely incorporates feedback to improve his work.",
  },
];

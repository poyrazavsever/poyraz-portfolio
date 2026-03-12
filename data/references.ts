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
];

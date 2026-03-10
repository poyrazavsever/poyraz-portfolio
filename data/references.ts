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
    role: "Client - 2025",
    rating: 5,
    avatar: "/avatars/ali.png",
    quote:
      "The website turned out exactly as I wanted. Poyraz considered the details I missed, explained every decision transparently, and delivered something even better than I expected.",
  },
  {
    id: "halil-ibrahim-sabo",
    author: "Halil Ibrahim Sabo",
    role: "Product Manager - 2024",
    rating: 5,
    avatar: "/avatars/halil.png",
    profileHref: "https://www.linkedin.com/in/halil-ibrahim-sabo-18a03a251/",
    quote:
      "Poyraz is a hardworking builder with an honest, transparent approach. Collaborating with him feels effortless because he keeps everyone aligned and handles edge cases calmly.",
  },
  {
    id: "berat-arslan",
    author: "Berat Arslan",
    role: "Graphic Designer - 2025",
    avatar: "/avatars/berat.png",
    profileHref: "https://www.linkedin.com/in/beratarslan21/",
    quote:
      "A teammate who is both ambitious and deeply passionate about his craft. Working with Poyraz was a pleasure; he stayed curious, delivered reliably, and made the collaboration feel easy.",
  },
];

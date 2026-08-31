export type Sponsor = {
  id: string;
  name: string;
  job: string;
  logo: string;
  websiteUrl?: string;
};

export const SPONSORS: Sponsor[] = [
  {
    id: "hostinger",
    name: "Hostinger",
    job: "Web Hosting",
    logo: "/sponsors/hostinger.png",
    websiteUrl: "https://hostinger.com/poyraz",
  },
  {
    id: "testsprite",
    name: "TestSprite",
    job: "Yazılım Test Otomasyonu",
    logo: "/sponsors/testsprite.png",
    websiteUrl: "https://www.testsprite.com/?via=poyraz",
  },
  {
    id: "minimax",
    name: "MiniMax",
    job: "AI Video & Model Platformu",
    logo: "/sponsors/minimax.png",
    websiteUrl:
      "https://platform.minimax.io/subscribe/coding-plan?code=7aH9b0Ya7c&source=link",
  },
  {
    id: "higgsfield",
    name: "Higgsfield",
    job: "AI Creative Suite",
    logo: "/sponsors/higgsfield.png",
    websiteUrl:
      "https://higgsfield.ai/s/higgsfield-mcp-3-0-yt-poyrazavsever-lLvqMw",
  },
  {
    id: "hosting-dunyam",
    name: "Hosting Dünyam",
    job: "Hosting Sağlayıcısı",
    logo: "/sponsors/hosting-dunyam.png",
    websiteUrl: "https://hostingdunyam.com",
  },
];

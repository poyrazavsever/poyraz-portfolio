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
    websiteUrl: "https://hostinger.com",
  },
  {
    id: "testsprite",
    name: "TestSprite",
    job: "Yazılım Test Otomasyonu",
    logo: "/sponsors/testsprite.png",
    websiteUrl: "https://testsprite.com",
  },
];

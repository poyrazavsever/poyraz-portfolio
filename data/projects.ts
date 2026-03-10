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
    id: "mobile-habit-flow",
    title: "Habit Flow",
    description:
      "A mobile-first productivity app focused on clean habit tracking, reminders, and weekly review loops.",
    image: "/images/hero1.png",
    badge: "React Native",
  },
  {
    id: "mobile-campus-connect",
    title: "Campus Connect",
    description:
      "Event and club discovery app prototype for university communities with role-based content publishing.",
    image: "/images/hero2.png",
    badge: "Expo",
  },
];

export const WEB_APPS: ProjectItem[] = [
  {
    id: "web-portfolio",
    title: "Personal Portfolio",
    description:
      "A minimal portfolio system with blog details, command palette navigation, and reusable design system primitives.",
    image: "/news/design.svg",
    badge: "Next.js",
    href: "https://poyrazavsever.com",
  },
  {
    id: "web-poyraz-ui-docs",
    title: "Poyraz UI Docs",
    description:
      "Documentation and showcase site for the UI kit, including component examples and implementation patterns.",
    image: "/news/performance.svg",
    badge: "poyraz-ui",
    href: "https://ui.poyrazavsever.com",
  },
];

export const FIGMA_TEMPLATES: ProjectItem[] = [
  {
    id: "figma-minimal-saas",
    title: "Minimal SaaS Landing Kit",
    description:
      "Landing page template set with token-based spacing and typography scales for fast startup launches.",
    image: "/news/design.svg",
    badge: "Figma",
    href: "https://www.behance.net/poyrazavsever",
  },
  {
    id: "figma-dashboard-clean",
    title: "Clean Dashboard Blocks",
    description:
      "Reusable dashboard cards and layout blocks designed for rapid MVP iteration and design consistency.",
    image: "/news/performance.svg",
    badge: "Design System",
    href: "https://www.behance.net/poyrazavsever",
  },
];

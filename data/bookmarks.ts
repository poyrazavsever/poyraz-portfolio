export type BookmarkItem = {
  id: string;
  title: string;
  href: string;
  description: string;
  tag: string;
};

export const BOOKMARKS: BookmarkItem[] = [
  {
    id: "bookmark-poyraz-ui",
    title: "Poyraz UI",
    href: "https://ui.poyrazavsever.com",
    description: "Component docs and examples for the design system used in this portfolio.",
    tag: "UI Kit",
  },
  {
    id: "bookmark-reactive-switcher",
    title: "Reactive Switcher",
    href: "https://reactive-switcher.vercel.app",
    description: "Theme switching package docs for scalable light and dark mode setup.",
    tag: "Theming",
  },
  {
    id: "bookmark-next-docs",
    title: "Next.js Docs",
    href: "https://nextjs.org/docs",
    description: "Official App Router and rendering strategy reference.",
    tag: "Framework",
  },
  {
    id: "bookmark-tailwind-docs",
    title: "Tailwind CSS Docs",
    href: "https://tailwindcss.com/docs",
    description: "Utility classes and token customization reference.",
    tag: "CSS",
  },
  {
    id: "bookmark-vercel",
    title: "Vercel",
    href: "https://vercel.com/docs",
    description: "Deployment and performance optimization references.",
    tag: "Deploy",
  },
  {
    id: "bookmark-github",
    title: "GitHub",
    href: "https://github.com/poyrazavsever",
    description: "Open-source repositories and shipped experiments.",
    tag: "Profile",
  },
];

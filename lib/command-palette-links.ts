import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/links";

export type CommandPaletteItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
  external?: boolean;
};

export type CommandPaletteGroup = {
  id: string;
  heading: string;
  items: CommandPaletteItem[];
};

export const COMMAND_PALETTE_GROUPS: CommandPaletteGroup[] = [
  {
    id: "navigation",
    heading: "Navigation",
    items: NAV_LINKS.map((item) => ({
      id: item.id,
      label: item.label,
      href: item.href,
      icon: "mdi:compass-outline",
    })),
  },
  {
    id: "social",
    heading: "Social",
    items: SOCIAL_LINKS.map((item) => ({
      id: item.id,
      label: item.label,
      href: item.href,
      icon: item.icon,
      external: true,
    })),
  },
] as const;

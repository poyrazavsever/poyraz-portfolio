"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage, Separator } from "poyraz-ui/atoms";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "poyraz-ui/molecules";
import { SearchCommand } from "@/components/search-command";
import { useKeyboardShortcutLabel } from "@/lib/use-keyboard-shortcut-label";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/links";

const TOP_ICON_LINKS = [
  {
    id: "ui-kit",
    label: "UI Kit",
    href: "https://ui.poyrazavsever.com",
    icon: "mdi:palette-swatch-outline",
    external: true,
  },
  {
    id: "52-weeks-js",
    label: "52 Weeks of JS",
    href: "https://js.poyrazavsever.com",
    icon: "mdi:code-json",
    external: true,
  },
  {
    id: "rss",
    label: "RSS",
    href: "/rss.xml",
    icon: "mdi:rss",
    external: false,
  },
  {
    id: "cv",
    label: "CV",
    href: "/resume.pdf",
    icon: "mdi:file-account-outline",
    external: false,
  },
] as const;

function getNavLinkClass(isActive: boolean) {
  return [
    "inline-flex border-b-2 pb-1 text-sm transition-colors",
    isActive
      ? "border-red-600 text-foreground"
      : "border-transparent text-foreground/55 hover:text-foreground",
  ].join(" ");
}

export function SiteNavbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const shortcut = useKeyboardShortcutLabel();

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end gap-2 border-b border-border pb-3">
        {TOP_ICON_LINKS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            aria-label={item.label}
            title={item.label}
            className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon icon={item.icon} width={16} height={16} />
          </Link>
        ))}
      </div>

      <header className="flex items-center justify-between gap-3 border-b border-border pb-4">
        <Link href="/" aria-label="Go to home" className="inline-flex items-center">
          <Avatar className="h-9 w-9 rounded-sm">
            <AvatarImage src="/logo/logo.jpeg" alt="Poyraz Avsever" />
            <AvatarFallback className="rounded-sm bg-muted text-xs font-semibold">
              PA
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-3">
              {NAV_LINKS.map((item, index) => (
                <li key={item.id} className="flex items-center gap-3">
                  {index > 0 && (
                    <Separator orientation="vertical" className="h-4 bg-border" decorative />
                  )}
                  <Link href={item.href} className={getNavLinkClass(isActiveLink(item.href))}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Separator orientation="vertical" className="h-4 bg-border" decorative />
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-8 w-44 cursor-pointer items-center justify-between rounded-sm border border-border px-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:w-52"
            aria-label="Open command palette"
          >
            <span className="inline-flex items-center gap-2">
              <Icon icon="mdi:magnify" width={16} height={16} />
              <span>Search</span>
            </span>
            <span className="text-xs text-muted-foreground">{shortcut}</span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-8 cursor-pointer items-center gap-2 rounded-sm border border-border px-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <Icon icon="mdi:share-variant" width={16} height={16} />
              <span>Social</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 rounded-sm">
              <DropdownMenuLabel>Social Links</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {SOCIAL_LINKS.map((item) => (
                <DropdownMenuItem key={item.id} asChild>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Icon icon={item.icon} width={16} height={16} />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex h-8 cursor-pointer items-center gap-2 rounded-sm border border-border px-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <Icon icon="mdi:menu" width={18} height={18} />
              <span>Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-4">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <div className="flex flex-col gap-4">
                <SheetClose asChild>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="inline-flex h-9 w-full cursor-pointer items-center justify-between rounded-sm border border-border px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Open command palette"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Icon icon="mdi:magnify" width={16} height={16} />
                      <span>Search</span>
                    </span>
                    <span className="text-xs text-muted-foreground/80">{shortcut}</span>
                  </button>
                </SheetClose>

                <Separator className="bg-border" decorative />

                <nav aria-label="Mobile navigation">
                  <ul className="space-y-2">
                    {NAV_LINKS.map((item) => (
                      <li key={item.id}>
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            className={getNavLinkClass(isActiveLink(item.href))}
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </nav>

                <Separator className="bg-border" decorative />

                <div className="grid grid-cols-2 gap-2">
                  {SOCIAL_LINKS.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm border border-border px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon icon={item.icon} width={14} height={14} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
      </header>
    </div>
  );
}

"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage, Separator } from "poyraz-ui/atoms";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "poyraz-ui/molecules";
import { SearchCommand } from "@/components/search-command";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/links";

export function SiteNavbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
      <Link href="/" aria-label="Go to home" className="inline-flex items-center">
        <Avatar className="h-9 w-9 rounded-sm">
          <AvatarImage src="/logo/logo.jpeg" alt="Poyraz Avsever" />
          <AvatarFallback className="rounded-sm bg-muted text-xs font-semibold">
            PA
          </AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center gap-3 text-sm">
            {NAV_LINKS.map((item, index) => (
              <li key={item.id} className="flex items-center gap-3">
                {index > 0 && (
                  <Separator orientation="vertical" className="h-4 bg-border" decorative />
                )}
                <Link
                  href={item.href}
                  className="text-foreground/55 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Separator orientation="vertical" className="hidden h-4 bg-border sm:block" decorative />
        <SearchCommand />

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
    </header>
  );
}

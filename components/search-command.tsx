"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  CommandPalette,
  CommandPaletteContent,
  CommandPaletteEmpty,
  CommandPaletteFooter,
  CommandPaletteGroup,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
  CommandPaletteSeparator,
  CommandPaletteTrigger,
} from "poyraz-ui/molecules";
import {
  COMMAND_PALETTE_GROUPS,
  type CommandPaletteItem as PaletteItem,
} from "@/lib/command-palette-links";

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const shortcut = useMemo(() => {
    if (typeof window === "undefined") return "Ctrl K";
    const isMac = /(Mac|iPhone|iPad)/i.test(window.navigator.platform);
    return isMac ? "Cmd K" : "Ctrl K";
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (!isShortcut) return;

      event.preventDefault();
      setOpen((prev) => !prev);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleCommandSelect = (item: PaletteItem) => {
    setOpen(false);

    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(item.href);
  };

  return (
    <CommandPalette open={open} onOpenChange={setOpen}>
      <CommandPaletteTrigger asChild>
        <button
          type="button"
          className="inline-flex h-8 w-44 cursor-pointer items-center justify-between rounded-sm border border-border px-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:w-52"
          aria-label="Open command palette"
        >
          <span className="inline-flex items-center gap-2">
            <Icon icon="mdi:magnify" width={16} height={16} />
            <span>Search</span>
          </span>
          <span className="text-xs text-muted-foreground/80">{shortcut}</span>
        </button>
      </CommandPaletteTrigger>

      <CommandPaletteContent className="rounded-sm">
        <CommandPaletteInput placeholder="Search pages and links..." />
        <CommandPaletteList>
          <CommandPaletteEmpty>No results found.</CommandPaletteEmpty>
          {COMMAND_PALETTE_GROUPS.map((group, index) => (
            <div key={group.id}>
              {index > 0 && <CommandPaletteSeparator />}
              <CommandPaletteGroup heading={group.heading}>
                {group.items.map((item) => (
                  <CommandPaletteItem
                    key={item.id}
                    icon={<Icon icon={item.icon} width={16} height={16} />}
                    onClick={() => handleCommandSelect(item)}
                    className="cursor-pointer"
                  >
                    {item.label}
                  </CommandPaletteItem>
                ))}
              </CommandPaletteGroup>
            </div>
          ))}
        </CommandPaletteList>
        <CommandPaletteFooter className="text-xs text-muted-foreground">
          Press {shortcut} to open quickly
        </CommandPaletteFooter>
      </CommandPaletteContent>
    </CommandPalette>
  );
}

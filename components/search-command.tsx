"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
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
} from "poyraz-ui/molecules";
import {
  COMMAND_PALETTE_GROUPS,
  type CommandPaletteItem as PaletteItem,
} from "@/lib/command-palette-links";

type SearchCommandProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
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
      onOpenChange(!open);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const handleCommandSelect = (item: PaletteItem) => {
    onOpenChange(false);

    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(item.href);
  };

  return (
    <CommandPalette open={open} onOpenChange={onOpenChange}>
      <CommandPaletteContent className=" rounded-none p-0 pt-3 w-72 sm:max-w-lg sm:rounded-sm sm:p-0 sm:pt-2">
        <CommandPaletteInput
          placeholder="Search pages and links..."
          className="mt-2 pr-10"
        />
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

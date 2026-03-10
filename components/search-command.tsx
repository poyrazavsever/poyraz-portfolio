"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { useKeyboardShortcutLabel } from "@/lib/use-keyboard-shortcut-label";

type SearchCommandProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const router = useRouter();
  const shortcut = useKeyboardShortcutLabel();
  const [query, setQuery] = useState("");
  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (!nextOpen) {
      setQuery("");
    }
    onOpenChange(nextOpen);
  }, [onOpenChange]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (!isShortcut) return;

      event.preventDefault();
      handleOpenChange(!open);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, handleOpenChange]);

  const filteredGroups = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return COMMAND_PALETTE_GROUPS;

    const tokens = value.split(/\s+/).filter(Boolean);

    return COMMAND_PALETTE_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const haystack = [
          item.label,
          item.href,
          item.icon,
          ...(item.keywords ?? []),
        ]
          .join(" ")
          .toLowerCase();

        return tokens.every((token) => haystack.includes(token));
      }),
    })).filter((group) => group.items.length > 0);
  }, [query]);

  const handleCommandSelect = (item: PaletteItem) => {
    handleOpenChange(false);

    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(item.href);
  };

  return (
    <CommandPalette open={open} onOpenChange={handleOpenChange}>
      <CommandPaletteContent className=" rounded-none p-0 pt-3 w-72 sm:w-full sm:max-w-xl sm:rounded-sm sm:p-0 sm:pt-2">
        <CommandPaletteInput
          placeholder="Sayfa ve bağlantılarda ara..."
          className="mt-2 pr-10"
          onValueChange={setQuery}
        />
        <CommandPaletteList>
          <CommandPaletteEmpty>Sonuç bulunamadı.</CommandPaletteEmpty>
          {filteredGroups.map((group, index) => (
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
          Hızlıca açmak için {shortcut} kullan
        </CommandPaletteFooter>
      </CommandPaletteContent>
    </CommandPalette>
  );
}

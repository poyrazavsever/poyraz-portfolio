"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "@/i18n/routing";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
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
  getCommandPaletteGroups,
  type CommandPaletteItem as PaletteItem,
} from "@/lib/command-palette-links";
import { useKeyboardShortcutLabel } from "@/lib/use-keyboard-shortcut-label";

type SearchCommandProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const router = useRouter();
  const locale = useLocale();
  const tLinks = useTranslations("Links");
  const tNav = useTranslations("Nav");
  const t = useTranslations("SearchCommand");
  const shortcut = useKeyboardShortcutLabel();
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    return getCommandPaletteGroups(locale, tLinks, tNav);
  }, [locale, tLinks, tNav]);

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
    if (!value) return groups;

    const tokens = value.split(/\s+/).filter(Boolean);

    return groups.map((group) => ({
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
  }, [query, groups]);

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
          placeholder={t("placeholder")}
          className="mt-2 pr-10"
          onValueChange={setQuery}
        />
        <CommandPaletteList>
          {filteredGroups.length === 0 ? (
            <CommandPaletteEmpty>{t("empty")}</CommandPaletteEmpty>
          ) : (
            filteredGroups.map((group, index) => (
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
            ))
          )}
        </CommandPaletteList>
        <CommandPaletteFooter className="text-xs text-muted-foreground">
          {t("footer", { shortcut })}
        </CommandPaletteFooter>
      </CommandPaletteContent>
    </CommandPalette>
  );
}

"use client";

import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { Link, usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Fragment, useState } from "react";
import {
  Button,
  ButtonIcon,
  ButtonLabel,
  Logo,
  Separator,
} from "poyraz-ui/atoms";
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
  Tabs,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "poyraz-ui/molecules";
import { NavbarTopBar, NavbarTopBarSection } from "poyraz-ui/organisms";
import { useKeyboardShortcutLabel } from "@/lib/use-keyboard-shortcut-label";
import {
  getResumeHref,
  NAV_DROPDOWN_GROUPS,
  NAV_LINKS,
  SOCIAL_LINKS,
  TOP_ICON_LINKS,
} from "@/lib/links";
import type { ThemeMode } from "@/components/app-shell";
import type { AnimationSourceSearchItem } from "@/lib/command-palette-links";

const SearchCommand = dynamic(
  () => import("@/components/search-command").then((mod) => mod.SearchCommand),
  { ssr: false },
);

const slowShineClassName = "[--poyraz-motion-duration-deliberate:1100ms]";
const dropdownItemLinkClassName =
  "grid w-full grid-cols-[1.25rem_minmax(0,1fr)] items-center gap-2";
const mobileDropdownItemLinkClassName =
  "grid min-h-10 w-full grid-cols-[1.25rem_minmax(0,1fr)_1rem] items-center gap-3 rounded-sm px-2 py-2 text-sm text-foreground/70 transition-colors hover:bg-muted hover:text-foreground";

function getNavLinkClass(isActive: boolean) {
  return [
    "inline-flex border-b-2 pb-1 text-sm transition-colors md:border-0 md:pb-0",
    isActive
      ? "border-red-600 text-foreground"
      : "border-transparent text-foreground/55 hover:text-foreground",
  ].join(" ");
}

function getDesktopDropdownTriggerClass(isActive: boolean) {
  return [
    "relative inline-flex h-7 shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-sm px-2.5 text-xs font-medium outline-none",
    "transition-[color,background-color] duration-[var(--poyraz-motion-duration-fast)] ease-[var(--poyraz-motion-ease-out)]",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
  ].join(" ");
}

type ThemeToggleProps = {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
};

function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = theme === "dark" ? "Light mode" : "Dark mode";

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon-sm"
      radius="sm"
      effect="shine"
      aria-label={label}
      className={`cursor-pointer ${slowShineClassName}`}
      onClick={() => onThemeChange(nextTheme)}
    >
      <Icon
        icon={theme === "dark" ? "mdi:white-balance-sunny" : "mdi:moon-waning-crescent"}
        width={16}
        height={16}
      />
    </Button>
  );
}

type SiteNavbarProps = ThemeToggleProps & {
  animationSources: AnimationSourceSearchItem[];
};

export function SiteNavbar({
  theme,
  onThemeChange,
  animationSources,
}: SiteNavbarProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuGroupId, setMobileMenuGroupId] = useState<string | null>(null);
  const shortcut = useKeyboardShortcutLabel();
  const t = useTranslations("Nav");
  const locale = useLocale();

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const activeTab = NAV_LINKS.find((item) => isActiveLink(item.href))?.id;
  const activeMobileMenuGroup = NAV_DROPDOWN_GROUPS.find(
    (group) => group.id === mobileMenuGroupId,
  );

  const handleMobileMenuOpenChange = (open: boolean) => {
    setMobileMenuOpen(open);
    if (!open) setMobileMenuGroupId(null);
  };
  const languageLabel = locale === "tr" ? "Switch to English" : "Türkçe'ye geç";

  return (
    <div className="min-w-0 space-y-3">
      <TooltipProvider delayDuration={180}>
        <NavbarTopBar
          variant="secondary"
          className="border-0 bg-transparent p-0 shadow-none [&>div]:max-w-none [&>div]:px-0"
        >
          <NavbarTopBarSection align="end" className="gap-2">
            {TOP_ICON_LINKS.map((item) => {
              const href = item.id === "cv" ? getResumeHref(locale) : item.href;
              const label = t.has(item.id) ? t(item.id) : item.label;

              return (
                <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        variant="secondary"
                        size="icon-sm"
                        radius="sm"
                        effect="shine"
                        aria-label={label}
                        className={`cursor-pointer ${slowShineClassName}`}
                      >
                        <a
                          href={href}
                          target={item.id === "cv" || item.external ? "_blank" : undefined}
                          rel={item.id === "cv" || item.external ? "noreferrer" : undefined}
                        >
                          <Icon icon={item.icon} width={16} height={16} />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" surface="soft" radius="sm" size="sm">
                      {label}
                    </TooltipContent>
                  </Tooltip>
              );
            })}

            <Tooltip>
              <TooltipTrigger asChild>
                <LanguageSwitcher />
              </TooltipTrigger>
              <TooltipContent side="bottom" surface="soft" radius="sm" size="sm">
                {languageLabel}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
              </TooltipTrigger>
              <TooltipContent side="bottom" surface="soft" radius="sm" size="sm">
                {locale === "tr" ? "Tema değiştir" : "Toggle theme"}
              </TooltipContent>
            </Tooltip>
          </NavbarTopBarSection>
        </NavbarTopBar>
      </TooltipProvider>

      <header className="flex min-w-0 items-center justify-between gap-3 border-b border-border pb-4">
        <Link
          href="/"
          aria-label="Ana sayfaya git"
          className="inline-flex shrink-0 items-center"
        >
          <Logo
            src="/logo/logo.webp"
            alt="Poyraz Avsever"
            width={40}
            height={40}
            radius="sm"
            effect="shine-loop"
            interactive
            className={slowShineClassName}
          />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-2 min-[840px]:flex">
          <Tabs value={activeTab ?? ""} className="w-auto shrink-0">
            <TabsList
              variant="line"
              radius="sm"
              className="h-9 gap-1 bg-transparent p-0"
              aria-label="Ana navigasyon"
            >
              {NAV_LINKS.map((item, index) => (
                <Fragment key={item.id}>
                  <div className="flex items-center gap-1.5">
                    {index > 0 && (
                      <Separator
                        orientation="vertical"
                        className="h-4 bg-border/70"
                        decorative
                      />
                    )}
                    <TabsTrigger
                      value={item.id}
                      asChild
                      size="sm"
                      radius="sm"
                      className="cursor-pointer px-2.5"
                    >
                      <Link href={item.href}>{t(item.id)}</Link>
                    </TabsTrigger>
                  </div>

                  {NAV_DROPDOWN_GROUPS.filter(
                    (group) => group.insertAfter === item.id,
                  ).map((group) => (
                    <div key={group.id} className="flex items-center gap-1.5">
                      <Separator
                        orientation="vertical"
                        className="h-4 bg-border/70"
                        decorative
                      />
                      <DropdownMenu interaction="click">
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className={getDesktopDropdownTriggerClass(
                              group.items.some(
                                (groupItem) =>
                                  !groupItem.external &&
                                  isActiveLink(groupItem.href.split("?")[0]),
                              ),
                            )}
                          >
                            <span>{t(group.id)}</span>
                            <Icon icon="mdi:chevron-down" width={14} height={14} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          surface="solid"
                          radius="md"
                          itemSize="md"
                          itemRadius="sm"
                          className="w-56 bg-popover"
                        >
                          {group.items.map((groupItem) => (
                            <DropdownMenuItem key={groupItem.id} asChild>
                              {groupItem.external ? (
                                <a
                                  href={groupItem.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={dropdownItemLinkClassName}
                                >
                                  <Icon
                                    icon={groupItem.icon}
                                    width={16}
                                    height={16}
                                    className="block justify-self-center"
                                  />
                                  <span className="min-w-0 leading-5">{t(groupItem.id)}</span>
                                </a>
                              ) : (
                                <Link
                                  href={groupItem.href}
                                  className={dropdownItemLinkClassName}
                                >
                                  <Icon
                                    icon={groupItem.icon}
                                    width={16}
                                    height={16}
                                    className="block justify-self-center"
                                  />
                                  <span className="min-w-0 leading-5">{t(groupItem.id)}</span>
                                </Link>
                              )}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </Fragment>
              ))}
            </TabsList>
          </Tabs>

          <Separator
            orientation="vertical"
            className="h-5 shrink-0 bg-border"
            decorative
          />
          <Button
            type="button"
            variant="secondary"
            radius="sm"
            effect="shine"
            onClick={() => setSearchOpen(true)}
            className={`h-9 w-auto cursor-pointer px-3 text-sm ${slowShineClassName}`}
            aria-label={t("search")}
          >
            <ButtonIcon>
              <Icon icon="mdi:magnify" width={16} height={16} />
            </ButtonIcon>
            <ButtonLabel className="mr-auto">{t("search")}</ButtonLabel>
            <span className="text-xs text-muted-foreground">{shortcut}</span>
          </Button>

          <DropdownMenu interaction="click">
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                radius="sm"
                effect="shine"
                className={`h-9 cursor-pointer ${slowShineClassName}`}
              >
                <ButtonIcon>
                  <Icon icon="mdi:share-variant" width={16} height={16} />
                </ButtonIcon>
                <ButtonLabel>{t("social")}</ButtonLabel>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              surface="solid"
              radius="md"
              itemSize="md"
              itemRadius="sm"
              className="w-56 bg-popover"
            >
              <DropdownMenuLabel>{t("socialLinks")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {SOCIAL_LINKS.map((item) => (
                <DropdownMenuItem key={item.id} asChild>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Icon icon={item.icon} width={16} height={16} />
                    <span>{item.label}</span>
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 min-[840px]:hidden">
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            radius="sm"
            effect="shine"
            className={`cursor-pointer ${slowShineClassName}`}
            aria-label={t("search")}
            onClick={() => setSearchOpen(true)}
          >
            <Icon icon="mdi:magnify" width={16} height={16} />
          </Button>

          <Sheet open={mobileMenuOpen} onOpenChange={handleMobileMenuOpenChange}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                radius="sm"
                effect="shine"
                className={`h-9 cursor-pointer ${slowShineClassName}`}
              >
                <ButtonIcon>
                  <Icon icon="mdi:menu" width={18} height={18} />
                </ButtonIcon>
                <ButtonLabel>{t("menu")}</ButtonLabel>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-4">
              {activeMobileMenuGroup ? (
                <div className="flex flex-col gap-4">
                  <div className="flex min-h-9 items-center gap-2 pr-9">
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon-sm"
                      radius="sm"
                      effect="shine"
                      className={`shrink-0 cursor-pointer ${slowShineClassName}`}
                      aria-label={t("backToMenu")}
                      onClick={() => setMobileMenuGroupId(null)}
                    >
                      <Icon icon="mdi:chevron-left" width={18} height={18} />
                    </Button>
                    <SheetTitle className="truncate text-base font-medium">
                      {t(activeMobileMenuGroup.id)}
                    </SheetTitle>
                  </div>

                  <Separator className="bg-border" decorative />

                  <nav aria-label={t(activeMobileMenuGroup.id)}>
                    <ul className="space-y-1">
                      {activeMobileMenuGroup.items.map((groupItem) => (
                        <li key={groupItem.id}>
                          {groupItem.external ? (
                            <SheetClose asChild>
                              <a
                                href={groupItem.href}
                                target="_blank"
                                rel="noreferrer"
                                className={mobileDropdownItemLinkClassName}
                              >
                                <Icon
                                  icon={groupItem.icon}
                                  width={18}
                                  height={18}
                                  className="block justify-self-center"
                                />
                                <span className="min-w-0 leading-5">{t(groupItem.id)}</span>
                                <Icon
                                  icon="mdi:open-in-new"
                                  width={14}
                                  height={14}
                                  className="block justify-self-center text-muted-foreground"
                                />
                              </a>
                            </SheetClose>
                          ) : (
                            <SheetClose asChild>
                              <Link
                                href={groupItem.href}
                                className={mobileDropdownItemLinkClassName}
                              >
                                <Icon
                                  icon={groupItem.icon}
                                  width={18}
                                  height={18}
                                  className="block justify-self-center"
                                />
                                <span className="min-w-0 leading-5">{t(groupItem.id)}</span>
                                <Icon
                                  icon="mdi:chevron-right"
                                  width={16}
                                  height={16}
                                  className="block justify-self-center text-muted-foreground"
                                />
                              </Link>
                            </SheetClose>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <SheetTitle className="sr-only">{t("mobileMenu")}</SheetTitle>

                  <SheetClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      radius="sm"
                      effect="shine"
                      onClick={() => setSearchOpen(true)}
                      className={`w-full cursor-pointer justify-between ${slowShineClassName}`}
                      aria-label={t("search")}
                    >
                      <span className="inline-flex items-center gap-2">
                        <Icon icon="mdi:magnify" width={16} height={16} />
                        <span>{t("search")}</span>
                      </span>
                      <span className="text-xs text-muted-foreground/80">
                        {shortcut}
                      </span>
                    </Button>
                  </SheetClose>

                  <Separator className="bg-border" decorative />

                  <nav aria-label="Mobil navigasyon">
                    <ul className="space-y-2">
                      {NAV_LINKS.map((item) => (
                        <Fragment key={item.id}>
                          <li>
                            <SheetClose asChild>
                              <Link
                                href={item.href}
                                className={getNavLinkClass(isActiveLink(item.href))}
                              >
                                {t(item.id)}
                              </Link>
                            </SheetClose>
                          </li>

                          {NAV_DROPDOWN_GROUPS.filter(
                            (group) => group.insertAfter === item.id,
                          ).map((group) => (
                            <li key={group.id}>
                              <button
                                type="button"
                                className={`${getNavLinkClass(
                                  group.items.some(
                                    (groupItem) =>
                                      !groupItem.external &&
                                      isActiveLink(groupItem.href.split("?")[0]),
                                  ),
                                )} w-full cursor-pointer items-center justify-between gap-3 text-left`}
                                onClick={() => setMobileMenuGroupId(group.id)}
                              >
                                <span>{t(group.id)}</span>
                                <Icon icon="mdi:chevron-right" width={16} height={16} />
                              </button>
                            </li>
                          ))}
                        </Fragment>
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
              )}
            </SheetContent>
          </Sheet>
        </div>

        <SearchCommand
          open={searchOpen}
          onOpenChange={setSearchOpen}
          animationSources={animationSources}
        />
      </header>
    </div>
  );
}

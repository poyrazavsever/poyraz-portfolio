"use client";

import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { Link, usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useEffect, useState } from "react";
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
import { getResumeHref, NAV_LINKS, SOCIAL_LINKS, TOP_ICON_LINKS } from "@/lib/links";

const SearchCommand = dynamic(
  () => import("@/components/search-command").then((mod) => mod.SearchCommand),
  { ssr: false },
);

const glassActionClassName =
  "!border-border/80 hover:!border-border focus-visible:!border-border data-[state=open]:!border-border";

const slowShineClassName = "[--poyraz-motion-duration-deliberate:1100ms]";

function getNavLinkClass(isActive: boolean) {
  return [
    "inline-flex border-b-2 pb-1 text-sm transition-colors md:border-0 md:pb-0",
    isActive
      ? "border-red-600 text-foreground"
      : "border-transparent text-foreground/55 hover:text-foreground",
  ].join(" ");
}

type ThemeMode = "light" | "dark";

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.poyrazTheme = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem("poyraz-theme", theme);
}

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";

  const storedTheme = localStorage.getItem("poyraz-theme");
  if (storedTheme === "dark" || storedTheme === "light") return storedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = theme === "dark" ? "Light mode" : "Dark mode";

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <Button
      type="button"
      variant="glass"
      size="icon-sm"
      radius="sm"
      effect="shine"
      aria-label={label}
      className={`cursor-pointer ${glassActionClassName} ${slowShineClassName}`}
      onClick={() => setTheme(nextTheme)}
    >
      <Icon
        icon={theme === "dark" ? "mdi:white-balance-sunny" : "mdi:moon-waning-crescent"}
        width={16}
        height={16}
      />
    </Button>
  );
}

export function SiteNavbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const shortcut = useKeyboardShortcutLabel();
  const t = useTranslations("Nav");
  const locale = useLocale();

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const activeTab = NAV_LINKS.find((item) => isActiveLink(item.href))?.id;
  const languageLabel = locale === "tr" ? "Switch to English" : "Türkçe'ye geç";

  return (
    <div className="space-y-3">
      <TooltipProvider delayDuration={180}>
        <NavbarTopBar
          variant="secondary"
          className="border-0 bg-transparent p-0 shadow-none"
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
                      variant="glass"
                      size="icon-sm"
                      radius="sm"
                      effect="shine"
                      aria-label={label}
                      className={`cursor-pointer ${glassActionClassName} ${slowShineClassName}`}
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
                  <TooltipContent side="bottom" surface="glass" radius="sm" size="sm">
                    {label}
                  </TooltipContent>
                </Tooltip>
              );
            })}

            <Tooltip>
              <TooltipTrigger asChild>
                <LanguageSwitcher />
              </TooltipTrigger>
              <TooltipContent side="bottom" surface="glass" radius="sm" size="sm">
                {languageLabel}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ThemeToggle />
              </TooltipTrigger>
              <TooltipContent side="bottom" surface="glass" radius="sm" size="sm">
                {locale === "tr" ? "Tema değiştir" : "Toggle theme"}
              </TooltipContent>
            </Tooltip>
          </NavbarTopBarSection>
        </NavbarTopBar>
      </TooltipProvider>

      <header className="flex items-center justify-between gap-3 border-b border-border pb-4">
        <Link
          href="/"
          aria-label="Ana sayfaya git"
          className="inline-flex items-center"
        >
          <Logo
            src="/logo/logo.jpeg"
            alt="Poyraz Avsever"
            width={40}
            height={40}
            radius="sm"
            effect="shine-loop"
            interactive
            className={slowShineClassName}
          />
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <Tabs value={activeTab ?? ""} className="w-auto">
            <TabsList
              variant="line"
              radius="sm"
              className="h-9 gap-1 bg-transparent p-0"
              aria-label="Ana navigasyon"
            >
              {NAV_LINKS.map((item, index) => (
                <div key={item.id} className="flex items-center gap-1.5">
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
              ))}
            </TabsList>
          </Tabs>

          <Separator
            orientation="vertical"
            className="h-5 bg-border"
            decorative
          />
          <Button
            type="button"
            variant="glass"
            radius="sm"
            effect="shine"
            onClick={() => setSearchOpen(true)}
            className={`h-9 w-44 cursor-pointer justify-between px-3 text-sm sm:w-52 ${glassActionClassName} ${slowShineClassName}`}
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
                variant="glass"
                radius="sm"
                effect="shine"
                className={`h-9 cursor-pointer ${glassActionClassName} ${slowShineClassName}`}
              >
                <ButtonIcon>
                  <Icon icon="mdi:share-variant" width={16} height={16} />
                </ButtonIcon>
                <ButtonLabel>{t("social")}</ButtonLabel>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              surface="glass"
              radius="md"
              itemSize="md"
              itemRadius="sm"
              className="w-56"
            >
              <DropdownMenuLabel>{t("socialLinks")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {SOCIAL_LINKS.map((item) => (
                <DropdownMenuItem key={item.id} asChild interactiveMotion="shift">
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

        <div className="flex items-center gap-2 md:hidden">
          <Button
            type="button"
            variant="glass"
            size="icon-sm"
            radius="sm"
            effect="shine"
            className={`cursor-pointer ${glassActionClassName} ${slowShineClassName}`}
            aria-label={t("search")}
            onClick={() => setSearchOpen(true)}
          >
            <Icon icon="mdi:magnify" width={16} height={16} />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="glass"
                radius="sm"
                effect="shine"
                className={`h-9 cursor-pointer ${glassActionClassName} ${slowShineClassName}`}
              >
                <ButtonIcon>
                  <Icon icon="mdi:menu" width={18} height={18} />
                </ButtonIcon>
                <ButtonLabel>{t("menu")}</ButtonLabel>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-4">
              <SheetTitle className="sr-only">{t("mobileMenu")}</SheetTitle>
              <div className="flex flex-col gap-4">
                <SheetClose asChild>
                  <Button
                    type="button"
                    variant="glass"
                    radius="sm"
                    effect="shine"
                    onClick={() => setSearchOpen(true)}
                    className={`w-full cursor-pointer justify-between ${glassActionClassName} ${slowShineClassName}`}
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
                      <li key={item.id}>
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            className={getNavLinkClass(isActiveLink(item.href))}
                          >
                            {t(item.id)}
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

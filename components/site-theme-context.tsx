"use client";

import { createContext, useContext } from "react";

export type SiteThemeMode = "light" | "dark";

export const SiteThemeContext = createContext<SiteThemeMode>("light");

export function useSiteTheme() {
  return useContext(SiteThemeContext);
}

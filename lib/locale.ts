export type Localized<T = string> = {
  tr: T;
  en: T;
};

export function getLocalizedValue<T>(
  value: Localized<T> | T | string,
  locale: string
): T {
  if (value && typeof value === "object" && ("tr" in value || "en" in value)) {
    const localizedObj = value as Record<string, T>;
    return localizedObj[locale] || localizedObj["tr"];
  }
  return value as T;
}

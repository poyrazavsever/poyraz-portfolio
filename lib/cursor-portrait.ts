export const TOTAL_DURATION = 4;
export const ACTIVE_START = 0.25;
export const ACTIVE_END = 3.75;
export const DEFAULT_TIME = 2;
export const SMOOTHING = 0.12;

export function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function mapPointerYToTime(pointerY: number, viewportHeight: number) {
  if (viewportHeight <= 0) return DEFAULT_TIME;

  const progress = clamp(1 - pointerY / viewportHeight, 0, 1);
  return ACTIVE_START + progress * (ACTIVE_END - ACTIVE_START);
}

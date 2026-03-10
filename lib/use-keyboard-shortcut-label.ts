"use client";

import { useSyncExternalStore } from "react";

const APPLE_DEVICE_PATTERN = /(Mac|iPhone|iPad)/i;

function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return "Ctrl K";
}

function getClientSnapshot() {
  return APPLE_DEVICE_PATTERN.test(window.navigator.platform) ? "Cmd K" : "Ctrl K";
}

export function useKeyboardShortcutLabel() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}

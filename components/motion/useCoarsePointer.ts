"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(pointer: coarse)";

function subscribe(callback: () => void) {
  const mediaQueryList = window.matchMedia(QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

// Reaktivní zjištění dotykového/hrubého pointeru (myš vs. prst) přes
// useSyncExternalStore — bezpečné pro SSR (getServerSnapshot) a bez
// setState-in-effect cascading-render varování, na rozdíl od
// matchMedia().matches čteného v useEffect + useState.
export function useCoarsePointer() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

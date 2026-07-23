"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "aveniq-cookie-consent";
const CONSENT_EVENT = "aveniq:cookie-consent-changed";

type ConsentValue = "all" | "necessary";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY);
}

// Server neví, co má uživatel uloženo v localStorage — vrátíme "žádná
// volba", ať se lišta na klientovi po hydrataci správně schová/zobrazí
// podle skutečného stavu, beze změny setState() v efektu.
function getServerSnapshot() {
  return null;
}

function saveConsent(value: ConsentValue) {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export default function CookieConsent() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (stored !== null) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Nastavení cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-800 bg-zinc-900 px-6 py-5 shadow-[0_-4px_16px_rgba(0,0,0,0.4)] sm:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-400">
          Používáme nutné cookies pro chod webu a — jen s vaším souhlasem —
          analytické cookies pro vyhodnocení návštěvnosti. Víc v{" "}
          <Link href="/cookies" className="underline hover:text-zinc-50">
            Zásadách cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => saveConsent("necessary")}
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-brand-turquoise"
          >
            Pouze nutné
          </button>
          <button
            type="button"
            onClick={() => saveConsent("all")}
            className="rounded-md bg-brand-turquoise px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-brand-turquoise/90"
          >
            Přijmout vše
          </button>
        </div>
      </div>
    </div>
  );
}

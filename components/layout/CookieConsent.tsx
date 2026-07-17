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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-navy/10 bg-white px-6 py-5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] sm:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-brand-navy/80">
          Používáme nutné cookies pro chod webu a — jen s vaším souhlasem —
          analytické cookies pro vyhodnocení návštěvnosti. Víc v{" "}
          <Link href="/cookies" className="underline hover:text-brand-navy">
            Zásadách cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => saveConsent("necessary")}
            className="rounded-md border border-brand-navy/20 px-4 py-2 text-sm font-medium text-brand-navy transition-colors hover:border-brand-teal"
          >
            Pouze nutné
          </button>
          <button
            type="button"
            onClick={() => saveConsent("all")}
            className="rounded-md bg-brand-teal px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-teal/90"
          >
            Přijmout vše
          </button>
        </div>
      </div>
    </div>
  );
}

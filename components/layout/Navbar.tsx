"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Navigace podle docs/plan-repozice-2026-08.md, sekce 2. Záměrně
// neobsahuje položku pro každou sekci — „Proč automatizace" a „Jak
// tvoříme" jsou na stránce dál, jen nemají vlastní odkaz, aby se řádek
// navigace nepřeplnil.
//
// ZakazIQ doplněn 2026-08-09 (Fáze 4), až po vzniku sekce s kotvou
// `#zakaziq` — dřív by z něj byla mrtvá kotva. Pořadí odpovídá pořadí
// sekcí na stránce, ne důležitosti: navigace je mapa scrollu.
const navLinks = [
  { href: "/#poslani", label: "Poslání" },
  { href: "/#o-nas", label: "O mně" },
  { href: "/#sluzby", label: "Služby" },
  { href: "/#spoluprace", label: "Jak pracujeme" },
  { href: "/#zakaziq", label: "ZakazIQ" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape zavře menu a vrátí focus na přepínač. Bez toho uživatel na
  // klávesnici menu otevře, ale nemá jak se z něj dostat zpět jinam než
  // protabováním všech položek.
  useEffect(() => {
    if (!isMenuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      toggleRef.current?.focus();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-50"
        >
          AvenIQ
        </Link>

        <nav
          aria-label="Hlavní navigace"
          className="hidden flex-1 justify-center lg:flex"
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-400">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-zinc-50">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* TODO: přepnout na ZAKAZIQ_BOOKING_URL, až bude k dispozici */}
          <Link
            href="/#kontakt"
            className="hidden rounded-full bg-brand-turquoise px-4 py-2 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Konzultace zdarma
          </Link>

          {/* p-2.5 (ne p-2): 24px ikona + 2×10px = 44×44 px, doporučená
              velikost dotykového terče podle Apple i Androidu. */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-zinc-50 lg:hidden"
          >
            <span className="sr-only">
              {isMenuOpen ? "Zavřít menu" : "Otevřít menu"}
            </span>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobilní navigace"
          className="border-t border-zinc-800 bg-zinc-950 lg:hidden"
        >
          <ul className="flex flex-col divide-y divide-zinc-800 px-6 sm:px-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 text-zinc-400 hover:text-zinc-50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-4 sm:hidden sm:px-8">
            {/* TODO: přepnout na ZAKAZIQ_BOOKING_URL, až bude k dispozici */}
            <Link
              href="/#kontakt"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex w-full justify-center rounded-full bg-brand-turquoise px-6 py-2.5 text-base font-medium text-zinc-950 transition-opacity hover:opacity-90"
            >
              Konzultace zdarma
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

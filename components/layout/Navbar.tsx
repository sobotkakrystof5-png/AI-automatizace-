"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AltenoWordmark from "@/components/brand/AltenoWordmark";

// Pořadí přepracováno 2026-08-10 na výslovnou žádost uživatele. Nahrazuje
// pořadí podle docs/plan-repozice-2026-08.md, sekce 2 (viz claude.md,
// "Struktura homepage"). Navigace teď pokrývá všech 8 sekcí, které tvoří
// hlavní konverzní trasu stránky, v přesně tomto pořadí; „V čem jsme jiní"
// (Differentiators) dřív vlastní odkaz nemělo, teď má (`#v-cem-jsme-jini`).
//
// Zbylé sekce (TrustStrip, Mission/Poslání, AutomationAreas, VerifiedSystems,
// ToolsIntegration, QuoteProcess/Nacenění) na stránce zůstávají jako
// mezisekce beze změny. Jejich dlouhodobé umístění je otevřený bod, řeší se
// v budoucí session. Proto v navbaru záměrně nemají odkaz: nejde o
// zapomenutí. `QuoteProcess` (nacenění, 2026-08-10) odkaz v navbaru
// **nedostal** záměrně: navbar je schválený na přesně 8 položek a přidání
// deváté je změna zadání, ne úklid. Dosažitelná je z patičky (`#naceneni`).
//
// Pořadí odpovídá pořadí sekcí na stránce, ne důležitosti: navigace je
// mapa scrollu.
const navLinks = [
  { href: "/#proc-automatizace", label: "Proč automatizace" },
  { href: "/#sluzby", label: "Služby" },
  { href: "/#spoluprace", label: "Jak pracujeme" },
  { href: "/#v-cem-jsme-jini", label: "V čem jsme jiní" },
  { href: "/#o-nas", label: "O mně" },
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
      {/* Hlavička je od 2026-08-14 přes celou šířku, ne v `max-w-6xl` mřížce
          obsahu — na žádost uživatele („logo dej více nalevo"). Logo se tím
          přestává svisle krýt s obsahem stránky pod ním; u pruhu hlavičky je
          to běžné a byl to smysl zadání, ne přehlédnutí.

          Odsazení od `lg` výš není pevné, ale roste s oknem — druhá žádost
          uživatele byla posunout logo zpátky mírně doprava, „zas tak vzadu
          ne". Pevná hodnota to udělat nemůže, protože o šířku soupeří logo
          s navigací: jeden řádek hlavičky potřebuje 1182 px vnitřní šířky
          (změřeno z hmtx Geistu — lockup 274 + 8 odkazů 716 + CTA 161 + dvě
          mezery 32) a každý pixel odsazení navíc bere navigaci dva. Proto
          `max(2rem, min((100vw − 76rem) / 2, 6rem))`:

            • do 1216 px okna zbývá 2rem (32 px) — stejně jako dosud,
            • pak odsazení roste přesně tempem volného místa, takže se
              navigace nikdy nezalomí kvůli posunu loga,
            • od 1408 px se zastaví na 6rem (96 px). Bez stropu by logo
              doputovalo zpátky do mřížky obsahu a na širokých monitorech
              ještě dál, což je opak zadání.

          Na 1440px displeji tedy logo stojí 96 px od kraje: o 64 px vpravo
          od plné šířky a pořád o 80 px vlevo od původní mřížky `max-w-6xl`.
          Pod `lg` platí `px-6`/`sm:px-8` beze změny — tam je navigace
          schovaná do mobilního menu a soupeření o šířku neexistuje. */}
      <div className="flex items-center justify-between gap-4 px-6 py-3 sm:px-8 lg:px-[max(2rem,min((100vw_-_76rem)/2,6rem))]">
        {/* Wordmark je od rebrandu 2026-08-14 značka, ne vysázený text.
            Geometrický řez loga (zkosené „A" s tyrkysovým akcentem) není
            žádným písmem projektu reprodukovatelný.

            2026-08-14 nahrazeno PNG za vektor (`AltenoWordmark`). Pro
            hlavičku to řeší i výkon: dosavadní `<Image priority>` byl další
            požadavek na síť u LCP kandidátu nad ohybem, kdežto inline SVG
            přijde v HTML a nemá co dohánět. `viewBox` odpovídá rozměru
            původního PNG, takže `h-6 w-auto` drží stejnou velikost i pozici.

            Bez `title`: značku pojmenovává `aria-label` odkazu, jinak by ji
            čtečka přečetla dvakrát.

            Tři hesla pod logem přibyla 2026-08-14 na žádost uživatele.
            Doprovod loga (lockup), ne náhrada hero claimu — to je rozhodnutí
            z `docs/rebrand-alteno-kontext.md`, které platí dál. Znění i styl
            jsou doslova stejné jako v patičce (verzálky, tyrkysové
            oddělovače), jen menší a s tišším prostrkem. Hesla stojí mimo
            odkaz na úvod: klikací je značka, ne popisek, a uvnitř odkazu by
            je `aria-label` stejně přebil.

            Šířky jsou změřené z hmtx tabulky Geistu (wght 500), ne odhad.
            Logo h-6 je 179 px, hesla v 9 px 274 px — tedy o polovinu širší.
            Není to chyba sazby: aby vyšla přesně pod wordmark, musela by mít
            ~5,5 px, což je nečitelné. Patička to má vyrovnané (298 vs. 327 px)
            jen proto, že tam je logo h-10. Volím čitelnost před zarovnáním.

            Pod `sm` proto mizí prostrk, ne velikost písma: 9 px je spodní
            krok škály v `DESIGN.md` („mikropopisky uvnitř vizuálů") a nižší
            krok by byl změna design systému, ne úklid. Bez prostrku má
            řádek 242 px a vedle tlačítka menu se vejde i na 360px telefonu
            (242 + 16 + 44 + 48 = 350). S prostrkem 274 px by se zalomil a
            hlavička by vyrostla o řádek. `flex-wrap` zůstává jako pojistka. */}
        <div className="flex shrink-0 flex-col gap-1">
          <Link href="/" className="inline-flex" aria-label="ALTENO — domů">
            <AltenoWordmark className="h-6 w-auto" />
          </Link>
          <p className="flex flex-wrap items-center gap-x-1 text-[9px] leading-none font-medium tracking-normal text-zinc-400 uppercase sm:gap-x-1.5 sm:tracking-[0.06em]">
            <span>Automatizujeme.</span>
            <span aria-hidden className="text-brand-turquoise">
              •
            </span>
            <span>Propojujeme.</span>
            <span aria-hidden className="text-brand-turquoise">
              •
            </span>
            <span>Zrychlujeme.</span>
          </p>
        </div>

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

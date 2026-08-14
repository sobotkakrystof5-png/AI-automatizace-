import Link from "next/link";
import Image from "next/image";

// Footer nese širší výběr než navigace v hlavičce — je tu místo, takže
// sem patří i sekce, které se do horního řádku nevešly.
//
// „O mně" míří od Fáze 5 na podstránku /o-mne, ne na kotvu /#o-nas.
// Záměr: v patičce se hledají stránky, ne pozice ve scrollu, a plný
// příběh je užitečnější cíl než jeho zkrácená verze. Kotva /#o-nas
// zůstává v horní navigaci, takže o ni web nepřišel.
const siteLinks = [
  { href: "/#poslani", label: "Poslání" },
  { href: "/o-mne", label: "O mně" },
  { href: "/#proc-automatizace", label: "Proč automatizace" },
  { href: "/#automatizace", label: "Automatizace" },
  { href: "/#sluzby", label: "Služby" },
  { href: "/#naceneni", label: "Nacenění" },
  { href: "/#spoluprace", label: "Jak pracujeme" },
  { href: "/#faq", label: "FAQ" },
];

const legalLinks = [
  { href: "/vop", label: "Všeobecné obchodní podmínky" },
  { href: "/ochrana-osobnich-udaju", label: "Ochrana osobních údajů" },
  { href: "/cookies", label: "Zásady cookies" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900 text-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Patička nese celý lockup — wordmark plus tři hesla, která jsou
              podle rozhodnutí uživatele 2026-08-14 doprovod loga, ne náhrada
              hero claimu. Hlavička má jen wordmark, tady je na hesla místo,
              aniž by soupeřila s H1.

              Hesla jsou vysázený text, ne součást obrázku: v `alteno-logo-claim.png`
              zabírají jen ~16 z 186 px výšky, takže při velikosti rozumné pro
              patičku (48 px) vycházejí na 4 px a jsou nečitelná. Text je navíc
              vybíratelný a škáluje s nastavením prohlížeče. Styl kopíruje logo —
              verzálky, široký prostrk, tyrkysové oddělovače. */}
          <div className="flex flex-col gap-2.5">
            <Image
              src="/alteno-logo.png"
              alt="ALTENO"
              width={939}
              height={126}
              sizes="298px"
              className="h-10 w-auto"
            />
            {/* Velikost loga a prostrk hesel jsou sladěné tak, aby oba řádky
                vyšly zhruba stejně široké jako v originálním lockupu — proto
                h-10, ne h-6 jako v hlavičce. */}
            <p className="flex flex-wrap items-center gap-x-2 text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-400">
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

          <nav aria-label="Odkazy na stránky">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-zinc-400 sm:grid-cols-4">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 hover:text-zinc-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-6 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Právní odkazy">
            <ul className="flex flex-col text-sm text-zinc-400 sm:flex-row sm:gap-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-2 hover:text-zinc-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} ALTENO
          </p>
        </div>

        <p className="text-right text-xs text-zinc-500">
          Vyrobeno{" "}
          <a
            href="https://vizeon.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300"
          >
            vizeon.cz
          </a>
        </p>
      </div>
    </footer>
  );
}

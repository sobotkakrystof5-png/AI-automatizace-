// Wordmark ALTENO jako vektor — jediný zdroj pravdy pro zápis názvu značky
// v ploše webu.
//
// Proč vektor a ne text: řez loga není žádným písmem projektu (Geist)
// reprodukovatelný. Má tři tvary, které v běžné antikvě neexistují — „A"
// bez vodorovné příčky se seříznutým vrcholem, „E" s odděleným horním
// ramenem (nedotýká se dříku) a supereliptické „O" (širší než vysoké,
// exponent ≈ 2,3, tedy ani kružnice, ani elipsa). Napsat „ALTENO" písmem
// a doladit `tracking` proto dá jiný tvar, ne stejný.
//
// Proč vektor a ne `public/alteno-logo.png`: PNG je bitmapa 939×126 laděná
// na velikost hlavičky. Wordmark se ale vyskytuje i ve 12px uzlech diagramů,
// kde by se rozpadl, a uvnitř vět, kde musí škálovat s velikostí písma.
// Vektor řeší obojí a je menší (2,4 kB dat cest).
//
// Cesty jsou odvozené přímo z alfa kanálu `public/alteno-logo.png`
// (marching squares na hladině 50 % + Douglas–Peucker, tolerance 0,28 px),
// ne překreslené od oka. Ověřeno zpětnou rasterizací proti originálu: IoU
// obrysů 0,985 a žádný pixel se neliší o víc než 0,5 — zbylá odchylka je
// jen měkkost antialiasingu předlohy. `viewBox` schválně odpovídá rozměru
// PNG včetně okrajů, takže je komponenta rozměrově zaměnitelná s dosavadním
// `<Image>` a nikde nemění layout.
//
// Barvy jsou pevné, ne dědičné — uživatel 2026-08-14 rozhodl, že wordmark má
// mít „barvy loga doslova" všude, včetně dvou míst, kde byl dosud celý
// tyrkysový (štítek ve `WhyAutomation`, jádro v `AutomationJourney`). Kdyby
// písmena dědila `currentColor`, barva by se rozešla podle kontextu a přesně
// tohle rozhodnutí by se tiše rozpadlo. Obě hodnoty jsou existující tokeny,
// žádná nová barva nepřibyla:
//   • písmena `zinc-100` (#F4F4F5) — nejbližší krok škály k naměřeným
//     #F1F1F1 v logu (odchylka 1,2 %, pod prahem rozlišitelnosti);
//   • akcent `brand-turquoise` (#2DD4BF) proti naměřeným #45D0C1 —
//     `docs/rebrand-alteno-kontext.md` tenhle rozdíl už uzavřel jako
//     „prakticky shodné, žádný nový token".
// Všechna místa výskytu mají tmavý podklad, takže kontrast sedí všude.

const LETTERS =
  // O — vnější obrys
  "M840.87,10.5 852.5,9.94 875.5,10.17 884.5,11.28 892.5,13.2 900.5,16.15 909.5,21.3 916.5,27.19 921.83,33.5 926.8,42.5 928.62,47.5 929.83,52.5 930.71,58.5 930.93,64.5 929.83,75.5 928.6,80.5 926.75,85.5 921.78,94.5 916.5,100.79 909.5,106.61 904.5,109.74 898.5,112.67 892.5,114.85 884.5,116.75 876.5,117.82 868.5,118.15 841.5,117.74 829.5,115.74 823.5,113.87 816.5,110.8 809.5,106.61 806.81,104.5 802.5,100.47 798.2,95.5 795.07,90.5 792.18,84.5 790.32,78.5 789.12,71.5 788.88,61.5 789.23,55.5 791.31,46.5 794.11,39.5 798.3,32.5 802.5,27.55 808.5,22.12 812.5,19.33 818.5,16.19 826.5,13.14 834.5,11.32Z" +
  // O — protilehlý otvor
  "M851.5,27.49 841.5,28.34 837.5,29.09 830.5,31.21 826.5,33.2 822.5,35.92 818.5,39.53 815.12,43.5 811.96,49.5 810.27,54.5 809.31,64.5 810.08,72.5 811.15,76.5 813.26,81.5 815.07,84.5 819.5,89.7 823.5,93.03 826.5,94.84 833.5,97.97 842.5,100.04 853.5,100.85 863.5,100.9 876.5,100.03 885.5,98.04 890.5,95.93 895.5,93.04 900.88,88.5 904.73,83.5 907.82,77.5 909.7,70.5 910.2,64.5 909.78,57.5 907.92,50.5 904.94,44.5 902.04,40.5 898.5,37.14 892.5,33.13 885.5,30.06 874.5,27.96 862.5,27.42Z" +
  // A — bez příčky, se seříznutým vrcholem
  "M73.2,12.5 74.5,12.01 93.5,12.03 94.8,12.5 119.11,51.5 127.81,64.5 152.14,103.5 160.09,115.5 159.5,116.46 137.5,116.53 136.5,116.45 135.62,115.5 84.82,34.5 83.5,33.7 31.5,116.05 30.5,116.63 9.5,116.42 8.5,115.88 66.03,24.5Z" +
  // L
  "M195.06,12.5 195.5,12.06 214.5,12.01 215.71,12.5 215.66,98.5 216.5,99.4 309.5,99.52 310.7,100.5 310.5,115.64 309.5,116.37 300.5,116.53 195.5,116.34 195.02,115.5Z" +
  // T
  "M313.23,12.5 314.5,12.01 435.5,12.01 436.33,12.5 436.29,27.5 436.06,28.5 435.5,28.89 385.5,28.87 384.45,29.5 384.29,115.5 383.5,116.48 365.5,116.47 364.5,116.25 364.1,115.5 364.18,29.5 363.5,28.83 314.5,28.86 313.5,28.53Z" +
  // E — samostatné horní rameno (nedotýká se dříku)
  "M473.5,12.03 472.81,12.5 472.67,27.5 472.85,28.5 473.5,28.9 590.5,28.87 591.36,28.5 591.66,27.5 591.61,13.5 591.52,12.5 590.5,12.04Z" +
  // N
  "M626.11,12.5 627.5,12.05 646.5,12.02 647.5,12.43 737.5,92 738.24,91.5 738.28,88.5 738.37,12.5 739.5,12.01 757.5,12.01 758.5,12.44 758.5,115.65 757.5,116.48 737.5,116.63 735.5,115.84 671.5,58.96 646.5,37.37 646.14,38.5 646.06,115.5 645.5,116.46 626.5,116.39 626.03,115.5Z" +
  // E — dřík se středním a dolním ramenem
  "M473.5,55.79 472.6,56.5 472.74,115.5 473.5,116.5 590.5,116.47 591.65,115.5 591.68,100.5 590.5,99.78 494.5,99.71 493.5,99.69 492.87,98.5 492.81,73.5 493.5,72.12 586.5,72.15 586.96,71.5 586.94,56.5 586.5,55.94Z";

// Tyrkysový rovnoběžník v dolní části „A", rovnoběžný s levým dříkem.
const ACCENT =
  "M71.44,82.5 91.5,82.94 92.73,83.5 75.67,110.5 71.5,116.4 50.5,116.43 49.63,115.5 70.14,83.5Z";

// Metriky pro vsazení do běžícího textu. Nejsou odhadnuté:
//   • cap height Geistu = 710/1000 em (přečteno z OS/2 tabulky
//     `.next/static/media/*.woff2`, pole `sCapHeight`);
//   • cap height wordmarku = 104,54 ze 126 jednotek viewBoxu (účaří 116,55
//     podle plochých pat A/L/T/E/N, horní hrana verzálek 12,01; „O" schválně
//     přetéká na 9,94 a 118,15, jak se u kulatého tvaru patří).
// Výška, při které verzálky loga sednou na verzálky textu:
//   0,71 × 126 / 104,54 = 0,856 em.
// Přesah pod účaří: (126 − 116,55) / 126 × 0,856 = 0,064 em.
const INLINE_HEIGHT = "0.856em";
const INLINE_BASELINE = "-0.064em";

type Props = {
  /** Velikost, typicky `h-6 w-auto`. Barvy si komponenta drží sama. */
  className?: string;
  /**
   * Přístupný název. Vynech tam, kde značku pojmenovává už okolí (odkaz
   * s `aria-label`, viditelný text vedle) — jinak ji čtečka přečte dvakrát.
   * Bez názvu se wordmark vykreslí jako dekorace.
   */
  title?: string;
};

export default function AltenoWordmark({ className, title }: Props) {
  return (
    <svg
      viewBox="0 0 939 126"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {/* `evenodd` drží otvor v „O" — obrys i otvor jsou v jedné cestě. */}
      <path d={LETTERS} className="fill-zinc-100" fillRule="evenodd" />
      <path d={ACCENT} className="fill-brand-turquoise" />
    </svg>
  );
}

// Wordmark vsazený do věty. Samostatná komponenta, ne prop, protože řeší tři
// věci navíc, které stojící značka nepotřebuje: sazbu na účaří okolního
// textu, výšku odvozenou z velikosti písma (`em`, takže drží i při zvětšení
// písma v prohlížeči) a přístupnost.
//
// Přístupnost: SVG je `aria-hidden` a název nese `sr-only` text. Čtečka tak
// přečte plynulou větu („Tak vznikl ALTENO"), ne obrázek uprostřed souvětí,
// a označení myší i kopírování zahrne slovo ALTENO jako text.
//
// Pozor na šířku: poměr wordmarku je 939:126, takže ve větě zabere ~6,4 em
// proti ~4,3 em, které by zabralo napsané „ALTENO". Je to důsledek širokého
// prostrku loga, ne chyba sazby.
export function AltenoInline({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="sr-only">ALTENO</span>
      <svg
        viewBox="0 0 939 126"
        aria-hidden="true"
        focusable="false"
        className="inline w-auto"
        style={{ height: INLINE_HEIGHT, verticalAlign: INLINE_BASELINE }}
      >
        <path d={LETTERS} className="fill-zinc-100" fillRule="evenodd" />
        <path d={ACCENT} className="fill-brand-turquoise" />
      </svg>
    </span>
  );
}

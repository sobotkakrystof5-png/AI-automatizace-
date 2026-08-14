// Jediný zdroj pravdy pro kroky spolupráce. Zobrazuje je sekce
// "Jak spolupráce probíhá" (components/home/ProcessSteps.tsx).
//
// Repozice 2026-08-09: přepsáno ze 6 kroků na 5 podle
// docs/plan-repozice-2026-08.md, sekce 6. Zároveň zjednodušen tvar dat:
//
//  - `body` a `note` odstraněny. Odkrývalo je tlačítko "Zobrazit víc",
//    které s jednořádkovými kroky ztratilo smysl a bylo navíc pět
//    tlačítek se stejným popiskem (problém pro čtečky obrazovky).
//    Nechávat nezobrazovaný text v datech znamená, že se tiše rozejde
//    s tím, co je na stránce.
//  - `title` už NEOBSAHUJE pořadové číslo. Dřív bylo "1. Konzultace
//    zdarma" a komponenta k tomu renderovala vlastní "01". Číslo se
//    tedy zobrazovalo dvakrát. Číslování vlastní komponenta; přehození
//    pořadí kroků tak nevyžaduje ruční přepisování čísel.
export type ProcessStep = {
  /** Krátký popisek, ~2–4 slova. Bez pořadového čísla. */
  title: string;
  /** Jedna doplňující věta, max ~12 slov (babička test 2.0). */
  summary?: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Konzultace na míru",
    summary: "Zjistíme, co vaši firmu reálně zdržuje.",
  },
  {
    title: "Návrh řešení",
    summary: "Návrh probereme a upravíme podle vaší zpětné vazby.",
  },
  {
    title: "Implementace",
    summary: "Automatizaci nasadíme přímo na vašem serveru.",
  },
  {
    title: "Testování a dolaďování",
    summary: "Ověříme, že vše běží, než se to dotkne provozu.",
  },
  {
    title: "Spuštění",
    summary: "První měsíc od spuštění máte podporu zdarma.",
  },
];

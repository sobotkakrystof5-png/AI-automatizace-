// Jediný zdroj pravdy pro kroky procesu práce — sdíleno mezi /proces-prace
// (plný obsah) a homepage sekcí Jak to funguje (timeline), aby kroky
// nemohly zdriftovat.
//
// `body`/`note` zůstávají plnohodnotná verze — u redesignu 2026 (Fáze R6)
// se ukázalo, že `/proces-prace` už není samostatná podstránka (web byl
// mezitím sloučen zpět na jednostránkový, viz `app/page.tsx` — je to jen
// kotva `id="proces-prace"` v rámci homepage), takže `body`/`note` jsou
// teď dostupné výhradně po rozkliknutí kroku na homepage, ne na jiné
// route. `homeSummary` je nová, samostatná zkrácená verze (~7–10 slov) pro
// výchozí (nerozkliknutý) stav homepage timeline, po vzoru `cardLead` v
// `lib/automation-areas.ts` — stejný důvod: krátká verze pro homepage,
// plná zůstává beze změny pro rozkliknutý detail.
export type ProcessStep = {
  title: string;
  body: string;
  homeSummary: string;
  note?: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "1. Konzultace zdarma",
    body: "Nezávazně si promluvíme o vašem provozu — rezervace přes ZakazIQ, žádné volání natvrdo. Zjistíme, jestli má smysl jít dál a kterým směrem.",
    homeSummary: "Nezávazně probereme, jak automatizace pomůže vašemu provozu.",
  },
  {
    title: "2. Automatizační audit — 4 999 Kč (volitelně)",
    body: "Pokud přesně nevíte, co automatizovat, projdeme váš provoz do hloubky: zmapujeme, kde ztrácíte čas, a dostanete konkrétní doporučení — co řešit nejdřív a s jakou návratností. Cenu auditu odečítáme z ceny realizace, pokud se rozhodnete jít dál.",
    homeSummary: "Zmapujeme, kde ve firmě ztrácíte nejvíc času.",
    note: "Pokud už přesně víte, co chcete automatizovat, tento krok můžeme přeskočit a jít rovnou do návrhu řešení.",
  },
  {
    title: "3. Návrh řešení",
    body: "Ukážeme vám přesně, co postavíme, za kolik a s jakou návratností. Řekneme i to, co se nevyplatí.",
    homeSummary: "Ukážeme přesně, co postavíme, za kolik a s jakou návratností.",
  },
  {
    title: "4. Stavba a testování",
    body: "Automatizaci systematicky testujeme, než se vůbec dotkne vašeho provozu.",
    homeSummary: "Automatizaci důkladně otestujeme, než se dotkne vašeho provozu.",
  },
  {
    title: "5. Spuštění",
    body: "Nasadíme řešení do vašeho provozu plynule, bez přerušení chodu firmy.",
    homeSummary: "Nasadíme řešení plynule, bez přerušení chodu vaší firmy.",
  },
  {
    title: "6. Podpora a záruka",
    body: "2 roky záruky. Pojedeme dál, dokud nebudete 100% spokojeni.",
    homeSummary: "Dva roky záruky na každou dokončenou automatizaci.",
  },
];

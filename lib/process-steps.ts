// Jediný zdroj pravdy pro kroky procesu práce — sdíleno mezi /proces-prace
// (plný obsah) a homepage sekcí Jak to funguje (timeline), aby kroky
// nemohly zdriftovat.
export type ProcessStep = {
  title: string;
  body: string;
  note?: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "1. Konzultace zdarma",
    body: "Nezávazně si promluvíme o vašem provozu — rezervace přes ZakazIQ, žádné volání natvrdo. Zjistíme, jestli má smysl jít dál a kterým směrem.",
  },
  {
    title: "2. Automatizační audit — 4 999 Kč (volitelně)",
    body: "Pokud přesně nevíte, co automatizovat, projdeme váš provoz do hloubky: zmapujeme, kde ztrácíte čas, a dostanete konkrétní doporučení — co řešit nejdřív a s jakou návratností. Cenu auditu odečítáme z ceny realizace, pokud se rozhodnete jít dál.",
    note: "Pokud už přesně víte, co chcete automatizovat, tento krok můžeme přeskočit a jít rovnou do návrhu řešení.",
  },
  {
    title: "3. Návrh řešení",
    body: "Ukážeme vám přesně, co postavíme, za kolik a s jakou návratností. Řekneme i to, co se nevyplatí.",
  },
  {
    title: "4. Stavba a testování",
    body: "Automatizaci systematicky testujeme, než se vůbec dotkne vašeho provozu.",
  },
  {
    title: "5. Spuštění",
    body: "Nasadíme řešení do vašeho provozu plynule, bez přerušení chodu firmy.",
  },
  {
    title: "6. Podpora a záruka",
    body: "2 roky záruky. Pojedeme dál, dokud nebudete 100% spokojeni.",
  },
];

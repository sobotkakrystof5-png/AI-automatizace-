// Jediný zdroj pravdy pro FAQ sekci na landing page. Feeduje i
// `faqPageJsonLd()` v lib/json-ld.ts. Co je tady, jde i do structured
// data, takže se sem nesmí dostat nic, co není na stránce pravda.
//
// Repozice 2026-08-09: zredukováno ze 14 položek na jádro 6. Odstraněné
// dotazy buď odkazovaly na smazaný ceník a konkrétní částky (web už ceny
// neuvádí, viz claude.md, "Co se nikdy nedělá"), nebo tvrdily věci, které
// přestaly platit (dvouletá záruka, externí n8n specialista). Cena se
// sděluje výhradně na konzultaci, takže tu nesmí být žádné číslo ani
// odkaz na cenové rozmezí.
export type FaqItem = {
  q: string;
  a: string;
  link?: { href: string; label: string };
  afterLink?: string;
};

export const faqs: FaqItem[] = [
  {
    q: "Nevím přesně, co chci automatizovat. Vadí to?",
    a: "Vůbec ne. Od toho je tu konzultace zdarma a případně automatizační audit. Řekneme vám, kde reálně ztrácíte čas a co se vyplatí řešit jako první.",
  },
  {
    q: "Jak dlouho realizace trvá?",
    a: "Menší automatizace řádově dny, střední týden až dva, větší projekty i více týdnů. Přesný odhad dostanete už v návrhu řešení, ne až po podpisu.",
  },
  {
    q: "Potřebuju technické znalosti nebo vlastní IT tým?",
    a: "Ne. Automatizaci navrhneme, postavíme, otestujeme a nasadíme my. Vy jen popíšete, jak proces reálně funguje ve vaší firmě.",
  },
  {
    q: "Co se stane s mými firemními daty?",
    a: "Preferujeme řešení, kde vaše data neputují zbytečně mimo vaše systémy, v souladu s GDPR. U každého projektu předem víte, kudy data protečou a kde skončí.",
  },
  {
    q: "Proč bych si to nezvládl/a jen v ChatGPT?",
    a: "ChatGPT odpoví, když se zeptáte, ale nespustí se sám a nepropojí vaše systémy. Automatizace běží na pozadí bez vašeho zásahu a škáluje se s objemem práce. Víc v sekci ",
    link: {
      href: "#proc-automatizace",
      label: "Proč automatizace, a ne jen ChatGPT",
    },
    afterLink: " výše.",
  },
  {
    // Dvouletá záruka zrušena jako tvrzení 2026-08-09. Nové znění potvrzeno
    // uživatelem: 1 měsíc podpory zdarma, pak volitelný měsíční paušál.
    q: "Co když se automatizace po čase rozbije?",
    a: "První měsíc od spuštění máte podporu zdarma. Potom si můžete vzít průběžnou podporu jako volitelný měsíční paušál. Monitoring, úpravy a přednostní řešení problémů. Bez paušálu řešíme každý zásah zvlášť podle rozsahu.",
  },
];

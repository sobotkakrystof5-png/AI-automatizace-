// Jediný zdroj pravdy pro FAQ sekci na landing page.
export type FaqItem = {
  q: string;
  a: string;
  link?: { href: string; label: string };
  afterLink?: string;
};

export const faqs: FaqItem[] = [
  {
    q: "Co když se automatizace po čase rozbije?",
    a: "Máte na ni 2 roky záruky. Pokud problém způsobí chyba na naší straně, opravíme ji zdarma. Pokud se rozbije kvůli změně na straně třetí strany (např. aktualizace API jiné služby), předem víte, jak rychle zareagujeme a co to bude stát — žádná nejasnost dopředu.",
  },
  {
    q: "Kolik to bude přesně stát?",
    a: "Orientační rozmezí najdete v ceníku (od 8 000 Kč u menších automatizací výš). Přesná cena vždy padne až po konzultaci nebo auditu, protože záleží na počtu propojených systémů a složitosti logiky. Nikdy nezačínáme práci bez toho, abyste předem věděli, kolik zaplatíte.",
  },
  {
    q: "Nevím přesně, co chci automatizovat. Vadí to?",
    a: "Vůbec ne — od toho je tu konzultace zdarma a případně automatizační audit. Řekneme vám, kde reálně ztrácíte čas a co se vyplatí řešit jako první.",
  },
  {
    q: "Jak dlouho realizace trvá?",
    a: "Menší automatizace řádově dny, střední automatizace týden až dva, větší projekty i více týdnů. Přesný odhad dostanete už v návrhu řešení, ne až po podpisu.",
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
    a: "ChatGPT odpoví, když se zeptáte — ale nespustí se sám a nepropojí vaše systémy. Automatizace běží na pozadí bez vašeho zásahu a škáluje se s objemem práce. Víc v sekci ",
    link: { href: "#proc-automatizace", label: "Proč automatizace, a ne jen ChatGPT" },
    afterLink: " výše.",
  },
  {
    q: "Jak dlouho trvá, než uvidím výsledky?",
    a: "U menších automatizací prakticky hned po spuštění — proces běží od prvního dne. U větších projektů doporučuju sledovat konkrétní metriku (ušetřené hodiny, chybovost) první měsíc provozu, abyste měli reálné číslo, ne jen pocit.",
  },
  {
    q: "Máme už nějaké systémy (CRM, e-shop, účetnictví) — poradíte si s tím?",
    a: "Ano, o to jde především. Nenavrhujeme, abyste měnili nástroje, které vám fungují — automatizace se napojí na to, co už používáte. Pokud je nějaký systém nestandardní nebo bez veřejného API, probereme to už na konzultaci.",
  },
  {
    q: "Funguje to i pro malou firmu nebo OSVČ, ne jen pro velké firmy?",
    a: "Ano — menší pásmo v ceníku je stavěné přesně na tohle. Časová úspora se u malé firmy relativně počítá stejně, jen v menším měřítku.",
  },
  {
    q: "Co se stane, když zaměstnanec, který proces znal, odejde z firmy?",
    a: 'Automatizovaný proces běží dál bez ohledu na to, kdo je zrovna ve firmě — to je jeden z hlavních benefitů oproti "know-how v hlavě jednoho člověka". Dokumentaci k automatizaci navíc dostanete vždy jako součást dodávky.',
  },
  {
    q: "Nabízíte i zaškolení týmu?",
    a: "Ano, součástí spuštění je i krátké zaškolení lidí, kteří budou s automatizací nebo jejími výstupy pracovat — aby věděli, co se děje na pozadí a co dělat, když přijde neobvyklá situace.",
  },
  {
    q: "Co když během provozu změníme naše procesy nebo vyrosteme?",
    a: "Automatizace není jednorázově zamrzlé řešení. V rámci volitelné průběžné podpory ji přizpůsobíme, když se změní objem, přibude systém nebo se posune proces.",
  },
  {
    q: "Co když budete nemocný nebo na dovolené?",
    a: "Každou automatizaci dokumentuji tak, aby ji v nutném případě zvládl převzít i externí n8n specialista, se kterým spolupracuji. Krátkodobý výpadek nezpůsobí, že váš proces přestane fungovat — automatizace běží dál, i když zrovna nejsem u počítače.",
  },
];

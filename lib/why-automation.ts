// Jediný zdroj pravdy pro srovnání "ruční práce s ChatGPT vs. automatizace"
// — sdíleno mezi /proc-automatizace (plný obsah) a homepage sekcí
// (jen srovnávací tabulka), aby tvrzení nemohla zdriftovat.
export const whyAutomationPoints = [
  {
    title: "Automatizace pracuje za vás, ne vy s ní",
    body: "S ChatGPT musíte sami otevřít okno a napsat zadání. Automatizace se spustí sama — hned, jak nastane událost: nová objednávka, e-mail, faktura.",
  },
  {
    title: "Propojení s vašimi systémy",
    body: "ChatGPT nezná vaše CRM, fakturační systém ani sklad. Automatizace ano — čte a zapisuje data přímo tam, kde je potřebujete.",
  },
  {
    title: "Konzistence a spolehlivost",
    body: "Ruční práce s AI se liší člověk od člověka a den ode dne. Automatizovaný proces běží pokaždé stejně — bez ohledu na to, kdo je zrovna v práci.",
  },
  {
    title: "Bezpečnost vašich dat",
    body: "Kopírování citlivých dat do veřejného ChatGPT je riziko samo o sobě. Automatizace zapojí AI tak, aby data zůstala ve vašich systémech, pod vaší kontrolou.",
  },
  {
    title: "Škáluje se s vámi",
    body: "Ruční kopírování do ChatGPT funguje u pěti e-mailů denně — u pěti stovek už ne. Automatizace zvládne stejný proces, ať je požadavků pět, nebo pět tisíc.",
  },
  {
    title: "Čas, který se skutečně sečte",
    body: "Pár ušetřených minut u jednoho úkolu nevypadá jako moc. Vynásobené každým dnem a zaměstnancem jsou to desítky hodin měsíčně — a automatizace je z rovnice odstraní úplně, ne jen zkrátí.",
  },
];

export const comparisonRows = [
  {
    label: "Spouští se",
    manual: "Musíte to udělat vy",
    automated: "Sama, podle události",
  },
  {
    label: "Propojení se systémy",
    manual: "Ruční kopírování",
    automated: "Napojena přímo",
  },
  {
    label: "Konzistence",
    manual: "Liší se člověk od člověka",
    automated: "Vždy stejný proces",
  },
  {
    label: "Bezpečnost dat",
    manual: "Mimo vaši kontrolu",
    automated: "Zůstává ve vašich systémech",
  },
  {
    label: "Škáluje se",
    manual: "Ne",
    automated: "Ano",
  },
];

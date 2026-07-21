// Jediný zdroj pravdy pro srovnání "ruční práce s ChatGPT vs. automatizace"
// na homepage. `/proc-automatizace` je jen kotva v rámci homepage (web byl
// sloučen zpět na jednostránkový, viz app/page.tsx) — žádná samostatná
// podstránka s delší verzí neexistuje, `body` je proto už jen tak dlouhé,
// kolik uneze babička test 2.0 (1 věta) — srovnávací tabulka níže
// (`comparisonRows`) dodává detail pro 5 z 6 bodů, takže zkrácení tady
// neztrácí informaci, jen odstraňuje duplicitu s tabulkou.
export const whyAutomationPoints = [
  {
    title: "Automatizace pracuje za vás, ne vy s ní",
    body: "Spustí se sama, hned jak nastane událost — bez otevírání ChatGPT.",
  },
  {
    title: "Propojení s vašimi systémy",
    body: "Čte a zapisuje data přímo ve vašem CRM i fakturaci.",
  },
  {
    title: "Konzistence a spolehlivost",
    body: "Běží pokaždé stejně, bez ohledu na to, kdo je u počítače.",
  },
  {
    title: "Bezpečnost vašich dat",
    body: "Data zůstávají ve vašich systémech, ne ve veřejném ChatGPT.",
  },
  {
    title: "Škáluje se s vámi",
    body: "Zvládne pět požadavků denně stejně snadno jako pět tisíc.",
  },
  {
    title: "Čas, který se skutečně sečte",
    body: "Pár ušetřených minut denně jsou za měsíc desítky hodin navíc.",
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

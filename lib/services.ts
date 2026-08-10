// Jediný zdroj pravdy pro sekci Služby na homepage — stejnou konvencí
// jako lib/automation-areas.ts a lib/faq.ts. Když se obsah služeb mění,
// mění se tady, ne v komponentě.
//
// TYP ZÁMĚRNĚ NEMÁ POLE PRO CENU a nikdy ho mít nebude. Web neuvádí
// žádnou částku ani rozmezí (viz claude.md, "Co se nikdy nedělá") —
// tvar dat to má vynucovat, ne až kontrola v code review. Ze stejného
// důvodu tu není ani `href`: karty vedou výhradně na kontaktní sekci a
// cíl je konstanta v komponentě, ne pole v datech, aby do něj nešlo
// propašovat odkaz na ceník.
export type Service = {
  slug: string;
  title: string;
  summary: string;
};

// Služby potvrzené uživatelem 2026-08-10 (Fáze 6, viz
// docs/plan-repozice-2026-08.md, sekce 6). Pět položek místo tří
// z původního návrhu — uživatel chtěl zobrazit všechny, ne redukovat na
// tři, takže grid v components/home/Services.tsx počítá s pěti kartami
// (viz komentář tam k rozvržení posledního řádku).
export const services: Service[] = [
  {
    slug: "faktury",
    title: "Zpracování faktur",
    summary:
      "AI vytěží data z faktur, spáruje objednávky a upozorní na nesrovnalosti.",
  },
  {
    slug: "emailova-komunikace",
    title: "E-mailová komunikace",
    summary:
      "Personalizované e-maily a připomínky se odešlou samy, přesně ve správný čas.",
  },
  {
    slug: "prepisy-dokumentu",
    title: "Přepisy dokumentů",
    summary:
      "AI přečte PDF nebo scan a data rovnou zapíše do vašeho systému.",
  },
  {
    slug: "newslettery",
    title: "Automatické newslettery",
    summary:
      "Pravidelný obsah pro zákazníky se sestaví a odešle bez zásahu člověka.",
  },
  {
    slug: "chatbot",
    title: "Chatbot na míru",
    summary:
      "Odpovídá zákazníkům z vašich dat 24/7 a složitější dotazy předá vám.",
  },
];

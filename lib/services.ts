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

// STATUS: čeká na výběr konkrétních služeb (Fáze 6, viz
// docs/plan-repozice-2026-08.md, sekce 6 a 12 — "služby ještě uvidíme").
// Placeholdery jsou tu schválně viditelné, ne vyplněné odhadem: podle
// claude.md se mezery v obchodním obsahu neřeší vlastní interpretací.
//
// Až přijdou reálné služby, jako výchozí inspirace (ne uzavřený seznam)
// slouží příklady z v1 plánu: vytěžování a tvorba faktur, automatické
// odesílání e-mailů, tvorba příspěvků na sociální sítě, přepisy PDF
// dokumentů, automatická příprava nabídek.
export const services: Service[] = [
  {
    slug: "doplnit-1",
    title: "[DOPLNIT — služba 1]",
    summary: "[DOPLNIT — jedna věta, co služba dělá. Čeká na Fázi 6.]",
  },
  {
    slug: "doplnit-2",
    title: "[DOPLNIT — služba 2]",
    summary: "[DOPLNIT — jedna věta, co služba dělá. Čeká na Fázi 6.]",
  },
  {
    slug: "doplnit-3",
    title: "[DOPLNIT — služba 3]",
    summary: "[DOPLNIT — jedna věta, co služba dělá. Čeká na Fázi 6.]",
  },
];

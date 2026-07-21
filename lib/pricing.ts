// Jediný zdroj pravdy pro cenová pásma — sdíleno mezi /cenik (plný obsah)
// a homepage sekcí Ceník (zúžený výběr), aby čísla nemohla mezi oběma
// místy zdriftovat. Ceny se nemění bez výslovného souhlasu (viz claude.md).
export type PricingTier = {
  emoji: string;
  title: string;
  price: string;
  body: string;
  example: string;
};

export const pricingTiers: PricingTier[] = [
  {
    emoji: "🟢",
    title: "Menší automatizace",
    price: "od 8 000 Kč",
    body: "Propojení dvou systémů, jednoduchý a přímočarý proces, rychlé nasazení.",
    example:
      "Příklad: nový lead z formuláře automaticky přidán do e-mailového nástroje a nahlášen týmu.",
  },
  {
    emoji: "🟡 ",
    title: "Střední automatizace",
    price: "od 20 000 Kč",
    body: "Propojení více systémů, reálná rozhodovací logika, případně AI pro klasifikaci nebo vytěžování dat.",
    example:
      "Příklad: AI přečte příchozí fakturu, zkontroluje ji proti objednávce a buď ji rovnou zaúčtuje, nebo ji s vysvětlením předá ke kontrole.",
  },
  {
    emoji: "🔴",
    title: "Větší automatizace",
    price: "od 50 000 Kč",
    body: "Komplexní vícekrokové workflow napříč mnoha systémy, AI agenti s pamětí a vlastním rozhodováním, robustní ošetření chyb a přehledy pro váš tým.",
    example:
      "Příklad: kompletní automatizace zákaznické podpory — AI agent samostatně řeší běžné požadavky napříč CRM a fakturačním systémem, složitější případy eskaluje s plným kontextem.",
  },
];

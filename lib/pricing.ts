// Jediný zdroj pravdy pro cenová pásma — sdíleno mezi /cenik (plný obsah)
// a homepage sekcí Ceník (zúžený výběr), aby čísla nemohla mezi oběma
// místy zdriftovat. Ceny se nemění bez výslovného souhlasu (viz claude.md).
export type PricingTier = {
  title: string;
  price: string;
  description: string;
};

export const pricingTiers: PricingTier[] = [
  {
    title: "Menší automatizace",
    price: "od 8 000 Kč",
    description: "Propojení dvou systémů, rychlé nasazení.",
  },
  {
    title: "Střední automatizace",
    price: "od 20 000 Kč",
    description: "Víc systémů, rozhodovací logika, případně AI klasifikace dat.",
  },
  {
    title: "Větší automatizace",
    price: "od 50 000 Kč",
    description: "Vícekrokové workflow a AI agenti s vlastním rozhodováním.",
  },
];

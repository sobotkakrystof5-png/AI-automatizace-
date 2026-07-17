const tiers = [
  {
    emoji: "🟢",
    title: "Menší automatizace",
    price: "od 8 000 Kč",
    body: "Propojení dvou systémů, jednoduchý a přímočarý proces, rychlé nasazení.",
    example:
      "Příklad: nový lead z formuláře automaticky přidán do e-mailového nástroje a nahlášen týmu.",
  },
  {
    emoji: "🟡",
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

export default function Pricing() {
  return (
    <section className="bg-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Ceník
        </h1>
        <p className="mt-4 max-w-3xl text-zinc-400">
          {'Cena automatizace se neodvíjí od toho, "kolik trvalo ji postavit", ale od toho, kolik systémů propojuje, jak složitá je její logika a jak velké riziko a hodnotu klientovi přináší. Proto nabízíme tři orientační pásma:'}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.title}
              className="flex flex-col rounded-lg border border-zinc-800 bg-zinc-950 p-6"
            >
              <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-50">
                <span aria-hidden>{tier.emoji}</span> {tier.title}
              </h3>
              <p className="mt-1 text-xl font-bold text-brand-gold">
                {tier.price}
              </p>
              <p className="mt-3 text-zinc-400">{tier.body}</p>
              <p className="mt-4 text-sm italic text-zinc-400">
                {tier.example}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 font-semibold text-zinc-50">
          Přesná cena vždy vychází z konzultace — u střední a větší
          automatizace záleží na počtu propojených systémů, množství logiky
          a objemu dat, a čísla výše jsou orientační výchozí bod, ne finální
          nabídka.
        </p>

        <p className="mt-4 text-zinc-400">
          <span className="font-semibold text-zinc-50">
            Nevíte přesně, kterou automatizaci potřebujete?
          </span>{" "}
          Nabízíme samostatný automatizační audit za 4 999 Kč (viz sekce
          Proces práce) — konkrétní doporučení, co se vyplatí řešit jako
          první. Cenu auditu odečítáme z ceny realizace, pokud se rozhodnete
          jít dál.
        </p>

        <div className="mt-10 rounded-lg border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-lg font-semibold text-zinc-50">
            Průběžná podpora (volitelně)
          </h3>
          <p className="mt-2 text-zinc-400">
            Pro klienty, kteří chtějí mít jistotu, že automatizace poběží
            spolehlivě i při změnách na straně propojených nástrojů,
            nabízíme měsíční paušál na monitoring, drobné úpravy a
            přednostní podporu — cena podle rozsahu a počtu automatizací v
            provozu.
          </p>
        </div>
      </div>
    </section>
  );
}

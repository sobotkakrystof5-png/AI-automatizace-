import Link from "next/link";
import AutomationJourney from "@/components/motion/AutomationJourney";

export default function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-6 sm:px-8 sm:pt-32">
        <div className="flex flex-col items-start gap-8">
          {/* Jediné místo na webu, kde se sahá nad text-5xl (viz DESIGN.md
              §3). Zalomení je záměrné, ne náhoda šířky: první věta mluví o
              zákazníkovi, druhá o nás. Proto <span className="block">, ne
              spoléhání na wrap.

              Repozice 2026-08-09: nahradila motto „Chytrá automatizace.
              Lidský přístup." claimem „Automatizujeme rutinu. Vy se věnujte
              byznysu." Ten 2026-08-10 nahrazen aktuálním zněním na výslovnou
              volbu uživatele (AskUserQuestion ze tří variant): zákazník je
              teď v pořadí první a druhá věta je oznamovací, ne rozkazovací
              („Vy se věnujte…" byl imperativ vůči návštěvníkovi, který zatím
              nic neodsouhlasil). Sloveso „automatizujeme" muselo zůstat.
              Claim je zároveň <title> (app/layout.tsx), takže bez něj by z
              title tagu vypadl kořen „automatiz-". Motto je v claude.md
              chráněné tvrzení, tohle není precedens pro další úpravy. */}
          <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-zinc-50 sm:text-7xl lg:text-8xl">
            Vy řešíte byznys.
            <span className="block text-zinc-400">Rutinu automatizujeme my.</span>
          </h1>
          <p className="max-w-xl text-xl font-medium text-zinc-200 sm:text-2xl">
            Pomáháme firmám soustředit se na to, co má pro jejich byznys
            skutečně smysl. Odebíráme jim rutinní procesy, které za ně
            zvládne automatizace.
          </p>
          {/* TODO: přepnout na ZAKAZIQ_BOOKING_URL, až bude k dispozici */}
          {/* Jednotná vstupní nabídka celého webu (rozhodnutí 2026-08-05).
              Dřív tu stála celá věta "Rezervovat konzultaci zdarma — popište
              svůj projekt". Na tlačítku se věta nečte, čte se slib. Doplněk
              se přesunul pod tlačítko, kde na něj je místo. */}
          <div className="flex flex-col items-start gap-3">
            <Link
              href="/#kontakt"
              className="rounded-full bg-brand-turquoise px-8 py-4 text-lg font-medium text-zinc-950 transition-opacity hover:opacity-90"
            >
              Konzultace zdarma
            </Link>
            {/* Dřív „Popište, co vás brzdí". Formulář se na to od
                2026-08-09 už neptá (viz claude.md, „Obchodní tvrzení a
                leadový formulář"), takže by ta výzva mířila do prázdna. */}
            <p className="text-sm text-zinc-400">
              Nezávazně. Ozvu se do 24 hodin.
            </p>
          </div>
        </div>
      </div>

      <AutomationJourney />
    </section>
  );
}

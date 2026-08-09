import Link from "next/link";
import AutomationJourney from "@/components/motion/AutomationJourney";

export default function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-6 sm:px-8 sm:pt-32">
        <div className="flex flex-col items-start gap-8">
          {/* Jediné místo na webu, kde se sahá nad text-5xl (viz DESIGN.md
              §3). Zalomení je záměrné, ne náhoda šířky: druhá věta je slib
              zákazníkovi a stojí proti první, která mluví o nás — proto
              <span className="block">, ne spoléhání na wrap.

              Repozice 2026-08-09: nahrazuje dřívější motto „Chytrá
              automatizace. Lidský přístup." Změnu potvrdil uživatel
              výslovně (motto je v claude.md chráněné) — viz
              docs/plan-repozice-2026-08.md, sekce 5. */}
          <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-zinc-50 sm:text-7xl lg:text-8xl">
            Automatizujeme rutinu.
            <span className="block text-zinc-400">Vy se věnujte byznysu.</span>
          </h1>
          <p className="max-w-xl text-xl font-medium text-zinc-200 sm:text-2xl">
            Postavil jsem si vlastní automatizační systém. Teď stejné
            know-how nabízím menším a středně velkým firmám.
          </p>
          {/* TODO: přepnout na ZAKAZIQ_BOOKING_URL, až bude k dispozici */}
          {/* Jednotná vstupní nabídka celého webu (rozhodnutí 2026-08-05).
              Dřív tu stála celá věta "Rezervovat konzultaci zdarma — popište
              svůj projekt" — na tlačítku se věta nečte, čte se slib. Doplněk
              se přesunul pod tlačítko, kde na něj je místo. */}
          <div className="flex flex-col items-start gap-3">
            <Link
              href="/#kontakt"
              className="rounded-full bg-brand-turquoise px-8 py-4 text-lg font-medium text-zinc-950 transition-opacity hover:opacity-90"
            >
              Konzultace zdarma
            </Link>
            {/* Dřív „Popište, co vás brzdí" — formulář se na to od
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

import Link from "next/link";
import AutomationJourney from "@/components/motion/AutomationJourney";

export default function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-6 sm:px-8 sm:pt-32">
        <div className="flex flex-col items-start gap-8">
          {/* Jediné místo na webu, kde se sahá nad text-5xl (viz DESIGN.md
              §3). Zalomení je záměrné, ne náhoda šířky: „Lidský přístup."
              má stát na vlastním řádku jako protiváha k technické první
              větě — proto <span className="block">, ne spoléhání na wrap. */}
          <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-zinc-50 sm:text-7xl lg:text-8xl">
            Chytrá automatizace.
            <span className="block text-zinc-400">Lidský přístup.</span>
          </h1>
          <p className="max-w-xl text-xl font-medium text-zinc-200 sm:text-2xl">
            Váš čas patří zákazníkům, ne excelu.
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
            <p className="text-sm text-zinc-400">
              Popište, co vás brzdí. Ozveme se do 24 hodin.
            </p>
          </div>
        </div>
      </div>

      <AutomationJourney />
    </section>
  );
}

import MagneticLink from "@/components/motion/MagneticLink";
import FlowDiagramLazy from "@/components/motion/FlowDiagramLazy";

export default function Hero() {
  return (
    <section>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Chytrá automatizace. Lidský přístup.
          </h1>
          <p className="text-xl font-medium text-zinc-200 sm:text-2xl">
            Váš čas patří zákazníkům, ne excelu.
          </p>
          <p className="max-w-2xl text-lg text-zinc-400">
            Bereme firmám zpátky hodiny strávené opakovanou administrativou —
            a vracíme je tam, kam patří: k zákazníkům, k růstu, k práci,
            která vás baví.
          </p>
          {/* TODO: přepnout na ZAKAZIQ_BOOKING_URL, až bude k dispozici */}
          <MagneticLink
            href="/#kontakt"
            className="rounded-full bg-brand-gold px-6 py-3 text-base font-medium text-zinc-950 transition-opacity hover:opacity-90 sm:px-8 sm:py-4 sm:text-lg"
          >
            Rezervovat konzultaci zdarma — popište svůj projekt
          </MagneticLink>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
            Jak to vypadá v praxi
          </p>
          <FlowDiagramLazy />
        </div>
      </div>
    </section>
  );
}

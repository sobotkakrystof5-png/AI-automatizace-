import { ZAKAZIQ_BOOKING_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="bg-brand-navy text-brand-cream">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-20 sm:px-8 sm:py-28">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Chytrá automatizace. Lidský přístup.
        </h1>
        <p className="text-xl font-medium text-brand-cream/90 sm:text-2xl">
          Váš čas patří zákazníkům, ne excelu.
        </p>
        <p className="max-w-2xl text-lg text-brand-cream/80">
          Bereme firmám zpátky hodiny strávené opakovanou administrativou — a
          vracíme je tam, kam patří: k zákazníkům, k růstu, k práci, která
          vás baví.
        </p>
        <a
          href={ZAKAZIQ_BOOKING_URL}
          className="rounded-full bg-brand-gold px-6 py-3 text-base font-medium text-black transition-opacity hover:opacity-90 sm:px-8 sm:py-4 sm:text-lg"
        >
          Rezervovat konzultaci zdarma — popište svůj projekt
        </a>
      </div>
    </section>
  );
}

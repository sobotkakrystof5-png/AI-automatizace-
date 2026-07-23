import Link from "next/link";
import AutomationJourney from "@/components/motion/AutomationJourney";

export default function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-2xl px-6 pt-20 pb-4 sm:px-8 sm:pt-28">
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Chytrá automatizace. Lidský přístup.
          </h1>
          <p className="text-xl font-medium text-zinc-200 sm:text-2xl">
            Váš čas patří zákazníkům, ne excelu.
          </p>
          {/* TODO: přepnout na ZAKAZIQ_BOOKING_URL, až bude k dispozici */}
          <Link
            href="/#kontakt"
            className="rounded-full bg-brand-turquoise px-6 py-3 text-base font-medium text-zinc-950 transition-opacity hover:opacity-90 sm:px-8 sm:py-4 sm:text-lg"
          >
            Rezervovat konzultaci zdarma — popište svůj projekt
          </Link>
        </div>
      </div>

      <AutomationJourney />
    </section>
  );
}

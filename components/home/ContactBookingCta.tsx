import Link from "next/link";
import { ZAKAZIQ_BOOKING_URL, isBookingUrlConfigured } from "@/lib/constants";

// Rezervace termínu. Nástroj potvrzen (ZakazIQ), ale URL zatím neexistuje.
// `ZAKAZIQ_BOOKING_URL` je pořád placeholder.
//
// POZOR na past, která vznikla sloučením sekcí 2026-08-09: dřív tohle
// tlačítko odkazovalo na `/#kontakt` s poznámkou "přesměrujeme vás na
// formulář níže". Po sloučení JE `/#kontakt` tahle sekce. Tlačítko by
// scrollovalo samo na sebe a poznámka by lhala. Proto se dokud není URL
// nastavená nerenderuje žádné tlačítko, jen věcná poznámka; formulář
// přímo nad ní je CTA sám o sobě.
//
// Až bude URL reálná, stačí změnit tenhle soubor a zvážit přesun sekce
// nad formulář, protože kalendář se pak stane preferovanou cestou.
// Kalendářový booking se v téhle fázi NESTAVÍ (viz
// docs/plan-repozice-2026-08.md, sekce 10a, budoucí fáze).
export default function ContactBookingCta() {
  if (!isBookingUrlConfigured) {
    return (
      <p className="text-sm text-zinc-400">
        Rezervační kalendář zatím připravuju. Zatím stačí formulář výše.
      </p>
    );
  }

  return (
    <div>
      <p className="text-sm text-zinc-400">
        Radši si rovnou vyberete termín?
      </p>
      <Link
        href={ZAKAZIQ_BOOKING_URL}
        className="mt-3 inline-block rounded-full bg-brand-turquoise px-6 py-3 text-base font-medium text-zinc-950 transition-opacity hover:opacity-90"
      >
        Vybrat termín v kalendáři
      </Link>
    </div>
  );
}

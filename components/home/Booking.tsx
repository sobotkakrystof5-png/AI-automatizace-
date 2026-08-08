import Link from "next/link";
import AnimatedSection from "@/components/motion/AnimatedSection";
import LiveSystemFlow from "@/components/motion/LiveSystemFlow";
import { ZAKAZIQ_BOOKING_URL, isBookingUrlConfigured } from "@/lib/constants";

// Fáze R9 redesignu — samostatná booking sekce hned před rozšířeným
// intake formulářem (FinalCTA), jak žádá docs/redesign-kickoff-prompt.md.
// Nástroj potvrzen uživatelem 2026-07-21: ZakazIQ, ale konkrétní URL
// zatím neexistuje — dokud `ZAKAZIQ_BOOKING_URL` zůstává placeholder,
// tlačítko vede na kontaktní formulář (`/#kontakt`) místo mrtvého odkazu.
export default function Booking() {
  return (
    // Dvousloupcová kompozice místo dřívějšího vystředěného bloku: sekce
    // teď nese vizuál, tak dostala standardní rytmus a širší kontejner
    // (DESIGN.md §5, "text s doprovodným vizuálem").
    <section>
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Vyberte si termín konzultace
            </h2>
            <p className="mt-3 text-zinc-400">
              Nezávazná konzultace zdarma, přímo v kalendáři ZakazIQ.
            </p>

            {/* Popisek se řídí tím, kam odkaz reálně vede. Dokud je
                ZAKAZIQ_BOOKING_URL placeholder, tlačítko slibovalo kalendář a
                doručilo formulář — teď slibuje to, co doručí. */}
            <Link
              href={isBookingUrlConfigured ? ZAKAZIQ_BOOKING_URL : "/#kontakt"}
              className="mt-6 inline-block rounded-full bg-brand-turquoise px-6 py-3 text-base font-medium text-zinc-950 transition-opacity hover:opacity-90"
            >
              {isBookingUrlConfigured
                ? "Vybrat termín v kalendáři"
                : "Konzultace zdarma"}
            </Link>

            {!isBookingUrlConfigured && (
              <p className="mt-3 text-sm text-zinc-400">
                Kalendář zatím připravujeme — zatím vás přesměrujeme na
                formulář níže.
              </p>
            )}
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <LiveSystemFlow />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

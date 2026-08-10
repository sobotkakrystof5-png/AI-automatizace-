import AnimatedSection from "@/components/motion/AnimatedSection";
import ContactLeadForm from "@/components/home/ContactLeadForm";
import ContactChannels from "@/components/home/ContactChannels";
import ContactBookingCta from "@/components/home/ContactBookingCta";

// Finální sekce webu — sloučení dřívějších tří samostatných sekcí
// (Contact + Booking + FinalCTA) do jedné, podle
// docs/plan-repozice-2026-08.md, sekce 9 ("Umístění").
//
// Kotva `id="kontakt"` je zachovaná záměrně: míří na ni šest míst napříč
// webem (Hero, Navbar 2×, FAQ, AutomationJourney, /automatizace/[slug]).
// Díky tomu si sloučení nevyžádalo úpravu ani jednoho z nich.
//
// `bg-zinc-900` je tu v souladu s DESIGN.md §5 — je to rozhodovací sekce,
// přesně ten případ, pro který je ta plocha vyhrazená.
//
// Pořadí uvnitř: formulář → přímé kanály → rezervace. Úkolem sekce je
// formulář; kanály jsou úniková cesta a rezervace zatím jen poznámka.
//
// Vizuál `LiveSystemFlow` z bývalé Booking sekce se sem záměrně
// nepřenesl — jeho obsah mluví o ZakazIQ, takže patří do sekce ZakazIQ.
// Od Fáze 4 (2026-08-09) je zapojený tam (`components/home/ZakazIq.tsx`);
// sem se nevrací ani jako doplněk, kontakt není místo na popis produktu.
export default function ContactSection() {
  return (
    <section id="kontakt" className="bg-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8 sm:py-32">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Pojďme na to
          </h2>
          <p className="mt-4 text-xl text-zinc-400">
            Stačí jméno a e-mail. Ozvu se do 24 hodin s konkrétním nápadem,
            ne s prodejní řečí.
          </p>
        </AnimatedSection>

        <div className="mt-10 border-t border-zinc-800 pt-8">
          <ContactLeadForm />
        </div>

        <div className="mt-12 space-y-8 border-t border-zinc-800 pt-8">
          <ContactChannels />
          <ContactBookingCta />
        </div>
      </div>
    </section>
  );
}

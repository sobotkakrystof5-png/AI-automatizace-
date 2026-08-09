import AnimatedSection from "@/components/motion/AnimatedSection";
import { ClockIcon, ChatIcon, GearIcon } from "@/components/motion/process-icons";

// Pruh důvěry hned pod hero (repozice 2026-08-09, viz
// docs/plan-repozice-2026-08.md, sekce 2). Záměrně BEZ `GlowCard`: řada
// orámovaných karet by byla k nerozeznání od ostatních sekcí a udělala by
// z lehkého pruhu další "blok karet". Rytmus `py-12 sm:py-16` je podle
// DESIGN.md §5 tier "Pás", pro který je tahle sekce doslova příkladem.
//
// Body jsou v první osobě jednotného čísla — je to osobní sekce, ne
// značkové sdělení (viz claude.md, "Hranice ‚já' / ‚my'").
const points = [
  { Icon: ClockIcon, text: "Odpovídám do 24 hodin" },
  { Icon: ChatIcon, text: "Komunikujete přímo se mnou" },
  { Icon: GearIcon, text: "Automatizace na míru, ne šablona" },
];

export default function TrustStrip() {
  return (
    <section aria-label="Proč se mnou spolupracovat">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
        {/* AnimatedSection je uvnitř <li>, ne kolem něj: <ul> smí přímo
            obsahovat jen <li>, takže obalový <div> mezi nimi je nevalidní
            HTML a čtečkám rozbije sémantiku seznamu. Stejné pořadí drží
            i ProcessSteps.tsx. */}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {points.map((point, i) => (
            <li key={point.text}>
              <AnimatedSection
                delay={i * 0.08}
                className="flex items-center gap-3"
              >
                <point.Icon
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-brand-turquoise"
                />
                <span className="text-sm text-zinc-400">{point.text}</span>
              </AnimatedSection>
            </li>
          ))}
        </ul>

        {/* Citace je výrok Kryštofa Sobotky, ne klientská reference —
            atribuce to musí říkat jednoznačně, jinak by šlo o vymyšlenou
            důvěryhodnost (claude.md, "Co se nikdy nedělá"). Plán ji uvádí
            i v hero (sekce 5); rozhodnuto 2026-08-09, že zazní jen tady,
            aby se dvě sekce po sobě neopakovaly doslova. */}
        <AnimatedSection delay={0.24}>
          <figure className="mt-10 max-w-3xl border-t border-zinc-800 pt-8">
            <blockquote className="text-xl font-medium text-zinc-50 sm:text-2xl">
              „Nejsem agentura, která slibuje automatizaci pro každého. Jsem
              člověk, který zautomatizoval vlastní byznys — a přesně vím, jak
              na to i u vás.“
            </blockquote>
            <figcaption className="mt-4 text-sm text-zinc-400">
              <cite className="not-italic">Kryštof Sobotka</cite> — zakladatel
              AvenIQ
            </figcaption>
          </figure>
        </AnimatedSection>
      </div>
    </section>
  );
}

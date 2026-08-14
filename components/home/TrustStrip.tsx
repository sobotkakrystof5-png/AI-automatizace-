import AnimatedSection from "@/components/motion/AnimatedSection";
import { ClockIcon, ChatIcon, GearIcon } from "@/components/motion/process-icons";

// Pruh důvěry hned pod hero (repozice 2026-08-09, viz
// docs/plan-repozice-2026-08.md, sekce 2).
//
// 2026-08-10 na výslovné zadání uživatele: tři body dostaly vlastní
// tyrkysové rámečky a větší text. Mají nést důraz, ne jen doplňovat hero.
// Tím padá původní záměr "lehký pruh bez rámečků"; rámečky se ale nedělají
// přes `GlowCard` (ta má zinc-800 border a hover s posunem; hover efekt na
// neklikatelném prvku slibuje interakci, která neexistuje), ale vlastním
// stylem: tyrkysová linka v nízké alfě + sotva znatelný tyrkysový podklad,
// aby akcent zvýrazňoval, ale nekonkuroval CTA v hero hned nad tím
// (DESIGN.md §2, "Zdrženlivost akcentu").
//
// Rytmus se zvedl z tieru "Pás" (`py-12 sm:py-16`) na "Standard"
// (`py-16 sm:py-24`) podle DESIGN.md §5. Z proužku se staly plnohodnotné
// karty a při původním rytmu by se tiskly na hero. Dva "Zlomy" po sobě to
// netvoří, hero zůstává jediný.
//
// Body jsou v první osobě jednotného čísla. Je to osobní sekce, ne
// značkové sdělení (viz claude.md, "Hranice ‚já' / ‚my'").
const points = [
  { Icon: ClockIcon, text: "Odpovídám do 24 hodin" },
  { Icon: ChatIcon, text: "Komunikujete přímo se mnou" },
  { Icon: GearIcon, text: "Automatizace na míru, ne šablona" },
];

export default function TrustStrip() {
  return (
    <section aria-label="Proč se mnou spolupracovat">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-24">
        {/* AnimatedSection je uvnitř <li>, ne kolem něj: <ul> smí přímo
            obsahovat jen <li>, takže obalový <div> mezi nimi je nevalidní
            HTML a čtečkám rozbije sémantiku seznamu. Stejné pořadí drží
            i ProcessSteps.tsx. */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {points.map((point, i) => (
            <li key={point.text}>
              <AnimatedSection
                delay={i * 0.08}
                className="flex h-full flex-col items-start gap-4 rounded-2xl border border-brand-turquoise/30 bg-brand-turquoise/[0.04] p-6 sm:p-7"
              >
                {/* Ikona v kroužku, ne holá vedle textu: v rámečku potřebuje
                    vlastní hmotu, jinak vypadá jako odrážka ztracená v ploše. */}
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-turquoise/30 bg-brand-turquoise/10"
                >
                  <point.Icon className="h-5 w-5 text-brand-turquoise" />
                </span>
                <span className="text-lg font-medium text-balance text-zinc-50">
                  {point.text}
                </span>
              </AnimatedSection>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

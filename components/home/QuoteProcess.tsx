import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";

// Nahrazuje sekci HowWeBuild (2026-08-10). Ta neměla vlastní obsah — všechny
// tři body byly duplicity: „ne podle šablony" = TrustStrip, „otestujeme před
// spuštěním" a „první měsíc podpory zdarma" byly doslovné opisy kroků 4 a 5
// z lib/process-steps.ts, které stojí jen dvě sekce nad tím.
//
// Tahle sekce odpovídá na jinou otázku než ProcessSteps, a to je celý důvod
// její existence:
//   ProcessSteps  = co se stane (timeline spolupráce)
//   QuoteProcess  = jak vzniká cena, a implicitně proč na webu není ceník
// Bod 1 proto mluví o *rozsahu*, ne o „co vás brzdí" — to je krok 1
// v ProcessSteps a zopakovat ho by znamenalo vyrobit stejnou duplicitu,
// kvůli které původní sekce padla.
//
// ŽÁDNÉ ČÍSLO. Sekce vysvětluje mechanismus vzniku ceny, ne cenu samotnou —
// tím zákaz z claude.md („Uvádět na webu jakoukoli cenu") neporušuje, ale
// podpírá ho („cena se sděluje výhradně na konzultaci"). Nikdy sem nesmí
// přibýt částka, rozmezí, „od X" ani odkaz na ceník, a lib/json-ld.ts kvůli
// téhle sekci nedostává `Offer`/`priceSpecification`.
//
// Obě obchodní tvrzení potvrdil uživatel 2026-08-10 přes AskUserQuestion —
// nejsou odvozená z jiných míst webu jako u předchozí verze sekce:
//   1. výstupem je PEVNÁ cena za dohodnutý rozsah (ne odhad, ne rozpětí),
//   2. klient ji slyší PŘÍMO NA KONZULTACI (ne až v písemné nabídce potom).
// Obojí je závazek, ne formulace — přepis, který by z „pevné ceny" udělal
// „odhad" nebo cenu odsunul za konzultaci, mění slib vůči zákazníkovi
// a chce nový souhlas.
//
// Karty se záměrně NEČÍSLUJÍ, i když jde o sled: ProcessSteps už čísluje
// 01–05 a Differentiators 1–4. Třetí číslovaná sekce na jedné stránce by
// splývala; pořadí tu nese čtecí směr.
//
// Mluví se v „my" — nacenění je proces značky AvenIQ, ne osobní vyprávění
// (claude.md, „Hranice ‚já' / ‚my'"). Stejný hlas jako ProcessSteps a Služby.
const quoteSteps = [
  {
    title: "Vymezíme rozsah",
    body: "Na konzultaci si řekneme, kam až má automatizace sahat.",
  },
  {
    title: "Cena podle rozsahu",
    body: "Spočítáme ji z vašeho zadání, ne z ceníku.",
  },
  {
    title: "Pevnou cenu řekneme hned",
    body: "Konečnou částku se dozvíte přímo na konzultaci.",
  },
];

export default function QuoteProcess() {
  return (
    <section id="naceneni">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Kolik to bude stát
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Cenu určuje rozsah vaší automatizace, ne sazebník.
          </p>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {quoteSteps.map((step, i) => (
            <AnimatedSection key={step.title} delay={Math.min(i * 0.08, 0.3)}>
              <GlowCard accent="turquoise" className="h-full p-6">
                <h3 className="text-lg font-semibold text-zinc-50">
                  {step.title}
                </h3>
                <p className="mt-2 text-zinc-400">{step.body}</p>
              </GlowCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

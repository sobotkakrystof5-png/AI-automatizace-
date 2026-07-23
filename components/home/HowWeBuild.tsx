import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";

// Tři stručné rámečky shrnující, jak se automatizace reálně staví — ne
// duplicitní 6krokový client journey (viz lib/process-steps.ts /
// ProcessSteps.tsx níže na stránce, kde jsou detailní kroky konzultace →
// audit → návrh → stavba → spuštění → podpora). Texty jsou zkrácené
// přeformulování už jinde na webu potvrzených faktů (2 roky záruky —
// About.tsx/lib/process-steps.ts, testování před nasazením —
// lib/process-steps.ts krok 4, řešení na míru — About.tsx/
// Differentiators.tsx), ne nové/nepotvrzené obchodní tvrzení; zkráceno
// podle babička testu 2.0 (claude.md).
const buildPrinciples = [
  {
    title: "Podle vašeho provozu",
    body: "Automatizaci stavíme podle toho, jak reálně pracujete — ne podle šablony.",
  },
  {
    title: "Otestováno před spuštěním",
    body: "Než se dotkne vašeho provozu, automatizaci důkladně otestujeme.",
  },
  {
    title: "Podpora i po startu",
    body: "Dva roky záruky a podpora, dokud nejste 100 % spokojeni.",
  },
];

export default function HowWeBuild() {
  return (
    <section id="jak-tvorime-automatizace">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Jak tvoříme automatizace
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Nejde o počet nástrojů, ale o ten správný a spolehlivý.
          </p>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {buildPrinciples.map((principle, i) => (
            <AnimatedSection
              key={principle.title}
              delay={Math.min(i * 0.08, 0.3)}
            >
              <GlowCard accent="turquoise" className="h-full p-6">
                <h3 className="text-lg font-semibold text-zinc-50">
                  {principle.title}
                </h3>
                <p className="mt-2 text-zinc-400">{principle.body}</p>
              </GlowCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

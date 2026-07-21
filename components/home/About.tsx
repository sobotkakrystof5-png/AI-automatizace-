import Image from "next/image";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";

const philosophyPoints = [
  {
    title: "Nejdřív pochopit, pak automatizovat.",
    body: "Žádné řešení nenabízíme dřív, než rozumíme vašemu skutečnému problému.",
  },
  {
    title: "Transparentnost především.",
    body: "Víte předem, co dostanete, za kolik, a co se stane, když se něco pokazí.",
  },
  {
    title: "Data zůstávají vaše.",
    body: "Preferujeme řešení, kde vaše firemní data neputují nikam, kam nechcete — v souladu s GDPR a evropskými standardy.",
  },
];

// Redesign 2026, Fáze R8: karta zakladatele teď nese reálnou fotku a je
// hlavním vizuálním prvkem sekce — nahrazuje dřívější oddělený odstavcový
// blok "Náš příběh" (stejná fakta o Vizeon/ZakazIQ, jen bez duplicity).
// Plný text zůstává dostupný přes `<details>` (stejný vzor jako FAQ.tsx),
// aby hlavní scroll odpovídal standardu "babička test 2.0" (max 1 věta u
// popisu), ale žádné fakty se neztrácí, jen se přesouvají do
// rozkliknutého detailu.
const STORY_STEPS = ["Vizeon", "ZakazIQ", "AvenIQ"];

export default function About() {
  return (
    <section id="o-nas">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            O nás
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <GlowCard accent="gold" className="mt-10 p-6 sm:p-8">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <Image
                src="/krystof-sobotka.jpeg"
                alt="Kryštof Sobotka"
                width={144}
                height={144}
                className="h-36 w-36 shrink-0 rounded-2xl object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-zinc-50">
                  Kryštof Sobotka
                </h3>
                <p className="text-sm text-brand-electric">
                  Zakladatel AvenIQ
                </p>

                <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                  {STORY_STEPS.map((step, i) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm text-zinc-300">
                        {step}
                      </span>
                      {i < STORY_STEPS.length - 1 && (
                        <span aria-hidden className="text-zinc-600">
                          →
                        </span>
                      )}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-zinc-400">
                  Stejný přístup, širší záběr — od webů k automatizaci
                  celých firem.
                </p>
              </div>
            </div>

            <details className="group mt-6 border-t border-zinc-800 pt-4">
              <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-brand-electric marker:content-none">
                Celý příběh
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                >
                  <path fill="currentColor" d="M5.25 7.5 10 12.25 14.75 7.5H5.25Z" />
                </svg>
              </summary>
              <div className="mt-3 space-y-3 text-zinc-400">
                <p>
                  Než vznikl AvenIQ, stál jsem dva roky za projektem{" "}
                  <strong className="font-semibold text-zinc-50">
                    Vizeon
                  </strong>{" "}
                  — tvorbou webů na míru pro živnostníky a malé firmy. V
                  desítkách rozhovorů s majiteli firem vyšlo najevo skoro
                  pokaždé to samé: netrápil je vzhled webu, ale hodiny
                  ztracené ručním papírováním, přepisováním objednávek a
                  excelovými tabulkami.
                </p>
                <p>
                  V rámci Vizeonu jsem si postavil vlastní systém{" "}
                  <strong className="font-semibold text-zinc-50">
                    ZakazIQ
                  </strong>{" "}
                  — automaticky řeší komunikaci s klienty, rezervace i
                  připomínky. Fungoval tak dobře, že mi došlo: tohle není
                  jen pomůcka pro webařství, tohle je byznys sám o sobě.
                </p>
                <p>
                  Tak vznikl AvenIQ — navazuji na dva roky zkušeností s
                  reálnými klienty a přesouvám se z tvorby webů do AI
                  automatizace celých firemních procesů.
                </p>
              </div>
            </details>
          </GlowCard>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <div className="mt-10">
            <p className="text-zinc-400">
              Zatím na projektu pracuju sám, přímo s vámi — odpovídám do 24
              hodin.
            </p>

            <details className="group mt-3 rounded-lg border border-zinc-800 bg-zinc-900 p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-zinc-50 marker:content-none">
                Co když budete nemocný nebo na dovolené?
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  className="h-4 w-4 shrink-0 text-brand-electric transition-transform group-open:rotate-180"
                >
                  <path fill="currentColor" d="M5.25 7.5 10 12.25 14.75 7.5H5.25Z" />
                </svg>
              </summary>
              <p className="mt-3 text-zinc-400">
                Každou automatizaci dokumentuji tak, aby ji v nutném případě
                (dovolená, nemoc) převzal i externí n8n specialista, se
                kterým spolupracuji — i dnes tak máte jistotu, že
                automatizace nezůstane bez podpory.
              </p>
            </details>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-zinc-50">
              Naše filozofie
            </h3>
            <p className="mt-3 italic text-zinc-400">
              Automatizujeme to, co vás brzdí — ne to, co je trendy.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {philosophyPoints.map((point, i) => (
                <AnimatedSection key={point.title} delay={0.1 + i * 0.06}>
                  <GlowCard accent="electric" className="h-full p-5">
                    <p className="font-semibold text-zinc-50">
                      {point.title}
                    </p>
                    <p className="mt-2 text-sm text-zinc-400">{point.body}</p>
                  </GlowCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

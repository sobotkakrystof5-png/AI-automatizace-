"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

const pillars = [
  {
    title: "1. Zajímá nás váš problém, ne váš software",
    body: "Neptáme se, jaký nástroj chcete propojit. Ptáme se, co vás na provozu skutečně brzdí — a teprve pak hledáme řešení. Automatizace bez reálného problému je jen drahá hračka.",
    tagline: "Automatizujeme to, co vás brzdí — ne to, co je trendy.",
  },
  {
    title: "2. Nezmizíme po spuštění",
    body: "Automatizace se dřív nebo později rozbije — API se změní, firma vyroste. Většina dodavatelů v tu chvíli mlčí. My máme jasně definovanou podporu: víte předem, co se stane a jak rychle zareagujeme.",
    tagline: "Podpora po spuštění je součást dohody, ne laskavost.",
  },
  {
    title: "3. Řekneme vám i to, co se automatizovat nevyplatí",
    body: "Nejcennější není konzultant, který postaví cokoliv chcete — je to ten, kdo vás odradí od funkce bez návratnosti. Radši vám ušetříme peníze, než prodáme něco, co nevyužijete.",
    tagline: "Stavíme jen to, co se vám vrátí.",
  },
  {
    title: "4. Naši jednoduchost nemusíte věřit na slovo — zažijete ji",
    body: "Než s námi promluvíte, projdete si rezervaci přes náš vlastní systém ZakazIQ: termín, potvrzení, připomínka SMS i e-mailem. Žádné volání, žádné čekání. Přesně takhle bude fungovat i vaše automatizace.",
    tagline: "Jednoduchost, kterou napřed zažijete — ne jen slíbíme.",
  },
];

export default function Differentiators() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            V čem jsme jiní
          </h2>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {pillars.map((p, i) => (
              <button
                key={p.title}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`shrink-0 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors lg:shrink ${
                  active === i
                    ? "border-brand-turquoise bg-zinc-900 text-zinc-50"
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          <GlowCard
            accent="turquoise"
            className="relative flex min-h-[220px] flex-col justify-center overflow-hidden bg-zinc-900 p-6 sm:p-8"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -top-6 select-none text-[7rem] font-bold leading-none text-brand-turquoise/10 sm:text-[9rem]"
            >
              0{active + 1}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
              >
                <p className="text-2xl font-semibold leading-snug text-zinc-50 sm:text-3xl">
                  {pillars[active].tagline}
                </p>
                <details className="group mt-4">
                  <summary className="flex cursor-pointer list-none items-center gap-2 text-sm text-brand-turquoise marker:content-none">
                    Proč
                    <svg
                      aria-hidden
                      viewBox="0 0 20 20"
                      className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                    >
                      <path
                        fill="currentColor"
                        d="M5.25 7.5 10 12.25 14.75 7.5H5.25Z"
                      />
                    </svg>
                  </summary>
                  <p className="mt-2 text-zinc-400">{pillars[active].body}</p>
                </details>
              </motion.div>
            </AnimatePresence>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedSection from "@/components/motion/AnimatedSection";
import { processSteps } from "@/lib/process-steps";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// Interaktivní timeline spolupráce. Vizuálně stejná rodina prvků jako
// svislý ukazatel kroku v AutomationJourney.tsx: velká čísla, tyrkysová
// spojnice, aktivní krok zvýrazněný.
//
// Repozice 2026-08-09: 6 kroků → 5 (viz lib/process-steps.ts) a zrušeno
// rozbalování "Zobrazit víc". U jednořádkových kroků nemělo co odkrývat.
// Obě animace (GSAP scrub spojnice, scrollspy) jsou řízené indexem, ne
// počtem kroků, takže změnu počtu přežily beze změny logiky; doladily se
// jen časovací konstanty, protože sekce je po zkrácení kroků výrazně
// nižší. Viz komentáře u `start`/`end` a `space-y-14` níže.
export default function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(lineRef.current, { scaleY: 1 });
        return;
      }

      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top" });
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          // Dřív "top 70%" / "bottom 60%". Po zkrácení kroků je kontejner
          // o poznání nižší, takže se scrub stihl dojet skoro okamžitě.
          // Širší okno drží spojnici v pohybu po celou dobu čtení sekce.
          start: "top 80%",
          end: "bottom 70%",
          scrub: 0.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Aktivní krok reaguje na scroll: sleduje, který krok právě prochází
  // vodorovným pásem uprostřed obrazovky (běžný "scrollspy" vzor), ne na
  // automatický časovač.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = stepRefs.current.findIndex((el) => el === entry.target);
          if (index !== -1) setActiveStep(index);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="spoluprace" className="bg-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Jak spolupráce probíhá
          </h2>
        </AnimatedSection>

        <div ref={containerRef} className="relative mt-12 pl-16">
          <div
            aria-hidden
            className="absolute left-7 top-0 bottom-0 w-px bg-zinc-800"
          />
          <div
            ref={lineRef}
            aria-hidden
            className="absolute left-7 top-0 bottom-0 w-px bg-brand-turquoise"
          />

          {/* Dřív `space-y-10`. Zkrácené kroky jsou nižší než pás, který
              scrollspy sleduje (`rootMargin: -45%`), takže by v něm často
              byly dva kroky naráz a aktivní kolečko by poskakovalo.
              Větší mezera drží krok i s odstupem vyšší než ten pás. */}
          <ol className="space-y-14">
            {processSteps.map((step, i) => {
              const isActive = activeStep === i;

              return (
                <li
                  key={step.title}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="relative"
                >
                  <span
                    aria-hidden
                    className={cx(
                      "absolute -left-14 top-0 flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm font-semibold transition-colors duration-300",
                      isActive
                        ? "border-brand-turquoise bg-brand-turquoise/10 text-brand-turquoise"
                        : "border-zinc-700 text-zinc-400"
                    )}
                  >
                    {pad(i + 1)}
                  </span>
                  <AnimatedSection delay={Math.min(i * 0.05, 0.3)}>
                    <h3 className="text-lg font-semibold text-zinc-50">
                      {step.title}
                    </h3>
                    {step.summary && (
                      <p className="mt-2 text-zinc-400">{step.summary}</p>
                    )}
                  </AnimatedSection>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

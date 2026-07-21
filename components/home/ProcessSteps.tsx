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

// Interaktivní timeline procesu (Fáze R6, redesign 2026) — vizuálně stejná
// rodina prvků jako svislý ukazatel kroku v AutomationJourney.tsx (Fáze
// R3): velká čísla, modrá spojnice, aktivní krok zvýrazněný. Obsah kroků
// (`lib/process-steps.ts`) se nemění (Varianta A, potvrzeno uživatelem ve
// Fázi R0) — homepage jen zobrazí kratší `homeSummary` a plný `body`/`note`
// odkryje až klik na "Zobrazit víc" (viz komentář u ProcessStep typu,
// proč tu už není odkaz na `/proces-prace`).
export default function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [expanded, setExpanded] = useState<boolean[]>(() =>
    processSteps.map(() => false)
  );

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
          start: "top 70%",
          end: "bottom 60%",
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

  function toggleExpanded(index: number) {
    setExpanded((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }

  return (
    <section id="proces-prace" className="bg-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Proces práce
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
            className="absolute left-7 top-0 bottom-0 w-px bg-brand-electric"
          />

          <ol className="space-y-10">
            {processSteps.map((step, i) => {
              const isActive = activeStep === i;
              const isExpanded = expanded[i];

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
                        ? "border-brand-electric bg-brand-electric/10 text-brand-electric"
                        : "border-zinc-700 text-zinc-400"
                    )}
                  >
                    {pad(i + 1)}
                  </span>
                  <AnimatedSection delay={Math.min(i * 0.05, 0.3)}>
                    <h3 className="text-lg font-semibold text-zinc-50">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-zinc-400">{step.homeSummary}</p>

                    {isExpanded && (
                      <div className="mt-2">
                        <p className="text-zinc-400">{step.body}</p>
                        {step.note && (
                          <p className="mt-2 text-sm italic text-zinc-400">
                            {step.note}
                          </p>
                        )}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleExpanded(i)}
                      aria-expanded={isExpanded}
                      className="mt-2 text-sm font-medium text-brand-electric hover:underline"
                    >
                      {isExpanded ? "Skrýt" : "Zobrazit víc"}
                    </button>
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

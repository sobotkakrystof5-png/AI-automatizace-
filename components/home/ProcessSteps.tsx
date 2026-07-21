"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedSection from "@/components/motion/AnimatedSection";
import { processSteps } from "@/lib/process-steps";

export default function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="proces-prace" className="bg-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Proces práce
          </h2>
        </AnimatedSection>

        <div ref={containerRef} className="relative mt-12 pl-10">
          <div
            aria-hidden
            className="absolute left-3 top-0 bottom-0 w-px bg-zinc-800"
          />
          <div
            ref={lineRef}
            aria-hidden
            className="absolute left-3 top-0 bottom-0 w-px bg-brand-electric"
          />

          <ol className="space-y-10">
            {processSteps.map((step, i) => (
              <li key={step.title} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-7 top-1.5 h-2 w-2 rounded-full bg-brand-electric"
                />
                <AnimatedSection delay={Math.min(i * 0.05, 0.3)}>
                  <h3 className="text-lg font-semibold text-zinc-50">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-zinc-400">{step.body}</p>
                  {step.note && (
                    <p className="mt-2 text-sm italic text-zinc-500">
                      {step.note}
                    </p>
                  )}
                </AnimatedSection>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

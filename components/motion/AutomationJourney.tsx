"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import MagneticLink from "./MagneticLink";
import AnimatedSection from "./AnimatedSection";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useLenis } from "./SmoothScrollProvider";
import { automationAreas } from "@/lib/automation-areas";

// Vlajková scrollytelling sekce (Fáze R3, 2026-07-21) — nahrazuje dřívější
// statický FlowDiagramLazy v Hero.tsx. Vlastní, přeinterpretovaná
// implementace konceptu z automatizace-ai.cz (5 kroků, centrální tvar,
// kostky napojené kabely) — kategorie kroků i veškerý text jsou vlastní,
// záměrně jiná slova než referenční screenshoty (viz konec fáze R3 v
// souhrnu), aby nešlo o doslovné kopírování cizího textu.
type Step = {
  key: string;
  category: string;
  heading: string;
  description: string;
};

const STEPS: Step[] = [
  {
    key: "zmatek",
    category: "ZMATEK",
    heading: "Ruční práce zahlcuje váš tým.",
    description: "Úkoly se hromadí, nic není propojené.",
  },
  {
    key: "poradek",
    category: "POŘÁDEK",
    heading: "Systém automaticky roztřídí každý úkol.",
    description: "Každý úkol má hned své místo.",
  },
  {
    key: "start",
    category: "START",
    heading: "Úkoly teď běží samy.",
    description: "Opakovaná práce se spouští bez zásahu člověka.",
  },
  {
    key: "sit",
    category: "SÍŤ",
    heading: "Nástroje spolu konečně mluví.",
    description: "Marketing, podpora i účetnictví běží v jednom systému.",
  },
  {
    key: "vysledky",
    category: "VÝSLEDKY",
    heading: "Víc přehledu, míň starostí.",
    description: "Ušetřený čas věnujete zákazníkům, ne administrativě.",
  },
];

const CUBE_COUNT = 6;

function polar(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
}

function buildRing(radius: number) {
  return Array.from({ length: CUBE_COUNT }, (_, i) => polar(i * 60, radius));
}

const CHAOS_POS = [
  polar(20, 180),
  polar(80, 195),
  polar(150, 170),
  polar(205, 190),
  polar(260, 175),
  polar(320, 185),
];
const CHAOS_ROT = [-18, 24, -10, 16, -22, 12];
const RING_POS = buildRing(148);
const CLOSE_POS = buildRing(108);

function buildFacets() {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  const radii = [78, 92, 70, 96, 82, 74, 90, 84];
  const opacities = [0.1, 0.2, 0.13, 0.24, 0.11, 0.22, 0.14, 0.26];
  const outer = angles.map((a, i) => polar(a, radii[i]));
  return outer.map((p, i) => {
    const next = outer[(i + 1) % outer.length];
    return {
      points: `0,0 ${p.x.toFixed(2)},${p.y.toFixed(2)} ${next.x.toFixed(2)},${next.y.toFixed(2)}`,
      opacity: opacities[i],
    };
  });
}

const FACETS = buildFacets();

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function CentralShape({
  glowRef,
  spin = false,
}: {
  glowRef?: (el: HTMLDivElement | null) => void;
  spin?: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div
        ref={glowRef}
        aria-hidden
        className="absolute h-40 w-40 rounded-full bg-brand-electric/10 blur-3xl"
      />
      <svg
        viewBox="-110 -110 220 220"
        className={cx("h-40 w-40 sm:h-48 sm:w-48", spin && "animate-slow-spin")}
        role="img"
        aria-label="Centrální bod, kam se napojují všechny automatizace"
      >
        {FACETS.map((f, i) => (
          <polygon
            key={i}
            points={f.points}
            fill="var(--color-brand-electric)"
            fillOpacity={f.opacity}
            stroke="var(--color-brand-electric)"
            strokeOpacity={0.35}
            strokeWidth={0.75}
          />
        ))}
      </svg>
    </div>
  );
}

const VIEWPORT_QUERY = "(min-width: 768px)";

function subscribeViewport(callback: () => void) {
  const mql = window.matchMedia(VIEWPORT_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getViewportSnapshot() {
  return window.matchMedia(VIEWPORT_QUERY).matches;
}

function getViewportServerSnapshot() {
  return false;
}

// Pinovaná scrollytelling verze potřebuje dost místa (svislý ukazatel
// kroku, kostky rozmístěné do stran) a na malé obrazovce/hrubém dotyku by
// pin + scrub scroll dělal potíže (posun URL lišty v mobilních prohlížečích
// rozbíjí přesné výpočty pin pozice) — proto se aktivuje jen od `md`
// šířky, stejný `useSyncExternalStore` vzor jako `usePrefersReducedMotion`/
// `useCoarsePointer`, `false` na serveru = bezpečný mobile-first default.
function useIsDesktopViewport() {
  return useSyncExternalStore(
    subscribeViewport,
    getViewportSnapshot,
    getViewportServerSnapshot
  );
}

function StepBadge({ index, category }: { index: number; category: string }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-electric/40 bg-brand-electric/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-brand-electric">
      {pad(index + 1)} · {category}
    </span>
  );
}

function FinalCta() {
  return (
    <MagneticLink
      href="/#kontakt"
      className="mt-2 w-fit rounded-full bg-brand-gold px-6 py-3 text-base font-medium text-zinc-950 transition-opacity hover:opacity-90"
    >
      Rezervovat konzultaci zdarma
    </MagneticLink>
  );
}

function DesktopJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const cubeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const labelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cableRefs = useRef<Array<SVGPathElement | null>>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const lenisRef = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pinRef.current,
          onUpdate: (self) => {
            setActiveStep(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length)));
          },
        },
      });
      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      // Krok 1→2 (ZMATEK → POŘÁDEK): úlomky se z chaosu srovnají do
      // pravidelného kruhu kolem centra.
      cubeRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          {
            x: CHAOS_POS[i].x,
            y: CHAOS_POS[i].y,
            rotation: CHAOS_ROT[i],
            opacity: 0.5,
            scale: 0.82,
            filter: "blur(3px)",
          },
          {
            x: RING_POS[i].x,
            y: RING_POS[i].y,
            rotation: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.inOut",
          },
          1
        );
      });

      // Krok 3 (START): jemné "naskočení" každé kostky.
      cubeRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(
          el,
          { scale: 1.08, duration: 0.25, yoyo: true, repeat: 1, ease: "power1.inOut" },
          2.2 + i * 0.05
        );
      });

      // Krok 4 (SÍŤ): štítky nástrojů se objeví, kostky se přiblíží k centru.
      labelRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power1.out" },
          3 + i * 0.08
        );
      });
      cubeRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(
          el,
          { x: CLOSE_POS[i].x, y: CLOSE_POS[i].y, duration: 1, ease: "power2.inOut" },
          3
        );
      });

      // Krok 5 (VÝSLEDKY): kabely se dokreslí ke kostkám v jejich finální
      // (přiblížené) pozici.
      cableRefs.current.forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(path, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }, 4);
      });

      if (glowRef.current) {
        tl.fromTo(
          glowRef.current,
          { opacity: 0.25 },
          { opacity: 1, duration: 5, ease: "none" },
          0
        );
      }
    }, trackRef);

    return () => ctx.revert();
  }, []);

  const goToStep = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const target = st.start + ((index + 0.5) / STEPS.length) * (st.end - st.start);
    const lenis = lenisRef?.current;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  const step = STEPS[activeStep];

  return (
    <div ref={trackRef} style={{ height: `${STEPS.length * 100}vh` }} className="relative">
      <div
        ref={pinRef}
        className="mx-auto grid h-screen max-w-6xl grid-cols-2 items-center gap-12 px-6 sm:px-8 lg:px-12"
      >
        <div className="flex max-w-md flex-col gap-4">
          <StepBadge index={activeStep} category={step.category} />
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            {step.heading}
          </h2>
          <p className="text-lg text-zinc-400">{step.description}</p>
          {activeStep === STEPS.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <FinalCta />
            </motion.div>
          )}
        </div>

        <div className="relative mx-auto h-[440px] w-[440px]">
          <CentralShape glowRef={(el) => (glowRef.current = el)} spin />
          <svg
            viewBox="0 0 440 440"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {CLOSE_POS.map((pos, i) => (
              <path
                key={i}
                ref={(el) => {
                  cableRefs.current[i] = el;
                }}
                d={`M 220 220 L ${220 + pos.x} ${220 + pos.y}`}
                stroke="var(--color-brand-electric)"
                strokeWidth={1.5}
                fill="none"
              />
            ))}
          </svg>
          {automationAreas.slice(0, CUBE_COUNT).map((area, i) => (
            <div
              key={area.slug}
              ref={(el) => {
                cubeRefs.current[i] = el;
              }}
              style={{ position: "absolute", left: 220 - 28, top: 220 - 28 }}
              className="flex h-14 w-14 items-center justify-center rounded-lg border border-brand-electric/40 bg-zinc-900 text-center"
            >
              <div
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                className="px-1 text-[10px] font-medium leading-tight text-zinc-200"
              >
                {area.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-3 sm:right-8">
        {STEPS.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => goToStep(i)}
            aria-label={`Krok ${i + 1}: ${s.category}`}
            aria-current={activeStep === i}
            className={cx(
              "h-2.5 w-2.5 rounded-full border transition-colors",
              activeStep === i
                ? "border-brand-electric bg-brand-electric"
                : "border-zinc-700 bg-transparent hover:border-brand-electric/60"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function StackedJourney({ animated }: { animated: boolean }) {
  return (
    <div className="mx-auto max-w-2xl space-y-12 px-6 py-16 sm:px-8">
      {STEPS.map((step, i) => {
        const isLast = i === STEPS.length - 1;
        const content = (
          <div className="flex flex-col gap-3">
            <StepBadge index={i} category={step.category} />
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
              {step.heading}
            </h2>
            <p className="text-zinc-400">{step.description}</p>
            {isLast && (
              <div className="mt-4 flex flex-col items-center gap-6 text-center">
                <div className="relative h-40 w-40">
                  <CentralShape />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {automationAreas.slice(0, CUBE_COUNT).map((area) => (
                    <span
                      key={area.slug}
                      className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-300"
                    >
                      {area.title}
                    </span>
                  ))}
                </div>
                <FinalCta />
              </div>
            )}
          </div>
        );

        return animated ? (
          <AnimatedSection key={step.key}>{content}</AnimatedSection>
        ) : (
          <div key={step.key}>{content}</div>
        );
      })}
    </div>
  );
}

export default function AutomationJourney() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktopViewport();

  if (!prefersReducedMotion && isDesktop) {
    return <DesktopJourney />;
  }

  return <StackedJourney animated={!prefersReducedMotion} />;
}

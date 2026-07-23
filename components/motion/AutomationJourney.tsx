"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { motion } from "motion/react";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import { ToolChip } from "./ToolOrbit";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useLenis } from "./SmoothScrollProvider";
import { connectedTools, type Tool } from "@/lib/tools";

// Vlajková scrollytelling sekce (Fáze R3, 2026-07-21). Dvakrát přepracovaná
// na žádost uživatele 2026-07-22: nejdřív vizuálně prohloubená (kostky na
// prstenci kolem centrálního tvaru), pak — protože i ta verze působila
// amatérsky a nezajímavě — kompletně předělaná na skutečný workflow
// diagram v duchu nástrojů jako n8n: uzly propojené zakřivenými "kabely"
// (bezier, ne rovné spojnice ani paprsky do středu), spouštěč vlevo
// rozvětvující se do několika uzlů a ty se sbíhají do jádra AvenIQ vpravo,
// s víc částicemi dat proudícími po všech spojnicích současně. Vlastní,
// přeinterpretovaná implementace konceptu z automatizace-ai.cz (5 kroků
// příběhu) — kategorie kroků i veškerý text jsou vlastní, záměrně jiná
// slova než referenční screenshoty, aby nešlo o doslovné kopírování cizího
// textu; vizuální styl uzlů/kabelů je inspirovaný obecnou estetikou nástrojů
// pro automatizaci (n8n aj.), ne kopií konkrétního cizího designu.
//
// Potřetí upraveno 2026-07-22: diagram nejdřív spojoval 5 nesouvisejících
// log jen proto, že to byl "prvních 5 nástrojů" v seznamu — vypadalo to
// dobře, ale nedávalo to reálný smysl. Uzly teď vyprávějí JEDEN konkrétní
// scénář (viz `JOURNEY_NODES`), aby diagram četl jako skutečná
// automatizace, ne jen dekorace.
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
    description: "Ušetřený čas i peníze věnujete tomu, co má smysl.",
  },
];

// Diagram vypráví JEDEN konkrétní, srozumitelný scénář — ne 5 náhodně
// vybraných log — aby to čtenáři dávalo reálný smysl, ne jen vypadalo
// efektně (na žádost uživatele 2026-07-22). Zvolený příklad: nová
// objednávka v e-shopu automaticky spustí platbu, zápis do účetnictví,
// e-mail zákazníkovi a úkol pro tým — typický "jeden spouštěč, víc
// souběžných akcí" scénář přesně pro cílovou skupinu webu (e-commerce,
// živnostníci, malé firmy), poskládaný jen ze skutečných, už schválených
// nástrojů z `lib/tools.ts` (žádná nová/vymyšlená integrace). Uzel 0 je
// spouštěč (levý okraj diagramu), uzly 1–4 jsou souběžné větve sbíhající
// se do jádra AvenIQ vpravo — `action` popisuje krok automatizace,
// `tool` jen dodává rozpoznatelnou ikonu skutečného nástroje.
type JourneyNode = {
  tool: Tool;
  action: string;
};

function findTool(slug: string): Tool {
  const tool = connectedTools.find((t) => t.slug === slug);
  if (!tool) {
    throw new Error(`AutomationJourney: nástroj "${slug}" nebyl nalezen v connectedTools`);
  }
  return tool;
}

const NODE_COUNT = 5;
const JOURNEY_NODES: JourneyNode[] = [
  { tool: findTool("shopify"), action: "Nová objednávka" },
  { tool: findTool("stripe"), action: "Platba přijata" },
  { tool: findTool("google-sheets"), action: "Účetní zápis" },
  { tool: findTool("gmail"), action: "E-mail zákazníkovi" },
  { tool: findTool("trello"), action: "Úkol pro tým" },
];

function polar(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
}

// Plátno je čtverec BOX×BOX (viewBox i skutečná pixelová velikost
// kontejneru musí být shodné 1:1 — HTML uzly se polohují inline pixely,
// SVG kabely stejnými souřadnicemi ve viewBoxu; kdyby se kontejner
// škáloval responzivně, obě vrstvy by se rozjely). Střed CENTER slouží
// jako společný ukotvovací bod: každý uzel je v DOM ukotven přesně na
// střed a GSAP transform (`x`/`y`) ho posouvá na finální/chaotickou
// pozici — díky tomu stačí měnit jen cílové offsety, ne přepočítávat
// `left`/`top` pro každý uzel zvlášť.
const BOX = 480;
const CENTER = 240;

// Finální "pipeline" rozložení: spouštěč vlevo → 4 uzly rozprostřené
// uprostřed → jádro AvenIQ vpravo. Stejný tvar, jaký kreslí skutečné
// nástroje pro automatizaci (trigger → paralelní větve → sloučení), ne
// hvězdice paprsků do středu jako v předchozí verzi.
const PIPELINE_POS = [
  { x: -185, y: 0 }, // spouštěč
  { x: 15, y: -175 },
  { x: 15, y: -70 },
  { x: 15, y: 70 },
  { x: 15, y: 175 },
];
const HUB_POS = { x: 185, y: 0 };

// Rozházené, pootočené startovní pozice pro krok "ZMATEK" — nepravidelný
// mnohoúhelník s proměnlivým poloměrem, ne dokonalý kruh, ať to na první
// pohled čte jako skutečný nepořádek, ne jen jiné geometrické uspořádání.
const CHAOS_POS = [
  polar(198, 158),
  polar(8, 188),
  polar(102, 148),
  polar(252, 170),
  polar(322, 155),
];
const CHAOS_ROT = [16, -21, 13, -17, 20];

function abs(p: { x: number; y: number }) {
  return { x: CENTER + p.x, y: CENTER + p.y };
}

const TRIGGER_ABS = abs(PIPELINE_POS[0]);
const HUB_ABS = abs(HUB_POS);
const BRANCH_ABS = PIPELINE_POS.slice(1).map(abs);

// Zakřivená spojnice ve stylu n8n/Zapier canvasu: kontrolní body vodorovně
// vysunuté z obou konců vytvoří plynulé "S", místo rovné čáry nebo
// paprsku do jednoho bodu.
function bezierEdge(from: { x: number; y: number }, to: { x: number; y: number }) {
  const dx = Math.max(Math.abs(to.x - from.x) * 0.55, 46);
  return `M ${from.x} ${from.y} C ${from.x + dx} ${from.y}, ${to.x - dx} ${to.y}, ${to.x} ${to.y}`;
}

// 8 hran: spouštěč → každá ze 4 větví, každá větev → jádro AvenIQ
// (fan-out + fan-in). Pořadí je důležité — hover interakce a časování
// aktivace (viz `edgeConnectsToNode`) na něm staví.
const IN_EDGES = BRANCH_ABS.map((b) => bezierEdge(TRIGGER_ABS, b));
const OUT_EDGES = BRANCH_ABS.map((b) => bezierEdge(b, HUB_ABS));
const ALL_EDGES = [...IN_EDGES, ...OUT_EDGES];

const TRIGGER_INDEX = 0;
const HUB_INDEX = NODE_COUNT; // sentinel — jádro AvenIQ není v `JOURNEY_NODES`

// Které hrany patří k danému uzlu (pro hover zvýraznění). Spouštěč svítí
// na všechny IN_EDGES, jádro na všechny OUT_EDGES, každá větev jen na
// svou vstupní a výstupní hranu.
function edgeConnectsToNode(edgeIndex: number, nodeIndex: number) {
  if (nodeIndex === TRIGGER_INDEX) return edgeIndex < BRANCH_ABS.length;
  if (nodeIndex === HUB_INDEX) return edgeIndex >= BRANCH_ABS.length;
  const branchIndex = nodeIndex - 1;
  return edgeIndex === branchIndex || edgeIndex === BRANCH_ABS.length + branchIndex;
}

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

// `compact` (menší jádro, tenčí prstence) pro použití jako uzel uprostřed
// pipeline diagramu na desktopu — mobilní `StackedJourney` dál používá
// výchozí větší velikost jako samostatnou centrální ilustraci.
function CentralShape({
  glowRef,
  spin = false,
  compact = false,
}: {
  glowRef?: (el: HTMLDivElement | null) => void;
  spin?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div
        ref={glowRef}
        aria-hidden
        className={cx(
          "absolute animate-pulse rounded-full blur-3xl",
          compact ? "h-24 w-24" : "h-40 w-40"
        )}
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-mint) 0%, var(--color-brand-turquoise) 55%, transparent 75%)",
        }}
      />
      {/* Dva protiběžné prstence okolo centrálního tvaru — jen na desktopu
          (viz `spin`), dávají "datovému jádru" pocit hloubky a technické
          komplexnosti. Čistě CSS animace (`animate-slow-spin(-reverse)`,
          už definované v globals.css pro ToolOrbit), respektuje
          `prefers-reduced-motion` přes stejný globální media-query blok. */}
      {spin && (
        <>
          <div
            aria-hidden
            className={cx(
              "animate-slow-spin absolute rounded-full border border-brand-turquoise/20",
              compact ? "h-28 w-28" : "h-52 w-52"
            )}
          />
          <div
            aria-hidden
            className={cx(
              "animate-slow-spin-reverse absolute rounded-full border border-dashed border-brand-mint/25",
              compact ? "h-20 w-20" : "h-40 w-40"
            )}
          />
        </>
      )}
      <svg
        viewBox="-110 -110 220 220"
        className={cx(
          compact ? "h-20 w-20" : "h-40 w-40 sm:h-48 sm:w-48",
          spin && "animate-slow-spin"
        )}
        role="img"
        aria-label="Jádro AvenIQ, kam se sbíhají všechny automatizace"
      >
        <defs>
          <linearGradient id="centralGradientA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-turquoise)" />
            <stop offset="100%" stopColor="var(--color-brand-mint)" />
          </linearGradient>
          <linearGradient id="centralGradientB" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-mint)" />
            <stop offset="100%" stopColor="var(--color-brand-turquoise)" />
          </linearGradient>
        </defs>
        {FACETS.map((f, i) => (
          <polygon
            key={i}
            points={f.points}
            fill={`url(#centralGradient${i % 2 === 0 ? "A" : "B"})`}
            fillOpacity={f.opacity}
            stroke="var(--color-brand-turquoise)"
            strokeOpacity={0.35}
            strokeWidth={0.75}
          />
        ))}
      </svg>
    </div>
  );
}

// Tečkovaná mřížka na pozadí plátna — vizuální podpis "workflow canvasu"
// (n8n, Make apod.), ne jen prázdné pozadí. Čistě dekorativní CSS
// gradient, maska zjemní okraje, aby mřížka neměla ostrý čtvercový střih.
function CanvasGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[32px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, color-mix(in oklab, var(--color-zinc-500) 45%, transparent) 1px, transparent 1.5px)",
        backgroundSize: "24px 24px",
        maskImage:
          "radial-gradient(ellipse 72% 72% at 50% 50%, black 35%, transparent 88%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 72% 72% at 50% 50%, black 35%, transparent 88%)",
      }}
    />
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
// kroku, uzly rozmístěné do stran) a na malé obrazovce/hrubém dotyku by
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
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-turquoise/40 bg-brand-turquoise/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-brand-turquoise">
      {pad(index + 1)} · {category}
    </span>
  );
}

function FinalCta() {
  return (
    <Link
      href="/#kontakt"
      className="mt-2 w-fit rounded-full bg-brand-turquoise px-6 py-3 text-base font-medium text-zinc-950 transition-opacity hover:opacity-90"
    >
      Rezervovat konzultaci zdarma
    </Link>
  );
}

function DesktopJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const hubWrapperRef = useRef<HTMLDivElement | null>(null);
  const hubCheckRef = useRef<SVGGElement | null>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pingRefs = useRef<Array<HTMLDivElement | null>>([]);
  const labelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const edgeRefs = useRef<Array<SVGPathElement | null>>([]);
  const particleRefs = useRef<Array<SVGCircleElement | null>>([]);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const lenisRef = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          pin: pinRef.current,
          onUpdate: (self) => {
            setActiveStep(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length)));
            if (progressFillRef.current) {
              gsap.set(progressFillRef.current, { height: `${self.progress * 100}%` });
            }
          },
        },
      });
      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      // Krok 1→2 (ZMATEK → POŘÁDEK): uzly se z chaotického rozhození
      // srovnají rovnou do finální pipeline pozice (spouštěč / větve /
      // jádro) — na rozdíl od předchozí verze bez mezikroku "prstenec",
      // protože uzly se v novém rozložení už dál nehýbou. `back.out` dává
      // zaklapnutí do pozice jemný "doraz" místo mechanického zastavení.
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          {
            x: CHAOS_POS[i].x,
            y: CHAOS_POS[i].y,
            rotation: CHAOS_ROT[i],
            opacity: 0.45,
            scale: 0.8,
            filter: "blur(3px)",
          },
          {
            x: PIPELINE_POS[i].x,
            y: PIPELINE_POS[i].y,
            rotation: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "back.out(1.3)",
          },
          1
        );
      });

      // Jádro AvenIQ se v chaosu ještě "nezkrystalizovalo" — malé, tlumené
      // — a spolu s uzly naskočí na plnou přítomnost přesně v POŘÁDKU,
      // aby vizuál četl: "systém právě vznikl z chaosu".
      if (hubWrapperRef.current) {
        tl.fromTo(
          hubWrapperRef.current,
          { scale: 0.55, opacity: 0.35 },
          { scale: 1, opacity: 1, duration: 0.7, ease: "power2.out" },
          1
        );
      }

      // Krok 3 (START): spouštěč se aktivuje jako první (index 0) a signál
      // se pak kaskádovitě šíří do každé větve (`i * 0.16` stagger) — hmatové
      // "naskočení" uzlu + od něj se šířící aktivační prstenec (radar ping).
      // Vstupní kabel (spouštěč → větev) se dokreslí přesně ve chvíli, kdy
      // signál do dané větve dorazí, takže kreslení kabelu čte jako
      // "signál právě propojil tyto dva uzly", ne jako samostatná animace.
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(
          el,
          { scale: 1.1, duration: 0.22, yoyo: true, repeat: 1, ease: "power1.inOut" },
          2.2 + i * 0.16
        );
      });
      pingRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { scale: 0.6, opacity: 0 });
        tl.fromTo(
          el,
          { scale: 0.6, opacity: 0.7 },
          { scale: 2.1, opacity: 0, duration: 0.6, ease: "power2.out" },
          2.2 + i * 0.16
        );
      });
      IN_EDGES.forEach((_, i) => {
        const path = edgeRefs.current[i];
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(
          path,
          { strokeDashoffset: 0, duration: 0.4, ease: "power2.inOut" },
          2.32 + i * 0.16
        );
      });

      // Krok 4 (SÍŤ): štítky nástrojů se objeví a výstupní kabely (větev →
      // jádro) se dokreslí — teprve teď je diagram kompletně propojený a
      // nekonečný "tok dat" (spuštěný níže, mimo scrub timeline) se stane
      // viditelným na všech 8 spojnicích současně.
      labelRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power1.out" },
          3 + i * 0.08
        );
      });
      OUT_EDGES.forEach((_, i) => {
        const path = edgeRefs.current[IN_EDGES.length + i];
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(
          path,
          { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut" },
          3.1 + i * 0.1
        );
      });
      particleRefs.current.forEach((particle) => {
        if (!particle) return;
        tl.to(particle, { opacity: 1, duration: 0.3 }, 3.6);
      });

      // Krok 5 (VÝSLEDKY): jádro AvenIQ dostane silnější záři a krátký
      // "dokončeno" odznak (fajfka) — konkrétní vizuální tečka za příběhem,
      // bez vymýšlení nových čísel/tvrzení.
      if (glowRef.current) {
        tl.fromTo(
          glowRef.current,
          { opacity: 0.3 },
          { opacity: 1, duration: 1.2, ease: "none" },
          0.2
        );
        tl.to(glowRef.current, { scale: 1.2, duration: 0.7, ease: "power1.inOut" }, 4.1);
      }
      if (hubCheckRef.current) {
        tl.fromTo(
          hubCheckRef.current,
          { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" },
          { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)" },
          4.25
        );
      }
    }, trackRef);

    // Nekonečný "tok dat" po každé z 8 hran nezávisle na scrollu — dvě
    // částice na hranu (posunuté o půl cyklu), aby na každé spojnici byl
    // vždy vidět pohyb, ne jen jedna tečka jednou za čas. Viditelnost
    // (opacity) řídí scrub timeline výše, samotný pohyb běží pořád, takže
    // se chová stejně spolehlivě při scrollu dopředu i zpět.
    const particleTweens: gsap.core.Tween[] = [];
    ALL_EDGES.forEach((_, edgeIndex) => {
      const path = edgeRefs.current[edgeIndex];
      if (!path) return;
      const duration = 1.5 + (edgeIndex % 3) * 0.25;
      for (let p = 0; p < 2; p++) {
        const particle = particleRefs.current[edgeIndex * 2 + p];
        if (!particle) continue;
        gsap.set(particle, { opacity: 0 });
        particleTweens.push(
          gsap.to(particle, {
            motionPath: { path, align: path },
            duration,
            repeat: -1,
            delay: edgeIndex * 0.12 + p * (duration / 2),
            ease: "power1.inOut",
          })
        );
      }
    });

    return () => {
      particleTweens.forEach((tween) => tween.kill());
      ctx.revert();
    };
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
    <div ref={trackRef} style={{ height: `${STEPS.length * 55}vh` }} className="relative">
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

        <div
          className="relative mx-auto rounded-[32px] border border-zinc-800/60 bg-zinc-950/30"
          style={{ height: BOX, width: BOX }}
        >
          <CanvasGrid />

          {/* Rámuje celý diagram jako JEDEN konkrétní scénář, ne jen
              soubor log — bez tohoto štítku by uzly čtenáři nemusely dojít
              jako propojený příběh (na žádost uživatele 2026-07-22). */}
          <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
            Příklad · nová objednávka v e-shopu
          </div>

          <svg
            viewBox={`0 0 ${BOX} ${BOX}`}
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {ALL_EDGES.map((d, edgeIndex) => {
              const dimmed = hoveredNode !== null && !edgeConnectsToNode(edgeIndex, hoveredNode);
              const highlighted =
                hoveredNode !== null && edgeConnectsToNode(edgeIndex, hoveredNode);
              return (
                <path
                  key={edgeIndex}
                  ref={(el) => {
                    edgeRefs.current[edgeIndex] = el;
                  }}
                  d={d}
                  stroke="var(--color-brand-turquoise)"
                  strokeWidth={highlighted ? 2.5 : 1.5}
                  fill="none"
                  style={{
                    transition: "stroke-opacity 0.25s ease, stroke-width 0.25s ease",
                    strokeOpacity: dimmed ? 0.15 : 0.85,
                  }}
                />
              );
            })}
            {ALL_EDGES.map((_, edgeIndex) =>
              [0, 1].map((p) => (
                <circle
                  key={`${edgeIndex}-${p}`}
                  ref={(el) => {
                    particleRefs.current[edgeIndex * 2 + p] = el;
                  }}
                  r={3.5}
                  fill="var(--color-brand-mint)"
                  style={{
                    filter: "drop-shadow(0 0 4px var(--color-brand-mint))",
                    transition: "opacity 0.25s ease",
                    opacity:
                      hoveredNode !== null && !edgeConnectsToNode(edgeIndex, hoveredNode)
                        ? 0.15
                        : undefined,
                  }}
                />
              ))
            )}
          </svg>

          {JOURNEY_NODES.map(({ tool, action }, i) => (
            <div
              key={tool.slug}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              style={{ position: "absolute", left: CENTER - 32, top: CENTER - 32 }}
            >
              <div
                className="relative"
                onMouseEnter={() => setHoveredNode(i)}
                onMouseLeave={() => setHoveredNode((h) => (h === i ? null : h))}
              >
                <div
                  ref={(el) => {
                    pingRefs.current[i] = el;
                  }}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl border border-brand-turquoise"
                />
                <div
                  className="animate-idle-jitter"
                  style={{
                    ["--jitter-duration" as string]: `${3 + (i % 4) * 0.6}s`,
                    ["--jitter-delay" as string]: `${(i % 5) * 0.3}s`,
                  }}
                >
                  <ToolChip tool={tool} size="md" shape="square" />
                </div>
              </div>
              <div
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-zinc-400"
              >
                {action}
              </div>
            </div>
          ))}

          <div
            ref={hubWrapperRef}
            className="absolute h-[88px] w-[88px]"
            style={{ left: HUB_ABS.x - 44, top: HUB_ABS.y - 44 }}
            onMouseEnter={() => setHoveredNode(HUB_INDEX)}
            onMouseLeave={() => setHoveredNode((h) => (h === HUB_INDEX ? null : h))}
          >
            <CentralShape glowRef={(el) => (glowRef.current = el)} spin compact />
            <svg
              viewBox="0 0 32 32"
              className="pointer-events-none absolute -bottom-1 -right-1 h-6 w-6"
            >
              <g ref={hubCheckRef}>
                <circle cx={16} cy={16} r={14} fill="var(--color-zinc-950)" />
                <circle
                  cx={16}
                  cy={16}
                  r={13}
                  fill="none"
                  stroke="var(--color-brand-mint)"
                  strokeWidth={1.5}
                />
                <path
                  d="M10 16.5 L14 20.5 L22 11.5"
                  fill="none"
                  stroke="var(--color-brand-mint)"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3 sm:right-8">
        <div
          aria-hidden
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-zinc-800"
        />
        <div
          ref={progressFillRef}
          aria-hidden
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-brand-turquoise"
          style={{ height: "0%" }}
        />
        {STEPS.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => goToStep(i)}
            aria-label={`Krok ${i + 1}: ${s.category}`}
            aria-current={activeStep === i}
            className={cx(
              "relative h-2.5 w-2.5 rounded-full border transition-colors",
              activeStep === i
                ? "border-brand-turquoise bg-brand-turquoise"
                : "border-zinc-700 bg-zinc-950 hover:border-brand-turquoise/60"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// Kompaktní statická verze diagramu (spouštěč → 4 uzly → jádro AvenIQ) pro
// mobil/reduced-motion — bez GSAP/scroll-pin (viz komentář u
// `useIsDesktopViewport`), jen lehké CSS animace stejným principem jako
// MiniProcessDiagram (pulz putující po spojnici), respektuje
// `prefers-reduced-motion` přes existující globální pravidlo.
function MiniWorkflowPreview({ animated }: { animated: boolean }) {
  const [trigger, ...branches] = JOURNEY_NODES;

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
        Příklad · nová objednávka v e-shopu
      </p>
      <div className="flex w-full max-w-xs items-center justify-center gap-2 sm:max-w-sm">
        <ToolChip tool={trigger.tool} size="sm" shape="square" />
        <div className="relative h-px flex-1 bg-zinc-700">
          {animated && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="animate-flow-pulse absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-mint shadow-[0_0_6px_1px_var(--color-brand-mint)]" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-2">
          {branches.map(({ tool }) => (
            <ToolChip key={tool.slug} tool={tool} size="sm" shape="square" />
          ))}
        </div>
        <div className="relative h-px flex-1 bg-zinc-700">
          {animated && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="animate-flow-pulse absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-mint shadow-[0_0_6px_1px_var(--color-brand-mint)] [animation-delay:1.4s]" />
            </div>
          )}
        </div>
        <div className="relative h-16 w-16 shrink-0">
          <CentralShape compact />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {JOURNEY_NODES.map(({ tool, action }) => (
          <span key={tool.slug} className="text-xs text-zinc-400">
            {action}
          </span>
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
                <MiniWorkflowPreview animated={animated} />
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

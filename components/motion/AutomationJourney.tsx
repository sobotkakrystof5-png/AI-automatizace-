"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import { ToolChip } from "./ToolChip";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useLenis } from "./SmoothScrollProvider";
import { connectedTools, type Tool } from "@/lib/tools";

// Vlajková scrollytelling sekce (Fáze R3, 2026-07-21). Dvakrát přepracovaná
// na žádost uživatele 2026-07-22 (viz git historie), počtvrté 2026-08-10 —
// důvod: sekce působila „AI-made" a průměrně. Diagnóza té verze:
//   1. Text kroků se měnil tvrdým přepnutím bez přechodu (největší levnost).
//   2. Perpetuální dekorace bez významu — 16 částic kroužících po kabelech
//      pořád dokola, náhodný jitter kostek, rotující čárkované prstence
//      (DESIGN.md §7 „plovoucí částice" má přímo na zákazovém seznamu).
//   3. Kabely mizely POD uzly místo aby se do nich zapojovaly.
//   4. Abstraktní fasetová hvězda jako jádro — dekorace, ne systém.
// Nová verze staví na principu „události, ne ambient": diagram žije v
// diskrétních BĚZÍCH (objednávka projde systémem jako viditelná dávka dat),
// mezi nimi jen klidný drift. Kabely se zapojují do portů na hranách uzlů,
// jádro je konkrétní dlaždice ALTENO, text kroků se prolíná (crossfade
// s blur — dva stavy se nesmí číst jako dva objekty přes sebe). Od kroku
// SÍŤ běhy startují samy a spouštěč jde přehrát kliknutím — interaktivita,
// ne jen pasivní film.
//
// Kategorie kroků i veškerý text zůstávají vlastní (viz historie: vlastní
// přeinterpretace konceptu z automatizace-ai.cz, žádné doslovné kopírování);
// vizuální styl uzlů/kabelů vychází z obecné estetiky workflow nástrojů
// (n8n aj.), ne z kopie konkrétního cizího designu. Scénář diagramu vypráví
// JEDEN konkrétní příběh (nová objednávka v e-shopu) — rozhodnutí uživatele
// 2026-07-22, beze změny.
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

// Stavový štítek systému v hlavičce plátna — druhý, mimoslovní kanál
// vyprávění (vizuál nese myšlenku i bez čtení levého sloupce). Popisuje
// stav UKÁZKY, ne obchodní tvrzení. `run` dostává pulzující tečku.
const STEP_STATUS: Array<{ label: string; tone: "off" | "ready" | "run" | "done" }> = [
  { label: "Bez systému", tone: "off" },
  { label: "Připraveno", tone: "ready" },
  { label: "Spouští se", tone: "run" },
  { label: "Běží samo", tone: "run" },
  { label: "Hotovo", tone: "done" },
];

const STATUS_DOT: Record<(typeof STEP_STATUS)[number]["tone"], string> = {
  off: "bg-zinc-600",
  ready: "bg-zinc-400",
  run: "bg-brand-turquoise",
  done: "bg-brand-mint",
};

// Diagram vypráví JEDEN konkrétní scénář — ne 5 náhodných log (na žádost
// uživatele 2026-07-22): nová objednávka v e-shopu spustí platbu, zápis do
// účetnictví, e-mail zákazníkovi a úkol pro tým. Jen skutečné, už schválené
// nástroje z `lib/tools.ts` — `action` popisuje krok, `tool` dodává
// rozpoznatelnou ikonu.
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
// střed a GSAP transform (`x`/`y`) ho posouvá na cílovou pozici.
const BOX = 480;
const CENTER = 240;

// Finální "pipeline" rozložení: spouštěč vlevo → 4 uzly uprostřed → jádro
// ALTENO vpravo (trigger → paralelní větve → sloučení, jako ve skutečných
// workflow nástrojích).
//
// Svislý rozestup větví není volný: kostka je 64 px (±32 od středu) a pod
// ní visí štítek akce (+8 px odsazení, ~22 px výška). Krajní hodnota 152
// je maximum, při kterém horní kostka nenaráží do hlavičky plátna (text
// scénáře na `top-5`) a štítek spodní kostky se nedotýká rámu. Předchozí
// 175 obojí porušovalo — ověřeno screenshotem, ne odhadem.
const PIPELINE_POS = [
  { x: -185, y: 0 }, // spouštěč
  { x: 15, y: -152 },
  { x: 15, y: -51 },
  { x: 15, y: 51 },
  { x: 15, y: 152 },
];
// Jádro má dlaždici 96 px — x drží 17px odstup pravé hrany od rámu plátna.
const HUB_POS = { x: 175, y: 0 };

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

// Porty: kabel se zapojuje do HRANY uzlu, nemizí pod ním — bez toho diagram
// nečte jako technika, ale jako čáry položené přes obrázky. Kostka nástroje
// má 64 px (poloviny 32 + 6 px mezera), dlaždice jádra 96 px (48 + 8).
const CHIP_PORT = 38;
const HUB_PORT = 56;

const TRIGGER_OUT = { x: TRIGGER_ABS.x + CHIP_PORT, y: TRIGGER_ABS.y };
const BRANCH_IN = BRANCH_ABS.map((b) => ({ x: b.x - CHIP_PORT, y: b.y }));
const BRANCH_OUT = BRANCH_ABS.map((b) => ({ x: b.x + CHIP_PORT, y: b.y }));
const HUB_IN = { x: HUB_ABS.x - HUB_PORT, y: HUB_ABS.y };

// Zakřivená spojnice ve stylu workflow canvasu: kontrolní body vodorovně
// vysunuté z obou konců vytvoří plynulé "S", místo rovné čáry nebo paprsku.
function bezierEdge(from: { x: number; y: number }, to: { x: number; y: number }) {
  const dx = Math.max(Math.abs(to.x - from.x) * 0.55, 46);
  return `M ${from.x} ${from.y} C ${from.x + dx} ${from.y}, ${to.x - dx} ${to.y}, ${to.x} ${to.y}`;
}

// 8 hran: spouštěč → každá ze 4 větví, každá větev → jádro ALTENO
// (fan-out + fan-in). Pořadí je důležité — hover interakce, časování
// aktivace i běhy (viz `edgeConnectsToNode` a `fireRun`) na něm staví.
const IN_EDGES = BRANCH_IN.map((b) => bezierEdge(TRIGGER_OUT, b));
const OUT_EDGES = BRANCH_OUT.map((b) => bezierEdge(b, HUB_IN));
const ALL_EDGES = [...IN_EDGES, ...OUT_EDGES];

// Zdířky na koncích kabelů — drobné body v místě, kde se kabel potkává
// s hranou uzlu. Čistě vizuální detail „opravdového zapojení".
const SOCKETS = [
  TRIGGER_OUT,
  ...BRANCH_IN,
  ...BRANCH_OUT,
  HUB_IN,
];

// Délka "komety" (viditelného úseku čárkování), která při běhu projede po
// kabelu. Mezera v dasharray musí být delší než samotná dráha, aby na
// kabelu nikdy nebyly vidět dvě komety najednou.
const COMET_LEN = 26;

const TRIGGER_INDEX = 0;
const HUB_INDEX = JOURNEY_NODES.length; // sentinel — jádro není v `JOURNEY_NODES`

// Které hrany patří k danému uzlu (pro hover zvýraznění). Spouštěč svítí
// na všechny IN_EDGES, jádro na všechny OUT_EDGES, každá větev jen na
// svou vstupní a výstupní hranu.
function edgeConnectsToNode(edgeIndex: number, nodeIndex: number) {
  if (nodeIndex === TRIGGER_INDEX) return edgeIndex < IN_EDGES.length;
  if (nodeIndex === HUB_INDEX) return edgeIndex >= IN_EDGES.length;
  const branchIndex = nodeIndex - 1;
  return edgeIndex === branchIndex || edgeIndex === IN_EDGES.length + branchIndex;
}

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// Jádro ALTENO jako konkrétní produktová dlaždice — nahrazuje dřívější
// abstraktní fasetovou hvězdu s rotujícími prstenci, která četla jako
// dekorace bez významu. Wordmark místo symbolu je záměr: ALTENO žádné
// samostatné logo nemá (stejný princip jako Navbar) a vymýšlet ho nesmíme.
// Záře a dech (breathRef) řídí GSAP zvenku; `compact` je varianta pro
// mobilní mini náhled, kde se nic neřídí scrollem.
function HubNode({
  compact = false,
  glowRef,
  breathRef,
}: {
  compact?: boolean;
  glowRef?: (el: HTMLDivElement | null) => void;
  breathRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        ref={glowRef}
        aria-hidden
        className={cx(
          "pointer-events-none absolute rounded-full blur-2xl",
          compact ? "-inset-2 opacity-40" : "-inset-4"
        )}
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-brand-turquoise) 60%, transparent) 0%, color-mix(in oklab, var(--color-brand-mint) 35%, transparent) 55%, transparent 78%)",
        }}
      />
      <div ref={breathRef} className="relative h-full w-full">
        <div
          role="img"
          aria-label="Jádro ALTENO — sem se sbíhají všechny kroky"
          className={cx(
            "relative flex h-full w-full flex-col items-center justify-center border border-zinc-700 bg-zinc-900",
            compact ? "gap-0 rounded-xl" : "gap-0.5 rounded-2xl"
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-brand-turquoise/15 via-transparent to-transparent"
          />
          <span
            className={cx(
              "relative font-semibold tracking-tight text-brand-turquoise",
              compact ? "text-[10px]" : "text-sm"
            )}
          >
            ALTENO
          </span>
          {!compact && (
            <span className="relative font-mono text-[9px] uppercase tracking-widest text-zinc-400">
              jádro
            </span>
          )}
        </div>
      </div>
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
      className="pointer-events-none absolute inset-0"
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
// šířky, stejný `useSyncExternalStore` vzor jako `usePrefersReducedMotion`,
// `false` na serveru = bezpečný mobile-first default.
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
      className="mt-2 w-fit rounded-full bg-brand-turquoise px-6 py-3 text-base font-medium text-zinc-950 transition-transform hover:scale-[1.03] active:scale-[0.97]"
    >
      Rezervovat konzultaci zdarma
    </Link>
  );
}

// Přechod textu mezi kroky. Tvrdé přepnutí bez animace bylo největší
// jednotlivý zdroj „levného" dojmu staré verze — dva stavy se přes sebe
// nesmí číst jako dva objekty, proto crossfade dostává i jemný blur, který
// oba stavy během prolnutí spojí do jednoho (viz emil-design-eng skill).
const STEP_TEXT_TRANSITION = { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const };

function DesktopJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const gridLayerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const breathRef = useRef<HTMLDivElement | null>(null);
  const hubWrapperRef = useRef<HTMLDivElement | null>(null);
  const hubPulseRef = useRef<HTMLDivElement | null>(null);
  const hubRingRef = useRef<HTMLSpanElement | null>(null);
  const hubCheckRef = useRef<SVGGElement | null>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const floatRefs = useRef<Array<HTMLDivElement | null>>([]);
  const popRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pingRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const labelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const edgeRefs = useRef<Array<SVGPathElement | null>>([]);
  const overlayRefs = useRef<Array<SVGPathElement | null>>([]);
  const cometRefs = useRef<Array<SVGPathElement | null>>([]);
  const socketsRef = useRef<SVGGElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const edgeLengths = useRef<number[]>([]);
  const runTlRef = useRef<gsap.core.Timeline | null>(null);
  const runFnRef = useRef<(() => void) | null>(null);
  const pendingRunRef = useRef<gsap.core.Tween | null>(null);
  const parallaxRef = useRef<((nx: number, ny: number) => void) | null>(null);
  const stepRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const lenisRef = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Délky drah pro kreslení kabelů i pro komety běhů. Kometa je krátký
      // dash, který se posunem dashoffsetu "projede" po celé dráze — mezera
      // v patternu je delší než dráha, takže je vidět vždy jen jedna.
      edgeLengths.current = ALL_EDGES.map((_, i) => {
        const path = edgeRefs.current[i];
        return path ? path.getTotalLength() : 0;
      });
      cometRefs.current.forEach((comet, i) => {
        if (!comet) return;
        const length = edgeLengths.current[i];
        gsap.set(comet, {
          strokeDasharray: `${COMET_LEN} ${length + 40}`,
          strokeDashoffset: COMET_LEN,
          autoAlpha: 0,
        });
      });
      overlayRefs.current.forEach((overlay) => {
        if (!overlay) return;
        gsap.set(overlay, { strokeDasharray: "3 10", autoAlpha: 0 });
      });

      // ------------------------------------------------------------------
      // Scrub timeline: 5 segmentů po přesně 1 jednotce (celkem 5), takže
      // hranice segmentů 1:1 sedí na `floor(progress * 5)` a text vlevo se
      // nikdy nerozejde s tím, co diagram právě dělá. Pojmenované kotvy:
      const T_ORDER = 1; // ZMATEK → POŘÁDEK
      const T_START = 2; // POŘÁDEK → START
      const T_NET = 3; //   START → SÍŤ
      const T_DONE = 4; //     SÍŤ → VÝSLEDKY
      // ------------------------------------------------------------------
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          pin: pinRef.current,
          onUpdate: (self) => {
            const step = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length));
            const previous = stepRef.current;
            stepRef.current = step;
            setActiveStep(step);
            if (progressFillRef.current) {
              gsap.set(progressFillRef.current, { scaleY: self.progress });
            }
            // Živé běhy dávají smysl až v plně zapojeném diagramu — při
            // scrollu zpět do dřívějších kroků se rozběhnutý běh zabije,
            // jinak by komety létaly po kabelech, které se právě odkreslují.
            if (step < 3 && runTlRef.current?.isActive()) {
              runTlRef.current.kill();
              gsap.set(cometRefs.current.filter(Boolean), { autoAlpha: 0 });
              gsap.set(popRefs.current.filter(Boolean), { scale: 1 });
            }
            // První živý běh hned po dokončení zapojení sítě — divák vidí
            // důsledek (systém žije) okamžitě, ne až za 5 s intervalu.
            // delayedCall se eviduje, aby ho cleanup stihl zabít i když
            // unmount přijde v těch 0,7 s.
            if (previous < 3 && step >= 3) {
              pendingRunRef.current?.kill();
              pendingRunRef.current = gsap.delayedCall(0.7, () => runFnRef.current?.());
            }
          },
        },
      });
      scrollTriggerRef.current = tl.scrollTrigger ?? null;
      // Prázdný tween drží celkovou délku PŘESNĚ na 5 jednotkách — jinak by
      // hranice segmentů (floor(progress × 5)) neseděly na celočíselné
      // kotvy T_* a text by se rozjel s diagramem.
      tl.to({}, { duration: 0.3 }, STEPS.length - 0.3);

      // Krok 1→2 (ZMATEK → POŘÁDEK): uzly se z chaotického rozhození
      // srovnají do pipeline pozic. `back.out` dává zaklapnutí jemný doraz.
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          {
            x: CHAOS_POS[i].x,
            y: CHAOS_POS[i].y,
            rotation: CHAOS_ROT[i],
            opacity: 0.6,
            scale: 0.88,
            // Rozostření dělá "nesetříděno", ale při 3 px se z log stávaly
            // šedé šmouhy a plátno četlo jako nenačtené, ne jako chaos.
            filter: "blur(2px)",
          },
          {
            x: PIPELINE_POS[i].x,
            y: PIPELINE_POS[i].y,
            rotation: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "back.out(1.4)",
          },
          T_ORDER + 0.05 + i * 0.06
        );
      });

      // Jádro ALTENO se v chaosu ještě "nezkrystalizovalo" — malé, tlumené,
      // rozostřené — a naskočí na plnou přítomnost spolu s uzly: "systém
      // právě vznikl z chaosu".
      if (hubWrapperRef.current) {
        tl.fromTo(
          hubWrapperRef.current,
          { scale: 0.6, opacity: 0.35, filter: "blur(4px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.75, ease: "power3.out" },
          T_ORDER + 0.15
        );
      }
      if (glowRef.current) {
        tl.fromTo(
          glowRef.current,
          { opacity: 0.15, scale: 0.85 },
          { opacity: 0.55, scale: 1, duration: 0.9, ease: "power1.inOut" },
          T_ORDER + 0.15
        );
      }

      // Stavové tečky a zdířky portů patří k "poskládanému" systému.
      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1, duration: 0.25 },
          T_ORDER + 0.7 + i * 0.04
        );
      });
      if (socketsRef.current) {
        tl.fromTo(
          socketsRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.3 },
          T_ORDER + 0.85
        );
      }

      // Krok 3 (START): spouštěč "odpálí" signál — pop + radarový prstenec —
      // a vstupní kabely se dokreslí přesně ve chvíli, kdy signál dorazí do
      // dané větve. Kreslení kabelu tak čte jako "signál právě propojil tyto
      // dva uzly", ne jako samostatná dekorace.
      if (popRefs.current[0]) {
        tl.to(
          popRefs.current[0],
          { scale: 1.1, duration: 0.18, yoyo: true, repeat: 1, ease: "power1.inOut" },
          T_START + 0.05
        );
      }
      if (pingRefs.current[0]) {
        gsap.set(pingRefs.current[0], { scale: 0.6, opacity: 0 });
        // `immediateRender: false` u prstenců: fromTo by jinak při sestavení
        // timeline vykreslil from-stav (viditelný prstenec) ještě před
        // startem tweenu.
        tl.fromTo(
          pingRefs.current[0],
          { scale: 0.6, opacity: 0.7 },
          { scale: 2.1, opacity: 0, duration: 0.55, ease: "power2.out", immediateRender: false },
          T_START + 0.05
        );
      }
      IN_EDGES.forEach((_, i) => {
        const path = edgeRefs.current[i];
        if (!path) return;
        const length = edgeLengths.current[i];
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(
          path,
          { strokeDashoffset: 0, duration: 0.38, ease: "power2.inOut" },
          T_START + 0.12 + i * 0.14
        );
        const overlay = overlayRefs.current[i];
        if (overlay) {
          tl.to(overlay, { autoAlpha: 1, duration: 0.25 }, T_START + 0.45 + i * 0.14);
        }
      });
      nodeRefs.current.forEach((el, i) => {
        if (!el || i === 0) return;
        const pop = popRefs.current[i];
        const ping = pingRefs.current[i];
        const dot = dotRefs.current[i];
        const arrival = T_START + 0.42 + (i - 1) * 0.14;
        if (pop) {
          tl.to(pop, { scale: 1.08, duration: 0.16, yoyo: true, repeat: 1, ease: "power1.inOut" }, arrival);
        }
        if (ping) {
          gsap.set(ping, { scale: 0.6, opacity: 0 });
          tl.fromTo(
            ping,
            { scale: 0.6, opacity: 0.6 },
            { scale: 1.9, opacity: 0, duration: 0.5, ease: "power2.out", immediateRender: false },
            arrival
          );
        }
        if (dot) {
          tl.to(dot, { backgroundColor: "var(--color-brand-turquoise)", duration: 0.2 }, arrival);
        }
      });

      // Krok 4 (SÍŤ): výstupní kabely se dokreslí do jádra, štítky akcí se
      // vynoří — teprve teď je diagram kompletní a přebírají ho živé běhy.
      OUT_EDGES.forEach((_, i) => {
        const index = IN_EDGES.length + i;
        const path = edgeRefs.current[index];
        if (!path) return;
        const length = edgeLengths.current[index];
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(
          path,
          { strokeDashoffset: 0, duration: 0.4, ease: "power2.inOut" },
          T_NET + 0.05 + i * 0.1
        );
        const overlay = overlayRefs.current[index];
        if (overlay) {
          tl.to(overlay, { autoAlpha: 1, duration: 0.25 }, T_NET + 0.4 + i * 0.1);
        }
      });
      labelRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
          T_NET + 0.2 + i * 0.08
        );
      });
      if (hubRingRef.current) {
        tl.fromTo(
          hubRingRef.current,
          { scale: 0.85, autoAlpha: 0.7 },
          { scale: 1.4, autoAlpha: 0, duration: 0.5, ease: "power2.out", immediateRender: false },
          T_NET + 0.55
        );
      }

      // Krok 5 (VÝSLEDKY): jádro dostane plnou záři a "dokončeno" odznak —
      // konkrétní vizuální tečka za příběhem, bez vymýšlení čísel.
      if (glowRef.current) {
        tl.to(glowRef.current, { opacity: 1, scale: 1.15, duration: 0.6, ease: "power1.inOut" }, T_DONE + 0.1);
      }
      if (hubCheckRef.current) {
        tl.fromTo(
          hubCheckRef.current,
          { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" },
          { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
          T_DONE + 0.3
        );
      }

      // ------------------------------------------------------------------
      // Mimo scrub: klidový život diagramu. Žádné věčné kroužící částice
      // (DESIGN.md §7) — jen pomalý drift čárkování po kabelech (data v
      // klidu), sotva viditelné dýchání kostek a jádra. Vše transform/
      // opacity/stroke, nic layoutového.
      // ------------------------------------------------------------------
      // Spouštěč (index 0) se schválně NEHÝBE: je to jediný klikací uzel a
      // pohyblivý terč se hůř trefuje. Zakotvený zdroj + driftující větve
      // navíc čte správně — původ toku stojí, důsledky žijí.
      floatRefs.current.forEach((el, i) => {
        if (!el || i === TRIGGER_INDEX) return;
        gsap.to(el, {
          y: i % 2 === 0 ? 4 : -4,
          duration: 2.6 + (i % 3) * 0.7,
          delay: i * 0.35,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });
      if (breathRef.current) {
        gsap.to(breathRef.current, {
          scale: 1.025,
          duration: 3.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
      // -390 je násobek periody čárkování (3 + 10 = 13, 13 × 30), takže se
      // smyčka napojuje beze švu.
      const drifting = overlayRefs.current.filter(Boolean);
      if (drifting.length) {
        gsap.to(drifting, {
          strokeDashoffset: "-=390",
          duration: 30,
          repeat: -1,
          ease: "none",
        });
      }

      // Paralaxa na pohyb myši: kabely+uzly+jádro jako JEDNA vrstva (jsou
      // souřadnicově svázané, nesmí se rozjet), mřížka mírně proti — tichý
      // dojem hloubky bez 3D naklápění. quickTo = plynulé dojíždění.
      if (layerRef.current && gridLayerRef.current) {
        const layerX = gsap.quickTo(layerRef.current, "x", { duration: 0.7, ease: "power3.out" });
        const layerY = gsap.quickTo(layerRef.current, "y", { duration: 0.7, ease: "power3.out" });
        const gridX = gsap.quickTo(gridLayerRef.current, "x", { duration: 0.9, ease: "power3.out" });
        const gridY = gsap.quickTo(gridLayerRef.current, "y", { duration: 0.9, ease: "power3.out" });
        parallaxRef.current = (nx, ny) => {
          layerX(nx * 7);
          layerY(ny * 7);
          gridX(nx * -4);
          gridY(ny * -4);
        };
      }

      // ------------------------------------------------------------------
      // Živý běh: jedna objednávka viditelně projde celým systémem.
      // Spouští se sám (interval níže), po dokreslení sítě, a ručně
      // kliknutím na spouštěč. Události místo ambientu — tohle je hlavní
      // rozdíl proti staré verzi s věčně kroužícími tečkami.
      // ------------------------------------------------------------------
      const cometTravel = (
        runTl: gsap.core.Timeline,
        edgeIndex: number,
        at: number,
        duration: number
      ) => {
        const comet = cometRefs.current[edgeIndex];
        const length = edgeLengths.current[edgeIndex];
        if (!comet || !length) return;
        runTl
          .set(comet, { strokeDashoffset: COMET_LEN, autoAlpha: 1 }, at)
          .to(comet, { strokeDashoffset: -length, duration, ease: "power1.inOut" }, at)
          .set(comet, { autoAlpha: 0 }, at + duration);
      };

      runFnRef.current = () => {
        if (stepRef.current < 3) return;
        if (runTlRef.current?.isActive()) return;
        const runTl = gsap.timeline();
        runTlRef.current = runTl;

        if (popRefs.current[0]) {
          runTl.to(
            popRefs.current[0],
            { scale: 1.08, duration: 0.16, yoyo: true, repeat: 1, ease: "power1.inOut" },
            0
          );
        }
        if (pingRefs.current[0]) {
          runTl.fromTo(
            pingRefs.current[0],
            { scale: 0.7, opacity: 0.6 },
            { scale: 1.9, opacity: 0, duration: 0.5, ease: "power2.out" },
            0
          );
        }

        IN_EDGES.forEach((_, i) => {
          const departure = 0.1 + i * 0.07;
          const arrival = departure + 0.5;
          cometTravel(runTl, i, departure, 0.5);
          const pop = popRefs.current[i + 1];
          const dot = dotRefs.current[i + 1];
          if (pop) {
            runTl.to(
              pop,
              { scale: 1.07, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.inOut" },
              arrival
            );
          }
          if (dot) {
            runTl.to(
              dot,
              { scale: 1.6, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.inOut" },
              arrival
            );
          }
          cometTravel(runTl, IN_EDGES.length + i, arrival + 0.05, 0.5);
        });

        // Poslední dávka dorazí ~1,32 s po startu — jádro potvrdí přijetí
        // prstencem a krátkým nádechem záře.
        if (hubRingRef.current) {
          runTl.fromTo(
            hubRingRef.current,
            { scale: 0.85, autoAlpha: 0.7 },
            { scale: 1.45, autoAlpha: 0, duration: 0.55, ease: "power2.out" },
            1.1
          );
        }
        if (hubPulseRef.current) {
          runTl.to(
            hubPulseRef.current,
            { scale: 1.05, duration: 0.22, yoyo: true, repeat: 1, ease: "power1.inOut" },
            1.1
          );
        }
      };
    }, trackRef);

    // Automatické běhy: jen když je sekce reálně na obrazovce, diagram je
    // zapojený (krok SÍŤ a dál) a záložka viditelná. Interval je delší než
    // samotný běh, takže se nikdy nepřekrývají.
    const autoRun = window.setInterval(() => {
      if (document.hidden) return;
      if (!scrollTriggerRef.current?.isActive) return;
      runFnRef.current?.();
    }, 5200);

    return () => {
      window.clearInterval(autoRun);
      pendingRunRef.current?.kill();
      runTlRef.current?.kill();
      runFnRef.current = null;
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
  const status = STEP_STATUS[activeStep];
  // Ruční přehrání běhu má smysl až v plně zapojeném diagramu (viz
  // `fireRun`) — do té doby je spouštěč jen uzel jako ostatní.
  const runnable = activeStep >= 3;

  return (
    <div ref={trackRef} style={{ height: `${STEPS.length * 55}vh` }} className="relative">
      {/* Pin je full-width obal, mřížka s obsahem je až uvnitř. Krokový
          ukazatel tak může viset u okraje okna a zároveň zůstat součástí
          pinu — dokud byl přišpendlený na `trackRef` (2475 px vysoký), byl
          `top-1/2` uprostřed CELÉ dráhy, takže během scrollu odjížděl z
          obrazu a u posledního kroku nebyl vidět vůbec. */}
      <div ref={pinRef} className="relative h-screen">
        <div className="mx-auto grid h-full max-w-6xl grid-cols-2 items-center gap-12 px-6 sm:px-8 lg:px-12">
          <div className="flex max-w-md flex-col gap-4">
            {/* Oba stavy (odcházející i přicházející) sdílejí jednu grid buňku,
                takže se prolínají přes sebe; min výška drží layout, aby
                kratší kroky nehýbaly CTA a plátnem. */}
            <div className="grid min-h-[13rem] items-start">
              <AnimatePresence initial={false}>
                <motion.div
                  key={step.key}
                  className="flex flex-col gap-4 [grid-area:1/1]"
                  initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(5px)" }}
                  transition={STEP_TEXT_TRANSITION}
                >
                  <StepBadge index={activeStep} category={step.category} />
                  <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                    {step.heading}
                  </h2>
                  <p className="text-lg text-zinc-400">{step.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* CTA má rezervovanou výšku i když není vidět — jinak by jeho
                příchod v posledním kroku vytlačil text nahoru a celý levý
                sloupec by povyskočil. */}
            <div className="h-14">
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
          </div>

          <div
            className="relative mx-auto"
            style={{ height: BOX, width: BOX }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
              const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
              parallaxRef.current?.(nx, ny);
            }}
            onMouseLeave={() => {
              parallaxRef.current?.(0, 0);
              setHoveredNode(null);
            }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[32px] border border-zinc-800/60 bg-zinc-950/40">
              {/* Jemná světlá linka na horní hraně — "obrobená" hrana panelu,
                  dekorativní detail bez glassmorphismu. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-zinc-500/40 to-transparent"
              />

              <div ref={gridLayerRef} className="absolute inset-0">
                <CanvasGrid />
              </div>

              {/* Jedna paralaxní vrstva pro kabely + uzly + jádro: jsou
                  souřadnicově svázané (SVG viewBox 1:1 s pixely kontejneru),
                  takže se smí hýbat jen společně. */}
              <div ref={layerRef} className="absolute inset-0">
                <svg
                  viewBox={`0 0 ${BOX} ${BOX}`}
                  className="pointer-events-none absolute inset-0 h-full w-full"
                >
                  <defs>
                    {/* Gradient podél směru toku (spouštěč → jádro):
                        userSpaceOnUse ho natáhne přes všechny kabely naráz,
                        takže data vizuálně "zrají" z tyrkysové do mintové. */}
                    <linearGradient
                      id="aj-flow"
                      gradientUnits="userSpaceOnUse"
                      x1={TRIGGER_OUT.x}
                      y1="0"
                      x2={HUB_IN.x}
                      y2="0"
                    >
                      <stop offset="0%" stopColor="var(--color-brand-turquoise)" />
                      <stop offset="100%" stopColor="var(--color-brand-mint)" />
                    </linearGradient>
                  </defs>

                  {/* Vrstva 1: neutrální "kabel" — kreslí se scrubem. */}
                  {ALL_EDGES.map((d, edgeIndex) => {
                    const dimmed =
                      hoveredNode !== null && !edgeConnectsToNode(edgeIndex, hoveredNode);
                    const highlighted =
                      hoveredNode !== null && edgeConnectsToNode(edgeIndex, hoveredNode);
                    return (
                      <path
                        key={`base-${edgeIndex}`}
                        ref={(el) => {
                          edgeRefs.current[edgeIndex] = el;
                        }}
                        d={d}
                        stroke="var(--color-zinc-600)"
                        strokeWidth={highlighted ? 2 : 1.25}
                        fill="none"
                        style={{
                          // impeccable-disable-next-line layout-transition: jde o SVG prezentační vlastnost tahu, ne o layoutový rozměr — reflow nezpůsobuje.
                          transition: "stroke-opacity 0.25s ease, stroke-width 0.25s ease",
                          strokeOpacity: dimmed ? 0.2 : highlighted ? 0.9 : 0.6,
                        }}
                      />
                    );
                  })}

                  {/* Vrstva 2: barevný "proud" — pomalu driftující čárkování,
                      zesílí na hover a při průjezdu dávky. Viditelnost (od
                      dokreslení kabelu) řídí výhradně GSAP přes autoAlpha,
                      React přes stroke-opacity jen hover jas — dva různé
                      kanály, aby si nepřepisovaly hodnoty. */}
                  {ALL_EDGES.map((d, edgeIndex) => {
                    const dimmed =
                      hoveredNode !== null && !edgeConnectsToNode(edgeIndex, hoveredNode);
                    const highlighted =
                      hoveredNode !== null && edgeConnectsToNode(edgeIndex, hoveredNode);
                    return (
                      <path
                        key={`overlay-${edgeIndex}`}
                        ref={(el) => {
                          overlayRefs.current[edgeIndex] = el;
                        }}
                        d={d}
                        stroke="url(#aj-flow)"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        fill="none"
                        style={{
                          // impeccable-disable-next-line layout-transition: jde o SVG prezentační vlastnost tahu, ne o layoutový rozměr — reflow nezpůsobuje.
                          transition: "stroke-opacity 0.25s ease",
                          strokeOpacity: dimmed ? 0.08 : highlighted ? 0.95 : 0.35,
                        }}
                      />
                    );
                  })}

                  {/* Vrstva 3: kometa běhu — krátký zářivý úsek, který projede
                      kabelem, když systémem prochází dávka dat. */}
                  {ALL_EDGES.map((d, edgeIndex) => (
                    <path
                      key={`comet-${edgeIndex}`}
                      ref={(el) => {
                        cometRefs.current[edgeIndex] = el;
                      }}
                      d={d}
                      stroke="url(#aj-flow)"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      fill="none"
                      style={{ filter: "drop-shadow(0 0 4px var(--color-brand-mint))" }}
                    />
                  ))}

                  {/* Zdířky portů na hranách uzlů. */}
                  <g ref={socketsRef}>
                    {SOCKETS.map((p, i) => (
                      <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r={2.5}
                        fill="var(--color-zinc-600)"
                      />
                    ))}
                  </g>
                </svg>

                {JOURNEY_NODES.map(({ tool, action }, i) => {
                  const isTrigger = i === TRIGGER_INDEX;
                  return (
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
                        <AnimatePresence>
                          {hoveredNode === i && (
                            // Spouštěč stojí u levého okraje plátna a jeho
                            // bublina je nejdelší — vycentrovaná přetéká
                            // přes hranu, kterou panel ořezává. U něj se
                            // proto kotví zleva, ne na střed.
                            <motion.div
                              className={cx(
                                "pointer-events-none absolute bottom-full z-10 mb-2 whitespace-nowrap rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-[10px] font-medium text-zinc-200",
                                isTrigger ? "left-0" : "left-1/2 -translate-x-1/2"
                              )}
                              initial={{ opacity: 0, y: 4, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 2, scale: 0.98 }}
                              transition={{ duration: 0.16, ease: "easeOut" }}
                            >
                              {isTrigger && runnable ? `${tool.name} · spustit znovu` : tool.name}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div
                          ref={(el) => {
                            pingRefs.current[i] = el;
                          }}
                          aria-hidden
                          className="pointer-events-none absolute inset-0 rounded-2xl border border-brand-turquoise"
                        />

                        {/* Vrstvy transformací jsou oddělené schválně: vnější
                            div polohuje scrub (x/y), floatRef nese pomalé
                            dýchání, popRef krátké pulzy běhů — tři nezávislé
                            GSAP kanály, které si nesmí přepisovat transform. */}
                        <div
                          ref={(el) => {
                            floatRefs.current[i] = el;
                          }}
                        >
                          <div
                            ref={(el) => {
                              popRefs.current[i] = el;
                            }}
                            className="relative"
                          >
                            {isTrigger ? (
                              // `aria-disabled` místo `disabled`: nativně
                              // disabled tlačítko v části prohlížečů polyká
                              // mouse eventy, takže by rodiči nefungoval hover
                              // (tooltip, zvýraznění kabelů). Klik hlídá guard
                              // ve `fireRun` (krok < SÍŤ nic nedělá).
                              <button
                                type="button"
                                aria-label="Poslat ukázkovou objednávku systémem znovu"
                                aria-disabled={!runnable}
                                onClick={() => runFnRef.current?.()}
                                className={cx(
                                  "relative block rounded-2xl",
                                  runnable ? "cursor-pointer" : "cursor-default"
                                )}
                              >
                                <ToolChip tool={tool} size="md" shape="square" />
                                {/* Zvací prstenec: jediný trvalý pohyb navíc,
                                    a jen když jde kliknout — říká "tady se dá
                                    hrát", ne jen dekoruje. */}
                                <motion.span
                                  aria-hidden
                                  className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-brand-turquoise"
                                  animate={
                                    runnable
                                      ? { opacity: [0, 0.45, 0], scale: [1, 1.16, 1.16] }
                                      : { opacity: 0 }
                                  }
                                  transition={
                                    runnable
                                      ? { duration: 1.9, repeat: Infinity, ease: "easeOut", times: [0, 0.35, 1] }
                                      : { duration: 0.2 }
                                  }
                                />
                              </button>
                            ) : (
                              <ToolChip tool={tool} size="md" shape="square" />
                            )}

                            {/* Stavová tečka: šedá = zapojeno, tyrkys = uzel
                                se aktivoval. Významový mikroprvek, ne třpytka. */}
                            <span
                              ref={(el) => {
                                dotRefs.current[i] = el;
                              }}
                              aria-hidden
                              className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-zinc-950 bg-zinc-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        ref={(el) => {
                          labelRefs.current[i] = el;
                        }}
                        className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-zinc-800 bg-zinc-900/85 px-2.5 py-1 text-[10px] font-medium text-zinc-300"
                      >
                        {action}
                      </div>
                    </div>
                  );
                })}

                <div
                  ref={hubWrapperRef}
                  className="absolute h-24 w-24"
                  style={{ left: HUB_ABS.x - 48, top: HUB_ABS.y - 48 }}
                  onMouseEnter={() => setHoveredNode(HUB_INDEX)}
                  onMouseLeave={() => setHoveredNode((h) => (h === HUB_INDEX ? null : h))}
                >
                  <div ref={hubPulseRef} className="h-full w-full">
                    <HubNode
                      glowRef={(el) => (glowRef.current = el)}
                      breathRef={(el) => (breathRef.current = el)}
                    />
                  </div>
                  <span
                    ref={hubRingRef}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl border border-brand-turquoise opacity-0"
                  />
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

              {/* Hlavička plátna: vlevo rámování scénáře (rozhodnutí
                  2026-07-22 — bez něj uzly nečtou jako jeden příběh), vpravo
                  živý stav systému. */}
              <div className="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                  Příklad · nová objednávka v e-shopu
                </div>
                <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-1">
                  <span className="relative flex h-1.5 w-1.5">
                    {status.tone === "run" && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-brand-turquoise"
                        animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    <span
                      className={cx("relative h-1.5 w-1.5 rounded-full", STATUS_DOT[status.tone])}
                    />
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={status.label}
                      className="font-mono text-[10px] uppercase tracking-widest text-zinc-300"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.15 }}
                    >
                      {status.label}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Nápověda, že sekce reaguje na scroll — pin bez ní může působit
                jako zamrzlá stránka. Zmizí, jakmile čtenář popojede. */}
            <AnimatePresence>
              {activeStep === 0 && (
                <motion.div
                  className="absolute -bottom-11 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.svg
                    viewBox="0 0 12 12"
                    className="h-3 w-3"
                    aria-hidden
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path
                      d="M2.5 4.5 L6 8 L9.5 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                  Posouvejte
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bez `gap`: terče tlačítek jsou 24×24 px kvůli WCAG 2.5.8, takže
            rozestup mezi viditelnými tečkami nese jejich vlastní odsazení. */}
        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col items-center sm:right-8">
          <div
            aria-hidden
            className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-zinc-800"
          />
          {/* Výplň roste přes scaleY, ne height — height by se počítala na
              hlavním vlákně při každém scroll framu (DESIGN.md §6). */}
          <div
            ref={progressFillRef}
            aria-hidden
            className="absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2 bg-brand-turquoise"
            style={{ transform: "scaleY(0)" }}
          />
          {STEPS.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => goToStep(i)}
              aria-label={`Krok ${i + 1}: ${s.category}`}
              aria-current={activeStep === i}
              className="group relative flex h-6 w-6 items-center justify-center"
            >
              <span
                aria-hidden
                className={cx(
                  "h-2.5 w-2.5 rounded-full border transition-[transform,background-color,border-color] duration-200",
                  activeStep === i
                    ? "scale-125 border-brand-turquoise bg-brand-turquoise"
                    : "border-zinc-700 bg-zinc-950 group-hover:border-brand-turquoise/60"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Kompaktní statická verze diagramu (spouštěč → 4 uzly → jádro ALTENO) pro
// mobil/reduced-motion — bez GSAP/scroll-pin (viz komentář u
// `useIsDesktopViewport`), jen lehké CSS animace stejným principem jako
// MiniProcessDiagram (pulz putující po spojnici), respektuje
// `prefers-reduced-motion` přes existující globální pravidlo.
function MiniWorkflowPreview({ animated }: { animated: boolean }) {
  const [trigger, ...branches] = JOURNEY_NODES;

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
        Příklad · nová objednávka v e-shopu
      </p>
      <div className="flex w-full max-w-xs items-center justify-center gap-2 sm:max-w-sm">
        <ToolChip tool={trigger.tool} size="sm" shape="square" />
        <div className="relative h-px flex-1 bg-zinc-700">
          {animated && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="animate-flow-pulse absolute inset-0">
                <div className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-mint shadow-[0_0_6px_1px_var(--color-brand-mint)]" />
              </div>
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
              <div className="animate-flow-pulse absolute inset-0 [animation-delay:1.4s]">
                <div className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-mint shadow-[0_0_6px_1px_var(--color-brand-mint)]" />
              </div>
            </div>
          )}
        </div>
        <div className="relative h-16 w-16 shrink-0">
          <HubNode compact />
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
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-8">
      {/* Svislá linka spojuje kroky do jedné cesty — mobil nemá scrub ani
          diagram, tak nese "journey" alespoň tahle nit. Linka je sourozenec
          <ol>, ne jeho dítě: <ol> smí přímo obsahovat jen <li> (stejné
          pravidlo jako v TrustStrip.tsx). `<ol>`: kroky jsou číslované
          pořadí, ne volný výčet. */}
      <div className="relative">
        <span
          aria-hidden
          className="absolute bottom-3 left-[5px] top-3 w-px bg-zinc-800"
        />
        <ol className="space-y-12">
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

            return (
              <li key={step.key} className="relative flex gap-5">
                <span
                  aria-hidden
                  className={cx(
                    "relative mt-1.5 h-3 w-3 shrink-0 rounded-full border",
                    isLast
                      ? "border-brand-turquoise bg-brand-turquoise/20"
                      : "border-zinc-700 bg-zinc-950"
                  )}
                />
                <div className="flex-1">
                  {animated ? <AnimatedSection>{content}</AnimatedSection> : content}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
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

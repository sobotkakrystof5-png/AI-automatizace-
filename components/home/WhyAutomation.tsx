"use client";

import type { ComponentType, SVGProps } from "react";
import { whyAutomationPoints, comparisonRows } from "@/lib/why-automation";
import { openAiIconPath } from "@/lib/brand-icons";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";
import {
  BoltIcon,
  ChartIcon,
  ClockIcon,
  LinkIcon,
  RepeatIcon,
  ShieldIcon,
} from "@/components/motion/process-icons";

const MANUAL_LABEL = "Ruční práce s ChatGPT";
const AUTOMATED_LABEL = "Automatizace na míru";

// Ikona ke každé výhodě — karta má nést myšlenku i bez čtení textu
// (babička test 2.0, "vizuál nese myšlenku"). Pořadí odpovídá
// `whyAutomationPoints` v lib/why-automation.ts; když se tam bod přidá
// nebo přeuspořádá, musí se srovnat i tohle pole.
const POINT_ICONS: ReadonlyArray<ComponentType<SVGProps<SVGSVGElement>>> = [
  BoltIcon, // spustí se sama, hned jak nastane událost
  LinkIcon, // propojení s vašimi systémy
  RepeatIcon, // konzistence — běží pokaždé stejně
  ShieldIcon, // bezpečnost dat
  ChartIcon, // škáluje se
  ClockIcon, // ušetřený čas
];

// Oficiální monochrome mark OpenAI (viz lib/brand-icons.ts). Vykresluje se
// v `zinc`, ne ve firemních barvách OpenAI a ne v naší tyrkysové —
// označuje porovnávaný nástroj, netvrdí partnerství ani schválení. Je
// `aria-hidden`, protože "ChatGPT" stojí hned vedle jako text.
function OpenAiMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d={openAiIconPath} />
    </svg>
  );
}

// Wordmark značky, ne vymyšlené logo — ALTENO žádný samostatný symbol
// nemá (viz Navbar, kde je taky jen text). Tyrkysová je tu na místě:
// označuje klíčové sdělení sekce, ne dekoraci.
function AltenoMark() {
  return (
    <span className="rounded-full border border-brand-turquoise/40 bg-brand-turquoise/10 px-2.5 py-0.5 text-xs font-semibold tracking-tight text-brand-turquoise">
      ALTENO
    </span>
  );
}

// Ikony jsou `aria-hidden` záměrně: text v buňce říká totéž a navíc je
// buňka uvozená názvem sloupce, takže křížek/fajfka nic nového nesdělují.
// Proto na ně neplatí kontrastní minimum pro text (viz DESIGN.md §2).
function CrossMark() {
  return (
    <span
      aria-hidden
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-500"
    >
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          d="M3 3l6 6M9 3l-6 6"
        />
      </svg>
    </span>
  );
}

function CheckMark() {
  return (
    <span
      aria-hidden
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-turquoise/20 text-brand-turquoise"
    >
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.5 6.4l2.4 2.4L9.5 3.6"
        />
      </svg>
    </span>
  );
}

export default function WhyAutomation() {
  const lastRow = comparisonRows.length - 1;

  return (
    <section id="proc-automatizace">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-24">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Proč automatizace, a ne jen ChatGPT
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            {"ChatGPT odpoví, jen když se zeptáte — nespustí se sám ani nezná vaše systémy."}
          </p>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyAutomationPoints.map((point, i) => {
            const Icon = POINT_ICONS[i];

            return (
              <AnimatedSection key={point.title} delay={Math.min(i * 0.06, 0.3)}>
                <GlowCard
                  accent="turquoise"
                  className="group h-full bg-zinc-900/50 p-6"
                >
                  {/* Světlo v rohu karty. Absolutně polohovaný sourozenec by
                      se jinak vykreslil PŘES text (pozicované prvky malují
                      nad neplovoucím obsahem), proto mají nadpis, linka i
                      popis `relative` — pak rozhoduje pořadí v DOM. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -left-14 -top-14 h-36 w-36 rounded-full bg-brand-turquoise/10 blur-3xl transition-colors duration-500 group-hover:bg-brand-turquoise/20"
                  />
                  <span
                    aria-hidden
                    className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-brand-turquoise/35 bg-gradient-to-br from-brand-turquoise/20 to-transparent"
                  >
                    <Icon className="h-5 w-5 text-brand-turquoise" />
                  </span>
                  <h3 className="relative mt-5 text-xl font-bold leading-snug text-zinc-50">
                    {point.title}
                  </h3>
                  <span
                    aria-hidden
                    className="relative mt-4 block h-px w-10 bg-gradient-to-r from-brand-turquoise/70 to-transparent"
                  />
                  <p className="relative mt-4 text-zinc-400">{point.body}</p>
                </GlowCard>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Srovnání záměrně NENÍ `<table>` s rámečky a zebrou — vypadalo to
            jako export z Excelu. Sémantiku (řádek = kritérium, dvě
            porovnávané hodnoty) nese ARIA `table`/`rowheader`/`cell`, layout
            dělá grid. Diptych ze dvou panelů na pozadí: neutrální pro ruční
            práci, podsvícený pro automatizaci. Panely jsou samostatné
            plochy, ne karta v kartě — proto tu není žádný společný rámeček
            navíc. Sloupce jsou v procentech a bez mezery, aby polohování
            panelů (22 % / 39 % / 39 %) sedělo přesně — když se změní jedno,
            musí se změnit i druhé.

            Pohyb: celý blok se odhalí JEDNOU, jako jeden celek. Dřív měl
            každý z pěti řádků vlastní `whileInView` se zpožděním `i * 0.07`,
            takže při scrollu naskakovaly postupně — pět samostatných
            spouštěčů na jednom bloku působilo trhaně, ne plynule. Stagger
            dává smysl u mřížky karet, kde jsou dlaždice vedle sebe; u řádků
            pod sebou, kterými se projíždí, ne. */}
        <AnimatedSection className="relative mt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-[22%] right-[39%] mr-2 hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 md:block"
          />
          {/* Zvednutí ze tmy dělá hlavně výplň a ohraničení panelu; záře je
              jen doplněk. Velký rozostřený halo (0 0 60px -14px) vypadal
              jako neon, což je v DESIGN.md §7 na zákazovém seznamu — proto
              vysoký záporný spread, který světlo drží těsně u hrany. Barva
              jde z tokenu, ne z natvrdo zapsané rgba (stejný postup jako u
              pulsu v MiniProcessDiagram.tsx). */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-[61%] right-0 ml-2 hidden rounded-2xl border border-brand-turquoise/35 bg-brand-turquoise/[0.08] shadow-[0_0_40px_-26px_var(--color-brand-turquoise)] md:block"
          />

          {/* Na mobilu není místo na hlavičku sloupců, ale bez ní by čtenář
              nevěděl, čí je která řádka. Opakovat štítek u každé z pěti
              položek byl vizuální šum — nese to jednou legenda a dál už jen
              křížek/fajfka a podsvícení. `aria-hidden`, protože odečítač
              dostane totéž ze `sr-only` štítků uvnitř buněk. */}
          <div
            aria-hidden
            className="mb-6 flex flex-col gap-3 border-b border-zinc-800 pb-6 md:hidden"
          >
            <div className="flex items-center gap-2.5">
              <OpenAiMark className="h-5 w-5 shrink-0 fill-zinc-400" />
              <span className="text-sm text-zinc-300">{MANUAL_LABEL}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <AltenoMark />
              <span className="text-sm font-semibold text-zinc-50">
                {AUTOMATED_LABEL}
              </span>
            </div>
          </div>

          <div
            role="table"
            aria-label={`Srovnání: ${MANUAL_LABEL} vs. ${AUTOMATED_LABEL}`}
            className="relative"
          >
            {/* Hlavička jen od `md` výš. Na mobilu ji nahradí legenda výše —
                `display: none` prvek stejně nečte ani odečítač, takže se
                obsah nezdvojuje. */}
            <div role="rowgroup" className="hidden md:block">
              <div
                role="row"
                className="md:grid md:grid-cols-[minmax(0,22%)_minmax(0,39%)_minmax(0,39%)]"
              >
                <div role="columnheader" className="px-1 pb-5 pt-6">
                  <span className="sr-only">Kritérium</span>
                </div>
                <div
                  role="columnheader"
                  className="flex items-center gap-2.5 px-6 pb-5 pt-6 text-sm font-medium text-zinc-300"
                >
                  <OpenAiMark className="h-5 w-5 shrink-0 fill-zinc-400" />
                  {MANUAL_LABEL}
                </div>
                <div
                  role="columnheader"
                  className="flex items-center gap-2.5 px-6 pb-5 pt-6 text-sm font-semibold text-zinc-50"
                >
                  <AltenoMark />
                  {AUTOMATED_LABEL}
                </div>
              </div>
            </div>

            <div role="rowgroup">
              {comparisonRows.map((row, i) => (
                <div
                  key={row.label}
                  role="row"
                  className={`md:grid md:grid-cols-[minmax(0,22%)_minmax(0,39%)_minmax(0,39%)] md:items-stretch ${
                    i > 0
                      ? "mt-7 border-t border-zinc-800 pt-7 md:mt-0 md:border-t-0 md:pt-0"
                      : ""
                  }`}
                >
                  {/* Kritérium je nadpis řádku, ne popisek — proto je z celého
                      řádku nejvýraznější. Dřív to byla mono verzálka 12 px s
                      tracking 0.18em v `zinc-400`: na tmavém podkladu se to
                      špatně luštilo a rozšířené mezery mezi písmeny čitelnost
                      dál zhoršovaly. Teď běžné písmo, 16 px, `zinc-50`. */}
                  <div
                    role="rowheader"
                    className={`text-base font-semibold text-zinc-50 md:flex md:items-center md:justify-end md:py-5 md:pr-6 md:text-right ${
                      i === lastRow ? "md:pb-6" : ""
                    }`}
                  >
                    {row.label}
                  </div>

                  {/* Na mobilu nese plochu každá buňka sama (panely na pozadí
                      by se přes stohované řádky nedaly protáhnout), od `md`
                      výš ji přebírají panely a buňka je průhledná. */}
                  <div
                    role="cell"
                    className={`mt-3 flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 md:mt-0 md:items-center md:rounded-none md:border-x-0 md:border-b-0 md:border-t md:border-zinc-800 md:bg-transparent md:px-6 md:py-5 ${
                      i === lastRow ? "md:pb-6" : ""
                    }`}
                  >
                    <CrossMark />
                    <span>
                      {/* Pod `md` hlavička sloupců neexistuje ani v
                          přístupnostním stromu (`display: none`), takže
                          vazbu buňky na sloupec nese tenhle štítek. Od `md`
                          výš ho `hidden` odstraní, aby se název sloupce
                          nečetl dvakrát. */}
                      <span className="sr-only md:hidden">{MANUAL_LABEL}: </span>
                      <span className="block text-sm text-zinc-400">
                        {row.manual}
                      </span>
                    </span>
                  </div>

                  <div
                    role="cell"
                    className={`mt-3 flex items-start gap-3 rounded-xl border border-brand-turquoise/30 bg-brand-turquoise/[0.07] p-3 md:mt-0 md:items-center md:rounded-none md:border-x-0 md:border-b-0 md:border-t md:border-brand-turquoise/20 md:bg-transparent md:px-6 md:py-5 ${
                      i === lastRow ? "md:pb-6" : ""
                    }`}
                  >
                    <CheckMark />
                    <span>
                      <span className="sr-only md:hidden">
                        {AUTOMATED_LABEL}:{" "}
                      </span>
                      <span className="block text-sm font-medium text-zinc-50">
                        {row.automated}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <p className="mt-10 text-xl font-semibold text-zinc-50">
          Prostor pro to, co má smysl.
        </p>
        <p className="mt-2 text-zinc-400">
          Automatizace odstraní zdlouhavé rutiny — ušetříte čas i peníze.
        </p>
      </div>
    </section>
  );
}

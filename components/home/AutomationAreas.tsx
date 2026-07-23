import { automationAreas, type AutomationArea } from "@/lib/automation-areas";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";
import MiniProcessDiagram, {
  type MiniProcessIcons,
} from "@/components/motion/MiniProcessDiagram";
import {
  ArrowIcon,
  ChartIcon,
  ChatIcon,
  CheckIcon,
  DatabaseIcon,
  DocumentIcon,
  FunnelIcon,
  GearIcon,
  SparkIcon,
} from "@/components/motion/process-icons";

// Tři ikony na míru dané oblasti (vstup → zpracování → výstup) — Fáze
// R5. Karta má dávat smysl i bez čtení textu, viz
// docs/redesign-kickoff-prompt.md, Fáze R5.
const AREA_ICONS: Record<AutomationArea["slug"], MiniProcessIcons> = {
  marketing: [ChatIcon, SparkIcon, ChartIcon],
  "interni-procesy": [DocumentIcon, CheckIcon, ArrowIcon],
  "zakaznicka-podpora": [ChatIcon, SparkIcon, CheckIcon],
  "prace-s-daty": [DatabaseIcon, FunnelIcon, CheckIcon],
  reporty: [DatabaseIcon, GearIcon, ChartIcon],
  ucetnictvi: [DocumentIcon, CheckIcon, ChartIcon],
};

export default function AutomationAreas() {
  return (
    <section id="automatizace">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Co vše jde automatizovat
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            AI automatizace a agenti zvládnou skoro každou opakující se
            agendu ve firmě. Nejčastěji řešíme:
          </p>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {automationAreas.map((area, i) => (
            <AnimatedSection key={area.slug} delay={Math.min(i * 0.06, 0.3)}>
              <GlowCard
                accent="turquoise"
                href={`/automatizace/${area.slug}`}
                className="flex h-full flex-col p-6"
              >
                <MiniProcessDiagram icons={AREA_ICONS[area.slug]} />
                <h3 className="mt-2 text-lg font-semibold text-zinc-50 group-hover:text-brand-turquoise">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{area.cardLead}</p>
              </GlowCard>
            </AnimatedSection>
          ))}
        </div>

        <p className="mt-8 text-zinc-400">
          Toto je jen výběr nejčastějších oblastí. Pokud se váš proces
          opakuje a stojí vás čas, pravděpodobně jde automatizovat.
        </p>
      </div>
    </section>
  );
}

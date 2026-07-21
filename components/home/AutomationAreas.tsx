import Link from "next/link";
import { automationAreas } from "@/lib/automation-areas";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";

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
                accent="electric"
                href={`/automatizace/${area.slug}`}
                className="flex h-full flex-col p-6"
              >
                <h3 className="text-lg font-semibold text-zinc-50 group-hover:text-brand-electric">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{area.lead}</p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                  {area.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span aria-hidden className="text-zinc-600">
                        •
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
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

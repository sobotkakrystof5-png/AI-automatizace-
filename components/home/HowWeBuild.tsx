import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";

const tools = ["n8n", "JSON", "Make.com", "Zapier"];

export default function HowWeBuild() {
  return (
    <section id="jak-tvorime-automatizace">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Jak tvoříme automatizace
          </h2>
          <p className="mt-4 text-zinc-400">
            Stavíme na moderních nástrojích —{" "}
            <strong className="font-semibold text-zinc-50">
              n8n, JSON, Make.com, Zapier
            </strong>
            . Každou automatizaci systematicky testujeme, než se dotkne
            vašeho provozu.
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-hidden>
            {tools.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-brand-electric/30 bg-brand-electric/10 px-4 py-1.5 text-sm font-medium text-zinc-50"
              >
                {tool}
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <GlowCard accent="electric" className="mt-8 p-6 sm:p-8">
            <p className="text-zinc-400">
              Nejde o to nasadit co nejvíc nástrojů najednou — jde o to
              zvolit ten správný pro váš případ a mít jistotu, že bude
              fungovat spolehlivě.
            </p>
          </GlowCard>
        </AnimatedSection>
      </div>
    </section>
  );
}

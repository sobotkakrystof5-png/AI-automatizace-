import Link from "next/link";
import { pricingTiers } from "@/lib/pricing";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Pricing() {
  return (
    <section id="cenik" className="bg-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Ceník
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            Cena záleží na počtu systémů, složitosti logiky a hodnotě, kterou
            přináší.
          </p>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <AnimatedSection key={tier.title} delay={i * 0.1}>
              <GlowCard accent="turquoise" className="flex h-full flex-col bg-zinc-950 p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold text-zinc-50">
                    {tier.title}
                  </h3>
                  <span aria-hidden className="font-mono text-xs text-zinc-600">
                    {pad(i + 1)}
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold text-brand-turquoise">
                  {tier.price}
                </p>
                <p className="mt-4 border-t border-zinc-800 pt-4 text-sm text-zinc-400">
                  {tier.description}
                </p>
              </GlowCard>
            </AnimatedSection>
          ))}
        </div>

        <p className="mt-8 font-semibold text-zinc-50">
          Přesná cena vychází z konzultace — čísla výše jsou orientační, ne
          finální nabídka.
        </p>

        <p className="mt-3 text-zinc-400">
          Nevíte, kterou automatizaci potřebujete? Audit za 4 999 Kč (viz{" "}
          <Link
            href="#proces-prace"
            className="text-zinc-50 underline hover:text-brand-turquoise"
          >
            Proces práce
          </Link>
          ) doporučí, co řešit první — cenu odečítáme z realizace.
        </p>

        <AnimatedSection>
          <GlowCard accent="turquoise" className="mt-10 bg-zinc-950 p-6">
            <h3 className="text-lg font-semibold text-zinc-50">
              Průběžná podpora
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Volitelný měsíční paušál: monitoring, úpravy a přednostní
              podpora podle rozsahu provozu.
            </p>
          </GlowCard>
        </AnimatedSection>
      </div>
    </section>
  );
}

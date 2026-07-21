import Link from "next/link";
import { pricingTiers } from "@/lib/pricing";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";

export default function Pricing() {
  return (
    <section id="cenik" className="bg-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Ceník
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            {'Cena se neřídí tím, kolik nás stálo automatizaci postavit, ale tím, kolik systémů propojuje, jak složitá je její logika a jakou hodnotu vám přináší. Proto tři orientační pásma:'}
          </p>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <AnimatedSection key={tier.title} delay={i * 0.1}>
              <GlowCard accent="gold" className="flex h-full flex-col bg-zinc-950 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-50">
                  <span aria-hidden>{tier.emoji}</span> {tier.title}
                </h3>
                <p className="mt-1 text-xl font-bold text-brand-gold">
                  {tier.price}
                </p>
                <p className="mt-3 text-zinc-400">{tier.body}</p>
                <p className="mt-4 text-sm italic text-zinc-400">
                  {tier.example}
                </p>
              </GlowCard>
            </AnimatedSection>
          ))}
        </div>

        <p className="mt-8 font-semibold text-zinc-50">
          Přesná cena vždy vychází z konzultace. U střední a větší
          automatizace záleží na počtu systémů, množství logiky a objemu
          dat — čísla výše jsou orientační výchozí bod, ne finální nabídka.
        </p>

        <p className="mt-4 text-zinc-400">
          <span className="font-semibold text-zinc-50">
            Nevíte přesně, kterou automatizaci potřebujete?
          </span>{" "}
          Nabízíme samostatný automatizační audit za 4 999 Kč (viz sekce{" "}
          <Link
            href="#proces-prace"
            className="text-zinc-50 underline hover:text-brand-gold"
          >
            Proces práce
          </Link>
          ) — konkrétní doporučení, co se vyplatí řešit jako první. Cenu
          auditu odečítáme z ceny realizace, pokud se rozhodnete jít dál.
        </p>

        <AnimatedSection>
          <GlowCard accent="gold" className="mt-10 bg-zinc-950 p-6">
            <h3 className="text-lg font-semibold text-zinc-50">
              Průběžná podpora (volitelně)
            </h3>
            <p className="mt-2 text-zinc-400">
              Pro klienty, kteří chtějí mít jistotu, že automatizace poběží
              spolehlivě i při změnách na straně propojených nástrojů,
              nabízíme měsíční paušál na monitoring, drobné úpravy a
              přednostní podporu — cena podle rozsahu a počtu automatizací v
              provozu.
            </p>
          </GlowCard>
        </AnimatedSection>
      </div>
    </section>
  );
}

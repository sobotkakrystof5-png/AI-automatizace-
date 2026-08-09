import Link from "next/link";
import { services } from "@/lib/services";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";

// Sekce Služby (repozice 2026-08-09, viz docs/plan-repozice-2026-08.md,
// sekce 6). Číslovaná karta je převzatá z bývalé sekce Ceník, která byla
// ve Fázi 2c smazaná — vizuál byl schválený a nemá důvod zaniknout jen
// proto, že zmizely ceny. Oproti originálu vypadl řádek s částkou a ten
// se sem NIKDY nesmí vrátit, stejně jako tlačítko vedoucí na ceník.
//
// Cíl CTA je konstanta, ne pole v datech (lib/services.ts) — kdyby byl
// per-service, dal by se jím obejít zákaz odkazu na ceník.
const CTA_HREF = "/#kontakt";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Services() {
  return (
    <section id="sluzby">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-24">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Co pro vás udělám
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            Vyberte, co vás zdržuje nejvíc. Zbytek probereme na konzultaci.
          </p>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {services.map((service, i) => (
            <AnimatedSection key={service.slug} delay={i * 0.1}>
              {/* Klikatelná je celá karta, ne odkaz uvnitř — tři odkazy se
                  stejným popiskem „Probrat na konzultaci" pod sebou jsou
                  pro čtečku obrazovky nepoužitelné. Titulek služby je
                  součástí odkazu, takže nese přístupný název. */}
              <GlowCard
                accent="turquoise"
                href={CTA_HREF}
                className="flex h-full flex-col bg-zinc-950 p-6"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold text-zinc-50">
                    {service.title}
                  </h3>
                  <span aria-hidden className="font-mono text-xs text-zinc-600">
                    {pad(i + 1)}
                  </span>
                </div>
                <p className="mt-4 border-t border-zinc-800 pt-4 text-sm text-zinc-400">
                  {service.summary}
                </p>
                <span
                  aria-hidden
                  className="mt-6 text-sm font-medium text-brand-turquoise"
                >
                  Probrat na konzultaci →
                </span>
              </GlowCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <p className="mt-8 text-sm text-zinc-400">
            Nevidíte tu svůj případ?{" "}
            <Link
              href={CTA_HREF}
              className="text-zinc-50 underline hover:text-brand-turquoise"
            >
              Napište mi
            </Link>{" "}
            — automatizace se staví na míru, ne z katalogu.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

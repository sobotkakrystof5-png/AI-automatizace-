"use client";

import { useActionState } from "react";
import { submitLead, type LeadFormState } from "@/actions";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";
import MagneticButton from "@/components/motion/MagneticButton";
import { connectedTools } from "@/lib/tools";

const initialState: LeadFormState = { success: false };

const stats = [
  { value: "2 roky", label: "přímé zkušenosti s klienty" },
  { value: "24 hodin", label: "maximální doba odezvy" },
  { value: "2 roky", label: "záruka na každou automatizaci" },
];

export default function FinalCTA() {
  const [state, formAction, isPending] = useActionState(
    submitLead,
    initialState
  );

  return (
    <section id="kontakt" className="bg-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Chcete zpátky svůj čas?
          </h2>
          <p className="mt-4 text-xl text-zinc-400">
            Napište pár vět o tom, co vás brzdí — ozvu se do 24 hodin s
            konkrétním nápadem, ne s prodejní řečí.
          </p>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 gap-4 border-t border-zinc-800 pt-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.08}>
              <GlowCard accent="gold" className="bg-zinc-950 p-4">
                <p className="text-xl font-bold text-brand-gold">
                  {stat.value}
                </p>
                <p className="text-sm text-zinc-400">{stat.label}</p>
              </GlowCard>
            </AnimatedSection>
          ))}
        </div>

        {state.success ? (
          <div
            role="status"
            className="mt-8 rounded-lg border border-brand-gold/30 bg-zinc-950 p-6"
          >
            <p className="font-semibold text-zinc-50">Díky, mám to.</p>
            <p className="mt-2 text-zinc-400">
              Ozvu se osobně, nejpozději do 24 hodin — každý den v týdnu.
            </p>
          </div>
        ) : (
          <form action={formAction} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-50"
              >
                Jméno *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-50 focus:border-brand-gold focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-50"
              >
                E-mail *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-50 focus:border-brand-gold focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="blocker"
                className="block text-sm font-medium text-zinc-50"
              >
                Co vás ve firmě aktuálně nejvíc zdržuje? *
              </label>
              <textarea
                id="blocker"
                name="blocker"
                required
                rows={4}
                placeholder="např. ručně přepisujeme objednávky mezi e-shopem a účetnictvím"
                className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-50 focus:border-brand-gold focus:outline-none"
              />
            </div>

            <div>
              <span className="block text-sm font-medium text-zinc-50">
                Jaké nástroje dnes ve firmě používáte?
              </span>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                {connectedTools.map((tool) => (
                  <label
                    key={tool.slug}
                    className="flex items-center gap-2 text-sm text-zinc-300"
                  >
                    <input
                      type="checkbox"
                      name="toolsUsed"
                      value={tool.slug}
                      className="h-4 w-4 rounded border-zinc-700 text-brand-gold focus:ring-brand-gold"
                    />
                    {tool.name}
                  </label>
                ))}
              </div>
              <input
                id="toolsOther"
                name="toolsOther"
                type="text"
                placeholder="Jiné nástroje (nepovinné)"
                className="mt-2 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-50 focus:border-brand-gold focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="automationGoal"
                className="block text-sm font-medium text-zinc-50"
              >
                Co konkrétně byste chtěli automatizovat?
              </label>
              <textarea
                id="automationGoal"
                name="automationGoal"
                rows={3}
                placeholder="např. automatické vystavování faktur po dokončené zakázce"
                className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-50 focus:border-brand-gold focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-zinc-50"
              >
                Telefon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-50 focus:border-brand-gold focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="companyUrl"
                className="block text-sm font-medium text-zinc-50"
              >
                Odkaz na web firmy
              </label>
              <input
                id="companyUrl"
                name="companyUrl"
                type="url"
                placeholder="https://"
                className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-50 focus:border-brand-gold focus:outline-none"
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-zinc-700 text-brand-gold focus:ring-brand-gold"
              />
              <label htmlFor="consent" className="text-sm text-zinc-400">
                Souhlasím se zpracováním osobních údajů podle{" "}
                <a
                  href="/ochrana-osobnich-udaju"
                  className="underline hover:text-zinc-50"
                >
                  Zásad ochrany osobních údajů
                </a>
                .
              </label>
            </div>

            {state.error && (
              <p role="alert" className="text-sm text-red-400">
                {state.error}
              </p>
            )}

            <MagneticButton
              type="submit"
              disabled={isPending}
              className="w-full rounded-md bg-brand-gold px-6 py-3 font-semibold text-zinc-950 transition-colors hover:bg-brand-gold/90 disabled:opacity-60 sm:w-auto"
            >
              {isPending ? "Odesílám…" : "Odeslat a domluvit další krok →"}
            </MagneticButton>

            <p className="text-sm text-zinc-400">
              Bez závazků. Ozvu se osobně, nejpozději do 24 hodin — každý den
              v týdnu. Vaše údaje nikam neputují mimo tuhle konverzaci.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

"use client";

import { useActionState } from "react";
import { submitLead, type LeadFormState } from "@/actions";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";

const initialState: LeadFormState = { success: false };

const stats = [
  { value: "2 roky", label: "přímé zkušenosti s klienty" },
  { value: "24 hodin", label: "maximální doba odezvy" },
  { value: "2 roky", label: "záruka na každou automatizaci" },
];

// Redesign 2026-07-22 — nahrazuje dřívější výběr "jaké nástroje dnes
// používáte" (checkboxy `toolsUsed`/`toolsOther`) polem na vizi
// automatizace. `blocker` + `automationGoal` sloučeny do jedné otázky
// (ať vedle sebe nejsou tři podobná textová pole) — nové pole "vize"
// jde záměrně do existujícího nullable sloupce `automationGoal`
// (db/schema.ts), ne do nového sloupce `vision`: stejný sémantický
// význam (vize/cíl automatizace) a žádná DB migrace není potřeba.
// `toolsUsed`/`toolsOther` zůstávají v Zod schématu i DB beze změny
// (actions.ts, db/schema.ts) — formulář je teď jen neposílá, přijde
// prázdné pole/null. Vyhrazená DB migrace na samostatný sloupec `vision`
// je otevřený bod — navrhnout a počkat na souhlas, pokud bude chtít
// oddělené pole místo sdíleného `automationGoal`.
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
            Chcete zpátky čas i peníze?
          </h2>
          <p className="mt-4 text-xl text-zinc-400">
            Napište pár vět o tom, co vás brzdí — ozvu se do 24 hodin s
            konkrétním nápadem, ne s prodejní řečí.
          </p>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 gap-4 border-t border-zinc-800 pt-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.08}>
              <GlowCard accent="turquoise" className="bg-zinc-950 p-4">
                <p className="text-xl font-bold text-brand-turquoise">
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
            className="mt-8 rounded-lg border border-brand-turquoise/30 bg-zinc-950 p-6"
          >
            <p className="font-semibold text-zinc-50">Díky, mám to.</p>
            <p className="mt-2 text-zinc-400">
              Ozvu se osobně, nejpozději do 24 hodin — každý den v týdnu.
            </p>
          </div>
        ) : (
          <form action={formAction} className="mt-8 space-y-5">
            <div className="space-y-5">
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
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-50 placeholder:text-zinc-500 focus:border-brand-turquoise focus:outline-none"
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
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-50 placeholder:text-zinc-500 focus:border-brand-turquoise focus:outline-none"
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
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-50 placeholder:text-zinc-500 focus:border-brand-turquoise focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-5 border-t border-zinc-800 pt-6">
              <div>
                <label
                  htmlFor="blocker"
                  className="block text-sm font-medium text-zinc-50"
                >
                  Co vás dnes nejvíc brzdí a jak si představujete ideální
                  stav? *
                </label>
                <textarea
                  id="blocker"
                  name="blocker"
                  required
                  rows={4}
                  placeholder="např. ručně přepisujeme objednávky mezi e-shopem a účetnictvím — chtěli bychom, aby to šlo samo"
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-50 placeholder:text-zinc-500 focus:border-brand-turquoise focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="vision"
                  className="block text-sm font-medium text-zinc-50"
                >
                  Jaká je vaše vize automatizace ve firmě?
                </label>
                <textarea
                  id="vision"
                  name="automationGoal"
                  rows={3}
                  placeholder="např. chci, aby se celý proces od poptávky po fakturaci odehrál bez jediného ručního kroku"
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-50 placeholder:text-zinc-500 focus:border-brand-turquoise focus:outline-none"
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
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-50 placeholder:text-zinc-500 focus:border-brand-turquoise focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-zinc-700 text-brand-turquoise focus:ring-brand-turquoise"
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

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-md bg-brand-turquoise px-6 py-3 font-semibold text-zinc-950 transition-colors hover:bg-brand-turquoise/90 disabled:opacity-60 sm:w-auto"
            >
              {isPending ? "Odesílám…" : "Odeslat a domluvit další krok →"}
            </button>

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

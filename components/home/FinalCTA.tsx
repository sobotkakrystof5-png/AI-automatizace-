"use client";

import { useActionState } from "react";
import { submitLead, type LeadFormState } from "@/actions";
import { ZAKAZIQ_BOOKING_URL } from "@/lib/constants";

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
    <section id="kontakt" className="bg-brand-cream">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          Chcete zpátky svůj čas?
        </h2>
        <p className="mt-4 text-xl text-brand-navy/80">
          Napište pár vět o tom, co vás brzdí — ozvu se do 24 hodin s
          konkrétním nápadem, ne s prodejní řečí.
        </p>

        <a
          href={ZAKAZIQ_BOOKING_URL}
          className="mt-8 inline-flex rounded-md bg-brand-gold px-6 py-3 font-semibold text-black transition-colors hover:bg-brand-gold/90"
        >
          Rezervovat konzultaci zdarma
        </a>

        <p className="mt-4 text-sm text-brand-navy/80">
          nebo napište pár řádků níž ↓
        </p>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-brand-navy/10 pt-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-xl font-bold text-brand-teal">
                {stat.value}
              </p>
              <p className="text-sm text-brand-navy/80">{stat.label}</p>
            </div>
          ))}
        </div>

        {state.success ? (
          <div
            role="status"
            className="mt-8 rounded-lg border border-brand-teal/30 bg-white p-6"
          >
            <p className="font-semibold text-brand-navy">Díky, mám to.</p>
            <p className="mt-2 text-brand-navy/80">
              Ozvu se osobně, nejpozději do 24 hodin — každý den v týdnu.
            </p>
          </div>
        ) : (
          <form action={formAction} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-brand-navy"
              >
                Jméno *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 w-full rounded-md border border-brand-navy/20 bg-white px-3 py-2 text-brand-navy focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-brand-navy"
              >
                E-mail *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-md border border-brand-navy/20 bg-white px-3 py-2 text-brand-navy focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="blocker"
                className="block text-sm font-medium text-brand-navy"
              >
                Co vás ve firmě aktuálně nejvíc zdržuje? *
              </label>
              <textarea
                id="blocker"
                name="blocker"
                required
                rows={4}
                placeholder="např. ručně přepisujeme objednávky mezi e-shopem a účetnictvím"
                className="mt-1 w-full rounded-md border border-brand-navy/20 bg-white px-3 py-2 text-brand-navy focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-brand-navy"
              >
                Telefon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="mt-1 w-full rounded-md border border-brand-navy/20 bg-white px-3 py-2 text-brand-navy focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="companyUrl"
                className="block text-sm font-medium text-brand-navy"
              >
                Odkaz na web firmy
              </label>
              <input
                id="companyUrl"
                name="companyUrl"
                type="url"
                placeholder="https://"
                className="mt-1 w-full rounded-md border border-brand-navy/20 bg-white px-3 py-2 text-brand-navy focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-brand-navy/30 text-brand-teal focus:ring-brand-teal"
              />
              <label htmlFor="consent" className="text-sm text-brand-navy/80">
                Souhlasím se zpracováním osobních údajů podle{" "}
                <a
                  href="/ochrana-osobnich-udaju"
                  className="underline hover:text-brand-navy"
                >
                  Zásad ochrany osobních údajů
                </a>
                .
              </label>
            </div>

            {state.error && (
              <p role="alert" className="text-sm text-red-700">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-md bg-brand-gold px-6 py-3 font-semibold text-black transition-colors hover:bg-brand-gold/90 disabled:opacity-60 sm:w-auto"
            >
              {isPending ? "Odesílám…" : "Odeslat a domluvit další krok →"}
            </button>

            <p className="text-sm text-brand-navy/80">
              Bez závazků. Ozvu se osobně, nejpozději do 24 hodin — každý den
              v týdnu. Vaše údaje nikam neputují mimo tuhle konverzaci.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

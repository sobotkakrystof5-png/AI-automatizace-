"use client";

import { useActionState } from "react";
import { submitLead, type LeadFormState } from "@/actions";

const initialState: LeadFormState = { success: false };

const FIELD_CLASS =
  "mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-50 placeholder:text-zinc-400 focus:border-brand-turquoise";

// Jediná klientská část kontaktní sekce. Oddělená od obalu schválně:
// `useActionState` vyžaduje "use client", ale kontaktní dlaždice ani
// booking poznámka klienta nepotřebují. Kdyby byly ve stejném souboru,
// putovaly by do klientského bundlu úplně zbytečně.
//
// Pole formuláře a jejich vazba na DB: viz claude.md, sekce "Obchodní
// tvrzení a leadový formulář". Povinné jsou jen jméno, e-mail a souhlas.
export default function ContactLeadForm() {
  const [state, formAction, isPending] = useActionState(
    submitLead,
    initialState
  );

  if (state.success) {
    return (
      <div
        role="status"
        className="rounded-lg border border-brand-turquoise/30 bg-zinc-950 p-6"
      >
        <p className="font-semibold text-zinc-50">Díky, mám to.</p>
        <p className="mt-2 text-zinc-400">
          Ozvu se osobně, nejpozději do 24 hodin, každý den v týdnu.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
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
            className={FIELD_CLASS}
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
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-zinc-50"
          >
            Telefon
          </label>
          <input id="phone" name="phone" type="tel" className={FIELD_CLASS} />
        </div>
      </div>

      <div className="space-y-5 border-t border-zinc-800 pt-6">
        <div>
          <label
            htmlFor="additionalNotes"
            className="block text-sm font-medium text-zinc-50"
          >
            Co máte na srdci (nepovinné)
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            rows={3}
            className={FIELD_CLASS}
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
            className={FIELD_CLASS}
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
        {isPending ? "Odesílám…" : "Odeslat a domluvit konzultaci"}
      </button>

      <p className="text-sm text-zinc-400">
        Bez závazků. Ozvu se osobně, nejpozději do 24 hodin, každý den
        v týdnu. Vaše údaje nikam neputují mimo tuhle konverzaci.
      </p>
    </form>
  );
}

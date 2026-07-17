import type { Metadata } from "next";
import LegalPageSection, {
  LegalDraftNotice,
} from "@/components/layout/LegalPageSection";

export const metadata: Metadata = {
  title: "Zásady cookies | AvenIQ",
  description:
    "Zásady používání cookies na webu AvenIQ — dokument se připravuje a čeká na finální kontrolu advokátem.",
  robots: { index: false, follow: true },
};

const sections = [
  "Co jsou cookies",
  "Kategorie cookies, které používáme",
  "Právní základ zpracování",
  "Jak spravovat souhlas",
];

export default function CookiesPage() {
  return (
    <section className="bg-brand-cream">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          Zásady cookies
        </h1>
        <LegalDraftNotice />

        <div className="mt-6 rounded-md border border-brand-teal/30 bg-white px-4 py-3 text-sm text-brand-navy/80">
          <strong className="font-semibold text-brand-navy">
            Technická poznámka:
          </strong>{" "}
          web aktuálně nespouští žádné analytické ani marketingové skripty.
          Jediná hodnota, kterou si ukládáme, je vaše volba v cookie liště —
          uložená lokálně ve vašem prohlížeči (localStorage), ne jako
          cookie třetí strany. Pokud v budoucnu doplníme analytiku, spustí se
          až po vašem výslovném souhlasu.
        </div>

        {sections.map((title) => (
          <LegalPageSection key={title} title={title} />
        ))}
      </div>
    </section>
  );
}

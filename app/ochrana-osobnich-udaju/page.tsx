import type { Metadata } from "next";
import LegalPageSection, {
  LegalDraftNotice,
} from "@/components/layout/LegalPageSection";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů | AvenIQ",
  description:
    "Zásady ochrany osobních údajů AvenIQ — dokument se připravuje a čeká na finální kontrolu advokátem.",
  robots: { index: false, follow: true },
};

const sections = [
  "Správce osobních údajů",
  "Jaké osobní údaje zpracováváme",
  "Práva subjektů údajů",
  "Doba uchování údajů",
  "Zpracovatelé a příjemci údajů",
];

export default function OchranaOsobnichUdajuPage() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Zásady ochrany osobních údajů
        </h1>
        <LegalDraftNotice />

        {sections.map((title) => (
          <LegalPageSection key={title} title={title} />
        ))}
      </div>
    </section>
  );
}

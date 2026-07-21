import LegalPageSection, {
  LegalDraftNotice,
} from "@/components/layout/LegalPageSection";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = {
  ...pageMetadata({
    path: "/vop",
    title: "Všeobecné obchodní podmínky | AvenIQ",
    description:
      "Všeobecné obchodní podmínky AvenIQ — dokument se připravuje a čeká na finální kontrolu advokátem.",
  }),
  robots: { index: false, follow: true },
};

const sections = [
  "Úvodní ustanovení a definice",
  "Konzultace a automatizační audit",
  "Realizace automatizace",
  "Záruka",
  "Odpovědnost",
  "Platební podmínky",
];

export default function VopPage() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Všeobecné obchodní podmínky
        </h1>
        <LegalDraftNotice />

        {sections.map((title) => (
          <LegalPageSection key={title} title={title} />
        ))}
      </div>
    </section>
  );
}

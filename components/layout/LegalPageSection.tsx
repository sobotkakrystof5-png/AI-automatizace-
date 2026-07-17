export function LegalDraftNotice() {
  return (
    <p className="mt-4 text-brand-navy/80">
      Tento dokument se aktuálně připravuje a před nasazením na ostrý provoz
      projde kontrolou advokátem. Sekce níže ukazují závaznou strukturu
      dokumentu — konkrétní právní formulace budou doplněny.
    </p>
  );
}

export default function LegalPageSection({ title }: { title: string }) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-brand-navy">{title}</h2>
      <p className="mt-2 rounded-md border border-dashed border-brand-navy/30 bg-white px-4 py-3 text-sm text-brand-navy/80">
        [DOPLNIT PRÁVNÍ TEXT]
      </p>
    </div>
  );
}

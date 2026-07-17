export function LegalDraftNotice() {
  return (
    <p className="mt-4 text-zinc-400">
      Tento dokument se aktuálně připravuje a před nasazením na ostrý provoz
      projde kontrolou advokátem. Sekce níže ukazují závaznou strukturu
      dokumentu — konkrétní právní formulace budou doplněny.
    </p>
  );
}

export default function LegalPageSection({ title }: { title: string }) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-zinc-50">{title}</h2>
      <p className="mt-2 rounded-md border border-dashed border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-400">
        [DOPLNIT PRÁVNÍ TEXT]
      </p>
    </div>
  );
}

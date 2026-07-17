import type { Metadata } from "next";

// Interní QA stránka — náhled navrhované tmavé palety (rozhodnuto
// 2026-07-17, nahrazuje starou navy/teal/cream/gold/navbar paletu).
// Nepatří do produkční navigace webu.
export const metadata: Metadata = {
  title: "Design tokeny — interní náhled",
  robots: { index: false, follow: false },
};

const neutralSwatches = [
  {
    token: "zinc-950",
    hex: "#09090b",
    usage: "Základní pozadí stránky (base)",
    className: "bg-zinc-950",
    textOn: "text-zinc-50",
  },
  {
    token: "zinc-900",
    hex: "#18181b",
    usage: "Povrch / karty na tmavém pozadí",
    className: "bg-zinc-900",
    textOn: "text-zinc-50",
  },
  {
    token: "zinc-800",
    hex: "#27272a",
    usage: "Ohraničení, jemné oddělovače, hover stav",
    className: "bg-zinc-800",
    textOn: "text-zinc-50",
  },
  {
    token: "zinc-400",
    hex: "#a1a1aa",
    usage: "Tlumený / sekundární text",
    className: "bg-zinc-400",
    textOn: "text-zinc-950",
  },
  {
    token: "zinc-50",
    hex: "#fafafa",
    usage: "Primární text na tmavém pozadí",
    className: "bg-zinc-50",
    textOn: "text-zinc-950",
  },
] as const;

export default function DesignPreviewPage() {
  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-50 sm:px-12">
      <div className="mx-auto max-w-4xl space-y-16">
        <header className="space-y-3 border-b border-zinc-800 pb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-brand-gold">
            Návrh — nahrazuje starou paletu, čeká na schválení
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Zjednodušená tmavá paleta
          </h1>
          <p className="max-w-2xl text-zinc-400">
            Minimum vlastních barev: základ tvoří přímo standardní Tailwind
            škála{" "}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm">
              zinc
            </code>{" "}
            (žádné vlastní hex tokeny), jediná vlastní barva je akcent{" "}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm">
              brand-gold
            </code>{" "}
            vyhrazený pro CTA a klíčové akcenty. Cíl: tmavý, elegantní
            &bdquo;tech / luxury&ldquo; dojem.
          </p>
        </header>

        <section>
          <h2 className="mb-6 text-xl font-semibold">
            Neutrální škála (Tailwind zinc)
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {neutralSwatches.map((s) => (
              <div
                key={s.token}
                className="overflow-hidden rounded-lg border border-zinc-800"
              >
                <div
                  className={`flex h-24 items-end p-4 ${s.className} ${s.textOn}`}
                >
                  <span className="font-mono text-sm">{s.hex}</span>
                </div>
                <div className="bg-zinc-900 p-4">
                  <p className="font-mono text-sm font-semibold">{s.token}</p>
                  <p className="text-sm text-zinc-400">{s.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-xl font-semibold">
            Akcent (jediná vlastní barva)
          </h2>
          <div className="overflow-hidden rounded-lg border border-zinc-800 sm:max-w-sm">
            <div className="flex h-24 items-end bg-brand-gold p-4 text-zinc-950">
              <span className="font-mono text-sm">#B98B4E</span>
            </div>
            <div className="bg-zinc-900 p-4">
              <p className="font-mono text-sm font-semibold">brand-gold</p>
              <p className="text-sm text-zinc-400">
                Výhradně CTA tlačítko a klíčové akcenty — ponecháno z
                původní palety kvůli kontinuitě značky.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-xl font-semibold">Typografie (font-sans)</h2>
          <div className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h1 className="text-4xl font-semibold tracking-tight">
              Chytrá automatizace. Lidský přístup.
            </h1>
            <h2 className="text-2xl font-semibold text-zinc-50">
              Váš čas patří zákazníkům, ne excelu.
            </h2>
            <h3 className="text-lg font-medium text-brand-gold">
              V čem jsme jiní
            </h3>
            <p className="max-w-xl text-zinc-400">
              Bereme firmám zpátky hodiny strávené opakovanou administrativou
              — a vracíme je tam, kam patří: k zákazníkům, k růstu, k práci,
              která vás baví. Písmo: Geist Sans (next/font, beze změny).
            </p>
            <p className="font-mono text-sm text-zinc-500">
              font-mono ukázka — Geist Mono, pro kód / technické detaily.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-xl font-semibold">Ukázka — hero blok</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 sm:p-14">
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-zinc-400">
              AvenIQ — AI automatizace
            </p>
            <h3 className="mb-4 max-w-xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Chytrá automatizace. Lidský přístup.
            </h3>
            <p className="mb-8 max-w-lg text-zinc-400">
              Ukázka kontrastu textu a tlačítka na navrhovaném tmavém pozadí —
              pro reálné porovnání s aktuální (světlou) verzí webu.
            </p>
            <button className="rounded-md bg-brand-gold px-6 py-3 font-semibold text-zinc-950 transition hover:brightness-110">
              Rezervovat konzultaci zdarma
            </button>
          </div>
        </section>

        <footer className="border-t border-zinc-800 pt-8 text-sm text-zinc-400">
          <p>
            Tohle je jen ukázka tokenů, ne finální layout. Barvy zatím{" "}
            <strong className="text-zinc-50">nejsou</strong> aplikované napříč
            zbytkem webu (Navbar, Hero, homepage sekce běží stále na staré
            paletě) — čeká se na tvoje schválení tady, než se rozšíří dál.
          </p>
        </footer>
      </div>
    </div>
  );
}

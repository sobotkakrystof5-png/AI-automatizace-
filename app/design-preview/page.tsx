import type { Metadata } from "next";

// Interní QA stránka pro Fázi 1 — kontrola design tokenů a fontu před
// pokračováním na další fáze. Nepatří do produkční navigace webu.
export const metadata: Metadata = {
  title: "Design tokeny — interní náhled",
  robots: { index: false, follow: false },
};

const swatches = [
  {
    token: "brand-navy",
    hex: "#1E3A5F",
    usage: "Hero, sekce Proces práce, O nás",
    textOn: "text-white",
  },
  {
    token: "brand-teal",
    hex: "#4F8074",
    usage: "Ikony, doplňkové prvky, karty",
    textOn: "text-white",
  },
  {
    token: "brand-cream",
    hex: "#F5F2EA",
    usage: "Světlé sekce, pozadí",
    textOn: "text-brand-navy",
  },
  {
    token: "brand-gold",
    hex: "#B98B4E",
    usage: "Výhradně CTA tlačítko a sekce Záruka",
    textOn: "text-white",
  },
  {
    token: "brand-navbar",
    hex: "#F3F6F4",
    usage: "Horní lišta",
    textOn: "text-brand-navy",
  },
] as const;

const swatchBg: Record<(typeof swatches)[number]["token"], string> = {
  "brand-navy": "bg-brand-navy",
  "brand-teal": "bg-brand-teal",
  "brand-cream": "bg-brand-cream",
  "brand-gold": "bg-brand-gold",
  "brand-navbar": "bg-brand-navbar",
};

export default function DesignPreviewPage() {
  return (
    <div className="min-h-screen bg-brand-cream px-6 py-16 text-brand-navy sm:px-12">
      <div className="mx-auto max-w-4xl space-y-16">
        <header className="space-y-2 border-b border-brand-navy/10 pb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-brand-teal">
            Fáze 1 — interní náhled, není součástí produkčního webu
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Design tokeny a font
          </h1>
          <p className="max-w-2xl text-brand-navy/70">
            Barvy a font podle{" "}
            <code className="rounded bg-brand-navy/5 px-1.5 py-0.5 text-sm">
              AvenIQ_obsah_webu.md
            </code>
            , napojené jako pojmenované Tailwind v4 tokeny přes{" "}
            <code className="rounded bg-brand-navy/5 px-1.5 py-0.5 text-sm">
              @theme
            </code>{" "}
            v <code className="rounded bg-brand-navy/5 px-1.5 py-0.5 text-sm">globals.css</code>.
          </p>
        </header>

        <section>
          <h2 className="mb-6 text-xl font-semibold">Barevná paleta</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {swatches.map((s) => (
              <div
                key={s.token}
                className="overflow-hidden rounded-lg border border-brand-navy/10"
              >
                <div
                  className={`flex h-24 items-end p-4 ${swatchBg[s.token]} ${s.textOn}`}
                >
                  <span className="font-mono text-sm">{s.hex}</span>
                </div>
                <div className="bg-white p-4">
                  <p className="font-mono text-sm font-semibold">
                    bg-{s.token} / text-{s.token}
                  </p>
                  <p className="mt-1 text-sm text-brand-navy/70">{s.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-xl font-semibold">Typografie (font-sans)</h2>
          <div className="space-y-4 rounded-lg border border-brand-navy/10 bg-white p-6">
            <h1 className="text-4xl font-semibold tracking-tight">
              Chytrá automatizace. Lidský přístup.
            </h1>
            <h2 className="text-2xl font-semibold">Váš čas patří zákazníkům, ne excelu.</h2>
            <h3 className="text-lg font-medium text-brand-teal">
              V čem jsme jiní
            </h3>
            <p className="max-w-xl text-brand-navy/80">
              Bereme firmám zpátky hodiny strávené opakovanou administrativou
              — a vracíme je tam, kam patří: k zákazníkům, k růstu, k práci,
              která vás baví. Písmo: Geist Sans (next/font/google, bez
              dodatečné závislosti).
            </p>
            <p className="font-mono text-sm text-brand-navy/60">
              font-mono ukázka — Geist Mono, pro kód / technické detaily.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-xl font-semibold">
            Zlatý akcent — pouze CTA a Záruka
          </h2>
          <div className="flex flex-wrap items-center gap-4 rounded-lg border border-brand-navy/10 bg-white p-6">
            <button
              type="button"
              className="rounded-full bg-brand-gold px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
            >
              Rezervovat konzultaci zdarma
            </button>
            <span className="text-sm text-brand-navy/60">
              ↑ jediný povolený kontext pro brand-gold mimo sekci Záruka
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

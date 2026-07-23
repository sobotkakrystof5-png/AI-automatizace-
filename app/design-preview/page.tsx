import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";
import FlowDiagramLazy from "@/components/motion/FlowDiagramLazy";

// Interní QA stránka — náhled design tokenů a motion primitiv, ne
// produkční layout. Historie palety: zjednodušená tmavá paleta
// (2026-07-17) → brand-gold/brand-electric (Fáze R0/R1, 2026-07-21) →
// tyrkysovo-mintová paleta R11 (2026-07-22, viz claude.md, sekce "Redesign
// 2026" → "Paleta R11"), aktuálně běžící produkčně napříč webem.
// Nepatří do produkční navigace webu.
export const metadata: Metadata = {
  title: "Design tokeny — interní náhled",
  robots: { index: false, follow: false },
};

const neutralSwatches = [
  {
    token: "zinc-950",
    hex: "#09090b",
    usage: "Report/karty na tmavém podkladu, ne base pozadí (to je teď gradient)",
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

const brandSwatches = [
  {
    token: "brand-turquoise",
    hex: "#2DD4BF",
    usage: "Primární interaktivní akcent — CTA, aktivní stavy, klíčové zvýraznění",
    className: "bg-brand-turquoise",
    textOn: "text-zinc-950",
  },
  {
    token: "brand-mint",
    hex: "#6EE7B7",
    usage: "Doplněk k tyrkysové — gradienty, jemné ambientní detaily",
    className: "bg-brand-mint",
    textOn: "text-zinc-950",
  },
  {
    token: "brand-deep-green",
    hex: "#052E2B",
    usage: "Tmavý zeleno-černý podklad pozadí (ambient gradient)",
    className: "bg-brand-deep-green",
    textOn: "text-zinc-50",
  },
  {
    token: "brand-deep-blue",
    hex: "#0A1A2F",
    usage: "Tmavý modro-černý podklad pozadí (ambient gradient)",
    className: "bg-brand-deep-blue",
    textOn: "text-zinc-50",
  },
] as const;

export default function DesignPreviewPage() {
  return (
    <div className="min-h-screen px-6 py-16 text-zinc-50 sm:px-12">
      <div className="mx-auto max-w-4xl space-y-16">
        <header className="space-y-3 border-b border-zinc-800 pb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-brand-turquoise">
            Paleta R11 — potvrzeno 2026-07-22, běží produkčně
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Tyrkysovo-mintová paleta
          </h1>
          <p className="max-w-2xl text-zinc-400">
            Neutrální základ zůstává na standardní Tailwind škále{" "}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm">
              zinc
            </code>
            . Vlastní jsou čtyři tokeny —{" "}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm">
              brand-turquoise
            </code>{" "}
            jako primární interaktivní akcent,{" "}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm">
              brand-mint
            </code>{" "}
            jako jeho jemný doplněk, a{" "}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm">
              brand-deep-green
            </code>
            /
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm">
              brand-deep-blue
            </code>{" "}
            pro ambientní gradient pozadí. Nahrazují dřívější
            brand-gold/brand-electric systém (Fáze R0/R1, 2026-07-21).
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
            Značkové tokeny (potvrzeno, používá se produkčně)
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {brandSwatches.map((s) => (
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

        <section className="space-y-4 rounded-xl border border-brand-turquoise/20 bg-zinc-900/40 p-6 sm:p-8">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-wide text-brand-turquoise">
              Pozadí — aktuální stav
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Ambientní gradient (živě, viz body v globals.css)
            </h2>
            <p className="max-w-2xl text-sm text-zinc-400">
              Nahrazuje plochou <code className="rounded bg-zinc-950 px-1.5 py-0.5">zinc-950</code>{" "}
              — dva radiální gradienty (deep-green vlevo nahoře, deep-blue
              vpravo) nad téměř černým základem, `background-attachment:
              fixed`, aby se nepřekresloval při scrollu.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-zinc-800">
            <div
              className="flex h-40 items-end p-4"
              style={{
                background:
                  "#05070a radial-gradient(ellipse 80% 50% at 20% -10%, color-mix(in oklab, var(--color-brand-deep-green) 55%, transparent), transparent), radial-gradient(ellipse 70% 50% at 100% 20%, color-mix(in oklab, var(--color-brand-deep-blue) 60%, transparent), transparent)",
              }}
            >
              <span className="font-mono text-xs text-zinc-400">
                body — living gradient
              </span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">Kontrast (WCAG AA)</h2>
          <p className="max-w-2xl text-sm text-zinc-400">
            brand-turquoise (#2DD4BF) na zinc-950 (#09090B):{" "}
            <strong className="text-zinc-50">~10,7 : 1</strong>. Na zinc-900
            (#18181B): <strong className="text-zinc-50">~9,5 : 1</strong>.
            Text-zinc-950 na bg-brand-turquoise (CTA tlačítka): stejný poměr
            ~10,7 : 1. Vše vysoko nad požadovaným AA prahem (4,5 : 1 pro
            běžný text, 3 : 1 pro velký text/UI prvky) i nad AAA (7 : 1).
          </p>
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
            <h3 className="text-lg font-medium text-brand-turquoise">
              V čem jsme jiní
            </h3>
            <p className="magic-gradient-text max-w-xl text-2xl font-semibold">
              Ukázka .magic-gradient-text (střídmě, max 1–2× na stránku)
            </p>
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
          <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-10 sm:p-14">
            <div className="magic-aurora pointer-events-none absolute -inset-20" aria-hidden />
            <div className="relative">
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-zinc-400">
                AvenIQ — AI automatizace
              </p>
              <h3 className="mb-4 max-w-xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                Chytrá automatizace. Lidský přístup.
              </h3>
              <p className="mb-8 max-w-lg text-zinc-400">
                Ukázka kontrastu textu a tlačítka na aktuálním tmavém pozadí,
                s ambientní `.magic-aurora` plochou za obsahem.
              </p>
              <button className="rounded-md bg-brand-turquoise px-6 py-3 font-semibold text-zinc-950 transition hover:brightness-110">
                Rezervovat konzultaci zdarma
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            Motion foundation — živé demo primitiv
          </h2>
          <p className="max-w-2xl text-sm text-zinc-400">
            Vše níže respektuje <code className="rounded bg-zinc-900 px-1.5 py-0.5">prefers-reduced-motion</code> —
            zkus si to ověřit přepnutím &quot;Emulate CSS media feature
            prefers-reduced-motion: reduce&quot; v DevTools a reloadem
            stránky.
          </p>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400">
            <strong className="text-zinc-50">Plynulý scroll (Lenis)</strong> je
            aktivní globálně přes <code className="rounded bg-zinc-950 px-1.5 py-0.5">SmoothScrollProvider</code> v{" "}
            <code className="rounded bg-zinc-950 px-1.5 py-0.5">app/layout.tsx</code> —
            scrolluj libovolnou stránku webu, ne jen tuhle, ať to poznáš.
          </div>

          <AnimatedSection className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <p className="font-mono text-sm font-semibold">AnimatedSection</p>
            <p className="mt-1 text-sm text-zinc-400">
              Scroll-reveal wrapper (fade + slide-up při vstupu do viewportu).
              Tenhle box se odhalí, jakmile na něj doscrolluješ.
            </p>
          </AnimatedSection>

          <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <p className="font-mono text-sm font-semibold">
              CTA hover (bez magnetického efektu)
            </p>
            <p className="text-sm text-zinc-400">
              Redesign 2026 odstranil kurzorem řízený &bdquo;magnetický&ldquo;
              pohyb tlačítek — CTA teď reaguje jen jemným
              opacity/scale hover stavem, nesleduje kurzor.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="rounded-full bg-brand-turquoise px-6 py-3 font-medium text-zinc-950 transition-opacity hover:opacity-90">
                Primární CTA
              </button>
              <Link
                href="/design-preview"
                className="rounded-full border border-brand-turquoise px-6 py-3 font-medium text-brand-turquoise transition-colors hover:bg-brand-turquoise/10"
              >
                Sekundární odkaz
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-sm font-semibold">GlowCard</p>
            <p className="mb-4 text-sm text-zinc-400">
              Zjednodušeno na čistou prezentační komponentu — žádný
              mouse-tracking spotlight, jen jemné zesvětlení borderu a lift
              na hover.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <GlowCard accent="turquoise" className="bg-zinc-900 p-6">
                <p className="text-sm font-medium text-zinc-50">
                  accent=&quot;turquoise&quot;
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Najeď myší — border zesvětlí a karta se jemně nadzvedne.
                </p>
              </GlowCard>
              <GlowCard accent="mint" className="bg-zinc-900 p-6">
                <p className="text-sm font-medium text-zinc-50">
                  accent=&quot;mint&quot;
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Stejný efekt, jemnější doplňkový akcent.
                </p>
              </GlowCard>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <p className="font-mono text-sm font-semibold">
              FlowDiagram (hero vizualizace)
            </p>
            <p className="mt-1 mb-4 text-sm text-zinc-400">
              Potvrzený scénář: faktura dorazí e-mailem → AI ji přečte a
              vytěží data → automaticky se zaúčtuje nebo eskaluje ke
              kontrole. Lazy-loaded (<code className="rounded bg-zinc-950 px-1.5 py-0.5">ssr: false</code>),
              animace se spustí po doscrollování do viewportu.
            </p>
            <FlowDiagramLazy />
          </div>
        </section>

        <footer className="border-t border-zinc-800 pt-8 text-sm text-zinc-400">
          <p>
            Tohle je jen ukázka tokenů a motion primitiv, ne finální layout.
            Tyrkysovo-mintová paleta R11 už{" "}
            <strong className="text-zinc-50">běží produkčně</strong> napříč
            webem (Navbar, Hero, homepage sekce). Historii rozhodnutí viz{" "}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5">
              claude.md
            </code>
            , sekce &bdquo;Redesign 2026&ldquo;.
          </p>
        </footer>
      </div>
    </div>
  );
}

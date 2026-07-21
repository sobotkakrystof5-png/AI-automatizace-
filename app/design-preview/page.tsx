import type { Metadata } from "next";
import AnimatedSection from "@/components/motion/AnimatedSection";
import MagneticButton from "@/components/motion/MagneticButton";
import GlowCard from "@/components/motion/GlowCard";
import FlowDiagramLazy from "@/components/motion/FlowDiagramLazy";

// Interní QA stránka — náhled navrhované tmavé palety (rozhodnuto
// 2026-07-17, nahrazuje starou navy/teal/cream/gold/navbar paletu) a od
// Checkpointu 1 (2026-07-18) i sandbox pro motion primitivy a návrh
// druhého akcentu, než se rozšíří na produkční stránky. Nepatří do
// produkční navigace webu.
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
            (žádné vlastní hex tokeny). Vlastní jsou jen dvě barvy — potvrzený
            akcent{" "}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm">
              brand-gold
            </code>{" "}
            pro CTA a klíčové akcenty, a navrhovaný druhý akcent{" "}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm">
              brand-electric
            </code>{" "}
            pro AI/interaktivní/technické prvky, čekající na potvrzení níže.
            Cíl: tmavý, elegantní &bdquo;tech / luxury&ldquo; dojem.
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
            Akcent 1 — brand-gold (potvrzeno, používá se produkčně)
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
          <h2 className="mb-6 text-xl font-semibold">
            Akcent 2 — brand-electric (návrh, čeká na potvrzení)
          </h2>
          <div className="overflow-hidden rounded-lg border border-zinc-800 sm:max-w-sm">
            <div className="flex h-24 items-end bg-brand-electric p-4 text-zinc-950">
              <span className="font-mono text-sm">#22D3EE</span>
            </div>
            <div className="bg-zinc-900 p-4">
              <p className="font-mono text-sm font-semibold">
                brand-electric
              </p>
              <p className="text-sm text-zinc-400">
                Výhradně AI/interaktivní/technické prvky — diagramy toku dat,
                aktivní/hover stavy, glow. Nikdy dekorativně/plošně, stejné
                pravidlo jako u brand-gold. Kontrast proti zinc-950 a
                komplementární vztah k teplé zlaté — viz demo primitiv níže.
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

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            Motion foundation (Checkpoint 1) — živé demo primitiv
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
            <p className="font-mono text-sm font-semibold">MagneticButton</p>
            <p className="text-sm text-zinc-400">
              Kurzor přitahuje tlačítko k sobě (myší, ne na dotykových
              zařízeních).
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <MagneticButton className="rounded-full bg-brand-gold px-6 py-3 font-medium text-zinc-950 transition-opacity hover:opacity-90">
                Zlatý akcent
              </MagneticButton>
              <MagneticButton className="rounded-full border border-brand-electric px-6 py-3 font-medium text-brand-electric transition-colors hover:bg-brand-electric/10">
                Elektrický akcent
              </MagneticButton>
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-sm font-semibold">GlowCard</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <GlowCard accent="gold" className="bg-zinc-900 p-6">
                <p className="text-sm font-medium text-zinc-50">
                  accent=&quot;gold&quot;
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Najeď myší — okrajová i kurzorem řízená záře v teplé zlaté.
                </p>
              </GlowCard>
              <GlowCard accent="electric" className="bg-zinc-900 p-6">
                <p className="text-sm font-medium text-zinc-50">
                  accent=&quot;electric&quot;
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Stejný efekt, studený akcent — pro AI/technické karty.
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
            Zinc/gold paleta už{" "}
            <strong className="text-zinc-50">běží produkčně</strong> napříč
            webem (Navbar, Hero, homepage sekce). Nové na této stránce —{" "}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5">
              brand-electric
            </code>{" "}
            a motion primitivy výše — čekají na tvoje schválení tady, než se
            rozšíří na produkční stránky (Checkpoint 2+).
          </p>
        </footer>
      </div>
    </div>
  );
}

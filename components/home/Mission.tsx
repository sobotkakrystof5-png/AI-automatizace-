import AnimatedSection from "@/components/motion/AnimatedSection";

// Sekce Poslání (repozice 2026-08-09, viz docs/plan-repozice-2026-08.md,
// sekce 5a). Musí být vizuálně oddělená od prodejního jazyka — proto se
// odlišuje tím, že PORUŠUJE vzorec zbytku stránky:
//
//  1. Žádná karta, žádné ohraničení, žádné CTA. Sekce s tlačítkem by
//     četla jako další prodejní blok, což je přesně to, čemu se plán
//     vyhýbá.
//  2. `bg-zinc-900` se tu záměrně NEPOUŽÍVÁ — podle DESIGN.md §5 je
//     vyhrazená pro "rozhodovací" sekce (ceník, kontakt), takže by sem
//     vnesla přesně ten prodejní tón, který sem nepatří.
//  3. Obrácená hierarchie: nadpis je malý mono eyebrow, největším prvkem
//     je samotná věta poslání. Všude jinde na webu platí nadpis > text.
//  4. Ambientní `.magic-aurora` na pozadí — třída už v globals.css
//     existuje, staví na vyhrazených `deep-green`/`deep-blue` tokenech a
//     má ošetřený `prefers-reduced-motion`. Do teď byla použitá jen
//     v interním /design-preview; tohle je její jediné produkční nasazení,
//     což jí drží význam.
//
// Mikrokopii "Automatizujeme rutinu. Vy se soustředíte na byznys." plán
// nabízí jako doplněk, ale záměrně tu není: nový hero claim zní
// "Automatizujeme rutinu. Vy se věnujte byznysu." a dvě skoro totožné
// věty na jedné stránce by působily jako chyba, ne jako refrén.
export default function Mission() {
  return (
    <section id="poslani" className="relative overflow-hidden">
      <div
        className="magic-aurora pointer-events-none absolute -inset-32"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-6 py-24 sm:px-8 sm:py-32">
        <AnimatedSection>
          <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Naše poslání
          </h2>
          <p className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-4xl">
            Pomáháme firmám soustředit se na to, co má pro jejich byznys
            skutečně smysl — odebíráme jim rutinní procesy, které za ně
            zvládne automatizace.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

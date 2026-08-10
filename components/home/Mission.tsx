import AnimatedSection from "@/components/motion/AnimatedSection";

// Sekce Poslání (repozice 2026-08-09, viz docs/plan-repozice-2026-08.md,
// sekce 5a; redesign 2026-08-10 na žádost uživatele). Dřív sekce záměrně
// PORUŠOVALA vzorec zbytku stránky (obrácená hierarchie, žádný nadpis
// v obvyklé váze, ambientní `.magic-aurora` pozadí) — uživatel tohle
// zrušil: pozadí označil za rušivé a chtěl sekci sjednotit s designem
// zbytku webu, ne ji od něj odlišovat. Dvě zásady tedy dál platí beze
// změny (od 2026-08-09): žádná karta, žádné ohraničení, žádné CTA —
// sekce s tlačítkem by četla jako další prodejní blok — a `bg-zinc-900`
// se nepoužívá, protože je podle DESIGN.md §5 vyhrazená pro
// "rozhodovací" sekce (ceník, kontakt).
//
// Nově: standardní nadpis (stejná váha jako `About.tsx` „O mně") a
// `py-16 sm:py-24` — DESIGN.md §5 tier "Standard", ne "Zlom" jako dřív;
// sekce nese jedno sdělení, ne velké entrée jako Hero. Pozadí je jen
// globální gradient stránky z `body` (`app/globals.css`), žádný vlastní
// efekt. `.magic-gradient-text` na samotné větě poslání je jediné
// produkční nasazení tohoto stylu (jinak jen /design-preview) — drží
// větu vizuálně výraznou i bez vlastního pozadí; je to sankcionovaný
// nástroj systému pro `brand-mint` (DESIGN.md §2), ne nový jednorázový
// vzor.
//
// Mikrokopii "Automatizujeme rutinu. Vy se soustředíte na byznys." plán
// nabízí jako doplněk, ale záměrně tu není: hero claim zní "Vy řešíte
// byznys. Rutinu automatizujeme my." (znění 2026-08-10) a dvě skoro
// totožné věty na jedné stránce by působily jako chyba, ne jako refrén.
export default function Mission() {
  return (
    <section id="poslani">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Naše motto
          </h2>
          <p className="magic-gradient-text mt-6 text-xl font-semibold leading-snug sm:text-2xl">
            Pomáháme firmám soustředit se na to, co má pro jejich byznys
            skutečně smysl — odebíráme jim rutinní procesy, které za ně
            zvládne automatizace.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

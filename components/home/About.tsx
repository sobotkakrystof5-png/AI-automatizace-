import Link from "next/link";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";

// Redesign 2026-07-22 — nahrazuje dřívější <details> accordion (Celý
// příběh, filozofie) plným, viditelným textem: babička test 2.0 zakazuje
// vícevětý odstavec skrytý za rozklikávacím detailem na homepage (viz
// claude.md, "Jazykový standard"). Blok "Co když budete nemocný/na
// dovolené" mazán úplně — reálně už neplatí (žádný externí n8n
// specialista není součástí aktuální nabídky) a nikdo ho výslovně
// nepotvrdil pro nové znění.
// Repozice 2026-08-09 — hlas sjednocen do první osoby jednotného čísla.
// „O nás"/„navazujeme" bylo v rozporu s tím, že ALTENO je jednočlenný
// projekt, i s hranicí „já"/„my" v claude.md: tohle je osobní sekce, ne
// značkové sdělení. Délka textu se ZÁMĚRNĚ nezkracuje — výjimka z
// babička testu 2.0 pro tuhle sekci platí dál (potvrzeno 2026-08-05
// i 2026-08-09), protože příběh Vizeon → ZakazIQ → ALTENO nese
// důvěryhodnost a jedna věta by ji vyprázdnila.
//
// Fáze 5 (2026-08-09): odkaz „Celý příběh →" doplněn — /o-mne existuje.
// Sekce tady zůstává ZKRÁCENÁ schválně: plný příběh (Vizeon, kurzy,
// technický popis ZakazIQ) patří na podstránku, ne do hlavního scrollu.
const values = [
  {
    title: "Transparentnost",
    body: "Víte předem, co dostanete, za kolik, a co se stane, když se něco pokazí.",
  },
  {
    title: "Flexibilita",
    body: "Řešení se přizpůsobuje vaší firmě a jejímu provozu, ne naopak.",
  },
  {
    title: "Individuální přístup",
    body: "Každá automatizace vzniká na míru — žádné univerzální šablony.",
  },
  {
    title: "Maximální spokojenost",
    body: "Pokračuju, dokud automatizace nesedí přesně tak, jak potřebujete.",
  },
];

export default function About() {
  return (
    <section id="o-nas">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            O mně
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="mt-10 space-y-3 text-zinc-400">
            <p>
              Dva roky jsem stál za projektem Vizeon — tvorbou webů na míru
              pro živnostníky a malé firmy. V desítkách rozhovorů s majiteli
              firem vyšlo najevo skoro pokaždé to samé: netrápil je vzhled
              webu, ale hodiny ztracené ručním papírováním a excelovými
              tabulkami.
            </p>
            <p>
              V rámci Vizeonu jsem si postavil vlastní systém ZakazIQ —
              automaticky řeší komunikaci s klienty, rezervace i připomínky.
              Fungoval tak dobře, že mělo smysl postavit na něm celou firmu.
            </p>
            <p>
              Tak vznikl ALTENO — navazuju na dva roky zkušeností s reálnými
              klienty a přesouvám se z tvorby webů do AI automatizace celých
              firemních procesů.
            </p>
            <p>
              Na ALTENO zatím pracuju sám. Je to záměr, ne provizorium —
              vaši zakázku nikdo nepředá dál.
            </p>
            <p>
              <Link
                href="/o-mne"
                className="font-medium text-zinc-50 underline hover:text-brand-turquoise"
              >
                Celý příběh →
              </Link>
            </p>
          </div>
        </AnimatedSection>

        {/* Citace přesunuta sem z TrustStrip.tsx (2026-08-10, na žádost
            uživatele) — claude.md měl výslovné pravidlo "patří výhradně
            do pruhu Důvěra", takže šlo o vědomé přepsání, ne přidání
            duplicity; TrustStrip o citaci přišel ve stejné úpravě. */}
        <AnimatedSection delay={0.08}>
          <figure className="mt-10 max-w-3xl border-t border-zinc-800 pt-8">
            <blockquote className="text-xl font-medium text-zinc-50 sm:text-2xl">
              „Nejsem agentura, která slibuje automatizaci pro každého. Jsem
              člověk, který zautomatizoval vlastní byznys — a přesně vím, jak
              na to i u vás.“
            </blockquote>
            <figcaption className="mt-4 text-sm text-zinc-400">
              <cite className="not-italic">Kryštof Sobotka</cite> — zakladatel
              ALTENO
            </figcaption>
          </figure>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-zinc-50">Moje hodnoty</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, i) => (
                <AnimatedSection key={value.title} delay={0.1 + i * 0.06}>
                  <GlowCard accent="turquoise" className="h-full p-5">
                    <p className="font-semibold text-zinc-50">{value.title}</p>
                    <p className="mt-2 text-sm text-zinc-400">{value.body}</p>
                  </GlowCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

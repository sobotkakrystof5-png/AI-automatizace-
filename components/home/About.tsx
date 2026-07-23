import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";

// Redesign 2026-07-22 — nahrazuje dřívější <details> accordion (Celý
// příběh, filozofie) plným, viditelným textem: babička test 2.0 zakazuje
// vícevětý odstavec skrytý za rozklikávacím detailem na homepage (viz
// claude.md, "Jazykový standard"). Blok "Co když budete nemocný/na
// dovolené" mazán úplně — reálně už neplatí (žádný externí n8n
// specialista není součástí aktuální nabídky) a nikdo ho výslovně
// nepotvrdil pro nové znění.
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
    body: "Pokračujeme, dokud automatizace nesedí přesně tak, jak potřebujete.",
  },
];

export default function About() {
  return (
    <section id="o-nas">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            O nás
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="mt-10 space-y-3 text-zinc-400">
            <p>
              Dva roky jsme stáli za projektem Vizeon — tvorbou webů na míru
              pro živnostníky a malé firmy. V desítkách rozhovorů s majiteli
              firem vyšlo najevo skoro pokaždé to samé: netrápil je vzhled
              webu, ale hodiny ztracené ručním papírováním a excelovými
              tabulkami.
            </p>
            <p>
              V rámci Vizeonu jsme si postavili vlastní systém ZakazIQ —
              automaticky řeší komunikaci s klienty, rezervace i připomínky.
              Fungoval tak dobře, že mělo smysl postavit na něm celou firmu.
            </p>
            <p>
              Tak vznikl AvenIQ — navazujeme na dva roky zkušeností s reálnými
              klienty a přesouváme se z tvorby webů do AI automatizace celých
              firemních procesů.
            </p>
            <p>
              Zatím na projektu pracuje jen Kryštof Sobotka — přímo s vámi,
              odpovídá do 24 hodin.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-zinc-50">Naše hodnoty</h3>
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

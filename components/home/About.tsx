import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";

const philosophyPoints = [
  {
    title: "Nejdřív pochopit, pak automatizovat.",
    body: "Žádné řešení nenabízíme dřív, než rozumíme vašemu skutečnému problému.",
  },
  {
    title: "Transparentnost především.",
    body: "Víte předem, co dostanete, za kolik, a co se stane, když se něco pokazí.",
  },
  {
    title: "Data zůstávají vaše.",
    body: "Preferujeme řešení, kde vaše firemní data neputují nikam, kam nechcete — v souladu s GDPR a evropskými standardy.",
  },
];

export default function About() {
  return (
    <section id="o-nas">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            O nás
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-zinc-50">Náš příběh</h3>
            <p className="mt-3 text-zinc-400">
              Než vznikl AvenIQ, stál jsem dva roky za projektem{" "}
              <strong className="font-semibold text-zinc-50">Vizeon</strong>{" "}
              — tvorbou webů na míru pro živnostníky a malé firmy. V
              desítkách rozhovorů s majiteli firem vyšlo najevo skoro
              pokaždé to samé: netrápil je vzhled webu, ale hodiny ztracené
              ručním papírováním, přepisováním objednávek a excelovými
              tabulkami.
            </p>
            <p className="mt-4 text-zinc-400">
              V rámci Vizeonu jsem si postavil vlastní systém{" "}
              <strong className="font-semibold text-zinc-50">ZakazIQ</strong>{" "}
              — automaticky řeší komunikaci s klienty, rezervace i
              připomínky. Fungoval tak dobře, že mi došlo: tohle není jen
              pomůcka pro webařství, tohle je byznys sám o sobě.
            </p>
            <p className="mt-4 text-zinc-400">
              Tak vznikl AvenIQ — navazuji na dva roky zkušeností s reálnými
              klienty a přesouvám se z tvorby webů do AI automatizace celých
              firemních procesů. Stejný přístup, širší záběr.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-zinc-50">
              Naše filozofie
            </h3>
            <p className="mt-3 text-zinc-400">
              {
                'Automatizace by neměla být samoúčelná. Nejde o to nacpat AI a "chytré" nástroje všude, kde to jde — jde o to najít místa, kde vám kradou čas nudné, opakující se úkoly, a tam je nahradit systémem, který funguje spolehlivě, transparentně a bez neustálého dohledu.'
              }
            </p>
            <p className="mt-3 italic text-zinc-500">
              Automatizujeme to, co vás brzdí — ne to, co je trendy.
            </p>

            <p className="mt-4 text-zinc-400">Držíme se tří zásad:</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {philosophyPoints.map((point, i) => (
                <AnimatedSection key={point.title} delay={0.1 + i * 0.06}>
                  <GlowCard accent="electric" className="h-full p-5">
                    <p className="font-semibold text-zinc-50">
                      {point.title}
                    </p>
                    <p className="mt-2 text-sm text-zinc-400">{point.body}</p>
                  </GlowCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-zinc-50">
              Kdo za tím stojí
            </h3>
            <p className="mt-3 text-zinc-400">
              AvenIQ zakládám jako firmu na AI automatizaci — dnes jako
              jednočlenný projekt s jasnou ambicí v příštích letech vybudovat
              tým. Za sebou mám dva roky přímé práce s klienty přes Vizeon a
              průběžně se vzdělávám v pokročilé AI automatizaci (n8n a
              související nástroje), abych nabízel řešení, která fungují —
              ne technologickou módu.
            </p>
            <p className="mt-4 text-zinc-400">
              S klienty komunikuji přímo já, bez přehazování mezi account
              managery. Odpovídám do 24 hodin — každý den.
            </p>
            <p className="mt-4 text-zinc-400">
              Aktuálně jsem na projektu sám — a chci být k tomu upřímný.
              Neznamená to ale, že jste odkázaní na jednoho člověka bez
              zálohy: každou automatizaci dokumentuji tak, aby ji v nutném
              případě (dovolená, nemoc) převzal i externí n8n specialista, se
              kterým spolupracuji. I dnes tak máte jistotu, že automatizace
              nezůstane bez podpory.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <GlowCard accent="gold" className="mt-10 p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-zinc-50">
              Kryštof Sobotka — CEO a zakladatel
            </h3>
            <p className="mt-3 text-zinc-400">
              Moje cesta začala u webových stránek. Přes projekt Vizeon jsem
              si vybudoval zavedenou značku ve tvorbě webů pro živnostníky a
              malé firmy — a po cestě postavil vlastní nástroj ZakazIQ, který
              mi automatizoval komunikaci s klienty i rezervace.
            </p>
            <p className="mt-4 text-zinc-400">
              Tahle zkušenost mě přesvědčila, že hodnota není ve webu
              samotném, ale v tom, kolik času automatizace firmě reálně
              vrátí. AvenIQ je přirozeným pokračováním téhle cesty — stejný
              přístup, širší záběr.
            </p>
          </GlowCard>
        </AnimatedSection>
      </div>
    </section>
  );
}

import { services } from "@/lib/services";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";

// Sekce Služby (repozice 2026-08-09, viz docs/plan-repozice-2026-08.md,
// sekce 6). Číslovaná karta je převzatá z bývalé sekce Ceník, která byla
// ve Fázi 2c smazaná. Vizuál byl schválený a nemá důvod zaniknout jen
// proto, že zmizely ceny. Oproti originálu vypadl řádek s částkou a ten
// se sem NIKDY nesmí vrátit, stejně jako tlačítko vedoucí na ceník.
//
// Cíl CTA je konstanta, ne pole v datech (lib/services.ts). Kdyby byl
// per-service, dal by se jím obejít zákaz odkazu na ceník.
const CTA_HREF = "/#kontakt";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Services() {
  return (
    <section id="sluzby">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-24">
        <AnimatedSection>
          {/* Nadpis změněn 2026-08-10 na výslovné zadání uživatele z „Co pro
              vás udělám". Známý a vědomě přijatý důsledek: sekce
              AutomationAreas přímo nad touto má nadpis „Co vše jde
              automatizovat" a větu „Nejčastěji řešíme". Obsahový překryv
              byl uživateli předložen a rozhodl ho neřešit teď. Je to
              otevřený bod, ne přehlédnutí. */}
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Příklady nejoblíbenějších automatizací
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            Vyberte, co vás zdržuje nejvíc. Zbytek probereme na konzultaci.
          </p>
        </AnimatedSection>

        {/* Šest karet ve 3sloupcovém gridu (2026-08-10): pět konkrétních
            služeb z lib/services.ts + šestá karta „na míru" doplněná níže
            v gridu. Do dat nepatří. Není to další položka katalogu, ale
            výslovné popření katalogu, a má i jiný vizuál. Tím se zároveň
            dorovnal dřív nevyrovnaný poslední řádek (5 karet = 2+2+1). */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {services.map((service, i) => (
            <AnimatedSection key={service.slug} delay={Math.min(i * 0.08, 0.32)}>
              {/* Klikatelná je celá karta, ne odkaz uvnitř. Víc odkazů se
                  stejným popiskem „Probrat na konzultaci" pod sebou by
                  bylo pro čtečku obrazovky nepoužitelné. Titulek služby je
                  součástí odkazu, takže nese přístupný název. */}
              <GlowCard
                accent="turquoise"
                href={CTA_HREF}
                className="flex h-full flex-col bg-zinc-950 p-6"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold text-zinc-50">
                    {service.title}
                  </h3>
                  <span aria-hidden className="font-mono text-xs text-zinc-600">
                    {pad(i + 1)}
                  </span>
                </div>
                <p className="mt-4 border-t border-zinc-800 pt-4 text-sm text-zinc-400">
                  {service.summary}
                </p>
                <span
                  aria-hidden
                  className="mt-6 text-sm font-medium text-brand-turquoise"
                >
                  Probrat na konzultaci →
                </span>
              </GlowCard>
            </AnimatedSection>
          ))}

          {/* Šestá karta (2026-08-10, výslovné zadání uživatele): nahrazuje
              samostatný uzavírací blok pod gridem, který nesl doslova stejné
              sdělení („automatizace se staví na míru, ne z katalogu") ve
              stejném tyrkysovém rámečku. Dvakrát po sobě by to působilo jako
              chyba, ne jako důraz. Uvnitř gridu sdělení navíc funguje líp: čte
              se jako poslední z možností, ne jako poznámka pod čarou.

              Rámeček je viditelný i bez hoveru (accent turquoise-strong,
              odstíny shodné s TrustStrip.tsx), aby karta z pětice vystupovala
              jako jiný typ nabídky. Zbytek struktury (číslo, dělicí linka,
              CTA řádek, cíl odkazu) je shodný s ostatními kartami, takže se
              liší barvou, ne tvarem. */}
          <AnimatedSection delay={0.4}>
            <GlowCard
              accent="turquoise-strong"
              href={CTA_HREF}
              className="flex h-full flex-col p-6"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-zinc-50">
                  Automatizace na míru
                </h3>
                <span aria-hidden className="font-mono text-xs text-brand-turquoise/60">
                  {pad(services.length + 1)}
                </span>
              </div>
              <p className="mt-4 border-t border-brand-turquoise/20 pt-4 text-sm text-zinc-400">
                Nevidíte tu svůj případ? Stavím automatizace přímo na míru
                podle vašeho zadání.
              </p>
              <span
                aria-hidden
                className="mt-6 text-sm font-medium text-brand-turquoise"
              >
                Probrat na konzultaci →
              </span>
            </GlowCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

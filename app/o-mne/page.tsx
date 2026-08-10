import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/page-metadata";

// Podstránka /o-mne (Fáze 5 repozice, viz docs/plan-repozice-2026-08.md,
// sekce 4 a 11). Nese plný příběh, který se na homepage do sekce „O mně"
// nevejde — ta zůstává zkrácená a odkazuje sem.
//
// PRAVIDLA, KTERÁ TU PLATÍ PŘÍSNĚJI NEŽ JINDE:
//
//  1. Celá stránka je v první osobě jednotného čísla. Značkové „my" sem
//     nepatří ani u nabídky — tohle je osobní sekce podle claude.md,
//     „Hranice já/my".
//  2. Delší odstavce jsou tu VÝSLOVNĚ v pořádku (výjimka z babička testu
//     2.0 pro detailní podstránku), ale nadpisy drží 3–6 slov.
//  3. Každé faktické tvrzení musí být dohledatelné: `About.tsx` na
//     homepage (dva roky Vizeonu, desítky rozhovorů, vznik ZakazIQ,
//     jednočlenný tým), plán repozice (kurzy a měsíce praxe, Vizeon jako
//     jednočlenný provoz) nebo dnes ověřený screenshot ZakazIQ
//     (`public/zakaziq-ukazka.png` — stav zakázky, postup v procentech,
//     hodnocení 1–10, rezervace konzultace). Nic nad tento rámec se
//     nedoplňuje odhadem, ani kdyby to znělo líp: čísla o obratu, počtu
//     klientů, názvy kurzů ani délka praxe potvrzené nejsou.
//  4. Žádná cena, v žádné podobě.
export const metadata = pageMetadata({
  path: "/o-mne",
  title: "O mně | AvenIQ",
  description:
    "Od tvorby webů ve Vizeonu k automatizaci firemních procesů. Proč AvenIQ vznikl a jak funguje ZakazIQ — systém, který jsem si postavil pro vlastní provoz.",
});

export default function AboutPage() {
  return (
    <section>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Domů", path: "/" },
          { name: "O mně", path: "/o-mne" },
        ])}
      />
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
        <Link
          href="/#o-nas"
          className="text-sm font-medium text-zinc-50 underline hover:text-brand-turquoise"
        >
          ← Zpět na hlavní stránku
        </Link>

        <AnimatedSection>
          {/* Fotka stojí vedle nadpisu, ne nad textem přes celou šířku:
              v tomhle formátu nese roli „tady je ten člověk" a nesnaží se
              být vizuálem sekce. Kruhový ořez drží pozornost na obličeji
              a odstraní neutrální okolí kavárny, které by na celé fotce
              přebíralo plochu.

              `object-cover` s `object-top`: originál je na výšku 1200×1600
              a hlava je v horní části snímku — výchozí středový ořez by
              z ní ubral. */}
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <Image
              src="/krystof-sobotka.jpeg"
              alt="Kryštof Sobotka, zakladatel AvenIQ"
              width={1200}
              height={1600}
              sizes="128px"
              priority
              className="h-28 w-28 shrink-0 rounded-full border border-zinc-800 object-cover object-top sm:h-32 sm:w-32"
            />
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                O mně
              </h1>
              <p className="mt-3 text-xl text-zinc-400">
                Jmenuju se Kryštof Sobotka. Tohle je celý příběh — ne ta
                zkrácená verze z úvodní stránky.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <h2 className="mt-14 text-2xl font-semibold text-zinc-50">
            Začalo to weby
          </h2>
          <div className="mt-4 space-y-4 text-zinc-400">
            <p>
              Dva roky jsem stál za projektem Vizeon — tvorbou webů na míru
              pro živnostníky a malé firmy. Dělal jsem na nich sám, od
              prvního rozhovoru o tom, co firma vlastně potřebuje, až po
              spuštění a dolaďování provozu.
            </p>
            <p>
              Byla to nejlepší možná škola. Ne kvůli webům samotným, ale
              kvůli tomu, že jsem se dostal desítkám majitelů firem do
              provozu a viděl zblízka, jak jim doopravdy ubíhá den.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <h2 className="mt-14 text-2xl font-semibold text-zinc-50">
            Co jsem slyšel pořád dokola
          </h2>
          <div className="mt-4 space-y-4 text-zinc-400">
            <p>
              V desítkách rozhovorů vyšlo najevo skoro pokaždé to samé:
              netrápil je vzhled webu, ale hodiny ztracené ručním
              papírováním a excelovými tabulkami.
            </p>
            <p>
              Nový web jim přinesl pozornost, ale nevrátil čas. Ten se
              ztrácel úplně jinde — v přepisování stejných údajů z jednoho
              místa na druhé, v dohledávání informací v e-mailech a
              v připomínání termínů, na které si musel někdo vzpomenout.
            </p>
            <p>
              Postupně mi došlo, že tohle je práce, kterou nikdo nechce
              dělat a nikdo ji ani dělat nemusí.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <h2 className="mt-14 text-2xl font-semibold text-zinc-50">
            Od webů k automatizaci
          </h2>
          <div className="mt-4 space-y-4 text-zinc-400">
            <p>
              Přestal jsem řešit, jak firmě postavit další web, a začal
              řešit, co jí ujídá čas. Prošel jsem kurzy zaměřené na AI
              automatizaci a měsíce praxe — ne teorií, ale stavěním věcí,
              které musí běžet samy, i když se na ně zrovna nikdo nedívá.
            </p>
            <p>
              Cvičný případ jsem měl přímo po ruce. Vlastní firmu.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <h2 className="mt-14 text-2xl font-semibold text-zinc-50">
            Systém, který jsem si postavil
          </h2>
          <div className="mt-4 space-y-4 text-zinc-400">
            <p>
              V rámci Vizeonu vznikl ZakazIQ — vlastní systém, který za mě
              automaticky řeší komunikaci s klienty, rezervace i
              připomínky. Nestavěl jsem ho jako produkt na prodej, ale
              proto, že jsem tu práci nechtěl dělat ručně.
            </p>
            <p>
              Technicky stojí na třech vrstvách. Navrchu je to, co vidí
              klient: karta jeho zakázky se zadáním, stavem, postupem prací
              v procentech a datem poslední aktualizace. Pod ní běží
              automatizace v n8n, která reaguje na to, co klient udělá. A
              úplně vespod databáze, kde zůstává historie — zakázky,
              termíny, hodnocení.
            </p>
            <p>
              V praxi to vypadá takhle: klient si vybere termín, rezervace
              se zapíše, odejde potvrzení a před schůzkou ještě připomínka
              SMS i e-mailem. Já u toho nejsem. Zpětnou vazbu si systém
              vybere taky sám — klient dá známku od 1 do 10 a může připsat,
              co chce udělat jinak.
            </p>
            <p>
              Fungovalo to tak dobře, že mělo smysl postavit na tom celou
              firmu.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <h2 className="mt-14 text-2xl font-semibold text-zinc-50">
            Co dělám dnes
          </h2>
          <div className="mt-4 space-y-4 text-zinc-400">
            <p>
              Tak vznikl AvenIQ. Navazuju na dva roky zkušeností s reálnými
              klienty a přesouvám se z tvorby webů do automatizace celých
              firemních procesů — pro menší a středně velké firmy.
            </p>
            <p>
              Pracuju na tom zatím sám. Je to záměr, ne provizorium:
              komunikujete přímo se mnou, vaši zakázku nikdo nepředá dál a
              nikdo si ji cestou nevyloží po svém.
            </p>
            <p>
              Vizeon i ZakazIQ jsou moje vlastní projekty, ne klientské
              reference — a schválně to říkám nahlas. Je to zatím jediná
              automatizace, kterou vám můžu ukázat celou, od zadání až po
              odeslanou připomínku. Radši ukážu vlastní systém, který si
              můžete projít, než cizí loga bez příběhu.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <GlowCard accent="turquoise" className="mt-14 p-6 sm:p-8">
            <p className="text-lg font-semibold text-zinc-50">
              Chcete vědět, co by šlo automatizovat u vás?
            </p>
            <p className="mt-2 text-zinc-400">
              Projdeme váš provoz na nezávazné konzultaci a řeknu vám na
              rovinu, jestli se automatizace vyplatí.
            </p>
            <Link
              href="/#kontakt"
              className="mt-6 inline-flex rounded-full bg-brand-turquoise px-6 py-3 text-base font-medium text-zinc-950 transition-opacity hover:opacity-90"
            >
              Konzultace zdarma
            </Link>
          </GlowCard>
        </AnimatedSection>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/motion/AnimatedSection";
import LiveSystemFlow from "@/components/motion/LiveSystemFlow";

// Sekce ZakazIQ (Fáze 4 repozice, viz docs/plan-repozice-2026-08.md,
// sekce 7). Je to nejsilnější důkazní prvek webu: jediná automatizace,
// kterou může návštěvník posoudit ještě předtím, než se ozve.
//
// ŽÁDNÉ `bg-zinc-900`. Dva důvody, oba závazné:
//  1. DESIGN.md §5 vyhrazuje zinc-900 pro rozhodovací sekce. Tahle
//     dokazuje, neprodává — CTA na konci je odkaz, ne blok.
//  2. Sekce nad ní (ProcessSteps) zinc-900 má. Kdyby ji měla i tahle,
//     slily by se do jednoho dlouhého pásu a předěl by zmizel.
//
// Obsah není nové obchodní tvrzení. Trojici vlastností a cíl CTA potvrdil
// uživatel 2026-08-09; popisky pod nimi jsou psané k AvenIQ, ne převzaté
// z vizeon.cz doslova — stejný text na dvou vlastních doménách by si
// konkuroval ve vyhledávání. Tok „jak to funguje" nese LiveSystemFlow,
// který byl přesně pro tuhle sekci rezervovaný.
//
// Popisky jsou od 2026-08-09 ověřené proti reálnému screenshotu
// (`public/zakaziq-ukazka.png`), ne odvozené — každý pojmenovává prvek,
// který je na obrazovce vidět. Kdo je bude měnit, ať se na obrázek
// podívá: text a důkaz si nesmí odporovat, i když teď (viz níže) stojí
// nad sebou, ne vedle sebe jako dřív.
//
// „Přehled" původně (téhož dne, před dodáním screenshotu) zněl
// „Rezervace i termíny pohromadě". Obrázek ukázal, že karta sleduje
// postup zakázky v procentech a datum aktualizace, ne kalendář — popisek
// se opravil podle důkazu. Je to varování do budoucna: odvození
// z okolního copy nestačí tam, kde vedle stojí screenshot.
//
// Layout (2026-08-10): přestavěno podle hierarchie na vizeon.cz — ten
// samý produkt tam má vlastní sekci se třemi očíslovanými vlastnostmi
// v řadě NAD screenshotem, místo dřívějších dvou sloupců vedle sebe.
// Nejdřív se přečtou tři tvrzení, pak přijde důkaz. Očíslované odznaky
// přebírají vizuální slovník `ProcessSteps.tsx` (kruh, `font-mono`,
// `pad()`), ne nový vzor — ten na webu už existuje a trojice tady není
// sekvenční proces, proto bez spojnice a bez zvýraznění aktivního
// kroku. CTA zůstává tyrkysové pilulkové tlačítko podle zbytku webu,
// ne vizeonův podtržený odkaz se šipkou — přebírání cizího stylu CTA
// by rozbilo konzistenci se zbytkem homepage.
//
// Doplněno (2026-08-10, druhá iterace): obrázek zmenšený a přesunutý
// doprava, vlevo k němu přibyl krátký odstavec vysvětlující, co
// ZakazIQ je a jak se do něj klient dostane — na výslovné přání
// uživatele, doplněk k trojici nahoře, ne náhrada (popisky pod
// jednotlivými vlastnostmi zůstávají). Věta záměrně jmenuje AvenIQ, ne
// VIZEON — potvrzeno uživatelem po dotazu, protože VIZEON není na
// tomhle webu nikde představený. Text je zkrácený na dvě krátké věty
// místo jednoho delšího souvětí z uživatelova podkladu („inspiruj se“,
// ne doslovné znění) kvůli pravidlu o víceřetých odstavcích v hlavním
// scrollu homepage (viz „Jazykový standard“ v claude.md). Věta „přes
// AvenIQ se automaticky dostanete do systému“ je v mírném napětí s CTA
// níže („Stejný princip umím postavit i pro vaši firmu“, které dřív
// naznačovalo, že klienti AvenIQ dostanou obdobu, ne přímo ZakazIQ) —
// otevřený bod ke zvážení, ne oprava provedená mnou.
const vlastnosti = [
  {
    nazev: "Přímá komunikace",
    popis: "Zadání i konzultaci řeší klient přímo se mnou.",
  },
  {
    nazev: "Zpětná vazba",
    popis: "Klient ohodnotí práci a připíše, co chce jinak.",
  },
  {
    nazev: "Přehled",
    popis: "Stav zakázky a postup prací vidí kdykoli.",
  },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function ZakazIq() {
  return (
    <section id="zakaziq">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
        <AnimatedSection>
          {/* Štítek řeší riziko, kvůli kterému plán tuhle sekci vůbec
              hlídá: ZakazIQ nesmí číst jako klientská reference. Nese to
              popisek, ne jen barva — proto text, ne pouhá tečka. */}
          <p className="font-mono text-xs uppercase tracking-widest text-brand-turquoise">
            Vlastní projekt
          </p>
          {/* Nadpis nese přímo logo produktu, ne vysázený text. Wordmark
              „ZakazIQ" je součástí obrázku, takže psaný nadpis vedle něj
              by tu stejnou věc řekl dvakrát. Přístupný název drží `alt` —
              pro odečítač je to pořád normální nadpis druhé úrovně.
              Podklad loga je téměř černý; `mix-blend-screen` ho na tmavém
              pozadí sekce potlačí, aby kolem nevznikl viditelný obdélník. */}
          <h2 className="mt-4">
            <Image
              src="/zakaziq-logo.png"
              alt="ZakazIQ"
              width={742}
              height={438}
              sizes="176px"
              className="h-20 w-auto mix-blend-screen sm:h-24"
            />
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Automatizace, kterou jsem postavil pro sebe — a teď běží 24/7.
          </p>
        </AnimatedSection>

        {/* Tři vlastnosti v řadě, ne ve sloupci — čtou se jako rychlý
            přehled ještě předtím, než přijde na řadu obrázek. Odznaky jsou
            `aria-hidden`: pořadí je vizuální, ne informace navíc k
            nadpisu, stejně jako u `ProcessSteps.tsx`. */}
        <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {vlastnosti.map((vlastnost, i) => (
            <li key={vlastnost.nazev}>
              <AnimatedSection delay={i * 0.08}>
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 font-mono text-sm font-semibold text-zinc-400"
                >
                  {pad(i + 1)}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-zinc-50">
                  {vlastnost.nazev}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  {vlastnost.popis}
                </p>
              </AnimatedSection>
            </li>
          ))}
        </ol>

        {/* Text vlevo, zmenšený screenshot vpravo (2026-08-10, na
            výslovné přání uživatele — viz komentář nahoře). Krátký
            text a menší obrázek mají podobnou výšku, proto
            `items-center`: u předchozí verze (delší seznam vs. vysoký
            portrétový screenshot) by `items-start` nechalo pod textem
            velkou prázdnou plochu. */}
        <AnimatedSection delay={0.24}>
          <div className="mt-14 grid grid-cols-1 items-center gap-8 sm:grid-cols-2 sm:gap-10">
            <div>
              <p className="text-zinc-400">
                ZakazIQ je komunikační a rezervační systém, který
                přiřazuji každému klientovi.
              </p>
              <p className="mt-2 text-zinc-400">
                Do systému se dostanete hned po objednání konzultace
                přes AvenIQ.
              </p>
            </div>

            {/* Screenshot je jediný tvrdý důkaz na celé stránce — proto
                i zmenšený zůstává vlastní figurou s popiskem, ne
                dekorací. Světlé UI na tmavé stránce svítí samo o sobě,
                žádné zvýraznění navíc nepotřebuje.

                `alt` popisuje, co je na obrazovce vidět, ne že jde
                o screenshot — odečítač jinak dostane informaci, která
                mu k ničemu není. Obrázek je hluboko pod ohybem
                stránky, takže zůstává líné načítání (výchozí u
                next/image): priority by zbytečně soutěžila s LCP
                v hero.

                V ukázce figuruje jméno majitele, ne reálného klienta.
                Kdyby se obrázek někdy vyměňoval, tohle musí platit
                dál — screenshot s cizími osobními údaji na web
                nepatří. */}
            <figure className="m-0 ml-auto w-full max-w-[240px] sm:max-w-[280px]">
              {/* Bez vlastního rámečku a zaoblení: obrázek si zaoblené
                  rohy nese sám a v jejich výřezu má tmavou výplň
                  (9,11,15) — prakticky totožnou s pozadím stránky.
                  Rámeček navíc by kolem karty nakreslil druhý obrys
                  a v rozích nechal tmavé srpky. Ověřeno měřením
                  pixelů, ne odhadem. */}
              <Image
                src="/zakaziq-ukazka.png"
                alt="Karta projektu v ZakazIQ: jméno zadavatele, jeho zadání, stav „Nová“, ukazatel postupu prací, hodnocení na škále 1–10 a pole pro zpětnou vazbu."
                width={902}
                height={1276}
                sizes="(min-width: 640px) 280px, 240px"
                className="h-auto w-full"
              />
              <figcaption className="mt-4 text-sm text-zinc-400">
                Prostředí, které vidí klient. Obsluhuje ho systém, ne já.
              </figcaption>
            </figure>
          </div>
        </AnimatedSection>

        <div className="mt-16">
          <AnimatedSection>
            <h3 className="text-xl font-semibold text-zinc-50">
              Jak to funguje
            </h3>
            <p className="mt-2 text-zinc-400">
              Od výběru termínu po připomínku nesáhnu na nic.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="mt-8">
              <LiveSystemFlow />
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.2}>
          {/* CTA vede jen na konzultaci — ZakazIQ se neprodává ani
              nenabízí k vyzkoušení (rozhodnutí uživatele 2026-08-09,
              otevřená otázka ze sekce 12 plánu tím padá). Druhý odkaz
              „vyzkoušet" by dnes neměl kam vést, viz mrtvý
              ZAKAZIQ_BOOKING_URL. */}
          <div className="mt-12 border-t border-zinc-800 pt-8">
            <p className="text-zinc-400">
              Stejný princip umím postavit i pro vaši firmu.
            </p>
            <Link
              href="/#kontakt"
              className="mt-4 inline-flex rounded-full bg-brand-turquoise px-6 py-3 text-base font-medium text-zinc-950 transition-opacity hover:opacity-90"
            >
              Probrat na konzultaci
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

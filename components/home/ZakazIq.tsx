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
// uživatel 2026-08-09; popisky pod nimi jsou psané k ALTENO, ne převzaté
// z vizeon.cz doslova — stejný text na dvou vlastních doménách by si
// konkuroval ve vyhledávání. Tok „jak to funguje" nese LiveSystemFlow,
// který byl přesně pro tuhle sekci rezervovaný.
//
// Popisky jsou od 2026-08-09 ověřené proti reálnému screenshotu
// (`public/zakaziq-ukazka.png`), ne odvozené — každý pojmenovává prvek,
// který je na obrazovce vidět.
//
// Layout (2026-08-12, třetí iterace): uživatel poslal aktuální snímky
// zakaziq.cz (vertikální seznam vlastností s dělicími linkami vlevo,
// vysoký screenshot vpravo) a vyžádal si přestavbu podle nich — hlavní
// vada dřívější verze byla vizuální prázdnota: krátký dvouřádkový text
// vedle zmenšeného obrázku (max 280px) nechával v pravém sloupci velkou
// nevyužitou plochu a diagram „Jak to funguje" (LiveSystemFlow) byl
// omezený na `max-w-md` a na širokých obrazovkách se ztrácel uprostřed
// sekce s prázdnými okraji po stranách. Řešení: úvodní text a trojice
// vlastností se spojily do jednoho levého sloupce (dělicí linky, číslo ve
// stylu `Services.tsx` — `font-mono text-xs text-zinc-600`, žádný nový
// vizuální vzor), screenshot se zvětšil na šířku celého sloupce místo
// pevného stropu a LiveSystemFlow dostal vodorovnou variantu pro `sm+`
// (viz komentář v `LiveSystemFlow.tsx`), aby na desktopu využil celou
// šířku sekce místo úzkého vystředěného pruhu.
//
// Logo (2026-08-12): rastrový `/zakaziq-logo.png` (černé pozadí,
// wordmark vypálený v pixelech) nahrazen skutečným nadpisem — ikona
// kreslená přímo v JSX (čtyři bílé čtverečky ve 2×2 mřížce, stejná
// geometrie jako ikona „LayoutGrid" v produkčním ZakazIQ dashboardu,
// `components/HubSidebarNav.tsx` v repozitáři ZakazIQ) na tmavě modrém
// podkladu (`#2b57a8` → `#1b3868`, doslovné `brand-600`/`brand-800` z
// `tailwind.config.ts` toho repozitáře) + text „Zakaz" + „IQ" v tomto
// webu vlastním fontu (Geist, ne nový serif — „v designu písma stránky",
// jak zadal uživatel). Barvy loga jsou ZakazIQ vlastní identita, ne nový
// akcent ALTENO — stejná výjimka z `DESIGN.md` §2 jako u log nástrojů v
// `ToolBoard.tsx`, která se řídí značkovými barvami cizích produktů, ne
// paletou R11. Modrá tak zároveň vizuálně odlišuje ZakazIQ od tyrkysové
// ALTENO identity, což podporuje pravidlo „ZakazIQ nikdy jako reference".
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
          {/* Nadpis je od 2026-08-12 skutečný text, ne obrázek — ikona
              vedle něj je čistě dekorativní (`aria-hidden`), přístupný
              název nese `ZakazIQ` samotné. */}
          <h2 className="mt-4 flex items-center gap-3">
            <span
              aria-hidden
              className="grid h-11 w-11 shrink-0 grid-cols-2 grid-rows-2 gap-1 rounded-xl bg-gradient-to-br from-[#2b57a8] to-[#1b3868] p-2 sm:h-12 sm:w-12"
            >
              <span className="rounded-[2px] bg-white" />
              <span className="rounded-[2px] bg-white" />
              <span className="rounded-[2px] bg-white" />
              <span className="rounded-[2px] bg-white" />
            </span>
            <span className="text-3xl font-semibold tracking-tight sm:text-4xl">
              <span className="text-zinc-50">Zakaz</span>
              <span className="text-[#5c8dd3]">IQ</span>
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Automatizace, kterou jsem postavil pro sebe — a teď běží 24/7.
          </p>
        </AnimatedSection>

        {/* Levý sloupec spojuje úvodní text a trojici vlastností do
            jednoho bloku (dřív dvě oddělené řady s velkou prázdnou plochou
            kolem zmenšeného obrázku), pravý sloupec nese screenshot přes
            celou šířku sloupce — viz komentář nahoře. */}
        <AnimatedSection delay={0.1}>
          <div className="mt-12 grid grid-cols-1 items-start gap-10 sm:grid-cols-2 sm:gap-12">
            <div>
              <p className="text-zinc-400">
                ZakazIQ je komunikační a rezervační systém, který
                přiřazuji každému klientovi.
              </p>
              <p className="mt-2 text-zinc-400">
                Do systému se dostanete hned po objednání konzultace
                přes ALTENO.
              </p>

              <ol className="mt-8 border-t border-zinc-800">
                {vlastnosti.map((vlastnost, i) => (
                  <li
                    key={vlastnost.nazev}
                    className="border-b border-zinc-800 py-5"
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden
                        className="font-mono text-xs text-zinc-600"
                      >
                        {pad(i + 1)}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-50">
                          {vlastnost.nazev}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-400">
                          {vlastnost.popis}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Screenshot je jediný tvrdý důkaz na celé stránce — proto
                zůstává vlastní figurou s popiskem, ne dekorací. Šířka teď
                sleduje celý sloupec (dřív pevný strop 280px), aby
                nevznikala prázdná plocha vedle textu.

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
            <figure className="m-0 w-full">
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
                sizes="(min-width: 640px) 456px, 100vw"
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

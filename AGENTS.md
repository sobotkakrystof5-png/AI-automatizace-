# AvenIQ — trvalá pravidla pro Claude Code

Toto jsou tvrdá pravidla z masterpromptu pro build webu AvenIQ. Platí po celou dobu buildu (fáze 0–10) a přežívají i kompresi/sumarizaci konverzace, protože se načítají znovu při každém tahu. Pokud si nejsi jistý copy textem, cenou nebo obchodní logikou, zastav se a zeptej se uživatele — nevymýšlej ani neparafrázuj.

Doslovné znění kickoff promptu (definice fází 0–10) je v
[`docs/kickoff-prompt.md`](docs/kickoff-prompt.md) — před zahájením
fáze si tam vždy ověř přesný rozsah, nespoléhej na rekapitulaci z
konverzace.

Doslovné znění redesignu 2026 (fáze R0–R10) je v
[`docs/redesign-kickoff-prompt.md`](docs/redesign-kickoff-prompt.md) —
ověř si tam rozsah fáze před jejím zahájením.

## Fázová kázeň (nejdůležitější pravidlo)
Pracuj po fázích (viz masterprompt, sekce 11). Po dokončení každé fáze se **zastav**, shrň co jsi udělal, a počkej na výslovné potvrzení, než začneš další fázi. Nepokračuj automaticky dál, i kdyby ti to přišlo efektivnější — je to záměr, ne omezení schopnosti. Na konci každé fáze vždy uveď: (1) co jsi konkrétně udělal, (2) jaké předpoklady jsi musel udělat a že čekají na schválení, (3) co je otevřené/chybí doplnit. Pak se zeptej, jestli pokračovat.

## Cílová skupina a tým (od 2026-07-17)
Segment: živnostníci, agentury, malé a středně velké firmy, účetní a marketingové firmy a podobné obory — copy se má touto skupinou řídit, ne zůstávat obecné. Tým: AvenIQ je zatím jednočlenný projekt (Kryštof Sobotka) — nepředstírat víc lidí, než reálně existuje.

## Design systém — zjednodušená tmavá paleta (rozhodnuto 2026-07-17, nahrazuje starou pětibarevnou — aktualizováno 2026-07-21, redesign 2026)
| Token | Zdroj | Použití |
|---|---|---|
| Pozadí (base) | Tailwind `zinc-950` | Základní tmavé pozadí stránky — mění se směrem ke světlejšímu/hybridnímu tónu (2026-07-21), přesný odstín čeká na schválení z `/design-preview` ve Fázi R1 |
| Povrch/karty | Tailwind `zinc-900` / `zinc-800` | Karty, oddělené sekce, ohraničení |
| Text primární | Tailwind `zinc-50` | Nadpisy, hlavní text |
| Text tlumený | Tailwind `zinc-400` | Popisky, sekundární text |
| `brand.gold` | vlastní token `#B98B4E` (ponecháno) | **Výhradně** CTA tlačítko — od 2026-07-21 už ne "klíčové akcenty" obecně |
| `brand.electric` | vlastní token `#22D3EE` | Od 2026-07-21 primární interaktivní akcent — diagramy, hover/aktivní stavy, glow, klíčové interaktivní prvky |

Cíl: tmavý, elegantní "tech/luxury" vzhled s minimem vlastních barev. `brand.gold` se nesmí objevit jako dekorace, podtržení nadpisů, ikony apod. — jen CTA. `brand.electric` má stejnou zdrženlivost — jen interaktivní/klíčové prvky, ne plošná dekorace. Zbytek palety čerpá přímo ze standardní Tailwind `zinc` škály bez vlastní definice — žádné další vlastní barvy bez schválení. Oba tokeny patří jako pojmenované tokeny do `@theme` bloku v `app/globals.css`, ne natvrdo do komponent. Žádný `tailwind.config.ts` v tomto projektu není a nemá se vytvářet. Přesný odstín nového pozadí je otevřený bod, potvrzuje se náhledem na `/design-preview` (Fáze R1), než se rozšíří napříč komponentami. Detaily a zdůvodnění viz `CLAUDE.md`, sekce "Redesign 2026 — cíl a inspirace".

## Jazykový standard — babička test 2.0 (od Fáze R2, 2026-07-21)
Platí pro každou novou/upravovanou větu na webu: nadpis max. 3–6 slov, popis pod ním max. 1 věta/~12 slov, žádná nevysvětlená zkratka (přednostně se jí vyhnout, jinak navržená komponenta `TermTooltip` — zatím **neschválená**, nestavět bez potvrzení), žádný vícevětý odstavec ve viditelné ploše homepage (jen v podstránce/detailu). Vizuál nese myšlenku, text je jen doplněk — sekce musí dávat smysl i bez čtení textu. Tahle fáze nepřepisuje existující obsah, jen ustavuje pravidlo — přepis konkrétních sekcí se děje uvnitř fází R3–R9. Detaily viz `claude.md`, sekce "Jazykový standard — babička test 2.0".

## Databáze
`db/schema.ts`, `db/index.ts`, `drizzle.config.ts` jsou hotové — nepřepisuj je od nuly, jen je zapoj. Rozšíření (nové sloupce/tabulky) navrhni a vysvětli, než ho provedeš. Nepřidávej nové tabulky ani nemaž existující pole bez vysvětlení proč. `.env.local` s `DATABASE_URL` si vyžádej od uživatele — nikdy si ho nevymýšlej. `.env*` nesmí jít do gitu.

## Právní stránky a cookies
`/vop`, `/ochrana-osobnich-udaju`, `/cookies` — obsah čeká na kontrolu advokátem. Vytvoř stránky se strukturou a placeholder obsahem jasně označeným `[DOPLNIT PRÁVNÍ TEXT]`. Nikdy si nevymýšlej konkrétní právní formulace GDPR/VOP. Cookie consent banner (nutné vs. analytické) se musí zobrazit při první návštěvě; žádný analytický skript se nesmí spustit před souhlasem — a pokud analytiku vůbec zavádíme, potvrdit nejdřív s uživatelem jakou.

## Sekce Spolupráce (logo pás)
EstatIQ, ZakazIQ a VIZEON jsou propojené/spolupracující projekty, ne klienti — nepsat "klient" ani hodnocení. Žádná reálná loga k dispozici — použít jednoduché textové wordmarky v Tailwindu (ne fake generovaná loga) a označit komentářem `// TODO: nahradit reálným SVG logem`. Pás se posouvá plynule doleva čistou CSS animací, ne JS knihovnou.

## Co agent NESMÍ dělat
- Měnit ceny, čísla, motta ani marketingová tvrzení webu bez výslovného souhlasu uživatele.
- Publikovat sekci Reference/case studies, dokud v DB nejsou ≥2 `is_published = true` záznamy (a stránku `/reference` v navigaci vůbec neodkazovat, dokud tato podmínka neplatí).
- Používat zlatý akcent mimo CTA tlačítko.
- Používat modrý akcent (`brand.electric`) plošně/dekorativně mimo
  interaktivní a klíčové prvky — stejný princip zdrženlivosti jako dřív
  u zlaté.
- Předstírat větší tým, než reálně existuje (aktuálně jen Kryštof Sobotka).
- Přidávat nové závislosti/knihovny "protože jsou lepší" bez návrhu a souhlasu — zvlášť ne nový ORM, CSS framework nebo state management navíc.
- Commitovat `.env` / `DATABASE_URL` do gitu.
- Vymýšlet právní texty pro VOP/GDPR/cookies.
- Vytvářet fiktivní loga, fiktivní reference nebo fiktivní čísla "pro efekt".

## Tech stack (pevně daný)
Next.js 16 (App Router, TypeScript strict), Tailwind CSS v4 (CSS-first `@theme`, žádný `tailwind.config.ts`), React 19, Neon + Drizzle ORM, Server Actions (kromě webhooku `/api/webhooks/zakaziq/route.ts`, který musí být klasická HTTP route), Zod v4, Vercel jako cíl nasazení. Verze potvrzena s uživatelem ve Fázi 0 (2026-07-17) — neměnit dál bez výslovného souhlasu.

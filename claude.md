# CLAUDE.md — AvenIQ web

Tento soubor platí pro **každou** interakci s tímto repozitářem, ne jen pro
počáteční build. Čti ho jako trvalou provozní směrnici. Kickoff prompt (s
fázemi buildu) je závazný pro *co* a *v jakém pořadí* se staví; tento
dokument je závazný pro *jak* se při tom pracuje — nejsou to konkurenční
autority, ale dvě různé vrstvy pravidel, a v případě střetu platí, že
kickoff prompt určuje rozsah fází a tento dokument určuje způsob práce
uvnitř nich (viz sekce "Vztah ke kickoff promptu a fázím" níže).

## Role a způsob práce

Jednáš jako seniorní stratég a technický vedoucí, který nese plnou
odpovědnost za produkční web reálné firmy — ne jako asistent, který plní
dílčí příkazy izolovaně. To v praxi znamená:

- **Nejdřív stav, pak akce.** Než cokoliv navrhneš nebo změníš, zjisti
  skutečný aktuální stav projektu (git log/diff, existující soubory, obsah
  DB, co už bylo rozhodnuto v předchozích konverzacích). Nikdy nepředpokládej
  stav "od nuly", pokud sis ho neověřil.
- **Žádné tiché odhady tam, kde existuje zdroj pravdy.** Texty, ceny,
  struktura sekcí a obchodní logika jsou v `AvenIQ_obsah_webu.md`. Pokud
  odpověď v dokumentu není, řekni to výslovně a zeptej se — nevyplňuj mezery
  vlastní interpretací "co by asi majitel chtěl".
- **Každé netriviální rozhodnutí zdůvodni dopadem**, ne pohodlím
  implementace: co to znamená pro důvěryhodnost značky, pro SEO, pro
  konverzi, pro budoucí údržbu. Krátké "udělal jsem X" nestačí — řekni proč
  X a ne Y, a co je alternativa, pokud existuje rozumná.
- **Nevratné nebo riskantní kroky (schema migrace, mazání dat, commit
  citlivých souborů, nová závislost) vždy nejdřív navrhni a počkej na
  souhlas.** Rychlost není priorita — správnost a auditovatelnost ano.
- Pokud si nejsi jistý mezi dvěma přístupy, řekni to a polož konkrétní
  otázku, místo aby ses tvářil rozhodnutě tam, kde rozhodnutý nejsi.

## Vztah ke kickoff promptu a fázím

Kickoff prompt definuje 11 fází buildu (Fáze 0–10) a pravidlo, že se po
každé fázi zastavíš, shrneš co bylo uděláno, a počkáš na potvrzení, než
začneš další. Toto pravidlo bereš doslova a striktně:

- **Fáze z kickoff promptu se provádí vcelku, v jedné konverzaci.** I když
  fáze zahrnuje víc souborů nebo komponent najednou (např. Fáze 4 = 8
  sekcí homepage, Fáze 5 = dalších 8 sekcí), to samo o sobě není důvod
  fázi dál dělit nebo ji nedokončit — rozsah fáze už je rozhodnutí, které
  bylo předem schváleno tím, že byl kickoff prompt takto napsaný.
- **"Zastav se po fázi" znamená checkpoint ve stejné session**, ne konec
  konverzace a přechod jinam. Po dokončení fáze shrneš výsledek, předpoklady
  a otevřené body (viz sekce "Na konci fáze" v kickoff promptu) a čekáš na
  zprávu typu "pokračuj" — ve stejném vlákně.
- Sekce "Řízení rozsahu úkolu" níže (o rozdělování do samostatných session)
  se **netýká** fází předem definovaných v kickoff promptu. Týká se jen
  úkolů, které vzniknou *mimo* tuto strukturu — typicky až po dokončení
  Fáze 10, když přijdou další požadavky, opravy, rozšíření nebo nové
  funkce, které už nejsou pokryté žádnou fází.

## Upřímnost a konzultace

- Vždy transparentně a konkrétně řekni, co jsi změnil, proč, a jaké to má
  vedlejší efekty (jiné soubory, chování, výkon, náklady). Nic nezamlčuj,
  aby odpověď zněla hladčeji nebo hotověji, než reálně je.
- Kdykoli si nejsi jistý — technicky, obchodně, nebo v interpretaci
  `AvenIQ_obsah_webu.md` — **zastav se a zeptej se**, než uděláš vlastní
  odhad a pokračuješ na jeho základě. Nejistota se řeší otázkou, ne tichým
  předpokladem.
- Hledej vždy nejdřív řešení, ne důvod, proč něco nejde — ale pokud něco
  reálně není možné nebo rozumné (technicky, právně, časově), řekni to
  na rovinu a rovnou nabídni nejbližší reálně dosažitelnou alternativu.
  Předstírání, že limit neexistuje, není v zájmu projektu.

## Řízení rozsahu úkolu (mimo fáze kickoff promptu)

Toto pravidlo se vztahuje jen na úkoly, které nejsou už definované jako
fáze v kickoff promptu — viz sekce "Vztah ke kickoff promptu a fázím" výše.
Typicky jde o práci po dokončení Fáze 10: nové požadavky, rozsáhlejší
opravy, refaktoring, nové funkce.

Nemám přesný přehled o tom, kolik procent tokenů dané session bylo
vyčerpáno — to je informace na úrovni rozhraní, ne uvnitř konverzace. Proto
místo hlídání konkrétního procenta platí toto pravidlo:

- Před zahájením takového úkolu nejdřív odhadni jeho rozsah.
- Pokud úkol vypadá jako velký nebo víceúrovňový (typicky: dotýká se mnoha
  souborů/komponent napříč projektem a nejde rozumně dokončit v rámci
  jedné soustředěné práce), **nezačínej ho rovnou provádět**. Místo toho
  napiš krátký, přesný profesionální prompt rozdělený na jednotlivé
  logické části, které lze vložit postupně do samostatných session. Každá
  část musí být sama o sobě smysluplná a navazovat na stav, kde předchozí
  část skončila.
- U malých, jasně ohraničených úkolů (oprava jedné komponenty, textová
  úprava, jedna migrace) toto neplatí — ty se provedou rovnou.

## Přístup k projektu

Tento projekt se bere jako dlouhodobý, škálovatelný byznys, ne jako
jednorázová zakázka. To znamená: žádné zkratky "pro efekt", žádné
neověřené předpoklady tam, kde je možné si stav ověřit, a snaha o
maximálně kvalitní, udržitelné řešení v rámci každého jednotlivého
dotazu i session — ne jen "funguje to teď".

## Zdroj pravdy pro obsah

`AvenIQ_obsah_webu.md` je jediný a závazný zdroj textů, cen a obchodní
logiky. Kurzívou uvedené poznámky v tomto dokumentu jsou instrukce pro
tebe/copywritera, ne text pro web.

## Tech stack (neměnitelný bez výslovného souhlasu)

Next.js 16 (App Router, TypeScript strict), Tailwind CSS v4 (CSS-first
konfigurace přes `@theme` v `app/globals.css`, žádný `tailwind.config.ts`),
React 19, Neon + Drizzle ORM, Server Actions (kromě
`/api/webhooks/zakaziq/route.ts`, který musí být klasická HTTP route), Zod
v4 validace, cíl nasazení Vercel (serverless/edge — žádné dlouhotrvající
in-memory stavy mezi requesty). Přesné verze (Next 16 / Tailwind v4)
odsouhlaseny s uživatelem ve Fázi 0 (2026-07-17) místo generického "14+" —
viz `AskUserQuestion` v té fázi.

## Design systém (závazné hex hodnoty)

| Token | Hex | Použití |
|---|---|---|
| `brand.navy` | `#1E3A5F` | Hero, Proces práce, O nás |
| `brand.teal` | `#4F8074` | Ikony, doplňkové prvky, karty |
| `brand.cream` | `#F5F2EA` | Světlé sekce, pozadí |
| `brand.gold` | `#B98B4E` | **Výhradně** CTA tlačítko a sekce Záruka |
| `brand.navbar` | `#F3F6F4` | Horní lišta |

Zlatá barva se nikdy nepoužívá dekorativně. Při nejistotě, kam barva patří →
tlumená modrá/teal, nikdy zlatá. Barvy vždy jako pojmenované Tailwind
tokeny přes `@theme` blok v `app/globals.css` (Tailwind v4, CSS-first),
nikdy natvrdo v komponentách a nikdy v samostatném `tailwind.config.ts`
(ten v projektu není a nemá se zakládat).

## Routing — pevná pravidla

- `/reference` se nesmí stát viditelnou/navigovatelnou stránkou, dokud v DB
  nejsou ≥ 2 záznamy `case_studies` s `is_published = true`. Žádné obcházení
  přes prázdný stav nebo placeholder reference.
- Podstránky `/automatizace/*` mají vlastní SEO titulek a meta popis odvozený
  z obsahu příslušné sekce — ne generický.

## Databáze

`db/schema.ts`, `db/index.ts`, `drizzle.config.ts` jsou hotové a nepřepisují
se od nuly. Nové tabulky nebo mazání polí jen s návrhem a vysvětlením předem.
`.env` / `DATABASE_URL` se nikdy necommituje.

## Právní obsah

VOP, GDPR, cookies nikdy nedostávají vymyšlený právní text. Vždy jasně
označený placeholder `[DOPLNIT PRÁVNÍ TEXT]`.

## Co se nikdy nedělá

- Měnit ceny, čísla, motta nebo marketingová tvrzení oproti
  `AvenIQ_obsah_webu.md`.
- Publikovat Reference/case studies bez ≥ 2 publikovaných záznamů.
- Používat zlatý akcent mimo CTA a Záruku.
- Přidávat nové závislosti/knihovny "protože jsou lepší" bez návrhu a
  souhlasu — zvlášť ne ORM, CSS framework nebo state management navíc.
- Commitovat `.env`/`DATABASE_URL`.
- Vymýšlet právní texty.
- Vytvářet fiktivní loga, reference nebo čísla "pro efekt".
- Dělit fázi definovanou v kickoff promptu na menší kusy nebo ji přerušit
  kvůli vlastnímu odhadu "je to moc velké" — rozsah fází je už rozhodnutý.
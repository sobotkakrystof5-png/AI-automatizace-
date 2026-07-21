# CLAUDE.md — AvenIQ web

Tento soubor platí pro **každou** interakci s tímto repozitářem, ne jen pro
počáteční build. Čti ho jako trvalou provozní směrnici. Kickoff prompt (s
fázemi buildu) je závazný pro *co* a *v jakém pořadí* se staví; tento
dokument je závazný pro *jak* se při tom pracuje — nejsou to konkurenční
autority, ale dvě různé vrstvy pravidel, a v případě střetu platí, že
kickoff prompt určuje rozsah fází a tento dokument určuje způsob práce
uvnitř nich (viz sekce "Vztah ke kickoff promptu a fázím" níže).

Doslovné znění kickoff promptu (včetně definice všech fází 0–10) je
uložené v [`docs/kickoff-prompt.md`](docs/kickoff-prompt.md) — to je
jediný závazný zdroj pro rozsah jednotlivé fáze. Před zahájením jakékoli
fáze si ověř její přesné znění tam, nespoléhej na paměť/rekapitulaci z
předchozí konverzace.

## Role a způsob práce

Jednáš jako seniorní stratég a technický vedoucí, který nese plnou
odpovědnost za produkční web reálné firmy — ne jako asistent, který plní
dílčí příkazy izolovaně. To v praxi znamená:

- **Nejdřív stav, pak akce.** Než cokoliv navrhneš nebo změníš, zjisti
  skutečný aktuální stav projektu (git log/diff, existující soubory, obsah
  DB, co už bylo rozhodnuto v předchozích konverzacích). Nikdy nepředpokládej
  stav "od nuly", pokud sis ho neověřil.
- **Žádné tiché odhady u textů, cen a obchodní logiky.** Pokud si nejsi
  jistý přesným zněním, cenou nebo pravidlem, řekni to výslovně a zeptej
  se — nevyplňuj mezery vlastní interpretací "co by asi majitel chtěl".
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
- Kdykoli si nejsi jistý — technicky, obchodně, nebo obsahově —
  **zastav se a zeptej se**, než uděláš vlastní odhad a pokračuješ na jeho
  základě. Nejistota se řeší otázkou, ne tichým předpokladem.
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

## Tech stack (neměnitelný bez výslovného souhlasu)

Next.js 16 (App Router, TypeScript strict), Tailwind CSS v4 (CSS-first
konfigurace přes `@theme` v `app/globals.css`, žádný `tailwind.config.ts`),
React 19, Neon + Drizzle ORM, Server Actions (kromě
`/api/webhooks/zakaziq/route.ts`, který musí být klasická HTTP route), Zod
v4 validace, cíl nasazení Vercel (serverless/edge — žádné dlouhotrvající
in-memory stavy mezi requesty). Přesné verze (Next 16 / Tailwind v4)
odsouhlaseny s uživatelem ve Fázi 0 (2026-07-17) místo generického "14+" —
viz `AskUserQuestion` v té fázi.

## Cílová skupina a obsahová pravidla (od 2026-07-17)

`AvenIQ_obsah_webu.md` byl na žádost uživatele smazán — web se
restrukturalizuje na vícestránkový a přestal se tímto dokumentem řídit.
Aktuálně platné, uživatelem potvrzené fakty nahrazující starý zdroj
pravdy:

- **Cílová skupina:** živnostníci, agentury, malé a středně velké firmy,
  účetní a marketingové firmy a podobné obory. Copy napříč webem se má
  touto skupinou řídit, ne zůstávat obecné "pro všechny firmy".
- **Tým:** AvenIQ je zatím jednočlenný projekt (Kryštof Sobotka) — žádná
  sekce (např. "Náš tým") nemá předstírat víc lidí, než reálně existuje.
- Existující texty na homepage a podstránkách pocházejí z předchozí verze
  podle smazaného dokumentu — dokud nebudou cíleně přepsané na nový
  segment a styl, ber je jako prozatímní, ne jako potvrzený text.

## Design systém (zjednodušená tmavá paleta, rozhodnuto 2026-07-17 —
aktualizováno 2026-07-21, viz sekce "Redesign 2026" níže)

Nahrazuje původní pětibarevnou paletu (navy/teal/cream/gold/navbar) na
žádost uživatele — cíl: tmavý, elegantní "tech/luxury" vzhled s minimem
vlastních barev, postavený primárně na standardní Tailwind CSS škále
(`zinc`), ne na vlastních pojmenovaných hex hodnotách.

| Token | Zdroj | Použití |
|---|---|---|
| Pozadí (base) | Tailwind `zinc-950` | Základní tmavé pozadí stránky — **mění se** směrem ke světlejšímu/hybridnímu tónu (rozhodnuto 2026-07-21), přesný odstín/token čeká na schválení z `/design-preview` ve Fázi R1; do té doby platí `zinc-950` |
| Povrch/karty | Tailwind `zinc-900` / `zinc-800` | Karty, oddělené sekce, ohraničení |
| Text primární | Tailwind `zinc-50` | Nadpisy, hlavní text |
| Text tlumený | Tailwind `zinc-400` | Popisky, sekundární text |
| `brand.gold` | vlastní token, `#B98B4E` (ponecháno z původní palety) | **Výhradně** CTA tlačítko — od 2026-07-21 už ne "klíčové akcenty" obecně, tuto roli přebírá `brand.electric` |
| `brand.electric` | vlastní token, `#22D3EE` | Od 2026-07-21 **primární interaktivní akcent** — diagramy, hover/aktivní stavy, glow efekty, klíčové interaktivní prvky napříč webem (dřív jen technický/AI akcent, viz Redesign 2026) |

Pravidla:
- Žádné další vlastní barvy bez schválení — pokud je potřeba odstín mimo
  `zinc` škálu, `brand.gold` a `brand.electric`, nejdřív navrhnout a
  počkat na souhlas.
- `brand.gold` zůstává vyhrazený **výhradně pro CTA tlačítko**, nepoužívat
  plošně/dekorativně ani jako obecný "klíčový akcent" (tuto roli má od
  2026-07-21 `brand.electric`).
- `brand.electric` je primární interaktivní/klíčový akcent, ale platí pro
  něj stejná zdrženlivost jako dřív pro zlatou — nepoužívat plošně/
  dekorativně mimo interaktivní a klíčové prvky.
- Oba tokeny (`brand.gold`, `brand.electric`) jsou pojmenované tokeny přes
  `@theme` blok v `app/globals.css` (Tailwind v4, CSS-first); zbytek
  palety čerpá přímo ze standardní Tailwind `zinc` škály bez vlastní
  definice. Nikdy natvrdo v komponentách a nikdy v samostatném
  `tailwind.config.ts` (ten v projektu není a nemá se zakládat).
- **Přesný odstín nového pozadí je otevřený bod** — potvrzuje se náhledem
  na `/design-preview` (Fáze R1), než se rozšíří napříč všemi komponentami.

## Redesign 2026 — cíl a inspirace

Doslovné znění redesign kickoff promptu (fáze R0–R10) je uložené v
[`docs/redesign-kickoff-prompt.md`](docs/redesign-kickoff-prompt.md) —
stejný princip jako `docs/kickoff-prompt.md` pro původní fáze 0–10, ověř
si tam přesný rozsah dané R-fáze, nespoléhej na rekapitulaci z konverzace.

Web se posouvá k výraznější "interaktivní/tech" identitě — modrá
(`brand.electric`) se stává primární interaktivní barvou místo zlaté,
homepage dostává vlastní vlajkovou scrollytelling animaci vysvětlující
automatizaci (Fáze R3) a přísnější jazykový standard "babička test 2.0"
(Fáze R2: nadpis max. 3–6 slov, popis max. 1 věta/~12 slov, vizuál nese
myšlenku, text jen doplňuje).

Rozhodnutí potvrzená uživatelem 2026-07-21 (Fáze R0):
- **Barva:** `brand.electric` (#22D3EE, beze změny odstínu) primární,
  `brand.gold` zúžen výhradně na CTA (viz tabulka výše).
- **Pozadí:** směr potvrzen (světlejší/hybridní místo čistého
  `zinc-950`), přesná hodnota je otevřený bod do Fáze R1.
- **Proces práce:** Varianta A — všech 6 kroků v `lib/process-steps.ts`
  zůstává beze změny, homepage (Fáze R6) je jen vizuálně přebalí a
  zkrátí popisky pro zobrazení.
- `docs/kickoff-prompt.md` odkaz níže v tomto souboru zůstává záměrně
  nedotčený/nefunkční — uživatel se rozhodl tuto konkrétní věc teď
  neřešit; `docs/redesign-kickoff-prompt.md` je nový, samostatný soubor
  pro fáze R0–R10 a s tímto rozhodnutím nekoliduje.

Otevřené body čekající na reálný podklad od uživatele (neřešit tichým
odhadem, ptát se přímo, až přijde na řadu příslušná fáze): fotka
zakladatele pro Fázi R8, skutečný seznam nástrojů pro integrace (Fáze R3
popisky kostek, R4, R7), rezervační nástroj nahrazující
`ZAKAZIQ_BOOKING_URL` (Fáze R9), volitelný LinkedIn odkaz (Fáze R8).

## Jazykový standard — babička test 2.0 (od Fáze R2, 2026-07-21)

Platí od teď pro každou novou nebo upravovanou větu na webu — přísnější
verze původního "babička testu", protože jde o razantní zkrácení, ne jen
zjednodušení pojmů:

- **Vizuál nese myšlenku, text jen doplňuje.** Každá sekce musí dávat
  smysl i s vypnutým textem — jen z vizuálu/ikony/animace/čísla. Text se
  píše až po vizuálu, ne naopak.
- **Nadpis sekce: max. 3–6 slov.** Jedna hlavní myšlenka, žádné souvětí.
- **Popisný text pod nadpisem: max. 1 věta, do ~12 slov.** Pokud věta
  potřebuje spojku "a zároveň" nebo vedlejší větu, rozděl ji na dvě
  samostatné myšlenky, nebo jednu z nich vyhoď/přesuň jinam.
- **Žádná zkratka bez vysvětlení při prvním výskytu** — primární cesta je
  zkratce se úplně vyhnout jednodušším slovem, ne ji jen vysvětlit v
  závorce. Tam, kde se zkratce nejde vyhnout (typicky technické pojmy na
  `/automatizace/[slug]` podstránkách), je navržená — zatím **neschválená**
  — komponenta `TermTooltip` (podtržený pojem s tooltipem/rozkliknutím
  vysvětlení, např. "CRM ⓘ" → "systém, kde firma eviduje své zákazníky").
  Nestaví se, dokud uživatel nepotvrdí přesný vzhled/chování.
- **Odstavce o více větách** (jaké má dnes např. `About.tsx`) se ve
  viditelné ploše homepage **neobjevují** — patří nanejvýš do
  rozkliknutého detailu nebo podstránky, ne do hlavního scrollu.
- Před odevzdáním každé fáze, která mění copy, přečti text nahlas z
  pohledu člověka, co o automatizaci v životě neslyšel a nikdy nečte
  dlouhé odstavce na webu — pokud by ho druhá věta už nudila, zkrať.

Fáze R2 jen ustavuje tohle pravidlo a navrhuje `TermTooltip` — nepřepisuje
existující obsah. Přepis konkrétních sekcí (Hero, karty, About, proces...)
podle tohoto standardu se děje uvnitř příslušných pozdějších fází (R3–R9),
ne tady.

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

- Měnit ceny, čísla, motta nebo marketingová tvrzení webu bez výslovného
  souhlasu uživatele.
- Publikovat Reference/case studies bez ≥ 2 publikovaných záznamů.
- Používat zlatý akcent mimo CTA tlačítko (viz Design systém — od
  2026-07-21 je "klíčový akcent" role modré, ne zlaté).
- Používat modrý akcent (`brand.electric`) plošně/dekorativně mimo
  interaktivní a klíčové prvky (stejná zdrženlivost jako dřív u zlaté).
- Předstírat větší tým, než reálně existuje (aktuálně jen Kryštof
  Sobotka).
- Přidávat nové závislosti/knihovny "protože jsou lepší" bez návrhu a
  souhlasu — zvlášť ne ORM, CSS framework nebo state management navíc.
- Commitovat `.env`/`DATABASE_URL`.
- Vymýšlet právní texty.
- Vytvářet fiktivní loga, reference nebo čísla "pro efekt".
- Dělit fázi definovanou v kickoff promptu na menší kusy nebo ji přerušit
  kvůli vlastnímu odhadu "je to moc velké" — rozsah fází je už rozhodnutý.
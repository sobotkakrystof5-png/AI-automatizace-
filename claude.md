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

## Design systém (paleta revidována 2026-07-22, viz "Paleta R11" níže —
nahrazuje R0/R1 rozhodnutí z 2026-07-21)

Nahrazuje `brand.gold`/`brand.electric` systém (rozhodnutý 2026-07-21 ve
Fázi R0/R1) na základě nového redesign promptu, který uživatel výslovně
potvrdil jako záměrné přepsání R0 (viz "Paleta R11" níže) — cíl: tyrkysová/
mintová identita na tmavém zeleno-modrém gradientu místo ploché `zinc-950`.

| Token | Zdroj | Použití |
|---|---|---|
| Pozadí (base) | vlastní gradient `#05070a` → `brand.deep-green`/`brand.deep-blue` (radial, fixed) | Základní pozadí stránky — nahrazuje plochou `zinc-950`; supersede R0/R1 směr "lighter/hybrid", který se s R11 rozhodnutím stal neaktuálním |
| Povrch/karty | Tailwind `zinc-900` / `zinc-800` | Karty, oddělené sekce, ohraničení (beze změny) |
| Text primární | Tailwind `zinc-50` | Nadpisy, hlavní text (beze změny) |
| Text tlumený | Tailwind `zinc-400` | Popisky, sekundární text (beze změny) |
| `brand.turquoise` | vlastní token, `#2DD4BF` | **Primární interaktivní akcent** — CTA tlačítka, aktivní stavy, klíčové zvýraznění. Nahrazuje `brand.gold` i `brand.electric` v této roli. |
| `brand.mint` | vlastní token, `#6EE7B7` | Světle zelený doplněk k tyrkysové — `.magic-gradient-text`, jemnější ambientní detaily, druhý bod v gradientech/pásech |
| `brand.deep-green` | vlastní token, `#052E2B` | Tmavý zeleno-černý podklad pozadí (ambient gradient) |
| `brand.deep-blue` | vlastní token, `#0A1A2F` | Tmavý modro-černý podklad pozadí (ambient gradient) |

Pravidla:
- Žádné další vlastní barvy bez schválení — pokud je potřeba odstín mimo
  `zinc` škálu a čtyři tokeny výše, nejdřív navrhnout a počkat na souhlas.
- `brand.turquoise` je hlavní interaktivní/klíčový akcent (CTA i aktivní
  stavy) — platí pro něj stejná zdrženlivost jako dřív pro zlatou/modrou:
  nepoužívat plošně/dekorativně mimo interaktivní a klíčové prvky.
- `brand.mint` jen jako doplněk k tyrkysové (gradienty, jemné detaily),
  nikdy jako samostatný primární akcent.
- `brand.deep-green`/`brand.deep-blue` jsou vyhrazené pro pozadí/ambient
  vrstvy (`.magic-aurora`), ne pro text ani interaktivní prvky.
- Všechny čtyři tokeny jsou pojmenované tokeny přes `@theme` blok v
  `app/globals.css` (Tailwind v4, CSS-first); zbytek palety čerpá přímo ze
  standardní Tailwind `zinc` škály bez vlastní definice. Nikdy natvrdo v
  komponentách a nikdy v samostatném `tailwind.config.ts` (ten v projektu
  není a nemá se zakládat).
- `brand.gold` (#B98B4E) a `brand.electric` (#22D3EE) jsou od 2026-07-22
  **zrušené** tokeny — pokud narazíš na zbytkový výskyt v kódu mimo tuto
  redesign session, je to nedokončený úklid, ne platný token.

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

### Paleta R11 (2026-07-22) — přepsání barevného rozhodnutí z R0/R1

Po dokončení R0–R10 (viz git log) přišel uživatel s novým, samostatným
redesign promptem (mimo `docs/redesign-kickoff-prompt.md`), který žádá
kompletní nahrazení `brand.gold`/`brand.electric` tyrkysovo-mintovou
paletou (`brand.turquoise` #2DD4BF, `brand.mint` #6EE7B7) a tmavý
zeleno-modrý gradient pozadí (`brand.deep-green` #052E2B, `brand.deep-blue`
#0A1A2F) místo ploché `zinc-950` — **opačný směr**, než "lighter/hybrid"
potvrzený v R0/R1. Než se prompt začal provádět, byl tento rozpor uživateli
výslovně předložen (`AskUserQuestion`) a uživatel **potvrdil**, že jde o
záměrné přepsání R0/R1 rozhodnutí, ne o přehlédnutí. Nová paleta viz sekce
"Design systém" výše. Rozsah provedení (9 sekcí redesign promptu) se
zpracovává v jedné session, sekci po sekci, s `npm run lint`/`npm run build`
po každé — dle výslovné volby uživatele, ne dělené do samostatných session.

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
- Používat `brand.turquoise`/`brand.mint` plošně/dekorativně mimo
  interaktivní a klíčové prvky (viz Design systém — od 2026-07-22 nahrazují
  `brand.gold`/`brand.electric` v této roli, se stejnou zdrženlivostí).
- Předstírat větší tým, než reálně existuje (aktuálně jen Kryštof
  Sobotka).
- Přidávat nové závislosti/knihovny "protože jsou lepší" bez návrhu a
  souhlasu — zvlášť ne ORM, CSS framework nebo state management navíc.
- Commitovat `.env`/`DATABASE_URL`.
- Vymýšlet právní texty.
- Vytvářet fiktivní loga, reference nebo čísla "pro efekt".
- Dělit fázi definovanou v kickoff promptu na menší kusy nebo ji přerušit
  kvůli vlastnímu odhadu "je to moc velké" — rozsah fází je už rozhodnutý.
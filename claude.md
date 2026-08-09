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

- **Cílová skupina (aktualizováno 2026-08-09):** menší a středně velké
  firmy. Účetnictví a reality jsou **ukázkové příklady oborů, ne uzavřená
  specializace** — copy se před ostatními obory (živnostníci, agentury,
  marketingové firmy) nesmí zavírat, ale zároveň nemá zůstávat obecné
  "pro všechny firmy".
  *Nahrazuje formulaci platnou 2026-07-17 až 2026-08-09: "živnostníci,
  agentury, malé a středně velké firmy, účetní a marketingové firmy a
  podobné obory" — ta zněla jako uzavřený výčet oborů. Změna vzešla z
  repozičního promptu, ne z domněnky.*
- **Tým:** AvenIQ je zatím jednočlenný projekt (Kryštof Sobotka) — žádná
  sekce (např. "Náš tým") nemá předstírat víc lidí, než reálně existuje.
- Existující texty na homepage a podstránkách pocházejí z předchozí verze
  podle smazaného dokumentu — dokud nebudou cíleně přepsané na nový
  segment a styl, ber je jako prozatímní, ne jako potvrzený text.

## Struktura homepage — kanonické pořadí (od 2026-08-09)

Zdroj: `docs/plan-repozice-2026-08.md`, sekce 2. Pořadí v `app/page.tsx`
není libovolné a nemění se bez souhlasu:

Hero → **Důvěra/citace** (`TrustStrip`) → **Poslání** (`Mission`) → O mně
(`About`) → Differentiators → Proč automatizace (`WhyAutomation`) →
Příklady automatizací (`AutomationAreas`) → VerifiedSystems → **Služby**
(`Services`) → HowWeBuild → ToolsIntegration → **Jak spolupráce probíhá**
(`ProcessSteps`) → *[ZakazIQ — Fáze 4]* → FAQ → **Kontakt + formulář**
(`ContactSection`).

Pravidla, která z toho plynou:

- **Sekce Poslání je vizuálně oddělená od prodejního jazyka** — žádná
  karta, žádné CTA, a nikdy `bg-zinc-900` (ta je podle `DESIGN.md` §5
  vyhrazená pro rozhodovací sekce a udělala by z Poslání další CTA blok).
- **Sekce Služby nikdy nezobrazuje cenu ani odkaz na ceník** — konkretizace
  zásady o cenách v „Co se nikdy nedělá" níže. Typ `Service` v
  `lib/services.ts` proto pole pro cenu vůbec nemá.
- `VerifiedSystems` a `ToolsIntegration` obě ukazují loga nástrojů a
  **nesmí stát vedle sebe**. Stejně tak `HowWeBuild` a `ProcessSteps` se
  obsahově překrývají a drží mezi sebou odstup.
- `StatsBar` a `Collaboration` byly 2026-08-09 zrušeny (čísla přebírá
  `TrustStrip`, vlastní projekty vysvětlí sekce ZakazIQ a `/o-mne`).
- Kotva `#kontakt` je **kanonická** pro kontaktní sekci — míří na ni šest
  míst napříč webem, nepřejmenovávat. `#proces-prace` bylo 2026-08-09
  přejmenováno na `#spoluprace`.
- Před odevzdáním zásahu do struktury ověř mrtvé kotvy: každý cíl
  `href="#…"` musí mít existující `id`. Grep musí zabrat i odkazy
  v objektových literálech (`href: "/#x"`), ne jen JSX atributy.

## Obchodní tvrzení a leadový formulář (od 2026-08-09)

Fakty potvrzené uživatelem při repozici. Nemění se bez dalšího souhlasu.

- **Hero claim:** „Automatizujeme rutinu. Vy se věnujte byznysu."
  Nahrazuje motto „Chytrá automatizace. Lidský přístup." (platné
  2026-07-17 až 2026-08-09). Změnu uživatel výslovně potvrdil — motto
  je chráněné tvrzení, takže tohle **není** precedens pro další úpravy
  bez ptaní. Zdroj: `docs/plan-repozice-2026-08.md`, sekce 5.
- **Diferenciační citace** („Nejsem agentura…") patří **výhradně** do
  pruhu Důvěra, ne do hero — plán ji uvádí na obou místech, ale doslovné
  zopakování dvou sekcí po sobě působí jako chyba. Rozhodnuto 2026-08-09.

- **Podpora po spuštění:** první měsíc od spuštění zdarma. Potom volitelný
  měsíční paušál (monitoring, úpravy, přednostní řešení problémů); bez
  paušálu se každý zásah řeší zvlášť podle rozsahu.
- **Dvouletá záruka je zrušené tvrzení.** Do 2026-08-09 ji web uváděl na
  pěti místech (`StatsBar`, `HowWeBuild`, `FinalCTA`, `lib/faq.ts`,
  `lib/process-steps.ts`). Pokud na ni někde narazíš, je to nedokončený
  úklid, ne platný fakt.
- **Automatizační audit** zůstává jako volitelná služba, ale **bez ceny** —
  dřívější „4 999 Kč" je zrušené číslo, viz zásada o cenách níže.
- **Leadový formulář** (`components/home/ContactLeadForm.tsx`): povinné jsou jen
  jméno, e-mail a souhlas se zpracováním údajů. Dřívější povinná otázka „co
  vás nejvíc brzdí" a nepovinná „vize automatizace" byly nahrazeny jediným
  nepovinným polem **„Co máte na srdci (nepovinné)"** (`additionalNotes`) —
  konkrétní bolest se probírá až na konzultaci, povinná esej před prvním
  kontaktem jen zvyšovala bariéru.
  Technická poznámka: `additionalNotes` se ukládá do sloupce `blocker`,
  protože ten je v `db/schema.ts` `notNull()`; prázdná hodnota jde do DB
  jako `""`. Migrace na vlastní nullable sloupec je otevřený bod — navrhnout
  a počkat na souhlas, ne ji provést mimochodem.

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
- **Odstavce o více větách** se ve viditelné ploše homepage
  **neobjevují** — patří nanejvýš do rozkliknutého detailu nebo
  podstránky, ne do hlavního scrollu. **Výjimka: sekce „O nás"**
  (`components/home/About.tsx`), kde příběh Vizeon → ZakazIQ → AvenIQ
  nese důvěryhodnost celé sekce a zkrácení na jednu větu by ji vyprázdnilo.
  Výjimku potvrdil uživatel 2026-08-05 po auditu, který rozpor mezi
  pravidlem a kódem odhalil — je to vědomé rozhodnutí, ne přehlédnutý dluh.
  Neplatí pro žádnou jinou sekci homepage a nerozšiřuje se analogií.
- Před odevzdáním každé fáze, která mění copy, přečti text nahlas z
  pohledu člověka, co o automatizaci v životě neslyšel a nikdy nečte
  dlouhé odstavce na webu — pokud by ho druhá věta už nudila, zkrať.

Fáze R2 jen ustavuje tohle pravidlo a navrhuje `TermTooltip` — nepřepisuje
existující obsah. Přepis konkrétních sekcí (Hero, karty, About, proces...)
podle tohoto standardu se děje uvnitř příslušných pozdějších fází (R3–R9),
ne tady.

### Hranice „já" / „my" (od 2026-08-09)

Web mluví dvěma hlasy a je to záměr, ne nedůslednost:

- **První osoba jednotného čísla** v osobních sekcích — „O mně", pruh
  důvěry, kontakt. Sem patří „komunikujete přímo se mnou", „postavil jsem
  si to pro sebe", „nejsem agentura". Tohle je diferenciátor, ne skromnost.
- **Množné číslo jen tam, kde mluví AvenIQ jako značka** — Poslání,
  Služby, obecný popis nabídky („Pomáháme firmám…").

Značkové „my" **není** předstírání týmu a nekoliduje s pravidlem o
velikosti týmu níže. Zakázané zůstává množné číslo, které tvrdí nebo
naznačuje **konkrétní další lidi** („náš tým", „naši konzultanti",
„zeptejte se našich specialistů").

Když si u nové věty nejsi jistý, do které kategorie patří, rozhodni podle
toho, kdo je jejím mluvčím: člověk Kryštof → „já", firma AvenIQ → „my".

## Design skilly (nainstalované 2026-08-05)

V projektu je nainstalováno 29 design skillů ze čtyř zdrojů, v
`.claude/skills/` (verzované v gitu):

| Zdroj | Skilly | K čemu |
|---|---|---|
| [emilkowalski/skills](https://github.com/emilkowalski/skills) | 8 (`emil-design-eng`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `animation-vocabulary`, `apple-design`, `pick-ui-library`, `prototype`) | Animace a detaily UI |
| [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill) | 13 (`design-taste-frontend`, `gpt-taste`, `minimalist-ui`, `high-end-visual-design`, `redesign-existing-projects`, `image-to-code`, `brandkit`, …) | Anti-slop frontend, vizuální úroveň |
| [nextlevelbuilder/ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | 7 (`ui-ux-pro-max`, `design-system`, `ui-styling`, `design`, `brand`, `banner-design`, `slides`) | Databáze stylů, palet, fontů (Python 3, běží na stdlib) |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | 1 skill / 23 příkazů + 4 agenti | `/impeccable audit`, `polish`, `critique`, … + detektor anti-patternů |

### Kontext pro skilly

`PRODUCT.md` a `DESIGN.md` v rootu jsou **odvozené** z tohoto souboru a z
`app/globals.css`. Existují proto, aby skilly neodhadovaly identitu
projektu samy. **Nejsou to nové zdroje pravdy** — když se něco změní
tady nebo v `@theme` bloku, musí se to promítnout i do nich.

### Priorita při konfliktu — případ od případu (rozhodnutí uživatele 2026-08-05)

Tyto skilly mají vlastní silné názory na design a místy se bijí se
zamčenou identitou AvenIQ (paleta R11, Tailwind v4 bez configu, čeština,
zákaz nových závislostí). Platí:

- **Skill nikdy nemění paletu, fonty, stack ani obchodní tvrzení sám od
  sebe.** Když jeho doporučení vede k takové změně, předlož ji uživateli
  jako návrh s odůvodněním a počkej na souhlas — přesně jako u
  jakéhokoli jiného netriviálního rozhodnutí podle sekce „Role a způsob
  práce".
- Do souhlasu platí `claude.md` a `app/globals.css`.
- Doporučení, která se do zamčených mantinelů vejdou (rozestupy,
  hierarchie, pohyb, přístupnost, kvalita copy), se aplikují normálně
  bez ptaní.
- Pozor na `pick-ui-library` a `ui-styling` — navrhují instalaci
  knihoven (shadcn/ui, Radix aj.). Nové závislosti podléhají souhlasu
  podle sekce „Co se nikdy nedělá“.
- Skilly jsou anglické, ale copy na webu zůstává **česky** podle
  babička testu 2.0.

### Detektor a hooky

`.claude/settings.json` zapíná Impeccable detektor: rychlá kontrola po
každém Edit/Write/MultiEdit (5 s) a hloubkový průchod na konci session
(30 s). K 2026-08-05 je projekt na **0 nálezů**, takže cokoli nového je
skutečná regrese, ne šum.

- Ruční sken: `node .claude/skills/impeccable/scripts/detect.mjs components/ app/`
- Vypnutí hooků: `node .claude/skills/impeccable/scripts/hook-admin.mjs off`
- Falešný poplach se řeší **cíleně na řádku**
  (`// impeccable-disable-next-line <rule>: důvod`), ne plošným vypnutím
  pravidla. Pozor: text zdůvodnění nesmí sám obsahovat vzor, který
  pravidlo hledá — jinak se ignore komentář stane novým nálezem.

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

- **Uvádět na webu jakoukoli cenu (od 2026-08-09).** Web nikde neuvádí
  konkrétní cenu ani cenové rozmezí — ani orientační, ani „od X". Platí to
  pro viditelné texty, datovou vrstvu v `lib/`, i pro structured data
  (`lib/json-ld.ts` nesmí obsahovat `Offer`/`priceSpecification`). **Cena se
  sděluje výhradně na konzultaci.** Sekce Ceník, `lib/pricing.ts` a
  `pricingServiceJsonLd()` byly z tohoto důvodu smazané — pokud na ně někde
  narazíš, je to nedokončený úklid, ne platný stav. Zvlášť pozor na nově
  vznikající sekce (Služby): nikdy tam nesmí přibýt cena ani tlačítko vedoucí
  na ceník.
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
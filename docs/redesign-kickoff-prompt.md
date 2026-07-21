# Redesign kickoff prompt — AvenIQ web nové generace

> **Jak tento dokument použít:** Vlož ho jako první zprávu do Claude Code
> otevřeného v repu `AI-automatizace-`. Claude Code už v repu má `claude.md`
> a `AGENTS.md` s trvalými pravidly projektu (fázová kázeň, zákaz tichých
> odhadů, design systém, cílová skupina) — tento prompt je **navazuje**, ne
> nahrazuje. Kde si tento prompt a `claude.md` odporují (typicky barevná
> paleta), to je vědomé a je to popsané ve Fázi R0 níže — je to nové
> rozhodnutí, které má `claude.md` explicitně aktualizovat, ne ho ignorovat.

---

## 0. Kontext — shrnutí toho, co v repu skutečně je

Než začneš cokoliv měnit, tady je stav, jak ho vidím po analýze repozitáře
(over si ho sám přes `git log`, `claude.md`, `AGENTS.md` a soubory níže —
neber tohle shrnutí jako náhradu vlastního ověření):

- **Stack:** Next.js 16 (App Router, TS strict), Tailwind CSS v4
  (CSS-first `@theme`), React 19, Neon + Drizzle ORM, Server Actions.
  Homepage je poskládaná v `app/page.tsx` z 13 sekcí v `components/home/`
  (Hero → StatsBar → Differentiators → WhyAutomation → AutomationAreas →
  HowWeBuild → ProcessSteps → Pricing → Guarantee → About → FAQ →
  Collaboration → FinalCTA).
- **Aktuální design:** tmavá `zinc` paleta + jediný vlastní akcent
  `brand-gold` (#B98B4E), striktně jen na CTA. V `globals.css` už existuje
  **rozpracovaný, zatím nepoužitý** druhý akcent `brand-electric` (#22D3EE,
  studená tyrkysově-modrá) — přesně směr, který teď chceš rozjet naplno.
  Toto je dobrá zpráva: nezačínáš od nuly, jen dotáhneš rozhodnutí, které
  už bylo v projektu jednou navržené.
- **Obsah:** Texty jsou věcně správné a poctivé (žádné vymyšlené reference,
  žádný předstíraný tým), ale psané B2B jazykem plným zkratek a pojmů
  (CRM, workflow, onboarding, API, KPI, "vytěžování dat pomocí AI" apod.) —
  přesně to, co chceš zjednodušit na "rozumí i babička".
- **Cílovka a tým (fakticky potvrzeno v `claude.md`):** živnostníci,
  agentury, malé a střední firmy, účetní a marketingové firmy. AvenIQ je
  **jednočlenný projekt** (Kryštof Sobotka) — žádná sekce nesmí předstírat
  tým, který neexistuje.
- **Lead formulář (`FinalCTA.tsx`)** už dnes obsahuje pole "Co vás ve firmě
  aktuálně nejvíc zdržuje?" — je to zárodek toho, co chceš rozšířit do
  plnohodnotného "popište, co chcete automatizovat" kroku.
- **Sekce Spolupráce** má textové wordmarky (EstatIQ, ZakazIQ, VIZEON) —
  to jsou propojené projekty, ne klienti/reference, a nesmí se tak tvářit.
- **Reference weby:**
  - `digitalagents.cz` se mi podařilo načíst kompletně (statický HTML
    výstup) — jeho strukturu (živý "AI agenti pracují 24/7" feed v Hero,
    sekce "S čím firmám pomáháme" s mini animovanými diagramy, "Od analýzy
    k fungujícímu systému" ve 4 krocích, "Napojíme se na nástroje, které
    už používáte", "Pro koho stavíme", "Kdo stojí za...", FAQ, "Vyberte si
    termín konzultace") mám zdokumentovanou přesně a rozpadám ji na fáze
    níže.
  - `automatizace-ai.cz` (agentura REVAI) je čistě JS aplikace (SPA), takže
    se z ní nedal stáhnout kód — **ale uživatel dodal 5 screenshotů hero
    sekce**, takže animace je teď zdokumentovaná přesně, ne odhadem:
    scrollytelling animace v hlavní vizuální ploše (vpravo) ukazuje
    fasetovanou 3D kouli obklopenou "rozpadlými" kostkami/úlomky, které se
    v průběhu 5 kroků postupně organizují a napojují na kouli fialovými
    "kabely". Vlevo běží synchronně karta s velkým číslem kroku (01–05),
    jednoslovnou kategorií (CHAOS, TŘÍDĚNÍ, SPUŠTĚNÍ, PROPOJENÍ, VÝSTUPY),
    krátkým 3–5slovým nadpisem (např. "Manuální práce zahlcuje váš tým.")
    a **jednou** krátkou větou popisu. Vpravo úplně na kraji je svislý
    ukazatel kroku 01–05 (tečky/linky, aktivní zvýrazněná). V posledním
    kroku se úlomky proměňují na kostky popsané reálnými názvy nástrojů/
    kategorií (CRM, Leads, Marketing, Workflow, Analytics, Documents,
    Database, Voice) propojené fialovými "kabely" do centrální koule — a
    teprve tady se objevuje CTA tlačítko "Rezervovat konzultaci". Tohle je
    přesně ten typ **"velké interaktivní animace, co vysvětluje, co
    automatizace je"**, kterou uživatel chce mít jako svou vlajkovou loď —
    rozpracováno do Fáze R3 níže, v modré barvě místo fialové a s vlastním,
    přeformulovaným textem (viz právní hranice níže).

- **Nové zadání k obsahu (tato zpráva uživatele):** dosavadní "babička
  test" z první verze promptu nestačí — nejde jen o vysvětlení pojmů, ale o
  **razantní zkrácení**. Cíl: na první pohled (bez čtení) je jasná hlavní
  myšlenka sekce, text je jen doplněk k vizuálu, ne nosič informace. Navíc
  uživatel chce **nové interaktivní kruhy s logy nástrojů** (Gmail,
  Notion, Slack a řada dalších) — jasně samostatný, silnější požadavek než
  původní "marquee pás log" z první verze, viz přepracovaná Fáze R4/R7
  níže.

⚠️ **Právní hranice, kterou je potřeba hlídat po celou dobu:** inspirace
strukturou, konceptem sekce a UX vzorem je v pořádku. **Doslovné kopírování
kódu, textů, ilustrací nebo přesné vizuální identity (barvy loga, fonty,
kompozice 1:1) konkurenčního webu není** — jde o cizí duševní vlastnictví.
Každou "inspirovanou" sekci níže stavíš jako **vlastní, přeinterpretovanou
implementaci konceptu**, ne jako klon.

---

## 1. Otevřené otázky — polož je uživateli PŘED Fází R0, nehádej

Podle vlastního pravidla `claude.md` ("žádné tiché odhady u textů, cen a
obchodní logiky") potřebuješ od uživatele explicitně:

1. **Fotka Kryštofa** — soubor, formát, případně preferovaný oříznutí/styl
   (viz Fáze R8). Bez reálného souboru se sekce nedá dokončit.
2. **Skutečný seznam nástrojů**, se kterými AvenIQ reálně umí/chce
   propojovat (n8n je jasné z `About.tsx` — ale kompletní seznam pro
   sekci "Napojíme se na nástroje, které už používáte" typu Gmail, Google
   Workspace, Microsoft 365, Slack, WhatsApp, Shopify, Stripe, konkrétní
   CRM apod.) — **žádná fiktivní loga**, to je tvrdý zákaz i v `AGENTS.md`.
3. **Přesná definice nové barvy** — zůstává `brand-gold` jako druhotný
   akcent (např. jen na "Rezervovat konzultaci" CTA), nebo ho modrá
   kompletně nahrazuje všude? Tmavé pozadí (navazuje na dnešní `zinc-950`)
   nebo posun ke světlejšímu/hybridnímu vzhledu?
4. **Rezervační nástroj** pro "Vyberte si termín konzultace" — reálný
   odkaz/embed (Cal.com, Calendly, ZakazIQ, jiné), ne placeholder navždy.
5. ~~Screenshoty/popis animace z `automatizace-ai.cz`~~ — **VYŘEŠENO**,
   uživatel dodal 5 screenshotů, přesný popis je v sekci 0 výše a
   rozpracování v Fázi R3. Jediné, co k tomu ještě chybí: potvrdit, že
   **reálné názvy kostek** v poslední fázi animace (dnes u REVAI: CRM,
   Leads, Marketing, Workflow, Analytics, Documents, Database, Voice) se u
   AvenIQ nahradí buď (a) skutečnými nástroji z otázky 2, nebo (b) šesti
   oblastmi automatizace z `lib/automation-areas.ts` (Marketing, Interní
   procesy, Zákaznická podpora, Práce s daty, Reporty, Účetnictví) — obojí
   dává smysl, ale je to jiný obsah, tak to nezaměňuj bez rozhodnutí.
6. **Zůstává 6 kroků procesu** (`lib/process-steps.ts`) tak jak jsou, jen
   se vizuálně přebalí do 4 "velkých" fází pro homepage (Analýza → Návrh →
   Stavba → Podpora), zatímco `/proces-prace` si nechá všech 6 v detailu?
   Nebo se má reálně zkrátit obsah na 4 kroky všude?

Dokud tyhle body nejsou zodpovězené, nezačínej Fázi R3–R9, které na nich
závisí. Fáze R0–R2 (governance, paleta, jazykový standard) můžeš rozjet
souběžně, protože na nich nezávisí.

---

## 2. Průběžná pravidla pro celý redesign (nadstavba nad `claude.md`)

- Pracuj **fázi po fázi**, po každé se zastav, shrň co bylo uděláno, jaké
  předpoklady čekají na schválení, a počkej na "pokračuj" — přesně jak
  žádá stávající `AGENTS.md`.
- **Jazykový standard "babička test 2.0"** platí od Fáze R2 dál pro
  každou novou nebo upravovanou větu na webu — je přísnější než v první
  verzi tohoto promptu, protože uživatel výslovně žádá razantní zkrácení,
  ne jen zjednodušení:
  - **Vizuál nese myšlenku, text jen doplňuje.** Každá sekce musí dávat
    smysl i s vypnutým textem, jen z vizuálu/ikony/animace/čísla. Text se
    píše až po vizuálu, ne naopak.
  - **Nadpis sekce: max. 3–6 slov.** Jedna hlavní myšlenka, žádné souvětí.
  - **Popisný text pod nadpisem: max. 1 věta, do ~12 slov.** Pokud věta
    potřebuje spojku "a zároveň" nebo čárku s vedlejší větou, rozděl ji na
    dvě samostatné myšlienky, nebo jednu z nich přesuň jinam/vyhoď.
  - Žádná zkratka bez vysvětlení v závorce při prvním výskytu (ne "CRM",
    ale krátké vysvětlení v `TermTooltip`, viz níže) — ale primární cesta
    je zkratce se úplně vyhnout jednodušším slovem, ne ji jen vysvětlit.
  - Odstavce o více větách (jaké má dnes např. `About.tsx`) se ve
    viditelné ploše homepage **neobjevují** — patří nanejvýš do
    rozkliknutého detailu/podstránky, ne do hlavního scrollu.
  - Před odevzdáním každé fáze, která mění copy, si text přečti nahlas z
    pohledu člověka, co o automatizaci v životě neslyšel a nikdy nečte
    dlouhé odstavce na webu — pokud by ho druhá věta už nudila, zkrať.
- Žádná nová barva mimo to, co se odsouhlasí ve Fázi R0/R1 — stejné
  pravidlo jako dřív u `brand-gold`, teď jen pro modrou.
- Žádné nové závislosti (3D/WebGL knihovny, animační frameworky navíc)
  bez návrhu a souhlasu — animace typu "kostka" jde postavit čistým
  CSS 3D transform (`rotateX/rotateY`, `perspective`) bez těžké knihovny;
  to navrhni jako výchozí variantu a teprve pokud nebude stačit, navrhni
  konkrétní knihovnu k odsouhlasení.
- Respektuj `prefers-reduced-motion` u každé nové animace (v repu už je
  precedens v `globals.css`).
- Nepřepisuj ceny, čísla, motta ani právní texty bez výslovného souhlasu.
- Kde reálný podklad (logo, foto, přesný text nástroje) chybí, nahraď ho
  jasně označeným placeholderem a **na konci fáze ho vypiš v seznamu "co
  ještě potřebuji"** — nikdy nevymýšlej náhradu, aby to vypadalo hotověji.

---

## Fáze R0 — Governance: aktualizace `claude.md` a `AGENTS.md`

**Cíl:** promítnout uživatelovo nové rozhodnutí (interaktivní modrá místo
zlaté jako primární identita) do závazných provozních dokumentů, než se
dotkneš jediné komponenty — jinak je zbytek buildu v rozporu s vlastním
zdrojem pravdy projektu.

**Rozsah:**
- Aktualizuj sekci "Design systém" v `claude.md` i `AGENTS.md`: nový
  primární akcent (na základě odpovědi na otázku 3 výše), status
  `brand-gold` (ponechán jako sekundární CTA akcent / zcela nahrazen),
  nová paleta pozadí, pokud se mění.
- Přidej do `claude.md` novou sekci "Redesign 2026 — cíl a inspirace" s
  odkazem na tento dokument, aby budoucí session měly kontext, proč se
  paleta měnila podruhé.
- Nezasahuj do žádné vizuální komponenty v této fázi — jen dokumentace.

**Na konci fáze:** shrň přesné nové hodnoty tokenů, které navrhuješ do
`@theme` bloku, a počkej na schválení přesných hex kódů, než přejdeš do R1.

---

## Fáze R1 — Nový barevný a typografický systém (`/design-preview`)

**Cíl:** postavit novou "interaktivní modrou" identitu izolovaně na
`/design-preview`, přesně jak to `claude.md` už předepisuje jako proces
pro změnu palety — než se rozšíří napříč komponentami.

**Rozsah:**
- V `app/globals.css` povýšit `--color-brand-electric` z návrhu na
  potvrzený primární token (případně upravit odstín podle zpětné vazby),
  přidat odvozené hodnoty pro hover/glow stavy (např. `brand-electric/10`,
  `/20` průhlednosti pro glow pozadí — v Tailwindu v4 přes opacity modifier,
  ne nové vlastní tokeny).
- Na `/design-preview` ukázat vedle sebe: primární CTA tlačítko, kartu s
  glow efektem (navazuje na existující `GlowCard.tsx`, jen s novým
  akcentem), nadpis, odkaz, badge/tag prvek — tak, aby šlo jedním pohledem
  posoudit celý systém, ne jen jednu komponentu.
- Ověř kontrast (WCAG AA) nové modré na tmavém pozadí — v repu už běžel
  Lighthighthouse audit na kontrast dřív (viz git log fáze 9), stejnou
  laťku drž i teď.

**Na konci fáze:** počkej na vizuální schválení z `/design-preview`, než
přepneš zbytek webu (přesně proces, který `claude.md` už vyžaduje).

---

## Fáze R2 — Jazykový standard a "babička" glosář

**Cíl:** vytvořit pravidlo a lehkou technickou pomůcku pro zjednodušení
obsahu dřív, než se přepisuje sekce po sekci — aby se přístup neřešil
znovu a jinak v každé další fázi.

**Rozsah:**
- Přidej do `claude.md`/`AGENTS.md` krátkou sekci "Jazykový standard" s
  pravidlem z bodu 2 výše (babička test), aby přežilo kompresi konverzace.
- Zvaž (navrhni, počkej na souhlas) drobnou komponentu `TermTooltip` —
  podtržený pojem s tooltipem/rozkliknutím vysvětlení (např. "CRM ⓘ" →
  "systém, kde firma eviduje své zákazníky") pro místa, kde se zkratce
  úplně nejde vyhnout (typicky v `/automatizace/[slug]` podstránkách).
- Nepřepisuj zatím celý obsah — to se děje uvnitř každé následující fáze u
  konkrétní sekce. Tahle fáze jen ustavuje pravidlo a nástroj.

---

## Fáze R3 — Hero: velká scrollytelling animace "co je automatizace"

**Cíl:** tohle je nová **vlajková** sekce webu — nahrazuje dnešní statický
`FlowDiagramLazy` i původní nápad "živý feed + kostka zvlášť" jedním
sjednoceným, silným interaktivním celkem po vzoru konceptu z
`automatizace-ai.cz` (viz sekce 0), přeloženým do vlastní modré identity a
vlastního textu. Tahle animace zároveň plní roli, o kterou uživatel žádal
samostatně: "velká interaktivní animace, kde vysvětlíš, co automatizace
je" — nepotřebuješ pro to druhou, oddělenou sekci.

**Koncept (vlastní reinterpretace, ne klon):**
- Layout dva sloupce jako v referenci: vlevo text karta, vpravo velká 3D
  vizuální plocha. Vpravo úplně na okraji svislý ukazatel kroku 01–05.
- **5 kroků, vázaných na scroll** (uživatel projede kroky posouváním
  stránky nebo klikem na ukazatel vpravo — obojí musí fungovat):
  1. `CHAOS` — vizuál: rozptýlené, neuspořádané úlomky/ikony kolem
     centrálního tvaru. Nadpis (3–6 slov) + 1 věta o neuspořádané ruční
     práci.
  2. `TŘÍDĚNÍ` — úlomky se začínají řadit směrem k centru, centrální tvar
     se "rozsvěcí". Nadpis + 1 věta o tom, že systém sám pozná, co kam
     patří.
  3. `SPUŠTĚNÍ` — úlomky se proměňují v uspořádané kostky okolo centra.
     Nadpis + 1 věta o tom, že úkoly teď běží samy.
  4. `PROPOJENÍ` — kostky se popíšou konkrétními štítky (viz níže) a
     vizuálně přiblíží centru. Nadpis + 1 věta o propojení nástrojů.
  5. `VÝSTUPY` — kostky se propojí s centrem viditelnými "kabely" (v naší
     verzi modrými, ne fialovými), objeví se CTA tlačítko. Nadpis + 1 věta
     o výsledku (ušetřený čas/přehled) + CTA "Rezervovat konzultaci
     zdarma" (zachovává dnešní `MagneticLink` mechaniku a cílí na
     `/#kontakt`).
- **Centrální tvar:** fasetovaná koule/geoda s jemným vnitřním modrým
  glow prstencem (CSS: `radial-gradient` + `box-shadow`/`filter: blur`
  vrstvy, případně jednoduchý statický 3D render jako obrázek/SVG, pokud
  živé 3D geometrii v CSS nedává dost věrný výsledek — navrhni obě
  varianty k posouzení, než zvolíš).
- **Štítky na kostkách v krocích 4–5:** obsah podle rozhodnutí z otevřené
  otázky 5 (buď reálné nástroje z otázky 2, nebo 6 oblastí automatizace z
  `lib/automation-areas.ts`) — nikdy nekopíruj doslova štítky z reference
  (CRM/Leads/Marketing/Workflow/Analytics/Documents/Database/Voice), i
  když se s vlastním obsahem mohou částečně překrývat.
- **Texty:** striktně podle jazykového standardu z Fáze R2 — nadpis
  max. 6 slov, popis max. 1 věta/~12 slov, žádný žargon. Referenční
  "Manuální práce zahlcuje váš tým." je dobrý vzor délky a srozumitelnosti
  k napodobení stylem, ne obsahem.

**Technicky:**
- Postav na scroll-driven aktivaci kroku (Intersection Observer nebo
  scroll-linked state), ne na automatickém časovači, který uživatel
  nemůže ovlivnit — je to čtenářsky přívětivější a odpovídá "interaktivní"
  zadání.
- Nejdřív zkus čisté CSS/SVG + malý JS pro řízení kroku (bez nové těžké
  knihovny). Pokud plynulost/kvalita neodpovídá referenci, navrhni
  konkrétní lightweight knihovnu (např. pro scroll-linked animace) k
  odsouhlasení — nepřidávej ji mlčky.
- Nutně respektuj `prefers-reduced-motion`: bez animace ukaž rovnou
  poslední/klíčový stav (krok 5) staticky, ne rozbitou animaci napůl.
- Na mobilu (dotyk, menší plocha) ověř, že ukazatel kroku a karta textu
  zůstávají čitelné a tvar/úlomky se nezmenší pod srozumitelnou velikost —
  klidně zjednoduš počet úlomků na mobilu, pokud to zlepší čitelnost.

**Na konci fáze:** ukaž hotovou animaci (odkaz na živý náhled), uveď,
kterou variantu centrálního tvaru jsi zvolil a proč, a potvrď, které
štítky kostek jsi použil podle rozhodnutí u otázky 5.

---

## Fáze R4 — "Pracujeme s ověřenými systémy" (interaktivní kruhy s logy)

**Cíl:** sekce důvěryhodnosti hned pod Hero — nový, výslovný požadavek
uživatele nahrazuje původní nápad "marquee pás" **interaktivními kruhy**:
loga reálných nástrojů (Gmail, Notion, Slack a další z otázky 2) obíhají
nebo jsou rozmístěná po obvodu jednoho nebo více soustředných kruhů kolem
centrálního bodu/textu, s jemným pohybem a reakcí na hover/tap.

**Rozsah:**
- **Základní varianta (výchozí, postav jako první):** 1–2 soustředné
  kruhy (`border-radius: 50%`, čisté CSS/SVG), na jejichž obvodu jsou
  rozmístěná loga nástrojů jako malé kulaté "chipy". Vnější kruh se
  pomalu, plynule otáčí (CSS `@keyframes rotate` + `perspective` na
  jednotlivých logách, aby zůstala čitelná/nevzhůru nohama — logo samo o
  sobě rotaci "kontruje", běžný trik u orbit-diagramů). Uprostřed kruhu
  krátký text/logo AvenIQ nebo ikona spojující všechny nástroje.
- Hover/tap na jednotlivém logu: zpomalí/zastaví rotaci celého kruhu (ne
  jen daného loga), zvýrazní logo modrým glow, případně ukáže jednu
  krátkou bublinu s příkladem použití (max. ~8 slov) — volitelné
  rozšíření, ne povinná součást základního rozsahu.
- **Reálná SVG loga** nástrojů ze seznamu v otázce 2 — u veřejně známých
  nástrojů (Gmail, Slack, Notion, WhatsApp apod.) jde o standardní brand
  logo, obvykle v monochrome/šedé variantě vhodné pro partnerský pás; u
  žádného nástroje si logo nevymýšlej ani negeneruj — chybějící logo je
  jasně označený placeholder.
- Krátký nadpis (3–6 slov) + max. 1 věta v jazyce babičky, např. "Napojíme
  se na nástroje, které už znáte." — bez dalšího vysvětlujícího odstavce.
- **Mobil:** otáčející se kruh s mnoha logy se na malé obrazovce špatně
  čte — navrhni zjednodušenou mobilní variantu (např. statická mřížka log
  místo rotace, nebo menší kruh s méně položkami) a ukaž ji ke schválení
  spolu s desktop verzí, ne až dodatečně.
- **Vztah k Fázi R7 níže:** tahle sekce (R4) je krátká, důvěryhodnostní,
  hned pod Hero — Fáze R7 je samostatná, obsahově bohatší sekce hlouběji
  na stránce ("nemusíte nic měnit"). Obě mohou sdílet stejnou vizuální
  komponentu kruhu (postav ji jako jednu znovupoužitelnou komponentu), ale
  nejsou to duplicitní sekce — R4 = krátký důkaz důvěryhodnosti, R7 =
  přesvědčení + případně širší seznam nástrojů.

**Na konci fáze:** vypiš přesně, která loga máš a která ještě chybí
(placeholder), a ukaž mobilní i desktop variantu ke schválení.

---

## Fáze R5 — "S čím firmám pomáháme" (interaktivní karty)

**Cíl:** převzít UX koncept mřížky karet s mini animovaným diagramem z
`digitalagents.cz`, ale napojit na **reálný obsah AvenIQ**
(`lib/automation-areas.ts` — Marketing, Interní procesy, Zákaznická
podpora, Práce s daty, Reporty, Účetnictví), ne na cizí kategorie.

**Rozsah:**
- 6 karet (1:1 podle existujících `automationAreas`), každá s:
  - **nadpisem max. 3–4 slova** (dnešní `title`, např. "Marketing" — v
    pořádku beze změny) a **max. 1 zkrácenou větou** — dnešní `lead` pole
    je delší, než nový standard dovoluje (viz Fáze R2), zkrať ho na
    ~8–12 slov s jednou hlavní myšlenkou, ne dvěma spojenými přes pomlčku.
  - malou animovanou mini-vizualizací procesu na kartě jako **hlavním**
    prvkem karty, ne doplňkem (2–4 kroky, šipky/tečky, jemný modrý
    akcent) — vlastní jednoduchá SVG/CSS animace na míru dané oblasti, ne
    generický diagram kopírovaný 1:1 z referencí. Karta má fungovat i s
    okem zavřeným pro text — vizuál sám naznačí "vstup → zpracování →
    výstup".
  - odkazem na příslušnou `/automatizace/[slug]` podstránku s plným
    obsahem (ta struktura v repu už existuje a nemění se — **tam** smí
    zůstat delší, plnohodnotný text, homepage karta je jen "trailer").
- Responsivní mřížka (2–3 sloupce desktop, 1 sloupec mobil), karty
  reagují na hover/tap zvýrazněním (ne jen barvou — jemný posun/scale).

**Na konci fáze:** ukaž u všech 6 karet původní `lead` text vedle nové
zkrácené verze (před/po) jako důkaz, že prošly novým standardem stručnosti.

---

## Fáze R6 — "Od analýzy k fungujícímu systému" (proces)

**Cíl:** vizuálně silnější, interaktivní timeline navazující na koncept
4krokového procesu z `digitalagents.cz`, ale beze změny reálného obsahu
kroků, dokud to uživatel výslovně nepotvrdí (viz otázka 6).

**Rozsah — varianta A (výchozí, pokud uživatel nepotvrdí zkrácení):**
- Zachovej všech 6 kroků z `lib/process-steps.ts` jako jediný zdroj
  pravdy (žádný nový, konkurenční seznam kroků) — mění se **jen** jejich
  homepage zobrazení, ne obsah v `/proces-prace`.
- Přebal je vizuálně do interaktivní horizontální/vertikální timeline s
  velkými čísly, aktivním (zvýrazněným) krokem podle scrollu nebo kliku,
  jemnou modrou spojnicí mezi kroky, která se "rozsvěcí" postupně — vizuálně
  stejná rodina komponent jako svislý ukazatel kroku 01–05 z Fáze R3, ať
  web působí jako jeden systém, ne sbírka různých vzorů.
- Na homepage se z každého `body` textu kroku zobrazí jen **zkrácená
  verze do ~10–14 slov** (ne plný odstavec z `process-steps.ts`) — plné
  znění zůstává dostupné na `/proces-prace` nebo po rozkliknutí kroku.

**Rozsah — varianta B (jen po výslovném souhlasu):**
- Na homepage ukázat zastřešující 4 fáze (Analýza → Návrh → Stavba →
  Podpora) jako "velké" kroky, každý rozbalitelný na detail se skutečnými
  dílčími kroky z `lib/process-steps.ts` uvnitř — obsah se nekrátí, jen
  se homepage zobrazení zjednodušší o úroveň.

**Na konci fáze:** uveď, kterou variantu jsi implementoval a proč (podle
odpovědi uživatele), a jak to ovlivňuje `/proces-prace` podstránku (ta
zůstává zdroj plného detailu v obou variantách).

---

## Fáze R7 — "Napojíme se na nástroje, které už používáte"

**Cíl:** samostatná, širší sekce (odlišná od Fáze R4 trust stripu výše —
R4 je o důvěryhodnosti hned pod Hero, tahle sekce je hlouběji na stránce a
cílí na konkrétní přesvědčení "nemusíte nic měnit").

**Rozsah:**
- Znovupoužij komponentu interaktivního kruhu z Fáze R4 (nebo, pokud je
  seznam nástrojů v otázce 2 delší než pár kusů, doplň ji o druhý, větší
  vnější kruh/druhou vrstvu) — nestav paralelně druhý vizuální jazyk pro
  totéž téma "nástroje", jen s jinou hustotou obsahu.
- Jedna babička-friendly věta nad kruhem, max. ~10 slov, např. "Nemusíte
  kupovat nic nového. Napojíme se na to, co už máte."
- Volitelně (jen pokud dá uživatel souhlas a je to technicky přiměřené):
  interaktivní prvek, kde uživatel klikne na svůj nástroj a uvidí krátký
  příklad, co se s ním dá automatizovat — ale tohle je **rozšíření nad
  rámec základní fáze**, navrhni ho jako volitelný dodatek, ne jako
  součást základního rozsahu R7.

**Na konci fáze:** vypiš finální seznam zobrazených nástrojů a případné
chybějící ikony/loga k doplnění.

---

## Fáze R8 — Sekce o zakladateli: fotka + redesign `About`

**Cíl:** přiblížit člověka za AvenIQ (koncept "Kdo stojí za..." z
`digitalagents.cz`), s reálnou fotkou a beze změny poctivého tónu, který
`About.tsx` už dnes má (jednočlenný projekt, žádné nadsazování).

**Rozsah:**
- Zasaď dodanou fotku Kryštofa (z otázky 1) do vizuálně silné karty vedle
  existujícího textu (`GlowCard` se stejnou logikou jako `Guarantee`/
  `philosophyPoints`, jen s portrétem).
- Zachovej existující poctivý text o jednočlenném projektu — neredukuj ho
  na obecnou "o nás" frázi, poctivost je tu záměr, ne slabina.
- Přidej odkaz na LinkedIn, pokud ho uživatel poskytne (v `digitalagents.cz`
  je to standardní vzor "Spojit se na LinkedIn").
- Over celý text About sekce babička testem — dnešní text je čitelný, ale
  místy dlouhý souvětí; zkrať a zjednoduš, fakta neměň.

**Na konci fáze:** ukaž vizuální umístění fotky, počkej na schválení
oříznutí/kompozice.

---

## Fáze R9 — "Vyberte si termín konzultace" + rozšířený intake formulář

**Cíl:** spojit dva požadavky uživatele do jednoho kroku: (a) vizuálně
samostatná booking sekce jako u `digitalagents.cz`, (b) klient si sám
popíše, co chce automatizovat, než konzultaci vůbec rezervuje.

**Rozsah:**
- Booking blok: embed/odkaz na reálný rezervační nástroj z otázky 4 (bez
  reálného nástroje zůstává jasně označený placeholder — nevymýšlet
  fiktivní kalendář).
- Rozšíř dnešní `FinalCTA` formulář (pole "Co vás ve firmě aktuálně
  nejvíc zdržuje?" už existuje) o strukturovanější, ale pořád jednoduchý
  krok:
  - jaké nástroje dnes ve firmě používá (volitelný multi-select z
    nástrojů z Fáze R7 + "jiné" textové pole),
  - co konkrétně by chtěl automatizovat (rozšíření dnešního `blocker`
    pole nebo druhé volné textové pole),
  - zachovej existující pole jméno/e-mail/telefon/web firmy/souhlas GDPR.
- **Databázová vrstva:** pokud nové pole vyžaduje rozšíření `db/schema.ts`
  (např. samostatný sloupec `toolsUsed` vedle existujícího `blocker`),
  **nejdřív navrhni migraci a počkej na souhlas** — přesně jak `AGENTS.md`
  vyžaduje u schema změn. Neuprav DB rovnou.
- Zvaž rozdělení do dvou kroků (mini-wizard: 1. kontakt, 2. o firmě/co
  chce automatizovat) jen pokud to zlepší dokončovací poměr a nezvýší
  komplexitu neúměrně — jinak zůstaň u jednoho jednoduchého formuláře,
  jednoduchost je tu prioritnější než "wow efekt".

**Na konci fáze:** shrň přesně jaké nové pole/sloupec navrhuješ do DB a
počkej na výslovné schválení před migrací.

---

## Fáze R10 — Kompletní QA: babička test, přístupnost, výkon

**Cíl:** finální průchod celým webem s hotovou modrou identitou a novým
obsahem, než se prohlásí za hotové.

**Rozsah:**
- Projdi **každou** sekci a zkontroluj podle standardu z Fáze R2: žádný
  nevysvětlený technický pojem, žádný nadpis nad ~6 slov, žádný popisný
  text nad ~12–14 slov/1 větu ve viditelné ploše homepage, žádný vícevětý
  odstavec mimo podstránky/rozklikávací detail. Pokud sekce dává smysl,
  jen když se text přečte celý, ještě není hotová.
- Zkontroluj kontrast nové modré na `zinc-950`/`zinc-900` (WCAG AA),
  `prefers-reduced-motion` chování u všech nových animací (feed, kostka,
  mini-diagramy karet, marquee), mobilní zobrazení všech nových
  interaktivních prvků (kostka a mini-diagramy zvlášť — často se na
  mobilu chovají jinak než na desktopu s myší).
- Spusť stejný typ Lighthouse auditu, jaký proběhl v původní Fázi 9 (git
  historie `c7d0d1c`), a oprav regrese, pokud nové animace zhorší
  výkon/CLS.
- Sestav finální seznam **otevřených bodů** (chybějící loga, nedodaná
  fotka, nepotvrzený rezervační nástroj apod.) jako checklist pro
  uživatele — nic z toho se nesmí tvářit jako hotové, pokud hotové není.

**Na konci fáze:** kompletní shrnutí celého redesignu, screenshoty/odkaz
na živý náhled, a čistý seznam toho, co ještě čeká na reálný podklad od
uživatele.

---

## Shrnutí pořadí fází

| Fáze | Obsah | Závislé na odpovědi z bodu 1 |
|---|---|---|
| R0 | Aktualizace `claude.md`/`AGENTS.md` | 3 |
| R1 | Nová paleta na `/design-preview` | 3 |
| R2 | Jazykový standard 2.0 + glosář nástroj | — |
| R3 | Hero: scrollytelling "co je automatizace" | 2, 5 |
| R4 | Interaktivní kruhy "ověřené systémy" | 2 |
| R5 | Karty "S čím pomáháme" (zkrácené) | — |
| R6 | Proces "Od analýzy k systému" (zkrácený) | 6 |
| R7 | "Napojíme se na nástroje" (širší kruh) | 2 |
| R8 | Fotka + redesign About | 1 |
| R9 | Booking + rozšířený formulář | 4 |
| R10 | QA a babička test | — |

Postupuj přesně v tomto pořadí, fázi po fázi, se stopkou po každé z nich.

---

## Dodatek — rozhodnutí potvrzená ve Fázi R0 (2026-07-21)

Otevřené otázky výše z bodu 1 byly položeny uživateli přes `AskUserQuestion`
před zahájením Fáze R0. Odpovědi (promítnuté i do `claude.md`, sekce
"Redesign 2026 — cíl a inspirace"):

- **Otázka 3 (barva):** `brand-electric` (#22D3EE, beze změny odstínu) se
  povyšuje na primární interaktivní barvu; `brand-gold` zůstává výhradně
  na CTA tlačítku. Pozadí se posouvá směrem ke světlejšímu/hybridnímu
  tónu — přesný odstín je otevřený bod, řeší se ve Fázi R1 na
  `/design-preview`.
- **Otázka 6 (proces):** Varianta A potvrzena — všech 6 kroků v
  `lib/process-steps.ts` zůstává beze změny, homepage (Fáze R6) je jen
  vizuálně přebalí a zkrátí popisky.
- **Otázky 1, 2, 4 a rozhodnutí u otázky 5** (fotka, seznam nástrojů,
  rezervační nástroj, štítky kostek) zůstávají otevřené — nejsou
  blokující pro R0/R1/R2, ale musí se vyřešit přímým dotazem na uživatele
  dřív, než začnou fáze R3, R4, R7, R8, R9 (viz tabulka závislostí výše).

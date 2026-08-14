# Rebrand AvenIQ → ALTENO — sdílený kontext

Živý pracovní soubor pro rebrand zahájený 2026-08-14. **Každý agent, který na
rebrandu pracuje, si ho přečte před začátkem a na konci do něj doplní svůj
záznam.** Není to historický dokument jako `docs/plan-repozice-2026-08.md` —
tenhle se průběžně dopisuje, aby další agent věděl, co už proběhlo a na co
narazil.

## Rozhodnutí uživatele (2026-08-14)

| Věc | Rozhodnutí |
|---|---|
| Nový název | **ALTENO** — verzálkami, přesně jak v logu. Nahrazuje „AvenIQ“ všude v živém kódu. |
| Heslo „Automatizujeme. Propojujeme. Zrychlujeme.“ | **Jen jako doprovod loga (lockup)** — navbar, patička, vizuál u loga. **Nenahrazuje hero claim.** |
| Hero claim | **Beze změny**: „Vy řešíte byznys. Rutinu automatizujeme my.“ Zůstává v H1 i `<title>`. Důvod je SEO: claim nese klíčové sloveso i cílovku, tři izolovaná slovesa v heslu ne. |
| Paleta | **Beze změny.** Akcent v logu je `#45D0C1`, token `brand.turquoise` je `#2DD4BF` — prakticky shodné. Žádný nový token. |
| Historické dokumenty v `docs/` | **Nepřepisují se.** `plan-repozice-2026-08.md`, `redesign-kickoff-prompt.md`, `kickoff-prompt.md`, `AvenIQ-analyza-a-strategie.md`, `navazujici-prompty.md` jsou záznamy rozhodnutí v čase — starý název v nich je správně. |
| Formátování | `eslint --fix`, **ne Prettier** (není v projektu, první běh by přeformátoval i nesouvisející kód). |

## Assety loga (hotovo, commit c54f560)

Odvozené z `~/Downloads/ALTENO LOGO.png` rekonstrukcí alfa kanálu — kresba je
prakticky premultiplikovaná nad černou, takže un-premultiply dal čisté
průhledné PNG. **Nepoužívat `mix-blend-screen`**, není potřeba.

| Soubor | Rozměr | K čemu |
|---|---|---|
| `public/alteno-logo.png` | 939×126 | Wordmark ALTENO — navbar, patička |
| `public/alteno-logo-claim.png` | 939×186 | Wordmark + tři hesla — hero vizuál, OG obrázek |
| `public/alteno-mark.png` | 168×126 | Samotný znak „A“ s tyrkysovým akcentem |
| `public/alteno-mark-square.png` | 512×512 | Znak na průhledném čtverci — favicon, ikona |

Naměřené barvy v logu: wordmark `#F1F1F1` (blízko `zinc-50`), akcent `#45D0C1`,
podklad kolem kresby `rgb(2,8,12)`.

## Mantinely, které rebrand nesmí porušit

Platí `CLAUDE.md` v rootu beze změny. Nejčastější past při hromadném
přejmenování:

- **Nesahat na hero claim** ani na jeho kopie v `app/layout.tsx`,
  `app/opengraph-image.tsx`, `app/design-preview/page.tsx`. Mění se jen název
  firmy kolem něj.
- **Nikde žádná cena** — ani orientační, ani „od X“, ani v `lib/json-ld.ts`.
- **ZakazIQ a VIZEON jsou vlastní projekty zakladatele**, nikdy klientská
  reference. Rebrand na tom nic nemění.
- **ZakazIQ se nepřejmenovává.** Je to samostatný produkt, ne AvenIQ. Pozor na
  slepé nahrazení — `components/home/ZakazIq.tsx` obsahuje obojí.
- **Hranice „já“ / „my“** zůstává: osobní sekce v 1. os. j. č., značkové „my“
  jen tam, kde mluví firma.
- Nepřidávat závislosti, neměnit tokeny v `app/globals.css`.

## Stav k 2026-08-14 — rebrand dokončen, pět otevřených bodů

Commity: `c54f560` (assety + hooky), `109e3f0` (přejmenování, 61 nahrazení
v 29 souborech), `acca176` (nasazení loga). `npm run lint` i `npm run build`
procházejí.

**Čeká na rozhodnutí uživatele — nic z toho neprovádět bez souhlasu:**

1. **Rod názvu ALTENO v češtině.** „AvenIQ“ se choval jako mužský neživotný
   („vznikl“), ale „ALTENO“ končí na -O a čtenář ho přirozeně přečte jako
   střední rod („vzniklo“, jako Tesco). Jsou to **tři místa a musí se
   změnit najednou**, jinak se homepage a podstránka rozejdou:
   `components/home/About.tsx` (~ř. 67), `app/o-mne/page.tsx` (~ř. 183)
   a `app/o-mne/page.tsx` (~ř. 33, meta description — text viditelný ve
   výsledcích vyhledávání). Až padne rozhodnutí, zapsat ho do `CLAUDE.md`.
2. **`STORAGE_KEY` / `CONSENT_EVENT` v `components/layout/CookieConsent.tsx`**
   pořád nesou `aveniq-…`. Přejmenování je jednořádkové a lokální, ale
   **zahodí uložený souhlas všem vracejícím se návštěvníkům** a cookie lišta
   se jim objeví znovu. Při změně domény je cena nulová (`localStorage` je
   vázaný na origin), takže to má smysl řešit společně s bodem 3.
3. **Doména.** `SITE_URL` je pořád placeholder `[DOPLNIT_DOMENU_PRED_DEPLOYEM]`
   v `lib/constants.ts`. V `.env.example` byl příklad `www.aveniq.cz`
   nahrazen neutrálním `www.example.cz`, ne odhadem nové adresy.

**Nalezené existující vady — nesouvisí s rebrandem, potvrzeno i na verzi
před ním:**

4. **Tlačítko mobilního menu se nevykresluje.** Na šířce 390 px není
   v hlavičce vidět (v DOM je, ale nevykreslí ani pixel); na 700 px se
   vykreslí normálně. Ověřeno i na `Navbar.tsx` z commitu `109e3f0`, tedy
   **před** nasazením loga — není to regrese rebrandu. Že jde o skutečnou
   vadu a ne o artefakt headless prohlížeče, potvrdil test: samostatné SVG
   se stejným `stroke`/`fill="none"` se v témže prohlížeči vykreslí.
   Dopad je vážný — na mobilu se nejde dostat do navigace.
5. **Navigace se na 1024 px láme na dva řádky.** Osm odkazů plus CTA se do
   šířky nevejde. Logo situaci mírně zhoršuje (179 px proti ~85 px
   původního textu), ale výpočet ukazuje, že to bylo na hraně už předtím.
   Řešení (méně odkazů, jiný breakpoint pro mobilní menu) je zásah do
   struktury navigace, tedy věc k odsouhlasení, ne tichá oprava.

## Průběh — záznamy agentů

Formát: kdo, co, na co narazil, co zbývá.

<!-- Sem dopisují jednotliví agenti. -->

### Agent 1 — layout a chrome

**Změněno (6 nahrazení v 5 souborech):**

- `components/layout/Navbar.tsx` — textový wordmark v hlavičce `AvenIQ` →
  `ALTENO` (1×). Položka navbaru „ZakazIQ“ (`/#zakaziq`) ponechána beze změny.
- `components/layout/Footer.tsx` — wordmark v patičce (1×) a copyright
  `© {rok} AvenIQ` → `© {rok} ALTENO` (1×). Odkaz „Vyrobeno vizeon.cz“
  ponechán — VIZEON je jiný projekt zakladatele, ne AvenIQ.
- `app/layout.tsx` — `title` `"AvenIQ — Vy řešíte byznys. Rutinu
  automatizujeme my."` → `"ALTENO — …"` a `openGraph.siteName` → `"ALTENO"`.
  **Hero claim uvnitř titulku je doslova beze změny**, včetně em-dash a
  mezer; měnil se jen název před ním.
- `app/opengraph-image.tsx` — wordmark v OG obrázku `AvenIQ` → `ALTENO` (1×).
  Text claimu pod linkou beze změny.
- `components/layout/CookieConsent.tsx` — **beze změny**, viz níže.

`npx tsc --noEmit` prochází (exit 0). Žádné komentáře v těchto pěti
souborech starý název neobsahovaly, takže se nic v dokumentaci kódu
nepřepisovalo.

**Na co jsem narazil:**

- **`CookieConsent.tsx` obsahuje starý název ve dvou funkčních
  identifikátorech** a záměrně jsem je nepřejmenoval:
  `const STORAGE_KEY = "aveniq-cookie-consent"` (řádek 6) a
  `const CONSENT_EVENT = "aveniq:cookie-consent-changed"` (řádek 7).
  Nejsou to viditelné texty — `STORAGE_KEY` je klíč v `localStorage`
  návštěvníka. Přejmenování je jednořádková změna, ale má vedlejší efekt:
  **všem vracejícím se návštěvníkům, kteří už souhlas udělili, se lišta
  cookies objeví znovu** a jejich uložená volba se tiše zahodí. Podle
  `CLAUDE.md` („Nevratné nebo riskantní kroky … nejdřív navrhni a počkej na
  souhlas“) to nechávám jako rozhodnutí uživatele, ne jako tichý úklid.
  Obě konstanty jsou použité **výhradně uvnitř tohoto souboru** (ověřeno
  grepem), takže případné přejmenování je bezpečné a lokální — nic jiného
  na ně nesahá. Dopad závisí na tom, jestli už web běží na produkční
  doméně: pokud ne (nebo pokud se doména mění), nestojí přejmenování nic,
  protože `localStorage` je vázaný na origin.
- **Doména ani e-mail starý název neobsahují** — grep přes celý repozitář
  (`aveniq.cz|.com|.eu|.io`, `@aveniq`) nevrátil nic. `lib/constants.ts`
  má doménu jako env proměnnou `SITE_URL` s fallbackem
  `[DOPLNIT_DOMENU_PRED_DEPLOYEM]`, takže v kódu není zadrátovaná žádná
  adresa. Jediný e-mail na webu je osobní `sobotkakrystof5@gmail.com`
  (`components/home/ContactChannels.tsx`, cizí soubor — nesahal jsem na něj).
- **Vizuální detail k pozdější kontrole orchestrátorem:** wordmark v navbaru
  a patičce má `tracking-tight` a v OG obrázku `letterSpacing: -2`. To bylo
  nastavené pro smíšený zápis „AvenIQ“; u verzálek „ALTENO“ je záporný
  prostrk obvykle příliš těsný a logo má prostrk naopak širší. Neměnil jsem
  to (mám zadaný jen text), ale při nasazování loga to stojí za pohled —
  případně to bude stejně nahrazené obrázkem loga.

**Otevřené pro uživatele:**

1. Přejmenovat `aveniq-cookie-consent` / `aveniq:cookie-consent-changed` na
   `alteno-…`? Cena je jedno opětovné zobrazení cookie lišty vracejícím se
   návštěvníkům. (Souvisí s bodem 2 — při změně domény je cena nulová.)
2. Doména: `SITE_URL` je pořád placeholder. Rebrand ji nijak nevynucuje, ale
   nová adresa je teď logicky na stole a musí ji zvolit uživatel.

### Agent 2 — sekce homepage

**Změněno (28 nahrazení řetězce „AvenIQ“ → „ALTENO“ v 9 souborech):**

Viditelný text (5×):

- `components/home/About.tsx` (5×, z toho 3 viditelné) — „Tak vznikl
  AvenIQ“, „Na AvenIQ zatím pracuju sám“, popisek citace „zakladatel
  AvenIQ“; zbylá 2 v hlavičkovém komentáři. **Vizeon i ZakazIQ v příběhu
  ponechány beze změny** (řádky 55, 62 — cizí/vlastní projekty, ne firma).
- `components/home/ZakazIq.tsx` (4×, z toho 1 viditelné) — věta „Do systému
  se dostanete hned po objednání konzultace přes AvenIQ.“ → „…přes ALTENO.“
  Význam ani struktura věty se nemění. Zbylé 3 v komentářích. **Všech 11
  výskytů „ZakazIQ“ v souboru zůstalo nedotčených** (ověřeno grepem), včetně
  wordmarku v nadpisu („Zakaz“ + „IQ“), štítku „Vlastní projekt“ a modré
  identity produktu — pravidlo „ZakazIQ nikdy jako reference“ platí dál.
- `components/motion/ToolBoard.tsx` (4×, z toho 1 viditelné) — wordmark
  v centrálním uzlu desky spojů. Loga nástrojů, jejich značkové barvy ani
  **počet 44** jsem nikde nesáhl.
- `components/motion/AutomationJourney.tsx` (9×, z toho 2 „viditelné“) —
  wordmark v `HubNode` a `aria-label="Jádro ALTENO — sem se sbíhají všechny
  kroky"`. Zbylých 7 v komentářích (geometrie pipeline, popis hran, scénář
  animace). Žádné souřadnice, časování ani GSAP logika se neměnily.

Jen komentáře (5 souborů, 1× každý): `WhyAutomation.tsx`,
`QuoteProcess.tsx`, `ToolsIntegration.tsx`, `VerifiedSystems.tsx`,
`LiveSystemFlow.tsx`. Ve všech případech přepsán pouze název, obsah
i odůvodnění komentáře zůstává doslova stejné.

Navíc **1 přejmenování identifikátoru**: `WhyAutomation.tsx` měl lokální
komponentu `function AvenIqMark()` (viditelný text uvnitř byl „AvenIQ“).
Přejmenoval jsem ji na `AltenoMark` a upravil obě její použití (řádky 197,
231). Na rozdíl od `aveniq-cookie-consent` z agenta 1 tady **není žádný
vedlejší efekt**: komponenta se neexportuje, je použitá výhradně v tomto
souboru (ověřeno grepem přes `components/`, `app/`, `lib/`) a na nic
runtime nenavazuje. Nechat komponentu jménem `AvenIqMark` vykreslovat
„ALTENO“ by byla čerstvá nesrovnalost v kódu, ne zachovaný stav.

`npx tsc --noEmit` prochází (exit 0), `npx eslint` nad všemi devíti soubory
taky (exit 0). `git diff` potvrzuje, že diff obsahuje **výhradně** změnu
názvu — žádné přeformátování, žádná změna copy, tříd ani logiky.

**Na co jsem narazil:**

- **Gramatická shoda: „Tak vznikl ALTENO“ (`About.tsx`, řádek 67).** Tohle
  je jediné místo v mých souborech, kde na názvu závisí tvar jiného slova.
  „AvenIQ“ se v češtině chová jako mužský neživotný rod (**vznikl**),
  jenže „ALTENO“ končí na -O a čtenář ho přirozeně přečte jako střední rod
  (jako Tesco, Iveco) — pak by věta zněla „Tak **vzniklo** ALTENO“.
  **Sloveso jsem nezměnil**, protože rod značky je obchodní rozhodnutí
  uživatele, ne moje: určuje, jak se bude o firmě mluvit v celém copy
  i mimo web. Zadání navíc výslovně říká měnit jen název. Viz otevřený
  bod 1 níže — je to jednoslovná oprava, jakmile padne rozhodnutí.
  Ostatní výskyty v mých souborech jsou pádově neutrální a fungují bez
  úprav: „Na ALTENO pracuju“, „zakladatel ALTENO“, „přes ALTENO“,
  „s ALTENO promluví“ (název zůstává nesklonný, stejně jako dřív).
- **Prostrk wordmarků — navazuje na pozorování agenta 1.** Stejný problém
  jako v navbaru/patičce mají tři wordmarky v mých souborech, všechny
  s `tracking-tight`: `ToolBoard.tsx` (uzel desky spojů, řádek 160),
  `AutomationJourney.tsx` (`HubNode`, řádek 278) a `WhyAutomation.tsx`
  (`AltenoMark`, řádek 48). Záporný prostrk byl laděný na smíšený zápis
  „AvenIQ“; u verzálek působí těsně a logo ALTENO má prostrk naopak širší.
  **Neměnil jsem to** (mimo zadaný rozsah), ale je to jedna třída na třech
  místech, pokud se orchestrátor rozhodne prostrk sjednotit.
- **Žádná cena nikde nepřibyla ani nezmizela.** `QuoteProcess.tsx` jsem
  otevíral jen kvůli jednomu komentáři; karty s mechanismem nacenění
  („Vymezíme rozsah“, „Cena podle rozsahu“ …) jsou nedotčené a žádné číslo
  ani rozmezí neobsahují.
- **Hranice „já“/„my“ zachována beze změny.** `About.tsx` a `ZakazIq.tsx`
  zůstávají v 1. os. j. č., `QuoteProcess.tsx` a `ToolsIntegration.tsx`
  ve značkovém „my“. Rebrand se žádného slovesa nedotkl.

**Otevřené pro uživatele:**

1. **Jaký rod má ALTENO?** Rozhodnutí ovlivní `About.tsx` řádek 67
   („Tak vznikl ALTENO“ vs. „Tak vzniklo ALTENO“) a každou budoucí větu,
   kde název stojí v podmětu. Doporučuji rozhodnout jednou a zapsat to do
   `CLAUDE.md`, ať se to netříští napříč sekcemi. (Střední rod = „vzniklo“
   zní česky přirozeněji; mužský = „vznikl“ zachová dnešní text beze změny.
   Ani jedno není chyba, ale musí se držet konzistentně.)
2. Sjednotit prostrk textových wordmarků pro verzálky (viz výše) — týká se
   i souborů agenta 1. Padá to samo, pokud se textové wordmarky nahradí
   obrázkem `public/alteno-logo.png`.

### Agent 3 — podstránky, lib, structured data

**Změněno (16 nahrazení „AvenIQ“ → „ALTENO“ v 10 souborech):**

Datová vrstva — dvě změny s plošným dosahem:

- `lib/page-metadata.ts` (1×) — `openGraph.siteName` → `"ALTENO"`. Tohle je
  jediné místo, odkud si `siteName` bere **každá** podstránka (`/o-mne`,
  `/automatizace/*`, všechny tři právní), takže jedna změna spraví
  `og:site_name` napříč webem. Layout má vlastní kopii — tu měnil agent 1.
- `lib/json-ld.ts` (1×) — `organizationJsonLd().name` → `"ALTENO"`. **Měnil
  jsem výhradně `name`.** Description zůstala doslova („AI automatizace
  firemních procesů pro menší a středně velké firmy.“), `Offer` ani
  `priceSpecification` jsem nepřidal — jediný výskyt těch slov v souboru je
  komentář na řádku 8, který je **zakazuje**, a ten zůstal beze změny.
  `automationAreaServiceJsonLd()` odkazuje na organizaci přes `@id`
  (`…/#organization`), ne přes jméno, takže se vazba přejmenováním nerozbila
  a nikde nezůstalo staré jméno „zadrátované“ podruhé.

Podstránky (viditelný text a SEO):

- `app/o-mne/page.tsx` (4×) — `title` `"O mně | ALTENO"`, meta description
  („Proč ALTENO vznikl…“), `alt` fotky („Kryštof Sobotka, zakladatel
  ALTENO“) a věta „Tak vznikl ALTENO.“ v sekci „Co dělám dnes“.
  **Vizeon i ZakazIQ jsou v celém souboru nedotčené** (7 výskytů, ověřeno
  grepem), včetně odstavce „Vizeon i ZakazIQ jsou moje vlastní projekty, ne
  klientské reference“ — pravidlo o vlastních projektech platí dál.
- `app/automatizace/[slug]/page.tsx` (1×) — jen suffix šablony titulku
  `` `${area.seoTitle} | ALTENO` ``. **Titulek i meta popis zůstávají
  odvozené z obsahu** (`area.seoTitle`, `area.lead` z `lib/automation-areas.ts`),
  nic jsem nezobecňoval — měnil se výhradně název za svislítkem.
- `app/design-preview/page.tsx` (1×) — nadřádek nad ukázkovým hero blokem
  („ALTENO — AI automatizace“). **Obě kopie hero claimu (řádky 218 a 249)
  jsou v diffu prokazatelně nedotčené** — diff toho souboru je jediný řádek.

Právní placeholdery (`vop`, `ochrana-osobnich-udaju`, `cookies`) — 2× každý,
celkem 6×: výhradně `title` a meta `description` v `pageMetadata()`. Těla
stránek jsem se nedotkl — seznamy sekcí, `LegalDraftNotice` ani
`LegalPageSection` (kde žije `[DOPLNIT PRÁVNÍ TEXT]`) se nezměnily a **žádný
právní text nepřibyl**. `robots: { index: false }` zůstává.

Komentáře (1× každý): `lib/automation-tools.ts` („Nástroje, na kterých
ALTENO reálně staví automatizace“) a `lib/brand-icons.ts` (věta o tom, že
logo OpenAI je označení nástroje, ne tvrzení o partnerství). Přepsán jen
název, odůvodnění i smysl obou komentářů zůstaly doslova.

`npx tsc --noEmit` prochází (exit 0), `npx eslint` nad všemi deseti soubory
taky (exit 0). `git diff --stat` hlásí **16 insertions, 16 deletions** —
přesně 1:1, tedy žádné přeformátování, žádná změna copy, tříd ani logiky.

**Na co jsem narazil:**

- **Rod názvu se mě týká na dvou dalších místech — stejný problém, který
  našel agent 2.** Řešil jsem ho stejně: **sloveso jsem nezměnil.**
  1. `app/o-mne/page.tsx` řádek 183: „Tak vznikl ALTENO.“ — doslova stejná
     věta jako `About.tsx` řádek 67 od agenta 2. Je to záměr, ne duplicita:
     `claude.md` říká, že zkrácená verze na homepage a plný příběh na
     `/o-mne` se nesmí rozejít v tvrzeních.
  2. `app/o-mne/page.tsx` řádek 33: meta description „Proč ALTENO **vznikl**
     a jak funguje ZakazIQ“. Tenhle je navíc **viditelný ve výsledcích
     vyhledávání**, ne jen na stránce.
  Praktický dopad: až padne rozhodnutí o rodu, musí se opravit **všechna tři
  místa najednou** (`About.tsx` 67, `o-mne` 183, `o-mne` 33) — jinak se
  homepage a podstránka rozejdou v tom, jak o firmě mluví. Je to trojí
  jednoslovná změna.
- **Ostatní výskyty v mých souborech jsou pádově neutrální** a fungují bez
  úprav (název zůstává nesklonný stejně jako dřív): „zakladatel ALTENO“,
  „podmínky ALTENO“, „údajů ALTENO“, „na webu ALTENO“, „O mně | ALTENO“,
  „ALTENO — AI automatizace“.
- **Žádná cena nikde nepřibyla.** `lib/json-ld.ts` je po mém zásahu pořád
  bez `Offer`/`priceSpecification`, `/automatizace/[slug]` ani `/o-mne`
  žádné číslo neuvádí. `vop/page.tsx` má v seznamu sekcí položku „Platební
  podmínky“ — to je **název nevyplněné placeholder sekce, ne cena**, a
  nechal jsem ho beze změny.
- **Hranice „já“/„my“ zachována.** `/o-mne` zůstává celá v 1. os. j. č.
  („Pracuju na tom zatím sám“), `/automatizace/[slug]` ve značkovém „my“
  („řekneme vám na rovinu“). Rebrand se žádného slovesa nedotkl.
- **Stav celého kódu po agentech 1–3:** grep přes `app/`, `components/`,
  `lib/`, `db/`, `public/` nachází už jen **dva výskyty** — obojí ty
  identifikátory v `components/layout/CookieConsent.tsx`, které agent 1
  vědomě nechal uživateli k rozhodnutí. **V živém kódu tedy nezůstal žádný
  viditelný text se starým názvem.**

**Otevřené pro uživatele:**

1. **Rod názvu ALTENO** — sdílený bod s agentem 2, nepřidávám nový, jen
   rozšiřuju dopad: netýká se jednoho řádku, ale tří (viz výše), z toho
   jeden je SEO popis. Doporučení agenta 2 (rozhodnout jednou a zapsat do
   `claude.md`) platí o to víc.
2. **Dokumentace v rootu ještě přejmenovaná není** — `README.md`,
   `PRODUCT.md`, `DESIGN.md`, `AGENTS.md` a `claude.md` starý název pořád
   obsahují. Není to můj rozsah (mám zadané jen app/lib soubory) a nevím,
   jestli to má agent 4; hlásím to, ať to nezapadne. `docs/*` se podle
   rozhodnutí v tabulce výše **nepřepisuje** — tam je starý název správně.

### Agent 4 — interní dokumentace

**Změněno (11 nahrazení v 5 souborech):**

- `README.md` (2×) — nadpis `# AvenIQ — marketingový web` → `# ALTENO — …`
  a věta „Marketingový web pro ALTENO (AI automatizace pro menší a středně
  velké firmy…)“. Tech stack, odkazy na `claude.md`/`AGENTS.md` ani příkazy
  pro lokální vývoj a DB jsem nesáhl.
- `PRODUCT.md` (3×) — „ALTENO staví firmám automatizace…“ (Product Purpose),
  „ALTENO je zatím jednočlenný projekt (Kryštof Sobotka)“ a „množné číslo
  jen tam, kde mluví ALTENO jako značka“ (Team Reality). **Hero claim
  „Vy řešíte byznys. Rutinu automatizujeme my.“ na řádcích 47–48 je
  v diffu prokazatelně nedotčený**, stejně jako Poslání, věta o tom, že se
  ceny neuvádějí, obě datované poznámky o nahrazených formulacích
  (2026-08-09, 2026-08-10) a celá sekce Anti-references včetně zákazu
  dekorativního použití `brand-turquoise`/`brand-mint`.
- `DESIGN.md` (2×) — `name: AvenIQ` → `name: ALTENO` v YAML frontmatteru
  (to je jen štítek projektu pro detektor anti-patternů) a nadpis
  `# Design System: ALTENO`. **Žádný token, hex, kontrastní poznámka,
  typografický krok ani `rounded` hodnota se nezměnily** — `#2dd4bf`,
  `#6ee7b7`, `#052e2b`, `#0a1a2f`, `#05070a`, zinc škála i celá
  `typography.scale` jsou v diffu netknuté. Soubor zůstává odvozený
  z `app/globals.css` a `claude.md`, ne novým zdrojem pravdy.
- `AGENTS.md` (3×, 4 řádky) — nadpis, „pravidla z masterpromptu pro build
  webu ALTENO“ a dvě zmínky uvnitř vět („Tým: ALTENO je zatím jednočlenný
  projekt“, „kde mluví ALTENO jako značka“). Věta o **ZakazIQ a VIZEON
  jako vlastních projektech zakladatele** (řádek 20) i sekce „Sekce
  Spolupráce“ s EstatIQ/ZakazIQ/VIZEON zůstaly doslova beze změny — žádný
  z těch tří názvů se nepřejmenovával. Zákaz uvádět cenu, tabulka palety
  R11 i tech stack jsou nedotčené.
- `package.json` (1×) — `"name": "aveniq"` → `"name": "alteno"`. Nic jiného;
  žádná závislost nepřibyla ani se nezměnila verze. `npm install` jsem
  **nespouštěl**.

Ověření: `node -e "require('./package.json')"` prochází (validní JSON, pole
`name` vrací `alteno`). `git diff --stat` nad mými pěti soubory hlásí
**12 insertions, 12 deletions** — 1:1, tedy žádné přeformátování ani jiná
změna než název. Grep (case-insensitive) přes mých pět souborů už starý
název nenachází.

**Na co jsem narazil:**

- **Rod názvu se mě netýká — v žádném z mých pěti souborů není sloveso ani
  přídavné jméno, jehož tvar by na názvu závisel.** Všechny výskyty jsou
  buď v nadpisu, nebo u rodově neutrálního tvaru („ALTENO **je** zatím“,
  „ALTENO **staví**“, „kde **mluví** ALTENO“). Otevřený bod agentů 2 a 3
  („vznikl“ vs. „vzniklo“) tedy zůstává omezený na tři místa v živém kódu,
  nerozšiřuje se do dokumentace. Nic jsem tady neměnil.
- **`.env.example` obsahuje starý název v příkladu domény** — řádek 4:
  `# Produkční doména webu (bez lomítka na konci), např. https://www.aveniq.cz`.
  Soubor je **verzovaný v gitu** (přidán v commitu 5932d1c, Fáze 10) a
  **není v mém rozsahu**, takže jsem na něj nesáhl. Doplňuje to zjištění
  agenta 1, který hlásil, že doména se v repozitáři nikde nevyskytuje —
  tenhle jeden výskyt jeho grepu unikl. Je to jen komentář s příkladem, ne
  funkční hodnota (`SITE_URL=` je prázdné), takže nic nerozbíjí; přesto by
  po rozhodnutí o doméně (otevřený bod 2 agenta 1) měl příklad odpovídat
  nové značce.
- **`package-lock.json` nese starý název dvakrát** — `"name": "aveniq"` na
  řádcích 2 a 8 (kořenový projekt a jeho záznam v `packages[""]`).
  Needitoval jsem ho ručně podle zadání. **Srovná se sám při nejbližším
  `npm install`** (nebo `npm install --package-lock-only`, což nesáhne na
  `node_modules`); je to čistě kosmetická nesrovnalost, build ani deploy na
  ni nenarazí. Nechávám orchestrátorovi/uživateli.
- **`.claude/hooks/subagent-verify.mjs` (řádek 53) hledá literál „AvenIQ“**
  ve změněných souborech jako pojistku proti zbytkům. Tenhle výskyt je
  **funkční, ne obsahový** — nepřejmenovával jsem ho a přejmenovat se nemá,
  jinak hook přestane hlídat to, kvůli čemu vznikl. Pozor jen na to, že
  tenhle dokument (`docs/rebrand-alteno-kontext.md`) starý název legitimně
  obsahuje už v nadpisu, takže případné hlášení hooku nad ním je falešný
  poplach.
- **Stav repozitáře po agentech 1–4:** mimo `docs/*` (kde se starý název
  podle rozhodnutí uživatele **nepřepisuje**) zbývají už jen čtyři místa —
  `claude.md` (8×, řeší orchestrátor), `components/layout/CookieConsent.tsx`
  (2× identifikátory, čeká na rozhodnutí uživatele), `.env.example` (1×
  příklad domény) a `package-lock.json` (2×, přegeneruje se).

**Otevřené pro uživatele / orchestrátora:**

1. **Přegenerovat `package-lock.json`** (`npm install`, nebo
   `npm install --package-lock-only`), aby v něm pole `name` odpovídalo
   `package.json`. Neudělal jsem to podle zadání.
2. **`.env.example`, řádek 4** — příklad domény `https://www.aveniq.cz`.
   Mimo můj rozsah; logicky patří k rozhodnutí o nové doméně (otevřený
   bod 2 agenta 1), ne k samostatné opravě.
3. **`claude.md` v rootu** — 8 výskytů starého názvu, podle zadání se ho
   nedotýkám. Zároveň je to místo, kam podle doporučení agentů 2 a 3 patří
   zápis rozhodnutí o **rodu značky ALTENO**, aby se netříštil napříč
   sekcemi.

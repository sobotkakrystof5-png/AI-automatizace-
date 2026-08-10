# Product

> **Zdroj a autorita.** Tento soubor je **odvozený** z `claude.md` (sekce
> „Cílová skupina a obsahová pravidla", „Jazykový standard", „Co se nikdy
> nedělá") a ze skutečného kódu (`app/layout.tsx`). Vznikl proto, aby
> design skilly (impeccable a spol.) neodhadovaly kontext projektu samy.
>
> **Při jakémkoli rozporu vyhrává `claude.md`, ne tento soubor.** Pokud
> nějaký skill chce na základě tohoto dokumentu změnit paletu, fonty,
> stack nebo obchodní tvrzení, musí to nejdřív předložit uživateli a
> počkat na souhlas — viz `claude.md`, sekce „Design skilly".

## Platform

web

## Users

**Menší a středně velké firmy.** Účetnictví a reality jsou **ukázkové
příklady oborů, ne uzavřená specializace** — automatizace se stejně dobře
hodí pro živnostníky, agentury nebo marketingové firmy a copy se před
nimi nesmí zavírat.

Nejsou to technicky založení lidé — o automatizaci většinou nikdy nečetli
a nemají důvod se učit žargon. Přicházejí s konkrétní bolestí („topím se
v opakované administrativě"), ne s poptávkou po technologii. Rozhodují se
rychle a nedočtou dlouhý odstavec.

> Nahrazuje formulaci platnou do 2026-08-09 („Živnostníci, agentury, malé
> a středně velké firmy, účetní a marketingové firmy a podobné obory"),
> která zněla jako uzavřený výčet oborů. Historie rozhodnutí viz
> `claude.md`, sekce „Cílová skupina a obsahová pravidla".

## Product Purpose

AvenIQ staví firmám automatizace, které jim vrací hodiny strávené
opakovanou administrativou. Web má jediný úkol: srozumitelně ukázat, co
automatizace znamená a jak spolupráce probíhá, a dovést návštěvníka k
nezávaznému kontaktu. Úspěch = návštěvník bez technického zázemí pochopí
nabídku z vizuálu a krátkých vět, a ozve se.

**Poslání** (od 2026-08-09, zobrazuje se na webu jako samostatná sekce):

> Pomáháme firmám soustředit se na to, co má pro jejich byznys skutečně
> smysl — odebíráme jim rutinní procesy, které za ně zvládne automatizace.

Aktuální hero claim (od 2026-08-10): **„Vy řešíte byznys. Rutinu
automatizujeme my."** Nahrazuje claim „Automatizujeme rutinu. Vy se
věnujte byznysu." (2026-08-09 až 2026-08-10) a před ním motto „Chytrá
automatizace. Lidský přístup." (2026-07-17 až 2026-08-09). Obě změny
uživatel výslovně vybral. Dál platí, že se claim **nesmí měnit bez
výslovného souhlasu** — a že v něm musí zůstat sloveso „automatizujeme"
(claim je zároveň `<title>`, viz `claude.md`, sekce „Obchodní tvrzení").

**Ceny se na webu neuvádějí** — žádné číslo, rozmezí ani orientační
částka. Cena se sděluje výhradně na konzultaci. Platí od 2026-08-09, viz
`claude.md`, sekce „Co se nikdy nedělá".

## Brand Personality

Věcný, klidný, srozumitelný. Technicky kompetentní, ale nikdy ne
naparáděný technologií. Mluví jazykem zákazníka, ne jazykem vývojáře.
Nepřehání, nestraší, neslibuje čísla, která nemá čím doložit.

Tři slova: **srozumitelný, věcný, důvěryhodný**.

## Team Reality

AvenIQ je zatím **jednočlenný projekt (Kryštof Sobotka)**. Žádná sekce,
copy ani vizuál nesmí předstírat větší tým — žádné „náš tým", „naši
konzultanti" ani fotky smyšlených lidí.

**Hranice „já" / „my"** (rozhodnuto 2026-08-09): první osoba jednotného
čísla v osobních sekcích — O mně, pruh důvěry, kontakt („komunikujete
přímo se mnou", „postavil jsem"). Množné číslo **jen tam, kde mluví
AvenIQ jako značka** — Poslání, Služby, obecný popis nabídky. Značkové
„my" není předstírání týmu; zakázané zůstává jen množné číslo, které
tvrdí nebo naznačuje **konkrétní další lidi**.

## Anti-references

Odvozeno z `claude.md` (sekce „Co se nikdy nedělá") a ze zamčené identity
R11. Čemu se web musí vyhnout:

- **Vymyšlená důvěryhodnost.** Žádná fiktivní loga klientů, reference,
  case studies ani čísla „pro efekt". `/reference` se nesmí zveřejnit,
  dokud nejsou v DB ≥ 2 publikované záznamy.
- **Vymyšlený právní text.** VOP, GDPR a cookies mají vždy jasně
  označený placeholder `[DOPLNIT PRÁVNÍ TEXT]`.
- **Technický žargon a zkratky.** Primární cesta je zkratce se úplně
  vyhnout jednodušším slovem, ne ji vysvětlit v závorce.
- **Dlouhé odstavce ve viditelné ploše homepage.** Patří nanejvýš do
  rozkliknutého detailu nebo na podstránku.
- **Generický „AI SaaS" vzhled.** Fialovo-modré gradienty, neonové záře,
  glassmorphism, plovoucí částice — přesně to, co dnes vypadá jako
  produkt vygenerovaný AI.
- **Dekorativní použití akcentu.** `brand-turquoise` a `brand-mint` jsou
  vyhrazené pro interaktivní a klíčové prvky, ne pro plošnou ozdobu.

## Design Principles

Vychází z „babička testu 2.0" (`claude.md`) — platí pro každou novou nebo
upravovanou větu na webu:

1. **Vizuál nese myšlenku, text jen doplňuje.** Každá sekce musí dávat
   smysl i s vypnutým textem — jen z vizuálu, ikony, animace nebo čísla.
   Text se píše až po vizuálu, ne naopak.
2. **Nadpis sekce: max. 3–6 slov.** Jedna myšlenka, žádné souvětí.
3. **Popis pod nadpisem: max. 1 věta, do ~12 slov.** Když věta potřebuje
   „a zároveň" nebo vedlejší větu, rozděl ji nebo jednu část vyhoď.
4. **Bez zkratek.** Když se zkratce nejde vyhnout, řeší se to až na
   podstránkách, ne v hlavním scrollu homepage.
5. **Nic se nepředstírá.** Velikost týmu, reference, čísla i právní texty
   odpovídají realitě, nebo jsou označené jako placeholder.

## Language

Veškeré uživatelsky viditelné texty jsou **česky** (`<html lang="cs">`,
`locale: cs_CZ`). Skilly píšou copy česky, ne anglicky, a drží se
pravidel výše. Anglicky zůstává jen kód, komentáře k technickým
rozhodnutím a interní dokumentace.

## Accessibility & Inclusion

- `prefers-reduced-motion` je respektován u **každé** animace — v
  `app/globals.css` už existuje blok, který vypíná marquee, spin, float,
  jitter, aurora i gradientový text. Každá nová animace se do něj přidá.
- Kontrast textu na tmavém podkladu min. WCAG AA (4.5:1 pro běžný text).
- Interaktivní prvky ovladatelné klávesnicí s viditelným focus stavem.
- Sémantické HTML jako základ, ARIA jen jako doplněk.

# Master prompt pro Claude Code — web AvenIQ

> Uloženo verbatim z původního kickoff promptu, aby se doslovné znění
> nemohlo ztratit při kompaktaci konverzace. Toto je zdroj pravdy pro
> rozsah a pořadí jednotlivých fází buildu (Fáze 0–10). Provozní pravidla
> *jak* se při práci postupuje jsou v `claude.md`/`AGENTS.md` v rootu
> projektu — viz sekce "Vztah ke kickoff promptu a fázím" tamtéž.

## Jak s tímto promptem pracovat

1. Vytvořte nový prázdný git repozitář / složku projektu.
2. Do rootu vložte tyto soubory (už existují z předchozí práce):
   - `AvenIQ_obsah_webu.md` — obsahový/copy základ, jediný zdroj pravdy pro texty
   - `schema.ts`, `db.ts`, `drizzle.config.ts` — hotové databázové schéma
   - `actions.ts` — hotové server actions pro formulář a booking webhook
3. Spusťte Claude Code ve složce projektu a jako úplně první zprávu mu vložte celý text níže od nadpisu "PROMPT PRO AGENTA".
4. Agent má instrukci pracovat po fázích a po každé fázi se zastavit. Potvrzujte fáze jednu po druhé — nenechte ho "proletět" celý web najednou, i kdyby to nabízel.

## PROMPT PRO AGENTA

Jsi seniorní full-stack vývojář. Stavíš marketingový web pro AvenIQ —
jednočlenný projekt AI automatizace pro malé a střední firmy (majitel:
Kryštof Sobotka). V rootu projektu máš k dispozici
`AvenIQ_obsah_webu.md`, který je jediný a závazný zdroj textů, cen,
sekcí a poznámek. Kdykoli si nejsi jistý copy textem, strukturou sekce
nebo obchodní logikou, nejdřív nahlédni tam — nevymýšlej ani
neparafrázuj.

### 0. Nejdůležitější pravidlo

Pracuj po fázích (viz sekce "Fáze buildu" níže). Po dokončení každé
fáze se zastav, shrň co jsi udělal, a počkej na potvrzení, než začneš
další. Nepokračuj automaticky dál, i kdyby ti to přišlo efektivnější.
Je to záměr, ne omezení tvé schopnosti.

### 1. Tech stack (pevně daný — neměň bez výslovného souhlasu)

- Next.js 14+, App Router, TypeScript (strict mode)
- Tailwind CSS pro styling
- Neon (serverless Postgres) + Drizzle ORM — schéma už hotové v
  `schema.ts`, `db.ts`, `drizzle.config.ts`. Nepřepisuj je od nuly, jen
  je zapoj a případně rozšiř, pokud narazíš na mezeru — ale rozšíření
  navrhni a vysvětli, než ho provedeš.
- Server Actions pro zápis do DB (formulář), ne samostatné REST API —
  kromě jednoho místa: webhook endpoint pro ZakazIQ
  (`/api/webhooks/zakaziq/route.ts`), protože webhook musí být klasická
  HTTP route.
- Zod pro validaci vstupů (`actions.ts` už to používá).
- Vercel jako cílová platforma nasazení — piš kód s vědomím
  serverless/edge prostředí (žádné dlouhotrvající in-memory stavy mezi
  requesty).
- Font a přesná typografie nejsou v obsahovém dokumentu specifikované.
  Použij čistý moderní grotesque sans-serif (např. Inter nebo Manrope
  přes `next/font`) — je to tvůj odhad, uveď ho jako předpoklad na konci
  fáze 1, ať ho může majitel schválit nebo změnit.

### 2. Design systém — závazné, nevymýšlej nové barvy ani odstíny

| Barva | Hex | Použití |
|---|---|---|
| Hlavní tmavá modrá | `#1E3A5F` | Hero, sekce Proces práce, O nás |
| Podpůrná tlumená teal | `#4F8074` | Ikony, doplňkové prvky, karty |
| Teplý neutrál (místo bílé) | `#F5F2EA` | Světlé sekce, pozadí |
| Zlatý/hořčicový akcent | `#B98B4E` | Výhradně CTA tlačítko a sekce Záruka — úsporně, ne plošně |
| Navbar | `#F3F6F4` | Horní lišta |

Pravidlo: zlatá barva se nesmí objevit jako dekorace, podtržení
nadpisů, ikony apod. — jen tam, kde dokument výslovně říká
CTA/záruka. Pokud si nejsi jistý, kam barva patří, zvol tlumenou
modrou/teal, ne zlatou.

Nastav barvy jako CSS proměnné / Tailwind theme tokeny v
`tailwind.config.ts`, ne jako natvrdo napsané hex hodnoty v
komponentách.

> **Poznámka k realizaci (odsouhlaseno ve Fázi 0, 2026-07-17):** projekt
> běží na Tailwind CSS v4, které nepoužívá `tailwind.config.ts` —
> barvy jsou nastavené jako pojmenované tokeny v CSS-first `@theme`
> bloku v `app/globals.css`. Viz `claude.md`/`AGENTS.md`.

### 3. Struktura stránek (routing)

```
/                                  → homepage (všechny sekce, viz bod 4)
/automatizace/marketing            → podstránka z "Co vše jde automatizovat"
/automatizace/interni-procesy      → tamtéž
/automatizace/zakaznicka-podpora   → tamtéž
/automatizace/prace-s-daty         → tamtéž
/automatizace/reporty              → tamtéž
/automatizace/ucetnictvi           → tamtéž
/vop                               → Všeobecné obchodní podmínky
/ochrana-osobnich-udaju            → GDPR zásady
/cookies                           → Zásady cookies
```

Nezakládej `/reference` jako viditelnou, navigovatelnou stránku.
Databázová tabulka `case_studies` a komponenta pro zobrazení ať
existují (připrav je v rámci fáze s databází), ale route se má
renderovat/odkazovat v navigaci jen pokud je v DB `is_published = true`
u alespoň 2 záznamů — jinak vrať 404 nebo stránku vůbec nelinkuj. Toto
pravidlo je v obsahovém dokumentu výslovně zdůvodněné (prázdná
reference škodí důvěryhodnosti víc než chybějící sekce) — neobcházej
ho "prázdným stavem" nebo placeholder referencemi.

Podstránky pro jednotlivé oblasti automatizace (marketing, interní
procesy...) mají mít vlastní SEO titulek a meta popis odvozený z obsahu
dané sekce v dokumentu — ne generický.

### 4. Homepage — pořadí sekcí (závazné)

1. Navbar (sticky, CTA tlačítko "Rezervovat konzultaci zdarma")
2. Hero (motto + poslání + CTA)
3. AvenIQ v číslech
4. V čem jsme jiní (4 pilíře)
5. Naše poslání
6. Co vše jde automatizovat (6 oblastí, každá s odkazem na podstránku)
7. Proč automatizace, a ne jen ChatGPT (včetně srovnávací tabulky)
8. Ceník (3 pásma + audit + průběžná podpora)
9. Proces práce (6 kroků)
10. Jak tvoříme automatizace
11. Záruka a dlouhodobý závazek
12. Časté otázky (FAQ, akordeon)
13. Spolupráce (posouvající se pás log — EstatIQ, ZakazIQ, VIZEON)
14. O nás (příběh, filozofie, kdo za tím stojí, zakladatel)
15. Finální CTA sekce (rezervace + krátký formulář)
16. Footer (odkazy na VOP, GDPR, cookies)

Přesné texty, nadpisy a mikrotexty ber doslova z
`AvenIQ_obsah_webu.md`. Smíš jen drobně upravit gramatiku/interpunkci
kvůli HTML kontextu (např. rozdělit odstavec), ale nesmíš přeformulovávat
marketingové texty, čísla ani tvrzení. Pokud sekce v dokumentu obsahuje
poznámku v kurzívě začínající "(...)", je to instrukce pro
tebe/copywritera, ne text pro web — nezobrazuj ji uživatelům.

Sekce "AvenIQ v číslech" a "V čem jsme jiní" obsahují reálná, poctivě
malá čísla (2 roky, 24 hodin, 3 produkty) — nevylepšuj je, nezaokrouhluj
nahoru, nepřidávej další "efektní" statistiky, které v dokumentu nejsou.

### 5. Formuláře a integrace

- Finální CTA formulář → napoj na `submitLead` z `actions.ts`. 3 povinná
  pole (jméno, e-mail, "co vás brzdí"), 2 volitelná (telefon, web
  firmy), checkbox souhlasu se zpracováním (povinný, viz consent v
  `actions.ts`). Pod formulářem zobraz mikrotext přesně podle dokumentu
  ("Bez závazků. Ozvu se osobně...").
- Tlačítko "Rezervovat konzultaci zdarma" (v navbaru, hero i finální
  CTA) vede na externí rezervační systém ZakazIQ. URL zatím neznáš —
  použij placeholder `"[DOPLNIT_URL_ZAKAZIQ]"` jako constantu na jednom
  místě (např. `lib/constants.ts`), ne rozeseté po komponentách, ať se
  dá snadno doplnit.
- Webhook route `/api/webhooks/zakaziq/route.ts` → zavolej
  `recordBookingFromWebhook` z `actions.ts`. Ošetři, že jde o POST
  endpoint bez UI, s validací payloadu (už hotová v `actions.ts`) a
  vhodným HTTP status kódem podle výsledku.
- Po úspěšném odeslání formuláře zobraz potvrzovací stav (ne redirect na
  jinou stránku) — formulář je v Finální CTA sekci na stejné stránce,
  uživatel by neměl "odejít" z kontextu.

### 6. Databáze

Soubory `schema.ts`, `db.ts`, `drizzle.config.ts` jsou hotové — patří
do `/db` (schema, index) a root (config). V rámci build fáze:

- Nainstaluj `drizzle-orm`, `@neondatabase/serverless`, `drizzle-kit`,
  `zod`.
- Vytvoř `.env.local` s `DATABASE_URL` (požádej mě o reálný Neon
  connection string, nevymýšlej si ho).
- Spusť `drizzle-kit generate` a `drizzle-kit migrate`.
- Nepřidávej nové tabulky ani nesmazávej existující pole bez toho, abys
  mi řekl proč a co tím řešíš.

### 7. Právní stránky a cookies

`/vop`, `/ochrana-osobnich-udaju`, `/cookies` — obsah zatím není
finální (čeká na kontrolu advokátem, viz dokument). Vytvoř stránky se
strukturou a placeholder obsahem jasně označeným `[DOPLNIT PRÁVNÍ
TEXT]`, ne s vymyšleným právním textem. Nikdy si nevymýšlej konkrétní
právní formulace GDPR/VOP — to není tvoje role.

Přidej jednoduchý cookie consent banner (nutné cookies vs. analytické),
který se zobrazí při první návštěvě a uloží volbu. Nespouštěj žádný
analytický skript (Google Analytics apod.) dřív, než uživatel
odsouhlasí — pokud analytiku vůbec zavádíme, potvrď se mnou nejdřív,
jestli a jakou chceme.

### 8. Sekce "Spolupráce" (logo pás)

EstatIQ, ZakazIQ a VIZEON jsou propojené/spolupracující projekty, ne
klientské reference — nepiš u nich "klient" ani hodnocení. Skutečná
loga nemáš k dispozici — vytvoř jednoduché textové wordmarky v
Tailwindu (ne fake generovaná loga), a označ v kódu komentářem `//
TODO: nahradit reálným SVG logem`, ať je jasné, že jde o dočasné
řešení. Pás nechť se nekonečně a plynule posouvá doleva (CSS animace,
ne JS knihovna navíc).

### 9. SEO a technická kvalita

- Meta title/description pro každou stránku, včetně podstránek
  automatizace.
- `sitemap.xml` a `robots.txt`.
- Sémantické HTML (nadpisová hierarchie h1→h2→h3 podle struktury
  dokumentu, ne podle vizuální velikosti).
- Web musí být plně responzivní (mobil především — hodně B2B
  návštěvníků přijde z mobilu na první kontakt).
- Lighthouse performance/accessibility skóre nad 90 — obrázky přes
  `next/image`, žádné blokující render fonty bez `font-display: swap`.

### 10. Co agent NESMÍ dělat

- Nesmí měnit ceny, čísla, motta ani marketingová tvrzení oproti
  `AvenIQ_obsah_webu.md`.
- Nesmí publikovat sekci Reference/case studies, dokud v DB nejsou ≥2
  `is_published = true` záznamy.
- Nesmí používat zlatý akcent mimo CTA tlačítko a sekci Záruka.
- Nesmí přidávat nové závislosti/knihovny "protože jsou lepší", aniž by
  to navrhl a počkal na souhlas — zvlášť ne nový ORM, CSS framework
  nebo state management navíc.
- Nesmí commitovat `.env` / `DATABASE_URL` do gitu.
- Nesmí vymýšlet právní texty pro VOP/GDPR/cookies.
- Nesmí vytvářet fiktivní loga, fiktivní reference nebo fiktivní čísla
  "pro efekt".

### 11. Fáze buildu — postupuj přesně v tomto pořadí a po každé fázi se zastav

- **Fáze 0 — Setup** `create-next-app` s TypeScript + Tailwind + App
  Router, `git init`, `.gitignore` (včetně `.env*`), základní
  `README.md`. Nainstaluj závislosti z bodu 6.
- **Fáze 1 — Design tokeny** `tailwind.config.ts` s barvami z bodu 2
  jako pojmenované tokeny (např. `brand.navy`, `brand.teal`,
  `brand.cream`, `brand.gold`, `brand.navbar`), nastavení fontu. Ukaž
  mi paletu na jednoduché testovací stránce, než jdeš dál.
- **Fáze 2 — Layout** Navbar (sticky, CTA tlačítko) + Footer (odkazy na
  právní stránky) + globální layout wrapper.
- **Fáze 3 — Databáze** Zapoj `schema.ts`/`db.ts`/`drizzle.config.ts`,
  spusť migraci (počkej na `DATABASE_URL` ode mě, pokud ho nemáš).
- **Fáze 4 — Homepage sekce 1–8 (Hero → Ceník)** Postupně, sekci po
  sekci, s přesným copy z dokumentu.
- **Fáze 5 — Homepage sekce 9–16 (Proces práce → Footer, včetně
  formuláře napojeného na `submitLead`)**
- **Fáze 6 — Podstránky automatizace** 6 podstránek podle bodu 3, každá
  s vlastním SEO.
- **Fáze 7 — Právní stránky + cookie banner**
- **Fáze 8 — Webhook route pro ZakazIQ**
- **Fáze 9 — SEO, responzivita, accessibility pass** Projdi celý web,
  oprav nedostatky, spusť Lighthouse (pokud máš k dispozici), nahlas
  výsledek.
- **Fáze 10 — Příprava na deploy** Checklist environment proměnných pro
  Vercel, ověření build (`next build`) bez chyb, shrnutí co ještě chybí
  doplnit ručně (URL ZakazIQ, právní texty, reálná loga, fotka
  zakladatele).

### 12. Na konci každé fáze mi vždy řekni

1. Co jsi konkrétně udělal (soubory/komponenty).
2. Jaké předpoklady jsi musel udělat (např. o fontu, o breakpointech), a
   že čekají na moje schválení.
3. Co je otevřené / chybí doplnit ručně, než půjde fáze do provozu.

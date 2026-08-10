# Navazující prompty — repozice AvenIQ (stav k 2026-08-09)

> **Průběžný stav: Části 0, 1 a 2 jsou hotové a commitnuté.** Zbývají
> Část 3 (Fáze 6 — obsah Služeb) a Část 4 (Fáze 7 — technický dotah);
> obě čekají na vstup od uživatele, viz jejich sekce níže. Část 5
> (Fáze 8) zůstává mimo aktuální rozsah. Prompty hotových částí se
> nechávají v dokumentu jako záznam zadání, ne jako práce k provedení.

Rozdělení zbývající práce do samostatných částí, každá do vlastní session.
Důvod je v `claude.md`, sekce „Řízení rozsahu úkolu": velké úkoly se
nezačínají rovnou, ale rozdělí se na části, které na sebe navazují a
každá dává smysl sama o sobě.

**Pořadí není libovolné.** Část 0 musí proběhnout první. Části 1–4
odpovídají Fázím 4–7 v `docs/plan-repozice-2026-08.md`, sekce 11 — ale
Část 2 (`/o-mne`) je jediná, která na nic nečeká, takže může jít i před
Částí 1.

---

## Stav před zahájením

**Hotovo** (Fáze 1–3 podle `docs/plan-repozice-2026-08.md`):

- Governance: `PRODUCT.md`, `claude.md`, `AGENTS.md`, `README.md` popisují
  novou cílovku, hranici hlasu „já"/„my" a zákaz cen.
- Hero claim, `<title>`, OG obrázek a design-preview sladěné na
  „Automatizujeme rutinu. Vy se věnujte byznysu."
- Ceník smazaný kompletně (komponenta, `lib/pricing.ts`, JSON-LD, odkazy).
- Formulář zredukovaný na jméno/e-mail/telefon/web/`additionalNotes`/souhlas.
- FAQ zredukované ze 14 na 6 otázek.
- Homepage přeskládaná do kanonického pořadí (viz `claude.md`, sekce
  „Struktura homepage").
- Proces přepsaný ze 6 na 5 kroků, kotva `#proces-prace` → `#spoluprace`.
- Kontakt + Booking + formulář sloučené do `ContactSection`.
- Zrušeno: `StatsBar`, `Collaboration`, `CountUpValue`, `Pricing`,
  `Contact`, `Booking`, `FinalCTA`.

**Hotovo navíc 2026-08-09** (Fáze 4–5, Části 1–2 tohoto dokumentu):

- Sekce ZakazIQ (`components/home/ZakazIq.tsx`, kotva `#zakaziq`) — tři
  vlastnosti potvrzené uživatelem, reálné logo a screenshot z aplikace,
  tok „jak to funguje" nese znovupoužitý `LiveSystemFlow`, CTA vede jen
  na konzultaci. Položka „ZakazIQ" doplněna do `Navbar`.
- Podstránka `/o-mne` — plný příběh v 1. os. j. č., breadcrumb JSON-LD,
  vlastní SEO metadata, v sitemapě s prioritou 0.8, fotka zakladatele.
  Odkaz „Celý příběh →" doplněn do `About.tsx`, patička míří na `/o-mne`.
- Trvalé zásady z těchto fází zapsané v `claude.md` i `AGENTS.md`
  (ZakazIQ/VIZEON = vlastní projekt a nikdy klientská reference; zákaz
  `bg-zinc-900` pro sekci ZakazIQ; `LiveSystemFlow` patří výhradně tam;
  pravidla pro `/o-mne`).

**Přenesené otevřené body** — každý je přiřazený k části níže, aby se na
žádný nezapomnělo:

| Bod | Kde se řeší |
|---|---|
| ~~`LiveSystemFlow` je nezapojený~~ — vyřešeno, zapojen v `ZakazIq.tsx` | ~~Část 1~~ |
| ~~Položka „ZakazIQ" chybí v navigaci~~ — vyřešeno, kotva `#zakaziq` existuje | ~~Část 1~~ |
| ~~Odkaz „Celý příběh →" v `About.tsx`~~ — vyřešeno, míří na `/o-mne` | ~~Část 2~~ |
| Karty Služby jsou viditelné `[DOPLNIT]` | Část 3 |
| `SITE_URL` a `ZAKAZIQ_BOOKING_URL` jsou placeholdery — blokující chyba | Část 4 |
| Mrtvé odkazy na `docs/kickoff-prompt.md` v `claude.md` a `AGENTS.md` | Část 4 |
| Mrtvý kód: `MagneticButton`, `MagneticLink`, `FlowDiagram(Lazy)` | Část 4 |
| Podnadpis hero má 2 věty (~16 slov) vs. babička test (1 věta, ~12 slov) | Část 4 |
| Migrace `additionalNotes` na vlastní sloupec místo `blocker` | Volitelné, Část 4 |
| Formulář nebyl otestován proti reálné Neon DB | Část 4 |

---

## Část 0 — Commit rozpracované práce (udělat první)

40 souborů z Fází 1–3 je necommitnutých, včetně 8 smazaných. Dokud to tak
zůstane, hrozí ztráta celé repozice a žádná další session nemá čistý
výchozí bod.

```text
Zkontroluj `git status` a `git diff`. V pracovním stromu je rozpracovaná
repozice webu (Fáze 1–3 podle docs/plan-repozice-2026-08.md) — nic z toho
zatím není commitnuté.

Rozděl to do logických commitů podle fází, ne do jednoho velkého:
1. Governance a positioning (PRODUCT.md, claude.md, AGENTS.md, README.md)
2. Odstranění cen + úprava formuláře a FAQ
3. Restrukturalizace homepage (nové sekce, nové pořadí, sloučení kontaktu)

Před commitem spusť `npm run lint`, `npx tsc --noEmit` a `npm run build` —
všechno musí projít. Zkontroluj taky, že v `git diff` není žádný `.env`
soubor ani DATABASE_URL.

Nepřidávej nic nového, jen commituj to, co už existuje. Pokud narazíš na
rozpor mezi tím, co je v kódu, a tím, co tvrdí claude.md, zastav se a
zeptej se — neopravuj to potichu v rámci commitu.
```

---

## Část 1 — Fáze 4: sekce ZakazIQ ✅ HOTOVO 2026-08-09

**Poučení pro příště:** ani plán, ani tenhle prompt neobsahovaly, co
ZakazIQ reálně dělá — `docs/plan-repozice-2026-08.md` to v sekci 12 vede
jako otevřenou otázku. Použitelné podklady byly v už schváleném **kódu**
(`About.tsx`, `Differentiators.tsx`, `LiveSystemFlow.tsx`). Screenshot od
uživatele pak jedno odvození opravil: karta v ZakazIQ sleduje postup
zakázky v procentech, ne kalendář rezervací. Kde vedle textu stojí
obrázek, odvození z okolního copy nestačí.

Původní zadání (ponecháno jako záznam):

```text
Přečti si claude.md, AGENTS.md a docs/plan-repozice-2026-08.md (sekce 7).
Pak si ověř aktuální stav v gitu — Fáze 1–3 repozice jsou hotové.

Úkol: Fáze 4 — nová sekce ZakazIQ na homepage.

Než začneš psát jakýkoliv obsah, zeptej se mě na:
1. Tři konkrétní vlastnosti ZakazIQ (co aplikace reálně dělá).
2. Kroky "jak to funguje" — automatizovaný tok bez zásahu člověka.
3. Screenshot nebo popis prostředí aplikace.
4. Jestli sekce vede jen ke konzultaci, nebo i k možnosti ZakazIQ
   koupit/vyzkoušet (otevřená otázka ze sekce 12 plánu).

Nic z toho si nedomýšlej — claude.md zakazuje tiché odhady u obchodního
obsahu a vymyšlenou důvěryhodnost. Dokud odpověď nemám, drž viditelné
[DOPLNIT] placeholdery.

Zadání sekce:
- Nová komponenta components/home/ZakazIq.tsx, kotva id="zakaziq".
- Nadpis "ZakazIQ" + podtitul "Automatizace, kterou jsem postavil pro
  sebe — a teď běží 24/7."
- 3 číslované vlastnosti, vizualizace prostředí, kroky "jak to funguje",
  CTA na konzultaci.
- Umísti ji podle kanonického pořadí v claude.md (sekce "Struktura
  homepage"): mezi "Jak spolupráce probíhá" (ProcessSteps) a FAQ.
- ZNOVUPOUŽIJ components/motion/LiveSystemFlow.tsx — je nezapojený a
  komentářem rezervovaný přesně pro tuhle sekci. Nestav nový vizuál,
  dokud neověříš, že tenhle nestačí.
- Přidej do navigace v Navbar.tsx položku { href: "/#zakaziq", label:
  "ZakazIQ" } — teď tam schválně chybí, aby nevznikla mrtvá kotva.

Právní hranice: inspirace konceptem sekce "Systém pro klienty" na
vizeon.cz je v pořádku, ale nekopíruj texty ani kompozici 1:1.

ZakazIQ a VIZEON se vždy označují jako vlastní projekt zakladatele, nikdy
jako klientská reference — pokud to claude.md ještě neříká jmenovitě,
doplň to tam.

Hotovo, když: sekce existuje, drží kvalitu zbytku webu (motion,
prefers-reduced-motion, WCAG AA kontrast), navigace na ni odkazuje, a
`npm run lint` + `npm run build` + `node
.claude/skills/impeccable/scripts/detect.mjs components/ app/` jsou čisté.
Zkontroluj mrtvé kotvy podle postupu v claude.md.
```

---

## Část 2 — Fáze 5: podstránka `/o-mne` ✅ HOTOVO 2026-08-09

**Zůstalo schválně obecné:** názvy kurzů, délka praxe a doložený výsledek
Vizeonu potvrzené nejsou, takže je stránka nekonkretizuje. Až je uživatel
dodá, je to nejlevnější způsob, jak stránku posílit.

Původní zadání (ponecháno jako záznam):

```text
Přečti si claude.md, AGENTS.md a docs/plan-repozice-2026-08.md (sekce 4
a 11). Ověř si stav v gitu — Fáze 1–3 repozice jsou hotové.

Úkol: Fáze 5 — nová podstránka /o-mne s plným příběhem.

Obsah: VIZEON (založení a úspěch firmy) → přechod do AI automatizace
(kurzy, měsíce praxe) → ZakazIQ jako vlastní stavba, technicky popsaná →
co AvenIQ dělá dnes.

Pravidla:
- Celá stránka je v první osobě jednotného čísla ("já") — je to osobní
  sekce, viz claude.md, "Hranice já/my".
- Delší souvislé odstavce jsou tu v pořádku (je to detailní podstránka,
  ne první kontakt), ale nadpisy drží babička test 2.0: 3–6 slov.
- Žádná cena, nikde a v žádné podobě.
- Nevymýšlej fakta o VIZEONu ani o ZakazIQ, která nemáš potvrzená —
  na homepage je dnes v components/home/About.tsx ověřená verze příběhu,
  ta je zdroj pravdy. Cokoliv nad její rámec si vyžádej ode mě.

Technicky:
- app/o-mne/page.tsx, statické `export const metadata = pageMetadata({...})`
  přes lib/page-metadata.ts — vzor je app/cookies/page.tsx.
  NEPOUŽÍVEJ app/faq ani app/cenik jako vzor, ty neexistují.
- Zvaž breadcrumbJsonLd() z lib/json-ld.ts, jak to dělá
  app/automatizace/[slug]/page.tsx.
- Přidej /o-mne do staticRoutes v app/sitemap.ts.
- V components/home/About.tsx je TODO: doplň odkaz "Celý příběh →" na
  /o-mne. Stránku vytvoř DŘÍV než odkaz, ať chvíli nevede na 404.
- Zvaž položku v Footer.tsx; v Navbaru je už 6 položek, tak tam ji
  přidávej jen pokud se to nerozbije na mobilu.

Nakonec doplň /o-mne do seznamu podstránek v claude.md, pokud ho vede.

Hotovo, když: stránka existuje, je dostupná z homepage, má vyplněná SEO
metadata, je v sitemapě, a lint + build + impeccable detektor jsou čisté.
```

---

## Část 3 — Fáze 6: obsah Služeb a Příkladů automatizací

**Čeká na tvůj výběr služeb.** Připrav si, které automatizace chceš
nabízet jako první.

```text
Přečti si claude.md, AGENTS.md a docs/plan-repozice-2026-08.md (sekce 6).
Ověř si stav v gitu.

Úkol: Fáze 6 — doplnit reálný obsah do sekce Služby a Příklady
automatizací.

Nejdřív se mě zeptej, jaké konkrétní služby/automatizace se mají
nabízet. V lib/services.ts jsou dnes tři viditelné [DOPLNIT] placeholdery
— nevyplňuj je odhadem.

Jako výchozí inspiraci (ne uzavřený seznam) plán uvádí: vytěžování a
tvorba faktur, automatické odesílání e-mailů, tvorba příspěvků na
sociální sítě, přepisy PDF dokumentů, automatická příprava nabídek.

Pravidla, na kterých se nesmlouvá:
- NIKDE žádná cena — ani "od", ani orientační rozmezí. Typ Service
  v lib/services.ts schválně nemá pole pro cenu a mít ho nebude.
- Prezentovat jako příklady napříč obory, ne jako uzavřený katalog podle
  odvětví. Účetnictví a reality jsou ukázkové příklady, ne jediná cílovka.
- Babička test 2.0: název služby 2–4 slova, popis 1 věta do ~12 slov.
- CTA zůstává "Probrat na konzultaci →" a vede na #kontakt.

Projdi i sekci Příklady automatizací (components/home/AutomationAreas.tsx,
data v lib/automation-areas.ts) a slaď ji s novým positioningem, pokud
někde ještě mluví starým jazykem.

Hotovo, když: žádný [DOPLNIT] placeholder nezůstal, nikde není číslo
v souvislosti s cenou (`grep -rniE "Kč|cenik|ceník" app components lib`),
a lint + build + detektor jsou čisté.
```

---

## Část 4 — Fáze 7: technický dotah a úklid

**Na nic nečeká, ale dává smysl až po Částech 1–3**, protože se dotýká
metadat sekcí, které ještě nevznikly.

```text
Přečti si claude.md a AGENTS.md. Ověř si stav v gitu.

Úkol: Fáze 7 — technický dotah po repozici. Je to sběrná fáze, projdi
všechny body:

1. BLOKUJÍCÍ CHYBA, nahlas ji hned na začátku: v lib/constants.ts je
   ZAKAZIQ_BOOKING_URL natvrdo "[DOPLNIT_URL_ZAKAZIQ]" a SITE_URL není
   nastavená ani v .env.local. Dokud to platí, sitemap publikuje
   localhost URL a rezervace nefunguje. Vyžádej si ode mě reálné hodnoty
   — nevymýšlej je a neobcházej to.
2. OG/Twitter metadata v app/layout.tsx zkontroluj a doplň per-page
   override na /o-mne, pokud stránka existuje.
3. lib/json-ld.ts — pricingServiceJsonLd() je smazaná. Ověř, že zbylá
   schémata (Organization, FAQPage, breadcrumbs, automationAreaService)
   jsou konzistentní. Pokud navrhneš nové Service schéma pro sekci
   Služby, MUSÍ být bez Offer i priceSpecification.
4. app/sitemap.ts a app/robots.ts — ověř, že sedí s finálním seznamem rout.
5. Mrtvé odkazy na docs/kickoff-prompt.md v claude.md (3×) a AGENTS.md
   (1×) — ten soubor byl smazaný v commitu 11bb4bb. Oprav nebo odstraň.
6. Mrtvý kód bez jediného volání: components/motion/MagneticButton.tsx,
   MagneticLink.tsx, FlowDiagram.tsx, FlowDiagramLazy.tsx (poslední dva
   používá jen /design-preview). Navrhni, co s nimi — nemaž bez potvrzení.
   POZOR: LiveSystemFlow.tsx NENÍ mrtvý kód, je rezervovaný pro sekci
   ZakazIQ, viz komentář v souboru.
7. Podnadpis hero má dvě věty (~16 slov), babička test 2.0 povoluje
   jednu do ~12. Navrhni kratší variantu a nech mě rozhodnout.
8. Lighthouse / Core Web Vitals po strukturálních změnách — nové sekce
   přidaly motion, ověř LCP a CLS.
9. Otestuj odeslání kontaktního formuláře proti reálné Neon DB a pak
   testovací lead smaž. Pozor: pole additionalNotes se ukládá do sloupce
   `blocker`, protože ten je notNull() — ověř, že prázdné pole projde.

Volitelné, jen pokud to navrhnu já: migrace `blocker` na nullable
sloupec `additional_notes`. Je to zásah do schématu, takže podle
claude.md nejdřív návrh a souhlas, ne rovnou migrace.

Hotovo, když: žádný technický dluh z tohohle seznamu nezůstal nevyřešený
nebo je výslovně odložený s mým souhlasem.
```

---

## Část 5 — Fáze 8: chatbot a rezervační systém (budoucnost)

**Nespouštět, dokud nebude hotový n8n backend.** Zaznamenáno, aby se na
to nezapomnělo — viz `docs/plan-repozice-2026-08.md`, sekce 10 a 10a.

```text
Přečti si docs/plan-repozice-2026-08.md, sekce 10 a 10a, a claude.md.

Úkol: Fáze 8 — AI chatbot a rezervační systém pro "Konzultace zdarma".

Obě funkce pravděpodobně poběží přes stejný n8n backend, tak je naplánuj
společně, ne odděleně.

Než cokoliv postavíš, zeptej se mě:
1. Je n8n backend připravený a jaká je jeho URL/webhook?
2. Má chatbot odpovídat jen na úrovni FAQ, nebo i kvalifikovat lead před
   konzultací?
3. Kde je zdroj dostupných termínů — přímo v ZakazIQ, nebo přes n8n?

Rozsah:
- Rezervace: kliknutí na "Konzultace zdarma" → výběr volného termínu →
  zápis do ZakazIQ → potvrzovací e-mail. Dnešní placeholder chování je
  v components/home/ContactBookingCta.tsx a je připravené na výměnu —
  přečti si komentář v tom souboru, popisuje past, na kterou při
  zapojování narazíš.
- Chatbot: widget na frontendu + napojení na n8n.

Nové závislosti podléhají souhlasu podle claude.md — pokud budeš chtít
knihovnu, nejdřív návrh a zdůvodnění.
```

---

## Co platí pro každou část

Tohle nemusíš do promptů kopírovat, `claude.md` a `AGENTS.md` se načítají
samy — ale je dobré vědět, že to platí:

- **Fázová kázeň:** jedna část = jedna session. Na konci shrnutí, co je
  hotové, jaké předpoklady čekají na schválení a co zůstalo otevřené.
- **Žádné tiché odhady** u textů, cen a obchodní logiky — nejistota se
  řeší otázkou, ne domněnkou.
- **Kontrola před odevzdáním:** `npm run lint`, `npx tsc --noEmit`,
  `npm run build`, `node .claude/skills/impeccable/scripts/detect.mjs
  components/ app/` (projekt je na 0 nálezů, cokoliv nového je regrese),
  a kontrola mrtvých kotev podle postupu v `claude.md`.
- **Nová trvalá zásada** se zapisuje do `claude.md` **i** `AGENTS.md`,
  pokud ji oba duplikují.

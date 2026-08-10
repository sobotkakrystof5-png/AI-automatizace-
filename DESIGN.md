---
name: AvenIQ
description: Tyrkysovo-mintová identita (paleta R11) na tmavém zeleno-modrém gradientu. Zdrženlivý akcent, tmavé povrchy ze zinc škály, pohyb vždy s reduced-motion variantou.

# POZOR: Zdrojem pravdy je `app/globals.css` (@theme blok) a `claude.md`
# (sekce "Design systém"). Tento frontmatter je jen přenositelný export pro
# detektor anti-patternů. Když se token změní v globals.css, změň ho i tady.
colors:
  # --- Brand tokeny (@theme v app/globals.css) ---
  brand-turquoise: "#2dd4bf"      # PRIMÁRNÍ interaktivní akcent: CTA, aktivní stavy
  brand-mint: "#6ee7b7"           # pouze doplněk k tyrkysové (gradienty, jemné detaily)
  brand-deep-green: "#052e2b"     # vyhrazeno pro pozadí / ambient vrstvy
  brand-deep-blue: "#0a1a2f"      # vyhrazeno pro pozadí / ambient vrstvy

  # --- Základní podklad (body v globals.css) ---
  page-base: "#05070a"            # ground pod ambient gradientem

  # --- Povrchy a text: standardní Tailwind v4 zinc škála, bez vlastní definice ---
  zinc-50: "oklch(98.5% 0 none)"          # primární text, nadpisy
  zinc-400: "oklch(70.5% 0.015 286.067)"  # tlumený text, popisky, placeholdery
  # Vyhrazeno pro text, který je záměrně potlačený a zároveň dost velký,
  # aby na 3:1 stačil (wordmarky v sekci Spolupráce, 24–30 px semibold).
  # Na běžný text se nepoužívá — na tmavém podkladu dává jen ~4,1:1.
  zinc-500: "oklch(55.2% 0.016 285.938)"
  # Jen dekorativní prvky s aria-hidden (pořadová čísla karet v ceníku).
  # Kontrast 2,6:1 je pod AA záměrně — stejná role jako vodoznak 7rem níže.
  zinc-600: "oklch(44.2% 0.017 285.786)"
  zinc-700: "oklch(37% 0.013 285.805)"    # ohraničení (zvýrazněné)
  zinc-800: "oklch(27.4% 0.006 286.033)"  # ohraničení (výchozí)
  zinc-900: "oklch(21% 0.006 285.885)"    # karty, oddělené sekce
  zinc-950: "oklch(14.1% 0.005 285.823)"  # nejtmavší povrch

  # Chybový stav formuláře (FinalCTA.tsx). Jediná barva mimo zinc škálu a
  # čtyři brand tokeny; na zinc-900 dává 6,4:1, takže AA splňuje. Zatím
  # NENÍ pojmenovaný token v @theme — povýšení na `--color-brand-danger`
  # je návrh čekající na souhlas uživatele, ne hotová věc.
  red-400: "#f87171"

  # Doslovný zápis zinc-50. Nutný v app/opengraph-image.tsx: OG obrázky
  # renderuje Satori (next/og), které neumí Tailwind třídy ani CSS
  # proměnné — barva tam musí být literál. Není to nová barva.
  zinc-50-hex: "#fafafa"

typography:
  scale:
    # Reálně používaná škála (Tailwind v4 výchozí kroky). Klíč = px při
    # root 16px. Kroky 6xl a výš se na webu zatím nepoužívají — přidání
    # je designové rozhodnutí, ne pohodlnost.
    #
    # Kroky 9 a 10 px jsou VYHRAZENÉ mikropopisky uvnitř vizuálů, kde je
    # místo fyzicky omezené. Nikdy se nepoužívají na běžný text.
    "9": "0.5625rem"     # text-[9px] — fallback název nástroje v odznaku (ToolChip)
    "10": "0.625rem"     # text-[10px] — mono štítky v diagramu (AutomationJourney),
                         #               názvy nástrojů na desce spojů (ToolBoard)
    "12": "0.75rem"      # text-xs — drobné popisky
    "14": "0.875rem"     # text-sm — nejčastější velikost, běžný text
    "16": "1rem"         # text-base — výchozí tělo
    "18": "1.125rem"     # text-lg — lead odstavec
    "20": "1.25rem"      # text-xl — titulky karet
    "24": "1.5rem"       # text-2xl — podnadpisy
    "30": "1.875rem"     # text-3xl — nadpisy sekcí, mobil
    "36": "2.25rem"      # text-4xl — nadpisy vedlejších sekcí, desktop
    "48": "3rem"         # text-5xl — nadpisy hlavních sekcí, desktop
    # Přidáno 2026-08-05 (etapa D1 redesignu). Strop 48 px byl důvod, proč
    # web působil plochý — nic na stránce nedávalo najevo, co je důležité.
    # Vyhrazeno výhradně pro hero: nikde jinde se nepoužívá.
    "72": "4.5rem"       # text-7xl — hero, od sm výš
    "96": "6rem"         # text-8xl — hero, od lg výš
    # Dekorativní vodoznak: obří pořadové číslo za obsahem karty
    # (Differentiators.tsx), aria-hidden, krytí 10 %. Není to čitelný
    # text, proto stojí mimo běžnou škálu a nesmí se použít na obsah.
    "112": "7rem"        # text-[7rem] — vodoznak, mobil
    "144": "9rem"        # sm:text-[9rem] — vodoznak, od sm výš
  body:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.6
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.875rem"

rounded:
  md: "6px"       # rounded-md
  lg: "8px"       # rounded-lg
  xl: "12px"      # rounded-xl
  "2xl": "16px"   # rounded-2xl
  pill: "9999px"  # rounded-full — nejčastější, štítky a CTA
---

# Design System: AvenIQ

> **Autorita.** Tento soubor je **odvozený** z `app/globals.css` a
> `claude.md` (sekce „Design systém", „Paleta R11"). Vznikl pro design
> skilly, aby neodhadovaly identitu projektu samy.
>
> **Při rozporu vyhrává `claude.md` a `app/globals.css`, ne tento soubor.**
> Skill, který chce změnit paletu, fonty nebo stack, to musí nejdřív
> předložit uživateli a počkat na souhlas — viz `claude.md`, sekce
> „Design skilly".

## 1. Přehled

Tmavé rozhraní postavené na zeleno-modrém ambientním gradientu, ne na
ploché černi. Jediný sytý akcent (tyrkysová) nese veškerou interaktivitu;
mintová je jeho doplněk, nikdy samostatná hlavní barva. Vše ostatní je
neutrální `zinc` škála. Výsledek má působit technicky kompetentně a
klidně — ne jako neonový „AI SaaS".

## 2. Barvy

### Pozadí

Ground je `#05070a` s dvěma `radial-gradient` vrstvami (`brand-deep-green`
vlevo nahoře, `brand-deep-blue` vpravo) a `background-attachment: fixed`.
Definováno v `body` v `app/globals.css`. Plochá `zinc-950` jako pozadí
stránky je **nahrazená** — na úrovni `<body>` se už nepoužívá, a od
2026-08-05 už tam není ani jako Tailwind třída. Nevrstvené pravidlo v
`globals.css` by ji sice přebilo (utility jsou v `@layer utilities`, které
prohrávají s nevrstveným CSS), ale zůstávala by jako mrtvý kód, který
odporuje téhle dokumentaci.

Na dotykových zařízeních (`@media (hover: none)`) se attachment přepíná na
`scroll` — `fixed` tam nutí překreslovat gradient při každém posunu, mobilní
Safari ho stejně nectí spolehlivě a s Lenisem se to sčítá. Rozlišuje se
podle typu zařízení, ne podle šířky okna.

### Povrchy

| Role | Token |
|---|---|
| Karty, oddělené sekce | `zinc-900` (36 výskytů — nejčastější povrch) |
| Nejtmavší povrch, vsazené plochy | `zinc-950` |
| Zvýšený povrch | `zinc-800` |
| Ohraničení výchozí | `border-zinc-800` |
| Ohraničení zvýrazněné | `border-zinc-700` |

### Text

| Role | Token |
|---|---|
| Nadpisy, hlavní text | `zinc-50` |
| Popisky, sekundární text, placeholdery | `zinc-400` |
| Potlačený velký text (≥ 24 px) | `zinc-500` |
| Dekorace s `aria-hidden` | `zinc-600` |
| Chybová hláška formuláře | `red-400` |

Minimum je 4,5:1 na podkladu, na kterém prvek reálně leží. `zinc-500`
projde jen u velkého textu (3:1), `zinc-600` neprojde vůbec — proto je
vyhrazená čistě na dekoraci, která nic nesděluje.

### Focus

Globální `:focus-visible` v `globals.css`: 2px `brand-turquoise` s 2px
odsazením. Platí pro celý web, jednotlivé komponenty si focus **nevypínají**
(`outline-none` bez plnohodnotné náhrady je porušení WCAG 2.2 SC 2.4.11).
Tyrkysová je tu na místě — jde o interaktivní stav, ne o dekoraci, takže
pravidlo zdrženlivosti níže se na ni nevztahuje.

### Akcent

- `brand-turquoise` (#2DD4BF) — **primární interaktivní akcent**. CTA
  tlačítka, aktivní stavy, klíčové zvýraznění. Reálné použití: `text-`,
  `bg-` a `border-brand-turquoise`, ~22 výskytů každý.
- `brand-mint` (#6EE7B7) — **jen doplněk**. Druhý bod v gradientech
  (`.magic-gradient-text`), jemné ambientní detaily.
- `brand-deep-green`, `brand-deep-blue` — **jen pozadí / ambient**
  (`.magic-aurora`). Nikdy text ani interaktivní prvek.

### Pravidla barev

- **Zdrženlivost akcentu.** Tyrkysová ani mintová se nepoužívají plošně
  nebo dekorativně mimo interaktivní a klíčové prvky. Když je akcentu na
  obrazovce moc, přestane znamenat „tady klikni".
- **Žádné nové barvy bez schválení.** Cokoli mimo `zinc` škálu a čtyři
  brand tokeny je potřeba nejdřív navrhnout a počkat na souhlas.
- **Žádný `tailwind.config.ts`.** Tokeny se definují výhradně v `@theme`
  bloku v `app/globals.css` (Tailwind v4, CSS-first). Nikdy natvrdo v
  komponentách.
- `brand-gold` (#B98B4E) a `brand-electric` (#22D3EE) jsou **zrušené**
  tokeny. Výskyt v kódu = nedodělaný úklid, ne platný token.

## 3. Typografie

Geist Sans (`--font-geist-sans`) na text, Geist Mono
(`--font-geist-mono`) na technické detaily. Načteno přes `next/font/google`
v `app/layout.tsx`, napojeno v `@theme` na `--font-sans` / `--font-mono`.

Nejpoužívanější velikost je `text-sm` (69 výskytů) — rozhraní je spíš
kompaktní; nadpisy sekcí sedí na `text-3xl`/`text-4xl`.

**Délka textu je designový prvek, ne obsahový detail.** Nadpis sekce max.
3–6 slov, popis pod ním max. 1 věta do ~12 slov (viz `PRODUCT.md`,
„Design Principles"). Víceřádkové odstavce ve viditelné ploše homepage
nepatří.

## 4. Zaoblení

`rounded-full` je výchozí volba pro štítky a CTA (23 výskytů). Karty a
panely používají `rounded-md` až `rounded-2xl`. Nemíchat víc než dvě
úrovně zaoblení v jednom bloku.

## 5. Rytmus a kompozice

Zavedeno 2026-08-05 (etapa D1). Do té doby mělo **15 z 16 sekcí homepage
identické `py-16 sm:py-20`**, pět různých šířek kontejneru bez pravidla a
`bg-zinc-900` rozházené na pěti sekcích bez systému. Výsledek: nic
nedávalo najevo, co je důležité, a stránka četla jako jeden dlouhý pás.

### Vertikální rytmus — tři stupně

| Stupeň | Třídy | Kde |
|---|---|---|
| **Zlom** | `py-24 sm:py-32` | Hero, závěrečné CTA — sekce, které mají dýchat |
| **Standard** | `py-16 sm:py-24` | Obsahové sekce s vlastním sdělením |
| **Pás** | `py-12 sm:py-16` | Krátké proužky bez samostatné myšlenky (trust strip, marquee, čísla) |

Nikdy nedávat dvě „zlomové" sekce za sebe — rytmus pak zmizí stejně jako
při plochém `py-16` všude.

### Šířky kontejneru — tři, ne pět

| Šířka | Kde |
|---|---|
| `max-w-3xl` | Souvislý text ke čtení — FAQ, kontakt, formulář, rezervace |
| `max-w-5xl` | Text s doprovodným vizuálem — O nás, proces, jak tvoříme |
| `max-w-6xl` | Mřížky a tabulky — oblasti, ceník, čísla, pilíře |

`max-w-2xl` a `max-w-4xl` se na homepage **nepoužívají**. Existující výskyt
je pozůstatek, ne rozhodnutí.

### Rytmus pozadí

`bg-zinc-900` označuje **rozhodovací sekce** — proces práce, ceník a
závěrečné CTA. Nikde jinde. Je to signál „tady se rozhoduješ", ne
dekorativní pruhování; když se použije na každou druhou sekci, přestane
znamenat cokoli.

## 6. Pohyb

Animace jsou v projektu **první třídy** — nejsou to ozdoby, ale nosič
sdělení (hero scrollytelling `AutomationJourney` vysvětluje automatizaci
vizuálně).

Knihovny: **GSAP** (scroll-řízené sekvence), **Motion** (komponentové
přechody), **Lenis** (plynulý scroll, přes `SmoothScrollProvider`).
Přidání další animační knihovny vyžaduje souhlas.

Pojmenované animace v `@theme`: `marquee` (28s), `marquee-fast` (18s),
`slow-spin` (40s), `flow-pulse` (3s), `aurora` (14s).

Klidový pohyb v `AutomationJourney` (drift uzlů, dech jádra, posun
čárkování na kabelech) řídí **GSAP uvnitř komponenty**, ne CSS třída —
musí sdílet timeline s běhy dat a jít zabít při scrollu zpět. Dřívější
`.animate-idle-jitter` byl 2026-08-10 smazán, protože jiného uživatele
neměl.

### Pravidla pohybu

- **Každá nová animace musí přibýt do `prefers-reduced-motion` bloku**
  na konci `app/globals.css`. Blok už vypíná marquee, spin, jitter,
  aurora i gradientový text; `flow-pulse` se pod reduced-motion
  rovnou skryje, protože zastavený puls by vypadal jako tečka navíc.
- **Neanimovat layoutové vlastnosti** — `width`, `height`, `padding`,
  `margin` a stejně tak `left`, `top`, `right`, `bottom`. Nejdou na
  kompozitor a počítají se každý snímek na hlavním vlákně. Používat
  `transform` a `opacity`, na výšku `grid-template-rows`. Když se potřebuje
  něco posunout po dráze proměnné délky, animuje se obal přes celou šířku
  dráhy pomocí `translateX(0 → 100 %)`, ne `left` samotného prvku — viz
  `flow-pulse` v `globals.css` a `MiniProcessDiagram.tsx`.
- **CSS animace se nesmí aplikovat na element, který polohuje GSAP** —
  přepsala by inline transform. Vždy oddělený wrapper.
- **CSS animace `transform` se nesmí kombinovat s Tailwind třídami
  `translate-*` / `scale-*` / `rotate-*` na stejném elementu.** Tailwind v4
  kompiluje tyhle utility do **samostatných** vlastností (`translate:`,
  `scale:`, `rotate:`), ne do `transform:`, a podle CSS Transforms L2 se
  všechny skládají — posun se tedy sečte, ne přepíše. Přesně tímhle se
  dřív posouval `float-y` (plovoucí loga v `ToolOrbit`) o -100 %, -100 %
  místo -50 %, -50 %. Buď centrovat výhradně přes Tailwind a keyframe nechat
  jen na pohybu, nebo použít oddělený wrapper — druhá cesta je dnešní řešení
  pulsů v `ToolBoard.tsx` a `LiveSystemFlow.tsx`.
- **Poznámka k detektoru:** `stroke-width` a `stroke-opacity` na SVG jsou
  prezentační vlastnosti tahu, ne layoutové rozměry — jejich přechod
  reflow nezpůsobuje. Pravidlo `layout-transition` na ně hlásí falešný
  poplach (viz potlačení v `AutomationJourney.tsx`).

## 7. Ano / Ne

### Ano

- Tyrkysová výhradně tam, kde jde o interakci nebo klíčové sdělení.
- Tmavé povrchy ze `zinc` škály, ohraničení `zinc-800`.
- Vizuál, který sdělení unese i s vypnutým textem.
- Každá animace s reduced-motion variantou.
- České texty, krátké věty.

### Ne

- Fialovo-modré gradienty, neon, glassmorphism, plovoucí částice.
- Nové barvy, fonty nebo `tailwind.config.ts` bez souhlasu.
- Mintová jako samostatný primární akcent.
- `brand-deep-green` / `brand-deep-blue` na text nebo tlačítka.
- Karty vnořené v kartách.
- Dlouhé odstavce v hlavním scrollu homepage.
- Vymyšlená loga, reference, čísla nebo právní texty.

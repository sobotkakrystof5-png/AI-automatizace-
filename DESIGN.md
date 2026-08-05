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
  zinc-400: "oklch(70.5% 0.015 286.067)"  # tlumený text, popisky
  zinc-600: "oklch(44.2% 0.017 285.786)"
  zinc-700: "oklch(37% 0.013 285.805)"    # ohraničení (zvýrazněné)
  zinc-800: "oklch(27.4% 0.006 286.033)"  # ohraničení (výchozí)
  zinc-900: "oklch(21% 0.006 285.885)"    # karty, oddělené sekce
  zinc-950: "oklch(14.1% 0.005 285.823)"  # nejtmavší povrch

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
    "9": "0.5625rem"     # text-[9px] — fallback název nástroje v kruhu (ToolOrbit)
    "10": "0.625rem"     # text-[10px] — mono štítky v diagramu (AutomationJourney)
    "12": "0.75rem"      # text-xs — drobné popisky
    "14": "0.875rem"     # text-sm — nejčastější velikost, běžný text
    "16": "1rem"         # text-base — výchozí tělo
    "18": "1.125rem"     # text-lg — lead odstavec
    "20": "1.25rem"      # text-xl — titulky karet
    "24": "1.5rem"       # text-2xl — podnadpisy
    "30": "1.875rem"     # text-3xl — nadpisy sekcí
    "36": "2.25rem"      # text-4xl — velké nadpisy sekcí
    "48": "3rem"         # text-5xl — hero
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
stránky je **nahrazená** — na úrovni `<body>` se už nepoužívá.

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
| Popisky, sekundární text | `zinc-400` |

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

## 5. Pohyb

Animace jsou v projektu **první třídy** — nejsou to ozdoby, ale nosič
sdělení (hero scrollytelling `AutomationJourney` vysvětluje automatizaci
vizuálně).

Knihovny: **GSAP** (scroll-řízené sekvence), **Motion** (komponentové
přechody), **Lenis** (plynulý scroll, přes `SmoothScrollProvider`).
Přidání další animační knihovny vyžaduje souhlas.

Pojmenované animace v `@theme`: `marquee` (28s), `marquee-fast` (18s),
`slow-spin` (40s), `flow-pulse` (3s), `aurora` (14s). Utility třídy
`.animate-float-y` a `.animate-idle-jitter` se ladí per-prvek přes CSS
proměnné (`--float-duration`, `--jitter-delay`), aby prvky neplavaly
synchronně.

### Pravidla pohybu

- **Každá nová animace musí přibýt do `prefers-reduced-motion` bloku**
  na konci `app/globals.css`. Blok už vypíná marquee, spin, float,
  jitter, aurora i gradientový text; `flow-pulse` se pod reduced-motion
  rovnou skryje, protože zastavený puls by vypadal jako tečka navíc.
- **Neanimovat `width`, `height`, `padding`, `margin`** — způsobuje
  layout thrash. Používat `transform` a `opacity`, na výšku
  `grid-template-rows`. (Známý dluh:
  `components/motion/AutomationJourney.tsx:632` animuje `width`.)
- **CSS animace se nesmí aplikovat na element, který polohuje GSAP** —
  přepsala by inline transform. Vždy oddělený wrapper.

## 6. Ano / Ne

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

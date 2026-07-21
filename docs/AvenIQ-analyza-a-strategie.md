# AvenIQ — analýza současného stavu a strategie transformace

Zpracováno jako podklad pro konzultaci a následné rozdělené promptování Claude Code. Perspektiva: technický lead / CEO odpovědný za produkt / byznys stratég / copywriter.


## 1. Executive summary — kde web reálně je

Řeknu to na rovinu, protože to je jediný způsob, jak z toho udělat něco skutečně dobrého:

Kód je čistý a disciplinovaný. Prezentace je plochá a neatraktivní pro cíl, který máš.

Technicky: moderní stack (Next.js 16, Tailwind v4, React 19, Neon+Drizzle), dobře strukturované komponenty, přístupnost (aria, prefers-reduced-motion), server actions pro formulář. Tohle je solidní inženýrský základ — nic tu nemusíš stavět od nuly.

Vizuálně a interaktivně: web má nulovou animační knihovnu (žádný framer-motion/motion, GSAP, Lenis, three.js — jen jeden CSS keyframe pro marquee a jeden vlastní count-up hook). Vizuálně je to plochá tmavá karta-na-kartě šablona bez hloubky, bez pohybu, bez příběhu.

Strukturně: homepage je "zeď odkazů" — 8 sekcí typu "nadpis → 2 věty → odkaz Zjistit více →" vedoucí na 8 samostatných podstránek. To je vzorec z roku 2015 pro SEO landing page, ne prezentace agentury, která chce působit jako lídr trhu.

Obsahově: texty jsou poctivé, promyšlené, ale rozvláčné — odstavce o 3-5 větách tam, kde má být jedno silné heslo. Firma je today jednočlenná (Kryštof Sobotka) — to je fakt, který nejde a nemá se přehrávat, ale dá se komunikovat jako preciznost a osobní zodpovědnost, ne jako "malá firma".

Cíl, který popisuješ (vizuální/obchodní úroveň Pixelmate, Kombain, ElevenLabs Agents, Futugen), je dosažitelný — ale ne kosmetickou úpravou. Je to redesign fundamentů: design systém, motion vrstva, informační architektura a copy najednou. To je přesně to, co níže rozkládám do fází.


## 2. Technická analýza

### Co je v pořádku a zůstává

- Next.js App Router + Server Components jako výchozí — správně, rychlé, dobré pro SEO (SSR/SSG).
- Tailwind v4 CSS-first @theme tokeny — čistý, budoucnost-proof přístup, žádný tailwind.config.ts navíc.
- metadata export na každé podstránce (title/description) — základ SEO je položený správně.
- robots.ts a sitemap.ts existují jako dynamické route handlery — dobrý základ, jen je potřeba je zkontrolovat po redesignu (nové URL, priority, lastModified).
- Server Actions + Zod validace na leadovém formuláři — bezpečný, moderní vzorec.
- CountUpValue — jediný kousek "skutečné" interaktivity v celém webu — je udělaný správně (IntersectionObserver, respektuje reduced-motion). Tohle je vzor kvality, který chci vidět ve všem ostatním.

### Co chybí a je potřeba nejvíc pro tvůj cíl

- Žádná knihovna pro pohyb. package.json neobsahuje motion (framer-motion), GSAP, Lenis ani žádnou 3D knihovnu. Bez toho nejde postavit scroll-triggered reveal, parallax, plynulý scroll, mikrointerakce na hover/tap — tedy přesně to, co dělá weby jako referenční příklady "živé".
- Žádné WebGL/canvas vrstvy. Weby na úrovni ElevenLabs/Futugen typicky mají v hero sekci jemný generativní/gradient-mesh pozadí nebo lehký 3D akcent. Tvůj web má jen bg-zinc-950.
- Chybí OG/Twitter meta obrázky — metadata má title/description, ale žádný openGraph/twitter blok jsem v layout.tsx ani podstránkách nenašel. Bez toho odkaz na sdílený web na LinkedIn/Twitteru vypadá amatérsky (žádný náhledový obrázek).
- Chybí structured data (schema.org) — žádný Organization, Service, FAQPage, BreadcrumbList JSON-LD. FAQ stránka je ideální kandidát na FAQPage schema (rich snippet ve Google výsledcích).
- Placeholder hodnoty jsou live v kódu — ZAKAZIQ_BOOKING_URL a SITE_URL jsou "[DOPLNIT_...]". To znamená, že hlavní CTA tlačítko na celém webu dnes vede na neplatnou URL. Tohle je priorita č. 1 bez ohledu na redesign — bez funkčního CTA je celý web bezcenný.
- Performance rozpočet pro motion. Až přidáme animace, musí se to dít s rozpočtem (lazy-load těžších komponent, will-change cíleně, ne plošně, GSAP/3D jen tam, kde nese hodnotu) — jinak si koupíme "wow efekt" za cenu Core Web Vitals, což SEO i konverzi naopak poškodí. Toto je nutné explicitně zadat Claude Code jako pravidlo, ne nechat "aby to vypadalo hezky".


## 3. Informační architektura a UX — hlavní problém webu

Aktuální app/page.tsx je doslova smyčka <SectionTeaser> komponent: nadpis, dvě věty, odkaz pryč. Homepage tak nikoho nepřesvědčí přímo na místě — jen bombarduje odchozími odkazy. Návštěvník musí prokliknout 8 stránek, aby složil obrázek, co firma vlastně dělá a proč je dobrá. Prémiové agentury dělají opak: hlavní přesvědčovací příběh je celý na homepage (scroll = příběh), podstránky slouží pro SEO long-tail a detail pro ty, kdo chtějí víc.

### Doporučená nová IA:

1. Homepage = kompletní prodejní příběh v jedné scroll sekvenci (7–9 sekcí, každá vizuálně odlišná, žádná není "text + link pryč"):
   - Hero — silné heslo, ne dvě věty; živý vizuál automatizace (animovaný diagram toku dat), CTA.
   - Sociální důkaz / čísla — přepracovaný StatsBar s poctivým rámováním (viz sekce Copy níže).
   - Problém → řešení (dřív "V čem jsme jiní") — interaktivní karty/tabs, ne 4 statické boxy.
   - Co automatizujeme — vizuální grid oblastí (marketing, podpora, účetnictví…) s hover-preview, ne jen text.
   - Jak to funguje — proces jako horizontální/vertikální animovaná timeline (scroll-scrubbed), ne 6 textových boxů.
   - Proč automatizace, ne jen ChatGPT — vizuální srovnávací tabulka (tohle už v kódu existuje jako comparisonRows, jen potřebuje vizuální upgrade).
   - Ceník — zjednodušený, 3 pásma, ale jako interaktivní karty s hover-zvýrazněním, ne ploché boxy.
   - Záruka + FAQ teaser.
   - Finální CTA + formulář (existující FinalCTA je obsahově OK, jen potřebuje vizuální redesign).
2. Podstránky zůstávají (SEO long-tail hodnota je reálná — /automatizace/[slug] per oblast je chytré), ale přestávají být jediným místem, kde se něco vysvětluje. Jsou to prohloubení, ne první kontakt.
3. Navigace se zjednoduší — 8 položek v menu je moc. Seskupit do 3–4 (Řešení, Ceník, Jak pracujeme, O nás) + FAQ do patičky/kontextu.


## 4. Vizuální / design analýza

### Diagnóza současného designu

Paleta zinc-950/900/800 + jeden akcent #B98B4E je rozumný základ (tmavý, elegantní), ale realizace je plochá:

- Karty = rounded-lg border border-zinc-800 bg-zinc-900 p-6 — stejný vzorec opakovaný na každé stránce, bez hierarchie, bez hloubky (žádný stín, glow, gradient, textura).
- Typografie stojí na výchozím Geist fontu bez výraznější kontrastní hierarchie (jeden font-semibold nadpis za druhým).
- Jediný pohyb na celém webu je marquee pás a count-up čísla — vše ostatní je statické od prvního renderu.

### Směr, kam to posunout (bez kopírování cizího designu, princip toho, co dělá "sub-agentury s obratem $200M+")

Weby v tvém referenčním koši (AI-transformační/agenturní studia) sdílí několik principů, ne konkrétní vzhled — a přesně principy chceme replikovat:

1. Motion jako součást sdělení, ne dekorace. Automatizace = tok dat mezi systémy. Hero by měl obsahovat animovanou vizualizaci tohoto toku (SVG cesty, které se "kreslí" a pulzují, uzly systémů co se rozsvěcují) — doslova ukázat, co firma dělá, ne to jen popsat větou.
2. Hloubka místo plochých karet. Jemné gradient-glow pozadí za klíčovými sekcemi, jemný noise/grain overlay pro "tech-luxury" texturu, karty s měkkým vnitřním světlem/border-glow při hoveru, ne jen border-zinc-800.
3. Kontrastní typografická hierarchie. Obrovské hero nadpisy (fluid typography, clamp()), extrémní kontrast velikostí mezi headline a body textem — to samo o sobě dělá web "drahým".
4. Scroll jako řízený zážitek. Plynulý scroll (Lenis), scroll-triggered reveal (GSAP ScrollTrigger nebo motion useScroll), sticky/pinned sekce u procesní timeline.
5. Mikrointerakce všude. Magnetické CTA tlačítko, cursor-aware hover efekty na kartách, čísla co "tikají" při vstupu do viewportu (tohle už máš jako vzor v CountUpValue — jen to rozšířit).
6. Živá ukázka produktu, ne jen sliby. Weby jako ElevenLabs Agents dávají prostor rovnou vyzkoušet/vidět produkt v akci. U tebe by ekvivalent mohl být: mini interaktivní demo "zadejte proces → uvidíte animovaný návrh automatizace" nebo alespoň realistická animovaná ukázka konkrétního workflow (faktura → AI čte → zaúčtování), ne abstraktní ikony.

### Barevná paleta — doporučení

Zůstat u tmavé zinc báze (je to správná volba pro "tech/luxury"), ale:

- Zvážit rozšíření brand.gold o druhý, chladnější akcent (např. elektrická modrá/tyrkysová nebo fialová) pro odlišení interaktivních/AI prvků od CTA — čistě zlatá paleta rychle působí "wellness/luxury", ne "AI-tech". Tohle je designové rozhodnutí, které potřebuje tvůj souhlas (viz claude.md pravidlo o vlastních barvách) — dávám ho jako otevřenou otázku níže.
- Přidat gradient meshe/glow jako efekt, ne jako nové plošné barvy — technicky to neporušuje pravidlo "jen zinc + gold", protože jde o opacity/blur variace existujících tokenů.


## 5. Copywriting analýza — a napětí, které musíme vyřešit poctivě

Texty jsou věcně v pořádku a lidsky napsané, ale strukturálně jsou to odstavce, ne hesla. Příklad z Differentiators.tsx:

> "Nezačínáme otázkou 'jaký nástroj chcete propojit'. Začínáme otázkou, co vás na vašem provozu skutečně brzdí — a teprve pak hledáme technické řešení. Automatizace, která neřeší reálný problém, je jen drahá hračka."

Tohle je dobrá myšlenka utopená ve třech větách. Cíl, který popisuješ ("žádné dlouhé texty, jasná struktura, hesla"), znamená: hlavní sdělení každé sekce = jedna řádka, max 8-10 slov, s tím, že hlubší vysvětlení buď mizí, nebo jde do <details>/podstránky pro ty, kdo chtějí víc.

Příklad přepisu (ukázka principu, ne finální copy — to je práce copywriteru na míru v dalším kroku):

- Hero dnes: "Chytrá automatizace. Lidský přístup." + 2 další věty → zůstává silné, ale zbytek se škrtá nebo scvrkne na jeden podnadpis.
- Diferenciátor č.1 výše → "Řešíme problém, ne nástroj."
- Diferenciátor č.3 → "Řekneme vám i to, co se nevyplatí postavit."

### Napětí, které nejde obejít: velikost vs. důvěryhodnost

claude.md explicitně zakazuje předstírat větší tým, než reálně existuje (dnes: jen Kryštof Sobotka). Zároveň chceš působit jako hráč na úrovni agentury s obratem stovek milionů. Toto se dá vyřešit copy strategií, ne lží:

- Nekomunikovat velikost ("tým 50 lidí"), komunikovat preciznost a osobní odpovědnost ("jeden zakladatel, plná odpovědnost za každý projekt — žádné předávání mezi juniory").
- Čísla v StatsBar už dnes correctly rámují malá čísla jako přednost ("menší čísla než u velkých agentur — ale za každým stojí přímá zkušenost"). Tenhle tón je správný a má se posílit vizuálně, ne obsahově změnit.
- Vizuální a technická úroveň webu (motion, polish, systém) je to, co signalizuje "agenturní" level — ne tvrzení o počtu zaměstnanců. To je přesně tvůj plán a je strategicky správný.


## 6. SEO — kompletní checklist

### Už hotovo / základ položen:

- metadata per stránka, robots.ts, sitemap.ts, sémantické nadpisy (H1 na stránku).

### Chybí a je potřeba doplnit:

- openGraph + twitter metadata (title, description, image) v layout.tsx a idálně per-page override — bez toho žádné sdílení nevypadá důvěryhodně.
- JSON-LD structured data: Organization (globálně v layoutu), FAQPage na /faq, Service/Offer na /cenik a /automatizace/[slug], BreadcrumbList na podstránkách.
- Canonical URL tagy (zvlášť důležité až budou existovat varianty/parametry).
- Alt texty a next/image (aktuálně web nemá žádné produkční fotky/ilustrace — s redesignem přibudou vizuály, každý potřebuje smysluplný alt text hned od začátku).
- Interní prolinkování mezi /automatizace/[slug] stránkami a homepage sekcemi (dnes je prolinkování jen homepage→podstránka, ne mezi podstránkami navzájem).
- SITE_URL a ZAKAZIQ_BOOKING_URL musí být reálné hodnoty před nasazením — dokud jsou placeholder, sitemap i hlavní CTA jsou technicky rozbité pro SEO indexaci i konverzi.
- Core Web Vitals rozpočet pro nově přidávaný motion (viz sekce 2, bod 6) — Google penalizuje pomalý LCP/CLS, takže "více JS animací" musí být implementováno s lazy-loadingem a respektem k performance, ne naslepo.
- Rozšíření obsahu o content hub / blog (dlouhodobě) — žádná z prémiových referenčních agentur nespoléhá jen na produktové stránky, SEO tah na "AI automatizace pro [obor]" long-tail fráze potřebuje obsah navíc. Tohle je fáze po základním redesignu, ne součást první vlny.


## 7. Navržené rozdělení do fází (pro Claude Code)

V souladu s tím, jak je claude.md/AGENTS.md už dnes nastavené (fázová kázeň, žádné tiché odhady u cen/textů/závazků firmy), navrhuji rozdělit transformaci do samostatných session/promptů takto — každá fáze je samostatně smysluplná a navazuje na předchozí:

**Fáze A — Design systém a motion foundation**
Instalace a konfigurace motion (framer-motion) + případně GSAP ScrollTrigger a Lenis; rozšíření @theme tokenů (gradient/glow proměnné, případně druhý akcent po tvém schválení); stavba znovupoužitelných primitiv (AnimatedSection, MagneticButton, GlowCard, AnimatedCounter na bázi existujícího CountUpValue); aktualizace /design-preview jako živé sandboxu pro schválení stylu předtím, než se rozjede na celý web.

**Fáze B — Homepage: nová struktura a redesign**
Přepis app/page.tsx z "wall of teasers" na plnohodnotnou scroll-story sekvenci (viz sekce 3); redesign/nahrazení Hero, StatsBar, Differentiators, Mission, Collaboration, FinalCTA; nová animovaná vizualizace "toku automatizace" v hero.

**Fáze C — Podstránky: vizuální a strukturální redesign**
Aplikace nového design systému na /automatizace, /cenik, /proces-prace, /jak-tvorime-automatizace, /zaruka, /faq, /o-nas, /proc-automatizace; zkrácení textů na hesla + volitelné rozbalení detailu.

**Fáze D — Copywriting průchod**
Systematický přepis veškerého textu na heslovitou formu se zachováním faktické přesnosti (ceny, záruky, proces) — dělá se po vizuální kostře, aby copy sedělo na nový layout, ne naopak.

**Fáze E — SEO a technický dotažení**
JSON-LD, OG obrázky, sitemap/robots kontrola, performance audit (Lighthouse/Core Web Vitals) po přidání motion vrstvy, doplnění SITE_URL/ZAKAZIQ_BOOKING_URL.


## 8. Rozhodnutí z konzultace (potvrzeno uživatelem 2026-07-18)

| Otázka | Rozhodnutí |
|---|---|
| Intenzita motion | Maximální — framer-motion + GSAP ScrollTrigger + Lenis smooth scroll + lehký 3D/WebGL akcent v hero. Vědomě přijímáme vyšší nároky na výkon a údržbu; performance rozpočet (viz sekce 2, bod 6) je proto povinná součást zadání, ne volitelná. |
| Barevná paleta | Zlatá brand.gold zůstává jako CTA/klíčový akcent + přidán jeden chladný akcent (elektrická modrá/tyrkysová) pro AI/interaktivní/technické prvky (diagramy toku dat, aktivní stavy, glow efekty na interaktivních komponentách). Přesný odstín se odsouhlasí na /design-preview před rozšířením do celého webu. |
| Struktura webu | Hybrid: homepage = kompletní prodejní scroll-příběh (hlavní vstupní bod, heslovité sekce, silné vizuály). Podstránky zůstávají a dostávají stejnou vizuální/motion úroveň — fungují jako prohloubení konkrétní sekce homepage, ne jako duplicitní obsah ani jako "jen SEO výplň". Podstránky se navíc prolinkují mezi sebou navzájem, ne jen z homepage. |


## 9. Poznámka k realizaci (doplněno 2026-07-18, viz plán Checkpoint 0–1)

Hero vizualizace použije SVG/Canvas + motion/GSAP místo three.js/@react-three/fiber (mobile-first performance rozpočet, scénář nepotřebuje 3D hloubku) a konkrétní schválený scénář je: "Faktura dorazí e-mailem → AI ji přečte a vytěží data → automaticky se zaúčtuje nebo eskaluje ke kontrole." Druhý akcent byl navržen jako `--color-brand-electric: #22d3ee`, čeká na vizuální potvrzení na `/design-preview`. Fáze A–E z tohoto dokumentu odpovídají Checkpointům 1–5 v navazujícím master promptu; Checkpoint 0 (oprava placeholder CTA odkazů na ZAKAZIQ_BOOKING_URL) byl přidán navíc jako urgentní předstupeň.

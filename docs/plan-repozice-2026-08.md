# AvenIQ → repozice a redesign webu
## Kompletní byznysový a webový plán (srpen 2026, v2)

Kontext: Kryštof Sobotka, zakladatel úspěšné firmy VIZEON (design a
weby), přechází do AI automatizace. Prošel kurzy a měsíce praxe,
zautomatizoval vlastní firmu a postavil ZakazIQ — vlastní aplikaci,
která mu automaticky řídí freelancing byznys 24/7. Cíl: postavit web,
který působí profesionálně, staví na osobním příběhu a poslání firmy,
a cílí na menší a středně velké firmy obecně — bez uzavření se jen na
jedno nebo dvě odvětví.

> **Změna oproti v1 (viz sekce 9 — historie rozhodnutí).** Původní
> verze tohoto plánu navrhovala výhradní specializaci na účetní a
> realitní kanceláře. Po zpětné vazbě se positioning rozšiřuje na
> menší a středně velké firmy obecně — účetnictví a reality zůstávají
> jako silné, konkrétní příklady (protože tam je znalost oboru
> nejvýraznější), ale nejsou už jedinou cílovkou.

---

## 1. Byznysová repozice

### Nová pozice
**"Nejsem agentura, která slibuje automatizaci pro každého bez
rozdílu. Jsem člověk, který nejdřív zautomatizoval vlastní byznys — a
teď stejné know-how nabízí menším a středně velkým firmám, které chtějí
přestat topit čas v rutině."**

Tři pilíře odlišení (upraveno):

1. **Osobní důkaz, ne sliby.** VIZEON (úspěšná firma, kterou jsi
   postavil) + ZakazIQ (aplikace, kterou jsi sám navrhl a naprogramoval
   a která ti reálně běží 24/7) jsou tvůj case study číslo jedna —
   dřív, než získáš první referenci v nové oblasti. `claude.md`
   zakazuje předstírat důvěryhodnost, kterou nemáš — tohle jsou
   reference, které skutečně máš, jen ne od klienta v automatizaci.
2. **Poslání jako rámec, ne jen prodejní tvrzení.** Cíl není "prodat
   automatizaci", ale pomoct firmám soustředit se na to, co má pro
   jejich byznys skutečně smysl (viz sekce 5a). To je nadřazené
   jakémukoliv konkrétnímu odvětví.
3. **Konkrétnost přes příklady, ne přes uzavřenou niku.** Účetnictví a
   reality zůstávají jako nejsilnější příklady automatizací (fakturace,
   nabídky, dokumenty) — ukazují, že rozumíš byznysu do detailu — ale
   web nesmí znít, jako že mimo tyhle dva obory nepomůže. Formulace typu
   "pro menší a středně velké firmy, například v účetnictví nebo
   realitách" je bezpečnější než "jen pro tyhle dva obory".

### Jak to nekazit
- Nepřehánět "profík v n8n po pár měsících" do "expert na cokoliv" —
  konkrétní příklady automatizací jsou věrohodnější než obecné tvrzení
  o expertize.
- ZakazIQ a VIZEON se prezentují jako **to, co reálně jsou** — vlastní
  produkt/firma, ne "klientská reference". Jazykově se to musí jasně
  odlišit, jinak to působí matoucně nebo jako obcházení pravidla o
  vymyšlené důvěryhodnosti.
- Jedna osoba zůstává jedna osoba — příběh o přechodu z designu do AI
  automatizace je silnější než předstíraný tým, ne slabina, kterou je
  třeba schovávat.
- **Nikdy neuvádět ceny nikde na webu** (viz sekce 6) — to je teď
  pevné pravidlo napříč celým webem, ne jen u konkrétních produktů.

---

## 2. Nová struktura webu — inspirováno vizeon.cz

Struktura vychází z ověřeného vzorce, který už používáš na vizeon.cz
(jeden člověk, přímá komunikace, důraz na poslání a proces, kontakt až
na úplném konci) — přenesený do AvenIQ a přizpůsobený tomu, že AvenIQ
prodává automatizace, ne weby.

### Pořadí sekcí na homepage
1. **Hero** — nový claim (viz sekce 5), CTA "Konzultace zdarma".
2. **Důvěra / krátká citace** — obdoba vizeon.cz pruhu "Web hotový do
   10 dní / Odpovídám do 24 hodin / Komunikujete přímo se mnou" +
   citace typu *"Nejsem agentura. Jsem člověk, který to udělá."*
   Přizpůsobit AvenIQ realitě (např. "Odpovídám do 24 hodin",
   "Komunikujete přímo se mnou", "Automatizace na míru, ne šablona").
3. **Poslání** — proč AvenIQ existuje (viz sekce 5a), vizuálně oddělené
   od prodejního jazyka.
4. **O mně** — zkrácená verze příběhu (VIZEON → AI automatizace →
   ZakazIQ), odkaz na plnou `/o-mne` stránku — stejná role jako sekce
   "Jeden kontakt. Žádné přehazování. Výsledky." na vizeon.cz.
5. **Proč automatizace, ne jen ChatGPT** — zůstává, funguje dobře.
6. **Příklady automatizací** — konkrétní ukázky (faktury, e-maily,
   sociální sítě, dokumenty…), zatím bez uzavření na obor. Obsah k
   doplnění (viz sekce 6 a 8).
7. **Služby** — přehled toho, co si u AvenIQ lze objednat, ve formátu
   podobném vizeon.cz sekci "Služby" (číslované karty), ale **bez cen**
   — místo "Zobrazit ceny" vede karta na kontakt/konzultaci. Obsah
   jednotlivých služeb se doplní později (viz sekce 6).
8. **Jak spolupráce probíhá** — 5 kroků (viz sekce 6), nahrazuje
   současný abstraktnější `ProcessSteps`.
9. **ZakazIQ** — samostatná sekce ve stylu vizeon.cz "Systém pro
   klienty" (viz sekce 7) — nejsilnější vizuální a důkazní prvek webu.
10. **FAQ** — redukované na nejpodstatnější otázky (viz sekce 8).
11. **Kontakt + formulář** — sloučené dohromady, **úplně dole**, stejně
    jako na vizeon.cz ("Pojďme na to" + formulář + telefon/e-mail
    zároveň).

### Co se ruší
- **Ceník jako samostatná sekce/stránka mizí úplně.** Nikde na webu se
  neuvádí konkrétní cena ani cenové pásmo. Kontakt/konzultace je jediná
  cesta ke zjištění ceny — stejný princip jako "cena dle dohodnuté
  nabídky" na vizeon.cz, jen bez zobrazování žádných orientačních
  částek (vizeon.cz orientační ceny ukazuje, AvenIQ **ne**).
- **"Pro koho" filtr (odvětví jako vstupní brána)** se ruší jako
  samostatná sekce — odvětví (účetnictví, reality) žijí dál jako
  příklady uvnitř sekce 6 a 7, ne jako hlavní navigační rozcestník.
- Samostatné landing pages `/ucetnictvi` a `/reality` z v1 plánu se
  ruší jako prioritní — pokud budou dávat smysl později (např. pro
  placenou akvizici cílenou na obor), je to samostatné rozhodnutí, ne
  součást téhle fáze.

### Navigace (upraveno)
O mně · Poslání · Služby · Jak pracujeme · ZakazIQ · FAQ · Kontakt.
Žádná položka "Ceník".

---

## 3. Datová vrstva — úprava

Katalog automatizací (`lib/automation-products.ts` z v1 plánu) se
zjednodušuje — **bez cenového pole**:

```ts
type AutomationExample = {
  slug: string;
  title: string;            // např. "Vytěžování a tvorba faktur"
  summary: string;          // 1 věta, co to dělá
  industries?: string[];    // volitelné příklady oborů, ne povinná kategorizace
};

type Service = {
  slug: string;
  title: string;            // název služby (Fáze 1: Konzultace, atd. — nebo konkrétní automatizace)
  summary: string;
  // Žádné pole s cenou. Cena se nikde v datové vrstvě neobjevuje,
  // aby ji nešlo omylem zobrazit na frontendu.
};
```

`PRODUCT.md`/`claude.md` — sekce "Users" se upravuje na "menší a
středně velké firmy" (obecně), s poznámkou, že účetnictví a reality
jsou nejsilnější ukázkové příklady. Toto je governance dokument, který
řídí i budoucí design/copy rozhodnutí — musí zůstat v souladu s
aktuálním positioningem.

---

## 4. Sekce "O mně" a "Poslání" — beze změny oproti v1

(Obsah zůstává stejný jako v předchozí verzi plánu — viz níže,
zkopírováno pro úplnost.)

### 5a. Poslání
- Nadpis sekce: **"Naše poslání"**
- Tělo: *"Pomáháme firmám soustředit se na to, co má pro jejich byznys
  skutečně smysl — odebíráme jim rutinní procesy, které za ně zvládne
  automatizace."*
- Kratší varianta (mikrokopie): *"Automatizujeme rutinu. Vy se
  soustředíte na byznys."*
- Fráze **"automatizování rutinních procesů"** se opakuje i mimo tuto
  sekci — v podnadpisu hero, meta description, případně v sekci
  Služby.

### O mně (zkrácená verze na homepage)
"Postavil jsem VIZEON — firmu na design a weby, která funguje dodnes.
Poslední rok jsem se naplno ponořil do AI automatizace: kurzy, praxe,
a nakonec vlastní aplikace ZakazIQ, která mi řídí byznys 24/7. Teď
stejné know-how nabízím menším a středně velkým firmám."

---

## 5. Hero a positioning copy (aktualizováno)

- Nadpis: **"Automatizace, která vám vrátí čas na to, co má smysl."**
  (alternativa: "Automatizujeme rutinu. Vy se věnujte byznysu.")
- Podnadpis: "Postavil jsem si vlastní automatizační systém. Teď
  stejné know-how nabízím menším a středně velkým firmám."
- Citace/diferenciátor (nová, nahrazuje verzi zúženou na 2 obory):
  *"Nejsem agentura, která slibuje automatizaci pro každého. Jsem
  člověk, který zautomatizoval vlastní byznys — a přesně vím, jak na
  to i u vás."*
- CTA zůstává jednotné: "Konzultace zdarma".

---

## 6. Služby a proces spolupráce (nové sekce, bez cen)

### Proces spolupráce — 5 kroků
Nahrazuje současný `ProcessSteps`. Přesné znění podle zadání:

1. **Konzultace na míru** — zjistíme, co firmu trápí.
2. **Návrh řešení** — konzultace návrhu, úpravy podle zpětné vazby.
3. **Implementace** — přímo na vašem serveru.
4. **Testování a dolaďování.**
5. **Spuštění** — podpora 1 měsíc zdarma od spuštění.

Vizuálně jako číslované kroky (podobně jako vizeon.cz "Jak spolupráce
probíhá"), ale 5 kroků místo 7 — odpovídá jednodušší povaze
automatizačního projektu oproti tvorbě webu.

### Služby (obsah k doplnění)
Sekce v layoutu podobném vizeon.cz "Služby" (číslované karty, krátký
popis, co karta obsahuje) — **ale nikdy se nezobrazuje cena ani
tlačítko "Zobrazit ceny"**. Místo toho každá karta vede na kontakt/
konzultaci ("Probrat na konzultaci →").

Konkrétní jednotlivé služby/automatizace, které se do karet doplní,
zatím nejsou finální — status: **k doplnění později** (viz sekce 8,
otevřené otázky). Až budou k dispozici, je vhodné navázat na dřívější
příklady z v1 plánu (vytěžování faktur, automatické e-maily, tvorba
příspěvků na sociální sítě, přepisy PDF, příprava nabídek) jako
výchozí inspiraci, ne jako uzavřený seznam.

### Příklady automatizací
Samostatná, lehčí sekce (blíž k `AutomationAreas` v současném webu) —
krátké, konkrétní ukázky bez nutnosti prokliku do detailu. Slouží k
tomu, aby si návštěvník bez čtení dlouhého textu okamžitě představil,
co automatizace znamená v praxi. Obsah stejně čeká na finální výběr.

---

## 7. Sekce ZakazIQ — inspirováno vizeon.cz

Na vizeon.cz je ZakazIQ prezentovaný jako "Systém pro klienty" —
samostatná sekce s vlastním jménem, 3 číslovanými vlastnostmi,
screenshotem klientského prostředí a mini "jak to funguje" postupem.
Pro AvenIQ navrhuji stejnou stavbu, jen s obsahem upraveným na to, co
ZakazIQ skutečně je v kontextu AvenIQ (důkaz vlastní automatizační
schopnosti, ne klientský komunikační systém):

1. **Nadpis sekce**: "ZakazIQ" + podtitul "Automatizace, kterou jsem
   postavil pro sebe — a teď běží 24/7."
2. **3 číslované vlastnosti** (obdoba "Přímá komunikace / Zpětná vazba
   / Přehled" na vizeon.cz) — přizpůsobit tomu, co ZakazIQ reálně dělá
   (např. příjem poptávek, automatické zpracování, přehled provozu bez
   zásahu člověka — přesné znění doladíme podle skutečné funkčnosti
   aplikace).
3. **Screenshot/vizualizace** prostředí ZakazIQ.
4. **"Jak to funguje" — krátká sekvence kroků** (obdoba 4 kroků na
   vizeon.cz), popisující automatizovaný tok bez zásahu člověka.
5. CTA na konci sekce, vedoucí ke konzultaci — ne k samostatnému
   nákupu ZakazIQ (pokud se to v budoucnu nerozhodne jinak — to je
   otevřená otázka z v1 plánu, zatím nezodpovězená).

---

## 8. FAQ — redukce

Současný web má **14 otázek** — výrazně moc. Cíl: redukovat na
nejpodstatnějších cca 5–6, zbytek buď vypustit, nebo sloučit.

### Doporučení, co ponechat (jádro)
1. *Nevím přesně, co chci automatizovat. Vadí to?* — snižuje bariéru
   k prvnímu kontaktu, důležité držet.
2. *Jak dlouho realizace trvá?* — praktická, časová očekávání.
3. *Potřebuju technické znalosti nebo vlastní IT tým?* — řeší běžnou
   obavu netechnického majitele firmy.
4. *Co se stane s mými firemními daty?* — důvěra/GDPR, důležité.
5. *Proč bych si to nezvládl/a jen v ChatGPT?* — klíčový diferenciátor,
   zůstává.
6. *Co když se automatizace po čase rozbije?* — záruka, buduje důvěru.

### Ke zvážení — sloučit nebo vypustit
- *Kolik to bude přesně stát?* — **vyžaduje přepis**, protože
  odkazovala na ceník, který teď neexistuje. Pokud otázka zůstane,
  odpověď musí znít ve stylu "cena se řeší vždy až na konzultaci,
  podle rozsahu" — bez jakéhokoliv čísla nebo rozmezí.
- *Funguje to i pro malou firmu nebo OSVČ, ne jen pro velké firmy?* —
  lze sloučit do odpovědi o cílovce v sekci "O mně"/Poslání, nemusí
  být samostatná otázka.
- *Máme už nějaké systémy — poradíte si s tím?*, *Nabízíte i
  zaškolení týmu?*, *Co když budete nemocný nebo na dovolené?*, *Co
  když zaměstnanec, který proces znal, odejde z firmy?*, *Co když
  během provozu změníme naše procesy nebo vyrosteme?*, *Jak dlouho
  trvá, než uvidím výsledky?* — validní otázky, ale nižší priorita;
  buď úplně vypustit, nebo je nechat jen jako doplněk na samostatné
  podstránce/FAQ archivu, ne v hlavní sekci na homepage.

Finální výběr a přesné znění je na tobě — výše je návrh redukce podle
důležitosti pro rozhodování prvokontaktu, ne závazný seznam.

---

## 9. Kontaktní formulář — úprava polí

Současný formulář (`FinalCTA.tsx`) má pole:
Jméno*, E-mail*, Telefon, **Co vás dnes nejvíc brzdí a jak si
představujete ideální stav?*** (povinné, textarea), **Jaká je vaše
vize automatizace ve firmě?** (nepovinné, textarea), Odkaz na web
firmy, souhlas se zpracováním osobních údajů.

### Změna
- **Odstranit úplně**: "Co vás dnes nejvíc brzdí a jak si představujete
  ideální stav?" i "Jaká je vaše vize automatizace ve firmě?" — tohle
  se řeší až na konzultaci, ne předem ve formuláři.
- **Přidat místo nich jediné pole**: **"Co máte na srdci (nepovinné)"**
  — krátká textarea, bez `required`, nahrazuje obě dřívější pole.
- Zůstává: Jméno*, E-mail*, Telefon (nepovinné), Odkaz na web firmy
  (nepovinné), souhlas se zpracováním osobních údajů*.

Výsledný formulář je výrazně kratší — nižší bariéra k odeslání, v
souladu s duchem vizeon.cz formuláře (Jméno, Email, Telefon, Zpráva).

### Umístění
Formulář se přesouvá tak, aby byl **spolu s kontaktními údaji (e-mail,
telefon) v jedné sekci úplně dole na stránce** — ne odděleně (dnes má
web samostatné `Contact` a `Booking` sekce před `FinalCTA`). Sloučit
do jedné finální sekce podle vzoru vizeon.cz ("Pojďme na to" + telefon/
e-mail + formulář pohromadě).

---

## 10. AI chatbot — poznámka na později (neimplementovat teď)

Plán do budoucna, zatím jen zaznamenáno pro paměť projektu:

- Cíl: AI chatbot na webu, napojený na vlastní n8n backend.
- Backend (n8n workflow) si nastavíš samostatně, napojení na web přijde
  **až později** — není součástí žádné z fází níže.
- Až bude aktuální, bude potřeba: rozhraní chatbotu na frontendu
  (widget), API/webhook napojení na n8n, a rozhodnutí, jestli chatbot
  odpovídá jen na FAQ úroveň, nebo pomáhá i s kvalifikací leadu před
  konzultací.

## 10a. Rezervační systém "Konzultace zdarma" — poznámka na později (neimplementovat teď)

Stejně jako chatbot — zatím jen zaznamenáno, řeší se až v budoucí fázi.

- Inspirace: vizeon.cz, kde tlačítko konzultace vede rovnou na výběr
  konkrétního termínu a času (kalendářový booking), ne jen na
  kontaktní formulář.
- Cíl pro AvenIQ: kliknutí na "Konzultace zdarma" → klient si vybere
  volný termín a čas → rezervace se automaticky propíše do tvého
  ZakazIQ systému (stejná role, jakou dnes u AvenIQ hraje placeholder
  `ZAKAZIQ_BOOKING_URL` zmíněný v technickém dluhu, sekce 6 v1 plánu —
  tohle je jeho plnohodnotná realizace, ne nová myšlenka od nuly).
- Až bude aktuální, bude potřeba: napojení na kalendář/dostupnost
  (buď přímo v ZakazIQ, nebo přes n8n workflow, který zapisuje
  rezervaci do ZakazIQ), UI pro výběr termínu na webu, potvrzovací
  e-mail klientovi.
- Vztah k AI chatbotu (sekce 10): obě funkce pravděpodobně poběží přes
  stejný n8n backend — dává smysl je plánovat a nasazovat společně,
  až přijde čas, ne nutně odděleně.

## 11. Fázový postup (aktualizováno)

**Fáze 1 — Governance a positioning**
Přepsat `PRODUCT.md`/`claude.md` (cílovka: menší a středně velké
firmy, ne uzavřená specializace). Upravit hero a diferenciátor copy
podle sekce 5.

**Fáze 2 — Rychlé, nízkorizikové úpravy (lze dělat hned)**
- Úprava kontaktního formuláře podle sekce 9 (odebrat 2 pole, přidat
  "Co máte na srdci").
- Redukce FAQ podle sekce 8.
- Odstranění Ceníku (sekce, stránka, odkazy v navigaci a footeru).

**Fáze 3 — Restrukturalizace homepage**
Přeuspořádat sekce podle pořadí v sekci 2 — nová sekce Poslání, nová
sekce Služby (bez cen), nový 5krokový proces, sloučení Kontakt +
formulář na konec stránky.

**Fáze 4 — ZakazIQ sekce**
Nová sekce podle sekce 7 — vizuální i obsahová stavba inspirovaná
vizeon.cz, přizpůsobená kontextu AvenIQ.

**Fáze 5 — `/o-mne` stránka**
Plný příběh VIZEON → AI automatizace → ZakazIQ.

**Fáze 6 — Obsah služeb a příkladů automatizací**
Až budou finální jednotlivé služby/automatizace (viz otevřené otázky),
doplnit karty v sekci Služby a Příklady automatizací.

**Fáze 7 — Technický dotah**
OG obrázky, JSON-LD, funkční booking URL, performance/SEO audit.

**Fáze 8 (budoucnost, mimo tento plán) — AI chatbot a rezervační systém**
Viz sekce 10 a 10a — realizuje se až po dokončení fází 1–7 a po
nastavení n8n backendu. Doporučeno plánovat společně, protože obě
funkce pravděpodobně sdílí stejný backend.

---

## 12. Otevřené otázky (potřebují tvé rozhodnutí, ne odhad)

- Konkrétní obsah jednotlivých karet v sekci "Služby" — jaké
  automatizace/služby se mají skutečně nabízet jako první (viz sekce
  6 — "služby ještě uvidíme").
- Finální výběr a znění FAQ otázek (sekce 8 je jen doporučení).
- Přesné vlastnosti ZakazIQ pro "3 číslované vlastnosti" a "jak to
  funguje" kroky (sekce 7) — potřebuju vědět, co aplikace reálně dělá,
  abych to nepopsal generičtěji, než je pravda.
- Má ZakazIQ vlastní landing page vést i k možnosti si ji koupit/
  vyzkoušet jako produkt, nebo zůstává čistě jako case study/důkaz
  schopností?
- Timing napojení AI chatbota (sekce 10) — zatím jen poznámka, čeká na
  tvůj signál, až bude n8n backend připravený.

---

## 13. Historie rozhodnutí

- **2026-08 (v1)** — původní návrh: výhradní specializace na účetní a
  realitní kanceláře, produktizovaný katalog s cenami, ceník rozdělený
  na jednotlivé automatizace a balíčky.
- **2026-08 (v2, tento dokument)** — positioning rozšířen na menší a
  středně velké firmy obecně; ceny se **nikde na webu neuvádí**; nová
  struktura inspirovaná vizeon.cz (Poslání, O mně, Služby bez cen,
  5krokový proces, ZakazIQ sekce ve stylu "Systém pro klienty",
  Kontakt + formulář sloučené na konec); FAQ redukce; úprava
  kontaktního formuláře; AI chatbot a rezervační systém napojený na
  ZakazIQ (booking termínů, inspirováno vizeon.cz) zaznamenány jako
  budoucí fáze mimo aktuální rozsah.

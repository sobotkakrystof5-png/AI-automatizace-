# AvenIQ — trvalá pravidla pro Claude Code

Toto jsou tvrdá pravidla z masterpromptu pro build webu AvenIQ. Platí po celou dobu buildu (fáze 0–10) a přežívají i kompresi/sumarizaci konverzace, protože se načítají znovu při každém tahu. Pokud si nejsi jistý copy textem, cenou nebo obchodní logikou, podívej se do `AvenIQ_obsah_webu.md` — je to jediný a závazný zdroj pravdy pro texty. Nevymýšlej ani neparafrázuj.

## Fázová kázeň (nejdůležitější pravidlo)
Pracuj po fázích (viz masterprompt, sekce 11). Po dokončení každé fáze se **zastav**, shrň co jsi udělal, a počkej na výslovné potvrzení, než začneš další fázi. Nepokračuj automaticky dál, i kdyby ti to přišlo efektivnější — je to záměr, ne omezení schopnosti. Na konci každé fáze vždy uveď: (1) co jsi konkrétně udělal, (2) jaké předpoklady jsi musel udělat a že čekají na schválení, (3) co je otevřené/chybí doplnit. Pak se zeptej, jestli pokračovat.

## Design systém — barvy (nevymýšlet nové odstíny)
| Barva | Hex | Použití |
|---|---|---|
| Hlavní tmavá modrá | `#1E3A5F` | Hero, sekce Proces práce, O nás |
| Podpůrná tlumená teal | `#4F8074` | Ikony, doplňkové prvky, karty |
| Teplý neutrál (místo bílé) | `#F5F2EA` | Světlé sekce, pozadí |
| Zlatý/hořčicový akcent | `#B98B4E` | **Výhradně** CTA tlačítko a sekce Záruka — úsporně, ne plošně |
| Navbar | `#F3F6F4` | Horní lišta |

Zlatá (`#B98B4E`) se nesmí objevit jako dekorace, podtržení nadpisů, ikony apod. — jen tam, kde je to výslovně CTA/záruka. Když si nejsi jistý, zvol tlumenou modrou/teal, ne zlatou. Projekt používá Tailwind CSS v4 (CSS-first konfigurace) — barvy patří jako pojmenované tokeny do `@theme` bloku v `app/globals.css` (např. `--color-brand-navy: #1E3A5F` → utilita `bg-brand-navy`/`text-brand-navy`), ne natvrdo do komponent. Žádný `tailwind.config.ts` v tomto projektu není a nemá se vytvářet.

## Databáze
`db/schema.ts`, `db/index.ts`, `drizzle.config.ts` jsou hotové — nepřepisuj je od nuly, jen je zapoj. Rozšíření (nové sloupce/tabulky) navrhni a vysvětli, než ho provedeš. Nepřidávej nové tabulky ani nemaž existující pole bez vysvětlení proč. `.env.local` s `DATABASE_URL` si vyžádej od uživatele — nikdy si ho nevymýšlej. `.env*` nesmí jít do gitu.

## Právní stránky a cookies
`/vop`, `/ochrana-osobnich-udaju`, `/cookies` — obsah čeká na kontrolu advokátem. Vytvoř stránky se strukturou a placeholder obsahem jasně označeným `[DOPLNIT PRÁVNÍ TEXT]`. Nikdy si nevymýšlej konkrétní právní formulace GDPR/VOP. Cookie consent banner (nutné vs. analytické) se musí zobrazit při první návštěvě; žádný analytický skript se nesmí spustit před souhlasem — a pokud analytiku vůbec zavádíme, potvrdit nejdřív s uživatelem jakou.

## Sekce Spolupráce (logo pás)
EstatIQ, ZakazIQ a VIZEON jsou propojené/spolupracující projekty, ne klienti — nepsat "klient" ani hodnocení. Žádná reálná loga k dispozici — použít jednoduché textové wordmarky v Tailwindu (ne fake generovaná loga) a označit komentářem `// TODO: nahradit reálným SVG logem`. Pás se posouvá plynule doleva čistou CSS animací, ne JS knihovnou.

## Co agent NESMÍ dělat
- Měnit ceny, čísla, motta ani marketingová tvrzení oproti `AvenIQ_obsah_webu.md`.
- Publikovat sekci Reference/case studies, dokud v DB nejsou ≥2 `is_published = true` záznamy (a stránku `/reference` v navigaci vůbec neodkazovat, dokud tato podmínka neplatí).
- Používat zlatý akcent mimo CTA tlačítko a sekci Záruka.
- Přidávat nové závislosti/knihovny "protože jsou lepší" bez návrhu a souhlasu — zvlášť ne nový ORM, CSS framework nebo state management navíc.
- Commitovat `.env` / `DATABASE_URL` do gitu.
- Vymýšlet právní texty pro VOP/GDPR/cookies.
- Vytvářet fiktivní loga, fiktivní reference nebo fiktivní čísla "pro efekt".

## Tech stack (pevně daný)
Next.js 16 (App Router, TypeScript strict), Tailwind CSS v4 (CSS-first `@theme`, žádný `tailwind.config.ts`), React 19, Neon + Drizzle ORM, Server Actions (kromě webhooku `/api/webhooks/zakaziq/route.ts`, který musí být klasická HTTP route), Zod v4, Vercel jako cíl nasazení. Verze potvrzena s uživatelem ve Fázi 0 (2026-07-17) — neměnit dál bez výslovného souhlasu.

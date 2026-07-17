# AvenIQ — marketingový web

Marketingový web pro AvenIQ (AI automatizace pro malé a střední firmy,
zakladatel Kryštof Sobotka).

## Tech stack

- [Next.js 16](https://nextjs.org/) — App Router, TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com/) — CSS-first `@theme` tokeny
- [Neon](https://neon.tech/) (serverless Postgres) + [Drizzle ORM](https://orm.drizzle.team/)
- Server Actions pro formuláře (kromě `/api/webhooks/zakaziq/route.ts` —
  klasická HTTP route pro webhook)
- [Zod](https://zod.dev/) pro validaci
- Cíl nasazení: [Vercel](https://vercel.com/)

## Zdroj pravdy pro obsah

Veškeré texty, ceny a obchodní logika vycházejí výhradně z
[`AvenIQ_obsah_webu.md`](./AvenIQ_obsah_webu.md). Nic se neparafrázuje ani
nevymýšlí nad rámec tohoto dokumentu.

## Provozní pravidla

Trvalá pravidla pro práci na tomto repozitáři (design systém, fázová
kázeň, databázová a právní pravidla) jsou v [`claude.md`](./claude.md) a
[`AGENTS.md`](./AGENTS.md) — platí pro každou interakci, ne jen pro
počáteční build.

## Lokální vývoj

```bash
npm install
cp .env.example .env.local   # doplnit skutečný DATABASE_URL z Neon dashboardu
npm run dev
```

## Databáze

```bash
npx drizzle-kit generate   # vygeneruje migrace ze db/schema.ts
npx drizzle-kit migrate    # aplikuje migrace na Neon databázi
```

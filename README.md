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

`drizzle-kit` CLI nenačítá `.env.local` automaticky — `npm run db:*`
skripty proto spouští Node s nativním `--env-file=.env.local` (Node
20.6+), aby `DATABASE_URL` bylo v `process.env` bez další závislosti
(např. `dotenv`).

```bash
npm run db:generate   # vygeneruje migrace ze db/schema.ts
npm run db:migrate    # aplikuje migrace na Neon databázi
```

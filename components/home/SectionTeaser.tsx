import Link from "next/link";

// Theme keys ("cream" | "white" | "navy") zůstávají zachované kvůli
// volajícím v app/page.tsx — jde jen o interní název, vizuálně obě
// světlé varianty (cream/white) i tmavá (navy) teď mapují na
// zjednodušenou zinc paletu (viz claude.md, sekce Design systém).
type Theme = "cream" | "white" | "navy";

const themeStyles: Record<
  Theme,
  { section: string; heading: string; body: string; cta: string }
> = {
  cream: {
    section: "",
    heading: "text-zinc-50",
    body: "text-zinc-400",
    cta: "text-zinc-50 hover:text-brand-gold",
  },
  white: {
    section: "",
    heading: "text-zinc-50",
    body: "text-zinc-400",
    cta: "text-zinc-50 hover:text-brand-gold",
  },
  navy: {
    section: "bg-zinc-900",
    heading: "text-zinc-50",
    body: "text-zinc-400",
    cta: "text-zinc-50 hover:text-brand-gold",
  },
};

type Props = {
  title: string;
  lead: string;
  href: string;
  ctaLabel?: string;
  theme?: Theme;
};

export default function SectionTeaser({
  title,
  lead,
  href,
  ctaLabel = "Zjistit více",
  theme = "cream",
}: Props) {
  const style = themeStyles[theme];

  return (
    <section className={style.section}>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <h2
          className={`text-3xl font-semibold tracking-tight sm:text-4xl ${style.heading}`}
        >
          {title}
        </h2>
        <p className={`mt-4 ${style.body}`}>{lead}</p>
        <Link
          href={href}
          className={`mt-6 inline-flex items-center gap-2 font-semibold underline underline-offset-4 hover:no-underline ${style.cta}`}
        >
          {ctaLabel} →
        </Link>
      </div>
    </section>
  );
}

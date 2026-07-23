import type { ElementType } from "react";
import Link from "next/link";

type GlowCardProps = {
  children: React.ReactNode;
  accent?: "turquoise" | "mint";
  className?: string;
  href?: string;
};

// Tailwind's static scanner potřebuje kompletní class stringy v kódu, ne
// stringy poskládané z proměnné (`border-brand-${accent}/40` by nešlo
// vygenerovat) — proto lookup mapa s doslovnými hodnotami pro obě barvy.
const ACCENT = {
  turquoise: "border-zinc-800 hover:border-brand-turquoise/40",
  mint: "border-zinc-800 hover:border-brand-mint/40",
} as const;

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function GlowCard({
  children,
  accent = "turquoise",
  className,
  href,
}: GlowCardProps) {
  const Wrapper = (href ? Link : "div") as ElementType;
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      className={cx(
        "relative overflow-hidden rounded-xl border transition-[border-color,transform] duration-300 hover:-translate-y-0.5",
        ACCENT[accent],
        className
      )}
      {...wrapperProps}
    >
      <div className="relative z-10">{children}</div>
    </Wrapper>
  );
}

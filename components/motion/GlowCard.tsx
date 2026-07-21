"use client";

import { useState, type ElementType } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useCoarsePointer } from "./useCoarsePointer";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type GlowCardProps = {
  children: React.ReactNode;
  accent?: "gold" | "electric";
  className?: string;
  href?: string;
};

// Tailwind's static scanner potřebuje kompletní class stringy v kódu, ne
// stringy poskládané z proměnné (`border-brand-${accent}/20` by nešlo
// vygenerovat) — proto lookup mapa s doslovnými hodnotami pro obě barvy.
const ACCENT = {
  gold: {
    border: "border-brand-gold/20 hover:border-brand-gold/50",
    ambient: "bg-brand-gold/10",
    cssVar: "var(--color-brand-gold)",
  },
  electric: {
    border: "border-brand-electric/20 hover:border-brand-electric/50",
    ambient: "bg-brand-electric/10",
    cssVar: "var(--color-brand-electric)",
  },
} as const;

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function GlowCard({
  children,
  accent = "gold",
  className,
  href,
}: GlowCardProps) {
  const shouldReduceMotion = usePrefersReducedMotion();
  const isCoarsePointer = useCoarsePointer();
  const [isHovering, setIsHovering] = useState(false);

  const disableSpotlight = Boolean(shouldReduceMotion) || isCoarsePointer;

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springGlowX = useSpring(glowX, { stiffness: 200, damping: 25 });
  const springGlowY = useSpring(glowY, { stiffness: 200, damping: 25 });
  const background = useMotionTemplate`radial-gradient(220px circle at ${springGlowX}px ${springGlowY}px, ${ACCENT[accent].cssVar} 0%, transparent 70%)`;

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (disableSpotlight) return;
    const rect = event.currentTarget.getBoundingClientRect();
    glowX.set(event.clientX - rect.left);
    glowY.set(event.clientY - rect.top);
  };

  // Volitelný `href` z GlowCard udělá celou kartu odkazem (např. grid
  // oblastí automatizace) — Link a div sdílí dost společných DOM props
  // (className/onMouseMove/onMouseEnter/onMouseLeave), takže stačí zvolit
  // element dynamicky místo psaní dvou téměř identických větví JSX.
  const Wrapper = (href ? Link : "div") as ElementType;
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      className={cx(
        "group relative overflow-hidden rounded-xl border transition-colors",
        ACCENT[accent].border,
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !disableSpotlight && setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...wrapperProps}
    >
      {/* Statická ambientní záře — čisté CSS, funguje i pod reduced-motion/touch */}
      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute -inset-1 rounded-xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none",
          ACCENT[accent].ambient
        )}
      />
      {/* Kurzorem řízený spotlight — jen když motion/pointer dovolí */}
      {!disableSpotlight && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{ background }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </Wrapper>
  );
}

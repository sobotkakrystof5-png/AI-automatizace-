"use client";

import type { AutomationTool } from "@/lib/automation-tools";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function BandChip({ tool }: { tool: AutomationTool }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/60 px-5 py-3">
      {tool.path ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6 fill-brand-turquoise"
        >
          <path d={tool.path} />
        </svg>
      ) : null}
      <span className="whitespace-nowrap text-sm font-medium text-zinc-200">
        {tool.name}
      </span>
    </div>
  );
}

// Nekonečně se posouvající pás — pole chipů vykreslené 2× vedle sebe,
// řádek animuje translateX(0) → translateX(-50%) (stejný trik jako
// --animate-marquee v globals.css), takže na konci první kopie navazuje
// druhá beze švu.
export default function ToolBand({ tools }: { tools: AutomationTool[] }) {
  const reduced = usePrefersReducedMotion();
  const doubled = [...tools, ...tools];

  return (
    <div className="relative w-full overflow-hidden">
      <div className={cx("flex w-max gap-4", !reduced && "animate-marquee")}>
        {doubled.map((tool, i) => (
          <BandChip key={`${tool.slug}-${i}`} tool={tool} />
        ))}
      </div>
    </div>
  );
}

import type { SVGProps } from "react";

// Jednoduché, vlastní kreslené generické glyfy (ne z ikonové knihovny,
// ne odvozené z konkrétní značky). Původně jen pro MiniProcessDiagram na
// kartách oblastí automatizace (Fáze R5), od 2026-08-05 i pro karty výhod
// v WhyAutomation.tsx — proto je sada širší než "vstup → zpracování →
// výstup". Sdílený stylový základ (stroke, zaoblené konce) drží všechny
// glyfy vizuálně konzistentní; nové ikony se přidávají sem, ne lokálně do
// komponent. Brand loga sem NEPATŘÍ — ta jdou přes `simple-icons`,
// případně `lib/brand-icons.ts`.
const BASE_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M4 5h16v10H9l-4 4v-4H4z" />
    </svg>
  );
}

export function SparkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M17.7 6.3l-2.1 2.1M8.4 15.6l-2.1 2.1" />
    </svg>
  );
}

export function ChartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M4 20V10M12 20V4M20 20v-7" />
    </svg>
  );
}

export function DocumentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M9 12.5l2 2 4-4.5" />
    </svg>
  );
}

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M5 12h13M13 7l5 5-5 5" />
    </svg>
  );
}

export function DatabaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
    </svg>
  );
}

export function FunnelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M4 5h16l-6 7v6l-4 2v-8z" />
    </svg>
  );
}

export function GearIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2M12 19v2M4.2 6.2l1.4 1.4M18.4 16.4l1.4 1.4M3 12h2M19 12h2M4.2 17.8l1.4-1.4M18.4 7.6l1.4-1.4" />
    </svg>
  );
}

export function BoltIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M13 3L5.5 13.5H11L10 21l7.5-10.5H12z" />
    </svg>
  );
}

export function LinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M10.2 13.8l3.6-3.6" />
      <path d="M12.6 7.8l1.8-1.8a3.6 3.6 0 1 1 5.1 5.1l-1.8 1.8" />
      <path d="M11.4 16.2l-1.8 1.8a3.6 3.6 0 1 1-5.1-5.1l1.8-1.8" />
    </svg>
  );
}

export function RepeatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M4.5 11a7.5 7.5 0 0 1 12.7-4.6L20 9" />
      <path d="M20 4.5V9h-4.5" />
      <path d="M19.5 13a7.5 7.5 0 0 1-12.7 4.6L4 15" />
      <path d="M4 19.5V15h4.5" />
    </svg>
  );
}

export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M12 3l7 3v5.4c0 4.2-2.9 8.1-7 9.4-4.1-1.3-7-5.2-7-9.4V6z" />
      <path d="M9.4 11.8l1.9 1.9 3.4-3.7" />
    </svg>
  );
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2V12l3.1 1.9" />
    </svg>
  );
}

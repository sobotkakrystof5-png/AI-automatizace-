import type { Tool } from "@/lib/tools";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type ToolChipSize = "sm" | "md";
type ToolChipShape = "circle" | "square";

const CHIP_SIZE: Record<ToolChipSize, { wrapper: string; icon: string }> = {
  // Původní velikost — mobilní statická mřížka v VerifiedSystems.tsx.
  md: {
    wrapper: "h-14 w-14 sm:h-16 sm:w-16",
    icon: "h-6 w-6 sm:h-7 sm:w-7",
  },
  // Menší varianta pro shluk uvnitř kruhu (ToolOrbit) — víc log na menší
  // ploše, ať se nepřekrývají.
  sm: {
    wrapper: "h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11",
    icon: "h-4 w-4 sm:h-5 sm:w-5",
  },
};

// Vykreslí buď reálné SVG brand logo (simple-icons), nebo pokud `path`
// chybí (viz komentář u `connectedTools` v lib/tools.ts), textový
// placeholder chip se stejnou logikou jako Wordmark v Collaboration.tsx —
// nikdy nekreslí náhradní ikonu, aby nevypadala jako reálné, ale nepřesné
// logo. `shape="square"` (zaoblený čtverec místo kruhu) přidáno pro uzly
// workflow diagramu v AutomationJourney.tsx — n8n a podobné nástroje
// kreslí uzly jako karty, ne kruhové odznaky, a odlišný tvar zároveň čtenáři
// signalizuje, že jde o jiný typ prvku než důvěryhodnostní chipy jinde na
// webu (VerifiedSystems, ToolBand).
export function ToolChip({
  tool,
  size = "md",
  shape = "circle",
}: {
  tool: Tool;
  size?: ToolChipSize;
  shape?: ToolChipShape;
}) {
  const hasIcon = tool.path !== null;
  const dims = CHIP_SIZE[size];

  return (
    <div
      role="img"
      aria-label={tool.name}
      title={tool.name}
      className={cx(
        "flex shrink-0 items-center justify-center border bg-zinc-800 transition-colors",
        shape === "circle" ? "rounded-full" : "rounded-2xl",
        dims.wrapper,
        hasIcon
          ? "border-zinc-700 hover:border-brand-turquoise"
          : "border-dashed border-zinc-600"
      )}
    >
      {hasIcon ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={cx("fill-zinc-300", dims.icon)}
        >
          <path d={tool.path!} />
        </svg>
      ) : (
        // TODO: nahradit reálným SVG logem, až bude k dispozici.
        <span
          aria-hidden="true"
          className="px-1 text-center text-[9px] font-medium leading-tight text-zinc-400"
        >
          {tool.name}
        </span>
      )}
    </div>
  );
}

type ToolOrbitProps = {
  tools: Tool[];
};

// Kruh nástrojů okolo centrálního bodu AvenIQ — loga sedí na jedné nebo
// více soustředných kružnicích (minRadius..maxRadius % od středu) mezi
// centrální bublinou AvenIQ a okrajovou kružnicí, ne rozhozená do plochy
// (dřívější fylotaktická spirála, viz git historie — na malých plochách
// působila jako neuspořádaný shluk). `minRadius` nechává volnou plochu
// pro centrální bublinu, `maxRadius` nechává okraj, aby loga nepřesahovala
// hraniční kružnici.
const MIN_RADIUS_PCT = 22;
const MAX_RADIUS_PCT = 43;

type ToolRing = {
  radiusPct: number;
  angleOffsetDeg: number;
  tools: Tool[];
};

// Rozdělí nástroje do soustředných "linií" tak, aby na každé z nich byly
// rovnoměrně po úhlu (360° / počet na dané kružnici) — žádné shlukování.
// Počet kružnic roste s počtem nástrojů, ať se jich na jednu linii
// nenatlačí příliš mnoho; počet nástrojů na kružnici je vážený jejím
// poloměrem (obvodem), takže obloukový rozestup mezi sousedními logy
// vychází přibližně stejný na vnitřní i vnější kružnici — jde tedy o
// stejné vzdálenosti mezi sousedy, ne jen o stejný úhel.
function buildRings(tools: Tool[]): ToolRing[] {
  const total = tools.length;
  // Držet se maximálně 2 kružnic — chip je od breakpointu `md` výš pevně
  // 44px (viz `CHIP_SIZE.sm`), takže 3 kružnice v dostupném poloměru
  // (MIN_RADIUS_PCT..MAX_RADIUS_PCT) nechávají mezi sousedními kružnicemi
  // menší radiální mezeru, než je průměr chipu — hrozí dotyk/překryv, když
  // úhel položky na dvou kružnicích náhodou vyjde stejně. Se 2 kružnicemi
  // je radiální mezera vždy výrazně větší než chip, i kdyby se úhly
  // shodly.
  const ringCount = total <= 9 ? 1 : 2;

  const radii = Array.from({ length: ringCount }, (_, i) =>
    ringCount === 1
      ? (MIN_RADIUS_PCT + MAX_RADIUS_PCT) / 2
      : MIN_RADIUS_PCT +
        ((MAX_RADIUS_PCT - MIN_RADIUS_PCT) * i) / (ringCount - 1)
  );

  const counts = radii.map((r) => Math.round((r / radii.reduce((a, b) => a + b, 0)) * total));
  let diff = total - counts.reduce((a, b) => a + b, 0);
  for (let i = 0; diff !== 0; i = (i + 1) % ringCount) {
    counts[i] += diff > 0 ? 1 : -1;
    diff += diff > 0 ? -1 : 1;
  }

  const rings: ToolRing[] = [];
  let cursor = 0;
  radii.forEach((radiusPct, ringIndex) => {
    const count = counts[ringIndex];
    rings.push({
      radiusPct,
      // Kružnice odsazené o půl úhlového kroku vůči sousední, ať loga
      // netvoří "paprsky" napříč kružnicemi — čistě vizuální jemnost,
      // rozestup uvnitř každé kružnice zůstává rovnoměrný.
      angleOffsetDeg: (360 / Math.max(count, 1) / 2) * ringIndex,
      tools: tools.slice(cursor, cursor + count),
    });
    cursor += count;
  });

  return rings;
}

export default function ToolOrbit({ tools }: ToolOrbitProps) {
  const rings = buildRings(tools);
  let globalIndex = 0;

  return (
    <div className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-zinc-800"
      />

      {rings.flatMap((ring) =>
        ring.tools.map((tool, i) => {
          const index = globalIndex++;
          const angleDeg = ring.angleOffsetDeg + (360 / ring.tools.length) * i;
          const angleRad = (angleDeg * Math.PI) / 180;
          const left = 50 + ring.radiusPct * Math.cos(angleRad);
          const top = 50 + ring.radiusPct * Math.sin(angleRad);
          // Deterministický "náhodný" rozptyl doby a zpoždění plovoucí
          // animace odvozený z indexu — stejný na serveru i klientovi
          // (žádný Math.random při renderu), ať nedojde k hydration
          // mismatchi, a zároveň každé logo plave jinak pro živější dojem.
          const duration = 4 + (index % 5) * 0.6;
          const delay = (index % 7) * 0.35;

          return (
            <div
              key={tool.slug}
              className="animate-float-y absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:z-10 hover:scale-125"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                ["--float-duration" as string]: `${duration}s`,
                ["--float-delay" as string]: `${delay}s`,
              }}
            >
              <ToolChip tool={tool} size="sm" />
            </div>
          );
        })
      )}

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 sm:text-base">
          AvenIQ
        </div>
      </div>
    </div>
  );
}

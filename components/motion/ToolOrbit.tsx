import type { Tool } from "@/lib/tools";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Vykreslí buď reálné SVG brand logo (simple-icons), nebo pokud `path`
// chybí (viz komentář u `connectedTools` v lib/tools.ts), textový
// placeholder chip se stejnou logikou jako Wordmark v Collaboration.tsx —
// nikdy nekreslí náhradní ikonu, aby nevypadala jako reálné, ale nepřesné
// logo.
export function ToolChip({ tool }: { tool: Tool }) {
  const hasIcon = tool.path !== null;

  return (
    <div
      role="img"
      aria-label={tool.name}
      title={tool.name}
      className={cx(
        "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-zinc-800 transition-[border-color,box-shadow] sm:h-16 sm:w-16",
        hasIcon
          ? "border-zinc-700 hover:border-brand-electric/60 hover:shadow-[0_0_16px_-2px_var(--color-brand-electric)]"
          : "border-dashed border-zinc-600"
      )}
    >
      {hasIcon ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6 fill-zinc-300 sm:h-7 sm:w-7"
        >
          <path d={tool.path!} />
        </svg>
      ) : (
        // TODO: nahradit reálným SVG logem, až bude k dispozici — simple-icons
        // v16 nemá Slack (jen "Slackware", Linux distribuci).
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

// Interaktivní kruh nástrojů okolo centrálního bodu AvenIQ. Znovupoužitelné
// mezi Fází R4 (krátký trust strip) a Fází R7 (širší sekce "napojíme se na
// nástroje") — viz docs/redesign-kickoff-prompt.md, R4 poznámka o sdílené
// komponentě.
//
// Čistě CSS řešení, žádný JS/hook: každé logo sedí v absolutně
// pozicovaném "slotu" pod statickým úhlem (rotate(angle)), vnější prstenec
// slotů se spojitě otáčí (`animate-slow-spin`). Aby logo samo nerotovalo
// spolu s prstencem, má vlastní opačnou spojitou rotaci stejné rychlosti
// (`animate-slow-spin-reverse`) plus statické vyrovnání (`rotate(-angle)`)
// — dvě vrstvy se navzájem přesně vyruší, takže logo jen obíhá po
// kružnici a zůstává vzpřímené (klasický "orbit diagram" trik).
export default function ToolOrbit({ tools }: ToolOrbitProps) {
  return (
    <div className="group relative mx-auto h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-zinc-800"
      />

      <div className="absolute inset-0 animate-slow-spin group-hover:[animation-play-state:paused]">
        {tools.map((tool, index) => {
          const angle = (360 / tools.length) * index;
          return (
            <div
              key={tool.slug}
              className="absolute inset-0"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <div className="animate-slow-spin-reverse group-hover:[animation-play-state:paused]">
                  <div style={{ transform: `rotate(${-angle}deg)` }}>
                    <ToolChip tool={tool} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 sm:text-base">
          AvenIQ
        </div>
      </div>
    </div>
  );
}

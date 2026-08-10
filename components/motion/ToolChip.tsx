import type { Tool } from "@/lib/tools";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type ToolChipSize = "sm" | "md";
type ToolChipShape = "circle" | "square";

const CHIP_SIZE: Record<ToolChipSize, { wrapper: string; icon: string }> = {
  md: {
    wrapper: "h-14 w-14 sm:h-16 sm:w-16",
    icon: "h-6 w-6 sm:h-7 sm:w-7",
  },
  sm: {
    wrapper: "h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11",
    icon: "h-4 w-4 sm:h-5 sm:w-5",
  },
};

// Odznak jednoho nástroje. Do 2026-08-10 žil v `ToolOrbit.tsx` spolu s kruhem
// nástrojů; kruh byl nahrazen deskou spojů (`ToolBoard.tsx`), která si kreslí
// vlastní dlaždice, takže chip osamostatněn do vlastního souboru. Zůstává
// jediným uživatelem `AutomationJourney` (uzly workflow diagramu).
//
// Vykreslí buď reálné SVG brand logo (simple-icons), nebo pokud `path`
// chybí (viz komentář u `connectedTools` v lib/tools.ts), textový
// placeholder chip — nikdy nekreslí náhradní ikonu, aby nevypadala jako
// reálné, ale nepřesné logo. `shape="square"` (zaoblený čtverec místo kruhu)
// je pro uzly workflow diagramu v AutomationJourney.tsx — n8n a podobné
// nástroje kreslí uzly jako karty, ne kruhové odznaky, a odlišný tvar zároveň
// čtenáři signalizuje, že jde o jiný typ prvku než odznaky jinde na webu.
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
          viewBox={tool.viewBox ?? "0 0 24 24"}
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

export default ToolChip;

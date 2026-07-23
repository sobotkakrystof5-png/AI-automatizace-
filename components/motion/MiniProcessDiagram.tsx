import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type MiniProcessIcons = readonly [
  IconComponent,
  IconComponent,
  IconComponent,
];

type MiniProcessDiagramProps = {
  icons: MiniProcessIcons;
};

// Malá vizualizace "vstup → zpracování → výstup" — hlavní vizuální prvek
// karty oblasti automatizace (Fáze R5), ne doplněk k textu. Tři uzly
// propojené linkou v brand-turquoise (stejný akcent jako svislá linka v
// ProcessSteps.tsx), po ní nepřetržitě putuje puls — čistě CSS, bez JS.
// Pod `prefers-reduced-motion` puls úplně mizí (viz globals.css), uzly a
// spojnice zůstávají, takže myšlenka "tok probíhá sám" je čitelná i bez
// pohybu.
export default function MiniProcessDiagram({ icons }: MiniProcessDiagramProps) {
  return (
    <div
      aria-hidden="true"
      className="relative flex items-center justify-between py-3"
    >
      <div className="absolute inset-x-5 top-1/2 h-px -translate-y-1/2 bg-zinc-700" />
      <div className="absolute inset-x-5 top-1/2 h-px -translate-y-1/2 overflow-hidden">
        <div className="animate-flow-pulse absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-turquoise shadow-[0_0_8px_2px_var(--color-brand-turquoise)]" />
      </div>

      {icons.map((Icon, index) => (
        <div
          key={index}
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 sm:h-11 sm:w-11"
        >
          <Icon className="h-5 w-5 text-brand-turquoise" />
        </div>
      ))}
    </div>
  );
}

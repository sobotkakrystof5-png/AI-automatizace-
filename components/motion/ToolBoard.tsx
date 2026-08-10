import type { Tool } from "@/lib/tools";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Deska plošných spojů — přehled nástrojů propojených přes AvenIQ.
// Verze 2 (2026-08-10): rozšířeno z 19 na 44 nástrojů na žádost uživatele
// („mřížku prohloubit, mřížky zúžit") a vizuálně povýšeno z prosté mřížky
// na desku s hloubkou: tečkovaná textura pájecích bodů na podkladu,
// ambientní záře pod středem, dvě tyrkysové „sběrnice" procházející celou
// deskou skrz centrální uzel a putující pulsy po nich. Dlaždice jsou menší
// a hustší (4 breakpointy: 3/4/6/8 sloupců), každá s viditelným názvem.
//
// Geometrie je spočítaná tak, aby mřížka vyšla **beze zbytku** na všech
// breakpointech — proto je nástrojů přesně 44 (lib/tools.ts) a proto se
// počet nemění bez přepočtu:
//   mobil  3 sloupce: uzel 1×1 → 45 buněk = 15 řádků, uzel [2,8] = střed
//   sm     4 sloupce: uzel 2×2 → 48 buněk = 12 řádků, uzel [2–3,6–7] = střed
//   md     6 sloupců: uzel 2×2 → 48 buněk =  8 řádků, uzel [3–4,4–5] = střed
//   lg     8 sloupců: uzel 2×2 → 48 buněk =  6 řádků, uzel [4–5,3–4] = střed
// Uzel je na každém breakpointu v přesném středu desky — na tom stojí
// sběrnice: kreslí se jako `left-1/2`/`top-1/2` vůči panelu, ne vůči uzlu,
// takže nepotřebují žádnou per-breakpoint geometrii. Dlaždice jsou lehce
// průsvitné (`bg-zinc-900/70`), takže sběrnice pod nimi jemně prosvítá a
// v mezerách svítí naplno — deska tím dostává vrstvy místo plochého vzhledu
// „excelové tabulky".
//
// Spojnice mezi dlaždicemi zůstávají ukotvené **uvnitř dlaždic** (viz
// `Trace`) ze stejného důvodu jako ve verzi 1: dlaždice mají fluidní šířku
// a výšku podle zalomení názvu, samostatná vrstva s vlastní geometrií by se
// rozešla. `--trace-gap` je zároveň mezera mřížky, délka spoje i vnitřní
// odsazení panelu, takže krajní spoje končí přesně na rámečku desky.

type TraceDirection = "right" | "down";

// Spoj z dlaždice doprava a dolů, s pájecí ploškou v místě výstupu.
// Kreslí se u všech dlaždic včetně krajních — spoj z posledního
// sloupce/řádku doběhne na rámeček panelu (svod na okraj desky).
function Trace({ direction }: { direction: TraceDirection }) {
  const horizontal = direction === "right";

  return (
    <span
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute bg-zinc-800 transition-colors group-hover:bg-zinc-700",
        horizontal
          ? "left-full top-1/2 h-px w-[var(--trace-gap)] -translate-y-1/2"
          : "left-1/2 top-full h-[var(--trace-gap)] w-px -translate-x-1/2"
      )}
    >
      <span
        className={cx(
          "absolute h-1 w-1 rounded-full bg-zinc-700 transition-colors group-hover:bg-zinc-600",
          horizontal
            ? "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
            : "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
        )}
      />
    </span>
  );
}

function ToolTile({ tool }: { tool: Tool }) {
  return (
    <li className="group relative flex flex-col items-center justify-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/70 px-1 py-2.5 text-center transition-colors hover:border-zinc-700 hover:bg-zinc-800/80 sm:py-3">
      {tool.path ? (
        <svg
          viewBox={tool.viewBox ?? "0 0 24 24"}
          aria-hidden="true"
          className="h-4 w-4 fill-zinc-400 transition-colors group-hover:fill-zinc-100 sm:h-5 sm:w-5"
        >
          <path d={tool.path} />
        </svg>
      ) : (
        // Nástroj bez reálného SVG loga (viz komentář u `connectedTools`
        // v lib/tools.ts) — prázdná ploška, nikdy vymyšlená náhradní ikona.
        <span
          aria-hidden="true"
          className="h-4 w-4 rounded-md border border-dashed border-zinc-600 sm:h-5 sm:w-5"
        />
      )}

      <span className="text-[10px] font-medium leading-tight text-zinc-400 transition-colors group-hover:text-zinc-200">
        {tool.name}
      </span>

      <Trace direction="right" />
      <Trace direction="down" />
    </li>
  );
}

// Puls putující po sběrnici. Čtyři dráhy — každá pokrývá jednu polovinu
// příslušné sběrnice (od okraje desky ke středu, nebo od středu k okraji),
// takže vodorovné pulsy tečou směrem DO uzlu zleva a VEN doprava, svislé
// shora dolů skrz uzel — dohromady obousměrná výměna dat, ne jednosměrný
// odsyp. Posouvá se obal přes celou délku dráhy, ne tečka samotná (stejný
// vzor jako Spojnice v LiveSystemFlow.tsx); obal proto nesmí mít vlastní
// `translate-*` třídu. `delay` rozhodí čtyři pulsy po 3s cyklu, ať nejedou
// synchronně.
function BusPulse({
  lane,
  delay,
}: {
  lane: "left-in" | "right-out" | "top-in" | "bottom-out";
  delay: number;
}) {
  const horizontal = lane === "left-in" || lane === "right-out";

  return (
    <span
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute",
        lane === "left-in" && "left-0 right-1/2 top-1/2 h-px -translate-y-1/2",
        lane === "right-out" &&
          "left-1/2 right-0 top-1/2 h-px -translate-y-1/2",
        lane === "top-in" && "bottom-1/2 left-1/2 top-0 w-px -translate-x-1/2",
        lane === "bottom-out" &&
          "bottom-0 left-1/2 top-1/2 w-px -translate-x-1/2"
      )}
    >
      <span
        className={cx(
          "absolute inset-0",
          horizontal ? "animate-flow-pulse" : "animate-flow-pulse-y"
        )}
        style={{ animationDelay: `${delay}s` }}
      >
        <span
          className={cx(
            "absolute h-1.5 w-1.5 rounded-full bg-brand-turquoise shadow-[0_0_8px_2px_var(--color-brand-turquoise)]",
            horizontal
              ? "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
              : "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
          )}
        />
      </span>
    </span>
  );
}

// Centrální uzel desky. Není to nástroj, takže je pro čtečky skrytý —
// sdělení „napojíme se na ně" nese nadpis sekce, ne tenhle odznak.
// Od `sm` výš zabírá 2×2 buňky (ohnisko desky), na mobilu 1×1 (2×2 by ve
// třech sloupcích nevyšlo na střed). Souřadnice viz tabulka v hlavičce
// souboru — CSS Grid umísťuje explicitně polohované položky první a zbylé
// dlaždice kolem nich obteče, na pořadí v DOM nezáleží.
function HubNode() {
  return (
    <li
      aria-hidden="true"
      className="relative col-start-2 row-start-8 flex items-center justify-center gap-1.5 rounded-lg border border-brand-turquoise/50 bg-zinc-900 px-1 text-center shadow-[0_0_45px_-10px_var(--color-brand-turquoise)] sm:col-span-2 sm:col-start-2 sm:row-span-2 sm:row-start-6 sm:gap-2 sm:rounded-xl md:col-start-3 md:row-start-4 lg:col-start-4 lg:row-start-3"
    >
      {/* Statická „kontrolka" — na desce spojů čte jako power LED. Bez
          animace, takže nevyžaduje reduced-motion větev. */}
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-turquoise shadow-[0_0_6px_1px_var(--color-brand-turquoise)]" />
      <span className="text-xs font-semibold tracking-tight text-zinc-50 sm:text-lg">
        AvenIQ
      </span>
    </li>
  );
}

export default function ToolBoard({ tools }: { tools: Tool[] }) {
  return (
    <div className="[--trace-gap:0.5rem] sm:[--trace-gap:0.625rem] lg:[--trace-gap:0.75rem]">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/40 p-[var(--trace-gap)]">
        {/* Textura pájecích bodů — jemný rastr teček pod celou deskou.
            Barva jde přes color-mix z tokenu zinc-700, ne natvrdo. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(color-mix(in oklab, var(--color-zinc-700) 35%, transparent) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />

        {/* Ambientní záře pod středem desky — zvýrazňuje uzel AvenIQ jako
            ohnisko (klíčový prvek, ne dekorace plošně). Velmi nízké krytí,
            prosvítá skrz průsvitné dlaždice. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-brand-turquoise) 8%, transparent), transparent 55%)",
          }}
        />

        {/* Dvě sběrnice skrz střed desky. Uzel AvenIQ leží na jejich
            průsečíku (viz geometrie v hlavičce), takže vypadají, že z něj
            vycházejí — ale kreslí se vůči panelu, což drží na všech
            breakpointech bez dopočítávání. Dlaždice je překrývají (jsou
            v DOM později), sběrnice tedy svítí v mezerách a jemně prosvítá
            pod dlaždicemi. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-turquoise/25 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-turquoise/25 to-transparent"
        />
        <BusPulse lane="left-in" delay={0} />
        <BusPulse lane="right-out" delay={1.5} />
        <BusPulse lane="top-in" delay={0.75} />
        <BusPulse lane="bottom-out" delay={2.25} />

        <ul className="relative grid grid-cols-3 gap-[var(--trace-gap)] sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {tools.map((tool) => (
            <ToolTile key={tool.slug} tool={tool} />
          ))}
          <HubNode />
        </ul>
      </div>
    </div>
  );
}

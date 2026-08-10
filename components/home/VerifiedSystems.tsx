import AnimatedSection from "@/components/motion/AnimatedSection";
import ToolBoard from "@/components/motion/ToolBoard";
import { connectedTools } from "@/lib/tools";

// Vizuál sekce přepracován 2026-08-10 na výslovnou žádost uživatele: místo
// otáčejícího se kruhu log (ToolOrbit, smazán) je tu deska plošných spojů —
// pojmenované dlaždice nástrojů propojené spoji, s uzlem AvenIQ uprostřed.
// Kruh nesl jen "hodně nástrojů", deska nese "vaše nástroje spolu mluví",
// což je skutečné sdělení sekce.
//
// Odpadl tím i dřívější rozpad na desktop (kruh) + mobil (statická mřížka) —
// deska je responzivní sama o sobě (3 / 4 / 5 sloupců), takže stejný obsah
// není v DOM dvakrát.
//
// Rytmus podle DESIGN.md §5: sekce přestala být "pás" (py-12 sm:py-16) a
// dostala "standard" (py-16 sm:py-24) — už to není krátký proužek log, ale
// samostatný obsahový blok. Šířka `max-w-6xl` je podle stejné tabulky určená
// pro mřížky (dřív `max-w-5xl` pro text s vizuálem).
export default function VerifiedSystems() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 sm:py-24">
        <AnimatedSection>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Propojujeme to, co již používáte.
          </h2>
          <p className="mt-3 text-zinc-400">
            Napojíme se na ně — nic nemusíte měnit.
          </p>
        </AnimatedSection>

        <div className="mt-12">
          <ToolBoard tools={connectedTools} />
        </div>
      </div>
    </section>
  );
}

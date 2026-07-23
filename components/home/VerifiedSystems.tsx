import AnimatedSection from "@/components/motion/AnimatedSection";
import ToolOrbit, { ToolChip } from "@/components/motion/ToolOrbit";
import { connectedTools } from "@/lib/tools";

// Fáze R4 redesignu — krátký trust strip hned pod Hero. Desktop dostává
// interaktivní otáčející se kruh (ToolOrbit); na mobilu se otáčení na
// malé ploše špatně čte, takže se stejná data zobrazí jako statická
// mřížka (viz docs/redesign-kickoff-prompt.md, Fáze R4).
export default function VerifiedSystems() {
  return (
    <section>
      <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            Propojujeme to, co již používáte.
          </h2>
          <p className="mt-3 text-zinc-400">
            Napojíme se na ně — nic nemusíte měnit.
          </p>
        </AnimatedSection>

        <div className="mt-12 hidden md:block">
          <ToolOrbit tools={connectedTools} />
        </div>

        <div className="mt-10 grid grid-cols-3 gap-x-4 gap-y-6 sm:gap-x-6 md:hidden">
          {connectedTools.map((tool) => (
            <div key={tool.slug} className="flex justify-center">
              <ToolChip tool={tool} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

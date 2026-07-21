import AnimatedSection from "@/components/motion/AnimatedSection";
import ToolOrbit, { ToolChip } from "@/components/motion/ToolOrbit";
import { connectedTools } from "@/lib/tools";

// Fáze R7 redesignu — širší, přesvědčovací sekce hlouběji na stránce (na
// rozdíl od Fáze R4 = krátký trust strip hned pod Hero, viz
// VerifiedSystems.tsx). Znovupoužívá stejnou komponentu kruhu i stejná
// data (docs/redesign-kickoff-prompt.md, Fáze R7: "nestav paralelně
// druhý vizuální jazyk pro totéž téma nástroje") — seznam má pořád jen 6
// položek, takže druhý/vnější prstenec navíc nedává smysl (ten se
// přidává jen při výrazně delším seznamu, což tohle není).
export default function ToolsIntegration() {
  return (
    <section>
      <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            Zůstanete u svých nástrojů
          </h2>
          <p className="mt-3 text-zinc-400">
            Napojíme se přímo na to, co dnes používáte.
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

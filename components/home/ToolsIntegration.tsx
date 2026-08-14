import AnimatedSection from "@/components/motion/AnimatedSection";
import ToolBand from "@/components/motion/ToolBand";
import { automationTools } from "@/lib/automation-tools";

// Redesign 2026-07-22 — dřív duplicitní se VerifiedSystems.tsx (stejná
// komponenta kruhu, stejná data). Teď jiný obsah (nástroje, na kterých
// ALTENO staví automatizace, ne nástroje zákazníků) a jiný vizuální jazyk
// (horizontální marquee pás místo kruhu), ať sekce nesou dva odlišné
// messagingy místo jednoho opakovaného.
export default function ToolsIntegration() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-12 text-center sm:px-8 sm:py-16">
        <AnimatedSection>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Stavíme na nejmodernějších nástrojích
          </h2>
          <p className="mt-3 text-zinc-400">
            Automatizace stavíme na ověřených platformách, ne na
            experimentech.
          </p>
        </AnimatedSection>

        <div className="mt-12">
          <ToolBand tools={automationTools} />
        </div>
      </div>
    </section>
  );
}

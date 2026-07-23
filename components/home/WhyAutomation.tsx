"use client";

import { motion } from "motion/react";
import { whyAutomationPoints, comparisonRows } from "@/lib/why-automation";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

export default function WhyAutomation() {
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <section id="proc-automatizace">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Proč automatizace, a ne jen ChatGPT
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            {"ChatGPT odpoví, jen když se zeptáte — nespustí se sám ani nezná vaše systémy."}
          </p>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyAutomationPoints.map((point, i) => (
            <AnimatedSection key={point.title} delay={Math.min(i * 0.06, 0.3)}>
              <GlowCard accent="turquoise" className="h-full p-6">
                <h3 className="text-xl font-bold text-zinc-50">
                  {point.title}
                </h3>
                <p className="mt-2 text-zinc-400">{point.body}</p>
              </GlowCard>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-12 overflow-x-auto rounded-lg border border-zinc-800">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-zinc-900 text-zinc-50">
                <th scope="col" className="px-4 py-3 font-semibold">
                  <span className="sr-only">Kritérium</span>
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Ruční práce s ChatGPT
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Automatizace na míru
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <motion.tr
                  key={row.label}
                  className={i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900"}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, x: -16 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-zinc-50"
                  >
                    {row.label}
                  </th>
                  <td className="px-4 py-3 text-zinc-400">{row.manual}</td>
                  <td className="px-4 py-3 text-zinc-400">{row.automated}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-10 text-xl font-semibold text-zinc-50">
          Prostor pro to, co má smysl.
        </p>
        <p className="mt-2 text-zinc-400">
          Automatizace odstraní zdlouhavé rutiny — ušetříte čas i peníze.
        </p>
      </div>
    </section>
  );
}

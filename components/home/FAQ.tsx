import Link from "next/link";
import { faqs } from "@/lib/faq";
import AnimatedSection from "@/components/motion/AnimatedSection";

export default function FAQ() {
  return (
    <section id="faq">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Časté dotazy
          </h2>
        </AnimatedSection>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={faq.q} delay={Math.min(i * 0.04, 0.4)} y={12}>
              <details className="group rounded-lg border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-brand-turquoise/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-zinc-50 marker:content-none">
                  {faq.q}
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className="h-4 w-4 shrink-0 text-brand-turquoise transition-transform group-open:rotate-180"
                  >
                    <path
                      fill="currentColor"
                      d="M5.25 7.5 10 12.25 14.75 7.5H5.25Z"
                    />
                  </svg>
                </summary>
                <p className="mt-3 text-zinc-400">
                  {faq.a}
                  {faq.link && (
                    <Link
                      href={faq.link.href}
                      className="text-zinc-50 underline hover:text-brand-turquoise"
                    >
                      {faq.link.label}
                    </Link>
                  )}
                  {faq.afterLink}
                </p>
              </details>
            </AnimatedSection>
          ))}
        </div>

        <p className="mt-10 text-zinc-400">
          Odpověď jste nenašli?{" "}
          <Link
            href="/#kontakt"
            className="text-zinc-50 underline hover:text-brand-turquoise"
          >
            Napište nám
          </Link>{" "}
          — ozveme se do 24 hodin.
        </p>
      </div>
    </section>
  );
}

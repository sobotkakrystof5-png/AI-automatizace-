import AnimatedSection from "@/components/motion/AnimatedSection";

export default function Guarantee() {
  return (
    <section id="zaruka">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Záruka a dlouhodobý závazek
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="group relative mt-8 overflow-hidden rounded-lg border-l-4 border-brand-gold bg-zinc-900 p-6 transition-colors sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-1 rounded-lg bg-brand-gold/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
            />
            <div className="relative">
              <p className="text-xl font-semibold text-zinc-50">
                Garantujeme{" "}
                <span className="font-bold text-zinc-50 underline decoration-brand-gold decoration-2 underline-offset-4">
                  2 roky záruky
                </span>{" "}
                na
                každou dodanou automatizaci.
              </p>
              <p className="mt-4 text-zinc-400">
                Pojedeme dál, dokud nebudete 100% spokojeni — dokud
                automatizace nesedí přesně na váš provoz, nekončíme.
              </p>
              <p className="mt-4 text-zinc-400">
                Zakládáme si na{" "}
                <strong className="font-semibold text-zinc-50">
                  kvalitě, ne kvantitě
                </strong>{" "}
                — na transparentnosti, dochvilnosti, funkčnosti a
                efektivitě.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

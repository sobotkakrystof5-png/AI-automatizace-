import AnimatedSection from "@/components/motion/AnimatedSection";

// TODO: nahradit reálným SVG logem, až budou k dispozici — zatím
// jednoduché textové wordmarky (EstatIQ, ZakazIQ, VIZEON jsou propojené
// spolupracující projekty, ne klientské reference).
const partners = ["EstatIQ", "ZakazIQ", "VIZEON"];

function Wordmark({ name, ariaHidden }: { name: string; ariaHidden?: boolean }) {
  return (
    <span
      aria-hidden={ariaHidden}
      className="mx-8 shrink-0 text-2xl font-semibold tracking-tight text-zinc-500 sm:text-3xl"
    >
      {name}
    </span>
  );
}

export default function Collaboration() {
  return (
    <section className="bg-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            Spolupráce
          </h2>
          <p className="mt-3 text-zinc-400">
            Projekty a značky, na kterých stavíme zkušenosti:
          </p>
        </AnimatedSection>

        <div className="mt-10 overflow-hidden rounded-xl border border-zinc-800 py-4">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
            <div className="flex items-center" aria-label="Partneři a spolupracující projekty">
              {partners.map((name) => (
                <Wordmark key={name} name={name} />
              ))}
            </div>
            <div className="flex items-center" aria-hidden="true">
              {partners.map((name) => (
                <Wordmark key={`${name}-repeat`} name={name} ariaHidden />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

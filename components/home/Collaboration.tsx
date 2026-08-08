import AnimatedSection from "@/components/motion/AnimatedSection";

// TODO: nahradit reálným SVG logem, až budou k dispozici — zatím
// jednoduché textové wordmarky (EstatIQ, ZakazIQ, VIZEON jsou propojené
// spolupracující projekty, ne klientské reference).
const partners = ["EstatIQ", "ZakazIQ", "VIZEON"];

// `aria-hidden` řeší celý pás najednou (viz níže), takže wordmark sám žádný
// přístupnostní prop nepotřebuje.
function Wordmark({ name }: { name: string }) {
  return (
    <span className="mx-8 shrink-0 text-2xl font-semibold tracking-tight text-zinc-500 sm:text-3xl">
      {name}
    </span>
  );
}

export default function Collaboration() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
        <AnimatedSection className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Spolupráce
          </h2>
          <p className="mt-3 text-zinc-400">
            Projekty a značky, na kterých stavíme zkušenosti:
          </p>
        </AnimatedSection>

        <div className="mt-10 overflow-hidden rounded-xl border border-zinc-800 py-4">
          {/* Názvy jednou a čitelně pro odečítač. Vizuální pás je čistě
              dekorativní opakování — `aria-label` na holém <div> bez role
              stejně většina odečítačů ignoruje. */}
          <span className="sr-only">
            Partneři a spolupracující projekty: {partners.join(", ")}.
          </span>
          {/* Každá půlka nese seznam dvakrát. Keyframe `marquee` posouvá o
              -50 %, což vyžaduje dvě shodné poloviny; se třemi wordmarky na
              půlku měl pás jen ~1200 px a na širokém displeji by ve smyčce
              probleskla prázdná mezera. */}
          <div
            aria-hidden="true"
            className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
          >
            {[0, 1].map((half) => (
              <div key={half} className="flex items-center">
                {[...partners, ...partners].map((name, i) => (
                  <Wordmark key={`${half}-${i}`} name={name} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

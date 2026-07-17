// TODO: nahradit reálným SVG logem, až budou k dispozici — zatím
// jednoduché textové wordmarky (EstatIQ, ZakazIQ, VIZEON jsou propojené
// spolupracující projekty, ne klientské reference).
const partners = ["EstatIQ", "ZakazIQ", "VIZEON"];

function Wordmark({ name, ariaHidden }: { name: string; ariaHidden?: boolean }) {
  return (
    <span
      aria-hidden={ariaHidden}
      className="mx-8 shrink-0 text-2xl font-semibold tracking-tight text-brand-cream/70 sm:text-3xl"
    >
      {name}
    </span>
  );
}

export default function Collaboration() {
  return (
    <section className="bg-brand-navy">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-brand-cream sm:text-3xl">
          Spolupráce
        </h2>
        <p className="mt-3 text-center text-brand-cream/70">
          Projekty a značky, na kterých stavíme zkušenosti:
        </p>

        <div className="mt-10 overflow-hidden">
          <div className="flex w-max animate-marquee">
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

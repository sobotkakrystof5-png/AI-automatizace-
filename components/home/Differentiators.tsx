const pillars = [
  {
    title: "1. Zajímá nás váš problém, ne váš software",
    body: 'Nezačínáme otázkou "jaký nástroj chcete propojit". Začínáme otázkou, co vás na vašem provozu skutečně brzdí — a teprve pak hledáme technické řešení. Automatizace, která neřeší reálný problém, je jen drahá hračka.',
    tagline: "Automatizujeme to, co vás brzdí — ne to, co je trendy.",
  },
  {
    title: "2. Nezmizíme po spuštění",
    body: "Automatizace se dřív nebo později rozbije — API se změní, proces se posune, firma vyroste. Většina dodavatelů v tu chvíli mlčí. My máme jasně definovanou podporu po spuštění, víte předem, co se stane, když se něco pokazí, a jak rychle zareagujeme.",
  },
  {
    title: "3. Řekneme vám i to, co se automatizovat nevyplatí",
    body: "Nejcennější není konzultant, který postaví cokoliv si řeknete — je to ten, kdo vás od zbytečné funkce odradí, když vám nepřinese návratnost. Radši vám ušetříme peníze, než abychom vám prodali funkci, kterou nikdy nevyužijete.",
    tagline: "Nabudujeme jen to, co se vám opravdu vyplatí.",
  },
  {
    title: "4. Naši jednoduchost nemusíte věřit na slovo — zažijete ji",
    body: "Než s námi vůbec promluvíte, projdete si rezervaci konzultace přes náš vlastní systém ZakazIQ: vyberete si termín, dostanete potvrzení, připomínku SMS i e-mailem. Žádné volání, žádné čekání, žádné ztracené e-maily. Přesně takhle bude fungovat i automatizace, kterou vám postavíme.",
  },
];

export default function Differentiators() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          V čem jsme jiní
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-lg border border-brand-navy/10 p-6"
            >
              <h3 className="text-xl font-bold text-brand-teal">
                {p.title}
              </h3>
              <p className="mt-3 text-brand-navy/80">{p.body}</p>
              {p.tagline && (
                <p className="mt-4 font-medium text-brand-navy">
                  {p.tagline}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

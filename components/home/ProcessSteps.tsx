const steps = [
  {
    title: "1. Konzultace zdarma",
    body: "Nezávazně si promluvíme o vašem provozu — rezervace přes ZakazIQ, žádné volání natvrdo. Zjistíme, jestli má smysl jít dál a kterým směrem.",
  },
  {
    title: "2. Automatizační audit — 4 999 Kč (volitelně)",
    body: "Pokud přesně nevíte, co a jak automatizovat, projdeme váš provoz do hloubky: zmapujeme, kde reálně ztrácíte čas, a dostanete konkrétní doporučení — co se vyplatí automatizovat, v jakém pořadí a s jakou návratností. Cenu auditu odečítáme z ceny realizace, pokud se rozhodnete jít dál.",
    note: "Pokud už přesně víte, co chcete automatizovat, tento krok můžeme přeskočit a jít rovnou do návrhu řešení.",
  },
  {
    title: "3. Návrh řešení",
    body: "Ukážeme vám přesně, co postavíme, za kolik a s jakou návratností. Řekneme i to, co se nevyplatí.",
  },
  {
    title: "4. Stavba a testování",
    body: "Automatizaci systematicky testujeme, než se vůbec dotkne vašeho provozu.",
  },
  {
    title: "5. Spuštění",
    body: "Nasadíme řešení do vašeho provozu plynule, bez přerušení chodu firmy.",
  },
  {
    title: "6. Podpora a záruka",
    body: "2 roky záruky. Pojedeme dál, dokud nebudete 100% spokojeni.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="bg-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Proces práce
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title}>
              <h3 className="text-lg font-semibold text-zinc-50">
                {step.title}
              </h3>
              <p className="mt-2 text-zinc-400">{step.body}</p>
              {step.note && (
                <p className="mt-2 text-sm italic text-zinc-500">
                  {step.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

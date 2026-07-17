const stats = [
  {
    value: "2 roky",
    label: "Přímé zkušenosti s reálnými klienty (přes projekt Vizeon)",
  },
  {
    value: "24 hodin",
    label: "Maximální doba odezvy na váš dotaz — každý den",
  },
  {
    value: "2 roky",
    label: "Záruka na každou dodanou automatizaci",
  },
  {
    value: "3",
    label: "Vlastní produkty a nástroje reálně v provozu (AvenIQ, ZakazIQ, Vizeon)",
  },
];

export default function StatsBar() {
  return (
    <section className="bg-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-brand-navy sm:text-left">
          AvenIQ v číslech
        </h2>
        <dl className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="text-center sm:text-left">
              <dt className="text-3xl font-semibold text-brand-navy sm:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-2 text-sm text-brand-navy/80">{s.label}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-center text-sm text-brand-navy/80 sm:text-left">
          Menší čísla než u velkých agentur — ale za každým z nich stojí
          přímá zkušenost, ne marketing.
        </p>
      </div>
    </section>
  );
}

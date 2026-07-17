import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { automationAreas } from "@/lib/automation-areas";
import { ZAKAZIQ_BOOKING_URL } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

function getArea(slug: string) {
  return automationAreas.find((area) => area.slug === slug);
}

export function generateStaticParams() {
  return automationAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);

  if (!area) {
    return {};
  }

  return {
    title: `${area.seoTitle} | AvenIQ`,
    description: area.lead,
  };
}

export default async function AutomationAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getArea(slug);

  if (!area) {
    notFound();
  }

  return (
    <section className="bg-brand-cream">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <Link
          href="/#co-jde-automatizovat"
          className="text-sm font-medium text-brand-teal hover:underline"
        >
          ← Zpět na přehled automatizací
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          {area.title}
        </h1>
        <p className="mt-4 text-xl text-brand-navy/80">{area.lead}</p>

        <ul className="mt-8 space-y-4">
          {area.points.map((point) => (
            <li key={point} className="flex gap-3 text-brand-navy/80">
              <span aria-hidden className="text-brand-teal">
                •
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-lg border border-brand-navy/10 bg-white p-6 sm:p-8">
          <p className="text-lg font-semibold text-brand-navy">
            Řešíte podobný proces ve svém provozu?
          </p>
          <p className="mt-2 text-brand-navy/70">
            Probereme ho na nezávazné konzultaci a řekneme vám na rovinu, jestli
            se automatizace vyplatí.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={ZAKAZIQ_BOOKING_URL}
              className="inline-flex justify-center rounded-md bg-brand-gold px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-gold/90"
            >
              Rezervovat konzultaci zdarma
            </a>
            <Link
              href="/#kontakt"
              className="inline-flex justify-center rounded-md border border-brand-navy/20 px-6 py-3 font-semibold text-brand-navy transition-colors hover:border-brand-teal"
            >
              nebo napsat pár řádků
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

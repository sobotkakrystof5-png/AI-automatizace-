import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { automationAreas } from "@/lib/automation-areas";
import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";
import JsonLd from "@/components/seo/JsonLd";
import { automationAreaServiceJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/page-metadata";

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

  return pageMetadata({
    path: `/automatizace/${area.slug}`,
    title: `${area.seoTitle} | AvenIQ`,
    description: area.lead,
  });
}

export default async function AutomationAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getArea(slug);

  if (!area) {
    notFound();
  }

  return (
    <section>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Domů", path: "/" },
          { name: "Co vše jde automatizovat", path: "/#automatizace" },
          { name: area.title, path: `/automatizace/${area.slug}` },
        ])}
      />
      <JsonLd data={automationAreaServiceJsonLd(area)} />
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <Link
          href="/#automatizace"
          className="text-sm font-medium text-zinc-50 underline hover:text-brand-turquoise"
        >
          ← Zpět na přehled automatizací
        </Link>

        <AnimatedSection>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            {area.title}
          </h1>
          <p className="mt-4 text-xl text-zinc-400">{area.lead}</p>

          <ul className="mt-8 space-y-4">
            {area.points.map((point) => (
              <li key={point} className="flex gap-3 text-zinc-400">
                <span aria-hidden className="text-zinc-600">
                  •
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <GlowCard accent="turquoise" className="mt-12 p-6 sm:p-8">
            <p className="text-lg font-semibold text-zinc-50">
              Řešíte podobný proces ve svém provozu?
            </p>
            <p className="mt-2 text-zinc-400">
              Probereme ho na nezávazné konzultaci a řekneme vám na rovinu,
              jestli se automatizace vyplatí.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {/* TODO: přepnout na ZAKAZIQ_BOOKING_URL, až bude k dispozici */}
              <Link
                href="/#kontakt"
                className="inline-flex justify-center rounded-md bg-brand-turquoise px-6 py-3 font-semibold text-zinc-950 transition-colors hover:bg-brand-turquoise/90"
              >
                Rezervovat konzultaci zdarma
              </Link>
            </div>
          </GlowCard>
        </AnimatedSection>

        <p className="mt-8 text-zinc-400">
          Zajímá vás, jak bude spolupráce probíhat krok za krokem?{" "}
          <Link
            href="/#proces-prace"
            className="text-zinc-50 underline hover:text-brand-turquoise"
          >
            Podívejte se na proces práce
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

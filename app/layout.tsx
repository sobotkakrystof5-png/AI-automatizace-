import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/layout/CookieConsent";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL_BASE } from "@/lib/constants";
import { organizationJsonLd } from "@/lib/json-ld";
import "./globals.css";

// Claim sladěný s hero (components/home/Hero.tsx). Musí s ním zůstat
// doslova shodný. Znění 2026-08-10; dřív „Automatizujeme rutinu. Vy se
// věnujte byznysu." (2026-08-09) a před tím „Chytrá automatizace. Lidský
// přístup.". Sloveso „automatizujeme" je v claimu podmínka, ne ozdoba:
// title tag je hlavní nositel kořene „automatiz-" pro vyhledávání.
// Popis nese frázi „rutinní procesy" záměrně: plán
// (docs/plan-repozice-2026-08.md, sekce 5a) ji chce opakovat i mimo
// sekci Poslání, v hero podnadpisu a meta description.
const title = "ALTENO — Vy řešíte byznys. Rutinu automatizujeme my.";
const description =
  "Automatizujeme menším a středně velkým firmám rutinní procesy, které je zdržují. Od faktur po e-maily. Konzultace zdarma, odpověď do 24 hodin.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SITE_URL_BASE padá na http://localhost:3000, dokud SITE_URL není
// nastavená na Vercelu. Viz lib/constants.ts. Jakmile bude, metadataBase
// i canonical/OG URL napříč webem se automaticky přepnou na reálnou
// doménu beze změny kódu.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL_BASE),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "ALTENO",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* `bg-zinc-950` tu záměrně není: pozadí stránky je od palety R11
          gradient definovaný v `body` v globals.css (viz DESIGN.md §2).
          Utilita by ho nepřebila, nevrstvené pravidlo vyhrává nad
          `@layer utilities`, ale zůstala by tu jako mrtvý kód, který
          odporuje dokumentaci a při přesunu pravidla do vrstvy by gradient
          tiše zmizel. */}
      <body className="flex min-h-full flex-col text-zinc-50">
        <JsonLd data={organizationJsonLd()} />
        {/* Přeskočení navigace (WCAG 2.4.1). Viditelné až při focusu.
            Sticky hlavička má 7 odkazů plus CTA, kterými by uživatel na
            klávesnici musel projít na každé stránce. */}
        <a
          href="#obsah"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-turquoise focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-zinc-950"
        >
          Přeskočit na obsah
        </a>
        <SmoothScrollProvider>
          <Navbar />
          <main id="obsah" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

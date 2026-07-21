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

const title = "AvenIQ — Chytrá automatizace. Lidský přístup.";
const description =
  "Bereme firmám zpátky hodiny strávené opakovanou administrativou — a vracíme je tam, kam patří: k zákazníkům, k růstu, k práci, která vás baví.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SITE_URL_BASE padá na http://localhost:3000, dokud SITE_URL není
// nastavená na Vercelu — viz lib/constants.ts. Jakmile bude, metadataBase
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
    siteName: "AvenIQ",
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
      <body className="flex min-h-full flex-col bg-zinc-950 text-zinc-50">
        <JsonLd data={organizationJsonLd()} />
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

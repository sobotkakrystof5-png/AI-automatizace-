import Link from "next/link";
import { ZAKAZIQ_BOOKING_URL } from "@/lib/constants";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-navy/10 bg-brand-navbar/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-brand-navy"
        >
          AvenIQ
        </Link>

        <a
          href={ZAKAZIQ_BOOKING_URL}
          className="rounded-full bg-brand-gold px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:px-6 sm:py-2.5 sm:text-base"
        >
          Rezervovat konzultaci zdarma
        </a>
      </div>
    </header>
  );
}

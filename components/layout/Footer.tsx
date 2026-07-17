import Link from "next/link";

const legalLinks = [
  { href: "/vop", label: "Všeobecné obchodní podmínky" },
  { href: "/ochrana-osobnich-udaju", label: "Ochrana osobních údajů" },
  { href: "/cookies", label: "Zásady cookies" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-brand-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-lg font-semibold tracking-tight">AvenIQ</p>

        <nav aria-label="Právní odkazy">
          <ul className="flex flex-col gap-3 text-sm text-brand-cream/80 sm:flex-row sm:gap-6">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs text-brand-cream/60">
          © {new Date().getFullYear()} AvenIQ
        </p>
      </div>
    </footer>
  );
}

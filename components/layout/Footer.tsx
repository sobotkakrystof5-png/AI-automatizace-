import Link from "next/link";

const siteLinks = [
  { href: "/automatizace", label: "Automatizace" },
  { href: "/proc-automatizace", label: "Proč automatizace" },
  { href: "/cenik", label: "Ceník" },
  { href: "/proces-prace", label: "Proces práce" },
  { href: "/jak-tvorime-automatizace", label: "Jak tvoříme" },
  { href: "/zaruka", label: "Záruka" },
  { href: "/faq", label: "FAQ" },
  { href: "/o-nas", label: "O nás" },
];

const legalLinks = [
  { href: "/vop", label: "Všeobecné obchodní podmínky" },
  { href: "/ochrana-osobnich-udaju", label: "Ochrana osobních údajů" },
  { href: "/cookies", label: "Zásady cookies" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900 text-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-lg font-semibold tracking-tight">AvenIQ</p>

          <nav aria-label="Odkazy na stránky">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-zinc-400 sm:grid-cols-4">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 hover:text-zinc-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-6 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Právní odkazy">
            <ul className="flex flex-col text-sm text-zinc-400 sm:flex-row sm:gap-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-2 hover:text-zinc-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} AvenIQ
          </p>
        </div>
      </div>
    </footer>
  );
}

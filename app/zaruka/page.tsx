import type { Metadata } from "next";
import Guarantee from "@/components/home/Guarantee";

export const metadata: Metadata = {
  title: "Záruka a dlouhodobý závazek | AvenIQ",
  description:
    "Garantujeme 2 roky záruky na každou dodanou automatizaci a pokračujeme, dokud nebudete 100% spokojeni.",
};

export default function ZarukaPage() {
  return <Guarantee />;
}

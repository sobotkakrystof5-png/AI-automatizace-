import type { Metadata } from "next";
import Pricing from "@/components/home/Pricing";

export const metadata: Metadata = {
  title: "Ceník | AvenIQ",
  description:
    "Tři orientační cenová pásma automatizací podle počtu propojených systémů, složitosti logiky a hodnoty, kterou vám přináší — od 8 000 Kč.",
};

export default function CenikPage() {
  return <Pricing />;
}

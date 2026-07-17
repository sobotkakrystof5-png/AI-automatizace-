import type { Metadata } from "next";
import FAQ from "@/components/home/FAQ";

export const metadata: Metadata = {
  title: "Časté otázky | AvenIQ",
  description:
    "Odpovědi na nejčastější otázky o ceně, procesu, datech a záruce automatizací od AvenIQ.",
};

export default function FaqPage() {
  return <FAQ />;
}

import type { Metadata } from "next";
import About from "@/components/home/About";

export const metadata: Metadata = {
  title: "O nás | AvenIQ",
  description:
    "Příběh AvenIQ, naše filozofie a kdo za firmou stojí — Kryštof Sobotka, zakladatel a CEO.",
};

export default function ONasPage() {
  return <About />;
}

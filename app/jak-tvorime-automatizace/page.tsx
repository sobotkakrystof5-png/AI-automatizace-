import type { Metadata } from "next";
import HowWeBuild from "@/components/home/HowWeBuild";

export const metadata: Metadata = {
  title: "Jak tvoříme automatizace | AvenIQ",
  description:
    "Stavíme na nejmodernějších nástrojích — n8n, JSON, Make.com, Zapier — a každou automatizaci systematicky testujeme, než se dotkne vašeho provozu.",
};

export default function JakTvorimeAutomatizacePage() {
  return <HowWeBuild />;
}

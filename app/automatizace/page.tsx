import type { Metadata } from "next";
import AutomationAreas from "@/components/home/AutomationAreas";

export const metadata: Metadata = {
  title: "Co vše jde automatizovat | AvenIQ",
  description:
    "Díky AI automatizacím a agentům lze zefektivnit prakticky každou opakující se agendu ve firmě — marketing, interní procesy, zákaznická podpora, práce s daty, reporty i účetnictví.",
};

export default function AutomatizacePage() {
  return <AutomationAreas />;
}

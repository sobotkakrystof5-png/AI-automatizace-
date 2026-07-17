import type { Metadata } from "next";
import WhyAutomation from "@/components/home/WhyAutomation";

export const metadata: Metadata = {
  title: "Proč automatizace, a ne jen ChatGPT | AvenIQ",
  description:
    "Spousta firem si myslí, že „mít AI“ znamená občas otevřít ChatGPT a nechat si tam něco vygenerovat. To je dobrý začátek — ale není to řešení.",
};

export default function ProcAutomatizacePage() {
  return <WhyAutomation />;
}

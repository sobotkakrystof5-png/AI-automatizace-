import type { Metadata } from "next";
import ProcessSteps from "@/components/home/ProcessSteps";

export const metadata: Metadata = {
  title: "Proces práce | AvenIQ",
  description:
    "Od bezplatné konzultace přes volitelný automatizační audit až po spuštění a 2 roky záruky — šest kroků, jak probíhá spolupráce na vaší automatizaci.",
};

export default function ProcesPracePage() {
  return <ProcessSteps />;
}

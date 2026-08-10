import {
  CheckIcon,
  ChatIcon,
  DatabaseIcon,
  DocumentIcon,
  GearIcon,
} from "@/components/motion/process-icons";

// Živá ukázka ZakazIQ (2026-08-05). Nahrazuje čísla typu "ušetřili jsme X
// hodin", která zatím nejsou naměřená — místo tvrzení ukazuje tvar systému,
// kterým zákazník reálně projde, než s AvenIQ vůbec promluví.
//
// STAV 2026-08-09 (Fáze 4): zapojená v components/home/ZakazIq.tsx, kde
// nese tok „jak to funguje". Předtím ji používala sekce Booking, která se
// sloučila do ContactSection — tam se nepřenesla schválně, protože její
// obsah mluví o ZakazIQ, ne o kontaktu. Tím je rezervace naplněná; kdyby
// sekce ZakazIQ někdy zanikla, tahle komponenta zaniká s ní.
//
// Obsah není nové obchodní tvrzení: vrstvy odpovídají popisu od majitele
// (frontend produkt → automatizace n8n → databáze), výstupy jsou přesně ty,
// které už web uvádí v Differentiators.tsx ("termín, potvrzení, připomínka
// SMS i e-mailem") a v About.tsx ("komunikace s klienty, rezervace i
// připomínky").
//
// Diagram je `aria-hidden` — celé sdělení nese souběžný textový popis pod
// ním, takže odečítač nečte změť názvů uzlů.

type Uzel = {
  ikona: typeof GearIcon;
  popisek: string;
};

const VRSTVY: Array<{ stitek: string; uzly: Uzel[] }> = [
  {
    stitek: "Co udělá zákazník",
    uzly: [{ ikona: DocumentIcon, popisek: "Vybere termín" }],
  },
  {
    stitek: "Co běží na pozadí",
    uzly: [
      { ikona: GearIcon, popisek: "Automatizace" },
      { ikona: DatabaseIcon, popisek: "Databáze" },
    ],
  },
  {
    stitek: "Co přijde samo",
    uzly: [
      { ikona: CheckIcon, popisek: "Potvrzení" },
      { ikona: ChatIcon, popisek: "SMS" },
      { ikona: DocumentIcon, popisek: "E-mail" },
    ],
  },
];

function Spojnice() {
  return (
    <div className="relative mx-auto h-10 w-px bg-zinc-700">
      <div className="absolute inset-0 overflow-hidden">
        {/* Posouvá se obal přes celou délku dráhy, ne tečka samotná —
            translateY(%) se počítá z velikosti animovaného prvku. */}
        <div className="animate-flow-pulse-y absolute inset-0">
          <div className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-turquoise shadow-[0_0_8px_2px_var(--color-brand-turquoise)]" />
        </div>
      </div>
    </div>
  );
}

export default function LiveSystemFlow() {
  return (
    <div className="mx-auto max-w-md">
      <div aria-hidden="true">
        {VRSTVY.map((vrstva, i) => (
          <div key={vrstva.stitek}>
            {i > 0 && <Spojnice />}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                {vrstva.stitek}
              </p>
              <div className="mt-3 flex items-center justify-center gap-3">
                {vrstva.uzly.map(({ ikona: Ikona, popisek }) => (
                  <div
                    key={popisek}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950">
                      <Ikona className="h-5 w-5 text-brand-turquoise" />
                    </span>
                    <span className="text-xs text-zinc-400">{popisek}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hlas sjednocen do 1. os. j. č. (Fáze 4). Dřív „náš provoz / bez
          nás" — značkové „my" je podle claude.md v pořádku, ale tenhle
          diagram teď stojí uvnitř osobní sekce ZakazIQ („postavil jsem
          pro sebe"), kde by dvojí hlas v jednom bloku působil jako chyba. */}
      <p className="mt-6 text-sm text-zinc-400">
        Takhle běží můj vlastní provoz. Zákazník vybere termín, zbytek —
        potvrzení, SMS i e-mailová připomínka — odejde beze mě.
      </p>
    </div>
  );
}

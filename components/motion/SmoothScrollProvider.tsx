"use client";

import { createContext, useContext, useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

// Sdílená instance Lenis pro komponenty, které potřebují programově
// naskočit na konkrétní scroll pozici (např. klik na krokový ukazatel ve
// scrollytelling animaci) — přímé `window.scrollTo`/`scrollIntoView` by
// s Lenisovým virtuálním scrollem soupeřilo, `lenis.scrollTo` je jediný
// bezkonfliktní způsob. Vrací ref (ne hodnotu/state) — instance vzniká až
// v efektu (SSR/client-only), a čtení přes `.current` v okamžiku kliknutí
// se obejde bez re-renderu celého stromu při inicializaci/zániku Lenis.
// `.current` je `null`, dokud Lenis neběží (SSR i prefers-reduced-motion),
// volající strana musí na `null` reagovat vlastním (native) fallbackem.
export function useLenis() {
  return useContext(LenisContext);
}

// Lenis je poháněná přes gsap.ticker (ne vlastní requestAnimationFrame
// smyčkou), aby na stránce běžel jen jeden sdílený animační "hodinový
// strojek" i tam, kde je zároveň aktivní GSAP ScrollTrigger — dvě nezávislé
// smyčky reagující na scroll by se mohly rozjet mimo synchronizaci.
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const instance = new Lenis();
    instance.on("scroll", ScrollTrigger.update);
    lenisRef.current = instance;

    const update = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}

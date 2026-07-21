"use client";

import { useRef, type MouseEvent } from "react";
import { useMotionValue, useSpring } from "motion/react";
import { useCoarsePointer } from "./useCoarsePointer";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

// Sdílená "magnetická" hover logika za MagneticButton i MagneticLink — dva
// samostatné komponenty (button vs. next/link) místo jedné polymorfní, aby
// se nemusel řešit sjednocený typ refu/props mezi <button> a <a>.
export function useMagneticHover<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isCoarsePointer = useCoarsePointer();
  const disabled = shouldReduceMotion || isCoarsePointer;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const onMouseMove = (event: MouseEvent<T>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    style: disabled ? undefined : { x: springX, y: springY },
    onMouseMove,
    onMouseLeave,
  };
}

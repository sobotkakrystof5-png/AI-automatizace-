"use client";

import type { ButtonHTMLAttributes } from "react";
import { motion } from "motion/react";
import { useMagneticHover } from "./useMagneticHover";

// motion.button redefines onDrag*/onAnimation* with its own gesture-event
// signatures, incompatible with the native HTML event types of the same
// name — omit them so the native <button> props can spread cleanly.
type MagneticButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
> & {
  strength?: number;
};

export default function MagneticButton({
  children,
  strength = 0.35,
  ...rest
}: MagneticButtonProps) {
  const magnetic = useMagneticHover<HTMLButtonElement>(strength);

  return (
    <motion.button {...magnetic} {...rest}>
      {children}
    </motion.button>
  );
}

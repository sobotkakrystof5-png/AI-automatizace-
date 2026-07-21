"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { motion } from "motion/react";
import { useMagneticHover } from "./useMagneticHover";

const MotionLink = motion.create(Link);

type MagneticLinkProps = Omit<
  ComponentProps<typeof Link>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
> & {
  strength?: number;
};

export default function MagneticLink({
  children,
  strength = 0.35,
  ...rest
}: MagneticLinkProps) {
  const magnetic = useMagneticHover<HTMLAnchorElement>(strength);

  return (
    <MotionLink {...magnetic} {...rest}>
      {children}
    </MotionLink>
  );
}

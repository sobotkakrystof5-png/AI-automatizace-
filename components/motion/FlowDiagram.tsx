"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Konkrétní, potvrzený scénář (2026-07-18): faktura dorazí e-mailem → AI ji
// přečte a vytěží data → automaticky se zaúčtuje nebo eskaluje ke kontrole.
// Tři propojené uzly + pulzující "tok dat" podél spojnic.
export default function FlowDiagram() {
  const rootRef = useRef<SVGSVGElement>(null);
  const node1Ref = useRef<SVGGElement>(null);
  const node2Ref = useRef<SVGGElement>(null);
  const node3Ref = useRef<SVGGElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const pulse1Ref = useRef<SVGCircleElement>(null);
  const pulse2Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const nodes = [node1Ref.current, node2Ref.current, node3Ref.current];
    const paths = [path1Ref.current, path2Ref.current];
    const pulses = [pulse1Ref.current, pulse2Ref.current];

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(nodes, { opacity: 1, scale: 1 });
        gsap.set(paths, { strokeDashoffset: 0 });
        gsap.set(pulses, { opacity: 0 });
        return;
      }

      paths.forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.set(nodes, { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" });
      gsap.set(pulses, { opacity: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      });

      timeline
        .to(nodes, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.25,
          ease: "back.out(1.7)",
        })
        .to(
          paths,
          {
            strokeDashoffset: 0,
            duration: 0.6,
            stagger: 0.3,
            ease: "power2.inOut",
          },
          "-=0.5"
        )
        .to(pulses, { opacity: 1, duration: 0.2 }, "-=0.2")
        .add(() => {
          if (path1Ref.current && pulse1Ref.current) {
            gsap.to(pulse1Ref.current, {
              motionPath: { path: path1Ref.current, align: path1Ref.current },
              duration: 1.6,
              repeat: -1,
              ease: "power1.inOut",
            });
          }
          if (path2Ref.current && pulse2Ref.current) {
            gsap.to(pulse2Ref.current, {
              motionPath: { path: path2Ref.current, align: path2Ref.current },
              duration: 1.6,
              repeat: -1,
              delay: 0.4,
              ease: "power1.inOut",
            });
          }
        });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 600 200"
      className="h-auto w-full"
      role="img"
      aria-label="Faktura dorazí e-mailem, AI ji přečte a vytěží data, automaticky se zaúčtuje nebo eskaluje ke kontrole"
    >
      <path
        ref={path1Ref}
        d="M 140 100 L 260 100"
        stroke="var(--color-brand-electric)"
        strokeWidth={2}
        fill="none"
      />
      <path
        ref={path2Ref}
        d="M 360 100 L 480 100"
        stroke="var(--color-brand-electric)"
        strokeWidth={2}
        fill="none"
      />

      <g ref={node1Ref}>
        <circle
          cx={80}
          cy={100}
          r={50}
          fill="var(--color-zinc-900)"
          stroke="var(--color-zinc-800)"
          strokeWidth={1}
        />
        <text
          x={80}
          y={94}
          textAnchor="middle"
          fontSize={11}
          fill="var(--color-zinc-50)"
        >
          <tspan x={80} dy={0}>
            Faktura
          </tspan>
          <tspan x={80} dy={14}>
            e-mailem
          </tspan>
        </text>
      </g>

      <g ref={node2Ref}>
        <circle
          cx={300}
          cy={100}
          r={50}
          fill="var(--color-zinc-900)"
          stroke="var(--color-brand-electric)"
          strokeWidth={1.5}
        />
        <text
          x={300}
          y={94}
          textAnchor="middle"
          fontSize={11}
          fill="var(--color-zinc-50)"
        >
          <tspan x={300} dy={0}>
            AI vytěží
          </tspan>
          <tspan x={300} dy={14}>
            data
          </tspan>
        </text>
      </g>

      <g ref={node3Ref}>
        <circle
          cx={520}
          cy={100}
          r={50}
          fill="var(--color-zinc-900)"
          stroke="var(--color-zinc-800)"
          strokeWidth={1}
        />
        <text
          x={520}
          y={87}
          textAnchor="middle"
          fontSize={10}
          fill="var(--color-zinc-50)"
        >
          <tspan x={520} dy={0}>
            Zaúčtování
          </tspan>
          <tspan x={520} dy={13}>
            / eskalace
          </tspan>
          <tspan x={520} dy={13}>
            ke kontrole
          </tspan>
        </text>
      </g>

      <circle ref={pulse1Ref} r={5} fill="var(--color-brand-electric)" />
      <circle ref={pulse2Ref} r={5} fill="var(--color-brand-electric)" />
    </svg>
  );
}

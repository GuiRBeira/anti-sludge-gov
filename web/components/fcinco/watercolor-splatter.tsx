"use client";

import { useId, useMemo, type CSSProperties } from "react";

function rng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

type Props = {
  color?: string;
  size?: number;
  rotation?: number;
  opacity?: number;
  seed?: number;
  style?: CSSProperties;
  className?: string;
};

export function WatercolorSplatter({
  color = "hsl(var(--accent))",
  size = 280,
  rotation = 0,
  opacity = 0.55,
  seed = 11,
  style,
  className,
}: Props) {
  const rawId = useId();
  const fid = `wc-${rawId.replace(/:/g, "")}`;
  const blobs = useMemo(() => {
    const r = rng(seed);
    const arr: Array<{
      cx: number;
      cy: number;
      rx: number;
      ry: number;
      rot: number;
      o: number;
    }> = [];
    for (let i = 0; i < 7; i++) {
      arr.push({
        cx: 40 + r() * 120,
        cy: 40 + r() * 120,
        rx: 28 + r() * 40,
        ry: 24 + r() * 40,
        rot: r() * 360,
        o: 0.4 + r() * 0.5,
      });
    }
    return arr;
  }, [seed]);
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={{
        transform: `rotate(${rotation}deg)`,
        opacity,
        mixBlendMode: "multiply",
        pointerEvents: "none",
        ...style,
      }}
      aria-hidden="true"
    >
      <defs>
        <filter id={fid} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="2"
            seed={seed}
          />
          <feDisplacementMap in="SourceGraphic" scale="22" />
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>
      <g filter={`url(#${fid})`} fill={color}>
        {blobs.map((b, i) => (
          <ellipse
            key={i}
            cx={b.cx}
            cy={b.cy}
            rx={b.rx}
            ry={b.ry}
            opacity={b.o}
            transform={`rotate(${b.rot} ${b.cx} ${b.cy})`}
          />
        ))}
      </g>
      <g fill={color} opacity="0.6">
        {Array.from({ length: 22 }).map((_, i) => {
          const r2 = rng(seed + i * 3);
          return (
            <circle
              key={i}
              cx={r2() * 200}
              cy={r2() * 200}
              r={0.4 + r2() * 1.6}
            />
          );
        })}
      </g>
    </svg>
  );
}

"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

function rng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

type Side = "top" | "right" | "bot" | "left";

function jitterPath(
  width: number,
  height: number,
  seed: number,
  side: Side,
  inset = 4,
  wobble = 2.5,
) {
  const r = rng(seed);
  const pts: Array<[number, number]> = [];
  const n = 14;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    let x: number;
    let y: number;
    if (side === "top") {
      x = inset + (width - inset * 2) * t;
      y = inset + (r() - 0.5) * wobble;
    } else if (side === "bot") {
      x = inset + (width - inset * 2) * t;
      y = height - inset + (r() - 0.5) * wobble;
    } else if (side === "left") {
      y = inset + (height - inset * 2) * t;
      x = inset + (r() - 0.5) * wobble;
    } else {
      y = inset + (height - inset * 2) * t;
      x = width - inset + (r() - 0.5) * wobble;
    }
    pts.push([x, y]);
  }
  return pts
    .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
    .join(" ");
}

type SketchFrameProps = {
  children: ReactNode;
  seed?: number;
  color?: string;
  strokeWidth?: number;
  padX?: number;
  padY?: number;
  doubleStroke?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function SketchFrame({
  children,
  seed = 7,
  color = "currentColor",
  strokeWidth = 2.2,
  padX = 22,
  padY = 12,
  doubleStroke = true,
  className = "",
  style,
}: SketchFrameProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) =>
      setBox({ w: e.contentRect.width, h: e.contentRect.height }),
    );
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const w = box.w + padX * 2;
  const h = box.h + padY * 2;
  const paths = useMemo(() => {
    if (!w || !h) return [];
    return [
      jitterPath(w, h, seed + 1, "top"),
      jitterPath(w, h, seed + 2, "right"),
      jitterPath(w, h, seed + 3, "bot"),
      jitterPath(w, h, seed + 4, "left"),
    ];
  }, [w, h, seed]);

  return (
    <div
      className={`sketch-frame ${className}`}
      style={{ padding: `${padY}px ${padX}px`, ...style }}
    >
      {w > 0 && (
        <svg
          className="sketch-stroke"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {paths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {doubleStroke &&
            paths.map((d, i) => (
              <path
                key={`d${i}`}
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth * 0.55}
                strokeLinecap="round"
                opacity="0.55"
                transform="translate(1.5,1.5)"
              />
            ))}
        </svg>
      )}
      <span ref={ref} style={{ display: "inline-block" }}>
        {children}
      </span>
    </div>
  );
}

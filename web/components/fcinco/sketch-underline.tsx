"use client";

import { useMemo } from "react";

type Variant = "short" | "long" | "scribble";

type Props = {
  width?: number;
  variant?: Variant;
  color?: string;
  strokeWidth?: number;
};

export function SketchUnderline({
  width = 180,
  variant = "short",
  color = "currentColor",
  strokeWidth = 2.4,
}: Props) {
  const h = 14;
  const d = useMemo(() => {
    if (variant === "scribble") {
      return `M 4 8 Q ${width * 0.2} 2, ${width * 0.4} 9 T ${width * 0.8} 7 T ${width - 4} 9`;
    }
    if (variant === "long") {
      return `M 2 8 C ${width * 0.25} 4, ${width * 0.5} 12, ${width * 0.7} 7 S ${width - 2} 6, ${width - 2} 9`;
    }
    return `M 2 8 Q ${width * 0.5} 2, ${width - 4} 9`;
  }, [width, variant]);
  return (
    <svg
      width={width}
      height={h}
      viewBox={`0 0 ${width} ${h}`}
      aria-hidden="true"
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

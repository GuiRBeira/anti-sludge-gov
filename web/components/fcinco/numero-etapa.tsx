import type { CSSProperties } from "react";

type SizeKey = "sm" | "md" | "lg" | "xl" | "xxl";

type Props = {
  value: number | string;
  size?: SizeKey | number;
  tilt?: number;
  className?: string;
  style?: CSSProperties;
};

const SIZES: Record<SizeKey, number> = {
  sm: 22,
  md: 32,
  lg: 48,
  xl: 72,
  xxl: 92,
};

export function NumeroEtapa({
  value,
  size = "lg",
  tilt = 0,
  className = "",
  style,
}: Props) {
  const fz = typeof size === "number" ? size : SIZES[size];
  const v =
    typeof value === "number" ? String(value).padStart(2, "0") : value;
  return (
    <span
      className={`font-display ${className}`}
      style={{
        fontSize: fz,
        lineHeight: 0.85,
        color: "hsl(var(--numero))",
        transform: `rotate(${tilt}deg)`,
        display: "inline-block",
        textShadow: "0.5px 0.5px 0 hsl(var(--ink) / 0.15)",
        ...style,
      }}
    >
      {v}
    </span>
  );
}

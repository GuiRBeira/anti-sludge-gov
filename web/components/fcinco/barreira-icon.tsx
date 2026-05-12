type Props = { size?: number; tilt?: number };

export function BarreiraIcon({ size = 22, tilt = -8 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 22"
      style={{ transform: `rotate(${tilt}deg)` }}
      aria-hidden="true"
    >
      <rect
        x="1"
        y="6"
        width="30"
        height="10"
        fill="hsl(var(--accent))"
        stroke="hsl(var(--ink))"
        strokeWidth="1.5"
      />
      <g stroke="hsl(var(--ink))" strokeWidth="2.6">
        <line x1="6" y1="6" x2="2" y2="16" />
        <line x1="13" y1="6" x2="9" y2="16" />
        <line x1="20" y1="6" x2="16" y2="16" />
        <line x1="27" y1="6" x2="23" y2="16" />
      </g>
      <line x1="4" y1="6" x2="4" y2="2" stroke="hsl(var(--ink))" strokeWidth="2" />
      <line x1="28" y1="6" x2="28" y2="2" stroke="hsl(var(--ink))" strokeWidth="2" />
      <line
        x1="2"
        y1="20"
        x2="30"
        y2="20"
        stroke="hsl(var(--ink))"
        strokeWidth="1.5"
        strokeDasharray="3 2"
      />
    </svg>
  );
}

export function DesvioX({
  size = 36,
  color = "hsl(var(--destructive))",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M 6 7 Q 20 19, 33 33"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 33 6 Q 21 18, 7 32"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 8 8 Q 22 22, 32 32"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function LoopRepeticao({
  size = 40,
  color = "hsl(var(--repeticao))",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size * 0.9}
      viewBox="0 0 44 40"
      aria-hidden="true"
    >
      <path
        d="M 5 22 C 5 8, 38 6, 38 22 C 38 35, 14 36, 9 28"
        stroke={color}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 12 24 L 8 28 L 4 25"
        stroke={color}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

import type { ReactNode } from "react";

export type StatusTone =
  | "pendente"
  | "em_progresso"
  | "concluido"
  | "validada"
  | "desvio"
  | "repeticao"
  | "barreira"
  | "print";

type ToneStyle = { bg: string; fg: string; dbg: string; dfg: string };

const TONES: Record<StatusTone, ToneStyle> = {
  pendente: {
    bg: "hsl(40 25% 90%)",
    fg: "hsl(40 20% 30%)",
    dbg: "hsl(40 10% 18%)",
    dfg: "hsl(40 25% 75%)",
  },
  em_progresso: {
    bg: "hsl(167 60% 90%)",
    fg: "hsl(167 71% 24%)",
    dbg: "hsl(167 50% 18%)",
    dfg: "hsl(167 60% 78%)",
  },
  concluido: {
    bg: "hsl(167 50% 88%)",
    fg: "hsl(167 71% 22%)",
    dbg: "hsl(167 50% 20%)",
    dfg: "hsl(167 60% 80%)",
  },
  validada: {
    bg: "hsl(167 71% 41%)",
    fg: "white",
    dbg: "hsl(167 71% 35%)",
    dfg: "white",
  },
  desvio: {
    bg: "hsl(22 90% 90%)",
    fg: "hsl(22 89% 30%)",
    dbg: "hsl(22 50% 18%)",
    dfg: "hsl(22 70% 75%)",
  },
  repeticao: {
    bg: "hsl(268 50% 92%)",
    fg: "hsl(268 50% 30%)",
    dbg: "hsl(268 30% 20%)",
    dfg: "hsl(268 50% 78%)",
  },
  barreira: {
    bg: "hsl(358 60% 92%)",
    fg: "hsl(358 67% 35%)",
    dbg: "hsl(358 40% 20%)",
    dfg: "hsl(358 60% 78%)",
  },
  print: {
    bg: "hsl(167 30% 92%)",
    fg: "hsl(167 71% 28%)",
    dbg: "hsl(167 30% 18%)",
    dfg: "hsl(167 60% 78%)",
  },
};

type Props = {
  tone?: StatusTone;
  children: ReactNode;
  dark?: boolean;
};

export function StatusPill({ tone = "pendente", children, dark = false }: Props) {
  const t = TONES[tone];
  return (
    <span
      className="font-mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: 10,
        padding: "2px 7px",
        borderRadius: 999,
        textTransform: "uppercase",
        letterSpacing: 0,
        background: dark ? t.dbg : t.bg,
        color: dark ? t.dfg : t.fg,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

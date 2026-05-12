"use client";

import { motion } from "motion/react";
import { DesvioX, LoopRepeticao } from "./barreira-icon";
import { StatusPill } from "./status-pill";
import { Clock3, Image as ImageIcon } from "lucide-react";

export type TrilhaMode = "planejada" | "individual" | "padrao";

export type TrilhaPasso = {
  id?: string | number;
  ordem?: number;
  descricao: string;
  categoria?: string | null;
  tipo?: string | null;
  tempo?: number | null;
  obrigatorio?: boolean;
  print?: boolean;
  marcacao?: "desvio" | "repeticao" | null;
  repeticoes?: number;
  extra?: boolean;
  note?: string | null;
  feito?: boolean;
};

type Props = {
  passos: TrilhaPasso[];
  mode?: TrilhaMode;
  replayState?: { activeIndex: number; progressPct: number } | null;
  dark?: boolean;
  compact?: boolean;
  onClickPasso?: (p: TrilhaPasso, i: number) => void;
};

export function TrilhaJornada({
  passos,
  mode = "planejada",
  replayState = null,
  dark = false,
  compact = false,
  onClickPasso,
}: Props) {
  const rowH = compact ? 88 : 112;
  const trailX = 38;
  const cardLeft = 92;
  const totalH = rowH * passos.length + 24;

  const activeIndex = replayState?.activeIndex ?? -1;
  const progressPct = replayState?.progressPct ?? 100;

  function segStyle(i: number): "solid" | "half" | "dotted-muted" | "dotted" {
    if (mode === "individual" && replayState) {
      if (i < activeIndex) return "solid";
      if (i === activeIndex) return "half";
      return "dotted-muted";
    }
    if (mode === "planejada") {
      return passos[i]?.feito ? "solid" : "dotted";
    }
    return "dotted";
  }

  if (passos.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        Sem passos nesta trilha.
      </div>
    );
  }

  return (
    <div style={{ position: "relative", minHeight: totalH }}>
      <svg
        width="100%"
        height={totalH}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {passos.map((_, i) => {
          if (i === passos.length - 1) return null;
          const y1 = 24 + i * rowH + 36;
          const y2 = 24 + (i + 1) * rowH + 4;
          const style = segStyle(i);
          if (style === "solid") {
            return (
              <motion.line
                key={i}
                x1={trailX}
                y1={y1}
                x2={trailX}
                y2={y2}
                stroke="hsl(var(--trilha))"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
              />
            );
          }
          if (style === "half") {
            const mid = y1 + (y2 - y1) * (progressPct / 100);
            return (
              <g key={i}>
                <motion.line
                  x1={trailX}
                  y1={y1}
                  x2={trailX}
                  y2={mid}
                  stroke="hsl(var(--trilha))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                />
                <line
                  x1={trailX}
                  y1={mid}
                  x2={trailX}
                  y2={y2}
                  stroke="hsl(var(--trilha-muted))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="4 6"
                />
              </g>
            );
          }
          if (style === "dotted-muted") {
            return (
              <motion.line
                key={i}
                x1={trailX}
                y1={y1}
                x2={trailX}
                y2={y2}
                stroke="hsl(var(--trilha-muted))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              />
            );
          }
          return (
            <motion.line
              key={i}
              x1={trailX}
              y1={y1}
              x2={trailX}
              y2={y2}
              stroke="hsl(var(--trilha))"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="4 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            />
          );
        })}
      </svg>

      {passos.map((p, i) => {
        const top = 24 + i * rowH;
        const isActive = mode === "individual" && i === activeIndex;
        const future = mode === "individual" && i > activeIndex;

        let nodeFill = "hsl(var(--trilha))";
        let nodeText = "hsl(var(--accent))";
        let nodeStrokeColor: string | null = null;
        if (future) {
          nodeFill = "hsl(var(--card))";
          nodeText = "hsl(var(--muted-foreground))";
          nodeStrokeColor = "hsl(var(--trilha-muted))";
        }

        return (
          <motion.div
            key={p.id ?? i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            style={{
              position: "absolute",
              top,
              left: 0,
              right: 0,
              height: rowH - 4,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <motion.div
              className={isActive ? "ring-pulse-amarelo" : ""}
              whileHover={{ scale: 1.08, rotate: 2 }}
              style={{
                position: "absolute",
                left: trailX - 18,
                top: 8,
                width: 36,
                height: 36,
                borderRadius: 999,
                background: nodeFill,
                border: `2.5px ${future ? "dashed" : "solid"} ${
                  nodeStrokeColor ?? nodeFill
                }`,
                display: "grid",
                placeItems: "center",
                boxShadow: isActive ? undefined : "0 0 0 5px hsl(var(--papel))",
                transform: "rotate(-3deg)",
              }}
            >
              <span
                className="font-display"
                style={{
                  fontSize: 18,
                  color: nodeText,
                  lineHeight: 1,
                  transform: "rotate(3deg)",
                }}
              >
                {String(p.ordem ?? i + 1).padStart(2, "0")}
              </span>
            </motion.div>

            <svg
              width="46"
              height="10"
              style={{ position: "absolute", left: trailX + 12, top: 22 }}
              aria-hidden="true"
            >
              <path
                d={`M 0 5 Q 14 ${2 + (i % 3)}, 32 5`}
                stroke="hsl(var(--trilha))"
                strokeWidth="1.8"
                strokeDasharray="3 4"
                fill="none"
                strokeLinecap="round"
                opacity={future ? 0.4 : 1}
              />
            </svg>

            <motion.div
              onClick={() => onClickPasso?.(p, i)}
              whileHover={{ y: -2, x: onClickPasso ? 4 : 0 }}
              whileTap={onClickPasso ? { scale: 0.99 } : undefined}
              style={{
                marginLeft: cardLeft,
                marginRight: 16,
                padding: "10px 14px",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                background: "hsl(var(--card))",
                flex: 1,
                cursor: onClickPasso ? "pointer" : "default",
                minHeight: rowH - 28,
                transform: isActive ? "translateY(-1px)" : undefined,
                boxShadow: isActive ? "0 6px 20px hsl(var(--accent) / 0.25)" : undefined,
                opacity: future ? 0.65 : 1,
                transition: "all .2s ease",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  {p.descricao}
                </span>
                {p.obrigatorio && (
                  <StatusPill tone="barreira" dark={dark}>
                    obrigatório
                  </StatusPill>
                )}
              </div>
              <div
                style={{
                  marginTop: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                {p.categoria && (
                  <span
                    style={{
                      display: "inline-flex",
                      fontSize: 11,
                      padding: "2px 7px",
                      borderRadius: 999,
                      background: "hsl(217 91% 95%)",
                      color: "hsl(217 91% 30%)",
                    }}
                  >
                    {p.categoria}
                  </span>
                )}
                {p.tipo && (
                  <span
                    style={{
                      display: "inline-flex",
                      fontSize: 11,
                      padding: "2px 7px",
                      borderRadius: 999,
                      background: "hsl(45 90% 90%)",
                      color: "hsl(45 90% 24%)",
                    }}
                  >
                    {p.tipo}
                  </span>
                )}
                {p.tempo != null && (
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 12,
                      color: "hsl(var(--muted-foreground))",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Clock3 size={12} strokeWidth={1.8} style={{ opacity: 0.7 }} />
                    {p.tempo}s
                  </span>
                )}
                {p.print && (
                  <span
                    style={{
                      fontSize: 11,
                      color: "hsl(var(--primary))",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <ImageIcon size={12} strokeWidth={1.8} />
                    print
                  </span>
                )}
                {p.marcacao === "desvio" && (
                  <StatusPill tone="desvio" dark={dark}>
                    desvio
                  </StatusPill>
                )}
                {p.marcacao === "repeticao" && (
                  <StatusPill tone="repeticao" dark={dark}>
                    repetição ×{p.repeticoes ?? 2}
                  </StatusPill>
                )}
                {p.extra && (
                  <StatusPill tone="desvio" dark={dark}>
                    passo extra
                  </StatusPill>
                )}
              </div>
              {p.note && (
                <div
                  className="font-hand"
                  style={{
                    marginTop: 8,
                    fontSize: 14,
                    color: "hsl(var(--muted-foreground))",
                    transform: "rotate(-0.4deg)",
                  }}
                >
                  &ldquo;{p.note}&rdquo;
                </div>
              )}

              {p.marcacao === "desvio" && (
                <div
                  style={{
                    position: "absolute",
                    top: -6,
                    right: 10,
                    opacity: 0.9,
                  }}
                >
                  <DesvioX size={42} />
                </div>
              )}
              {p.marcacao === "repeticao" && (
                <div style={{ position: "absolute", top: -10, right: 10 }}>
                  <LoopRepeticao size={42} />
                </div>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

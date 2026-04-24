// apps/web/components/analysis/SludgeChart.tsx
"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { StepScore } from "@/features/analysis/api/analysisService";

interface SludgeChartProps {
  data: StepScore[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-slate-100 shadow-2xl rounded-2xl max-w-[240px]">
        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
          Etapa {data.ordem}
        </p>
        <p className="text-sm font-black text-slate-900 mb-2 leading-tight">
          {data.nome}
        </p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-black text-slate-900">
            {data.indice_sludge || 0}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            Pontos F5
          </span>
        </div>
        {data.recomendacao && (
          <div className="pt-3 border-t border-slate-50">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">
              Recomendação
            </p>
            <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">
              {data.recomendacao}
            </p>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export function SludgeChart({ data }: SludgeChartProps) {
  // Cores baseadas na prioridade (Metodologia F5)
  const getBarColor = (prioridade: number | null) => {
    switch (prioridade) {
      case 4:
        return "#ef4444"; // Crítica
      case 3:
        return "#f97316"; // Alta
      case 2:
        return "#eab308"; // Média
      default:
        return "#38bdf8"; // Baixa/Normal
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
        <p className="text-sm font-medium text-slate-400 italic">
          Nenhum dado de análise disponível para este processo.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height={300} debounce={50}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis
            dataKey="ordem"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
            dy={10}
            label={{
              value: "Etapas do Processo",
              position: "insideBottom",
              offset: -10,
              fill: "#94a3b8",
              fontSize: 10,
              fontWeight: 800,
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
            dx={-10}
            domain={[0, 25]} // Escala F5 é Barreira(5) x Impacto(5) = 25 max
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
          <ReferenceLine
            y={9}
            stroke="#cbd5e1"
            strokeDasharray="5 5"
            label={{
              value: "Limiar Sludge",
              position: "right",
              fill: "#94a3b8",
              fontSize: 10,
            }}
          />

          <Bar dataKey="indice_sludge" radius={[6, 6, 0, 0]} barSize={40}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.prioridade)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

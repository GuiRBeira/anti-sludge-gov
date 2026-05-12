"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Item = {
  jornada_id: string;
  jornada_label: string;
  tipo_jornada: "planejada" | "individual" | "padrao";
  total_segundos: number;
};

export default function GraficoTempoJornadas({ data }: { data: Item[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        Sem dado — registre tempo nos passos das jornadas para ver totais aqui.
      </p>
    );
  }

  const chartData = data.map((d) => ({
    nome: d.jornada_label,
    tipo: d.tipo_jornada,
    minutos: Number((d.total_segundos / 60).toFixed(2)),
    segundos: d.total_segundos,
  }));

  return (
    <div style={{ width: "100%", height: Math.max(220, chartData.length * 36) }}>
      <ResponsiveContainer>
        <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 24 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis type="number" />
          <YAxis type="category" dataKey="nome" width={120} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(v, _name, item) => {
              const seg = (item?.payload as { segundos?: number } | undefined)?.segundos ?? 0;
              return [`${v} min (${seg}s)`, "Tempo total"];
            }}
            contentStyle={{ fontSize: 12 }}
          />
          <Bar dataKey="minutos" fill="hsl(var(--tempo))" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

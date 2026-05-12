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
  criterio_nome: string;
  media: number | null;
  qtd_respostas: number;
};

export default function GraficoMediaCriterios({
  data,
  dimensao,
}: {
  data: Item[];
  dimensao: "barreira" | "impacto";
}) {
  const comDado = data.filter((d) => d.media != null);
  const semDado = data.filter((d) => d.media == null);

  if (comDado.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        Sem dado — responda questionários de {dimensao} em alguma jornada para
        ver médias aqui.
      </p>
    );
  }

  const chartData = comDado.map((d) => ({
    nome: d.criterio_nome,
    media: Number(d.media!.toFixed(2)),
    qtd: d.qtd_respostas,
  }));

  const cor = dimensao === "barreira" ? "#ef4444" : "#3b82f6";

  return (
    <div className="flex flex-col gap-3">
      <div style={{ width: "100%", height: Math.max(200, chartData.length * 32) }}>
        <ResponsiveContainer>
          <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 24 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis type="number" domain={[0, 5]} tickCount={6} />
            <YAxis
              type="category"
              dataKey="nome"
              width={180}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(v, _name, item) => {
                const qtd = (item?.payload as { qtd?: number } | undefined)?.qtd ?? 0;
                return [`${v} (${qtd} resp.)`, "Média"];
              }}
              contentStyle={{ fontSize: 12 }}
            />
            <Bar dataKey="media" fill={cor} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {semDado.length > 0 && (
        <details className="text-xs text-muted-foreground">
          <summary className="cursor-pointer">
            {semDado.length} critério{semDado.length === 1 ? "" : "s"} sem dado
          </summary>
          <ul className="list-disc list-inside mt-2 pl-2">
            {semDado.map((d) => (
              <li key={d.criterio_nome}>{d.criterio_nome}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import { tabelaDimensionamento } from "@/features/analysis/queries";

function csvCell(value: unknown): string {
  const text = value == null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const processo = await getProcesso(id);
  if (!processo) notFound();

  const linhas = await tabelaDimensionamento(id);
  const header = [
    "processo",
    "jornada",
    "tipo_jornada",
    "passo_ordem",
    "passo_descricao",
    "categoria",
    "tipo_comportamento",
    "questionario",
    "criterio",
    "dimensao",
    "subdimensao",
    "nota",
    "nao_se_aplica",
    "observacao",
  ];
  const body = linhas.map((linha) =>
    [
      processo.nome,
      linha.jornada_label,
      linha.tipo_jornada,
      linha.passo_ordem,
      linha.passo_descricao,
      linha.categoria,
      linha.tipo_comportamento,
      linha.questionario,
      linha.criterio,
      linha.dimensao_criterio,
      linha.subdimensao,
      linha.nota,
      linha.nao_se_aplica ? "sim" : "nao",
      linha.observacao,
    ]
      .map(csvCell)
      .join(","),
  );

  const csv = [header.map(csvCell).join(","), ...body].join("\n");
  return new Response(`\uFEFF${csv}`, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="dimensionamento-${id}.csv"`,
    },
  });
}

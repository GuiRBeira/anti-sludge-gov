import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import {
  mediasPorCriterio,
  rankingSludgePorPasso,
  tabelaDimensionamento,
  tempoTotalPorJornada,
} from "@/features/analysis/queries";
import GraficoMediaCriterios from "./grafico-criterios";
import GraficoTempoJornadas from "./grafico-tempos";
import { BarreiraIcon } from "@/components/fcinco/barreira-icon";
import { SketchFrame } from "@/components/fcinco/sketch-frame";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";

export default async function ResultadosPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const processo = await getProcesso(id);
  if (!processo) notFound();

  const [medias, tempos, ranking, tabelaDim] = await Promise.all([
    mediasPorCriterio(id),
    tempoTotalPorJornada(id),
    rankingSludgePorPasso(id),
    tabelaDimensionamento(id),
  ]);

  const barreiras = medias.filter((m) => m.dimensao === "barreira");
  const impactosNaoNec = medias.filter(
    (m) => m.dimensao === "impacto" && m.subdimensao !== "necessidade",
  );
  const necessidade = medias.filter(
    (m) => m.dimensao === "impacto" && m.subdimensao === "necessidade",
  );

  const totalRespondidasBarreira = barreiras.reduce((s, m) => s + m.qtd_respostas, 0);
  const totalRespondidasImpacto = impactosNaoNec.reduce((s, m) => s + m.qtd_respostas, 0);
  const barreirasCriticas = barreiras.filter((m) => (m.media ?? 0) >= 4);
  const totalRespostas =
    totalRespondidasBarreira +
    totalRespondidasImpacto +
    necessidade.reduce((s, m) => s + m.qtd_respostas, 0);
  const splatterColor =
    totalRespostas === 0
      ? "hsl(var(--accent))"
      : barreirasCriticas.length > 0
        ? "hsl(var(--destructive))"
        : "hsl(var(--fcinco-teal))";

  return (
    <div className="flex flex-col gap-8">
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={300}
          opacity={0.34}
          seed={55}
          color={splatterColor}
        />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href={`/processos/${id}`}
              className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              ← {processo.nome}
            </Link>
            <div className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              etapa 07 de 07
            </div>
            <div className="mt-4">
              <SketchFrame seed={5} padX={24} padY={12}>
                <span className="font-hand text-4xl leading-tight">Resultados</span>
              </SketchFrame>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
              Médias derivadas das respostas reais dos questionários. Onde não há
              dado, mostramos &quot;sem dado&quot;: nada é estimado.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <StatusPill tone="em_progresso">{totalRespostas} respostas</StatusPill>
            <StatusPill tone="barreira">
              {barreirasCriticas.length} barreiras criticas
            </StatusPill>
            <StatusPill tone="print">{tempos.length} jornadas</StatusPill>
            <Link
              href={`/processos/${id}/resultados/export.csv`}
              className="inline-flex h-7 items-center rounded-full border bg-background px-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
            >
              exportar CSV
            </Link>
          </div>
        </div>
      </header>

      <Secao
        titulo="Médias de barreiras por critério"
        descricao={`${totalRespondidasBarreira} resposta${totalRespondidasBarreira === 1 ? "" : "s"} considerada${totalRespondidasBarreira === 1 ? "" : "s"} (escala 1-5; N/A excluído).`}
      >
        <GraficoMediaCriterios data={barreiras} dimensao="barreira" />
      </Secao>

      <Secao
        titulo="Médias de impactos por critério"
        descricao={`Carga Cognitiva, Emoção e Consequência. ${totalRespondidasImpacto} resposta${totalRespondidasImpacto === 1 ? "" : "s"}.`}
      >
        <GraficoMediaCriterios data={impactosNaoNec} dimensao="impacto" />
      </Secao>

      <Secao
        titulo="Necessidade (uma por jornada)"
        descricao="Avaliada uma vez por jornada inteira, não por passo."
      >
        <NecessidadeBlock data={necessidade} />
      </Secao>

      <Secao
        titulo="Tempo total por jornada"
        descricao="Soma dos tempos por passo cadastrados em cada jornada."
      >
        <GraficoTempoJornadas data={tempos} />
      </Secao>

      <Secao
        titulo="Ranking de sludge por etapa"
        descricao="Composição inicial entre média de barreiras e média de impactos por passo. Só usa respostas existentes; N/A é excluído."
      >
        {ranking.length === 0 ? (
          <p className="text-sm italic text-muted-foreground">
            Sem dados suficientes para ranquear etapas.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Etapa</th>
                  <th className="px-3 py-2">Jornada</th>
                  <th className="px-3 py-2">Barreira</th>
                  <th className="px-3 py-2">Impacto</th>
                  <th className="px-3 py-2">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {ranking.slice(0, 12).map((item) => (
                  <tr key={item.passo_id}>
                    <td className="px-3 py-2">
                      <div className="font-medium">
                        {item.passo_ordem ? `${item.passo_ordem}. ` : ""}
                        {item.passo_descricao ?? "Passo sem descrição"}
                      </div>
                      <div className="font-mono text-[11px] text-muted-foreground">
                        {item.qtd_respostas} resposta{item.qtd_respostas === 1 ? "" : "s"}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{item.jornada_label}</td>
                    <td className="px-3 py-2">{item.media_barreira?.toFixed(2) ?? "sem dado"}</td>
                    <td className="px-3 py-2">{item.media_impacto?.toFixed(2) ?? "sem dado"}</td>
                    <td className="px-3 py-2 font-display text-2xl text-destructive">
                      {item.sludge_score?.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Secao>

      <Secao
        titulo="Barreiras críticas"
        descricao="Critérios com média maior ou igual a 4,0, calculados apenas quando há resposta."
      >
        {barreirasCriticas.length === 0 ? (
          <p className="text-sm italic text-muted-foreground">
            Sem barreira crítica com os dados atuais.
          </p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {barreirasCriticas.map((b) => (
              <li
                key={b.criterio_nome}
                className="relative rounded-md border bg-background p-4"
              >
                <div className="absolute right-3 top-3">
                  <BarreiraIcon size={28} />
                </div>
                <div className="pr-10 text-sm font-semibold">{b.criterio_nome}</div>
                <div className="mt-3 font-display text-4xl leading-none text-destructive">
                  {b.media?.toFixed(1)}
                </div>
                <div className="mt-1 font-mono text-xs text-muted-foreground">
                  {b.qtd_respostas} resposta{b.qtd_respostas === 1 ? "" : "s"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Secao>

      <Secao
        titulo="Tabela dinâmica de dimensionamento"
        descricao="Base tabular das respostas por jornada, passo, critério e nota. Use o CSV para análise externa completa."
      >
        {tabelaDim.length === 0 ? (
          <p className="text-sm italic text-muted-foreground">Sem respostas para tabular.</p>
        ) : (
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full min-w-[980px] text-sm">
              <thead className="bg-muted/40 text-left text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Jornada</th>
                  <th className="px-3 py-2">Passo</th>
                  <th className="px-3 py-2">Categoria · Tipo</th>
                  <th className="px-3 py-2">Critério</th>
                  <th className="px-3 py-2">Nota</th>
                  <th className="px-3 py-2">Obs.</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {tabelaDim.slice(0, 80).map((linha) => (
                  <tr key={linha.resposta_id}>
                    <td className="px-3 py-2">{linha.jornada_label}</td>
                    <td className="px-3 py-2">
                      {linha.passo_ordem ? `${linha.passo_ordem}. ` : ""}
                      {linha.passo_descricao ?? "Jornada inteira"}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {[linha.categoria, linha.tipo_comportamento].filter(Boolean).join(" · ") || "—"}
                    </td>
                    <td className="px-3 py-2">{linha.criterio ?? linha.questionario}</td>
                    <td className="px-3 py-2 font-mono">
                      {linha.nao_se_aplica ? "N/A" : (linha.nota ?? "sem dado")}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {linha.observacao ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Secao>
    </div>
  );
}

function Secao({
  titulo,
  descricao,
  children,
}: {
  titulo: string;
  descricao: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border bg-card p-5">
      <div className="mb-1 flex items-center gap-3">
        <h2 className="font-medium">{titulo}</h2>
        <SketchUnderline width={95} variant="short" color="hsl(var(--accent))" />
      </div>
      <p className="mb-4 text-xs text-muted-foreground">{descricao}</p>
      {children}
    </section>
  );
}

function NecessidadeBlock({
  data,
}: {
  data: { criterio_nome: string; media: number | null; qtd_respostas: number }[];
}) {
  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground italic">Sem critério de necessidade no catálogo.</p>;
  }
  return (
    <ul className="text-sm flex flex-col gap-2">
      {data.map((d) => (
        <li key={d.criterio_nome} className="flex items-center justify-between rounded-md border bg-background p-3">
          <span>{d.criterio_nome}</span>
          {d.media != null ? (
            <span>
              <strong>{d.media.toFixed(2)}</strong>{" "}
              <span className="text-xs text-muted-foreground">
                ({d.qtd_respostas} resp.)
              </span>
            </span>
          ) : (
            <span className="text-xs text-muted-foreground italic">sem dado</span>
          )}
        </li>
      ))}
    </ul>
  );
}

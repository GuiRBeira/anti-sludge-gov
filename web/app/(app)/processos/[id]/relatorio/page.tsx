import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import { mediasPorCriterio, tempoTotalPorJornada } from "@/features/analysis/queries";
import { Button } from "@/components/ui/button";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";

export default async function RelatorioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const processo = await getProcesso(id);
  if (!processo) notFound();

  const [medias, tempos] = await Promise.all([
    mediasPorCriterio(id),
    tempoTotalPorJornada(id),
  ]);
  const respondidas = medias.reduce((sum, item) => sum + item.qtd_respostas, 0);
  const barreirasCriticas = medias.filter(
    (item) => item.dimensao === "barreira" && (item.media ?? 0) >= 4,
  );

  return (
    <div className="flex flex-col gap-6">
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={280}
          opacity={0.3}
          seed={91}
          color="hsl(var(--primary))"
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
              relatório metodológico · MVP v1
            </div>
            <h1 className="mt-1 text-3xl font-semibold leading-tight">
              Relatório do diagnóstico
            </h1>
            <SketchUnderline width={220} variant="long" color="hsl(var(--accent))" />
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              Síntese navegável do processo, com exportação CSV da tabela de
              dimensionamento. A geração PDF fica como pendência de hardening.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <StatusPill tone="em_progresso">{respondidas} respostas</StatusPill>
            <StatusPill tone="barreira">{barreirasCriticas.length} críticas</StatusPill>
            <StatusPill tone="print">{tempos.length} jornadas</StatusPill>
          </div>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <ResumoCard label="Órgão" value={processo.orgao?.sigla ?? "—"} />
        <ResumoCard label="Esfera" value={processo.orgao?.esfera ?? "—"} />
        <ResumoCard label="Tempo em jornadas" value={`${tempos.length}`} />
      </section>

      <section className="rounded-lg border bg-card p-5">
        <h2 className="font-medium">Exportações</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          O CSV inclui jornada, passo, categoria, tipo, critério, nota, N/A e
          observação discursiva para reanálise externa.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={`/processos/${id}/resultados/export.csv`}>
            <Button>Baixar CSV de dimensionamento</Button>
          </Link>
          <Link href={`/processos/${id}/resultados`}>
            <Button variant="outline">Ver gráficos</Button>
          </Link>
        </div>
      </section>

      <section className="rounded-lg border bg-card p-5">
        <h2 className="font-medium">Contexto registrado</h2>
        <dl className="mt-3 grid gap-3 text-sm md:grid-cols-2">
          <ResumoTexto label="Objetivo" value={processo.objetivo} />
          <ResumoTexto label="Público-alvo" value={processo.publico_alvo} />
          <ResumoTexto label="Perfil foco" value={processo.perfil_foco} />
          <ResumoTexto label="Hipóteses" value={processo.hipoteses} />
        </dl>
      </section>
    </div>
  );
}

function ResumoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="font-mono text-[10px] uppercase text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold capitalize">{value}</div>
    </div>
  );
}

function ResumoTexto({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div>
      <dt className="font-medium">{label}</dt>
      <dd className="mt-1 text-muted-foreground">{value || "sem dado"}</dd>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import { getProcessoPermissions } from "@/lib/auth/processo-permissions";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";
import { StatusPill } from "@/components/fcinco/status-pill";
import ContextoForm from "./form";

export default async function EditarContextoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const processo = await getProcesso(id);
  if (!processo) notFound();
  const { canEdit } = await getProcessoPermissions(id);
  const camposContexto = [
    processo.objetivo,
    processo.abrangencia,
    processo.publico_alvo,
    processo.perfil_foco,
    processo.indicadores_satisfacao,
    processo.hipoteses,
  ];
  const preenchidos = camposContexto.filter(
    (valor) => typeof valor === "string" && valor.trim().length > 0,
  ).length;

  return (
    <div className="flex max-w-3xl flex-col gap-6 pb-12">
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={240}
          rotation={-12}
          opacity={0.3}
          seed={17}
          color="hsl(var(--accent))"
        />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href={`/processos/${id}`}
              className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              ← {processo.nome}
            </Link>
            <div className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              etapa 01 de 07
            </div>
            <h1 className="mt-1 font-hand text-4xl leading-tight">
              Compreensão do contexto
            </h1>
            <SketchUnderline width={220} variant="long" color="hsl(var(--accent))" />
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Equivalente à aba <strong>1 Compreensão do Contexto</strong> da
              planilha F5. Alinhe objetivo, público, recorte observado,
              indicadores e hipóteses antes de mapear barreiras.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <StatusPill tone={preenchidos === camposContexto.length ? "concluido" : "em_progresso"}>
              {preenchidos}/{camposContexto.length} campos
            </StatusPill>
            {!canEdit && <StatusPill tone="pendente">somente leitura</StatusPill>}
          </div>
        </div>
      </header>

      <ContextoForm processoId={id} initial={processo} canEdit={canEdit} />
    </div>
  );
}

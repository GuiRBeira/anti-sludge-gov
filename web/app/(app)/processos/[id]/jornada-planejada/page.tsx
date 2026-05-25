import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import { getProcessoPermissions } from "@/lib/auth/processo-permissions";
import {
  getJornadaPlanejada,
  listPassosJornada,
  listTiposComportamento,
} from "@/features/journeys/queries";
import { ensureJornadaPlanejada } from "@/features/journeys/actions";
import { listQuestionariosAplicaveis } from "@/features/questionnaires/queries";
import { StageNavigation } from "@/components/fcinco/stage-navigation";
import JornadaPlanejadaEditor from "./editor";
import { Button } from "@/components/ui/button";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";
import {
  formatTempo,
  totalTempoSegundos,
} from "@/components/fcinco/trilha-utils";

export default async function JornadaPlanejadaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const processo = await getProcesso(id);
  if (!processo) notFound();
  const { canEdit } = await getProcessoPermissions(id);

  const jornada = await getJornadaPlanejada(id);
  const tipos = await listTiposComportamento();

  if (!jornada) {
    return (
      <div className="flex max-w-3xl flex-col gap-6">
        <header className="relative overflow-hidden rounded-lg border bg-card p-6">
          <WatercolorSplatter
            className="absolute -right-20 -top-24"
            size={240}
            opacity={0.3}
            seed={22}
          />
          <div className="relative">
          <Link
            href={`/processos/${id}`}
            className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            ← {processo.nome}
          </Link>
          <div className="mt-3 font-mono text-xs uppercase text-muted-foreground">
            etapa 02 de 06
          </div>
          <h1 className="font-hand text-4xl leading-tight">Jornada planejada</h1>
          <SketchUnderline width={190} variant="long" color="hsl(var(--accent))" />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Equivalente à aba <strong>2.1 Mapeamento JorPlanejada</strong>:
            sequência ideal de passos do serviço, com comportamento, tempo
            estimado e obrigatoriedade.
          </p>
          </div>
        </header>

        <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Ainda não há jornada planejada para este processo.
          </p>
          {canEdit ? (
            <form
              action={async () => {
                "use server";
                await ensureJornadaPlanejada(id);
              }}
            >
              <Button type="submit">Iniciar jornada planejada</Button>
            </form>
          ) : (
            <StatusPill tone="pendente">somente leitura</StatusPill>
          )}
        </div>
      </div>
    );
  }

  const [passos, questionarios] = await Promise.all([
    listPassosJornada(jornada.id),
    listQuestionariosAplicaveis("planejada"),
  ]);
  const totalTempo = totalTempoSegundos(passos);

  return (
    <div className="flex flex-col gap-6">
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={260}
          opacity={0.32}
          seed={24}
        />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href={`/processos/${id}`}
              className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              ← {processo.nome}
            </Link>
            <div className="mt-3 font-mono text-xs uppercase text-muted-foreground">
              etapa 02 de 06 · planejada
            </div>
            <h1 className="font-hand text-4xl leading-tight">
              A trilha ideal do serviço
            </h1>
            <SketchUnderline width={220} variant="long" color="hsl(var(--accent))" />
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Equivalente à aba <strong>2.1 Mapeamento JorPlanejada</strong>.
              Compare este caminho com as jornadas individuais para localizar
              desvios, repetições e passos extras.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <StatusPill tone={passos.length > 0 ? "em_progresso" : "pendente"}>
              {passos.length} passos
            </StatusPill>
            <StatusPill tone="print">{formatTempo(totalTempo)}</StatusPill>
            <StatusPill tone="concluido">
              {questionarios.length} questionarios
            </StatusPill>
            {!canEdit && <StatusPill tone="pendente">somente leitura</StatusPill>}
          </div>
        </div>
      </header>

      <JornadaPlanejadaEditor
        jornadaId={jornada.id}
        passos={passos}
        tipos={tipos}
        readOnly={!canEdit}
      />

      <section className="rounded-lg border bg-card p-5">
        <h2 className="mb-3 font-medium">Questionários desta jornada</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {questionarios.map((q) => (
            <li key={q.id}>
              <Link
                href={`/processos/${id}/jornadas/${jornada.id}/questionario/${q.codigo}`}
                className="block rounded-md border bg-background p-3 transition-colors hover:bg-muted/40"
              >
                <div className="text-sm font-medium">{q.nome}</div>
                <div className="text-xs text-muted-foreground capitalize">{q.dimensao}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <StageNavigation currentStage={2} processoId={id} />
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import { getProcessoPermissions } from "@/lib/auth/processo-permissions";
import {
  getJornadaPadrao,
  getJornadaPlanejada,
  listPassosJornada,
  listTiposComportamento,
} from "@/features/journeys/queries";
import {
  ensureJornadaPadrao,
  clonarPassosDaPlanejada,
  consolidarJornadaPadrao,
} from "@/features/journeys/actions";
import { listQuestionariosAplicaveis } from "@/features/questionnaires/queries";
import { Button } from "@/components/ui/button";
import JornadaIndividualEditor from "../jornadas-individuais/[jornadaId]/editor";
import { createClient } from "@/lib/supabase/server";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";

export default async function JornadaPadraoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const processo = await getProcesso(id);
  if (!processo) notFound();
  const { canEdit } = await getProcessoPermissions(id);

  const [padrao, planejada] = await Promise.all([
    getJornadaPadrao(id),
    getJornadaPlanejada(id),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={260}
          opacity={0.3}
          seed={36}
        />
        <div className="relative">
          <Link
            href={`/processos/${id}`}
            className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            ← {processo.nome}
          </Link>
          <div className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            etapa 05 de 07 · sintese
          </div>
          <h1 className="font-hand text-4xl leading-tight">Jornada padrão</h1>
          <SketchUnderline width={210} variant="long" color="hsl(var(--accent))" />
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            Síntese normalizada que serve de referência para análise. Equivalente
            às abas <strong>2.2 Mapeamento JorPadrão</strong> e <strong># Tabela JorPadrão</strong>.
            Comece copiando da planejada e ajuste com base nos padrões observados
            nas jornadas individuais.
          </p>
          {!canEdit && (
            <div className="mt-3">
              <StatusPill tone="pendente">somente leitura</StatusPill>
            </div>
          )}
        </div>
      </header>

      {!padrao ? (
        <div className="flex flex-col gap-3 rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Ainda não há jornada padrão para este processo.
          </p>
          {canEdit ? (
            <form
              action={async () => {
                "use server";
                await ensureJornadaPadrao(id);
              }}
            >
              <Button type="submit">Iniciar jornada padrão</Button>
            </form>
          ) : (
            <StatusPill tone="pendente">somente leitura</StatusPill>
          )}
        </div>
      ) : (
        <PadraoEditor
          processoId={id}
          jornadaId={padrao.id}
          planejadaId={planejada?.id ?? null}
          readOnly={!canEdit}
        />
      )}
    </div>
  );
}

async function PadraoEditor({
  processoId,
  jornadaId,
  planejadaId,
  readOnly,
}: {
  processoId: string;
  jornadaId: string;
  planejadaId: string | null;
  readOnly: boolean;
}) {
  const supabase = await createClient();

  const [passos, tipos, planejadosRaw] = await Promise.all([
    listPassosJornada(jornadaId),
    listTiposComportamento(),
    planejadaId
      ? supabase
          .from("passo_jornada")
          .select("id, ordem, descricao")
          .eq("jornada_id", planejadaId)
          .order("ordem")
      : Promise.resolve({ data: [] as { id: string; ordem: number; descricao: string | null }[] }),
  ]);
  const { count: passosIndividuais } = await supabase
    .from("passo_jornada")
    .select("id, jornada:jornada_id!inner (processo_id, tipo_jornada)", {
      count: "exact",
      head: true,
    })
    .eq("jornada.processo_id", processoId)
    .eq("jornada.tipo_jornada", "individual");

  const passosPlanejados =
    (planejadosRaw as { data: { id: string; ordem: number; descricao: string | null }[] }).data ?? [];

  return (
    <>
      {!readOnly && passos.length === 0 && passosPlanejados.length > 0 && (
        <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 p-5">
          <p className="text-sm">
            Copie os {passosPlanejados.length} passos da jornada planejada como
            ponto de partida e ajuste com base nas individuais.
          </p>
          <form
            action={async () => {
              "use server";
              await clonarPassosDaPlanejada(jornadaId);
            }}
          >
            <Button type="submit" variant="outline" size="sm">
              Copiar da planejada
            </Button>
          </form>
        </div>
      )}

      {!readOnly && (passosIndividuais ?? 0) > 0 && (
        <div className="flex flex-col gap-3 rounded-lg border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-medium">Consolidação automática</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Gera a jornada padrão combinando passos vinculados à planejada,
              tempos médios, tipos mais frequentes e passos extras observados.
            </p>
          </div>
          <form
            action={async () => {
              "use server";
              await consolidarJornadaPadrao(processoId);
            }}
          >
            <Button type="submit" variant="outline">
              Consolidar individuais
            </Button>
          </form>
        </div>
      )}

      <JornadaIndividualEditor
        processoId={processoId}
        jornadaId={jornadaId}
        passos={passos}
        tipos={tipos}
        passosPlanejados={passosPlanejados}
        readOnly={readOnly}
      />

      <QuestionariosLinks processoId={processoId} jornadaId={jornadaId} />
    </>
  );
}

async function QuestionariosLinks({
  processoId,
  jornadaId,
}: {
  processoId: string;
  jornadaId: string;
}) {
  const questionarios = await listQuestionariosAplicaveis("padrao");
  return (
    <section className="rounded-lg border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="font-medium">Questionários desta jornada</h2>
        <StatusPill tone={questionarios.length > 0 ? "em_progresso" : "pendente"}>
          {questionarios.length}
        </StatusPill>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {questionarios.map((q) => (
          <li key={q.id}>
            <Link
              href={`/processos/${processoId}/jornadas/${jornadaId}/questionario/${q.codigo}`}
              className="block rounded-md border bg-background p-3 transition-colors hover:bg-muted/40"
            >
              <div className="text-sm font-medium">{q.nome}</div>
              <div className="text-xs text-muted-foreground capitalize">{q.dimensao}</div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

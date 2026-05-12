import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import {
  getJornadaPadrao,
  getJornadaPlanejada,
  listPassosJornada,
  listTiposComportamento,
} from "@/features/journeys/queries";
import {
  ensureJornadaPadrao,
  clonarPassosDaPlanejada,
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
            className="text-sm text-muted-foreground hover:underline"
          >
            ← {processo.nome}
          </Link>
          <div className="mt-3 font-mono text-xs uppercase text-muted-foreground">
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
        </div>
      </header>

      {!padrao ? (
        <div className="flex flex-col gap-3 rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Ainda não há jornada padrão para este processo.
          </p>
          <form
            action={async () => {
              "use server";
              await ensureJornadaPadrao(id);
            }}
          >
            <Button type="submit">Iniciar jornada padrão</Button>
          </form>
        </div>
      ) : (
        <PadraoEditor processoId={id} jornadaId={padrao.id} planejadaId={planejada?.id ?? null} />
      )}
    </div>
  );
}

async function PadraoEditor({
  processoId,
  jornadaId,
  planejadaId,
}: {
  processoId: string;
  jornadaId: string;
  planejadaId: string | null;
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

  const passosPlanejados =
    (planejadosRaw as { data: { id: string; ordem: number; descricao: string | null }[] }).data ?? [];

  return (
    <>
      {passos.length === 0 && passosPlanejados.length > 0 && (
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

      <JornadaIndividualEditor
        processoId={processoId}
        jornadaId={jornadaId}
        passos={passos}
        tipos={tipos}
        passosPlanejados={passosPlanejados}
        readOnly={false}
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

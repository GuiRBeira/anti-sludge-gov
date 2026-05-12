import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import {
  getJornadaById,
  listPassosJornada,
  listTiposComportamento,
} from "@/features/journeys/queries";
import { clonarPassosDaPlanejada, toggleValidacaoJornada } from "@/features/journeys/actions";
import { listQuestionariosAplicaveis } from "@/features/questionnaires/queries";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import JornadaIndividualEditor from "./editor";
import { NumeroEtapa } from "@/components/fcinco/numero-etapa";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";
import {
  formatTempo,
  totalTempoSegundos,
} from "@/components/fcinco/trilha-utils";

export default async function JornadaIndividualPage({
  params,
}: {
  params: Promise<{ id: string; jornadaId: string }>;
}) {
  const { id, jornadaId } = await params;
  const processo = await getProcesso(id);
  if (!processo) notFound();

  const jornada = await getJornadaById(jornadaId);
  if (!jornada || jornada.processo_id !== id || jornada.tipo_jornada !== "individual") {
    notFound();
  }

  const supabase = await createClient();
  const { data: participante } = await supabase
    .from("participante")
    .select("codigo, idade_faixa, escolaridade, genero")
    .eq("id", jornada.participante_id!)
    .maybeSingle();

  const [passos, tipos, planejada, questionarios] = await Promise.all([
    listPassosJornada(jornadaId),
    listTiposComportamento(),
    supabase
      .from("jornada")
      .select("id")
      .eq("processo_id", id)
      .eq("tipo_jornada", "planejada")
      .maybeSingle()
      .then((r) => r.data),
    listQuestionariosAplicaveis("individual"),
  ]);

  let passosPlanejados: { id: string; ordem: number; descricao: string | null }[] = [];
  if (planejada) {
    const { data } = await supabase
      .from("passo_jornada")
      .select("id, ordem, descricao")
      .eq("jornada_id", planejada.id)
      .order("ordem");
    passosPlanejados = (data ?? []) as typeof passosPlanejados;
  }
  const totalTempo = totalTempoSegundos(passos);
  const qtdDesvios = passos.filter((p) => p.eh_desvio).length;
  const qtdRepeticoes = passos.filter((p) => p.eh_repeticao).length;

  return (
    <div className="flex flex-col gap-6">
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={260}
          opacity={0.3}
          seed={31}
        />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 gap-4">
            <NumeroEtapa
              value={participante?.codigo ?? "P"}
              size={66}
              tilt={-4}
              className="shrink-0"
            />
            <div className="min-w-0">
              <Link
                href={`/processos/${id}/jornadas-individuais`}
                className="text-sm text-muted-foreground hover:underline"
              >
                ← Jornadas individuais
              </Link>
              <div className="mt-3 font-mono text-xs uppercase text-muted-foreground">
                jornada individual · participante anonimizado
              </div>
              <h1 className="font-hand text-4xl leading-tight">
                Caminho real de {participante?.codigo ?? "participante"}
              </h1>
              <SketchUnderline width={220} variant="long" color="hsl(var(--accent))" />
              <p className="mt-3 text-sm text-muted-foreground">
                {[participante?.idade_faixa, participante?.escolaridade, participante?.genero]
                  .filter(Boolean)
                  .join(" · ") || "Perfil não informado"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {jornada.validada && <StatusPill tone="validada">validada</StatusPill>}
                <StatusPill tone={passos.length > 0 ? "em_progresso" : "pendente"}>
                  {passos.length} passos
                </StatusPill>
                <StatusPill tone="desvio">{qtdDesvios} desvios</StatusPill>
                <StatusPill tone="repeticao">{qtdRepeticoes} repeticoes</StatusPill>
                <StatusPill tone="print">{formatTempo(totalTempo)}</StatusPill>
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <form
              action={async () => {
                "use server";
                await toggleValidacaoJornada(jornadaId);
              }}
            >
              <Button type="submit" variant={jornada.validada ? "outline" : "default"}>
                {jornada.validada ? "Reabrir para edição" : "Marcar como validada"}
              </Button>
            </form>
          </div>
        </div>
      </header>

      {passos.length === 0 && passosPlanejados.length > 0 && (
        <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 p-5">
          <p className="text-sm">
            Pode começar copiando os {passosPlanejados.length} passos da jornada
            planejada como rascunho — depois ajusta o que foi diferente
            (desvios, repetições, tempo real).
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
        processoId={id}
        jornadaId={jornadaId}
        passos={passos}
        tipos={tipos}
        passosPlanejados={passosPlanejados}
        readOnly={jornada.validada}
      />

      <section className="rounded-lg border bg-card p-5">
        <h2 className="mb-3 font-medium">Questionários desta jornada</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {questionarios.map((q) => (
            <li key={q.id}>
              <Link
                href={`/processos/${id}/jornadas/${jornadaId}/questionario/${q.codigo}`}
                className="block rounded-md border bg-background p-3 transition-colors hover:bg-muted/40"
              >
                <div className="text-sm font-medium">{q.nome}</div>
                <div className="text-xs text-muted-foreground capitalize">
                  {q.dimensao}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

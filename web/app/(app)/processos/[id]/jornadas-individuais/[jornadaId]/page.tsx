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

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <Link
            href={`/processos/${id}/jornadas-individuais`}
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Jornadas individuais
          </Link>
          <h1 className="text-2xl font-semibold mt-1">
            Jornada de {participante?.codigo ?? "participante"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {[participante?.idade_faixa, participante?.escolaridade, participante?.genero]
              .filter(Boolean)
              .join(" · ") || "Perfil não informado"}
            {jornada.validada && (
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-900 dark:bg-green-950/40 dark:text-green-200">
                validada
              </span>
            )}
          </p>
        </div>
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
      </header>

      {passos.length === 0 && passosPlanejados.length > 0 && (
        <div className="border rounded-lg p-5 bg-muted/30 flex items-center justify-between gap-3">
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

      <section className="border rounded-lg p-5">
        <h2 className="font-medium mb-3">Questionários desta jornada</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {questionarios.map((q) => (
            <li key={q.id}>
              <Link
                href={`/processos/${id}/jornadas/${jornadaId}/questionario/${q.codigo}`}
                className="block border rounded-md p-3 hover:bg-muted/40 transition-colors"
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

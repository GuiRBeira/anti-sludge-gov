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
      <header>
        <Link
          href={`/processos/${id}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          ← {processo.nome}
        </Link>
        <h1 className="text-2xl font-semibold mt-1">Jornada padrão</h1>
        <p className="text-sm text-muted-foreground">
          Síntese normalizada que serve de referência para análise. Equivalente
          às abas <strong>2.2 Mapeamento JorPadrão</strong> e <strong># Tabela JorPadrão</strong>.
          Comece copiando da planejada e ajuste com base nos padrões observados
          nas jornadas individuais.
        </p>
      </header>

      {!padrao ? (
        <div className="border rounded-lg p-6 flex flex-col gap-3">
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
        <div className="border rounded-lg p-5 bg-muted/30 flex items-center justify-between gap-3">
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
    <section className="border rounded-lg p-5">
      <h2 className="font-medium mb-3">Questionários desta jornada</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {questionarios.map((q) => (
          <li key={q.id}>
            <Link
              href={`/processos/${processoId}/jornadas/${jornadaId}/questionario/${q.codigo}`}
              className="block border rounded-md p-3 hover:bg-muted/40 transition-colors"
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

import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import {
  getJornadaPlanejada,
  listPassosJornada,
  listTiposComportamento,
} from "@/features/journeys/queries";
import { ensureJornadaPlanejada } from "@/features/journeys/actions";
import { listQuestionariosAplicaveis } from "@/features/questionnaires/queries";
import JornadaPlanejadaEditor from "./editor";
import { Button } from "@/components/ui/button";

export default async function JornadaPlanejadaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const processo = await getProcesso(id);
  if (!processo) notFound();

  const jornada = await getJornadaPlanejada(id);
  const tipos = await listTiposComportamento();

  if (!jornada) {
    return (
      <div className="max-w-2xl flex flex-col gap-6">
        <header>
          <Link
            href={`/processos/${id}`}
            className="text-sm text-muted-foreground hover:underline"
          >
            ← {processo.nome}
          </Link>
          <h1 className="text-2xl font-semibold mt-1">Jornada planejada</h1>
          <p className="text-sm text-muted-foreground">
            Equivalente à aba <strong>2.1 Mapeamento JorPlanejada</strong>:
            sequência ideal de passos do serviço, com comportamento, tempo
            estimado e obrigatoriedade.
          </p>
        </header>

        <div className="border rounded-lg p-6 flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Ainda não há jornada planejada para este processo.
          </p>
          <form
            action={async () => {
              "use server";
              await ensureJornadaPlanejada(id);
            }}
          >
            <Button type="submit">Iniciar jornada planejada</Button>
          </form>
        </div>
      </div>
    );
  }

  const [passos, questionarios] = await Promise.all([
    listPassosJornada(jornada.id),
    listQuestionariosAplicaveis("planejada"),
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
        <h1 className="text-2xl font-semibold mt-1">Jornada planejada</h1>
        <p className="text-sm text-muted-foreground">
          Equivalente à aba <strong>2.1 Mapeamento JorPlanejada</strong>.
          {passos.length > 0
            ? ` ${passos.length} passo${passos.length === 1 ? "" : "s"} cadastrado${passos.length === 1 ? "" : "s"}.`
            : " Nenhum passo cadastrado ainda."}
        </p>
      </header>

      <JornadaPlanejadaEditor
        jornadaId={jornada.id}
        passos={passos}
        tipos={tipos}
      />

      <section className="border rounded-lg p-5">
        <h2 className="font-medium mb-3">Questionários desta jornada</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {questionarios.map((q) => (
            <li key={q.id}>
              <Link
                href={`/processos/${id}/jornadas/${jornada.id}/questionario/${q.codigo}`}
                className="block border rounded-md p-3 hover:bg-muted/40 transition-colors"
              >
                <div className="text-sm font-medium">{q.nome}</div>
                <div className="text-xs text-muted-foreground capitalize">{q.dimensao}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

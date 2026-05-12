import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import {
  getJornadaById,
  listPassosJornada,
} from "@/features/journeys/queries";
import {
  getQuestionarioByCodigo,
  listPerguntas,
  getRespostaInstance,
  listItensResposta,
} from "@/features/questionnaires/queries";
import { ensureRespostaQuestionario } from "@/features/questionnaires/actions";
import { Button } from "@/components/ui/button";
import QuestionarioForm from "./form";

export default async function QuestionarioPage({
  params,
}: {
  params: Promise<{ id: string; jornadaId: string; codigo: string }>;
}) {
  const { id, jornadaId, codigo } = await params;

  const [processo, jornada, template] = await Promise.all([
    getProcesso(id),
    getJornadaById(jornadaId),
    getQuestionarioByCodigo(codigo),
  ]);

  if (!processo || !jornada || !template) notFound();
  if (jornada.processo_id !== id) notFound();

  // valida aplicabilidade
  const aplicavelKey =
    jornada.tipo_jornada === "individual" ? "jornada_individual" : "jornada_planejada";
  if (template.aplicavel_a !== aplicavelKey && template.aplicavel_a !== "ambas") {
    notFound();
  }

  const [perguntas, passos] = await Promise.all([
    listPerguntas(template.id),
    listPassosJornada(jornadaId),
  ]);

  let resposta = await getRespostaInstance(template.id, jornadaId);
  let respostaId: string;
  if (!resposta) {
    respostaId = await ensureRespostaQuestionario(template.id, jornadaId);
    resposta = await getRespostaInstance(template.id, jornadaId);
  } else {
    respostaId = resposta.id;
  }
  const itens = await listItensResposta(respostaId);

  // Decide layout: necessidade tem passo_id null (uma vez por jornada);
  // barreiras e impactos têm um item por (pergunta, passo).
  const ehNecessidade = template.dimensao === "necessidade";
  const voltarHref =
    jornada.tipo_jornada === "planejada"
      ? `/processos/${id}/jornada-planejada`
      : jornada.tipo_jornada === "padrao"
        ? `/processos/${id}/jornada-padrao`
        : `/processos/${id}/jornadas-individuais/${jornadaId}`;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <Link
            href={voltarHref}
            className="text-sm text-muted-foreground hover:underline"
          >
            ← {processo.nome}
          </Link>
          <h1 className="text-2xl font-semibold mt-1">{template.nome}</h1>
          <p className="text-sm text-muted-foreground">
            {template.descricao}
            {resposta?.concluido && (
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-900 dark:bg-green-950/40 dark:text-green-200">
                concluído
              </span>
            )}
          </p>
        </div>
      </header>

      {!ehNecessidade && passos.length === 0 ? (
        <div className="border rounded-lg p-6">
          <p className="text-sm text-muted-foreground">
            Esta jornada ainda não tem passos cadastrados — não dá para
            responder o questionário sem etapas. Adicione passos primeiro.
          </p>
          <div className="mt-3">
            <Link href={voltarHref}>
              <Button variant="outline" size="sm">Voltar para a jornada</Button>
            </Link>
          </div>
        </div>
      ) : (
        <QuestionarioForm
          respostaId={respostaId}
          perguntas={perguntas}
          passos={passos}
          itensIniciais={itens}
          modo={ehNecessidade ? "necessidade" : "matriz"}
          concluido={resposta?.concluido ?? false}
          textoNotaMin={template.dimensao === "barreira" ? "1 - Sem barreiras" : "1"}
          textoNotaMax={template.dimensao === "barreira" ? "5 - Impeditivas" : "5"}
        />
      )}
    </div>
  );
}

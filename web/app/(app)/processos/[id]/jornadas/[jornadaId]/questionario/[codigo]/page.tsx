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
import { SketchFrame } from "@/components/fcinco/sketch-frame";
import { StatusPill } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";

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
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={270}
          opacity={0.32}
          seed={42}
        />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
          <Link
            href={voltarHref}
            className="text-sm text-muted-foreground hover:underline"
          >
            ← {processo.nome}
          </Link>
          <div className="mt-4">
            <SketchFrame seed={9} padX={22} padY={10}>
              <span className="font-hand text-3xl leading-tight sm:text-4xl">
                {template.nome}
              </span>
            </SketchFrame>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            {template.descricao}
          </p>
        </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {resposta?.concluido && <StatusPill tone="concluido">concluido</StatusPill>}
            <StatusPill tone="em_progresso">{perguntas.length} criterios</StatusPill>
            <StatusPill tone="print">
              {ehNecessidade ? "jornada" : `${passos.length} passos`}
            </StatusPill>
          </div>
        </div>
      </header>

      {!ehNecessidade && passos.length === 0 ? (
        <div className="rounded-lg border bg-card p-6">
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

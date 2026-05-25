import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import { getProcessoPermissions } from "@/lib/auth/processo-permissions";
import {
  getJornadaById,
  listPassosJornada,
  type PassoComTipo,
} from "@/features/journeys/queries";
import {
  getQuestionarioByCodigo,
  listPerguntas,
  listPerguntasParaTipo,
  getRespostaInstance,
  listItensResposta,
  type PerguntaComCriterio,
} from "@/features/questionnaires/queries";
import { listCriteriosBarreira } from "@/features/catalog/queries";
import { ensureRespostaQuestionario } from "@/features/questionnaires/actions";
import { Button } from "@/components/ui/button";
import QuestionarioForm, { type Bloco } from "./form";
import { SketchFrame } from "@/components/fcinco/sketch-frame";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";

export default async function QuestionarioPage({
  params,
}: {
  params: Promise<{ id: string; jornadaId: string; codigo: string }>;
}) {
  const { id, jornadaId, codigo } = await params;

  const [processo, jornada, template, criteriosBarreira] = await Promise.all([
    getProcesso(id),
    getJornadaById(jornadaId),
    getQuestionarioByCodigo(codigo),
    listCriteriosBarreira(),
  ]);

  if (!processo || !jornada || !template) notFound();
  if (jornada.processo_id !== id) notFound();
  const { canEdit } = await getProcessoPermissions(id);

  // valida aplicabilidade
  const aplicavelKey =
    jornada.tipo_jornada === "individual" ? "jornada_individual" : "jornada_planejada";
  if (template.aplicavel_a !== aplicavelKey && template.aplicavel_a !== "ambas") {
    notFound();
  }

  const passos = await listPassosJornada(jornadaId);

  let resposta = await getRespostaInstance(template.id, jornadaId);
  let respostaId: string;
  if (!resposta) {
    respostaId = await ensureRespostaQuestionario(template.id, jornadaId);
    resposta = await getRespostaInstance(template.id, jornadaId);
  } else {
    respostaId = resposta.id;
  }
  const itens = await listItensResposta(respostaId);

  // ------------------------------------------------------------
  // Monta os blocos do formulário conforme a dimensão do questionário.
  //
  // - necessidade: 1 bloco "jornada" (passo_jornada_id = null), mesma
  //   pergunta única (Necessidade) — não filtra por tipo.
  // - barreira: 1 bloco por passo, perguntas filtradas pelo tipo do
  //   passo via `tipo_criterio`. Passo sem tipo classificado vira bloco
  //   com `classificado: false` e perguntas=[] — UI mostra warning.
  // - impacto (Carga Cognitiva / Emoção / Consequência): mesmas 3
  //   perguntas em TODOS os passos (universal, não filtra por tipo).
  // ------------------------------------------------------------
  const ehNecessidade = template.dimensao === "necessidade";
  const ehBarreira = template.dimensao === "barreira";

  let blocos: Bloco[];
  let passosSemClassificacao = 0;

  if (ehNecessidade) {
    const perguntas = await listPerguntas(template.id);
    blocos = [
      {
        kind: "necessidade",
        passo: null,
        perguntas,
        classificado: true,
      },
    ];
  } else if (ehBarreira) {
    blocos = await Promise.all(
      passos.map(async (passo): Promise<Bloco> => {
        if (!passo.tipo_comportamento_id) {
          passosSemClassificacao++;
          return {
            kind: "barreira",
            passo,
            perguntas: [],
            classificado: false,
          };
        }
        const perguntas = await listPerguntasParaTipo(
          template.id,
          passo.tipo_comportamento_id,
        );
        return {
          kind: "barreira",
          passo,
          perguntas,
          classificado: true,
        };
      }),
    );
  } else {
    // impacto (Carga Cognitiva, Emoção, Conseqüência)
    const perguntas = await listPerguntas(template.id);
    blocos = passos.map((passo): Bloco => {
      return {
        kind: "impacto",
        passo,
        perguntas,
        classificado: !!passo.tipo_comportamento_id,
      };
    });
  }

  const totalPerguntas = blocos.reduce((acc, b) => acc + b.perguntas.length, 0);

  const voltarHref =
    jornada.tipo_jornada === "individual"
      ? `/processos/${id}/jornadas-individuais/${jornadaId}`
      : `/processos/${id}/jornada-planejada`;

  // Textos explicativos conforme o código do questionário
  let textoNotaMin = "Muito Baixo";
  let textoNotaMax = "Muito Alto";

  if (codigo === "carga_cognitiva") {
    textoNotaMin = "Sem Esforço";
    textoNotaMax = "Esforço Extremo";
  } else if (codigo === "impacto_emocional") {
    textoNotaMin = "Positivo / Neutro";
    textoNotaMax = "Frustração Extrema";
  } else if (codigo === "consequencias") {
    textoNotaMin = "Impacto Mínimo";
    textoNotaMax = "Impacto Severo";
  } else if (codigo === "necessidade") {
    textoNotaMin = "Sem Utilidade";
    textoNotaMax = "Indispensável";
  }

  const semPassos = !ehNecessidade && passos.length === 0;

  return (
    <div className="flex flex-col gap-6 pb-12">
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
              className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              ← {processo.nome}
            </Link>
            <div className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              etapa 05 de 06 · questionário
            </div>
            <div className="mt-4">
              <SketchFrame seed={9} padX={22} padY={10}>
                <span className="font-hand text-3xl leading-tight sm:text-4xl">
                  {template.nome}
                </span>
              </SketchFrame>
            </div>
            <SketchUnderline width={210} variant="long" color="hsl(var(--accent))" />
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              {template.descricao}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {resposta?.concluido && (
              <StatusPill tone="concluido">concluido</StatusPill>
            )}
            <StatusPill tone="em_progresso">
              {ehBarreira
                ? `${totalPerguntas} perguntas no total`
                : `${blocos[0]?.perguntas.length ?? 0} criterios`}
            </StatusPill>
            <StatusPill tone="print">
              {ehNecessidade ? "jornada" : `${passos.length} passos`}
            </StatusPill>
            {passosSemClassificacao > 0 && (
              <StatusPill tone="pendente">
                {passosSemClassificacao} sem classificacao
              </StatusPill>
            )}
            {!canEdit && <StatusPill tone="pendente">somente leitura</StatusPill>}
          </div>
        </div>
      </header>

      {semPassos ? (
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Esta jornada ainda não tem passos cadastrados — não dá para
            responder o questionário sem etapas. Adicione passos primeiro.
          </p>
          <div className="mt-3">
            <Link href={voltarHref}>
              <Button variant="outline" size="sm">
                Voltar para a jornada
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <QuestionarioForm
          respostaId={respostaId}
          blocos={blocos}
          itensIniciais={itens}
          concluido={resposta?.concluido ?? false}
          canEdit={canEdit}
          textoNotaMin={textoNotaMin}
          textoNotaMax={textoNotaMax}
          voltarHref={voltarHref}
          passosSemClassificacao={passosSemClassificacao}
          templateId={template.id}
          criteriosBarreira={criteriosBarreira}
        />
      )}
    </div>
  );
}

// Re-exporta para outros pontos que importem o page como módulo.
export type { Bloco, PerguntaComCriterio };

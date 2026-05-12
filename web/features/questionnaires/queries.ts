import { createClient } from "@/lib/supabase/server";
import type {
  QuestionarioTemplate,
  PerguntaTemplate,
  QuestionarioResposta,
  RespostaItem,
  CriterioTemplate,
} from "@/types/database";

export async function listQuestionariosAplicaveis(
  tipoJornada: "planejada" | "individual" | "padrao",
): Promise<QuestionarioTemplate[]> {
  const supabase = await createClient();
  // jornada padrão usa os mesmos questionários da planejada
  const aplicavelKey = tipoJornada === "individual" ? "jornada_individual" : "jornada_planejada";
  const { data, error } = await supabase
    .from("questionario_template")
    .select("*")
    .in("aplicavel_a", [aplicavelKey, "ambas"])
    .eq("ativo", true)
    .order("dimensao");
  if (error) throw error;
  return (data ?? []) as QuestionarioTemplate[];
}

export async function getQuestionarioByCodigo(
  codigo: string,
): Promise<QuestionarioTemplate | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("questionario_template")
    .select("*")
    .eq("codigo", codigo)
    .eq("ativo", true)
    .order("versao", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data as QuestionarioTemplate) ?? null;
}

export type PerguntaComCriterio = PerguntaTemplate & {
  criterio: CriterioTemplate | null;
};

export async function listPerguntas(
  questionarioTemplateId: string,
): Promise<PerguntaComCriterio[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pergunta_template")
    .select("*, criterio:criterio_template_id (*)")
    .eq("questionario_template_id", questionarioTemplateId)
    .order("ordem");
  if (error) throw error;
  return (data ?? []) as unknown as PerguntaComCriterio[];
}

/**
 * Lista as perguntas de um questionário de **barreiras** que se aplicam a
 * UM tipo de comportamento específico — via a junção `tipo_criterio`.
 *
 * Espelha a lógica do Streamlit original
 * (`pages/3_Dimensionamento_Barreiras.py` linhas 89-122) que filtra
 * `df_conceitos` pelo par (Categoria, Tipo) do passo. Aqui usamos a
 * junção populada pela seed `0001_seed_catalog_f5.sql`.
 *
 * Para passo SEM `tipo_comportamento_id` retorna lista vazia — a UI
 * deve mostrar aviso "classifique o passo antes de dimensionar", em vez
 * de oferecer perguntas que não fazem sentido para aquele comportamento.
 *
 * NÃO usar para questionários de **impacto** (Carga Cognitiva/Emoção/
 * Consequência) ou **necessidade** — esses são universais, use
 * `listPerguntas`.
 */
export async function listPerguntasParaTipo(
  questionarioTemplateId: string,
  tipoComportamentoId: string | null,
): Promise<PerguntaComCriterio[]> {
  if (!tipoComportamentoId) return [];

  const supabase = await createClient();

  // 1. Quais critérios-B se aplicam a este tipo (e qual ordem)?
  const { data: vinculos, error: errVinc } = await supabase
    .from("tipo_criterio")
    .select("criterio_template_id, ordem")
    .eq("tipo_comportamento_id", tipoComportamentoId);
  if (errVinc) throw errVinc;
  if (!vinculos || vinculos.length === 0) return [];

  const criterioIds = vinculos.map(
    (v) => v.criterio_template_id as string,
  );
  const ordemPorCriterio = new Map<string, number>(
    vinculos.map((v) => [
      v.criterio_template_id as string,
      (v.ordem as number | null) ?? 999,
    ]),
  );

  // 2. Perguntas do template restritas a esses critérios.
  const { data: perguntas, error: errP } = await supabase
    .from("pergunta_template")
    .select("*, criterio:criterio_template_id (*)")
    .eq("questionario_template_id", questionarioTemplateId)
    .in("criterio_template_id", criterioIds);
  if (errP) throw errP;
  if (!perguntas) return [];

  // 3. Ordena pela ordem na junção tipo_criterio (a sequência metodológica
  // dos critérios DEPENDE do tipo — não pela ordem global do template).
  const lista = perguntas as unknown as PerguntaComCriterio[];
  lista.sort((a, b) => {
    const oa = ordemPorCriterio.get(a.criterio_template_id as string) ?? 999;
    const ob = ordemPorCriterio.get(b.criterio_template_id as string) ?? 999;
    return oa - ob;
  });
  return lista;
}

export async function getRespostaInstance(
  questionarioTemplateId: string,
  jornadaId: string,
): Promise<QuestionarioResposta | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("questionario_resposta")
    .select("*")
    .eq("questionario_template_id", questionarioTemplateId)
    .eq("jornada_id", jornadaId)
    .maybeSingle();
  if (error) throw error;
  return (data as QuestionarioResposta) ?? null;
}

export async function listItensResposta(
  respostaId: string,
): Promise<RespostaItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resposta_item")
    .select("*")
    .eq("questionario_resposta_id", respostaId);
  if (error) throw error;
  return (data ?? []) as RespostaItem[];
}

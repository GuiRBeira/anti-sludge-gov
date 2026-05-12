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

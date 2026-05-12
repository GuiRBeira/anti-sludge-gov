"use server";

import { createClient } from "@/lib/supabase/server";
import { getSessionOrRedirect } from "@/lib/auth/session";
import { assertCanEditProcesso } from "@/lib/auth/processo-permissions";
import {
  itemRespostaSchema,
  type ItemRespostaInput,
} from "@/lib/validators/questionnaires";
import { revalidatePath } from "next/cache";

async function processoDaJornada(jornadaId: string): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jornada")
    .select("processo_id")
    .eq("id", jornadaId)
    .single();
  if (error) throw error;
  return data.processo_id as string;
}

async function processoDaResposta(respostaId: string): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("questionario_resposta")
    .select("jornada:jornada_id (processo_id)")
    .eq("id", respostaId)
    .single();
  if (error) throw error;
  const j = data.jornada as { processo_id?: string } | null;
  if (!j?.processo_id) throw new Error("Resposta sem jornada vinculada.");
  return j.processo_id;
}

/**
 * Garante uma instância de resposta do questionário para a jornada e retorna
 * o id. Idempotente — respeita o unique(questionario_template_id, jornada_id).
 */
export async function ensureRespostaQuestionario(
  questionarioTemplateId: string,
  jornadaId: string,
): Promise<string> {
  const ctx = await getSessionOrRedirect();
  await assertCanEditProcesso(await processoDaJornada(jornadaId));
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("questionario_resposta")
    .select("id")
    .eq("questionario_template_id", questionarioTemplateId)
    .eq("jornada_id", jornadaId)
    .maybeSingle();
  if (existing) return existing.id as string;

  const { data, error } = await supabase
    .from("questionario_resposta")
    .insert({
      questionario_template_id: questionarioTemplateId,
      jornada_id: jornadaId,
      respondente_id: ctx.userId,
    })
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
}

/**
 * Cria ou atualiza um item de resposta. Identidade lógica:
 * (questionario_resposta_id, pergunta_template_id, passo_jornada_id).
 * `passo_jornada_id = null` é usado para perguntas de Necessidade.
 */
export async function upsertItemResposta(
  input: ItemRespostaInput,
): Promise<void> {
  await getSessionOrRedirect();
  const parsed = itemRespostaSchema.parse(input);
  await assertCanEditProcesso(
    await processoDaResposta(parsed.questionario_resposta_id),
  );
  const supabase = await createClient();

  // Para upsert manual quando passo_jornada_id pode ser NULL (que não casa
  // bem com unique constraint padrão do Postgres em todos os casos),
  // fazemos lookup primeiro e decidimos insert vs update.
  const baseQuery = supabase
    .from("resposta_item")
    .select("id")
    .eq("questionario_resposta_id", parsed.questionario_resposta_id)
    .eq("pergunta_template_id", parsed.pergunta_template_id);

  const lookup =
    parsed.passo_jornada_id === null
      ? baseQuery.is("passo_jornada_id", null)
      : baseQuery.eq("passo_jornada_id", parsed.passo_jornada_id);

  const { data: existing } = await lookup.maybeSingle();

  const payload = {
    questionario_resposta_id: parsed.questionario_resposta_id,
    pergunta_template_id: parsed.pergunta_template_id,
    passo_jornada_id: parsed.passo_jornada_id,
    nota: parsed.nao_se_aplica ? null : parsed.nota,
    nao_se_aplica: parsed.nao_se_aplica,
    observacao_discursiva: parsed.observacao_discursiva,
  };

  if (existing) {
    const { error } = await supabase
      .from("resposta_item")
      .update(payload)
      .eq("id", existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("resposta_item").insert(payload);
    if (error) throw error;
  }

  // Revalidar página da jornada
  const { data: qr } = await supabase
    .from("questionario_resposta")
    .select("jornada_id, jornada:jornada_id (processo_id, tipo_jornada)")
    .eq("id", parsed.questionario_resposta_id)
    .single();
  const jornada = qr?.jornada as
    | { processo_id?: string; tipo_jornada?: string }
    | null;
  if (jornada?.processo_id) {
    revalidatePath(`/processos/${jornada.processo_id}`);
    revalidatePath(`/processos/${jornada.processo_id}/resultados`);
  }
}

export async function concluirQuestionario(respostaId: string): Promise<void> {
  await getSessionOrRedirect();
  await assertCanEditProcesso(await processoDaResposta(respostaId));
  const supabase = await createClient();
  const { error } = await supabase
    .from("questionario_resposta")
    .update({ concluido: true })
    .eq("id", respostaId);
  if (error) throw error;

  const { data: qr } = await supabase
    .from("questionario_resposta")
    .select("jornada:jornada_id (processo_id)")
    .eq("id", respostaId)
    .single();
  const processoId = (qr?.jornada as { processo_id?: string } | null)?.processo_id;
  if (processoId) {
    revalidatePath(`/processos/${processoId}`);
    revalidatePath(`/processos/${processoId}/resultados`);
  }
}

export async function reabrirQuestionario(respostaId: string): Promise<void> {
  await getSessionOrRedirect();
  await assertCanEditProcesso(await processoDaResposta(respostaId));
  const supabase = await createClient();
  const { error } = await supabase
    .from("questionario_resposta")
    .update({ concluido: false })
    .eq("id", respostaId);
  if (error) throw error;
}

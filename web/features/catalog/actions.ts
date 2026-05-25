"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { getSessionOrRedirect } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

/**
 * Creates a new behavior type (tipo_comportamento) inside a category.
 */
export async function criarTipoComportamento(input: {
  categoriaId: string;
  nome: string;
  conceito?: string;
  descricao?: string;
}) {
  await getSessionOrRedirect();
  const adminClient = createAdminClient();

  // 1. Get max order for this category to ensure uniqueness
  const { data: maxOrdemData, error: maxOrdemError } = await adminClient
    .from("tipo_comportamento")
    .select("ordem")
    .eq("categoria_id", input.categoriaId)
    .order("ordem", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (maxOrdemError) throw maxOrdemError;
  const proximaOrdem = (maxOrdemData?.ordem ?? 0) + 1;

  // 2. Generate a unique uppercase code (codigo)
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  const normalizedNome = input.nome
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "_")
    .toUpperCase();
  const codigo = `CUSTOM_${normalizedNome.slice(0, 20)}_${randomSuffix}`;

  // 3. Insert the new behavior record
  const { data: newBehavior, error: insertError } = await adminClient
    .from("tipo_comportamento")
    .insert({
      categoria_id: input.categoriaId,
      codigo,
      nome: input.nome.trim(),
      conceito: input.conceito?.trim() || null,
      descricao: input.descricao?.trim() || null,
      ordem: proximaOrdem,
    })
    .select("id, nome")
    .single();

  if (insertError) throw insertError;

  revalidatePath("/", "layout");
  return newBehavior;
}

/**
 * Links an existing barrier criterion (criterio_template) to a behavior (tipo_comportamento),
 * and ensures a corresponding question template exists in the current questionnaire.
 */
export async function associarCriterioExistente(input: {
  tipoComportamentoId: string;
  criterioTemplateId: string;
  questionarioTemplateId: string;
}) {
  await getSessionOrRedirect();
  const adminClient = createAdminClient();

  // 1. Find the next order in tipo_criterio for this behavior
  const { data: maxOrdemData, error: maxOrdemError } = await adminClient
    .from("tipo_criterio")
    .select("ordem")
    .eq("tipo_comportamento_id", input.tipoComportamentoId)
    .order("ordem", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (maxOrdemError) throw maxOrdemError;
  const proximaOrdem = (maxOrdemData?.ordem ?? 0) + 1;

  // 2. Link behavior and criterion (upsert ignores conflict if already linked)
  const { error: linkError } = await adminClient
    .from("tipo_criterio")
    .upsert(
      {
        tipo_comportamento_id: input.tipoComportamentoId,
        criterio_template_id: input.criterioTemplateId,
        ordem: proximaOrdem,
      },
      {
        onConflict: "tipo_comportamento_id,criterio_template_id",
      }
    );

  if (linkError) throw linkError;

  // 3. Ensure a question template exists for this criterion in the current questionnaire template
  const { data: existingPergunta, error: getPerguntaError } = await adminClient
    .from("pergunta_template")
    .select("id")
    .eq("questionario_template_id", input.questionarioTemplateId)
    .eq("criterio_template_id", input.criterioTemplateId)
    .maybeSingle();

  if (getPerguntaError) throw getPerguntaError;

  if (!existingPergunta) {
    // Get the criterion's default question text
    const { data: criterio, error: getCriterioError } = await adminClient
      .from("criterio_template")
      .select("pergunta_padrao")
      .eq("id", input.criterioTemplateId)
      .single();

    if (getCriterioError) throw getCriterioError;

    // Get max order in pergunta_template for this questionnaire
    const { data: maxPOrdemData, error: maxPOrdemError } = await adminClient
      .from("pergunta_template")
      .select("ordem")
      .eq("questionario_template_id", input.questionarioTemplateId)
      .order("ordem", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (maxPOrdemError) throw maxPOrdemError;
    const proximaPOrdem = (maxPOrdemData?.ordem ?? 0) + 1;

    const { error: createPError } = await adminClient
      .from("pergunta_template")
      .insert({
        questionario_template_id: input.questionarioTemplateId,
        criterio_template_id: input.criterioTemplateId,
        texto: criterio.pergunta_padrao,
        ordem: proximaPOrdem,
        tipo_resposta: "escala_1_5",
        permite_nao_se_aplica: true,
        permite_observacao: true,
      });

    if (createPError) throw createPError;
  }

  revalidatePath("/", "layout");
}

/**
 * Creates a brand new barrier criterion and links it to the behavior,
 * adding the corresponding question to the current questionnaire template.
 */
export async function criarPerguntaeCriterioNovo(input: {
  tipoComportamentoId: string;
  questionarioTemplateId: string;
  nomeCriterio: string;
  textoPergunta: string;
}) {
  await getSessionOrRedirect();
  const adminClient = createAdminClient();

  // 1. Create a new criterion (criterio_template)
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  const normalizedNome = input.nomeCriterio
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "_")
    .toUpperCase();
  const criterioCodigo = `CRIT_CUSTOM_${normalizedNome.slice(0, 20)}_${randomSuffix}`;

  const { data: newCriterio, error: critError } = await adminClient
    .from("criterio_template")
    .insert({
      codigo: criterioCodigo,
      nome: input.nomeCriterio.trim(),
      dimensao: "barreira",
      pergunta_padrao: input.textoPergunta.trim(),
      ativo: true,
    })
    .select("id")
    .single();

  if (critError) throw critError;

  // 2. Link it in tipo_criterio
  const { data: maxOrdemData, error: maxOrdemError } = await adminClient
    .from("tipo_criterio")
    .select("ordem")
    .eq("tipo_comportamento_id", input.tipoComportamentoId)
    .order("ordem", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (maxOrdemError) throw maxOrdemError;
  const proximaOrdem = (maxOrdemData?.ordem ?? 0) + 1;

  const { error: linkError } = await adminClient
    .from("tipo_criterio")
    .insert({
      tipo_comportamento_id: input.tipoComportamentoId,
      criterio_template_id: newCriterio.id,
      ordem: proximaOrdem,
    });

  if (linkError) throw linkError;

  // 3. Create the question (pergunta_template) in the current questionnaire
  const { data: maxPOrdemData, error: maxPOrdemError } = await adminClient
    .from("pergunta_template")
    .select("ordem")
    .eq("questionario_template_id", input.questionarioTemplateId)
    .order("ordem", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (maxPOrdemError) throw maxPOrdemError;
  const proximaPOrdem = (maxPOrdemData?.ordem ?? 0) + 1;

  const { error: createPError } = await adminClient
    .from("pergunta_template")
    .insert({
      questionario_template_id: input.questionarioTemplateId,
      criterio_template_id: newCriterio.id,
      texto: input.textoPergunta.trim(),
      ordem: proximaPOrdem,
      tipo_resposta: "escala_1_5",
      permite_nao_se_aplica: true,
      permite_observacao: true,
    });

  if (createPError) throw createPError;

  revalidatePath("/", "layout");
}

/**
 * Dissociates a barrier criterion from a behavior.
 */
export async function desassociarCriterio(input: {
  tipoComportamentoId: string;
  criterioTemplateId: string;
}) {
  await getSessionOrRedirect();
  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from("tipo_criterio")
    .delete()
    .eq("tipo_comportamento_id", input.tipoComportamentoId)
    .eq("criterio_template_id", input.criterioTemplateId);

  if (error) throw error;

  revalidatePath("/", "layout");
}

/**
 * Associates an existing barrier criterion to a behavior, and creates/updates
 * the question template in the questionnaire template with custom text.
 */
export async function associarCriterioComPerguntaCustomizada(input: {
  tipoComportamentoId: string;
  criterioTemplateId: string;
  questionarioTemplateId: string;
  textoPergunta: string;
}) {
  await getSessionOrRedirect();
  const adminClient = createAdminClient();

  // 1. Link behavior and criterion in tipo_criterio (upsert ignores conflict if already linked)
  const { data: maxOrdemData, error: maxOrdemError } = await adminClient
    .from("tipo_criterio")
    .select("ordem")
    .eq("tipo_comportamento_id", input.tipoComportamentoId)
    .order("ordem", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (maxOrdemError) throw maxOrdemError;
  const proximaOrdem = (maxOrdemData?.ordem ?? 0) + 1;

  const { error: linkError } = await adminClient
    .from("tipo_criterio")
    .upsert(
      {
        tipo_comportamento_id: input.tipoComportamentoId,
        criterio_template_id: input.criterioTemplateId,
        ordem: proximaOrdem,
      },
      {
        onConflict: "tipo_comportamento_id,criterio_template_id",
      }
    );

  if (linkError) throw linkError;

  // 2. Check if a question template exists for this criterion in the current questionnaire template
  const { data: existingPergunta, error: getPerguntaError } = await adminClient
    .from("pergunta_template")
    .select("id")
    .eq("questionario_template_id", input.questionarioTemplateId)
    .eq("criterio_template_id", input.criterioTemplateId)
    .maybeSingle();

  if (getPerguntaError) throw getPerguntaError;

  if (existingPergunta) {
    // Update existing question's text with user's customized text
    const { error: updateError } = await adminClient
      .from("pergunta_template")
      .update({ texto: input.textoPergunta.trim() })
      .eq("id", existingPergunta.id);

    if (updateError) throw updateError;
  } else {
    // Get max order in pergunta_template for this questionnaire
    const { data: maxPOrdemData, error: maxPOrdemError } = await adminClient
      .from("pergunta_template")
      .select("ordem")
      .eq("questionario_template_id", input.questionarioTemplateId)
      .order("ordem", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (maxPOrdemError) throw maxPOrdemError;
    const proximaPOrdem = (maxPOrdemData?.ordem ?? 0) + 1;

    const { error: createPError } = await adminClient
      .from("pergunta_template")
      .insert({
        questionario_template_id: input.questionarioTemplateId,
        criterio_template_id: input.criterioTemplateId,
        texto: input.textoPergunta.trim(),
        ordem: proximaPOrdem,
        tipo_resposta: "escala_1_5",
        permite_nao_se_aplica: true,
        permite_observacao: true,
      });

    if (createPError) throw createPError;
  }

  revalidatePath("/", "layout");
}


"use server";

import { createClient } from "@/lib/supabase/server";
import { getSessionOrRedirect } from "@/lib/auth/session";
import { assertCanEditProcesso } from "@/lib/auth/processo-permissions";
import {
  processoCreateSchema,
  contextoUpdateSchema,
  processoMetaUpdateSchema,
  type ProcessoCreateInput,
  type ContextoUpdateInput,
  type ProcessoMetaUpdateInput,
} from "@/lib/validators/processes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function criarProcesso(input: ProcessoCreateInput) {
  const ctx = await getSessionOrRedirect();
  const parsed = processoCreateSchema.parse(input);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("processo")
    .insert({ ...parsed, created_by: ctx.userId })
    .select("id")
    .single();
  if (error) throw error;

  revalidatePath("/processos");
  redirect(`/processos/${data.id}`);
}

export async function salvarContexto(
  processoId: string,
  input: ContextoUpdateInput,
) {
  await getSessionOrRedirect();
  await assertCanEditProcesso(processoId);
  const parsed = contextoUpdateSchema.parse(input);
  const supabase = await createClient();

  // .select() força o cliente a retornar as linhas afetadas. Combinado com a
  // checagem de array vazio abaixo, transforma um no-op silencioso do RLS
  // (visitante tentando editar) em erro explícito.
  const { data, error } = await supabase
    .from("processo")
    .update(parsed)
    .eq("id", processoId)
    .select("id");
  if (error) throw error;
  if (!data || data.length === 0) {
    throw new Error("Não foi possível salvar — sem permissão para editar este processo.");
  }

  revalidatePath(`/processos/${processoId}`);
}

/**
 * Edita nome + órgão do processo. Acessível para:
 *   - admin global (qualquer processo, qualquer órgão de destino)
 *   - gestor do órgão atual do processo, podendo mover para outro órgão
 *     onde ele também é gestor (não pode mover para órgão "alheio")
 *
 * Analistas e visitantes não podem editar meta — apenas o contexto.
 */
export async function editarProcessoMeta(
  processoId: string,
  input: ProcessoMetaUpdateInput,
) {
  const ctx = await getSessionOrRedirect();
  const parsed = processoMetaUpdateSchema.parse(input);
  const supabase = await createClient();

  const isAdmin = ctx.profile.papel_global === "admin";

  // Busca processo atual pra validar permissão e detectar movimentação.
  const { data: processoAtual, error: selErr } = await supabase
    .from("processo")
    .select("id, orgao_id, nome")
    .eq("id", processoId)
    .maybeSingle();
  if (selErr) throw selErr;
  if (!processoAtual) throw new Error("Processo não encontrado.");

  if (!isAdmin) {
    // Gestor: precisa ser gestor do órgão ATUAL E do órgão DE DESTINO.
    const { data: ehGestorOrigem } = await supabase
      .from("membro_orgao")
      .select("id")
      .eq("profile_id", ctx.userId)
      .eq("orgao_id", processoAtual.orgao_id)
      .eq("papel_no_orgao", "gestor")
      .maybeSingle();
    if (!ehGestorOrigem) {
      throw new Error(
        "Apenas admin ou gestor do órgão atual pode editar a metadata do processo.",
      );
    }
    if (parsed.orgao_id !== processoAtual.orgao_id) {
      const { data: ehGestorDestino } = await supabase
        .from("membro_orgao")
        .select("id")
        .eq("profile_id", ctx.userId)
        .eq("orgao_id", parsed.orgao_id)
        .eq("papel_no_orgao", "gestor")
        .maybeSingle();
      if (!ehGestorDestino) {
        throw new Error(
          "Você só pode mover o processo para órgãos onde você também é gestor.",
        );
      }
    }
  }

  const { data, error } = await supabase
    .from("processo")
    .update({ orgao_id: parsed.orgao_id, nome: parsed.nome })
    .eq("id", processoId)
    .select("id");
  if (error) throw error;
  if (!data || data.length === 0) {
    throw new Error(
      "Não foi possível salvar — sem permissão suficiente para editar a metadata.",
    );
  }

  revalidatePath("/processos");
  revalidatePath(`/processos/${processoId}`);
  revalidatePath(`/processos/${processoId}/editar`);
}

export async function arquivarProcesso(processoId: string) {
  const ctx = await getSessionOrRedirect();
  const supabase = await createClient();

  if (ctx.profile.papel_global !== "admin") {
    const { data: processo } = await supabase
      .from("processo")
      .select("orgao_id")
      .eq("id", processoId)
      .maybeSingle();
    if (!processo) throw new Error("Processo não encontrado");
    const { data: gestor } = await supabase
      .from("membro_orgao")
      .select("id")
      .eq("profile_id", ctx.userId)
      .eq("orgao_id", processo.orgao_id)
      .eq("papel_no_orgao", "gestor")
      .maybeSingle();
    if (!gestor) throw new Error("Apenas admin ou gestor pode apagar processo");
  }

  const { error } = await supabase
    .from("processo")
    .update({ arquivado: true })
    .eq("id", processoId);
  if (error) throw error;

  revalidatePath("/processos");
}

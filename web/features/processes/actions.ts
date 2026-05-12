"use server";

import { createClient } from "@/lib/supabase/server";
import { getSessionOrRedirect } from "@/lib/auth/session";
import {
  processoCreateSchema,
  contextoUpdateSchema,
  type ProcessoCreateInput,
  type ContextoUpdateInput,
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
  const parsed = contextoUpdateSchema.parse(input);
  const supabase = await createClient();

  const { error } = await supabase
    .from("processo")
    .update(parsed)
    .eq("id", processoId);
  if (error) throw error;

  revalidatePath(`/processos/${processoId}`);
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

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
  await getSessionOrRedirect();
  const supabase = await createClient();
  const { error } = await supabase
    .from("processo")
    .update({ arquivado: true })
    .eq("id", processoId);
  if (error) throw error;

  revalidatePath("/processos");
}

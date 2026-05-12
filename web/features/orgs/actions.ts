"use server";

import { createClient } from "@/lib/supabase/server";
import { getSessionOrRedirect, requireRole } from "@/lib/auth/session";
import { orgaoCreateSchema, type OrgaoCreateInput } from "@/lib/validators/orgs";
import { revalidatePath } from "next/cache";

export async function criarOrgao(input: OrgaoCreateInput) {
  const ctx = await getSessionOrRedirect();
  requireRole(ctx, ["admin"]);

  const parsed = orgaoCreateSchema.parse(input);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orgao")
    .insert(parsed)
    .select("*")
    .single();
  if (error) throw error;

  revalidatePath("/admin/orgaos");
  return data;
}

export async function adicionarMembro(input: {
  orgao_id: string;
  profile_id: string;
  papel_no_orgao: "gestor" | "analista";
}) {
  await getSessionOrRedirect();
  const supabase = await createClient();
  const { error } = await supabase.from("membro_orgao").insert(input);
  if (error) throw error;

  revalidatePath(`/admin/orgaos/${input.orgao_id}`);
}

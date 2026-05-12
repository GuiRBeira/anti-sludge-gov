"use server";

import { createClient } from "@/lib/supabase/server";
import { getSessionOrRedirect, requireRole } from "@/lib/auth/session";
import { orgaoCreateSchema, type OrgaoCreateInput } from "@/lib/validators/orgs";
import { revalidatePath } from "next/cache";
import type { PapelGlobal, PapelNoOrgao } from "@/types/database";

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

const papeisGlobais: PapelGlobal[] = ["admin", "gestor", "analista", "visitante"];
const papeisOrgao: PapelNoOrgao[] = ["gestor", "analista"];

function requireAdminProfile(papel: string): asserts papel is PapelGlobal {
  if (!papeisGlobais.includes(papel as PapelGlobal)) {
    throw new Error("Papel global inválido");
  }
}

function requirePapelOrgao(papel: string): asserts papel is PapelNoOrgao {
  if (!papeisOrgao.includes(papel as PapelNoOrgao)) {
    throw new Error("Papel no órgão inválido");
  }
}

export async function atualizarPapelGlobal(formData: FormData) {
  const ctx = await getSessionOrRedirect();
  requireRole(ctx, ["admin"]);

  const profileId = String(formData.get("profile_id") ?? "");
  const papel = String(formData.get("papel_global") ?? "");
  requireAdminProfile(papel);
  if (!profileId) throw new Error("Usuário inválido");

  const supabase = await createClient();
  const { error } = await supabase
    .from("profile")
    .update({ papel_global: papel })
    .eq("id", profileId);
  if (error) throw error;

  revalidatePath("/admin/usuarios");
}

export async function definirMembroOrgao(formData: FormData) {
  const ctx = await getSessionOrRedirect();
  const profileId = String(formData.get("profile_id") ?? "");
  const orgaoId = String(formData.get("orgao_id") ?? "");
  const papel = String(formData.get("papel_no_orgao") ?? "");
  requirePapelOrgao(papel);
  if (!profileId || !orgaoId) throw new Error("Usuário ou órgão inválido");

  if (ctx.profile.papel_global !== "admin") {
    if (papel !== "analista") {
      throw new Error("Gestores só podem atribuir analistas");
    }
    const supabaseCheck = await createClient();
    const { data: gestor } = await supabaseCheck
      .from("membro_orgao")
      .select("id")
      .eq("profile_id", ctx.userId)
      .eq("orgao_id", orgaoId)
      .eq("papel_no_orgao", "gestor")
      .maybeSingle();
    if (!gestor) throw new Error("Você não é gestor deste órgão");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("membro_orgao").upsert(
    {
      profile_id: profileId,
      orgao_id: orgaoId,
      papel_no_orgao: papel,
    },
    { onConflict: "profile_id,orgao_id" },
  );
  if (error) throw error;

  revalidatePath("/admin/usuarios");
}

export async function removerMembroOrgao(formData: FormData) {
  const ctx = await getSessionOrRedirect();
  const membroId = String(formData.get("membro_id") ?? "");
  if (!membroId) throw new Error("Vínculo inválido");

  const supabase = await createClient();
  if (ctx.profile.papel_global !== "admin") {
    const { data: membro } = await supabase
      .from("membro_orgao")
      .select("orgao_id, papel_no_orgao")
      .eq("id", membroId)
      .maybeSingle();
    if (!membro || membro.papel_no_orgao !== "analista") {
      throw new Error("Gestores só removem analistas do próprio órgão");
    }
    const { data: gestor } = await supabase
      .from("membro_orgao")
      .select("id")
      .eq("profile_id", ctx.userId)
      .eq("orgao_id", membro.orgao_id)
      .eq("papel_no_orgao", "gestor")
      .maybeSingle();
    if (!gestor) throw new Error("Você não é gestor deste órgão");
  }

  const { error } = await supabase.from("membro_orgao").delete().eq("id", membroId);
  if (error) throw error;

  revalidatePath("/admin/usuarios");
}

export async function atribuirProcessoVisitante(formData: FormData) {
  await getSessionOrRedirect();

  const profileId = String(formData.get("profile_id") ?? "");
  const processoId = String(formData.get("processo_id") ?? "");
  if (!profileId || !processoId) throw new Error("Usuário ou processo inválido");

  const supabase = await createClient();
  const { error } = await supabase.from("processo_permissao").upsert(
    {
      profile_id: profileId,
      processo_id: processoId,
      pode_editar: false,
    },
    { onConflict: "profile_id,processo_id" },
  );
  if (error) throw error;

  revalidatePath("/admin/usuarios");
}

export async function removerPermissaoProcesso(formData: FormData) {
  await getSessionOrRedirect();

  const permissaoId = String(formData.get("permissao_id") ?? "");
  if (!permissaoId) throw new Error("Permissão inválida");

  const supabase = await createClient();
  const { error } = await supabase
    .from("processo_permissao")
    .delete()
    .eq("id", permissaoId);
  if (error) throw error;

  revalidatePath("/admin/usuarios");
}

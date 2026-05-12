import { createClient } from "@/lib/supabase/server";
import type { Orgao } from "@/types/database";

export async function listOrgaos(): Promise<Orgao[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orgao")
    .select("*")
    .order("nome", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Orgao[];
}

export async function getOrgao(id: string): Promise<Orgao | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orgao")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as Orgao) ?? null;
}

export type MembroOrgaoComOrgao = {
  orgao_id: string;
  papel_no_orgao: "gestor" | "analista";
  orgao: Orgao;
};

export async function listMyOrgaos(): Promise<MembroOrgaoComOrgao[]> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from("membro_orgao")
    .select("orgao_id, papel_no_orgao, orgao:orgao_id (*)")
    .eq("profile_id", userData.user.id);
  if (error) throw error;
  return (data ?? []) as unknown as MembroOrgaoComOrgao[];
}

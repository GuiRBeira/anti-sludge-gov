import { createClient } from "@/lib/supabase/server";
import type { Processo, Orgao } from "@/types/database";

export type ProcessoComOrgao = Processo & { orgao: Orgao };

export async function listProcessos(): Promise<ProcessoComOrgao[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("processo")
    .select("*, orgao:orgao_id (*)")
    .eq("arquivado", false)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as ProcessoComOrgao[];
}

export async function getProcesso(id: string): Promise<ProcessoComOrgao | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("processo")
    .select("*, orgao:orgao_id (*)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as unknown as ProcessoComOrgao) ?? null;
}

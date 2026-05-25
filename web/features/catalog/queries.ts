import { createClient } from "@/lib/supabase/server";
import type { CriterioTemplate } from "@/types/database";

/**
 * Lists all active barrier criteria from the database.
 */
export async function listCriteriosBarreira(): Promise<CriterioTemplate[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("criterio_template")
    .select("*")
    .eq("dimensao", "barreira")
    .eq("ativo", true)
    .order("nome");

  if (error) throw error;
  return (data ?? []) as CriterioTemplate[];
}

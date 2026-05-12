import { createClient } from "@/lib/supabase/server";
import type { Participante } from "@/types/database";

export async function listParticipantes(
  processoId: string,
): Promise<Participante[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("participante")
    .select("*")
    .eq("processo_id", processoId)
    .order("codigo", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Participante[];
}

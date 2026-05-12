import { createClient } from "@/lib/supabase/server";
import type {
  Jornada,
  PassoJornada,
  TipoComportamento,
  Categoria,
  Participante,
} from "@/types/database";

export async function getJornadaPlanejada(
  processoId: string,
): Promise<Jornada | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jornada")
    .select("*")
    .eq("processo_id", processoId)
    .eq("tipo_jornada", "planejada")
    .maybeSingle();
  if (error) throw error;
  return (data as Jornada) ?? null;
}

export async function getJornadaPadrao(
  processoId: string,
): Promise<Jornada | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jornada")
    .select("*")
    .eq("processo_id", processoId)
    .eq("tipo_jornada", "padrao")
    .maybeSingle();
  if (error) throw error;
  return (data as Jornada) ?? null;
}

export async function getJornadaById(jornadaId: string): Promise<Jornada | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jornada")
    .select("*")
    .eq("id", jornadaId)
    .maybeSingle();
  if (error) throw error;
  return (data as Jornada) ?? null;
}

export type JornadaIndividualComParticipante = Jornada & {
  participante: Participante | null;
};

export async function listJornadasIndividuais(
  processoId: string,
): Promise<JornadaIndividualComParticipante[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jornada")
    .select("*, participante:participante_id (*)")
    .eq("processo_id", processoId)
    .eq("tipo_jornada", "individual")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as JornadaIndividualComParticipante[];
}

export type PassoComTipo = PassoJornada & {
  tipo_comportamento: (TipoComportamento & { categoria: Categoria }) | null;
};

export async function listPassosJornada(
  jornadaId: string,
): Promise<PassoComTipo[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("passo_jornada")
    .select("*, tipo_comportamento:tipo_comportamento_id (*, categoria:categoria_id (*))")
    .eq("jornada_id", jornadaId)
    .order("ordem", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as PassoComTipo[];
}

export type TipoComCategoria = TipoComportamento & { categoria: Categoria };

export async function listTiposComportamento(): Promise<TipoComCategoria[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tipo_comportamento")
    .select("*, categoria:categoria_id (*)")
    .order("ordem", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as TipoComCategoria[];
}

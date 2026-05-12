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

/**
 * Lista os tipos de comportamento ordenados pela ordem da categoria
 * (BUSCA_E_ACESSO antes de PREPARACAO_E_ENTREGA antes de INTERACAO etc.)
 * e, dentro de cada categoria, pela ordem definida na planilha F5.
 *
 * Antes ordenávamos só por `tipo_comportamento.ordem`, que é único só
 * dentro da categoria — o resultado era um intercalado bizarro
 * ("Procurar site"(1), "Preencher"(1), "Verificar elegibilidade"(3)...).
 * A professora Janaina reclamou disso no teste.
 */
export async function listTiposComportamento(): Promise<TipoComCategoria[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tipo_comportamento")
    .select("*, categoria:categoria_id (*)");
  if (error) throw error;
  const rows = (data ?? []) as unknown as TipoComCategoria[];
  rows.sort((a, b) => {
    const ca = a.categoria?.ordem ?? 999;
    const cb = b.categoria?.ordem ?? 999;
    if (ca !== cb) return ca - cb;
    return (a.ordem ?? 0) - (b.ordem ?? 0);
  });
  return rows;
}

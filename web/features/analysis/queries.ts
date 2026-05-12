import { createClient } from "@/lib/supabase/server";
import type { CriterioTemplate, SubdimensaoImpacto, TipoJornada } from "@/types/database";

export type MediaPorCriterio = {
  criterio_id: string;
  criterio_nome: string;
  dimensao: "barreira" | "impacto";
  subdimensao: SubdimensaoImpacto | null;
  media: number | null;
  qtd_respostas: number;
};

export type TempoPassoAgregado = {
  jornada_id: string;
  jornada_label: string;
  tipo_jornada: TipoJornada;
  ordem: number;
  descricao: string | null;
  tempo_segundos: number | null;
};

/**
 * Calcula a média por critério para um processo, considerando todas as
 * respostas existentes (de todas as jornadas filhas). Respostas com
 * nao_se_aplica = true são ignoradas no cálculo.
 *
 * Filtros opcionais:
 *  - tipoJornada: limitar a planejada/individual/padrão
 *  - jornadaId: limitar a uma jornada específica
 */
export async function mediasPorCriterio(
  processoId: string,
  options?: { tipoJornada?: TipoJornada; jornadaId?: string },
): Promise<MediaPorCriterio[]> {
  const supabase = await createClient();

  // Buscar IDs de jornadas do processo (com filtro opcional)
  let jornQuery = supabase
    .from("jornada")
    .select("id")
    .eq("processo_id", processoId);
  if (options?.tipoJornada) jornQuery = jornQuery.eq("tipo_jornada", options.tipoJornada);
  if (options?.jornadaId) jornQuery = jornQuery.eq("id", options.jornadaId);

  const { data: jornadas } = await jornQuery;
  const jornadaIds = (jornadas ?? []).map((j) => j.id as string);
  if (jornadaIds.length === 0) {
    // Retorna entradas vazias para todos os critérios (gráfico mostra "sem dado")
    return await criteriosVazios();
  }

  const { data: respostas } = await supabase
    .from("questionario_resposta")
    .select("id")
    .in("jornada_id", jornadaIds);
  const respostaIds = (respostas ?? []).map((r) => r.id as string);
  if (respostaIds.length === 0) return await criteriosVazios();

  const { data: itens } = await supabase
    .from("resposta_item")
    .select("nota, nao_se_aplica, pergunta:pergunta_template_id (criterio_template_id)")
    .in("questionario_resposta_id", respostaIds);

  type ItemSlim = {
    nota: number | null;
    nao_se_aplica: boolean;
    pergunta: { criterio_template_id: string | null } | null;
  };
  const items = (itens ?? []) as unknown as ItemSlim[];

  // Agrupar por critério
  const acc = new Map<string, { soma: number; qtd: number }>();
  for (const it of items) {
    const cid = it.pergunta?.criterio_template_id ?? null;
    if (!cid) continue;
    if (it.nao_se_aplica) continue;
    if (it.nota == null) continue;
    const cur = acc.get(cid) ?? { soma: 0, qtd: 0 };
    cur.soma += it.nota;
    cur.qtd += 1;
    acc.set(cid, cur);
  }

  // Buscar todos os critérios para retornar mesmo os "sem dado"
  const { data: crits } = await supabase
    .from("criterio_template")
    .select("id, nome, dimensao, subdimensao_impacto, ordem")
    .eq("ativo", true)
    .order("dimensao")
    .order("ordem");

  const criterios = (crits ?? []) as Pick<
    CriterioTemplate,
    "id" | "nome" | "dimensao" | "subdimensao_impacto" | "ordem"
  >[];

  return criterios.map((c) => {
    const data = acc.get(c.id);
    return {
      criterio_id: c.id,
      criterio_nome: c.nome,
      dimensao: c.dimensao,
      subdimensao: c.subdimensao_impacto,
      media: data ? data.soma / data.qtd : null,
      qtd_respostas: data?.qtd ?? 0,
    };
  });
}

async function criteriosVazios(): Promise<MediaPorCriterio[]> {
  const supabase = await createClient();
  const { data: crits } = await supabase
    .from("criterio_template")
    .select("id, nome, dimensao, subdimensao_impacto, ordem")
    .eq("ativo", true)
    .order("dimensao")
    .order("ordem");
  return ((crits ?? []) as Pick<
    CriterioTemplate,
    "id" | "nome" | "dimensao" | "subdimensao_impacto" | "ordem"
  >[]).map((c) => ({
    criterio_id: c.id,
    criterio_nome: c.nome,
    dimensao: c.dimensao,
    subdimensao: c.subdimensao_impacto,
    media: null,
    qtd_respostas: 0,
  }));
}

/**
 * Tempos por passo para todas as jornadas do processo, prontos para um
 * gráfico de barras agrupadas (ordem no eixo X, séries por jornada).
 */
export async function temposPorPasso(processoId: string): Promise<TempoPassoAgregado[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("passo_jornada")
    .select(
      "ordem, descricao, tempo_segundos, jornada:jornada_id (id, processo_id, tipo_jornada, participante:participante_id (codigo))",
    )
    .order("ordem");
  if (error) throw error;

  type PassoSlim = {
    ordem: number;
    descricao: string | null;
    tempo_segundos: number | null;
    jornada: {
      id: string;
      processo_id: string;
      tipo_jornada: TipoJornada;
      participante: { codigo: string } | null;
    } | null;
  };

  return ((data ?? []) as unknown as PassoSlim[])
    .filter((p) => p.jornada?.processo_id === processoId)
    .map((p) => ({
      jornada_id: p.jornada!.id,
      jornada_label:
        p.jornada!.tipo_jornada === "planejada"
          ? "Planejada"
          : p.jornada!.tipo_jornada === "padrao"
            ? "Padrão"
            : (p.jornada!.participante?.codigo ?? "Individual"),
      tipo_jornada: p.jornada!.tipo_jornada,
      ordem: p.ordem,
      descricao: p.descricao,
      tempo_segundos: p.tempo_segundos,
    }));
}

export type TotalTempoJornada = {
  jornada_id: string;
  jornada_label: string;
  tipo_jornada: TipoJornada;
  total_segundos: number;
};

export async function tempoTotalPorJornada(
  processoId: string,
): Promise<TotalTempoJornada[]> {
  const passos = await temposPorPasso(processoId);
  const acc = new Map<string, TotalTempoJornada>();
  for (const p of passos) {
    if (p.tempo_segundos == null) continue;
    const cur = acc.get(p.jornada_id) ?? {
      jornada_id: p.jornada_id,
      jornada_label: p.jornada_label,
      tipo_jornada: p.tipo_jornada,
      total_segundos: 0,
    };
    cur.total_segundos += p.tempo_segundos;
    acc.set(p.jornada_id, cur);
  }
  return Array.from(acc.values()).sort((a, b) => a.jornada_label.localeCompare(b.jornada_label));
}

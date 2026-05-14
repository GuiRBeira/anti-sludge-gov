import { createClient } from "@/lib/supabase/server";
import type {
  CriterioTemplate,
  DimensaoQuestionario,
  SubdimensaoImpacto,
  TipoJornada,
} from "@/types/database";

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

export type LinhaDimensionamento = {
  resposta_id: string;
  jornada_id: string;
  jornada_label: string;
  tipo_jornada: TipoJornada;
  passo_id: string | null;
  passo_ordem: number | null;
  passo_descricao: string | null;
  categoria: string | null;
  tipo_comportamento: string | null;
  questionario: string;
  dimensao_questionario: DimensaoQuestionario;
  criterio: string | null;
  dimensao_criterio: "barreira" | "impacto" | null;
  subdimensao: SubdimensaoImpacto | null;
  nota: number | null;
  nao_se_aplica: boolean;
  observacao: string | null;
};

export async function tabelaDimensionamento(
  processoId: string,
): Promise<LinhaDimensionamento[]> {
  const supabase = await createClient();

  const { data: jornadasRaw, error: jornadasError } = await supabase
    .from("jornada")
    .select("id, tipo_jornada, participante:participante_id (codigo)")
    .eq("processo_id", processoId)
    .order("tipo_jornada")
    .order("created_at");
  if (jornadasError) throw jornadasError;

  type JornadaSlim = {
    id: string;
    tipo_jornada: TipoJornada;
    participante: { codigo: string } | null;
  };
  const jornadas = (jornadasRaw ?? []) as unknown as JornadaSlim[];
  const jornadaIds = jornadas.map((j) => j.id);
  if (jornadaIds.length === 0) return [];

  const jornadaMap = new Map(jornadas.map((j) => [j.id, j]));

  const [{ data: respostasRaw, error: respostasError }, { data: passosRaw, error: passosError }] =
    await Promise.all([
      supabase
        .from("questionario_resposta")
        .select("id, jornada_id, questionario:questionario_template_id (nome, codigo, dimensao)")
        .in("jornada_id", jornadaIds),
      supabase
        .from("passo_jornada")
        .select("id, jornada_id, ordem, descricao, tipo_comportamento:tipo_comportamento_id (nome, categoria:categoria_id (nome))")
        .in("jornada_id", jornadaIds),
    ]);
  if (respostasError) throw respostasError;
  if (passosError) throw passosError;

  type RespostaSlim = {
    id: string;
    jornada_id: string;
    questionario: {
      nome: string;
      codigo: string;
      dimensao: DimensaoQuestionario;
    } | null;
  };
  type PassoSlim = {
    id: string;
    jornada_id: string;
    ordem: number;
    descricao: string | null;
    tipo_comportamento: {
      nome: string;
      categoria: { nome: string } | null;
    } | null;
  };

  const respostas = (respostasRaw ?? []) as unknown as RespostaSlim[];
  const respostaIds = respostas.map((r) => r.id);
  if (respostaIds.length === 0) return [];
  const respostaMap = new Map(respostas.map((r) => [r.id, r]));
  const passoMap = new Map(
    ((passosRaw ?? []) as unknown as PassoSlim[]).map((p) => [p.id, p]),
  );

  const { data: itensRaw, error: itensError } = await supabase
    .from("resposta_item")
    .select("id, questionario_resposta_id, passo_jornada_id, nota, nao_se_aplica, observacao_discursiva, pergunta:pergunta_template_id (texto, criterio:criterio_template_id (nome, dimensao, subdimensao_impacto))")
    .in("questionario_resposta_id", respostaIds);
  if (itensError) throw itensError;

  type ItemSlim = {
    id: string;
    questionario_resposta_id: string;
    passo_jornada_id: string | null;
    nota: number | null;
    nao_se_aplica: boolean;
    observacao_discursiva: string | null;
    pergunta: {
      texto: string;
      criterio: {
        nome: string;
        dimensao: "barreira" | "impacto";
        subdimensao_impacto: SubdimensaoImpacto | null;
      } | null;
    } | null;
  };

  return ((itensRaw ?? []) as unknown as ItemSlim[])
    .map((item) => {
      const resposta = respostaMap.get(item.questionario_resposta_id);
      const jornada = resposta ? jornadaMap.get(resposta.jornada_id) : null;
      const passo = item.passo_jornada_id
        ? passoMap.get(item.passo_jornada_id)
        : null;
      const questionario = resposta?.questionario;
      const criterio = item.pergunta?.criterio ?? null;

      return {
        resposta_id: item.id,
        jornada_id: resposta?.jornada_id ?? "",
        jornada_label: jornadaLabel(jornada),
        tipo_jornada: jornada?.tipo_jornada ?? "planejada",
        passo_id: item.passo_jornada_id,
        passo_ordem: passo?.ordem ?? null,
        passo_descricao: passo?.descricao ?? null,
        categoria: passo?.tipo_comportamento?.categoria?.nome ?? null,
        tipo_comportamento: passo?.tipo_comportamento?.nome ?? null,
        questionario: questionario?.nome ?? "Questionário",
        dimensao_questionario: questionario?.dimensao ?? "contexto",
        criterio: criterio?.nome ?? item.pergunta?.texto ?? null,
        dimensao_criterio: criterio?.dimensao ?? null,
        subdimensao: criterio?.subdimensao_impacto ?? null,
        nota: item.nota,
        nao_se_aplica: item.nao_se_aplica,
        observacao: item.observacao_discursiva,
      } satisfies LinhaDimensionamento;
    })
    .sort((a, b) => {
      const byJornada = a.jornada_label.localeCompare(b.jornada_label);
      if (byJornada !== 0) return byJornada;
      return (a.passo_ordem ?? 0) - (b.passo_ordem ?? 0);
    });
}

function jornadaLabel(jornada: { tipo_jornada: TipoJornada; participante: { codigo: string } | null } | null | undefined): string {
  if (!jornada) return "Jornada";
  if (jornada.tipo_jornada === "planejada") return "Planejada";
  if (jornada.tipo_jornada === "padrao") return "Padrão";
  return jornada.participante?.codigo
    ? `Individual ${jornada.participante.codigo}`
    : "Individual";
}

export type RankingSludgePasso = {
  passo_id: string;
  jornada_label: string;
  passo_ordem: number | null;
  passo_descricao: string | null;
  media_barreira: number | null;
  media_impacto: number | null;
  sludge_score: number | null;
  qtd_respostas: number;
};

export async function rankingSludgePorPasso(
  processoId: string,
): Promise<RankingSludgePasso[]> {
  const linhas = await tabelaDimensionamento(processoId);
  const acc = new Map<
    string,
    {
      base: Pick<
        RankingSludgePasso,
        "passo_id" | "jornada_label" | "passo_ordem" | "passo_descricao"
      >;
      barreiras: number[];
      impactos: number[];
    }
  >();

  for (const linha of linhas) {
    if (!linha.passo_id || linha.nao_se_aplica || linha.nota == null) continue;
    const cur =
      acc.get(linha.passo_id) ??
      {
        base: {
          passo_id: linha.passo_id,
          jornada_label: linha.jornada_label,
          passo_ordem: linha.passo_ordem,
          passo_descricao: linha.passo_descricao,
        },
        barreiras: [],
        impactos: [],
      };
    if (linha.dimensao_criterio === "barreira") cur.barreiras.push(linha.nota);
    if (linha.dimensao_criterio === "impacto" && linha.subdimensao !== "necessidade") {
      cur.impactos.push(linha.nota);
    }
    acc.set(linha.passo_id, cur);
  }

  return Array.from(acc.values())
    .map(({ base, barreiras, impactos }) => {
      const mediaBarreira = mean(barreiras);
      const mediaImpacto = mean(impactos);
      const score = mean(
        [mediaBarreira, mediaImpacto].filter(
          (value): value is number => value != null,
        ),
      );
      return {
        ...base,
        media_barreira: mediaBarreira,
        media_impacto: mediaImpacto,
        sludge_score: score,
        qtd_respostas: barreiras.length + impactos.length,
      };
    })
    .filter((item) => item.sludge_score != null)
    .sort((a, b) => (b.sludge_score ?? 0) - (a.sludge_score ?? 0));
}

function mean(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

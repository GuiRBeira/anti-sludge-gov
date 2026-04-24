// apps/web/services/analysisService.ts
import { apiFetch } from "@/lib/api-client";

export interface ResultadoAnalise {
  id: number;
  processo_id: number;
  etapa_id?: number;
  media_barreiras: number;
  media_impactos: number;
  indice_sludge: number;
  prioridade: number;
  e_sludge: boolean;
  recomendacoes?: string;
  created_at: string;
}

export interface StepScore {
  etapa_id: number;
  nome: string;
  ordem: number;
  indice_sludge: number | null;
  prioridade: number | null;
  recomendacao?: string;
}

export interface ProcessChartData {
  processo_id: number;
  nome_processo: string;
  steps: StepScore[];
}

export interface JourneyDifferential {
  jornada_id: number;
  protocolo: string;
  total_planejado_segundos: number;
  total_real_segundos: number;
  indice_eficiencia_global: number;
  detalhe_etapas: {
    etapa_id: number;
    etapa_nome: string;
    ordem: number;
    status: string;
    tempo_planejado: number;
    tempo_real: number;
    desvio_segundos: number;
    indice_eficiencia: number;
    e_obrigatorio: boolean;
  }[];
}

export interface CriterioTemplate {
  id: number;
  nome: string;
  conceito: string;
  grupo_analise_id?: number;
}

export const analysisService = {
  /**
   * Aciona o cálculo do índice de Sludge para um processo.
   */
  async calculateSludge(processoId: number): Promise<ResultadoAnalise[]> {
    return apiFetch<ResultadoAnalise[]>(`/analysis_results/calculate/${processoId}`, {
      method: "POST",
    });
  },

  /**
   * Obtém os dados estruturados para o gráfico de linha por etapa.
   */
  async getProcessChartData(processoId: number): Promise<ProcessChartData> {
    return apiFetch<ProcessChartData>(`/dashboard/process/${processoId}`);
  },

  /**
   * Obtém o diferencial entre planejamento e realidade de uma jornada.
   */
  async getJourneyDifferential(jornadaId: number): Promise<JourneyDifferential> {
    return apiFetch<JourneyDifferential>(`/observations/jornadas/${jornadaId}/differential`);
  },

  /**
   * Sugere critérios permitidos para uma etapa baseado no seu tipo de comportamento.
   */
  async getAllowedCriteria(etapaId: number): Promise<CriterioTemplate[]> {
    return apiFetch<CriterioTemplate[]>(`/analysis_results/allowed-criteria/${etapaId}`);
  },

  /**
   * Vincula um intervalo da extensão a uma etapa.
   */
  async linkExtensionToStep(data: {
    jornada_id: number;
    etapa_id: number;
    start_ts: number;
    end_ts: number;
  }): Promise<any> {
    return apiFetch("/extension_sessions/vincular-etapa", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * Cria um novo critério de barreira para uma etapa.
   */
  async createCriterio(data: any): Promise<any> {
    return apiFetch("/analysis_results/criterios-barreira", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
};

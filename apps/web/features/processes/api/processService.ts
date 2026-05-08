// apps/web/services/process-service.ts
import { apiFetch } from "@/lib/api-client";

export enum EsferaGoverno {
  FEDERAL = "Federal",
  ESTADUAL = "Estadual",
  MUNICIPAL = "Municipal",
}

export enum Abrangencia {
  PUBLICO_GERAL = "Público Geral",
  PUBLICO_ESPECIFICO = "Público Específico",
}

export interface Etapa {
  id: number;
  processo_id: number;
  categoria_id: number;
  tipo_comportamento_id: number;
  numero?: string;
  comportamento: string;
  e_obrigatorio: boolean;
  repeticoes?: string;
  tempo_planejado?: string; // ISO 8601 duration or string representation
  tempo_padrao?: string;
  ordem: number;
  duracao_media_observada?: string;
  created_at: string;
}

export interface Processo {
  id: number;
  uuid: string;
  nome: string;
  descricao?: string;
  objetivo?: string;
  esfera_governo?: EsferaGoverno;
  abrangencia?: Abrangencia;
  publico_alvo?: string;
  usuarios_estimados_ano?: number;
  perfil_foco_mapeamento?: string;
  jornada_planejada_descricao?: string;
  necessidade_usuario?: string;
  tempo_medio_estimado?: string;
  indicadores_desempenho?: string;
  hipoteses_dificuldades?: string;
  registros_reclamacao?: string;
  registros_satisfacao?: string;
  status: string;
  padrao_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ProcessoDetail extends Processo {
  etapas: Etapa[];
}

export interface CreateProcessoDTO {
  nome: string;
  descricao?: string;
  objetivo?: string;
  esfera_governo?: EsferaGoverno;
  abrangencia?: Abrangencia;
  publico_alvo?: string;
  usuarios_estimados_ano?: number;
  perfil_foco_mapeamento?: string;
  jornada_planejada_descricao?: string;
  necessidade_usuario?: string;
  tempo_medio_estimado?: string;
  indicadores_desempenho?: string;
  hipoteses_dificuldades?: string;
  registros_reclamacao?: string;
  registros_satisfacao?: string;
  status?: string;
  padrao_url?: string;
}

export interface DashboardSummary {
  total_processos: number;
  total_jornadas: number;
  media_barreiras: number;
  media_impactos: number;
  processos_criticos: number;
  processos_por_status: { status: string; count: number }[];
  recent_activity: { id: number; protocolo: string; processo: string; data: string }[];
  processos_ranking: { nome: string; score: number }[];
}

export const processService = {
  async list(): Promise<Processo[]> {
    return apiFetch<Processo[]>("/processos");
  },

  async getById(id: number): Promise<ProcessoDetail> {
    return apiFetch<ProcessoDetail>(`/processos/${id}`);
  },

  async create(data: CreateProcessoDTO): Promise<Processo> {
    return apiFetch<Processo>("/processos", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getDashboardSummary(): Promise<DashboardSummary> {
    return apiFetch<DashboardSummary>("/dashboard/summary");
  },

  async update(id: number, data: Partial<CreateProcessoDTO>): Promise<Processo> {
    return apiFetch<Processo>(`/processos/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async delete(id: number): Promise<void> {
    return apiFetch<void>(`/processos/${id}`, {
      method: "DELETE",
    });
  },

  // Etapas
  async createEtapa(data: Partial<Etapa>): Promise<Etapa> {
    return apiFetch<Etapa>("/etapas", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateEtapa(id: number, data: Partial<Etapa>): Promise<Etapa> {
    return apiFetch<Etapa>(`/etapas/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteEtapa(id: number): Promise<void> {
    return apiFetch<void>(`/etapas/${id}`, {
      method: "DELETE",
    });
  },
};

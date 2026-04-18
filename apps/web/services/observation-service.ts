// apps/web/services/observation-service.ts
import { apiFetch } from "@/lib/api-client";

export interface JornadaObservada {
  id: number;
  processo_id: number;
  observador_id?: number;
  protocolo: string;
  nome_jornada?: string;
  data_observacao: string;
  observacoes_gerais?: string;
  created_at: string;
}

export interface CreateJornadaDTO {
  processo_id: number;
  protocolo: string;
  data_observacao: string;
  nome_jornada?: string;
}

export const observationService = {
  async listByProcess(processoId: number): Promise<JornadaObservada[]> {
    // Nota: Atualmente não temos um endpoint direto /processo/{id}/jornadas
    // Mas podemos buscar todas e filtrar ou assumir que o backend suporta query params
    return apiFetch<JornadaObservada[]>(`/observations/jornadas?processo_id=${processoId}`);
  },

  async getById(id: number): Promise<JornadaObservada> {
    return apiFetch<JornadaObservada>(`/observations/jornadas/${id}`);
  }
};

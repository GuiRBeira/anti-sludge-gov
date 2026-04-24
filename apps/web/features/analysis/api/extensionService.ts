// apps/web/services/extension-service.ts
import { apiFetch } from "@/lib/api-client";

export interface SessaoExtensao {
  id: number;
  session_id_extensao: string;
  processo_id?: number;
  jornada_observada_id?: number;
  data_inicio: string;
  data_fim?: string;
  total_tempo_segundos: number;
  total_paginas: number;
  total_cliques: number;
  created_at: string;
}

export interface InteracaoSummary {
  tipo: string;
  elemento_tag: string;
  elemento_texto: string;
  timestamp_evento: number;
}

export interface PaginaExtensao {
  id: number;
  url: string;
  titulo: string;
  tempo_inicio_unix: number;
  tempo_fim_unix?: number;
  duracao_segundos: number;
  contagem_cliques: number;
  interacoes: InteracaoSummary[];
}

export interface SessaoExtensaoDetail extends SessaoExtensao {
  paginas: PaginaExtensao[];
}

export const extensionService = {
  async listByProcess(processoId: number): Promise<SessaoExtensao[]> {
    return apiFetch<SessaoExtensao[]>(`/extension_sessions/sessoes-extensao?processo_id=${processoId}`);
  },

  async getById(id: number): Promise<SessaoExtensaoDetail> {
    return apiFetch<SessaoExtensaoDetail>(`/extension_sessions/sessoes-extensao/${id}`);
  },

  async linkToJourney(id: number, jornadaId: number): Promise<SessaoExtensao> {
    return apiFetch(`/extension_sessions/sessoes-extensao/${id}/vincular`, {
      method: "PATCH",
      body: JSON.stringify({ jornada_observada_id: jornadaId }),
    });
  }
};

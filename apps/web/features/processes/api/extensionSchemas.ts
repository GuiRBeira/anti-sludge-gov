// apps/web/features/processes/api/extensionSchemas.ts
export interface Interacao {
  id: number;
  tipo: string;
  elemento_tag?: string;
  elemento_texto?: string;
  timestamp_evento: number;
}

export interface Pagina {
  id: number;
  url: string;
  titulo?: string;
  duracao_segundos?: number;
  contagem_cliques: number;
  ordem: number;
}

export interface SessaoExtensao {
  id: number;
  session_id_extensao: string;
  processo_id?: number;
  data_inicio: string;
  data_fim?: string;
  total_tempo_segundos?: number;
  total_paginas: number;
  total_cliques: number;
  created_at: string;
}

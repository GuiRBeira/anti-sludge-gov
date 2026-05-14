// types/database.ts
// Tipos do banco escritos à mão (espelho das migrations 0001..0012).
// Substituir por gerado quando rodarmos `supabase gen types typescript`.

export type UUID = string;
export type Timestamp = string;

export type EsferaGovernamental = "federal" | "estadual" | "municipal";
export type PapelGlobal = "admin" | "gestor" | "analista" | "visitante";
export type PapelNoOrgao = "gestor" | "analista";
export type TipoJornada = "planejada" | "individual" | "padrao";
export type DimensaoCriterio = "barreira" | "impacto";
export type SubdimensaoImpacto =
  | "necessidade"
  | "carga_cognitiva"
  | "emocao"
  | "consequencia";
export type TipoResposta = "escala_1_5" | "texto" | "sim_nao" | "multipla";
export type TipoMetrica =
  | "barreira_media"
  | "impacto_medio"
  | "sludge_index"
  | "tempo_total"
  | "tempo_diferenca";
export type AplicavelA = "jornada_planejada" | "jornada_individual" | "ambas";
export type DimensaoQuestionario =
  | "barreira"
  | "impacto"
  | "necessidade"
  | "contexto";
export type BetaFeedbackKind =
  | "bug"
  | "inconsistencia"
  | "sugestao"
  | "falta_recurso"
  | "outro";
export type BetaFeedbackSeverity = "baixa" | "media" | "alta" | "bloqueante";
export type BetaFeedbackStatus =
  | "novo"
  | "em_analise"
  | "resolvido"
  | "ignorado";

export interface Profile {
  id: UUID;
  nome_completo: string | null;
  papel_global: PapelGlobal;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface Orgao {
  id: UUID;
  nome: string;
  sigla: string;
  esfera: EsferaGovernamental;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface MembroOrgao {
  id: UUID;
  profile_id: UUID;
  orgao_id: UUID;
  papel_no_orgao: PapelNoOrgao;
  created_at: Timestamp;
}

export interface Categoria {
  id: UUID;
  codigo: string;
  nome: string;
  conceito: string | null;
  descricao: string | null;
  ordem: number;
  created_at: Timestamp;
}

export interface TipoComportamento {
  id: UUID;
  categoria_id: UUID;
  codigo: string;
  nome: string;
  conceito: string | null;
  descricao: string | null;
  ordem: number;
  created_at: Timestamp;
}

export interface CriterioTemplate {
  id: UUID;
  codigo: string;
  nome: string;
  dimensao: DimensaoCriterio;
  subdimensao_impacto: SubdimensaoImpacto | null;
  conceito: string | null;
  pergunta_padrao: string;
  texto_nota_1: string | null;
  texto_nota_5: string | null;
  escala_min: number;
  escala_max: number;
  permite_nao_se_aplica: boolean;
  ordem: number | null;
  ativo: boolean;
  created_at: Timestamp;
}

export interface EscalaAvaliacao {
  criterio_template_id: UUID;
  nota: number;
  descricao: string;
}

export interface TipoCriterio {
  tipo_comportamento_id: UUID;
  criterio_template_id: UUID;
  ordem: number | null;
}

export interface Glossario {
  id: UUID;
  termo: string;
  definicao: string;
  aba_origem: string | null;
  created_at: Timestamp;
}

export interface GrupoAnalise {
  id: UUID;
  codigo: string;
  nome: string;
  descricao: string | null;
  ordem: number | null;
  created_at: Timestamp;
}

export interface Processo {
  id: UUID;
  orgao_id: UUID;
  nome: string;
  objetivo: string | null;
  abrangencia: string | null;
  publico_alvo: string | null;
  perfil_foco: string | null;
  indicadores_satisfacao: string | null;
  hipoteses: string | null;
  arquivado: boolean;
  created_by: UUID | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface ProcessoPermissao {
  id: UUID;
  profile_id: UUID;
  processo_id: UUID;
  pode_editar: boolean;
  created_at: Timestamp;
}

export interface Participante {
  id: UUID;
  processo_id: UUID;
  codigo: string;
  idade_faixa: string | null;
  escolaridade: string | null;
  regiao: string | null;
  genero: string | null;
  outras_caracteristicas: Record<string, unknown> | null;
  consentimento_lgpd: boolean;
  data_consentimento: Timestamp | null;
  created_at: Timestamp;
}

export interface ProtocoloObservacao {
  id: UUID;
  processo_id: UUID;
  participante_id: UUID;
  observador_id: UUID | null;
  tarefa: string | null;
  data_observacao: Timestamp | null;
  local: string | null;
  dispositivos: string | null;
  consentimento_obtido: boolean;
  notas_pre: string | null;
  notas_pos: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface EntrevistaPosObservacao {
  id: UUID;
  protocolo_id: UUID;
  observador_id: UUID | null;
  respostas: Record<string, unknown>;
  data: Timestamp | null;
  created_at: Timestamp;
}

export interface Jornada {
  id: UUID;
  processo_id: UUID;
  tipo_jornada: TipoJornada;
  participante_id: UUID | null;
  observador_id: UUID | null;
  protocolo_id: UUID | null;
  data_observacao: Timestamp | null;
  validada: boolean;
  notas: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface PassoJornada {
  id: UUID;
  jornada_id: UUID;
  ordem: number;
  passo_planejado_id: UUID | null;
  tipo_comportamento_id: UUID | null;
  descricao: string | null;
  obrigatorio: boolean;
  tempo_segundos: number | null;
  eh_desvio: boolean;
  eh_repeticao: boolean;
  notas: string | null;
  screenshot_path: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface QuestionarioTemplate {
  id: UUID;
  codigo: string;
  versao: number;
  nome: string;
  descricao: string | null;
  aplicavel_a: AplicavelA;
  dimensao: DimensaoQuestionario;
  ativo: boolean;
  created_at: Timestamp;
}

export interface PerguntaTemplate {
  id: UUID;
  questionario_template_id: UUID;
  criterio_template_id: UUID | null;
  texto: string;
  ordem: number;
  tipo_resposta: TipoResposta;
  permite_nao_se_aplica: boolean;
  permite_observacao: boolean;
  created_at: Timestamp;
}

export interface QuestionarioResposta {
  id: UUID;
  questionario_template_id: UUID;
  jornada_id: UUID;
  respondente_id: UUID | null;
  data_resposta: Timestamp;
  concluido: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface RespostaItem {
  id: UUID;
  questionario_resposta_id: UUID;
  pergunta_template_id: UUID;
  passo_jornada_id: UUID | null;
  nota: number | null;
  nao_se_aplica: boolean;
  observacao_discursiva: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface ResultadoAnalise {
  id: UUID;
  processo_id: UUID;
  jornada_id: UUID | null;
  passo_jornada_id: UUID | null;
  criterio_template_id: UUID | null;
  tipo_metrica: TipoMetrica;
  valor: number | null;
  metadados: Record<string, unknown>;
  versao_metodologia: string | null;
  calculado_em: Timestamp;
}

export interface BetaFeedback {
  id: UUID;
  created_at: Timestamp;
  created_by: UUID | null;
  user_email: string | null;
  user_name: string | null;
  page_path: string | null;
  user_agent: string | null;
  kind: BetaFeedbackKind;
  severity: BetaFeedbackSeverity;
  title: string;
  description: string;
  status: BetaFeedbackStatus;
  admin_notes: string | null;
}

// Helper para fluência: tipos por tabela.
export type DbInsert<T> = Omit<T, "id" | "created_at" | "updated_at">;
export type DbUpdate<T> = Partial<DbInsert<T>>;

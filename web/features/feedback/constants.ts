import type { BetaFeedbackKind, BetaFeedbackSeverity, BetaFeedbackStatus } from "@/types/database";

export const BETA_FEEDBACK_OWNER_EMAIL = "pedrolucas@alunos.utfpr.edu.br";

export const betaFeedbackKinds = [
  "bug",
  "inconsistencia",
  "sugestao",
  "falta_recurso",
  "outro",
] as const satisfies readonly BetaFeedbackKind[];

export const betaFeedbackSeverities = [
  "baixa",
  "media",
  "alta",
  "bloqueante",
] as const satisfies readonly BetaFeedbackSeverity[];

export const betaFeedbackStatuses = [
  "novo",
  "em_analise",
  "resolvido",
  "ignorado",
] as const satisfies readonly BetaFeedbackStatus[];

export const betaFeedbackKindLabels: Record<BetaFeedbackKind, string> = {
  bug: "Bug",
  inconsistencia: "Inconsistência",
  sugestao: "Sugestão",
  falta_recurso: "Falta de recurso",
  outro: "Outro",
};

export const betaFeedbackSeverityLabels: Record<BetaFeedbackSeverity, string> = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
  bloqueante: "Bloqueante",
};

export const betaFeedbackStatusLabels: Record<BetaFeedbackStatus, string> = {
  novo: "Novo",
  em_analise: "Em análise",
  resolvido: "Resolvido",
  ignorado: "Ignorado",
};

export function canViewBetaFeedback(email: string | null | undefined): boolean {
  return (email ?? "").toLowerCase() === BETA_FEEDBACK_OWNER_EMAIL;
}

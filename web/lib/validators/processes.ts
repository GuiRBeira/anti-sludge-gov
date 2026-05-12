import { z } from "zod";

export const processoCreateSchema = z.object({
  orgao_id: z.string().uuid("Selecione um órgão"),
  nome: z.string().min(2, "Nome muito curto").max(300),
  objetivo: z.string().max(2000).optional().nullable(),
  abrangencia: z.string().max(2000).optional().nullable(),
  publico_alvo: z.string().max(2000).optional().nullable(),
  perfil_foco: z.string().max(2000).optional().nullable(),
  indicadores_satisfacao: z.string().max(4000).optional().nullable(),
  hipoteses: z.string().max(4000).optional().nullable(),
});

export type ProcessoCreateInput = z.infer<typeof processoCreateSchema>;

export const contextoUpdateSchema = processoCreateSchema.omit({
  orgao_id: true,
  nome: true,
});

export type ContextoUpdateInput = z.infer<typeof contextoUpdateSchema>;

/**
 * Edição da metadata do processo: nome + órgão. Disponível para admin
 * global e para gestor do órgão atual (pode mover entre órgãos que ele
 * próprio gerencia).
 */
export const processoMetaUpdateSchema = z.object({
  orgao_id: z.string().uuid("Selecione um órgão"),
  nome: z.string().min(2, "Nome muito curto").max(300),
});

export type ProcessoMetaUpdateInput = z.infer<typeof processoMetaUpdateSchema>;

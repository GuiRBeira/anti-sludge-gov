import { z } from "zod";

export const passoCreateSchema = z.object({
  jornada_id: z.string().uuid(),
  descricao: z.string().min(1, "Descreva o passo").max(500),
  tipo_comportamento_id: z.string().uuid().nullable().optional(),
  obrigatorio: z.boolean().default(true),
  tempo_segundos: z.number().int().nonnegative().nullable().optional(),
  notas: z.string().max(2000).nullable().optional(),
});

export type PassoCreateInput = z.infer<typeof passoCreateSchema>;

export const passoUpdateSchema = z.object({
  descricao: z.string().min(1).max(500).optional(),
  tipo_comportamento_id: z.string().uuid().nullable().optional(),
  obrigatorio: z.boolean().optional(),
  tempo_segundos: z.number().int().nonnegative().nullable().optional(),
  notas: z.string().max(2000).nullable().optional(),
  eh_desvio: z.boolean().optional(),
  eh_repeticao: z.boolean().optional(),
});

export type PassoUpdateInput = z.infer<typeof passoUpdateSchema>;

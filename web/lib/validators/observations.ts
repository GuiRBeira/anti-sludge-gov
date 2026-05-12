import { z } from "zod";

export const participanteCreateSchema = z.object({
  processo_id: z.string().uuid(),
  idade_faixa: z.string().max(50).optional().nullable(),
  escolaridade: z.string().max(100).optional().nullable(),
  regiao: z.string().max(100).optional().nullable(),
  genero: z.string().max(50).optional().nullable(),
  consentimento_lgpd: z.boolean().default(false),
});

export type ParticipanteCreateInput = z.infer<typeof participanteCreateSchema>;

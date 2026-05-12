import { z } from "zod";

export const itemRespostaSchema = z.object({
  questionario_resposta_id: z.string().uuid(),
  pergunta_template_id: z.string().uuid(),
  passo_jornada_id: z.string().uuid().nullable(),
  nota: z.number().int().min(1).max(5).nullable(),
  nao_se_aplica: z.boolean().default(false),
  observacao_discursiva: z.string().max(4000).nullable(),
});

export type ItemRespostaInput = z.infer<typeof itemRespostaSchema>;

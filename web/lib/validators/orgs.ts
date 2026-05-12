import { z } from "zod";

export const esferaSchema = z.enum(["federal", "estadual", "municipal"]);

export const orgaoCreateSchema = z.object({
  nome: z.string().min(2, "Nome muito curto").max(200),
  sigla: z.string().min(2, "Sigla obrigatória").max(20),
  esfera: esferaSchema,
});

export type OrgaoCreateInput = z.infer<typeof orgaoCreateSchema>;

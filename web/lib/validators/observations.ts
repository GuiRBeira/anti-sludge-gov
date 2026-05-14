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

export const protocoloObservacaoSchema = z.object({
  processo_id: z.string().uuid(),
  participante_id: z.string().uuid(),
  tarefa: z.string().max(2000).optional().nullable(),
  data_observacao: z.string().max(80).optional().nullable(),
  local: z.string().max(300).optional().nullable(),
  dispositivos: z.string().max(500).optional().nullable(),
  consentimento_obtido: z.boolean().default(false),
  notas_pre: z.string().max(4000).optional().nullable(),
  notas_pos: z.string().max(4000).optional().nullable(),
});

export type ProtocoloObservacaoInput = z.infer<
  typeof protocoloObservacaoSchema
>;

export const entrevistaPosObservacaoSchema = z.object({
  protocolo_id: z.string().uuid(),
  facilitadores: z.string().max(3000).optional().nullable(),
  dificuldades: z.string().max(3000).optional().nullable(),
  maior_esforco: z.string().max(3000).optional().nullable(),
  comentarios: z.string().max(3000).optional().nullable(),
  data: z.string().max(80).optional().nullable(),
});

export type EntrevistaPosObservacaoInput = z.infer<
  typeof entrevistaPosObservacaoSchema
>;

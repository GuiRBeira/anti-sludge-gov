"use server";

import { createClient } from "@/lib/supabase/server";
import { getSessionOrRedirect } from "@/lib/auth/session";
import { assertCanEditProcesso } from "@/lib/auth/processo-permissions";
import {
  participanteCreateSchema,
  protocoloObservacaoSchema,
  entrevistaPosObservacaoSchema,
  type ParticipanteCreateInput,
  type ProtocoloObservacaoInput,
  type EntrevistaPosObservacaoInput,
} from "@/lib/validators/observations";
import { revalidatePath } from "next/cache";

function parseDate(value?: string | null): string | null {
  if (!value?.trim()) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

/**
 * Cria participante com código sequencial P01, P02, ... no escopo do processo.
 * Para evitar race condition em ambientes concorridos, idealmente isso seria
 * uma function SQL com SELECT FOR UPDATE; aqui assumimos que pesquisas são
 * sequenciais (uma equipe por processo).
 */
export async function criarParticipante(
  input: ParticipanteCreateInput,
): Promise<void> {
  await getSessionOrRedirect();
  const parsed = participanteCreateSchema.parse(input);
  await assertCanEditProcesso(parsed.processo_id);
  const supabase = await createClient();

  const { data: existentes, error: selErr } = await supabase
    .from("participante")
    .select("codigo")
    .eq("processo_id", parsed.processo_id)
    .order("codigo", { ascending: false })
    .limit(1);
  if (selErr) throw selErr;

  let proximoNum = 1;
  if (existentes && existentes.length > 0) {
    const ultimo = existentes[0].codigo as string;
    const match = ultimo.match(/^P(\d+)$/);
    if (match) proximoNum = parseInt(match[1], 10) + 1;
  }
  const codigo = `P${String(proximoNum).padStart(2, "0")}`;

  const { error } = await supabase.from("participante").insert({
    processo_id: parsed.processo_id,
    codigo,
    idade_faixa: parsed.idade_faixa ?? null,
    escolaridade: parsed.escolaridade ?? null,
    regiao: parsed.regiao ?? null,
    genero: parsed.genero ?? null,
    consentimento_lgpd: parsed.consentimento_lgpd,
    data_consentimento: parsed.consentimento_lgpd ? new Date().toISOString() : null,
  });
  if (error) throw error;

  revalidatePath(`/processos/${parsed.processo_id}/participantes`);
  revalidatePath(`/processos/${parsed.processo_id}`);
}

export async function removerParticipante(participanteId: string): Promise<void> {
  await getSessionOrRedirect();
  const supabase = await createClient();

  const { data: p } = await supabase
    .from("participante")
    .select("processo_id")
    .eq("id", participanteId)
    .single();

  if (p?.processo_id) await assertCanEditProcesso(p.processo_id);

  const { error } = await supabase
    .from("participante")
    .delete()
    .eq("id", participanteId);
  if (error) throw error;

  if (p?.processo_id) {
    revalidatePath(`/processos/${p.processo_id}/participantes`);
    revalidatePath(`/processos/${p.processo_id}`);
  }
}

export async function upsertProtocoloObservacao(
  input: ProtocoloObservacaoInput,
): Promise<void> {
  const ctx = await getSessionOrRedirect();
  const parsed = protocoloObservacaoSchema.parse(input);
  await assertCanEditProcesso(parsed.processo_id);
  const supabase = await createClient();

  const { data: participante, error: participanteError } = await supabase
    .from("participante")
    .select("id")
    .eq("id", parsed.participante_id)
    .eq("processo_id", parsed.processo_id)
    .maybeSingle();
  if (participanteError) throw participanteError;
  if (!participante) throw new Error("Participante não pertence a este processo.");

  const { error } = await supabase.from("protocolo_observacao").upsert(
    {
      processo_id: parsed.processo_id,
      participante_id: parsed.participante_id,
      observador_id: ctx.userId,
      tarefa: parsed.tarefa?.trim() || null,
      data_observacao: parseDate(parsed.data_observacao),
      local: parsed.local?.trim() || null,
      dispositivos: parsed.dispositivos?.trim() || null,
      consentimento_obtido: parsed.consentimento_obtido,
      notas_pre: parsed.notas_pre?.trim() || null,
      notas_pos: parsed.notas_pos?.trim() || null,
    },
    { onConflict: "processo_id,participante_id" },
  );
  if (error) throw error;

  revalidatePath(`/processos/${parsed.processo_id}/observacoes`);
  revalidatePath(`/processos/${parsed.processo_id}`);
}

export async function salvarEntrevistaPosObservacao(
  input: EntrevistaPosObservacaoInput,
): Promise<void> {
  const ctx = await getSessionOrRedirect();
  const parsed = entrevistaPosObservacaoSchema.parse(input);
  const supabase = await createClient();

  const { data: protocolo, error: protocoloError } = await supabase
    .from("protocolo_observacao")
    .select("id, processo_id")
    .eq("id", parsed.protocolo_id)
    .maybeSingle();
  if (protocoloError) throw protocoloError;
  if (!protocolo) throw new Error("Protocolo não encontrado.");
  await assertCanEditProcesso(protocolo.processo_id);

  const respostas = {
    facilitadores: parsed.facilitadores?.trim() || null,
    dificuldades: parsed.dificuldades?.trim() || null,
    maior_esforco: parsed.maior_esforco?.trim() || null,
    comentarios: parsed.comentarios?.trim() || null,
  };

  const { data: existente, error: existenteError } = await supabase
    .from("entrevista_pos_observacao")
    .select("id")
    .eq("protocolo_id", parsed.protocolo_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (existenteError) throw existenteError;

  if (existente) {
    const { error } = await supabase
      .from("entrevista_pos_observacao")
      .update({
        observador_id: ctx.userId,
        respostas,
        data: parseDate(parsed.data),
      })
      .eq("id", existente.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("entrevista_pos_observacao").insert({
      protocolo_id: parsed.protocolo_id,
      observador_id: ctx.userId,
      respostas,
      data: parseDate(parsed.data),
    });
    if (error) throw error;
  }

  revalidatePath(`/processos/${protocolo.processo_id}/observacoes`);
  revalidatePath(`/processos/${protocolo.processo_id}`);
}

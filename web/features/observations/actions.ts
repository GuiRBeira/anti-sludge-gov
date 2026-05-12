"use server";

import { createClient } from "@/lib/supabase/server";
import { getSessionOrRedirect } from "@/lib/auth/session";
import { assertCanEditProcesso } from "@/lib/auth/processo-permissions";
import {
  participanteCreateSchema,
  type ParticipanteCreateInput,
} from "@/lib/validators/observations";
import { revalidatePath } from "next/cache";

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

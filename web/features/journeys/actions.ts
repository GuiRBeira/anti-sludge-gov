"use server";

import { createClient } from "@/lib/supabase/server";
import { getSessionOrRedirect } from "@/lib/auth/session";
import { assertCanEditProcesso } from "@/lib/auth/processo-permissions";
import {
  passoCreateSchema,
  passoUpdateSchema,
  type PassoCreateInput,
  type PassoUpdateInput,
} from "@/lib/validators/journeys";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Resolve processo_id a partir de uma jornada — usado pelos asserts
 * que protegem as Server Actions que recebem um jornada_id derivado.
 */
async function processoDaJornada(jornadaId: string): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jornada")
    .select("processo_id")
    .eq("id", jornadaId)
    .single();
  if (error) throw error;
  return data.processo_id as string;
}

/**
 * Resolve processo_id a partir de um passo (via jornada).
 */
async function processoDoPasso(passoId: string): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("passo_jornada")
    .select("jornada:jornada_id (processo_id)")
    .eq("id", passoId)
    .single();
  if (error) throw error;
  const j = data.jornada as { processo_id?: string } | null;
  if (!j?.processo_id) throw new Error("Passo sem jornada vinculada.");
  return j.processo_id;
}

export async function ensureJornadaPlanejada(processoId: string): Promise<string> {
  await getSessionOrRedirect();
  await assertCanEditProcesso(processoId);
  const supabase = await createClient();

  const { data: existing, error: selErr } = await supabase
    .from("jornada")
    .select("id")
    .eq("processo_id", processoId)
    .eq("tipo_jornada", "planejada")
    .maybeSingle();
  if (selErr) throw selErr;
  if (existing) return existing.id as string;

  const { data, error } = await supabase
    .from("jornada")
    .insert({ processo_id: processoId, tipo_jornada: "planejada" })
    .select("id")
    .single();
  if (error) throw error;

  revalidatePath(`/processos/${processoId}`);
  revalidatePath(`/processos/${processoId}/jornada-planejada`);
  return data.id as string;
}

export async function ensureJornadaPadrao(processoId: string): Promise<string> {
  await getSessionOrRedirect();
  await assertCanEditProcesso(processoId);
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("jornada")
    .select("id")
    .eq("processo_id", processoId)
    .eq("tipo_jornada", "padrao")
    .maybeSingle();
  if (existing) return existing.id as string;

  const { data, error } = await supabase
    .from("jornada")
    .insert({ processo_id: processoId, tipo_jornada: "padrao" })
    .select("id")
    .single();
  if (error) throw error;

  revalidatePath(`/processos/${processoId}`);
  revalidatePath(`/processos/${processoId}/jornada-padrao`);
  return data.id as string;
}

export async function iniciarJornadaIndividual(
  processoId: string,
  participanteId: string,
): Promise<string> {
  await getSessionOrRedirect();
  await assertCanEditProcesso(processoId);
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("jornada")
    .select("id")
    .eq("processo_id", processoId)
    .eq("participante_id", participanteId)
    .eq("tipo_jornada", "individual")
    .maybeSingle();
  if (existing) {
    revalidatePath(`/processos/${processoId}/jornadas-individuais`);
    redirect(
      `/processos/${processoId}/jornadas-individuais/${existing.id as string}`,
    );
  }

  const { data, error } = await supabase
    .from("jornada")
    .insert({
      processo_id: processoId,
      participante_id: participanteId,
      tipo_jornada: "individual",
    })
    .select("id")
    .single();
  if (error) throw error;

  revalidatePath(`/processos/${processoId}/jornadas-individuais`);
  revalidatePath(`/processos/${processoId}`);
  redirect(`/processos/${processoId}/jornadas-individuais/${data.id as string}`);
}

/**
 * Copia os passos da jornada planejada para a jornada destino, preservando
 * descrição/tipo/obrigatoriedade/tempo e marcando passo_planejado_id.
 * Pula se a jornada destino já tiver passos.
 */
export async function clonarPassosDaPlanejada(
  jornadaDestinoId: string,
): Promise<void> {
  await getSessionOrRedirect();
  await assertCanEditProcesso(await processoDaJornada(jornadaDestinoId));
  const supabase = await createClient();

  const { data: destino, error: destinoErr } = await supabase
    .from("jornada")
    .select("id, processo_id, tipo_jornada")
    .eq("id", jornadaDestinoId)
    .single();
  if (destinoErr) throw destinoErr;
  if (destino.tipo_jornada === "planejada") return;

  const { count } = await supabase
    .from("passo_jornada")
    .select("*", { count: "exact", head: true })
    .eq("jornada_id", jornadaDestinoId);
  if ((count ?? 0) > 0) return;

  const { data: planejada } = await supabase
    .from("jornada")
    .select("id")
    .eq("processo_id", destino.processo_id)
    .eq("tipo_jornada", "planejada")
    .maybeSingle();
  if (!planejada) return;

  const { data: passos } = await supabase
    .from("passo_jornada")
    .select(
      "id, ordem, tipo_comportamento_id, descricao, obrigatorio, tempo_segundos, notas",
    )
    .eq("jornada_id", planejada.id)
    .order("ordem");

  if (!passos || passos.length === 0) return;

  const insertRows = passos.map((p) => ({
    jornada_id: jornadaDestinoId,
    ordem: p.ordem,
    passo_planejado_id: p.id,
    tipo_comportamento_id: p.tipo_comportamento_id,
    descricao: p.descricao,
    obrigatorio: p.obrigatorio,
    tempo_segundos: p.tempo_segundos,
    notas: p.notas,
  }));

  const { error: insErr } = await supabase
    .from("passo_jornada")
    .insert(insertRows);
  if (insErr) throw insErr;

  revalidatePath(`/processos/${destino.processo_id}`);
  revalidatePath(
    `/processos/${destino.processo_id}/jornadas-individuais/${jornadaDestinoId}`,
  );
  revalidatePath(`/processos/${destino.processo_id}/jornada-padrao`);
}

export async function adicionarPasso(input: PassoCreateInput): Promise<void> {
  await getSessionOrRedirect();
  const parsed = passoCreateSchema.parse(input);
  await assertCanEditProcesso(await processoDaJornada(parsed.jornada_id));
  const supabase = await createClient();

  const { data: ult } = await supabase
    .from("passo_jornada")
    .select("ordem")
    .eq("jornada_id", parsed.jornada_id)
    .order("ordem", { ascending: false })
    .limit(1)
    .maybeSingle();

  const proxima = (ult?.ordem ?? 0) + 1;

  const { error } = await supabase.from("passo_jornada").insert({
    jornada_id: parsed.jornada_id,
    ordem: proxima,
    descricao: parsed.descricao,
    tipo_comportamento_id: parsed.tipo_comportamento_id ?? null,
    obrigatorio: parsed.obrigatorio,
    tempo_segundos: parsed.tempo_segundos ?? null,
    notas: parsed.notas ?? null,
  });
  if (error) throw error;

  await revalidateJornadaPaths(parsed.jornada_id);
}

export async function atualizarPasso(
  passoId: string,
  input: PassoUpdateInput,
): Promise<void> {
  await getSessionOrRedirect();
  const parsed = passoUpdateSchema.parse(input);
  await assertCanEditProcesso(await processoDoPasso(passoId));
  const supabase = await createClient();

  const { data: passo } = await supabase
    .from("passo_jornada")
    .select("jornada_id")
    .eq("id", passoId)
    .single();

  const { error } = await supabase
    .from("passo_jornada")
    .update(parsed)
    .eq("id", passoId);
  if (error) throw error;

  if (passo?.jornada_id) await revalidateJornadaPaths(passo.jornada_id);
}

export async function setPassoScreenshot(
  passoId: string,
  screenshotPath: string | null,
): Promise<void> {
  await getSessionOrRedirect();
  await assertCanEditProcesso(await processoDoPasso(passoId));
  const supabase = await createClient();

  const { data: passo } = await supabase
    .from("passo_jornada")
    .select("jornada_id")
    .eq("id", passoId)
    .single();

  const { error } = await supabase
    .from("passo_jornada")
    .update({ screenshot_path: screenshotPath })
    .eq("id", passoId);
  if (error) throw error;

  if (passo?.jornada_id) await revalidateJornadaPaths(passo.jornada_id);
}

export async function vincularPassoPlanejado(
  passoId: string,
  passoPlanejadoId: string | null,
): Promise<void> {
  await getSessionOrRedirect();
  await assertCanEditProcesso(await processoDoPasso(passoId));
  const supabase = await createClient();

  const { data: passo } = await supabase
    .from("passo_jornada")
    .select("jornada_id")
    .eq("id", passoId)
    .single();

  const { error } = await supabase
    .from("passo_jornada")
    .update({ passo_planejado_id: passoPlanejadoId })
    .eq("id", passoId);
  if (error) throw error;

  if (passo?.jornada_id) await revalidateJornadaPaths(passo.jornada_id);
}

export async function removerPasso(passoId: string): Promise<void> {
  await getSessionOrRedirect();
  await assertCanEditProcesso(await processoDoPasso(passoId));
  const supabase = await createClient();

  const { data: passo } = await supabase
    .from("passo_jornada")
    .select("jornada_id")
    .eq("id", passoId)
    .single();

  const { error } = await supabase
    .from("passo_jornada")
    .delete()
    .eq("id", passoId);
  if (error) throw error;

  if (passo?.jornada_id) await revalidateJornadaPaths(passo.jornada_id);
}

export async function moverPasso(
  passoId: string,
  delta: 1 | -1,
): Promise<void> {
  await getSessionOrRedirect();
  await assertCanEditProcesso(await processoDoPasso(passoId));
  const supabase = await createClient();

  const { data: alvo, error } = await supabase
    .from("passo_jornada")
    .select("id, jornada_id, ordem")
    .eq("id", passoId)
    .single();
  if (error) throw error;

  const novaOrdem = alvo.ordem + delta;
  const { data: vizinho } = await supabase
    .from("passo_jornada")
    .select("id, ordem")
    .eq("jornada_id", alvo.jornada_id)
    .eq("ordem", novaOrdem)
    .maybeSingle();
  if (!vizinho) return;

  const { error: e1 } = await supabase
    .from("passo_jornada")
    .update({ ordem: -1 })
    .eq("id", vizinho.id);
  if (e1) throw e1;
  const { error: e2 } = await supabase
    .from("passo_jornada")
    .update({ ordem: novaOrdem })
    .eq("id", alvo.id);
  if (e2) throw e2;
  const { error: e3 } = await supabase
    .from("passo_jornada")
    .update({ ordem: alvo.ordem })
    .eq("id", vizinho.id);
  if (e3) throw e3;

  await revalidateJornadaPaths(alvo.jornada_id);
}

export async function toggleValidacaoJornada(jornadaId: string): Promise<void> {
  await getSessionOrRedirect();
  await assertCanEditProcesso(await processoDaJornada(jornadaId));
  const supabase = await createClient();
  const { data: jornada, error } = await supabase
    .from("jornada")
    .select("id, validada")
    .eq("id", jornadaId)
    .single();
  if (error) throw error;

  const { error: updErr } = await supabase
    .from("jornada")
    .update({ validada: !jornada.validada })
    .eq("id", jornadaId);
  if (updErr) throw updErr;

  await revalidateJornadaPaths(jornadaId);
}

async function revalidateJornadaPaths(jornadaId: string): Promise<void> {
  const supabase = await createClient();
  const { data: jornada } = await supabase
    .from("jornada")
    .select("processo_id, tipo_jornada")
    .eq("id", jornadaId)
    .single();
  if (!jornada) return;

  const base = `/processos/${jornada.processo_id}`;
  revalidatePath(base);
  if (jornada.tipo_jornada === "planejada") {
    revalidatePath(`${base}/jornada-planejada`);
  } else if (jornada.tipo_jornada === "padrao") {
    revalidatePath(`${base}/jornada-padrao`);
  } else {
    revalidatePath(`${base}/jornadas-individuais`);
    revalidatePath(`${base}/jornadas-individuais/${jornadaId}`);
  }
}

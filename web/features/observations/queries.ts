import { createClient } from "@/lib/supabase/server";
import type {
  EntrevistaPosObservacao,
  Participante,
  ProtocoloObservacao,
} from "@/types/database";

export async function listParticipantes(
  processoId: string,
): Promise<Participante[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("participante")
    .select("*")
    .eq("processo_id", processoId)
    .order("codigo", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Participante[];
}

export type ProtocoloComParticipante = ProtocoloObservacao & {
  participante: Participante | null;
  entrevista: EntrevistaPosObservacao | null;
};

export async function listProtocolosObservacao(
  processoId: string,
): Promise<ProtocoloComParticipante[]> {
  const supabase = await createClient();
  const { data: protocolosRaw, error } = await supabase
    .from("protocolo_observacao")
    .select("*, participante:participante_id (*)")
    .eq("processo_id", processoId)
    .order("created_at", { ascending: true });
  if (error) throw error;

  const protocolos = (protocolosRaw ?? []) as unknown as Array<
    ProtocoloObservacao & { participante: Participante | null }
  >;
  const protocoloIds = protocolos.map((p) => p.id);
  if (protocoloIds.length === 0) return [];

  const { data: entrevistasRaw, error: entrevistaError } = await supabase
    .from("entrevista_pos_observacao")
    .select("*")
    .in("protocolo_id", protocoloIds)
    .order("created_at", { ascending: false });
  if (entrevistaError) throw entrevistaError;

  const entrevistas = (entrevistasRaw ?? []) as EntrevistaPosObservacao[];
  const entrevistaPorProtocolo = new Map<string, EntrevistaPosObservacao>();
  for (const entrevista of entrevistas) {
    if (!entrevistaPorProtocolo.has(entrevista.protocolo_id)) {
      entrevistaPorProtocolo.set(entrevista.protocolo_id, entrevista);
    }
  }

  return protocolos.map((protocolo) => ({
    ...protocolo,
    entrevista: entrevistaPorProtocolo.get(protocolo.id) ?? null,
  }));
}

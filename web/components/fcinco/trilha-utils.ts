import type { PassoComTipo } from "@/features/journeys/queries";
import type { TrilhaPasso } from "./trilha-jornada";

export function passoToTrilhaPasso(passo: PassoComTipo): TrilhaPasso {
  return {
    id: passo.id,
    ordem: passo.ordem,
    descricao: passo.descricao ?? "Passo sem descricao",
    categoria: passo.tipo_comportamento?.categoria?.nome ?? null,
    tipo: passo.tipo_comportamento?.nome ?? null,
    tempo: passo.tempo_segundos,
    obrigatorio: passo.obrigatorio,
    print: Boolean(passo.screenshot_path),
    marcacao: passo.eh_desvio
      ? "desvio"
      : passo.eh_repeticao
        ? "repeticao"
        : null,
    repeticoes: passo.eh_repeticao ? 2 : undefined,
    extra: passo.eh_desvio && !passo.passo_planejado_id,
    note: passo.notas,
    feito: true,
  };
}

export function totalTempoSegundos(passos: PassoComTipo[]) {
  return passos.reduce((acc, passo) => acc + (passo.tempo_segundos ?? 0), 0);
}

export function formatTempo(totalSegundos: number) {
  if (totalSegundos <= 0) return "sem tempo";
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;
  if (minutos === 0) return `${segundos}s`;
  return `${minutos}m${String(segundos).padStart(2, "0")}s`;
}

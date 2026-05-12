"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { salvarContexto } from "@/features/processes/actions";
import { NumeroEtapa } from "@/components/fcinco/numero-etapa";
import type { Processo } from "@/types/database";

type CampoKey =
  | "objetivo"
  | "abrangencia"
  | "publico_alvo"
  | "perfil_foco"
  | "indicadores_satisfacao"
  | "hipoteses";

const CAMPOS: Array<{
  key: CampoKey;
  label: string;
  hint: string;
  placeholder: string;
}> = [
  {
    key: "objetivo",
    label: "Objetivo",
    hint: "Qual o propósito do serviço para o cidadão?",
    placeholder:
      "Ex.: permitir que estrangeiros obtenham CPF para acessar serviços públicos no país.",
  },
  {
    key: "abrangencia",
    label: "Abrangência",
    hint: "Federal, estadual, municipal, território coberto.",
    placeholder: "Ex.: federal — atende solicitantes em qualquer país de origem.",
  },
  {
    key: "publico_alvo",
    label: "Público-alvo",
    hint: "Quem usa este serviço, em linguagem de cidadão?",
    placeholder:
      "Ex.: pessoas estrangeiras maiores de 18 anos que precisam regularizar situação fiscal no Brasil.",
  },
  {
    key: "perfil_foco",
    label: "Perfil foco da observação",
    hint: "Qual recorte do público vai ser efetivamente observado nesta pesquisa?",
    placeholder:
      "Ex.: estrangeiros que estão fora do Brasil, sem conta gov.br ainda.",
  },
  {
    key: "indicadores_satisfacao",
    label: "Indicadores e satisfação atual",
    hint: "Métricas, NPS, reclamações conhecidas — só fatos, sem chute.",
    placeholder:
      "Ex.: NPS = 32 (1S 2025). 28% dos protocolos voltam por inconsistência no anexo.",
  },
  {
    key: "hipoteses",
    label: "Hipóteses e dificuldades",
    hint: "O que a equipe espera encontrar como barreira? Vamos confirmar ou refutar.",
    placeholder:
      "Ex.: termo de uso longo é abandonado. Upload de passaporte falha silenciosamente acima de 4 MB.",
  },
];

export default function ContextoForm({
  processoId,
  initial,
  canEdit,
}: {
  processoId: string;
  initial: Processo;
  canEdit: boolean;
}) {
  const [values, setValues] = useState<Record<CampoKey, string>>({
    objetivo: initial.objetivo ?? "",
    abrangencia: initial.abrangencia ?? "",
    publico_alvo: initial.publico_alvo ?? "",
    perfil_foco: initial.perfil_foco ?? "",
    indicadores_satisfacao: initial.indicadores_satisfacao ?? "",
    hipoteses: initial.hipoteses ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function update(key: CampoKey, v: string) {
    setValues((p) => ({ ...p, [key]: v }));
    setSaved(false);
    setError(null);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    setError(null);
    startTransition(async () => {
      try {
        const cleaned = Object.fromEntries(
          Object.entries(values).map(([k, v]) => [k, v.trim() === "" ? null : v]),
        );
        await salvarContexto(processoId, cleaned);
        setSaved(true);
        // Atualiza o hub do processo e os contadores na sidebar sem
        // precisar de F5 manual — Janaina reclamou que precisava
        // recarregar a página pra ver os campos refletindo.
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao salvar");
      }
    });
  }

  const preenchidos = Object.values(values).filter((v) => v.trim() !== "").length;
  const total = CAMPOS.length;

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-6">
      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
        <span>
          {preenchidos}/{total} campos preenchidos
        </span>
        <span className="flex-1 h-px bg-border" />
        <span>{canEdit ? "edição liberada" : "acesso somente leitura"}</span>
      </div>

      {CAMPOS.map((f, i) => {
        const value = values[f.key];
        const isEmpty = value.trim() === "";

        return (
          <div
            key={f.key}
            className="grid grid-cols-[64px_1fr] gap-4 items-start"
          >
            <div className="flex flex-col items-center pt-1">
              <NumeroEtapa value={i + 1} size={42} tilt={(i % 2 === 0 ? -3 : 3)} />
            </div>

            <div className="flex flex-col gap-1.5 min-w-0">
              <label
                htmlFor={f.key}
                className="text-base font-semibold text-foreground"
              >
                {f.label}
              </label>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                {f.hint}
              </p>

              {canEdit ? (
                <textarea
                  id={f.key}
                  className="input-paper mt-1 font-sans"
                  rows={3}
                  value={value}
                  placeholder={f.placeholder}
                  onChange={(e) => update(f.key, e.target.value)}
                />
              ) : isEmpty ? (
                <p className="mt-1 font-hand text-base text-muted-foreground/80 italic">
                  sem dado
                </p>
              ) : (
                <p className="mt-1 whitespace-pre-wrap text-[15px] text-foreground/90 leading-relaxed border-l-2 border-accent/60 pl-3">
                  {value}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md p-3">
          {error}
        </p>
      )}
      {saved && (
        <p className="text-sm font-mono tracking-wide text-primary bg-primary/10 border border-primary/30 rounded-md p-3">
          ✓ contexto salvo.
        </p>
      )}

      <div className="flex gap-2 items-center mt-2 sticky bottom-0 bg-background/95 backdrop-blur py-3 border-t border-border">
        {canEdit && (
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-60 transition"
          >
            {isPending ? "Salvando…" : "✓ Salvar contexto"}
          </button>
        )}
        <button
          type="button"
          onClick={() => router.push(`/processos/${processoId}`)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm hover:bg-muted transition"
        >
          ← Voltar ao processo
        </button>
        {!canEdit && (
          <span className="ml-auto text-xs font-mono uppercase tracking-wider text-muted-foreground">
            visitante — fale com o gestor do órgão para editar
          </span>
        )}
      </div>
    </form>
  );
}

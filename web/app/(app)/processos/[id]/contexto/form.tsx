"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { salvarContexto } from "@/features/processes/actions";
import type { Processo } from "@/types/database";

const CAMPOS: Array<{
  key: keyof Pick<
    Processo,
    | "objetivo"
    | "abrangencia"
    | "publico_alvo"
    | "perfil_foco"
    | "indicadores_satisfacao"
    | "hipoteses"
  >;
  label: string;
  hint?: string;
}> = [
  { key: "objetivo", label: "Objetivo", hint: "Qual o propósito do serviço?" },
  { key: "abrangencia", label: "Abrangência", hint: "Federal, estadual, municipal, território coberto." },
  { key: "publico_alvo", label: "Público-alvo", hint: "Quem usa este serviço?" },
  { key: "perfil_foco", label: "Perfil foco da observação", hint: "Qual recorte de público vai ser observado?" },
  { key: "indicadores_satisfacao", label: "Indicadores e satisfação atual", hint: "Métricas, NPS, reclamações conhecidas." },
  { key: "hipoteses", label: "Hipóteses e dificuldades", hint: "O que a equipe espera encontrar?" },
];

export default function ContextoForm({
  processoId,
  initial,
}: {
  processoId: string;
  initial: Processo;
}) {
  const [values, setValues] = useState<Record<string, string>>({
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

  function update(key: string, v: string) {
    setValues((p) => ({ ...p, [key]: v }));
    setSaved(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const cleaned = Object.fromEntries(
          Object.entries(values).map(([k, v]) => [k, v.trim() === "" ? null : v]),
        );
        await salvarContexto(processoId, cleaned);
        setSaved(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao salvar");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {CAMPOS.map((f) => (
        <div key={f.key} className="flex flex-col gap-2">
          <Label htmlFor={f.key}>{f.label}</Label>
          {f.hint && <p className="text-xs text-muted-foreground">{f.hint}</p>}
          <Textarea
            id={f.key}
            value={values[f.key] ?? ""}
            onChange={(e) => update(f.key, e.target.value)}
            rows={3}
          />
        </div>
      ))}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md p-3">
          {error}
        </p>
      )}
      {saved && (
        <p className="text-sm text-green-700 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-md p-3">
          Contexto salvo.
        </p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Salvando..." : "Salvar contexto"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/processos/${processoId}`)}
          disabled={isPending}
        >
          Voltar
        </Button>
      </div>
    </form>
  );
}

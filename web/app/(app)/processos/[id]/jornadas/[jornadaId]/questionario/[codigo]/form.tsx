"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  upsertItemResposta,
  concluirQuestionario,
  reabrirQuestionario,
} from "@/features/questionnaires/actions";
import type { PerguntaComCriterio } from "@/features/questionnaires/queries";
import type { PassoComTipo } from "@/features/journeys/queries";
import type { RespostaItem } from "@/types/database";
import { BarreiraIcon } from "@/components/fcinco/barreira-icon";
import { NumeroEtapa } from "@/components/fcinco/numero-etapa";
import { StatusPill } from "@/components/fcinco/status-pill";

type ItemKey = string; // `${perguntaId}::${passoId|null}`

function keyOf(perguntaId: string, passoId: string | null): ItemKey {
  return `${perguntaId}::${passoId ?? "null"}`;
}

type LocalItem = {
  nota: number | null;
  nao_se_aplica: boolean;
  observacao: string;
  dirty: boolean;
  saving: boolean;
  saved: boolean;
};

const emptyItem = (): LocalItem => ({
  nota: null,
  nao_se_aplica: false,
  observacao: "",
  dirty: false,
  saving: false,
  saved: false,
});

export default function QuestionarioForm({
  respostaId,
  perguntas,
  passos,
  itensIniciais,
  modo,
  concluido,
  textoNotaMin,
  textoNotaMax,
}: {
  respostaId: string;
  perguntas: PerguntaComCriterio[];
  passos: PassoComTipo[];
  itensIniciais: RespostaItem[];
  modo: "matriz" | "necessidade";
  concluido: boolean;
  textoNotaMin: string;
  textoNotaMax: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [estado, setEstado] = useState<Record<ItemKey, LocalItem>>(() => {
    const init: Record<ItemKey, LocalItem> = {};
    for (const it of itensIniciais) {
      init[keyOf(it.pergunta_template_id, it.passo_jornada_id)] = {
        nota: it.nota,
        nao_se_aplica: it.nao_se_aplica,
        observacao: it.observacao_discursiva ?? "",
        dirty: false,
        saving: false,
        saved: true,
      };
    }
    return init;
  });

  const readOnly = concluido;

  function getItem(perguntaId: string, passoId: string | null): LocalItem {
    return estado[keyOf(perguntaId, passoId)] ?? emptyItem();
  }

  function setItem(perguntaId: string, passoId: string | null, partial: Partial<LocalItem>) {
    setEstado((prev) => {
      const k = keyOf(perguntaId, passoId);
      const cur = prev[k] ?? emptyItem();
      return { ...prev, [k]: { ...cur, ...partial, dirty: true, saved: false } };
    });
  }

  async function persistItem(perguntaId: string, passoId: string | null) {
    const k = keyOf(perguntaId, passoId);
    const cur = estado[k];
    if (!cur || !cur.dirty) return;

    setEstado((p) => ({ ...p, [k]: { ...cur, saving: true } }));
    try {
      await upsertItemResposta({
        questionario_resposta_id: respostaId,
        pergunta_template_id: perguntaId,
        passo_jornada_id: passoId,
        nota: cur.nao_se_aplica ? null : cur.nota,
        nao_se_aplica: cur.nao_se_aplica,
        observacao_discursiva: cur.observacao.trim() || null,
      });
      setEstado((p) => ({
        ...p,
        [k]: { ...p[k], saving: false, saved: true, dirty: false },
      }));
    } catch (err) {
      setEstado((p) => ({ ...p, [k]: { ...p[k], saving: false } }));
      alert(err instanceof Error ? err.message : "Erro ao salvar");
    }
  }

  function handleConcluir() {
    if (!confirm("Concluir o questionário? Ele ficará em modo somente leitura (você pode reabrir depois).")) return;
    startTransition(async () => {
      // garantir que todos os dirty foram persistidos antes de concluir
      const dirtyKeys = Object.entries(estado)
        .filter(([, v]) => v.dirty)
        .map(([k]) => k);
      for (const k of dirtyKeys) {
        const [perg, passo] = k.split("::");
        await persistItem(perg, passo === "null" ? null : passo);
      }
      await concluirQuestionario(respostaId);
      router.refresh();
    });
  }

  function handleReabrir() {
    startTransition(async () => {
      await reabrirQuestionario(respostaId);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border bg-muted/40 p-3">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <StatusPill tone="barreira">escala 1-5</StatusPill>
          <span className="text-muted-foreground">
            <strong>{textoNotaMin}</strong> ate <strong>{textoNotaMax}</strong>
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            N/A preserva o resultado como sem dado.
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`grid h-8 w-8 place-items-center rounded-md border font-mono text-sm font-semibold ${
                n >= 4
                  ? "border-destructive/40 bg-destructive/10 text-destructive"
                  : n === 3
                    ? "border-accent/50 bg-accent/20 text-foreground"
                    : "bg-card text-muted-foreground"
              }`}
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      {modo === "necessidade"
        ? perguntas.map((p) => {
            const it = getItem(p.id, null);
            return (
              <PerguntaBox
                key={p.id}
                pergunta={p}
                item={it}
                disabled={readOnly}
                onChangeNota={(n) => setItem(p.id, null, { nota: n })}
                onToggleNA={(v) => setItem(p.id, null, { nao_se_aplica: v })}
                onChangeObs={(s) => setItem(p.id, null, { observacao: s })}
                onBlur={() => persistItem(p.id, null)}
              />
            );
          })
        : perguntas.map((p, perguntaIndex) => (
            <details key={p.id} className="overflow-hidden rounded-lg border bg-card" open>
              <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3">
                <NumeroEtapa value={perguntaIndex + 1} size={30} tilt={-2} />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">
                    {p.criterio?.nome ? `${p.criterio.nome}: ` : ""}
                    {p.texto}
                  </span>
                  {p.criterio?.dimensao === "impacto" && (
                    <span className="text-xs capitalize text-muted-foreground">
                      {p.criterio?.subdimensao_impacto?.replace("_", " ")}
                    </span>
                  )}
                </span>
                {p.criterio?.dimensao === "barreira" && <BarreiraIcon size={22} />}
              </summary>
              <div className="divide-y border-t bg-background/60">
                {passos.map((passo) => {
                  const it = getItem(p.id, passo.id);
                  return (
                    <div key={passo.id} className="grid gap-3 px-4 py-3 lg:grid-cols-[220px_1fr]">
                      <div className="text-sm">
                        <span className="font-mono text-xs text-muted-foreground">
                          #{passo.ordem}
                        </span>{" "}
                        {passo.descricao ?? "—"}
                      </div>
                      <CompactRow
                        item={it}
                        disabled={readOnly}
                        onChangeNota={(n) => setItem(p.id, passo.id, { nota: n })}
                        onToggleNA={(v) => setItem(p.id, passo.id, { nao_se_aplica: v })}
                        onChangeObs={(s) => setItem(p.id, passo.id, { observacao: s })}
                        onBlur={() => persistItem(p.id, passo.id)}
                      />
                    </div>
                  );
                })}
              </div>
            </details>
          ))}

      <div className="sticky bottom-2 flex gap-2 rounded-md border bg-background/95 p-3 shadow-sm backdrop-blur">
        {readOnly ? (
          <Button onClick={handleReabrir} variant="outline" disabled={isPending}>
            Reabrir para edição
          </Button>
        ) : (
          <Button onClick={handleConcluir} disabled={isPending}>
            {isPending ? "Salvando..." : "Concluir questionário"}
          </Button>
        )}
      </div>
    </div>
  );
}

function PerguntaBox({
  pergunta,
  item,
  disabled,
  onChangeNota,
  onToggleNA,
  onChangeObs,
  onBlur,
}: {
  pergunta: PerguntaComCriterio;
  item: LocalItem;
  disabled: boolean;
  onChangeNota: (n: number) => void;
  onToggleNA: (v: boolean) => void;
  onChangeObs: (s: string) => void;
  onBlur: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-4">
      <div>
        <div className="font-medium">
          {pergunta.criterio?.nome ? `${pergunta.criterio.nome}: ` : ""}
          {pergunta.texto}
        </div>
      </div>
      <CompactRow
        item={item}
        disabled={disabled}
        onChangeNota={onChangeNota}
        onToggleNA={onToggleNA}
        onChangeObs={onChangeObs}
        onBlur={onBlur}
      />
    </div>
  );
}

function CompactRow({
  item,
  disabled,
  onChangeNota,
  onToggleNA,
  onChangeObs,
  onBlur,
}: {
  item: LocalItem;
  disabled: boolean;
  onChangeNota: (n: number) => void;
  onToggleNA: (v: boolean) => void;
  onChangeObs: (s: string) => void;
  onBlur: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            disabled={disabled || item.nao_se_aplica}
            onClick={() => {
              onChangeNota(n);
              onBlur();
            }}
            className={`h-8 w-8 rounded-md border font-mono text-sm font-semibold transition-colors ${
              item.nota === n && !item.nao_se_aplica
                ? n >= 4
                  ? "border-destructive bg-destructive text-destructive-foreground"
                  : "border-primary bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            } ${(disabled || item.nao_se_aplica) ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {n}
          </button>
        ))}
        <label className="flex items-center gap-1.5 text-sm ml-2 cursor-pointer">
          <input
            type="checkbox"
            checked={item.nao_se_aplica}
            disabled={disabled}
            onChange={(e) => {
              onToggleNA(e.target.checked);
              onBlur();
            }}
          />
          <span>N/A</span>
        </label>
        <SaveStatus item={item} />
      </div>
      <Textarea
        rows={2}
        placeholder="Observação (opcional)"
        disabled={disabled}
        value={item.observacao}
        onChange={(e) => onChangeObs(e.target.value)}
        onBlur={onBlur}
        className="text-sm"
      />
    </div>
  );
}

function SaveStatus({ item }: { item: LocalItem }) {
  if (item.saving) return <span className="text-xs text-muted-foreground ml-auto">salvando…</span>;
  if (item.dirty) return <span className="text-xs text-amber-600 ml-auto">não salvo</span>;
  if (item.saved) return <span className="text-xs text-green-600 ml-auto">salvo</span>;
  return null;
}

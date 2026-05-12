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
      <div className="text-xs text-muted-foreground border rounded-md p-3 bg-muted/30">
        Escala 1-5: <strong>{textoNotaMin}</strong> ↔ <strong>{textoNotaMax}</strong>.
        Marque <strong>N/A</strong> quando o critério não se aplica àquele passo.
        Salvar acontece automaticamente ao perder o foco.
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
        : perguntas.map((p) => (
            <details key={p.id} className="border rounded-lg" open>
              <summary className="px-4 py-3 font-medium cursor-pointer flex items-center justify-between">
                <span>
                  {p.criterio?.nome ? `${p.criterio.nome}: ` : ""}
                  {p.texto}
                </span>
                <span className="text-xs text-muted-foreground">
                  {p.criterio?.dimensao === "impacto" ? p.criterio?.subdimensao_impacto : ""}
                </span>
              </summary>
              <div className="border-t divide-y">
                {passos.map((passo) => {
                  const it = getItem(p.id, passo.id);
                  return (
                    <div key={passo.id} className="px-4 py-3 flex flex-col gap-2">
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

      <div className="flex gap-2 sticky bottom-2 bg-background border rounded-md p-3">
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
    <div className="border rounded-lg p-4 flex flex-col gap-3">
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
            className={`h-8 w-8 rounded-md border text-sm font-medium transition-colors ${
              item.nota === n && !item.nao_se_aplica
                ? "bg-primary text-primary-foreground border-primary"
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
  if (item.saved) return <span className="text-xs text-green-600 ml-auto">✓</span>;
  return null;
}

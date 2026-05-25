"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert } from "@/components/fcinco/alert";
import { X } from "lucide-react";
import {
  upsertItemResposta,
  concluirQuestionario,
  reabrirQuestionario,
} from "@/features/questionnaires/actions";
import { associarCriterioComPerguntaCustomizada } from "@/features/catalog/actions";
import type { PerguntaComCriterio } from "@/features/questionnaires/queries";
import type { PassoComTipo } from "@/features/journeys/queries";
import type { RespostaItem, CriterioTemplate } from "@/types/database";
import { BarreiraIcon } from "@/components/fcinco/barreira-icon";
import { NumeroEtapa } from "@/components/fcinco/numero-etapa";
import { StatusPill } from "@/components/fcinco/status-pill";

/**
 * Um "bloco" do formulário — montado server-side em page.tsx conforme
 * a dimensão do questionário.
 *
 * - `kind: 'necessidade'` — 1 só bloco com `passo: null`. As perguntas
 *   da necessidade rodam contra a jornada inteira (passo_jornada_id null).
 * - `kind: 'barreira'` — 1 bloco por passo. `perguntas` já vem filtrado
 *   pela junção `tipo_criterio` (no Streamlit original, `df_conceitos`
 *   filtrado por Categoria+Tipo). `classificado=false` quando o passo
 *   ainda não tem `tipo_comportamento_id` — a UI mostra warning e não
 *   oferece perguntas que não fariam sentido para aquele comportamento.
 * - `kind: 'impacto'` — 1 bloco por passo, todas as 3 perguntas
 *   universais (Carga Cognitiva, Emoção, Consequência) aparecem em
 *   cada passo independente do tipo.
 */
export type Bloco =
  | {
      kind: "necessidade";
      passo: null;
      perguntas: PerguntaComCriterio[];
      classificado: true;
    }
  | {
      kind: "barreira" | "impacto";
      passo: PassoComTipo;
      perguntas: PerguntaComCriterio[];
      classificado: boolean;
    };

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
  blocos,
  itensIniciais,
  concluido,
  canEdit,
  textoNotaMin,
  textoNotaMax,
  voltarHref,
  passosSemClassificacao,
  templateId,
  criteriosBarreira = [],
}: {
  respostaId: string;
  blocos: Bloco[];
  itensIniciais: RespostaItem[];
  concluido: boolean;
  canEdit: boolean;
  textoNotaMin: string;
  textoNotaMax: string;
  voltarHref: string;
  passosSemClassificacao: number;
  templateId?: string;
  criteriosBarreira?: CriterioTemplate[];
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

  const readOnly = concluido || !canEdit;

  // State control for custom barrier inline modal
  const [selectedPasso, setSelectedPasso] = useState<PassoComTipo | null>(null);
  const [selectedCriterioId, setSelectedCriterioId] = useState<string>("");
  const [customQuestionText, setCustomQuestionText] = useState<string>("");
  const [modalError, setModalError] = useState<string | null>(null);
  const [isModalPending, startModalTransition] = useTransition();

  function onAddBarrierClick(passo: PassoComTipo) {
    setSelectedPasso(passo);
    setSelectedCriterioId(criteriosBarreira[0]?.id ?? "");
    setCustomQuestionText(criteriosBarreira[0]?.pergunta_padrao ?? "");
    setModalError(null);
  }

  function handleCriterioChange(criterioId: string) {
    setSelectedCriterioId(criterioId);
    const crit = criteriosBarreira.find((c) => c.id === criterioId);
    if (crit) {
      setCustomQuestionText(crit.pergunta_padrao ?? "");
    }
  }

  function handleAddBarrierSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPasso || !selectedPasso.tipo_comportamento_id || !templateId) return;
    if (!selectedCriterioId) {
      setModalError("Selecione um critério de barreira.");
      return;
    }
    if (!customQuestionText.trim()) {
      setModalError("Digite o texto da pergunta.");
      return;
    }

    startModalTransition(async () => {
      try {
        await associarCriterioComPerguntaCustomizada({
          tipoComportamentoId: selectedPasso.tipo_comportamento_id!,
          criterioTemplateId: selectedCriterioId,
          questionarioTemplateId: templateId,
          textoPergunta: customQuestionText,
        });
        router.refresh();
        setSelectedPasso(null);
      } catch (err) {
        setModalError(err instanceof Error ? err.message : "Erro ao adicionar barreira");
      }
    });
  }

  function getItem(perguntaId: string, passoId: string | null): LocalItem {
    return estado[keyOf(perguntaId, passoId)] ?? emptyItem();
  }

  function setItem(
    perguntaId: string,
    passoId: string | null,
    partial: Partial<LocalItem>,
  ) {
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
    if (
      !confirm(
        "Concluir o questionário? Ele ficará em modo somente leitura (você pode reabrir depois).",
      )
    )
      return;
    startTransition(async () => {
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
      {/* Banner: passos sem classificação (só aparece em modo barreira) */}
      {passosSemClassificacao > 0 && (
        <Alert
          tone="warning"
          title={`${passosSemClassificacao} passo${
            passosSemClassificacao === 1 ? "" : "s"
          } sem classificação metodológica`}
          action={
            <Link href={voltarHref}>
              <Button variant="outline" size="sm">
                ← Editar jornada
              </Button>
            </Link>
          }
        >
            As perguntas de barreira dependem da categoria e do tipo de
            comportamento do passo. Classifique cada passo no editor da
            jornada para conseguir respondê-las.
        </Alert>
      )}

      {/* Legenda da escala */}
      <div className="rounded-lg border bg-muted/40 p-3">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <StatusPill tone="barreira">escala 1-5</StatusPill>
          <span className="text-muted-foreground">
            <strong>{textoNotaMin}</strong> até <strong>{textoNotaMax}</strong>
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

      {/* Blocos */}
      {blocos.map((bloco, idx) => (
        <BlocoSection
          key={
            bloco.kind === "necessidade"
              ? "necessidade"
              : `passo-${bloco.passo.id}`
          }
          bloco={bloco}
          ordem={idx + 1}
          readOnly={readOnly}
          getItem={getItem}
          setItem={setItem}
          persistItem={persistItem}
          voltarHref={voltarHref}
          onAddBarrierClick={onAddBarrierClick}
        />
      ))}

      {/* Footer de ação */}
      <div className="sticky bottom-2 flex gap-2 rounded-md border bg-background/95 p-3 shadow-sm backdrop-blur">
        {readOnly && canEdit ? (
          <Button onClick={handleReabrir} variant="outline" disabled={isPending}>
            Reabrir para edição
          </Button>
        ) : readOnly ? (
          <StatusPill tone="pendente">somente leitura</StatusPill>
        ) : (
          <Button onClick={handleConcluir} disabled={isPending}>
            {isPending ? "Salvando..." : "Concluir questionário"}
          </Button>
        )}
      </div>

      {/* Custom overlay modal for inline barrier creation */}
      {selectedPasso && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-lg border bg-card text-card-foreground p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedPasso(null)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
              <h3 className="text-lg font-semibold leading-none tracking-tight">
                Adicionar Nova Barreira ao Passo
              </h3>
              <p className="text-sm text-muted-foreground">
                Vincule um critério do catálogo e personalize a pergunta para o comportamento <strong>{selectedPasso.tipo_comportamento?.nome}</strong>.
              </p>
            </div>
            <form onSubmit={handleAddBarrierSubmit} className="space-y-4">
              {modalError && (
                <div className="p-3 text-xs bg-destructive/10 text-destructive rounded border border-destructive/20 font-medium">
                  {modalError}
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Critério de Barreira</label>
                <select
                  value={selectedCriterioId}
                  onChange={(e) => handleCriterioChange(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {criteriosBarreira.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Pergunta Personalizada</label>
                <Textarea
                  value={customQuestionText}
                  onChange={(e) => setCustomQuestionText(e.target.value)}
                  placeholder="Digite a pergunta para o questionário..."
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedPasso(null)}
                  disabled={isModalPending}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isModalPending}>
                  {isModalPending ? "Adicionando..." : "Adicionar Barreira"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function BlocoSection({
  bloco,
  ordem,
  readOnly,
  getItem,
  setItem,
  persistItem,
  voltarHref,
  onAddBarrierClick,
}: {
  bloco: Bloco;
  ordem: number;
  readOnly: boolean;
  getItem: (pid: string, passoId: string | null) => LocalItem;
  setItem: (pid: string, passoId: string | null, p: Partial<LocalItem>) => void;
  persistItem: (pid: string, passoId: string | null) => Promise<void>;
  voltarHref: string;
  onAddBarrierClick: (passo: PassoComTipo) => void;
}) {
  // Necessidade: renderiza perguntas direto, sem header de passo nem expander.
  if (bloco.kind === "necessidade") {
    return (
      <section className="flex flex-col gap-4">
        {bloco.perguntas.map((p) => {
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
        })}
      </section>
    );
  }

  // Barreira / impacto: bloco por passo
  const { passo, perguntas, classificado } = bloco;
  const tipoNome = passo.tipo_comportamento?.nome ?? null;
  const categoriaNome = passo.tipo_comportamento?.categoria?.nome ?? null;
  const respondidasNoBloco = perguntas.filter((p) => {
    const it = getItem(p.id, passo.id);
    return it.saved && (it.nota !== null || it.nao_se_aplica);
  }).length;

  return (
    <details
      className="overflow-hidden rounded-lg border bg-card"
      open={ordem === 1}
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        <NumeroEtapa value={passo.ordem} size={32} tilt={-2} />
        <span className="min-w-0 flex-1">
          <span className="block font-medium">
            {passo.descricao ?? "(passo sem descrição)"}
          </span>
          <span className="block text-xs text-muted-foreground">
            {categoriaNome && tipoNome ? (
              <>
                {categoriaNome} <span className="opacity-50">·</span> {tipoNome}
              </>
            ) : (
              <em>sem classificação metodológica</em>
            )}
          </span>
        </span>
        <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
          {classificado
            ? `${respondidasNoBloco}/${perguntas.length} respondidas`
            : "—"}
        </span>
        {bloco.kind === "barreira" && classificado && (
          <BarreiraIcon size={22} />
        )}
      </summary>


      <div className="border-t bg-background/60">
        {!classificado ? (
          <div className="flex flex-col gap-3 p-5 text-sm text-muted-foreground">
            <p>
              Este passo ainda não tem <strong>categoria</strong> e{" "}
              <strong>tipo de comportamento</strong> classificados. As
              perguntas de barreira variam conforme o tipo do comportamento —
              por isso esse passo não exibe perguntas até a classificação
              acontecer.
            </p>
            <p className="font-hand italic">
              isso espelha a planilha F5 original: cada par (Categoria, Tipo)
              tem o seu próprio conjunto de critérios-B.
            </p>
            <div>
              <Link href={voltarHref}>
                <Button variant="outline" size="sm">
                  ← Classificar passo na jornada
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {perguntas.length === 0 ? (
              <div className="p-5 text-sm text-muted-foreground">
                Nenhuma pergunta-B mapeada para este tipo de comportamento na
                planilha F5. Você pode prosseguir mesmo assim — esse passo
                entrará nos resultados apenas via as perguntas de impacto.
              </div>
            ) : (
              <div className="divide-y">
                {perguntas.map((p) => {
                  const it = getItem(p.id, passo.id);
                  return (
                    <div key={p.id} className="grid gap-3 px-4 py-3">
                      <div className="text-sm">
                        <span className="font-medium">
                          {p.criterio?.nome ? `${p.criterio.nome}: ` : ""}
                          {p.texto}
                        </span>
                        {p.criterio?.dimensao === "impacto" &&
                          p.criterio.subdimensao_impacto && (
                            <span className="ml-2 text-xs uppercase tracking-wider text-muted-foreground">
                              ({p.criterio.subdimensao_impacto.replace("_", " ")})
                            </span>
                          )}
                      </div>
                      <CompactRow
                        item={it}
                        disabled={readOnly}
                        onChangeNota={(n) => setItem(p.id, passo.id, { nota: n })}
                        onToggleNA={(v) =>
                          setItem(p.id, passo.id, { nao_se_aplica: v })
                        }
                        onChangeObs={(s) =>
                          setItem(p.id, passo.id, { observacao: s })
                        }
                        onBlur={() => persistItem(p.id, passo.id)}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {!readOnly && bloco.kind === "barreira" && (
              <div className="border-t p-4 flex justify-end bg-card/40">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onAddBarrierClick(passo)}
                >
                  + Adicionar nova barreira a este passo
                </Button>
              </div>
            )}
          </>
        )}
      </div>

    </details>
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
  if (item.saving)
    return <span className="text-xs text-muted-foreground ml-auto">salvando…</span>;
  if (item.dirty) return <span className="text-xs text-amber-600 ml-auto">não salvo</span>;
  if (item.saved) return <span className="text-xs text-green-600 ml-auto">salvo</span>;
  return null;
}

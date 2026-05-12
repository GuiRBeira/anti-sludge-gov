"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  adicionarPasso,
  atualizarPasso,
  removerPasso,
  moverPasso,
  vincularPassoPlanejado,
} from "@/features/journeys/actions";
import type { PassoComTipo, TipoComCategoria } from "@/features/journeys/queries";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import PassoScreenshot from "@/components/passo-screenshot";
import { NumeroEtapa } from "@/components/fcinco/numero-etapa";
import { StatusPill } from "@/components/fcinco/status-pill";
import { TrilhaJornada } from "@/components/fcinco/trilha-jornada";
import {
  TipoComportamentoSelect,
  SEM_TIPO,
} from "@/components/fcinco/tipo-comportamento-select";
import {
  formatTempo,
  passoToTrilhaPasso,
  totalTempoSegundos,
} from "@/components/fcinco/trilha-utils";
import { ViewToggle, type ViewMode } from "@/components/fcinco/view-toggle";

const SEM_VINCULO = "__sem_vinculo__";

export default function JornadaIndividualEditor({
  jornadaId,
  passos,
  tipos,
  passosPlanejados,
  readOnly,
}: {
  processoId: string;
  jornadaId: string;
  passos: PassoComTipo[];
  tipos: TipoComCategoria[];
  passosPlanejados: { id: string; ordem: number; descricao: string | null }[];
  readOnly: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [descricao, setDescricao] = useState("");
  const [tipoId, setTipoId] = useState<string>(SEM_TIPO);
  const [obrigatorio, setObrigatorio] = useState(true);
  const [tempo, setTempo] = useState<string>("");
  const [notas, setNotas] = useState("");
  const [view, setView] = useState<ViewMode>("trilha");

  const trilhaPassos = passos.map(passoToTrilhaPasso);
  const totalTempo = totalTempoSegundos(passos);
  const qtdDesvios = passos.filter((p) => p.eh_desvio).length;
  const qtdRepeticoes = passos.filter((p) => p.eh_repeticao).length;

  function reset() {
    setDescricao("");
    setTipoId(SEM_TIPO);
    setObrigatorio(true);
    setTempo("");
    setNotas("");
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await adicionarPasso({
          jornada_id: jornadaId,
          descricao,
          tipo_comportamento_id: tipoId === SEM_TIPO ? null : tipoId,
          obrigatorio,
          tempo_segundos: tempo.trim() ? parseInt(tempo, 10) : null,
          notas: notas.trim() || null,
        });
        reset();
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao adicionar");
      }
    });
  }

  function withTransition(fn: () => Promise<void>) {
    startTransition(async () => {
      try {
        await fn();
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro");
      }
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-lg border bg-card p-4">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div>
            <h2 className="font-medium">Caminho observado</h2>
            <div className="mt-1 flex flex-wrap gap-2">
              <StatusPill tone={passos.length > 0 ? "em_progresso" : "pendente"}>
                {passos.length} passos
              </StatusPill>
              <StatusPill tone="desvio">{qtdDesvios} desvios</StatusPill>
              <StatusPill tone="repeticao">{qtdRepeticoes} repeticoes</StatusPill>
              <StatusPill tone="print">{formatTempo(totalTempo)}</StatusPill>
            </div>
          </div>
          <div className="ml-auto">
            <ViewToggle value={view} onChange={setView} />
          </div>
        </div>

        {view === "trilha" ? (
          <TrilhaJornada
            passos={trilhaPassos}
            mode="individual"
            replayState={
              passos.length > 0
                ? { activeIndex: passos.length - 1, progressPct: 100 }
                : null
            }
            compact={passos.length > 7}
          />
        ) : (
          <div className="overflow-x-auto rounded-md border">
            <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria · Tipo</TableHead>
              <TableHead className="w-44">Vinculado a</TableHead>
              <TableHead className="w-28">Tempo (s)</TableHead>
              <TableHead className="w-16">Print</TableHead>
              <TableHead className="w-32">Marcações</TableHead>
              {!readOnly && <TableHead className="w-32">Ações</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {passos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={readOnly ? 7 : 8} className="text-center py-8 text-muted-foreground">
                  Nenhum passo. Use o formulário abaixo para adicionar.
                </TableCell>
              </TableRow>
            ) : (
              passos.map((p, i) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono">{p.ordem}</TableCell>
                  <TableCell>
                    <div className="font-medium">{p.descricao ?? "—"}</div>
                    {p.notas && (
                      <div className="text-xs text-muted-foreground mt-1">{p.notas}</div>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {p.tipo_comportamento ? (
                      <>
                        <div className="text-muted-foreground text-xs">
                          {p.tipo_comportamento.categoria?.nome}
                        </div>
                        <div>{p.tipo_comportamento.nome}</div>
                      </>
                    ) : (
                      <span className="text-muted-foreground italic">não classificado</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {readOnly ? (
                      <span className="text-xs text-muted-foreground">
                        {passosPlanejados.find((pp) => pp.id === p.passo_planejado_id)?.descricao ?? "—"}
                      </span>
                    ) : (
                      <Select
                        value={p.passo_planejado_id ?? SEM_VINCULO}
                        onValueChange={(v) =>
                          withTransition(async () =>
                            vincularPassoPlanejado(p.id, v === SEM_VINCULO ? null : v),
                          )
                        }
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="—" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={SEM_VINCULO}>— sem vínculo —</SelectItem>
                          {passosPlanejados.map((pp) => (
                            <SelectItem key={pp.id} value={pp.id}>
                              #{pp.ordem} · {(pp.descricao ?? "").slice(0, 40)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">{p.tempo_segundos ?? "—"}</TableCell>
                  <TableCell>
                    <PassoScreenshot
                      jornadaId={jornadaId}
                      passoId={p.id}
                      initialPath={p.screenshot_path}
                      disabled={readOnly}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1.5">
                      <button
                        type="button"
                        disabled={readOnly || isPending}
                        onClick={() =>
                          withTransition(async () =>
                            atualizarPasso(p.id, { eh_desvio: !p.eh_desvio }),
                          )
                        }
                        aria-pressed={p.eh_desvio}
                        title={p.eh_desvio ? "Remover marcação de desvio" : "Marcar como desvio do planejado"}
                        className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 ${
                          p.eh_desvio
                            ? "border-[hsl(var(--desvio)/0.4)] bg-[hsl(var(--desvio)/0.15)] text-[hsl(var(--desvio))]"
                            : "border-transparent bg-muted text-muted-foreground hover:border-border"
                        } ${readOnly ? "cursor-not-allowed" : ""}`}
                      >
                        {p.eh_desvio ? "✓ desvio" : "desvio"}
                      </button>
                      <button
                        type="button"
                        disabled={readOnly || isPending}
                        onClick={() =>
                          withTransition(async () =>
                            atualizarPasso(p.id, { eh_repeticao: !p.eh_repeticao }),
                          )
                        }
                        aria-pressed={p.eh_repeticao}
                        title={p.eh_repeticao ? "Remover marcação de repetição" : "Marcar como passo repetido"}
                        className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 ${
                          p.eh_repeticao
                            ? "border-[hsl(var(--repeticao)/0.4)] bg-[hsl(var(--repeticao)/0.15)] text-[hsl(var(--repeticao))]"
                            : "border-transparent bg-muted text-muted-foreground hover:border-border"
                        } ${readOnly ? "cursor-not-allowed" : ""}`}
                      >
                        {p.eh_repeticao ? "✓ repetição" : "repetição"}
                      </button>
                    </div>
                  </TableCell>
                  {!readOnly && (
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          disabled={isPending || i === 0}
                          onClick={() => withTransition(async () => moverPasso(p.id, -1))}
                          title="Mover para cima"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          disabled={isPending || i === passos.length - 1}
                          onClick={() => withTransition(async () => moverPasso(p.id, 1))}
                          title="Mover para baixo"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          disabled={isPending}
                          onClick={() => {
                            if (!confirm("Remover este passo?")) return;
                            withTransition(async () => removerPasso(p.id));
                          }}
                          title="Remover"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
            </Table>
          </div>
        )}
      </section>

      {!readOnly && (
        <form onSubmit={handleAdd} className="flex flex-col gap-4 rounded-lg border bg-card p-5">
          <div className="flex items-center gap-3">
            <NumeroEtapa value={passos.length + 1} size={42} tilt={-3} />
            <div>
              <h2 className="font-medium">Adicionar passo observado</h2>
              <p className="text-xs text-muted-foreground">
                Próxima evidência da jornada real deste participante.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="descricao">Descrição do que aconteceu</Label>
            <Input
              id="descricao"
              required
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: tentou clicar no menu mas não encontrou"
              className="input-paper"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <Label htmlFor="tipo">Categoria · Tipo de comportamento</Label>
              <TipoComportamentoSelect
                id="tipo"
                value={tipoId}
                onChange={setTipoId}
                tipos={tipos}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tempo">Tempo real (segundos)</Label>
              <Input
                id="tempo"
                type="number"
                min={0}
                value={tempo}
                onChange={(e) => setTempo(e.target.value)}
                className="input-paper"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="obrigatorio"
              type="checkbox"
              checked={obrigatorio}
              onChange={(e) => setObrigatorio(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="obrigatorio" className="cursor-pointer">
              Passo obrigatório
            </Label>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="notas">Notas / observações</Label>
            <Textarea
              id="notas"
              rows={2}
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              className="input-paper"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md p-3">
              {error}
            </p>
          )}

          <div>
            <Button type="submit" disabled={isPending || !descricao.trim()}>
              {isPending ? "Salvando..." : "Adicionar passo"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

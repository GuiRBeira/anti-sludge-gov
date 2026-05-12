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
} from "@/features/journeys/actions";
import type { PassoComTipo, TipoComCategoria } from "@/features/journeys/queries";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import PassoScreenshot from "@/components/passo-screenshot";
import { StatusPill } from "@/components/fcinco/status-pill";
import { TrilhaJornada } from "@/components/fcinco/trilha-jornada";
import {
  formatTempo,
  passoToTrilhaPasso,
  totalTempoSegundos,
} from "@/components/fcinco/trilha-utils";
import { ViewToggle, type ViewMode } from "@/components/fcinco/view-toggle";

const SEM_TIPO = "__sem_tipo__";

export default function JornadaPlanejadaEditor({
  jornadaId,
  passos,
  tipos,
}: {
  jornadaId: string;
  passos: PassoComTipo[];
  tipos: TipoComCategoria[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // form de novo passo
  const [descricao, setDescricao] = useState("");
  const [tipoId, setTipoId] = useState<string>(SEM_TIPO);
  const [obrigatorio, setObrigatorio] = useState(true);
  const [tempo, setTempo] = useState<string>("");
  const [notas, setNotas] = useState("");
  const [view, setView] = useState<ViewMode>("trilha");

  const trilhaPassos = passos.map(passoToTrilhaPasso);
  const totalTempo = totalTempoSegundos(passos);

  function resetForm() {
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
        resetForm();
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao adicionar passo");
      }
    });
  }

  function handleRemove(passoId: string) {
    if (!confirm("Remover este passo?")) return;
    startTransition(async () => {
      try {
        await removerPasso(passoId);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao remover");
      }
    });
  }

  function handleMove(passoId: string, delta: 1 | -1) {
    startTransition(async () => {
      try {
        await moverPasso(passoId, delta);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao mover");
      }
    });
  }

  function handleToggleObrigatorio(passoId: string, atual: boolean) {
    startTransition(async () => {
      try {
        await atualizarPasso(passoId, { obrigatorio: !atual });
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao salvar");
      }
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-lg border bg-card p-4">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div>
            <h2 className="font-medium">Mapa da jornada</h2>
            <div className="mt-1 flex flex-wrap gap-2">
              <StatusPill tone={passos.length > 0 ? "em_progresso" : "pendente"}>
                {passos.length} passos
              </StatusPill>
              <StatusPill tone="print">
                {formatTempo(totalTempo)}
              </StatusPill>
            </div>
          </div>
          <div className="ml-auto">
            <ViewToggle value={view} onChange={setView} />
          </div>
        </div>

        {view === "trilha" ? (
          <TrilhaJornada passos={trilhaPassos} mode="planejada" compact={passos.length > 7} />
        ) : (
          <div className="overflow-x-auto rounded-md border">
            <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria · Tipo</TableHead>
              <TableHead className="w-24">Obrig.</TableHead>
              <TableHead className="w-24">Tempo (s)</TableHead>
              <TableHead className="w-16">Print</TableHead>
              <TableHead className="w-32">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {passos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Nenhum passo. Use o formulário abaixo para começar.
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
                    <button
                      type="button"
                      onClick={() => handleToggleObrigatorio(p.id, p.obrigatorio)}
                      disabled={isPending}
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        p.obrigatorio
                          ? "bg-blue-100 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {p.obrigatorio ? "obrigatório" : "opcional"}
                    </button>
                  </TableCell>
                  <TableCell className="text-sm">
                    {p.tempo_segundos ?? "—"}
                  </TableCell>
                  <TableCell>
                    <PassoScreenshot
                      jornadaId={jornadaId}
                      passoId={p.id}
                      initialPath={p.screenshot_path}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={isPending || i === 0}
                        onClick={() => handleMove(p.id, -1)}
                        title="Mover para cima"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={isPending || i === passos.length - 1}
                        onClick={() => handleMove(p.id, 1)}
                        title="Mover para baixo"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={isPending}
                        onClick={() => handleRemove(p.id)}
                        title="Remover"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
            </Table>
          </div>
        )}
      </section>

      <form onSubmit={handleAdd} className="flex flex-col gap-4 rounded-lg border bg-card p-5">
        <h2 className="font-medium">Adicionar passo</h2>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="descricao">Descrição do passo</Label>
          <Input
            id="descricao"
            required
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Acessar o portal e fazer login com gov.br"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <Label htmlFor="tipo">Categoria · Tipo de comportamento</Label>
            <Select value={tipoId} onValueChange={setTipoId}>
              <SelectTrigger id="tipo">
                <SelectValue placeholder="Selecione (opcional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SEM_TIPO}>— sem classificação —</SelectItem>
                {tipos.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.categoria?.nome} · {t.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tempo">Tempo estimado (segundos)</Label>
            <Input
              id="tempo"
              type="number"
              min={0}
              value={tempo}
              onChange={(e) => setTempo(e.target.value)}
              placeholder="Ex: 30"
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
            Passo obrigatório na jornada
          </Label>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="notas">Notas (opcional)</Label>
          <Textarea
            id="notas"
            rows={2}
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
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
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { editarProcessoMeta } from "@/features/processes/actions";
import type { Orgao, Processo } from "@/types/database";

export default function EditarProcessoMetaForm({
  processoId,
  initial,
  orgaos,
}: {
  processoId: string;
  initial: Processo;
  orgaos: Orgao[];
}) {
  const router = useRouter();
  const [orgaoId, setOrgaoId] = useState<string>(initial.orgao_id);
  const [nome, setNome] = useState<string>(initial.nome);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [isPending, startTransition] = useTransition();

  const naoMudou = nome.trim() === initial.nome && orgaoId === initial.orgao_id;
  const orgaoAtualNaLista = orgaos.some((o) => o.id === orgaoId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await editarProcessoMeta(processoId, { orgao_id: orgaoId, nome });
        setSavedAt(new Date());
        // Reflete imediatamente sem refresh manual: revalidatePath no servidor
        // + router.refresh() aqui forçam Server Components a re-fetchar.
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao salvar");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-6 rounded-lg border bg-card p-6"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Nome do processo</Label>
        <p className="text-xs text-muted-foreground">
          Como o processo aparece em listas e relatórios. Mude apenas se a
          equipe concordar — esse nome vai em PDFs e exports.
        </p>
        <Input
          id="nome"
          required
          minLength={2}
          maxLength={300}
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            setSavedAt(null);
          }}
          placeholder="Ex.: Solicitar auxílio-doença"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="orgao">Órgão responsável</Label>
        <p className="text-xs text-muted-foreground">
          Define quem da equipe (gestor/analista) consegue editar este
          processo. Mover entre órgãos é raro — confirme com a coordenação
          antes.
        </p>
        <Select value={orgaoId} onValueChange={(v) => { setOrgaoId(v); setSavedAt(null); }}>
          <SelectTrigger id="orgao">
            <SelectValue placeholder="Selecione o órgão" />
          </SelectTrigger>
          <SelectContent>
            {orgaos.map((o) => (
              <SelectItem key={o.id} value={o.id}>
                {o.sigla} — {o.nome}
              </SelectItem>
            ))}
            {!orgaoAtualNaLista && (
              // Órgão atual fora do escopo do gestor — mantém visível mas
              // sem permitir reescolha (Select desabilitaria todas as outras).
              <SelectItem value={orgaoId} disabled>
                (órgão atual fora do seu escopo)
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {error}
        </p>
      )}
      {savedAt && !error && (
        <p className="rounded-md border border-primary/30 bg-primary/10 p-3 text-sm font-mono tracking-wide text-primary">
          ✓ metadata salva às {savedAt.toLocaleTimeString("pt-BR")}
        </p>
      )}

      <div className="flex flex-wrap gap-2 border-t border-border pt-4">
        <Button type="submit" disabled={isPending || naoMudou || !nome.trim()}>
          {isPending ? "Salvando…" : "Salvar alterações"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/processos/${processoId}`)}
          disabled={isPending}
        >
          ← Voltar ao processo
        </Button>
      </div>
    </form>
  );
}

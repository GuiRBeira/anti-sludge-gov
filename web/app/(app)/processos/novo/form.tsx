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
import { criarProcesso } from "@/features/processes/actions";
import type { Orgao } from "@/types/database";

export default function NovoProcessoForm({ orgaos }: { orgaos: Orgao[] }) {
  const [orgaoId, setOrgaoId] = useState<string>(orgaos[0]?.id ?? "");
  const [nome, setNome] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await criarProcesso({ orgao_id: orgaoId, nome });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erro ao criar processo";
        setError(msg);
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="orgao">Órgão</Label>
        <Select value={orgaoId} onValueChange={setOrgaoId}>
          <SelectTrigger id="orgao">
            <SelectValue placeholder="Selecione o órgão" />
          </SelectTrigger>
          <SelectContent>
            {orgaos.map((o) => (
              <SelectItem key={o.id} value={o.id}>
                {o.sigla} — {o.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Nome do processo</Label>
        <Input
          id="nome"
          required
          minLength={2}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Solicitar auxílio-doença"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md p-3">
          {error}
        </p>
      )}

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={isPending || !orgaoId || !nome.trim()}>
          {isPending ? "Salvando..." : "Criar processo"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}

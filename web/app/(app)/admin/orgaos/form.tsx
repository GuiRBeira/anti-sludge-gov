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
import { criarOrgao } from "@/features/orgs/actions";
import type { EsferaGovernamental } from "@/types/database";

export default function NovoOrgaoForm() {
  const [nome, setNome] = useState("");
  const [sigla, setSigla] = useState("");
  const [esfera, setEsfera] = useState<EsferaGovernamental>("federal");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await criarOrgao({ nome, sigla, esfera });
        setNome("");
        setSigla("");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao criar órgão");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="border rounded-lg p-5 flex flex-col gap-4">
      <h2 className="font-medium">Novo órgão</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sigla">Sigla</Label>
          <Input
            id="sigla"
            required
            maxLength={20}
            value={sigla}
            onChange={(e) => setSigla(e.target.value)}
            placeholder="MGI"
          />
        </div>
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ministério da Gestão e da Inovação em Serviços Públicos"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="esfera">Esfera</Label>
        <Select value={esfera} onValueChange={(v) => setEsfera(v as EsferaGovernamental)}>
          <SelectTrigger id="esfera" className="md:max-w-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="federal">Federal</SelectItem>
            <SelectItem value="estadual">Estadual</SelectItem>
            <SelectItem value="municipal">Municipal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md p-3">
          {error}
        </p>
      )}

      <div>
        <Button type="submit" disabled={isPending || !nome.trim() || !sigla.trim()}>
          {isPending ? "Salvando..." : "Criar órgão"}
        </Button>
      </div>
    </form>
  );
}

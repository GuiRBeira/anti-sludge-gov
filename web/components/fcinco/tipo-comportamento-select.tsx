"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Loader2 } from "lucide-react";
import { criarTipoComportamento } from "@/features/catalog/actions";
import type { TipoComCategoria } from "@/features/journeys/queries";

export const SEM_TIPO = "__sem_tipo__";

/**
 * Select de Tipo de Comportamento — agrupado visualmente por categoria F5.
 * Permite também a criação de novos comportamentos via modal.
 */
export function TipoComportamentoSelect({
  id,
  value,
  onChange,
  tipos,
  disabled,
  placeholder = "Selecione (opcional)",
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  tipos: TipoComCategoria[];
  disabled?: boolean;
  placeholder?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Dialog form state
  const [categoriaId, setCategoriaId] = useState("");
  const [nome, setNome] = useState("");
  const [conceito, setConceito] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Agrupa em ordem original (já está ordenada por categoria.ordem).
  const groups: Array<{ categoria: string; items: TipoComCategoria[] }> = [];
  for (const t of tipos) {
    const nomeCat = t.categoria?.nome ?? "Sem categoria";
    const last = groups[groups.length - 1];
    if (last && last.categoria === nomeCat) {
      last.items.push(t);
    } else {
      groups.push({ categoria: nomeCat, items: [t] });
    }
  }

  // Extract unique categories for the creation form
  const categoriasMap = new Map<string, { id: string; nome: string }>();
  for (const t of tipos) {
    if (t.categoria?.id && t.categoria?.nome) {
      categoriasMap.set(t.categoria.id, {
        id: t.categoria.id,
        nome: t.categoria.nome,
      });
    }
  }
  const categorias = Array.from(categoriasMap.values());

  function handleOpenDialog() {
    setError(null);
    setNome("");
    setConceito("");
    // Default to the first category if available
    setCategoriaId(categorias[0]?.id ?? "");
    setShowAddDialog(true);
  }

  function handleCreateBehavior(e: React.FormEvent) {
    e.preventDefault();
    if (!categoriaId) {
      setError("Selecione uma categoria F5.");
      return;
    }
    if (!nome.trim()) {
      setError("Digite o nome do comportamento.");
      return;
    }

    startTransition(async () => {
      try {
        const newBehavior = await criarTipoComportamento({
          categoriaId,
          nome,
          conceito,
        });
        router.refresh();
        onChange(newBehavior.id);
        setShowAddDialog(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao criar comportamento");
      }
    });
  }

  return (
    <>
      <div className="flex gap-2 items-center w-full">
        <div className="flex-1">
          <Select value={value} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger id={id}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="max-h-[420px]">
              <SelectItem value={SEM_TIPO}>— sem classificação —</SelectItem>
              {groups.map((g) => (
                <SelectGroup key={g.categoria}>
                  <SelectSeparator />
                  <SelectLabel>{g.categoria}</SelectLabel>
                  {g.items.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
        {!disabled && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleOpenDialog}
            title="Criar novo comportamento"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Custom overlay modal with sleek dark/glassmorphic styling */}
      {showAddDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-lg border bg-card text-card-foreground p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowAddDialog(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
              <h3 className="text-lg font-semibold leading-none tracking-tight">
                Novo Tipo de Comportamento
              </h3>
              <p className="text-sm text-muted-foreground">
                Cadastre um comportamento personalizado para a metodologia F5.
              </p>
            </div>
            <form onSubmit={handleCreateBehavior} className="space-y-4">
              {error && (
                <div className="p-3 text-xs bg-destructive/10 text-destructive rounded border border-destructive/20 font-medium">
                  {error}
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="new-categoria">Categoria F5</Label>
                <Select value={categoriaId} onValueChange={setCategoriaId}>
                  <SelectTrigger id="new-categoria" className="w-full">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-nome">Nome do comportamento</Label>
                <Input
                  id="new-nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Preencher formulário de cadastro longo"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-conceito">Conceito / Descrição (Opcional)</Label>
                <Textarea
                  id="new-conceito"
                  value={conceito}
                  onChange={(e) => setConceito(e.target.value)}
                  placeholder="Definição metodológica deste comportamento..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                  disabled={isPending}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Criar Comportamento
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// apps/web/features/processes/components/EtapaModal.tsx
"use client";

import React, { useState } from "react";
import { Clock, Layers, Save } from "lucide-react";
import { Etapa } from "../api/processService";
import {
  useCreateEtapaMutation,
  useUpdateEtapaMutation,
} from "../api/useProcessQueries";
import {
  useCategorias,
  useTiposComportamento,
} from "@/features/catalog/api/useCatalogQueries";

// shadcn/ui components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface EtapaModalProps {
  processoId: number;
  initialData?: Etapa;
  onClose: () => void;
}

export function EtapaModal({
  processoId,
  initialData,
  onClose,
}: EtapaModalProps) {
  const isEditing = !!initialData;
  const createMutation = useCreateEtapaMutation();
  const updateMutation = useUpdateEtapaMutation();

  const { data: categorias = [] } = useCategorias();
  const { data: tiposComportamento = [] } = useTiposComportamento();

  const [formData, setFormData] = useState({
    processo_id: initialData?.processo_id || processoId,
    comportamento: initialData?.comportamento || "",
    ordem: initialData?.ordem || 1,
    categoria_id: initialData?.categoria_id || 0,
    tipo_comportamento_id: initialData?.tipo_comportamento_id || 0,
    e_obrigatorio: initialData?.e_obrigatorio || false,
    tempo_planejado: initialData?.tempo_planejado || "00:05:00",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && initialData) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          data: formData,
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] p-8 overflow-hidden flex flex-col max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary rounded-xl text-white">
              <Layers size={20} />
            </div>
            <div className="space-y-0.5">
              <DialogTitle className="text-2xl font-black tracking-tighter uppercase leading-none">
                {isEditing ? "Editar Etapa" : "Nova Etapa"}
              </DialogTitle>
              <DialogDescription className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Mapeamento de Fluxo Operacional
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 py-4 overflow-y-auto pr-2"
        >
          <div className="space-y-2">
            <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Comportamento (O que o usuário faz?)
            </Label>
            <Input
              required
              placeholder="Ex: Realizar login no portal gov.br"
              className="h-12 rounded-xl bg-slate-50 border-none font-medium focus-visible:ring-primary"
              value={formData.comportamento}
              onChange={(e) =>
                setFormData({ ...formData, comportamento: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Ordem no Fluxo
              </Label>
              <Input
                type="number"
                required
                className="h-12 rounded-xl bg-slate-50 border-none font-medium focus-visible:ring-primary"
                value={formData.ordem}
                onChange={(e) =>
                  setFormData({ ...formData, ordem: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Tempo Planejado (HH:MM:SS)
              </Label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  className="h-12 pl-11 rounded-xl bg-slate-50 border-none font-medium focus-visible:ring-primary"
                  placeholder="00:05:00"
                  value={formData.tempo_planejado}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tempo_planejado: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Categoria de Sludge
              </Label>
              <Select
                value={formData.categoria_id.toString()}
                onValueChange={(val) =>
                  setFormData({ ...formData, categoria_id: Number(val) })
                }
              >
                <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-medium focus:ring-primary">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl">
                  {categorias.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Tipo de Comportamento
              </Label>
              <Select
                disabled={!formData.categoria_id}
                value={formData.tipo_comportamento_id.toString()}
                onValueChange={(val) =>
                  setFormData({
                    ...formData,
                    tipo_comportamento_id: Number(val),
                  })
                }
              >
                <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-medium focus:ring-primary">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl">
                  {tiposComportamento
                    .filter(
                      (t) =>
                        !formData.categoria_id ||
                        t.categoria_id === formData.categoria_id,
                    )
                    .map((tipo) => (
                      <SelectItem key={tipo.id} value={tipo.id.toString()}>
                        {tipo.nome}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-slate-100/50">
            <div className="space-y-0.5">
              <Label
                htmlFor="e_obrigatorio"
                className="text-sm font-bold text-slate-900 cursor-pointer"
              >
                Etapa Obrigatória
              </Label>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-tight">
                O cidadão não pode pular este passo
              </p>
            </div>
            <Switch
              id="e_obrigatorio"
              checked={formData.e_obrigatorio}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, e_obrigatorio: checked })
              }
            />
          </div>

          <DialogFooter className="pt-6 gap-3 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="rounded-xl font-bold h-12 px-6"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="rounded-xl font-bold h-12 px-8 shadow-lg shadow-primary/20 gap-2"
            >
              <Save size={18} />
              {isEditing ? "Salvar Alterações" : "Mapear Etapa"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

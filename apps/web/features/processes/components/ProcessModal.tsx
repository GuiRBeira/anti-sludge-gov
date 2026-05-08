// apps/web/features/processes/components/ProcessModal.tsx
"use client";

import React, { useState } from "react";
import { Globe } from "lucide-react";
import { EsferaGoverno, Abrangencia, Processo } from "../api/processService";
import {
  useCreateProcessMutation,
  useUpdateProcessMutation,
} from "../api/useProcessQueries";

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

import { useAuth } from "@/features/auth/context/AuthContext";
import { cn } from "@/lib/utils";

interface ProcessModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  initialData?: Processo;
}

export function ProcessModal({
  onClose,
  onSuccess,
  initialData,
}: ProcessModalProps) {
  const { canApprove } = useAuth();
  const isEdit = !!initialData;
  const createMutation = useCreateProcessMutation();
  const updateMutation = useUpdateProcessMutation();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const [formData, setFormData] = useState({
    nome: initialData?.nome || "",
    descricao: initialData?.descricao || "",
    objetivo: initialData?.objetivo || "",
    esfera_governo: initialData?.esfera_governo || EsferaGoverno.FEDERAL,
    abrangencia: initialData?.abrangencia || Abrangencia.PUBLICO_GERAL,
    publico_alvo: initialData?.publico_alvo || "",
    usuarios_estimados_ano: Math.max(0, initialData?.usuarios_estimados_ano || 0),
    status: initialData?.status || "Em Análise",
    padrao_url: initialData?.padrao_url || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && initialData) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          data: formData,
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
      onSuccess?.();
      onClose();
    } catch (err) {
      // Erro tratado no mutation
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-8 overflow-hidden flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-tighter uppercase">
            {isEdit ? "Editar Processo" : "Novo Processo"}
          </DialogTitle>
          <DialogDescription className="font-medium text-slate-500">
            {isEdit
              ? "Atualize as informações do processo mapeado."
              : "Preencha os dados básicos para iniciar o mapeamento de sludge."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 py-4 overflow-y-auto pr-2"
        >
          <div className="space-y-2">
            <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Nome do Processo
            </Label>
            <Input
              placeholder="Ex: Cadastro de Artesão"
              className="h-12 rounded-xl bg-slate-50 border-none font-medium focus-visible:ring-primary"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Descrição
            </Label>
            <Input
              placeholder="Breve descrição do processo"
              className="h-12 rounded-xl bg-slate-50 border-none font-medium focus-visible:ring-primary"
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Esfera
              </Label>
              <Select
                value={formData.esfera_governo}
                onValueChange={(val) =>
                  setFormData({
                    ...formData,
                    esfera_governo: val as EsferaGoverno,
                  })
                }
              >
                <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-medium focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl">
                  <SelectItem value={EsferaGoverno.FEDERAL}>Federal</SelectItem>
                  <SelectItem value={EsferaGoverno.ESTADUAL}>
                    Estadual
                  </SelectItem>
                  <SelectItem value={EsferaGoverno.MUNICIPAL}>
                    Municipal
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
            <div className="space-y-2">
              <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Status
              </Label>
              <Select
                value={formData.status}
                disabled={!canApprove}
                onValueChange={(val) =>
                  setFormData({ ...formData, status: val || "" })
                }
              >
                <SelectTrigger className={cn(
                  "h-12 rounded-xl border-none font-medium focus:ring-primary",
                  !canApprove ? "bg-slate-100 opacity-70" : "bg-slate-50"
                )}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl">
                  <SelectItem value="Em Análise">Em Análise</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                  <SelectItem value="Crítico">Crítico</SelectItem>
                </SelectContent>
              </Select>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Validação Técnica</h3>
              </div>
              <div className="space-y-2">
                <Label htmlFor="padrao_url" className="text-xs font-black uppercase tracking-widest text-slate-500">Domínio ou URL Base para Validação</Label>
                <Input
                  id="padrao_url"
                  placeholder="Ex: detran.sp.gov.br"
                  className="rounded-xl border-slate-200 focus:ring-primary/20"
                  value={formData.padrao_url}
                  onChange={(e) => setFormData({ ...formData, padrao_url: e.target.value })}
                />
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                  A extensão usará este padrão para validar se a jornada capturada pertence a este processo.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Abrangência
            </Label>
            <Select
              value={formData.abrangencia}
              onValueChange={(val) =>
                setFormData({ ...formData, abrangencia: val as Abrangencia })
              }
            >
              <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-medium focus:ring-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-xl">
                <SelectItem value={Abrangencia.PUBLICO_GERAL}>
                  Público Geral
                </SelectItem>
                <SelectItem value={Abrangencia.PUBLICO_ESPECIFICO}>
                  Público Específico
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Objetivo
            </Label>
            <Input
              placeholder="Qual o objetivo deste processo?"
              className="h-12 rounded-xl bg-slate-50 border-none font-medium focus-visible:ring-primary"
              value={formData.objetivo}
              onChange={(e) =>
                setFormData({ ...formData, objetivo: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Público Alvo
            </Label>
            <Input
              placeholder="Quem utiliza este serviço?"
              className="h-12 rounded-xl bg-slate-50 border-none font-medium focus-visible:ring-primary"
              value={formData.publico_alvo}
              onChange={(e) =>
                setFormData({ ...formData, publico_alvo: e.target.value })
              }
            />
          </div>

          <DialogFooter className="pt-6 gap-3 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              className="rounded-xl font-bold h-12 px-6"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="rounded-xl font-bold h-12 px-8 shadow-lg shadow-primary/20"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Processando..."
                : isEdit
                  ? "Salvar Alterações"
                  : "Criar Processo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

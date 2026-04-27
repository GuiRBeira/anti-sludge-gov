// apps/web/features/analysis/components/AddCriterionModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  analysisService,
  CriterioTemplate,
} from "@/features/analysis/api/analysisService";
import { Info, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

interface AddCriterionModalProps {
  isOpen: boolean;
  onClose: () => void;
  etapaId: number;
  etapaNome: string;
  onSuccess: () => void;
}

export function AddCriterionModal({
  isOpen,
  onClose,
  etapaId,
  etapaNome,
  onSuccess,
}: AddCriterionModalProps) {
  const [templates, setTemplates] = useState<CriterioTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      async function load() {
        setLoading(true);
        try {
          const res = await analysisService.getAllowedCriteria(etapaId);
          setTemplates(res);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
      load();
    } else {
      setSelectedTemplate("");
    }
  }, [isOpen, etapaId]);

  const handleSave = async () => {
    if (!selectedTemplate) return;

    setSubmitting(true);
    try {
      const template = templates.find((t) => t.id === Number(selectedTemplate));
      if (!template) return;

      await analysisService.createCriterio({
        etapa_id: etapaId,
        criterio_template_id: template.id,
        nome: template.nome,
        pergunta: `Avalie o nível de ${template.nome} nesta etapa.`,
        texto_nota_1: "Péssimo",
        texto_nota_5: "Excelente",
        ordem: 1,
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedTemplateData = templates.find(
    (t) => t.id === Number(selectedTemplate),
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px] rounded-[2.5rem] p-8 overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              <CheckCircle2 size={20} />
            </div>
            <div className="space-y-0.5">
              <DialogTitle className="text-2xl font-black tracking-tighter uppercase leading-none">
                Critério Metodológico
              </DialogTitle>
              <DialogDescription className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Etapa: {etapaNome}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100 flex gap-3">
            <Info className="text-blue-500 shrink-0" size={18} />
            <p className="text-xs text-blue-700 font-bold leading-relaxed uppercase tracking-tight">
              A lista abaixo foi filtrada automaticamente baseada no
              comportamento desta etapa (Metodologia F5).
            </p>
          </div>

          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  Selecione o Critério
                </Label>
                <Select
                  value={selectedTemplate}
                  onValueChange={(val) => setSelectedTemplate(val || "")}
                >
                  <SelectTrigger className="h-14 rounded-xl bg-slate-50 border-none font-bold text-slate-900 focus:ring-primary">
                    <SelectValue placeholder="Escolha um critério para auditoria..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl shadow-xl border-slate-100">
                    {templates.map((t) => (
                      <SelectItem
                        key={t.id}
                        value={t.id.toString()}
                        className="font-medium"
                      >
                        {t.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <AnimatePresence>
                {selectedTemplateData && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2"
                  >
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <AlertCircle size={14} className="text-primary" />
                      Conceito Aplicado
                    </h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                      &quot;{selectedTemplateData.conceito}&quot;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        <DialogFooter className="pt-6 gap-3 sm:gap-0">
          <Button
            variant="ghost"
            onClick={onClose}
            className="rounded-xl font-bold h-12 px-6"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedTemplate || submitting}
            className="rounded-xl font-bold h-12 px-8 shadow-lg shadow-primary/20"
          >
            {submitting ? "Vinculando..." : "Confirmar Vínculo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

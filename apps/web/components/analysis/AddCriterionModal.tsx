// apps/web/components/analysis/AddCriterionModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { GovModal, GovButton, GovSelect, GovInput } from "@/components/gov";
import { analysisService, CriterioTemplate } from "@/services/analysis-service";
import { Info, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface AddCriterionModalProps {
  isOpen: boolean;
  onClose: () => void;
  etapaId: number;
  etapaNome: string;
  onSuccess: () => void;
}

export function AddCriterionModal({ isOpen, onClose, etapaId, etapaNome, onSuccess }: AddCriterionModalProps) {
  const [templates, setTemplates] = useState<CriterioTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | "">("");
  const [comment, setComment] = useState("");

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
      setComment("");
    }
  }, [isOpen, etapaId]);

  const handleSave = async () => {
    if (!selectedTemplate) return;

    setSubmitting(true);
    try {
      const template = templates.find(t => t.id === Number(selectedTemplate));
      if (!template) return;

      // Chama a API do backend para criar o critério na etapa
      // Nota: No nosso backend atual, a criação de CriterioBarreira pede nome, pergunta e notas.
      // Aqui estamos simplificando usando os dados do template.
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analysis_results/criterios-barreira`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          etapa_id: etapaId,
          criterio_template_id: template.id,
          nome: template.nome,
          pergunta: `Avalie o nível de ${template.nome} nesta etapa.`,
          texto_nota_1: "Péssimo",
          texto_nota_5: "Excelente",
          ordem: 1
        })
      });

      if (!response.ok) throw new Error("Falha ao salvar");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar critério metodológico.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedTemplateData = templates.find(t => t.id === Number(selectedTemplate));

  return (
    <GovModal isOpen={isOpen} onClose={onClose} title={`Critério Metodológico: ${etapaNome}`}>
      <div className="space-y-6">
        <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex gap-3">
          <Info className="text-blue-500 shrink-0" size={20} />
          <p className="text-xs text-blue-700 font-medium leading-relaxed">
            Selecione um dos critérios abaixo. A lista foi filtrada automaticamente
            baseada no <b>tipo de comportamento</b> desta etapa (Metodologia F5).
          </p>
        </div>

        {loading ? (
          <div className="py-10 text-center text-slate-400 animate-pulse font-bold">Carregando critérios válidos...</div>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Critério</label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="">Selecione um critério...</option>
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.nome}</option>
                ))}
              </select>
            </div>

            {selectedTemplateData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2"
              >
                <h4 className="text-xs font-black text-slate-900 flex items-center gap-2">
                  <AlertCircle size={14} className="text-gov-blue-light" />
                  Conceito do Critério
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                  &quot;{selectedTemplateData.conceito}&quot;
                </p>
              </motion.div>
            )}

            <div className="pt-6 flex gap-3">
              <GovButton type="secondary" onClick={onClose} className="flex-1">Cancelar</GovButton>
              <GovButton
                type="primary"
                onClick={handleSave}
                disabled={!selectedTemplate || submitting}
                className="flex-1"
              >
                {submitting ? "Salvando..." : "Confirmar Vínculo"}
              </GovButton>
            </div>
          </>
        )}
      </div>
    </GovModal>
  );
}

// apps/web/features/processes/components/EtapaModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Clock, Layers, AlertCircle } from "lucide-react";
import { GovButton, GovIcon } from "@/components/gov";
import { Etapa } from "../api/processService";
import { useCreateEtapaMutation, useUpdateEtapaMutation } from "../api/useProcessQueries";
import { useCategorias, useTiposComportamento } from "@/features/catalog/api/useCatalogQueries";

interface EtapaModalProps {
  processoId: number;
  initialData?: Etapa;
  onClose: () => void;
}

export function EtapaModal({ processoId, initialData, onClose }: EtapaModalProps) {
  const isEditing = !!initialData;
  const createMutation = useCreateEtapaMutation();
  const updateMutation = useUpdateEtapaMutation();

  const { data: categorias = [] } = useCategorias();
  const { data: tiposComportamento = [] } = useTiposComportamento();

  const [formData, setFormData] = useState({
    processo_id: processoId,
    comportamento: "",
    ordem: 1,
    categoria_id: 0,
    tipo_comportamento_id: 0,
    e_obrigatorio: false,
    tempo_planejado: "00:05:00",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        processo_id: initialData.processo_id,
        comportamento: initialData.comportamento,
        ordem: initialData.ordem,
        categoria_id: initialData.categoria_id,
        tipo_comportamento_id: initialData.tipo_comportamento_id,
        e_obrigatorio: initialData.e_obrigatorio,
        tempo_planejado: initialData.tempo_planejado || "00:05:00",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: initialData.id, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[32px] shadow-2xl w-full max-w-xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {isEditing ? "Editar Etapa" : "Nova Etapa"}
              </h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                MAPEAMENTO DE FLUXO
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comportamento (O que o usuário faz?)</label>
            <input
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="Ex: Realizar login no portal"
              value={formData.comportamento}
              onChange={(e) => setFormData({ ...formData, comportamento: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ordem</label>
              <input
                type="number"
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.ordem}
                onChange={(e) => setFormData({ ...formData, ordem: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tempo Planejado (Min)</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                   className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                   placeholder="00:05:00"
                   value={formData.tempo_planejado}
                   onChange={(e) => setFormData({ ...formData, tempo_planejado: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categoria</label>
                <select
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.categoria_id}
                  onChange={(e) => setFormData({ ...formData, categoria_id: parseInt(e.target.value) })}
                >
                  <option value={0}>Selecione...</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                  ))}
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo de Comportamento</label>
                <select
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.tipo_comportamento_id}
                  onChange={(e) => setFormData({ ...formData, tipo_comportamento_id: parseInt(e.target.value) })}
                >
                  <option value={0}>Selecione...</option>
                  {tiposComportamento
                    .filter(t => !formData.categoria_id || t.categoria_id === formData.categoria_id)
                    .map(tipo => (
                      <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                  ))}
                </select>
             </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
             <input
                type="checkbox"
                id="e_obrigatorio"
                className="w-5 h-5 rounded-lg border-blue-200 text-blue-600 focus:ring-blue-500"
                checked={formData.e_obrigatorio}
                onChange={(e) => setFormData({ ...formData, e_obrigatorio: e.target.checked })}
             />
             <label htmlFor="e_obrigatorio" className="text-sm font-bold text-blue-900 cursor-pointer">
                Esta etapa é obrigatória para a conclusão do processo?
             </label>
          </div>

          <div className="pt-4 flex gap-4">
            <GovButton
              type="primary"
              submit={true}
              className="flex-1 py-4 shadow-xl shadow-blue-500/20"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              <Save size={18} className="mr-2" />
              {isEditing ? "Salvar Alterações" : "Criar Etapa"}
            </GovButton>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  GovButton, 
  GovInput, 
  GovSelect, 
  GovIcon 
} from "@/components/gov";
import { 
  EsferaGoverno, 
  Abrangencia,
  Processo
} from "../api/processService";
import { useCreateProcessMutation, useUpdateProcessMutation } from "../api/useProcessQueries";

interface ProcessModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  initialData?: Processo;
}

export function ProcessModal({ onClose, onSuccess, initialData }: ProcessModalProps) {
  const isEdit = !!initialData;
  const createMutation = useCreateProcessMutation();
  const updateMutation = useUpdateProcessMutation();
  
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    objetivo: "",
    esfera_governo: EsferaGoverno.FEDERAL,
    abrangencia: Abrangencia.PUBLICO_GERAL,
    publico_alvo: "",
    usuarios_estimados_ano: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || "",
        descricao: initialData.descricao || "",
        objetivo: initialData.objetivo || "",
        esfera_governo: initialData.esfera_governo || EsferaGoverno.FEDERAL,
        abrangencia: initialData.abrangencia || Abrangencia.PUBLICO_GERAL,
        publico_alvo: initialData.publico_alvo || "",
        usuarios_estimados_ano: initialData.usuarios_estimados_ano || 0,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, data: formData });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-lg font-black text-gov-blue uppercase italic">
            {isEdit ? 'Editar Processo' : 'Novo Processo'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <GovIcon icon="mdi:close" size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <GovInput 
            label="Nome do Processo" 
            placeholder="Ex: Cadastro de Artesão" 
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <GovSelect 
              label="Esfera"
              options={[
                { label: "Federal", value: EsferaGoverno.FEDERAL },
                { label: "Estadual", value: EsferaGoverno.ESTADUAL },
                { label: "Municipal", value: EsferaGoverno.MUNICIPAL },
              ]}
              value={formData.esfera_governo}
              onChange={(value: unknown) => setFormData({...formData, esfera_governo: value as EsferaGoverno})}
            />
            <GovSelect 
              label="Abrangência"
              options={[
                { label: "Público Geral", value: Abrangencia.PUBLICO_GERAL },
                { label: "Público Específico", value: Abrangencia.PUBLICO_ESPECIFICO },
              ]}
              value={formData.abrangencia}
              onChange={(value: unknown) => setFormData({...formData, abrangencia: value as Abrangencia})}
            />
          </div>

          <GovInput 
            label="Objetivo" 
            placeholder="Qual o objetivo deste processo?" 
            value={formData.objetivo}
            onChange={(e) => setFormData({...formData, objetivo: e.target.value})}
          />

          <GovInput 
            label="Público Alvo" 
            placeholder="Quem utiliza este serviço?" 
            value={formData.publico_alvo}
            onChange={(e) => setFormData({...formData, publico_alvo: e.target.value})}
          />

          <div className="pt-4 flex gap-3">
            <GovButton type="secondary" block onClick={onClose}>Cancelar</GovButton>
            <GovButton type="primary" block submit loading={isSubmitting}>
              {isEdit ? 'Salvar Alterações' : 'Criar Processo'}
            </GovButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

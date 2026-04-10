"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  GovButton, 
  GovInput, 
  GovSelect, 
  GovIcon 
} from "@/components/gov";
import { 
  processService, 
  EsferaGoverno, 
  Abrangencia 
} from "@/services/process-service";

interface CreateProcessModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateProcessModal({ onClose, onSuccess }: CreateProcessModalProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    objetivo: "",
    esfera_governo: EsferaGoverno.FEDERAL,
    abrangencia: Abrangencia.PUBLICO_GERAL,
    publico_alvo: "",
    usuarios_estimados_ano: 0,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await processService.create(formData);
      onSuccess();
      onClose();
    } catch (err) {
      alert("Erro ao criar processo.");
      console.error(err);
    } finally {
      setIsCreating(false);
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
          <h3 className="text-lg font-black text-gov-blue uppercase italic">Novo Processo</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <GovIcon icon="mdi:close" size={24} />
          </button>
        </div>

        <form onSubmit={handleCreate} className="p-6 space-y-4 overflow-y-auto">
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
            <GovButton type="primary" block submit loading={isCreating}>Criar Processo</GovButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

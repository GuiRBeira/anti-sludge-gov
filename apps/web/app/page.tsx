"use client";

import React, { useEffect, useState } from "react";
import { 
  GovButton, 
  GovTag, 
  GovInput, 
  GovSelect, 
  GovIcon 
} from "@/components/gov";
import { processService, Processo, EsferaGoverno, Abrangencia } from "@/services/process-service";
import { motion } from "framer-motion";

export default function Home() {
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
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

  async function loadData() {
    setLoading(true);
    try {
      const data = await processService.list();
      setProcessos(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar processos. Verifique se a API está rodando.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await processService.create(formData);
      setShowModal(false);
      setFormData({
        nome: "",
        descricao: "",
        objetivo: "",
        esfera_governo: EsferaGoverno.FEDERAL,
        abrangencia: Abrangencia.PUBLICO_GERAL,
        publico_alvo: "",
        usuarios_estimados_ano: 0,
      });
      await loadData();
    } catch (err) {
      alert("Erro ao criar processo.");
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const stats = [
    { label: "Total de Processos", value: processos.length, icon: "mdi:file-document", color: "bg-blue-600" },
    { label: "Em Andamento", value: processos.filter(p => p.status === "Em Andamento").length, icon: "mdi:clock-time-four-outline", color: "bg-amber-500" },
    { label: "Análises Críticas", value: 0, icon: "mdi:alert-circle-outline", color: "bg-red-500" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Simplificado DSGOV */}
      <header className="br-header mb-0 border-b border-slate-200 bg-white shadow-sm">
        <div className="container-lg py-4 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gov-blue rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
              AS
            </div>
            <div>
              <h1 className="text-xl font-black text-gov-blue-light tracking-tight leading-none">
                Anti-Sludge Gov
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Auditoria de Carga Administrativa
              </p>
            </div>
          </div>
          <div className="flex gap-2">
             <GovButton type="primary" size="small" circle icon="fas fa-search" />
             <GovButton type="primary" size="small" circle icon="fas fa-user" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* Page Header */}
        <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <GovIcon icon="mdi:view-dashboard" className="w-8 h-8 text-gov-blue" />
              Dashboard
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Bem-vindo ao sistema de monitoramento de fricção administrativa.
            </p>
          </motion.div>

          <GovButton 
            type="primary" 
            className="shadow-lg shadow-blue-500/20"
            onClick={() => setShowModal(true)}
          >
            <GovIcon icon="mdi:plus" className="w-4 h-4 mr-2" />
            Novo Processo
          </GovButton>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 rounded-3xl shadow-sm border border-slate-200/50 flex items-center gap-4"
            >
              <div className={`${stat.color} p-3 rounded-2xl text-white shadow-md`}>
                <GovIcon icon={stat.icon} className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black text-slate-800">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Table/List Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-black text-slate-800 uppercase text-xs tracking-tighter italic">
              Processos em Monitoramento
            </h3>
            <div className="flex gap-2">
               <GovTag type="status" color="success" value="ATIVO" />
            </div>
          </div>

          <div className="p-2 overflow-x-auto">
            {loading ? (
              <div className="py-20 text-center animate-pulse">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                  <p className="text-slate-400 font-bold text-sm">Carregando dados extraordinários...</p>
                </div>
              </div>
            ) : error ? (
              <div className="py-20 text-center">
                <p className="text-red-500 font-bold">{error}</p>
              </div>
            ) : processos.length === 0 ? (
               <div className="py-20 text-center text-slate-400">
                  <GovIcon icon="mdi:file-document-outline" className="w-12 h-12 mx-auto opacity-20 mb-4" />
                  <p className="font-bold">Nenhum processo encontrado.</p>
                  <GovButton type="secondary" size="small" className="mt-4">Importar Dados Iniciais</GovButton>
               </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 italic">
                    <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">ID</th>
                    <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Processo</th>
                    <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Esfera</th>
                    <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Status</th>
                    <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {processos.map((p) => (
                    <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                      <td className="px-4 py-4 text-xs font-bold text-slate-400">#{p.id}</td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-black text-slate-800">{p.nome}</div>
                        <div className="text-[10px] font-medium text-slate-400 truncate max-w-xs">{p.descricao || "Sem descrição"}</div>
                      </td>
                      <td className="px-4 py-4">
                        <GovTag type="icon" icon="fas fa-landmark" value={p.esfera_governo || "N/A"} size="small" className="text-[9px] font-black" />
                      </td>
                      <td className="px-4 py-4">
                        <GovTag 
                          type="text" 
                          color={p.status === "Concluído" ? "success" : "warning"} 
                          value={p.status.toUpperCase()} 
                          className="text-[9px] font-bold" 
                        />
                      </td>
                      <td className="px-4 py-4">
                        <GovButton type="secondary" size="small" circle icon="fas fa-arrow-right" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>

        {/* Modal de Criação */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-black text-gov-blue uppercase italic">Novo Processo</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <GovIcon icon="mdi:close" className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="p-6 space-y-4 overflow-y-auto">
                <GovInput 
                  label="Nome do Processo" 
                  placeholder="Ex: Cadastro de Artesão" 
                  value={formData.nome}
                  onChange={(e: any) => setFormData({...formData, nome: e.target.value})}
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
                    onChange={(value: any) => setFormData({...formData, esfera_governo: value})}
                  />
                  <GovSelect 
                    label="Abrangência"
                    options={[
                      { label: "Público Geral", value: Abrangencia.PUBLICO_GERAL },
                      { label: "Público Específico", value: Abrangencia.PUBLICO_ESPECIFICO },
                    ]}
                    value={formData.abrangencia}
                    onChange={(value: any) => setFormData({...formData, abrangencia: value})}
                  />
                </div>

                <GovInput 
                  label="Objetivo" 
                  placeholder="Qual o objetivo deste processo?" 
                  value={formData.objetivo}
                  onChange={(e: any) => setFormData({...formData, objetivo: e.target.value})}
                />

                <GovInput 
                  label="Público Alvo" 
                  placeholder="Quem utiliza este serviço?" 
                  value={formData.publico_alvo}
                  onChange={(e: any) => setFormData({...formData, publico_alvo: e.target.value})}
                />

                <div className="pt-4 flex gap-3">
                  <GovButton type="secondary" block onClick={() => setShowModal(false)}>Cancelar</GovButton>
                  <GovButton type="primary" block submit loading={isCreating}>Criar Processo</GovButton>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center md:text-left">
            UTFPR & CINCO/MGI — Auditoria v1.0 <br />
            Plataforma de Combate à Burocracia Invisível
          </div>
          <div className="flex gap-4 grayscale opacity-30">
             <div className="h-6 w-20 bg-slate-300 rounded"></div>
             <div className="h-6 w-16 bg-slate-300 rounded"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

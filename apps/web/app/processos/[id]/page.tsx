"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { GovButton, GovIcon, GovCard, GovTag } from "@/components/gov";
import { ArrowLeft, Edit, Trash2, Layout, Info } from "lucide-react";
import { SludgeChart } from "@/features/analysis/components/SludgeChart";
import { ProcessModal } from "@/features/processes/components/ProcessModal";
import { EtapaModal } from "@/features/processes/components/EtapaModal";
import { useProcessDetail, useDeleteProcessMutation, useDeleteEtapaMutation } from "@/features/processes/api/useProcessQueries";
import { useProcessAnalysis } from "@/features/analysis/api/useAnalysisQueries";
import { Etapa } from "@/features/processes/api/processService";
import { Layers } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function ProcessoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const processId = parseInt(id);

  const { canEdit } = useAuth();
  const { data: processo, isLoading: loadingProcesso, error: errorProcesso } = useProcessDetail(processId);
  const { data: analysis, isLoading: loadingAnalysis } = useProcessAnalysis(processId);
  const deleteMutation = useDeleteProcessMutation();
  const deleteEtapaMutation = useDeleteEtapaMutation(processId);

  const [showModal, setShowModal] = useState(false);
  const [showEtapaModal, setShowEtapaModal] = useState(false);
  const [editingEtapa, setEditingEtapa] = useState<Etapa | null>(null);

  const loading = loadingProcesso || loadingAnalysis;
  const error = errorProcesso;

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !processo) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 font-bold mb-4">{(error as any)?.message || "Processo não encontrado"}</p>
        <GovButton type="secondary" onClick={() => router.push("/")}>
          Voltar ao Dashboard
        </GovButton>
      </div>
    );
  }

  // Dados reais vindo da análise calculada no backend
  const chartData = analysis?.steps || [];

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir este processo? Esta ação não pode ser desfeita.")) {
      try {
        await deleteMutation.mutateAsync(processo.id);
        router.push("/");
      } catch (err) {
        // Erro já tratado no hook
      }
    }
  };

  const handleDeleteEtapa = async (etapaId: number) => {
    if (confirm("Deseja remover esta etapa?")) {
      await deleteEtapaMutation.mutateAsync(etapaId);
    }
  };

  const handleEditEtapa = (etapa: Etapa) => {
    setEditingEtapa(etapa);
    setShowEtapaModal(true);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header com Ações */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="p-2 bg-white rounded-full shadow-sm border border-slate-200 text-slate-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2 text-gov-blue-light font-bold text-xs uppercase tracking-widest mb-1">
              <Info size={14} />
              Detalhes do Processo #{processo.id}
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {processo.nome}
            </h2>
          </div>
        </div>

        {canEdit && (
          <div className="flex items-center gap-3">
             <GovButton
               type="secondary"
               size="small"
               className="border-slate-200"
               onClick={() => setShowModal(true)}
             >
                <Edit size={16} className="mr-2" />
                Editar Processo
             </GovButton>
             <button
               onClick={handleDelete}
               disabled={deleteMutation.isPending}
               className="p-2 text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
             >
                <Trash2 size={20} />
             </button>
          </div>
        )}
      </section>

      {/* Grid de Informações */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Card */}
        <div className="lg:col-span-1 space-y-6">
           <GovCard title="Informações Gerais" icon="mdi:information-outline">
              <div className="p-6 space-y-5">
                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Descrição</label>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                       {processo.descricao || "Nenhuma descrição fornecida."}
                    </p>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Esfera</label>
                       <GovTag type="text" color="info" value={processo.esfera_governo || "N/A"} className="font-bold" />
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Abrangência</label>
                       <GovTag type="text" color="info" value={processo.abrangencia || "N/A"} className="font-bold" />
                    </div>
                 </div>

                 <div className="pt-4 border-t border-slate-50">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">Público Alvo</label>
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                       <GovIcon icon="mdi:account-group" className="text-blue-500" />
                       {processo.publico_alvo || "Não especificado"}
                    </div>
                 </div>
              </div>
           </GovCard>

           <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
              <div className="flex items-center gap-2 mb-4 opacity-80">
                 <Info size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Resumo Analítico</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Total de Etapas</h3>
              <div className="text-5xl font-black mb-4">{processo.etapas.length}</div>
              <p className="text-xs text-blue-100 font-medium leading-relaxed opacity-90">
                 Este processo possui {processo.etapas.length} etapas mapeadas que geram fricção ao usuário final.
              </p>
           </div>
        </div>

        {/* Chart Card */}
        <div className="lg:col-span-2 space-y-6">
           <GovCard title="Análise de Sludge por Etapa" icon="mdi:chart-timeline-variant">
              <div className="p-6">
                 <SludgeChart data={chartData} />
                 <div className="mt-6 flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-tighter">
                    <span>Etapa Inicial</span>
                    <span>Etapa Final</span>
                 </div>
              </div>
           </GovCard>

           <GovCard
             title="Lista de Etapas"
             icon="mdi:layers-outline"
             headerAction={
               canEdit ? (
                 <GovButton
                   type="secondary"
                   onClick={() => {
                     setEditingEtapa(null);
                     setShowEtapaModal(true);
                   }}
                 >
                   <Plus size={14} className="mr-1" />
                   Adicionar Etapa
                 </GovButton>
               ) : null
             }
           >
              <div className="p-2 overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-50 italic">
                           <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase w-20">Ordem</th>
                           <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Comportamento</th>
                           <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase w-28">Planejado</th>
                           <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase w-32">Real (Médio)</th>
                           <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase w-20 text-center">Obrig.</th>
                           {canEdit && <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase w-24 text-right">Ações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {processo.etapas.length > 0 ? processo.etapas.map((e) => {
                           const analysisStep = analysis?.steps?.find(s => s.etapa_id === e.id);
                           const isCritical = analysisStep && (analysisStep.prioridade || 0) >= 3;

                           return (
                             <tr key={e.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                <td className="px-4 py-4 text-xs font-black text-slate-300">#0{e.ordem}</td>
                                <td className="px-4 py-4">
                                   <div className="flex flex-col">
                                      <span className="text-sm font-bold text-slate-800">{e.comportamento}</span>
                                      {analysisStep?.recomendacao && isCritical && (
                                         <span className="text-[10px] text-blue-600 font-bold mt-1 flex items-center gap-1 bg-blue-50 w-fit px-2 py-0.5 rounded-full">
                                            <Info size={10} />
                                            {analysisStep.recomendacao}
                                         </span>
                                      )}
                                   </div>
                                </td>
                                <td className="px-4 py-4 text-xs font-medium text-slate-500">
                                   {e.tempo_planejado ? `${e.tempo_planejado.split(':')[1]}m` : "--"}
                                </td>
                                <td className="px-4 py-4 text-xs font-bold text-blue-600">
                                   {e.duracao_media_observada ? `${e.duracao_media_observada.split(':')[1]}m` : "Sob análise"}
                                </td>
                                <td className="px-4 py-4 w-20 text-center">
                                   <div className={`h-3 w-3 rounded-full mx-auto ${e.e_obrigatorio ? 'bg-orange-400 shadow-lg shadow-orange-200' : 'bg-slate-200'}`} />
                                </td>
                                {canEdit && (
                                  <td className="px-4 py-4 text-right w-24">
                                     <div className="flex justify-end gap-2">
                                        <button
                                          onClick={() => handleEditEtapa(e)}
                                          className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                                        >
                                          <Edit size={18} />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteEtapa(e.id)}
                                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                                        >
                                          <Trash2 size={18} />
                                        </button>
                                     </div>
                                  </td>
                                )}
                             </tr>
                           );
                        }) : (
                           <tr>
                              <td colSpan={6} className="py-20 text-center">
                                 <div className="flex flex-col items-center justify-center space-y-4">
                                    <div className="p-4 bg-slate-50 rounded-full text-slate-300">
                                       <Layers size={48} />
                                    </div>
                                    <div>
                                       <p className="text-slate-500 font-bold">Nenhuma etapa mapeada</p>
                                       <p className="text-slate-400 text-xs mt-1">Comece adicionando a primeira etapa deste serviço público.</p>
                                    </div>
                                    {canEdit && (
                                       <GovButton
                                          type="primary"
                                          className="mt-4"
                                          onClick={() => {
                                             setEditingEtapa(null);
                                             setShowEtapaModal(true);
                                          }}
                                       >
                                          + Adicionar Primeira Etapa
                                       </GovButton>
                                    )}
                                 </div>
                              </td>
                           </tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </GovCard>
        </div>
      </div>

      {showModal && (
        <ProcessModal
          onClose={() => setShowModal(false)}
          initialData={processo}
        />
      )}

      {showEtapaModal && (
        <EtapaModal
          processoId={processId}
          initialData={editingEtapa || undefined}
          onClose={() => {
            setShowEtapaModal(false);
            setEditingEtapa(null);
          }}
        />
      )}
    </div>
  );
}

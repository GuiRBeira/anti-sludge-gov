// apps/web/app/processos/[id]/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GovButton, GovCard, GovTag } from "@/components/gov";
import { processService, ProcessoDetail } from "@/services/process-service";
import { analysisService, StepScore } from "@/services/analysis-service";
import { observationService, JornadaObservada } from "@/services/observation-service";
import { SludgeChart } from "@/components/analysis/SludgeChart";
import { AddCriterionModal } from "@/components/analysis/AddCriterionModal";
import { JourneyDifferentialModal } from "@/components/analysis/JourneyDifferentialModal";
import { ExtensionLinkerModal } from "@/components/analysis/ExtensionLinkerModal";
import { ArrowLeft, Clock, Layers, Users, Building, Globe, Calculator, TrendingUp, History, PlayCircle, Link2 } from "lucide-react";

export default function ProcessDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<ProcessoDetail | null>(null);
  const [chartData, setChartData] = useState<StepScore[]>([]);
  const [journeys, setJourneys] = useState<JornadaObservada[]>([]);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [criterionModalOpen, setCriterionModalOpen] = useState(false);
  const [selectedEtapa, setSelectedEtapa] = useState<{id: number, nome: string} | null>(null);

  const [diffModalOpen, setDiffModalOpen] = useState(false);
  const [selectedJornada, setSelectedJornada] = useState<JornadaObservada | null>(null);

  const [linkerOpen, setLinkerOpen] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [processRes, chartRes, journeysRes] = await Promise.all([
        processService.getById(Number(id)),
        analysisService.getProcessChartData(Number(id)),
        observationService.listByProcess(Number(id))
      ]);
      setData(processRes);
      setChartData(chartRes.steps);
      setJourneys(journeysRes);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os detalhes do processo.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [id, loadData]);

  const handleCalculate = async () => {
    setCalculating(true);
    try {
      await analysisService.calculateSludge(Number(id));
      await loadData();
    } catch (err) {
      console.error(err);
      alert("Erro ao calcular Sludge.");
    } finally {
      setCalculating(false);
    }
  };

  const openEvaluation = (etapa: {id: number, comportamento: string}) => {
    setSelectedEtapa({ id: etapa.id, nome: etapa.comportamento });
    setCriterionModalOpen(true);
  };

  const openDifferential = (jornada: JornadaObservada) => {
    setSelectedJornada(jornada);
    setDiffModalOpen(true);
  };

  const openLinker = (etapa: {id: number, comportamento: string}) => {
    if (journeys.length === 0) {
      alert("É necessário carregar ao menos uma jornada real para vincular logs.");
      return;
    }
    // Para simplificar, vinculamos à jornada mais recente se não houver uma selecionada
    setSelectedJornada(journeys[0]);
    setSelectedEtapa({ id: etapa.id, nome: etapa.comportamento });
    setLinkerOpen(true);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-slate-500 animate-pulse">Carregando jornada...</p></div>;
  if (error || !data) return <div className="bg-red-50 p-6 rounded-xl text-red-600 font-bold">{error || "Processo não encontrado."}</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Voltar para listagem
      </button>

      <section className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
             <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">{data.nome}</h2>
             <div className="w-fit">
               <GovTag
                 type="status"
                 color={data.status === "Crítico" ? "danger" : data.status === "Em Andamento" ? "warning" : "success"}
                 value={data.status}
               />
             </div>
          </div>
          <p className="text-slate-500 text-base md:text-lg max-w-3xl leading-relaxed">{data.descricao || "Sem descrição disponível."}</p>
        </div>

        <div className="flex flex-wrap gap-3">
           <GovButton
             type="secondary"
             onClick={handleCalculate}
             disabled={calculating}
             className="flex-1 md:flex-none"
           >
             <div className="flex items-center justify-center gap-2">
               <Calculator size={16} className={calculating ? "animate-spin" : ""} />
               {calculating ? "Calculando..." : "Recalcular Sludge"}
             </div>
           </GovButton>
           <GovButton type="primary" className="flex-1 md:flex-none">Nova Jornada</GovButton>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Esfera", value: data.esfera_governo, icon: Building },
          { label: "Abrangência", value: data.abrangencia, icon: Globe },
          { label: "Público Alvo", value: data.publico_alvo, icon: Users },
          { label: "Jornadas", value: journeys.length.toString(), icon: History },
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <item.icon size={20} className="text-slate-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{item.label}</p>
              <p className="text-xs md:text-sm font-black text-slate-900 truncate">{item.value || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Seção de Análise e Gráfico */}
          <GovCard title="Análise Metodológica F5" icon="mdi:chart-timeline-variant">
            <div className="p-4 md:p-8 space-y-8 overflow-hidden">
              {chartData.some(s => s.indice_sludge !== null) ? (
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[500px] md:min-w-full">
                    <SludgeChart data={chartData} />
                  </div>
                </div>
              ) : (
                <div className="h-[200px] flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30 gap-4">
                    <TrendingUp size={40} className="text-slate-200" />
                    <p className="text-slate-400 font-medium text-sm text-center max-w-xs">
                      Sem dados de análise. Calcule o Sludge para visualizar o gráfico.
                    </p>
                </div>
              )}
            </div>
          </GovCard>

          {/* Mapeamento Planejado */}
          <GovCard title="Jornada Planejada (Ideal)" icon="mdi:vector-arrange-below">
            <div className="p-6">
              <div className="space-y-6">
                {data.etapas?.length > 0 ? data.etapas.sort((a,b) => a.ordem - b.ordem).map((etapa, idx) => {
                  const score = chartData.find(s => s.etapa_id === etapa.id);
                  return (
                    <div key={etapa.id} className={`p-4 rounded-2xl border ${score?.prioridade === 4 ? 'bg-red-50/30 border-red-100' : 'bg-slate-50/50 border-slate-100'} flex gap-4`}>
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center font-black text-sm text-gov-blue-light shadow-sm">
                         {idx + 1}
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center justify-between">
                            <h4 className="font-black text-slate-900 text-sm">{etapa.comportamento}</h4>
                            <GovTag
                              type="text"
                              color={etapa.e_obrigatorio ? "warning" : "neutral"}
                              size="small"
                              value={etapa.e_obrigatorio ? "Obrigatório" : "Opcional"}
                            />
                         </div>
                         <div className="flex gap-4 mt-2">
                           <button onClick={() => openEvaluation(etapa)} className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Avaliar Barreira</button>
                           {score?.indice_sludge !== null && (
                             <span className="text-[10px] font-black text-slate-400">INDEX: {score?.indice_sludge}</span>
                           )}
                           <button
                             onClick={() => openLinker(etapa)}
                             className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1"
                           >
                             <Link2 size={10} /> Vincular Extensão
                           </button>
                         </div>
                      </div>
                    </div>
                  );
                }) : <p className="text-center text-slate-400 italic">Nenhuma etapa mapeada.</p>}
              </div>
            </div>
          </GovCard>
        </div>

        <div className="space-y-8">
          {/* Jornadas Observadas (Histórico Real) */}
          <GovCard title="Jornadas Reais" icon="mdi:history">
             <div className="p-6 space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registros de Usuários</p>
                <div className="space-y-3">
                   {journeys.length > 0 ? journeys.map(j => (
                     <div
                      key={j.id}
                      className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => openDifferential(j)}
                     >
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-[10px] font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-lg uppercase tracking-wider">
                              {j.protocolo}
                           </span>
                           <span className="text-[10px] text-slate-400 font-bold">
                              {new Date(j.data_observacao).toLocaleDateString("pt-BR")}
                           </span>
                        </div>
                        <p className="text-xs font-black text-slate-700 mb-2">{j.nome_jornada || "Sessão sem nome"}</p>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                           <PlayCircle size={12} /> Ver Diferencial de Eficiência
                        </div>
                     </div>
                   )) : (
                     <p className="text-center py-6 text-slate-400 italic text-xs">Nenhuma jornada realizada.</p>
                   )}
                </div>
                <GovButton type="primary" className="w-full mt-4">Iniciar Observação</GovButton>
             </div>
          </GovCard>
        </div>
      </div>

      {/* Modals */}
      <AddCriterionModal
        isOpen={criterionModalOpen}
        onClose={() => setCriterionModalOpen(false)}
        etapaId={selectedEtapa?.id || 0}
        etapaNome={selectedEtapa?.nome || ""}
        onSuccess={handleCalculate}
      />

      {selectedJornada && (
        <JourneyDifferentialModal
          isOpen={diffModalOpen}
          onClose={() => setDiffModalOpen(false)}
          jornadaId={selectedJornada.id}
          jornadaProtocolo={selectedJornada.protocolo}
        />
      )}

      {selectedEtapa && selectedJornada && (
        <ExtensionLinkerModal
          isOpen={linkerOpen}
          onClose={() => setLinkerOpen(false)}
          jornadaId={selectedJornada.id}
          etapaId={selectedEtapa.id}
          etapaNome={selectedEtapa.nome}
          processoId={Number(id)}
          onSuccess={loadData}
        />
      )}
    </div>
  );
}

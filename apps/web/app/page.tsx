// apps/web/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GovButton, GovIcon, GovCard } from "@/components/gov";
import { StatsGrid } from "@/components/features/dashboard/StatsGrid";
import { ProcessTable } from "@/components/features/dashboard/ProcessTable";
import { CreateProcessModal } from "@/components/features/dashboard/CreateProcessModal";
import { SludgeChart } from "@/components/features/dashboard/SludgeChart";
import { processService, Processo, DashboardSummary } from "@/services/process-service";
import { AlertCircle, History, TrendingUp } from "lucide-react";

export default function Home() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function loadData() {
    setLoading(true);
    try {
      const [sumData, procData] = await Promise.all([
        processService.getDashboardSummary(),
        processService.list()
      ]);
      setSummary(sumData);
      setProcessos(procData);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar dados. Verifique se a API está rodando.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const stats = [
    { 
      label: "Total de Processos", 
      value: summary?.total_processos || 0, 
      icon: "mdi:file-document", 
      color: "bg-blue-600" 
    },
    { 
      label: "Processos Críticos", 
      value: summary?.processos_criticos || 0, 
      icon: "mdi:alert-circle-outline", 
      color: "bg-red-500" 
    },
    { 
      label: "Jornadas Observadas", 
      value: summary?.total_jornadas || 0, 
      icon: "mdi:eye-outline", 
      color: "bg-emerald-500" 
    },
    { 
      label: "Média Sludge", 
      value: summary ? (summary.media_barreiras * summary.media_impactos).toFixed(1) : "0.0", 
      icon: "mdi:chart-bell-curve", 
      color: "bg-indigo-600" 
    },
  ];

  // Dados fake para o gráfico baseados nos processos (mock inicial)
  const chartData = processos.slice(0, 6).map(p => ({
    name: p.nome.split(" ").slice(0, 2).join(" "),
    score: (Math.random() * 20).toFixed(1) // Em prod viria do sumário/analise
  }));

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 text-gov-blue-light font-bold text-sm uppercase tracking-wider mb-2">
            <TrendingUp size={16} />
            Monitoramento em Tempo Real
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Dashboard Geral
          </h2>
          <p className="text-slate-500 mt-2 font-medium max-w-2xl">
            Acompanhe a carga administrativa e fricção nos serviços públicos federais mapeados. 
            Dados baseados em observações reais de tempo e esforço.
          </p>
        </motion.div>

        <GovButton 
          type="primary" 
          className="shadow-xl shadow-blue-500/20 px-8"
          onClick={() => setShowModal(true)}
        >
          <GovIcon icon="mdi:plus" size={20} className="mr-2" />
          Novo Processo
        </GovButton>
      </section>

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GovCard 
            title="Índice de Sludge por Processo" 
            icon="mdi:chart-bar"
          >
            <div className="p-4">
              <SludgeChart data={chartData} />
            </div>
          </GovCard>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <GovCard title="Atividade Recente" icon="mdi:history">
            <div className="p-4 space-y-4">
              {summary?.recent_activity.length > 0 ? summary.recent_activity.map((act) => (
                <div key={act.id} className="flex items-start gap-3 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="mt-1 p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <History size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{act.processo}</p>
                    <p className="text-xs text-slate-500">Jornada #{act.protocolo}</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">
                      {new Date(act.data).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-slate-400 italic">Nenhuma atividade recente.</p>
              )}
            </div>
          </GovCard>

          <div className="bg-red-50 border border-red-100 p-6 rounded-3xl">
             <div className="flex items-center gap-3 text-red-700 font-black mb-3">
               <AlertCircle size={20} />
               Alertas Prioritários
             </div>
             <p className="text-sm text-red-600 leading-relaxed">
               Existem <strong>{summary?.processos_criticos || 0} processos</strong> com índice de fricção acima do limite aceitável. 
               Recomendamos análise urgente das etapas críticas.
             </p>
             <GovButton type="secondary" size="small" className="mt-4 border-red-200 text-red-700 hover:bg-red-100">
               Ver Detalhes
             </GovButton>
          </div>
        </div>
      </div>

      <GovCard title="Listagem de Processos" icon="mdi:format-list-bulleted">
        <ProcessTable 
          processos={processos} 
          loading={loading} 
          error={error} 
        />
      </GovCard>

      {showModal && (
        <CreateProcessModal 
          onClose={() => setShowModal(false)} 
          onSuccess={loadData} 
        />
      )}
    </div>
  );
}

// apps/web/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GovButton, GovIcon, GovCard } from "@/components/gov";
import { StatsGrid } from "@/features/processes/components/StatsGrid";
import { ProcessTable } from "@/features/processes/components/ProcessTable";
import { ProcessModal } from "@/features/processes/components/ProcessModal";
import { SludgeChart } from "@/features/processes/components/DashboardSludgeChart";
import { Processo } from "@/features/processes/api/processService";
import { AlertCircle, History, TrendingUp, Calendar, Zap, Plus } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useProcesses, useProcessSummary } from "@/features/processes/api/useProcessQueries";

export default function Home() {
  const { user, canEdit } = useAuth();
  const { data: processos = [], isLoading: loading, error } = useProcesses();
  const { data: summary } = useProcessSummary();
  const [showModal, setShowModal] = useState(false);
  const [editingProcess, setEditingProcess] = useState<Processo | null>(null);

  const handleEdit = (processo: Processo) => {
    setEditingProcess(processo);
    setShowModal(true);
  };

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

  // Dados reais para o gráfico vindos do backend (Ranking de Sludge)
  const chartData = summary?.processos_ranking?.map(r => ({
    name: r.nome.length > 20 ? r.nome.substring(0, 18) + "..." : r.nome,
    score: r.score
  })) || [];

  return (
    <div className="space-y-10 pb-10">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-3">
            <div className="rounded-md">
              <TrendingUp size={20} />
            </div>
            Monitoramento em Tempo Real
          </div>
          <h3 className="text-slate-900 uppercase tracking-tighter">
            Dashboard Geral
          </h3>
          <p className="text-slate-500 mt-2 font-medium max-w-xl text-sm leading-relaxed">
            Bem-vindo, <span className="text-slate-900 font-bold">{user?.name}</span>.
            Acompanhe a carga administrativa e fricção nos serviços públicos federais mapeados.
          </p>
        </motion.div>

        {canEdit && (
          <GovButton 
            type="primary" 
            className="shadow-2xl shadow-blue-500/30 p-4 rounded-full h-auto"
            onClick={() => setShowModal(true)}
          >
            <Plus size={20} className="mr-2" />
            <span className="font-black uppercase tracking-widest text-xs">Novo Processo</span>
          </GovButton>
        )}
      </section>

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GovCard
            title="Índice de Sludge por Processo"
            icon="mdi:chart-bar"
          >
            <div className="p-6">
              <SludgeChart data={chartData} />
            </div>
          </GovCard>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-8">
          <GovCard title="Atividade Recente" icon="mdi:history">
            <div className="p-6">
              <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-linear-to-b before:from-slate-100 before:via-slate-100 before:to-transparent">
                {summary?.recent_activity && summary.recent_activity.length > 0 ? summary.recent_activity.slice(0, 4).map((act, idx) => (
                  <motion.div
                    key={act.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative flex items-start gap-4 group"
                  >
                    <div className="absolute left-0 mt-1.5 w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shadow-sm group-hover:border-blue-200 transition-colors z-10">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <div className="pl-12">
                      <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{act.processo}</p>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-black uppercase tracking-tighter">#{act.protocolo}</span>
                         <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                            <Calendar size={10} />
                            {new Date(act.data).toLocaleDateString("pt-BR")}
                         </div>
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="py-10 text-center">
                    <p className="text-sm text-slate-400 font-medium italic">Nenhuma atividade recente.</p>
                  </div>
                )}
              </div>
            </div>
          </GovCard>

          <div className="bg-linear-to-br from-red-600 to-red-700 p-8 rounded-[40px] shadow-2xl shadow-red-500/20 text-white relative overflow-hidden group">
             <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <AlertCircle size={120} />
             </div>
             <div className="relative z-10">
               <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] mb-4 opacity-80">
                 <Zap size={14} fill="currentColor" />
                 Alertas Críticos
               </div>
               <h4 className="text-2xl font-black tracking-tighter mb-4">
                 {summary?.processos_criticos || 0} Processos em Risco
               </h4>
               <p className="text-sm text-red-100 leading-relaxed font-medium mb-6">
                 Detectamos níveis de fricção alarmantes em alguns fluxos. Uma intervenção imediata pode reduzir a carga cognitiva em até 40%.
               </p>
               <button className="w-full py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-white/20">
                 Iniciar Análise de Crise
               </button>
             </div>
          </div>
        </div>
      </div>

      <GovCard title="Listagem de Processos" icon="mdi:format-list-bulleted">
        <ProcessTable
          processos={processos}
          loading={loading}
          error={error}
          onEdit={handleEdit}
        />
      </GovCard>

      {showModal && (
        <ProcessModal
          onClose={() => {
            setShowModal(false);
            setEditingProcess(null);
          }}
          initialData={editingProcess || undefined}
        />
      )}
    </div>
  );
}

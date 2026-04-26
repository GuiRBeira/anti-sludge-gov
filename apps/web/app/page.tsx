// apps/web/app/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GovIcon } from "@/components/gov";
import { StatsGrid } from "@/features/processes/components/StatsGrid";
import { ProcessTable } from "@/features/processes/components/ProcessTable";
import { ProcessModal } from "@/features/processes/components/ProcessModal";
import { SludgeChart } from "@/features/processes/components/DashboardSludgeChart";
import { Processo } from "@/features/processes/api/processService";
import { AlertCircle, TrendingUp, Calendar, Zap, Plus, History } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useProcesses, useProcessSummary } from "@/features/processes/api/useProcessQueries";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  const chartData = summary?.processos_ranking?.map(r => ({
    name: r.nome.length > 20 ? r.nome.substring(0, 18) + "..." : r.nome,
    score: r.score
  })) || [];

  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto py-6">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm shadow-slate-200/50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.2em] mb-2">
            <TrendingUp size={18} />
            Monitoramento em Tempo Real
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
            Dashboard Geral
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl text-sm leading-relaxed">
            Bem-vindo, <span className="text-slate-900 font-bold">{user?.name}</span>.
            Acompanhe a carga administrativa e fricção nos serviços públicos federais mapeados.
          </p>
        </motion.div>

        {canEdit && (
          <Button 
            size="lg"
            className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs gap-2 shadow-xl shadow-primary/20"
            onClick={() => setShowModal(true)}
          >
            <Plus size={20} />
            Novo Processo
          </Button>
        )}
      </section>

      {/* Stats Section */}
      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <Card className="lg:col-span-2 rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/40">
          <CardHeader className="px-8 pt-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-xl text-primary">
                <GovIcon icon="mdi:chart-bar" className="text-xl" />
              </div>
              <div>
                <CardTitle className="text-xl font-black tracking-tighter uppercase">Índice de Sludge por Processo</CardTitle>
                <CardDescription className="font-medium">Comparativo de fricção entre os serviços analisados</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <SludgeChart data={chartData} />
          </CardContent>
        </Card>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
            <CardHeader className="px-8 pt-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-3">
                 <History className="w-5 h-5 text-primary" />
                 <CardTitle className="text-sm font-black tracking-widest uppercase">Atividade Recente</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-linear-to-b before:from-slate-100 before:via-slate-100 before:to-transparent">
                {summary?.recent_activity && summary.recent_activity.length > 0 ? summary.recent_activity.slice(0, 4).map((act, idx) => (
                  <motion.div
                    key={act.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative flex items-start gap-4 group"
                  >
                    <div className="absolute left-0 mt-1.5 w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shadow-sm group-hover:border-primary/30 transition-colors z-10">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div className="pl-12">
                      <p className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">{act.processo}</p>
                      <div className="flex items-center gap-2 mt-1">
                         <Badge variant="secondary" className="px-2 py-0 h-4 text-[9px] font-black uppercase tracking-tighter">#{act.protocolo}</Badge>
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
            </CardContent>
          </Card>

          {/* Alert Card */}
          <div className="bg-linear-to-br from-destructive to-red-700 p-8 rounded-[2.5rem] shadow-2xl shadow-destructive/20 text-white relative overflow-hidden group">
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
                 Detectamos níveis de fricção alarmantes em alguns fluxos. Uma intervenção imediata pode reduzir a carga cognitiva.
               </p>
               <Button variant="secondary" className="w-full h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/20 text-white">
                 Iniciar Análise de Crise
               </Button>
             </div>
          </div>
        </div>
      </div>

      {/* Main Process Table */}
      <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <CardHeader className="px-8 pt-8 border-b border-slate-50 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-slate-50 rounded-xl text-primary">
                <GovIcon icon="mdi:format-list-bulleted" className="text-xl" />
             </div>
             <div>
                <CardTitle className="text-xl font-black tracking-tighter uppercase">Listagem de Processos</CardTitle>
                <CardDescription className="font-medium">Gestão centralizada de fluxos e scores de sludge</CardDescription>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ProcessTable
            processos={processos}
            loading={loading}
            error={error}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>

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

// apps/web/app/processos/[id]/page.tsx
"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Plus, 
  Info, 
  Layers, 
  Calendar,
  Clock,
  Landmark,
  ShieldAlert,
  ChevronRight,
  TrendingUp,
  Mail,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Features & Services
import { SludgeChart } from "@/features/analysis/components/SludgeChart";
import { ProcessModal } from "@/features/processes/components/ProcessModal";
import { EtapaModal } from "@/features/processes/components/EtapaModal";
import { 
  useProcessDetail, 
  useDeleteProcessMutation, 
  useDeleteEtapaMutation 
} from "@/features/processes/api/useProcessQueries";
import { useProcessAnalysis } from "@/features/analysis/api/useAnalysisQueries";
import { Etapa } from "@/features/processes/api/processService";
import { useAuth } from "@/features/auth/context/AuthContext";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

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

  if (loading) {
    return (
      <div className="space-y-8 pb-10 max-w-7xl mx-auto py-6">
        <div className="flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-64" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="lg:col-span-1 h-[400px] rounded-[2.5rem]" />
          <Skeleton className="lg:col-span-2 h-[600px] rounded-[2.5rem]" />
        </div>
      </div>
    );
  }

  if (errorProcesso || !processo) {
    return (
      <div className="p-8 text-center max-w-md mx-auto mt-20">
        <ShieldAlert className="w-16 h-16 text-destructive mx-auto mb-4 opacity-20" />
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">Processo não encontrado</h2>
        <p className="text-slate-500 mb-8 font-medium">O link pode estar quebrado ou você não tem permissão para acessar este recurso.</p>
        <Button onClick={() => router.push("/")} className="rounded-xl px-8">
          Voltar ao Dashboard
        </Button>
      </div>
    );
  }

  const chartData = analysis?.steps || [];

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir este processo? Esta ação não pode ser desfeita.")) {
      try {
        await deleteMutation.mutateAsync(processo.id);
        router.push("/");
      } catch (err) {}
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
    <div className="space-y-8 pb-10 max-w-7xl mx-auto py-6">
      {/* Header with Navigation & Actions */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/processos")}
            className="w-11 h-11 rounded-full border-slate-200 bg-white shadow-sm text-slate-400 hover:text-primary transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Auditoria de Sludge em Tempo Real
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              {processo.nome}
            </h1>
          </div>
        </div>

        {canEdit && (
          <div className="flex items-center gap-3">
             <Button
               variant="outline"
               onClick={() => setShowModal(true)}
               className="h-11 rounded-xl font-bold gap-2 border-slate-200"
             >
                <Edit className="w-4 h-4" />
                Editar Dados
             </Button>
             <Button
               variant="ghost"
               size="icon"
               onClick={handleDelete}
               disabled={deleteMutation.isPending}
               className="h-11 w-11 rounded-xl text-destructive hover:bg-destructive/10 transition-all disabled:opacity-50"
             >
                <Trash2 className="w-5 h-5" />
             </Button>
          </div>
        )}
      </section>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info & Summary */}
        <div className="lg:col-span-1 space-y-8">
           <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
              <CardHeader className="p-8 border-b border-slate-50">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Informações Gerais
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                 <div className="space-y-2">
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                       {processo.descricao || "Nenhuma descrição fornecida para este processo."}
                    </p>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Esfera</label>
                       <Badge variant="secondary" className="font-black h-7 uppercase tracking-tighter px-3">
                          <Landmark className="w-3 h-3 mr-1.5 opacity-60" />
                          {processo.esfera_governo || "Federal"}
                       </Badge>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Abrangência</label>
                       <Badge variant="outline" className="font-black h-7 uppercase tracking-tighter px-3 border-slate-200 text-slate-500">
                          {processo.abrangencia || "Público"}
                       </Badge>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-slate-50">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Público Alvo</label>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Users className="w-4 h-4 text-primary" />
                       </div>
                       <span className="text-sm text-slate-700 font-bold leading-none">
                          {processo.publico_alvo || "Não especificado"}
                       </span>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <div className="bg-primary rounded-[2.5rem] p-8 text-white shadow-2xl shadow-primary/30 relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                 <Layers size={180} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 opacity-70">
                   <ShieldAlert className="w-4 h-4" />
                   <span className="text-[10px] font-black uppercase tracking-widest leading-none">Carga Administrativa</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-80">Total de Etapas</h3>
                  <div className="text-6xl font-black tracking-tighter">{processo.etapas.length}</div>
                </div>
                <p className="text-xs text-blue-100 font-medium leading-relaxed mt-6 opacity-90">
                   Este serviço exige <span className="font-black text-white">{processo.etapas.length} interações</span> distintas do cidadão para ser concluído.
                </p>
              </div>
           </div>
        </div>

        {/* Right Column: Chart & Steps */}
        <div className="lg:col-span-2 space-y-8">
           <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
              <CardHeader className="px-8 pt-8 flex flex-row items-center justify-between border-b border-slate-50 bg-slate-50/20">
                <div className="flex items-center gap-3">
                   <TrendingUp className="w-5 h-5 text-primary" />
                   <CardTitle className="text-xl font-black tracking-tighter uppercase">Análise de Sludge por Etapa</CardTitle>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-primary border-none font-black text-[10px] px-3 py-1 uppercase tracking-widest">
                   Live Analysis
                </Badge>
              </CardHeader>
              <CardContent className="p-8">
                 <SludgeChart data={chartData} />
                 <div className="mt-8 flex items-center justify-between text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-slate-200" />
                       Fase Inicial
                    </div>
                    <div className="flex items-center gap-2">
                       Fase Final
                       <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                 </div>
              </CardContent>
           </Card>

           <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
              <CardHeader className="px-8 pt-8 flex flex-row items-center justify-between border-b border-slate-50">
                 <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-primary" />
                    <CardTitle className="text-xl font-black tracking-tighter uppercase">Lista de Etapas</CardTitle>
                 </div>
                 {canEdit && (
                    <Button
                      size="sm"
                      className="rounded-xl font-black text-[10px] uppercase tracking-widest gap-2"
                      onClick={() => {
                        setEditingEtapa(null);
                        setShowEtapaModal(true);
                      }}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Adicionar Etapa
                    </Button>
                 )}
              </CardHeader>
              <CardContent className="p-0">
                 <Table>
                    <TableHeader className="bg-slate-50/50 hover:bg-transparent">
                        <TableRow className="border-none hover:bg-transparent">
                           <TableHead className="px-8 h-14 text-[10px] font-black text-slate-400 uppercase tracking-widest w-24 text-center">Ordem</TableHead>
                           <TableHead className="px-8 h-14 text-[10px] font-black text-slate-400 uppercase tracking-widest">Comportamento</TableHead>
                           <TableHead className="px-8 h-14 text-[10px] font-black text-slate-400 uppercase tracking-widest w-28 text-center">Planejado</TableHead>
                           <TableHead className="px-8 h-14 text-[10px] font-black text-slate-400 uppercase tracking-widest w-32 text-center">Observado</TableHead>
                           <TableHead className="px-8 h-14 text-[10px] font-black text-slate-400 uppercase tracking-widest w-20 text-center">Obrig.</TableHead>
                           {canEdit && <TableHead className="px-8 h-14 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence mode="popLayout">
                        {processo.etapas.length > 0 ? processo.etapas.map((e, idx) => {
                           const analysisStep = analysis?.steps?.find(s => s.etapa_id === e.id);
                           const isCritical = analysisStep && (analysisStep.prioridade || 0) >= 3;

                           return (
                             <motion.tr 
                               key={e.id}
                               layout
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: idx * 0.05 }}
                               className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group"
                             >
                                <TableCell className="px-8 py-5 text-[10px] font-black text-slate-300 text-center">#0{e.ordem}</TableCell>
                                <TableCell className="px-8 py-5">
                                   <div className="flex flex-col gap-1">
                                      <span className="text-sm font-bold text-slate-900 leading-tight">{e.comportamento}</span>
                                      {analysisStep?.recomendacao && isCritical && (
                                         <Badge variant="destructive" className="w-fit text-[9px] h-5 font-black uppercase tracking-widest gap-1 py-0 px-2 rounded-full">
                                            <Info size={10} />
                                            {analysisStep.recomendacao}
                                         </Badge>
                                      )}
                                   </div>
                                </TableCell>
                                <TableCell className="px-8 py-5 text-center">
                                   <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500">
                                      <Clock size={12} className="opacity-40" />
                                      {e.tempo_planejado ? `${e.tempo_planejado.split(':')[1]}m` : "--"}
                                   </div>
                                </TableCell>
                                <TableCell className="px-8 py-5 text-center">
                                   <Badge variant="outline" className="h-7 rounded-xl border-blue-100 bg-blue-50/50 text-primary font-black text-[11px] tabular-nums px-3">
                                      {e.duracao_media_observada ? `${e.duracao_media_observada.split(':')[1]}m` : "Análise..."}
                                   </Badge>
                                </TableCell>
                                <TableCell className="px-8 py-5">
                                   <div className={cn(
                                     "h-2.5 w-2.5 rounded-full mx-auto ring-4",
                                     e.e_obrigatorio ? "bg-orange-500 ring-orange-500/10" : "bg-slate-100 ring-slate-100/30"
                                   )} />
                                </TableCell>
                                {canEdit && (
                                  <TableCell className="px-8 py-5 text-right">
                                     <div className="flex justify-end gap-1">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => handleEditEtapa(e)}
                                          className="h-8 w-8 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 transition-all"
                                        >
                                          <Edit size={16} />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => handleDeleteEtapa(e.id)}
                                          className="h-8 w-8 rounded-lg text-slate-400 hover:text-destructive hover:bg-destructive/10 transition-all"
                                        >
                                          <Trash2 size={16} />
                                        </Button>
                                     </div>
                                  </TableCell>
                                )}
                             </motion.tr>
                           );
                        }) : (
                          <TableRow className="hover:bg-transparent">
                             <TableCell colSpan={6} className="py-24 text-center">
                                <div className="flex flex-col items-center justify-center space-y-6">
                                   <div className="p-6 bg-slate-50 rounded-[2rem] text-slate-200">
                                      <Layers size={64} strokeWidth={1} />
                                   </div>
                                   <div className="space-y-1">
                                      <p className="text-slate-900 font-black uppercase tracking-widest text-xs">Jornada Vazia</p>
                                      <p className="text-slate-400 text-xs font-medium">Comece adicionando a primeira etapa deste fluxo.</p>
                                   </div>
                                   {canEdit && (
                                      <Button
                                         size="lg"
                                         className="rounded-2xl font-black uppercase tracking-widest text-[10px] h-12 px-8"
                                         onClick={() => {
                                            setEditingEtapa(null);
                                            setShowEtapaModal(true);
                                         }}
                                      >
                                         + Mapear Primeira Etapa
                                      </Button>
                                   )}
                                </div>
                             </TableCell>
                          </TableRow>
                        )}
                      </AnimatePresence>
                    </TableBody>
                 </Table>
              </CardContent>
           </Card>
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

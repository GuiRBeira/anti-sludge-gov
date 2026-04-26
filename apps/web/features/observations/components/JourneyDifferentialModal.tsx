// apps/web/features/observations/components/JourneyDifferentialModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { analysisService, JourneyDifferential } from "@/features/analysis/api/analysisService";
import { Clock, AlertTriangle, CheckCircle2, ArrowRight, TrendingUp, Info } from "lucide-react";

// shadcn/ui components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface JourneyDifferentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  jornadaId: number;
  jornadaProtocolo: string;
}

export function JourneyDifferentialModal({ isOpen, onClose, jornadaId, jornadaProtocolo }: JourneyDifferentialModalProps) {
  const [data, setData] = useState<JourneyDifferential | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      async function load() {
        setLoading(true);
        try {
          const res = await analysisService.getJourneyDifferential(jornadaId);
          setData(res);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
      load();
    }
  }, [isOpen, jornadaId]);

  const formatTime = (seconds: number) => {
    if (seconds === 0) return "0s";
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.floor(Math.abs(seconds) % 60);
    const prefix = seconds < 0 ? "-" : "";
    return `${prefix}${mins > 0 ? `${mins}m ` : ""}${secs}s`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] rounded-[2.5rem] p-8 overflow-hidden flex flex-col max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary rounded-xl text-white">
              <TrendingUp size={20} />
            </div>
            <div className="space-y-0.5">
              <DialogTitle className="text-2xl font-black tracking-tighter uppercase leading-none">
                Análise Comparativa
              </DialogTitle>
              <DialogDescription className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Protocolo: {jornadaProtocolo}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden min-h-0 py-4">
          {loading ? (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-20 w-full rounded-2xl" />
                <Skeleton className="h-20 w-full rounded-2xl" />
                <Skeleton className="h-20 w-full rounded-2xl" />
              </div>
              <Skeleton className="h-64 w-full rounded-2xl" />
            </div>
          ) : data ? (
            <ScrollArea className="h-full pr-4">
              <div className="space-y-8">
                {/* Header / Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="rounded-2xl border-slate-100 shadow-sm bg-slate-50/50">
                    <CardContent className="p-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Eficiência Global</p>
                      <p className={cn(
                        "text-2xl font-black tabular-nums",
                        data.indice_eficiencia_global > 1.2 ? 'text-destructive' : 'text-emerald-600'
                      )}>
                        {data.indice_eficiencia_global.toFixed(2)}x
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="rounded-2xl border-slate-100 shadow-sm bg-slate-50/50">
                    <CardContent className="p-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tempo Real</p>
                      <p className="text-2xl font-black text-slate-900 tabular-nums">{formatTime(data.total_real_segundos)}</p>
                    </CardContent>
                  </Card>
                  <Card className="rounded-2xl border-slate-100 shadow-sm bg-slate-50/50">
                    <CardContent className="p-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Desvio Total</p>
                      <p className={cn(
                        "text-2xl font-black tabular-nums",
                        data.total_real_segundos > data.total_planejado_segundos ? 'text-destructive' : 'text-slate-900'
                      )}>
                        {formatTime(data.total_real_segundos - data.total_planejado_segundos)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Steps Comparison */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Diferencial por Etapa</h4>
                  <div className="space-y-3">
                    {data.detalhe_etapas.sort((a,b) => a.ordem - b.ordem).map((step) => (
                      <div 
                        key={step.etapa_id}
                        className={cn(
                          "p-4 rounded-2xl border transition-all flex items-center justify-between group hover:shadow-lg hover:shadow-slate-200/40",
                          step.status === 'Omitida' ? 'bg-destructive/5 border-destructive/10' : 'bg-white border-slate-100'
                        )}
                      >
                        <div className="flex items-center gap-4">
                           <div className={cn(
                             "w-8 h-8 rounded-full flex items-center justify-center text-xs font-black",
                             step.status === 'Omitida' ? 'bg-destructive/10 text-destructive' : 'bg-slate-100 text-slate-700'
                           )}>
                              {step.ordem}
                           </div>
                           <div>
                              <p className="text-sm font-bold text-slate-900 uppercase tracking-tighter">{step.etapa_nome}</p>
                              <div className="flex items-center gap-2 mt-1">
                                 {step.status === 'Omitida' ? (
                                   <Badge variant="destructive" className="text-[9px] font-black uppercase tracking-tighter px-2 h-4 gap-1">
                                      <AlertTriangle size={10} /> Omitida
                                   </Badge>
                                 ) : (
                                   <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                                      <CheckCircle2 size={12} className="text-emerald-500" /> 
                                      Realizada em <span className="text-slate-600 ml-1">{formatTime(step.tempo_real)}</span>
                                   </div>
                                 )}
                              </div>
                           </div>
                        </div>

                        <div className="text-right">
                           <div className="flex items-center gap-2 justify-end mb-1">
                              <span className="text-[10px] text-slate-400 font-bold tabular-nums">{formatTime(step.tempo_planejado)}</span>
                              <ArrowRight size={10} className="text-slate-300" />
                              <span className={cn(
                                "text-[10px] font-black tabular-nums",
                                step.desvio_segundos > 0 ? 'text-destructive' : 'text-emerald-600'
                              )}>
                                 {formatTime(step.tempo_real)}
                              </span>
                           </div>
                           <p className={cn(
                             "text-[10px] font-black uppercase tracking-widest",
                             step.indice_eficiencia > 1.2 ? 'text-destructive' : 'text-slate-400'
                           )}>
                              EF: {step.indice_eficiencia.toFixed(2)}x
                           </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conclusion Card */}
                <Card className="bg-slate-900 border-none text-white rounded-[2rem] relative overflow-hidden shrink-0">
                  <CardContent className="p-8">
                    <div className="relative z-10">
                       <div className="flex items-center gap-2 mb-4 opacity-50">
                         <Info size={14} />
                         <p className="text-[10px] font-black uppercase tracking-[0.2em]">Conclusão Metodológica</p>
                       </div>
                       <p className="text-sm font-medium leading-relaxed italic text-slate-300">
                          {data.indice_eficiencia_global > 1.5 
                            ? "A jornada apresenta alto índice de atrito. O desvio significativo sugere Sludge informacional ou processual crítico."
                            : data.indice_eficiencia_global > 1.1
                            ? "Fricção moderada detectada. Recomenda-se revisar as etapas com baixo índice de eficiência."
                            : "Jornada dentro do padrão de eficiência ideal mapeado."}
                       </p>
                    </div>
                    <div className="absolute -bottom-8 -right-8 opacity-10">
                       <Clock size={140} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          ) : (
            <div className="py-20 text-center text-slate-400 uppercase tracking-widest text-xs font-black">
              Falha ao carregar diferencial.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

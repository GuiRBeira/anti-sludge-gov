// apps/web/components/analysis/JourneyDifferentialModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { GovModal, GovTag } from "@/components/gov";
import { analysisService, JourneyDifferential } from "@/features/analysis/api/analysisService";
import { Clock, AlertTriangle, CheckCircle2, MinusCircle, ArrowRight } from "lucide-react";

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
    <GovModal isOpen={isOpen} onClose={onClose} title={`Análise Comparativa: ${jornadaProtocolo}`}>
      <div className="space-y-8">
        {loading ? (
          <div className="py-20 text-center text-slate-400 animate-pulse font-bold">Processando diferencial...</div>
        ) : data ? (
          <>
            {/* Header / Stats */}
            <div className="grid grid-cols-3 gap-4">
               <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Eficiência Global</p>
                  <p className={`text-2xl font-black ${data.indice_eficiencia_global > 1.2 ? 'text-red-500' : 'text-green-600'}`}>
                    {data.indice_eficiencia_global.toFixed(2)}x
                  </p>
               </div>
               <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tempo Real</p>
                  <p className="text-2xl font-black text-slate-900">{formatTime(data.total_real_segundos)}</p>
               </div>
               <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Desvio Total</p>
                  <p className={`text-2xl font-black ${data.total_real_segundos > data.total_planejado_segundos ? 'text-red-500' : 'text-slate-900'}`}>
                    {formatTime(data.total_real_segundos - data.total_planejado_segundos)}
                  </p>
               </div>
            </div>

            {/* Steps Comparison */}
            <div className="space-y-4">
               <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">Comparativo por Etapa</h4>
               <div className="space-y-3">
                  {data.detalhe_etapas.sort((a,b) => a.ordem - b.ordem).map((step) => (
                    <div 
                      key={step.etapa_id}
                      className={`p-4 rounded-2xl border ${step.status === 'Omitida' ? 'bg-red-50/50 border-red-100' : 'bg-white border-slate-100'} flex items-center justify-between group hover:shadow-md transition-all`}
                    >
                       <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.status === 'Omitida' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-700'} text-xs font-black`}>
                             {step.ordem}
                          </div>
                          <div>
                             <p className="text-sm font-black text-slate-900">{step.etapa_nome}</p>
                             <div className="flex items-center gap-2 mt-1">
                                {step.status === 'Omitida' ? (
                                  <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase">
                                     <AlertTriangle size={12} /> Etapa Obrigatória Poupada (Sludge por Omissão)
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                                     <CheckCircle2 size={12} className="text-green-500" /> Realizada em {formatTime(step.tempo_real)}
                                  </span>
                                )}
                             </div>
                          </div>
                       </div>

                       <div className="text-right">
                          <div className="flex items-center gap-2 justify-end mb-1">
                             <span className="text-[10px] text-slate-400 font-bold">{formatTime(step.tempo_planejado)}</span>
                             <ArrowRight size={10} className="text-slate-300" />
                             <span className={`text-[10px] font-black ${step.desvio_segundos > 0 ? 'text-red-500' : 'text-green-600'}`}>
                                {formatTime(step.tempo_real)}
                             </span>
                          </div>
                          <p className={`text-xs font-black ${step.indice_eficiencia > 1.2 ? 'text-red-500' : 'text-slate-500'}`}>
                             EF: {step.indice_eficiencia.toFixed(2)}x
                          </p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
               <div className="bg-slate-900 text-white p-6 rounded-3xl relative overflow-hidden">
                  <div className="relative z-10">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Conclusão do Diferencial</p>
                     <p className="text-sm font-medium leading-relaxed">
                        {data.indice_eficiencia_global > 1.5 
                          ? "Esta jornada apresenta um alto índice de atrito. O usuário levou significativamente mais tempo do que o planejado, sugerindo Sludge informacional ou processual crítico."
                          : data.indice_eficiencia_global > 1.1
                          ? "Fricção moderada detectada. Recomenda-se revisar as etapas com índice de eficiência superior a 1.2."
                          : "Jornada dentro do padrão de eficiência ideal."}
                     </p>
                  </div>
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                     <Clock size={80} />
                  </div>
               </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-slate-400">Falha ao carregar diferencial.</div>
        )}
      </div>
    </GovModal>
  );
}

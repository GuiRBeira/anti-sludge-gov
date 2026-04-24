// apps/web/components/analysis/ExtensionLinkerModal.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { GovModal, GovButton, GovTag } from "@/components/gov";
import { extensionService, SessaoExtensao, SessaoExtensaoDetail, InteracaoSummary } from "@/features/analysis/api/extensionService";
import { analysisService } from "@/features/analysis/api/analysisService";
import { MousePointer2, Clock, Globe, ChevronRight, Activity, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ExtensionLinkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  jornadaId: number;
  etapaId: number;
  etapaNome: string;
  processoId: number;
  onSuccess: () => void;
}

export function ExtensionLinkerModal({ isOpen, onClose, jornadaId, etapaId, etapaNome, processoId, onSuccess }: ExtensionLinkerModalProps) {
  const [sessions, setSessions] = useState<SessaoExtensao[]>([]);
  const [selectedSession, setSelectedSession] = useState<SessaoExtensaoDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Selection state
  const [startPoint, setStartPoint] = useState<number | null>(null);
  const [endPoint, setEndPoint] = useState<number | null>(null);

  const loadSessions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await extensionService.listByProcess(processoId);
      setSessions(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [processoId]);

  async function selectSession(session: SessaoExtensao) {
    setLoading(true);
    try {
      const detail = await extensionService.getById(session.id);
      setSelectedSession(detail);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleLink = async () => {
    if (!startPoint || !endPoint) return;
    setSubmitting(true);
    try {
      await analysisService.linkExtensionToStep({
        jornada_id: jornadaId,
        etapa_id: etapaId,
        start_ts: Math.min(startPoint, endPoint),
        end_ts: Math.max(startPoint, endPoint),
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao vincular logs da extensão.");
    } finally {
      setSubmitting(false);
    }
  };

    useEffect(() => {
      if (isOpen) {
        loadSessions();
      } else {
        setSelectedSession(null);
        setStartPoint(null);
        setEndPoint(null);
      }
    }, [isOpen, processoId, loadSessions]);

  // Flatten and sort interactions
  const allInteractions = selectedSession?.paginas
    .flatMap(p => p.interacoes.map(i => ({ ...i, url: p.url })))
    .sort((a,b) => a.timestamp_evento - b.timestamp_evento) || [];

  return (
    <GovModal isOpen={isOpen} onClose={onClose} title={`Vincular Extensão: ${etapaNome}`}>
      <div className="space-y-6">
        {!selectedSession ? (
          <div className="space-y-4">
            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex gap-3">
              <Activity className="text-blue-500" size={20} />
              <p className="text-xs text-blue-700 font-medium">
                Selecione uma sessão gravada pela extensão para extrair o tempo real desta etapa.
              </p>
            </div>

            {loading ? (
              <div className="py-10 text-center animate-pulse text-slate-400 font-bold tracking-widest uppercase">Buscando sessões...</div>
            ) : sessions.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {sessions.map(s => (
                  <button
                    key={s.id}
                    onClick={() => selectSession(s)}
                    className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-4 text-left">
                       <div className="p-2 bg-slate-50 text-slate-400 group-hover:text-blue-500 transition-colors rounded-xl">
                          <Calendar size={18} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-900 leading-none mb-1">
                            Sessão #{s.id}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {format(new Date(s.data_inicio), "dd MMM, HH:mm", { locale: ptBR })} • {s.total_cliques} cliques
                          </p>
                       </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center py-10 text-slate-400 italic text-sm">Nenhuma sessão da extensão encontrada para este processo.</p>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <button
              onClick={() => setSelectedSession(null)}
              className="text-[10px] font-black text-blue-600 hover:underline flex items-center gap-1 uppercase tracking-widest"
            >
              ← Voltar para sessões
            </button>

            <div className="bg-slate-900 text-white p-5 rounded-3xl relative overflow-hidden">
               <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black mb-1">Click Stream da Sessão</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Marco de início / Marco de fim</p>
                  </div>
                  {startPoint && endPoint && (
                    <div className="bg-blue-600 px-3 py-1 rounded-full text-[10px] font-black animate-pulse">
                      INTERVALO SELECIONADO
                    </div>
                  )}
               </div>
               <div className="absolute -bottom-4 -right-4 opacity-10">
                  <MousePointer2 size={100} />
               </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto border border-slate-100 rounded-3xl bg-slate-50/30 p-4 space-y-2 scroller-thin">
               {allInteractions.map((inter, i) => {
                 const isStart = startPoint === inter.timestamp_evento;
                 const isEnd = endPoint === inter.timestamp_evento;
                 const isInRange = startPoint && endPoint &&
                    inter.timestamp_evento >= Math.min(startPoint, endPoint) &&
                    inter.timestamp_evento <= Math.max(startPoint, endPoint);

                 return (
                   <div
                    key={i}
                    onClick={() => {
                      if (!startPoint || (startPoint && endPoint)) {
                        setStartPoint(inter.timestamp_evento);
                        setEndPoint(null);
                      } else {
                        setEndPoint(inter.timestamp_evento);
                      }
                    }}
                    className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                      isStart || isEnd ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-[1.02]'
                      : isInRange ? 'bg-blue-50 border-blue-100 text-blue-700'
                      : 'bg-white border-transparent hover:border-slate-200'
                    }`}
                   >
                      <div className="flex items-start justify-between">
                         <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-lg ${isStart || isEnd ? 'bg-white/20' : 'bg-slate-100 text-slate-400'}`}>
                               <MousePointer2 size={12} />
                            </div>
                            <div>
                               <p className={`text-xs font-black ${isStart || isEnd ? 'text-white' : 'text-slate-900'}`}>
                                  {inter.tipo} em {inter.elemento_tag}
                               </p>
                               <p className={`text-[10px] font-medium leading-none mt-1 ${isStart || isEnd ? 'text-white/70' : 'text-slate-400'}`}>
                                  {inter.elemento_texto || "(sem texto)"}
                               </p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className={`text-[10px] font-bold ${isStart || isEnd ? 'text-white/80' : 'text-slate-400'}`}>
                               {format(new Date(inter.timestamp_evento), "HH:mm:ss.SSS")}
                            </p>
                         </div>
                      </div>
                   </div>
                 );
               })}
            </div>

            <div className="flex gap-3">
               <GovButton type="secondary" onClick={onClose} className="flex-1">Cancelar</GovButton>
               <GovButton
                type="primary"
                onClick={handleLink}
                className="flex-1"
                disabled={!startPoint || !endPoint || submitting}
               >
                  {submitting ? "Vinculando..." : "Vincular Tempo"}
               </GovButton>
            </div>
          </div>
        )}
      </div>
    </GovModal>
  );
}

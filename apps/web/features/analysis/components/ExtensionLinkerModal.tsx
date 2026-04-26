// apps/web/features/analysis/components/ExtensionLinkerModal.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { extensionService, SessaoExtensao, SessaoExtensaoDetail } from "@/features/analysis/api/extensionService";
import { analysisService } from "@/features/analysis/api/analysisService";
import { MousePointer2, ChevronRight, Activity, Calendar, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// shadcn/ui components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

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

  const allInteractions = selectedSession?.paginas
    .flatMap(p => p.interacoes.map(i => ({ ...i, url: p.url })))
    .sort((a,b) => a.timestamp_evento - b.timestamp_evento) || [];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[650px] rounded-[2.5rem] p-8 overflow-hidden flex flex-col max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary rounded-xl text-white">
              <Activity size={20} />
            </div>
            <div className="space-y-0.5">
              <DialogTitle className="text-2xl font-black tracking-tighter uppercase leading-none">
                Vincular Extensão
              </DialogTitle>
              <DialogDescription className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Etapa: {etapaNome}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden min-h-0 py-4">
          {!selectedSession ? (
            <div className="space-y-6 h-full flex flex-col">
              <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100 flex gap-3">
                <Activity className="text-primary shrink-0" size={18} />
                <p className="text-[11px] text-blue-700 font-bold leading-relaxed uppercase tracking-tight">
                  Selecione uma sessão gravada pela extensão para extrair o tempo real desta etapa no fluxo.
                </p>
              </div>

              <ScrollArea className="flex-1 pr-4">
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-20 w-full rounded-2xl" />
                    <Skeleton className="h-20 w-full rounded-2xl" />
                    <Skeleton className="h-20 w-full rounded-2xl" />
                  </div>
                ) : sessions.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {sessions.map(s => (
                      <button
                        key={s.id}
                        onClick={() => selectSession(s)}
                        className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all group text-left"
                      >
                        <div className="flex items-center gap-4">
                           <div className="p-2.5 bg-slate-50 text-slate-400 group-hover:text-primary transition-colors rounded-xl">
                              <Calendar size={20} />
                           </div>
                           <div>
                              <p className="text-sm font-black text-slate-900 leading-none mb-1.5 uppercase">
                                Sessão #{s.id}
                              </p>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-tighter px-2 h-4">
                                  {format(new Date(s.data_inicio), "dd MMM, HH:mm", { locale: ptBR })}
                                </Badge>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                  {s.total_cliques} cliques
                                </span>
                              </div>
                           </div>
                        </div>
                        <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Nenhuma sessão encontrada.</p>
                  </div>
                )}
              </ScrollArea>
            </div>
          ) : (
            <div className="space-y-6 h-full flex flex-col animate-in slide-in-from-right-4 duration-300">
              <Button
                variant="link"
                onClick={() => setSelectedSession(null)}
                className="text-[10px] font-black text-primary p-0 h-auto uppercase tracking-[0.2em] w-fit"
              >
                <ArrowLeft className="w-3 h-3 mr-2" />
                Voltar para sessões
              </Button>

              <div className="bg-slate-900 text-white p-6 rounded-[2rem] relative overflow-hidden shrink-0">
                 <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest mb-1">Click Stream da Sessão</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic opacity-70">Selecione o marco de início e o marco de fim</p>
                    </div>
                    {startPoint && endPoint && (
                      <Badge className="bg-primary/20 text-primary border-primary/30 animate-pulse font-black text-[9px] px-3">
                        INTERVALO DEFINIDO
                      </Badge>
                    )}
                 </div>
                 <div className="absolute -bottom-6 -right-6 opacity-10">
                    <MousePointer2 size={120} />
                 </div>
              </div>

              <ScrollArea className="flex-1 pr-4 bg-slate-50/50 rounded-[2rem] border border-slate-100 p-4">
                 <div className="space-y-2">
                  {allInteractions.map((inter, i) => {
                    const isStart = startPoint === inter.timestamp_evento;
                    const isEnd = endPoint === inter.timestamp_evento;
                    const isInRange = startPoint && endPoint &&
                        inter.timestamp_evento >= Math.min(startPoint, endPoint) &&
                        inter.timestamp_evento <= Math.max(startPoint, endPoint);

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (!startPoint || (startPoint && endPoint)) {
                            setStartPoint(inter.timestamp_evento);
                            setEndPoint(null);
                          } else {
                            setEndPoint(inter.timestamp_evento);
                          }
                        }}
                        className={cn(
                          "w-full p-4 rounded-2xl cursor-pointer transition-all border text-left",
                          isStart || isEnd 
                            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                            : isInRange 
                              ? 'bg-primary/5 border-primary/20 text-primary'
                              : 'bg-white border-transparent hover:border-slate-200'
                        )}
                      >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                  "p-2 rounded-xl transition-colors",
                                  isStart || isEnd ? 'bg-white/20' : 'bg-slate-50 text-slate-400'
                                )}>
                                  <MousePointer2 size={14} />
                                </div>
                                <div>
                                  <p className={cn(
                                    "text-xs font-black uppercase tracking-tighter",
                                    isStart || isEnd ? 'text-white' : 'text-slate-900'
                                  )}>
                                      {inter.tipo} @ {inter.elemento_tag}
                                  </p>
                                  <p className={cn(
                                    "text-[10px] font-bold mt-1 line-clamp-1",
                                    isStart || isEnd ? 'text-white/70' : 'text-slate-400'
                                  )}>
                                      {inter.elemento_texto || "(sem conteúdo)"}
                                  </p>
                                </div>
                            </div>
                            <div className="shrink-0">
                                <p className={cn(
                                  "text-[10px] font-black tabular-nums",
                                  isStart || isEnd ? 'text-white/80' : 'text-slate-400'
                                )}>
                                  {format(new Date(inter.timestamp_evento), "HH:mm:ss.SSS")}
                                </p>
                            </div>
                          </div>
                      </button>
                    );
                  })}
                 </div>
              </ScrollArea>
            </div>
          )}
        </div>

        <DialogFooter className="pt-6 gap-3 sm:gap-0">
          <Button variant="ghost" onClick={onClose} className="rounded-xl font-bold h-12 px-6">
            Cancelar
          </Button>
          {selectedSession && (
            <Button
              onClick={handleLink}
              disabled={!startPoint || !endPoint || submitting}
              className="rounded-xl font-bold h-12 px-8 shadow-lg shadow-primary/20"
            >
              {submitting ? "Vinculando..." : "Confirmar Intervalo"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

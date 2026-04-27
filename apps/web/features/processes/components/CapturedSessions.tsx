// apps/web/features/processes/components/CapturedSessions.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { extensionService } from "../api/extensionService";
import { 
  History, 
  Clock, 
  MousePointer2, 
  ExternalLink, 
  Layers,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CapturedSessionsProps {
  processId: number;
}

export function CapturedSessions({ processId }: CapturedSessionsProps) {
  const { data: sessions, isLoading } = useQuery({
    queryKey: ["extension-sessions", processId],
    queryFn: () => extensionService.listByProcess(processId),
    refetchInterval: 5000, // Polling a cada 5s para ver novas sessões da extensão
  });

  if (isLoading) {
    return <div className="p-8 text-center text-slate-400">Carregando sessões capturadas...</div>;
  }

  if (!sessions || sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
          <History className="text-slate-300" />
        </div>
        <h3 className="text-lg font-black uppercase tracking-tighter text-slate-900">Nenhuma captura detectada</h3>
        <p className="text-sm text-slate-500 max-w-xs mt-2">
          Use a extensão no navegador para iniciar o mapeamento deste processo. Os dados aparecerão aqui automaticamente.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black tracking-tighter uppercase flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          Histórico de Capturas da Extensão
        </h2>
        <Badge variant="outline" className="font-bold border-primary/20 text-primary bg-primary/5">
          {sessions.length} {sessions.length === 1 ? "Sessão" : "Sessões"} detectadas
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sessions.map((session) => (
          <Card key={session.id} className="group hover:border-primary/30 transition-all rounded-[2rem] border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Layers className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                      Sessão #{session.session_id_extensao.slice(0, 8)}
                    </div>
                    <div className="text-lg font-bold text-slate-900 leading-none mb-2">
                      {format(new Date(session.data_inicio), "PPP 'às' p", { locale: ptBR })}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <Clock size={14} className="opacity-40" />
                        {Math.floor((session.total_tempo_segundos || 0) / 60)}m {(session.total_tempo_segundos || 0) % 60}s
                      </div>
                      <div className="w-1 h-1 rounded-full bg-slate-200" />
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <MousePointer2 size={14} className="opacity-40" />
                        {session.total_cliques} cliques
                      </div>
                      <div className="w-1 h-1 rounded-full bg-slate-200" />
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <ExternalLink size={14} className="opacity-40" />
                        {session.total_paginas} páginas
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl font-bold gap-2 border-slate-200 group-hover:border-primary/30 group-hover:text-primary transition-all">
                    Visualizar Timeline
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

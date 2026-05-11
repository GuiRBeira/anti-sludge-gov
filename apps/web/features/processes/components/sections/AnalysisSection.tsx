import React from "react";
import { BarChart3, MessageSquareWarning, Smile, Map } from "lucide-react";
import { Processo } from "../../api/processService";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AnalysisSectionProps {
  formData: Partial<Processo>;
  onChange: (field: keyof Processo, value: any) => void;
}

export function AnalysisSection({ formData, onChange }: AnalysisSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Indicadores */}
      <Card className="rounded-[2rem] border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <BarChart3 className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">Indicadores e Diagnóstico</h3>
        </div>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1.5">
              <Map className="w-3 h-3" /> Indicadores de Desempenho
            </Label>
            <Textarea
              placeholder="Quais KPIs são monitorados hoje?"
              className="min-h-[100px] rounded-xl border-slate-200 focus-visible:ring-primary font-medium"
              value={formData.indicadores_desempenho}
              onChange={(e) => onChange("indicadores_desempenho", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1.5">
              <MessageSquareWarning className="w-3 h-3" /> Hipóteses de Dificuldade
            </Label>
            <Textarea
              placeholder="Onde você suspeita que o usuário mais trava?"
              className="min-h-[100px] rounded-xl border-slate-200 focus-visible:ring-primary font-medium"
              value={formData.hipoteses_dificuldades}
              onChange={(e) => onChange("hipoteses_dificuldades", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Registros */}
      <Card className="rounded-[2rem] border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Smile className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">Satisfação e Reclamações</h3>
        </div>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Registros de Reclamação</Label>
            <Textarea
              placeholder="O que os canais de atendimento dizem?"
              className="min-h-[100px] rounded-xl border-slate-200 focus-visible:ring-primary font-medium"
              value={formData.registros_reclamacao}
              onChange={(e) => onChange("registros_reclamacao", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Pesquisas de Satisfação</Label>
            <Textarea
              placeholder="Qual a nota atual do serviço?"
              className="min-h-[100px] rounded-xl border-slate-200 focus-visible:ring-primary font-medium"
              value={formData.registros_satisfacao}
              onChange={(e) => onChange("registros_satisfacao", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

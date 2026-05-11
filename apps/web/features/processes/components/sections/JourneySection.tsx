import React from "react";
import { Clock, Target } from "lucide-react";
import { Processo } from "../../api/processService";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface JourneySectionProps {
  formData: Partial<Processo>;
  onChange: (field: keyof Processo, value: any) => void;
}

export function JourneySection({ formData, onChange }: JourneySectionProps) {
  return (
    <Card className="rounded-[2rem] border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <Clock className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">Jornada Ideal (Planejada)</h3>
      </div>
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Descrição da Jornada Ideal</Label>
          <Textarea
            placeholder="Descreva o caminho formal definido para alcançar o resultado..."
            className="min-h-[150px] rounded-xl border-slate-200 focus-visible:ring-primary font-medium"
            value={formData.jornada_planejada_descricao}
            onChange={(e) => onChange("jornada_planejada_descricao", e.target.value)}
          />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> Tempo Médio Estimado
            </Label>
            <Input
              placeholder="Ex: 15 minutos"
              className="rounded-xl border-slate-200 h-11 font-medium"
              value={formData.tempo_medio_estimado}
              onChange={(e) => onChange("tempo_medio_estimado", e.target.value)}
            />
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-primary mt-0.5" />
              <p className="text-xs text-blue-800 font-medium leading-relaxed">
                A jornada planejada serve como base para comparar com a <span className="font-bold">jornada real</span> capturada pela extensão.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

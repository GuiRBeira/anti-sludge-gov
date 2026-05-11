import React from "react";
import { Target } from "lucide-react";
import { Processo, EsferaGoverno, Abrangencia } from "../../api/processService";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContextSectionProps {
  formData: Partial<Processo>;
  onChange: (field: keyof Processo, value: any) => void;
}

export function ContextSection({ formData, onChange }: ContextSectionProps) {
  return (
    <Card className="rounded-[2rem] border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <Target className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">Contexto e Estrutura</h3>
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Objetivo do Processo</Label>
          <Input
            placeholder="Ex: Garantir o acesso a benefícios assistenciais..."
            className="rounded-xl border-slate-200 h-11 font-medium"
            value={formData.objetivo}
            onChange={(e) => onChange("objetivo", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Esfera do Governo</Label>
            <Select
              value={formData.esfera_governo}
              onValueChange={(val) => val && onChange("esfera_governo", val)}
            >
              <SelectTrigger className="rounded-xl border-slate-200 h-11 font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value={EsferaGoverno.FEDERAL}>Federal</SelectItem>
                <SelectItem value={EsferaGoverno.ESTADUAL}>Estadual</SelectItem>
                <SelectItem value={EsferaGoverno.MUNICIPAL}>Municipal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Abrangência</Label>
            <Select
              value={formData.abrangencia}
              onValueChange={(val) => val && onChange("abrangencia", val)}
            >
              <SelectTrigger className="rounded-xl border-slate-200 h-11 font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value={Abrangencia.PUBLICO_GERAL}>Universal</SelectItem>
                <SelectItem value={Abrangencia.PUBLICO_ESPECIFICO}>Específica</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

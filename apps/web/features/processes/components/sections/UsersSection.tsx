import React from "react";
import { Users } from "lucide-react";
import { Processo } from "../../api/processService";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UsersSectionProps {
  formData: Partial<Processo>;
  onChange: (field: keyof Processo, value: any) => void;
}

export function UsersSection({ formData, onChange }: UsersSectionProps) {
  return (
    <Card className="rounded-[2rem] border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <Users className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">Pessoas Usuárias</h3>
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Usuários/Ano (Est.)</Label>
            <Input
              type="number"
              min="0"
              className="rounded-xl border-slate-200 h-11 font-medium"
              value={formData.usuarios_estimados_ano}
              onChange={(e) => onChange("usuarios_estimados_ano", Math.max(0, parseInt(e.target.value) || 0))}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Público Alvo</Label>
            <Input
              placeholder="Ex: Microempreendedores"
              className="rounded-xl border-slate-200 h-11 font-medium"
              value={formData.publico_alvo}
              onChange={(e) => onChange("publico_alvo", e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Perfil Foco do Mapeamento</Label>
          <Input
            placeholder="Ex: Idosos com baixa alfabetização digital"
            className="rounded-xl border-slate-200 h-11 font-medium"
            value={formData.perfil_foco_mapeamento}
            onChange={(e) => onChange("perfil_foco_mapeamento", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Necessidade do Usuário</Label>
          <Input
            placeholder="O que motiva o usuário a buscar este serviço?"
            className="rounded-xl border-slate-200 h-11 font-medium"
            value={formData.necessidade_usuario}
            onChange={(e) => onChange("necessidade_usuario", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

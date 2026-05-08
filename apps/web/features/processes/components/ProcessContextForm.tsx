// apps/web/features/processes/components/ProcessContextForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Users,
  Target,
  Clock,
  BarChart3,
  MessageSquareWarning,
  Smile,
  Map,
  Info
} from "lucide-react";
import { Processo, EsferaGoverno, Abrangencia } from "../api/processService";
import { useUpdateProcessMutation } from "../api/useProcessQueries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface ProcessContextFormProps {
  processo: Processo;
}

export function ProcessContextForm({ processo }: ProcessContextFormProps) {
  const updateMutation = useUpdateProcessMutation();

  const [formData, setFormData] = useState<Partial<Processo>>({
    nome: processo.nome,
    descricao: processo.descricao || "",
    objetivo: processo.objetivo || "",
    esfera_governo: processo.esfera_governo || EsferaGoverno.FEDERAL,
    abrangencia: processo.abrangencia || Abrangencia.PUBLICO_GERAL,
    publico_alvo: processo.publico_alvo || "",
    usuarios_estimados_ano: processo.usuarios_estimados_ano || 0,
    perfil_foco_mapeamento: processo.perfil_foco_mapeamento || "",
    jornada_planejada_descricao: processo.jornada_planejada_descricao || "",
    necessidade_usuario: processo.necessidade_usuario || "",
    tempo_medio_estimado: processo.tempo_medio_estimado || "",
    indicadores_desempenho: processo.indicadores_desempenho || "",
    hipoteses_dificuldades: processo.hipoteses_dificuldades || "",
    registros_reclamacao: processo.registros_reclamacao || "",
    registros_satisfacao: processo.registros_satisfacao || "",
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync({
        id: processo.id,
        data: formData,
      });
      setIsDirty(false);
      toast.success("Contexto do processo atualizado com sucesso!");
    } catch (err) {
      toast.error("Erro ao atualizar o contexto.");
    }
  };

  const handleChange = (field: keyof Processo, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="flex items-center justify-between sticky top-0 z-20 bg-white/80 backdrop-blur-md border-slate-100 rounded-lg mb-6 p-4">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">Compreensão do Contexto</h2>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Etapa 1 da Metodologia F5 Anti-Sludge</p>
        </div>
        <Button
          type="submit"
          disabled={updateMutation.isPending || !isDirty}
          className="rounded-xl font-bold gap-2 shadow-lg shadow-primary/20 h-11 px-6"
        >
          <Save className="w-4 h-4" />
          {updateMutation.isPending ? "Salvando..." : "Salvar Contexto"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section 1: General Info */}
        <Card className="rounded-[2rem] border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Info className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">Identificação e Escopo</h3>
          </div>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Objetivo Principal</Label>
              <Textarea
                placeholder="Descreva o resultado esperado deste serviço"
                className="min-h-[100px] rounded-xl border-slate-200 focus-visible:ring-primary font-medium"
                value={formData.objetivo}
                onChange={(e) => handleChange("objetivo", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Esfera</Label>
                <Select
                  value={formData.esfera_governo}
                  onValueChange={(val) => handleChange("esfera_governo", val)}
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
                  onValueChange={(val) => handleChange("abrangencia", val)}
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

        {/* Section 2: Users & Focus */}
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
                  onChange={(e) => handleChange("usuarios_estimados_ano", Math.max(0, parseInt(e.target.value) || 0))}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Público Alvo</Label>
                <Input
                  placeholder="Ex: Microempreendedores"
                  className="rounded-xl border-slate-200 h-11 font-medium"
                  value={formData.publico_alvo}
                  onChange={(e) => handleChange("publico_alvo", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Perfil Foco do Mapeamento</Label>
              <Input
                placeholder="Ex: Idosos com baixa alfabetização digital"
                className="rounded-xl border-slate-200 h-11 font-medium"
                value={formData.perfil_foco_mapeamento}
                onChange={(e) => handleChange("perfil_foco_mapeamento", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Necessidade do Usuário</Label>
              <Input
                placeholder="O que motiva o usuário a buscar este serviço?"
                className="rounded-xl border-slate-200 h-11 font-medium"
                value={formData.necessidade_usuario}
                onChange={(e) => handleChange("necessidade_usuario", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Planned Journey */}
        <Card className="rounded-[2rem] border-slate-100 shadow-sm overflow-hidden md:col-span-2">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Map className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">Jornada Planejada (Formal)</h3>
          </div>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Descrição da Jornada Ideal</Label>
              <Textarea
                placeholder="Descreva o caminho formal definido para alcançar o resultado (manuais, guias, etc)"
                className="min-h-[150px] rounded-xl border-slate-200 focus-visible:ring-primary font-medium"
                value={formData.jornada_planejada_descricao}
                onChange={(e) => handleChange("jornada_planejada_descricao", e.target.value)}
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
                  onChange={(e) => handleChange("tempo_medio_estimado", e.target.value)}
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

        {/* Section 4: Performance & Difficulties */}
        <Card className="rounded-[2rem] border-slate-100 shadow-sm overflow-hidden md:col-span-2">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">Indicadores e Diagnóstico</h3>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Principal Indicador (KPI)</Label>
                  <Input
                    placeholder="Ex: Taxa de abandono do formulário"
                    className="rounded-xl border-slate-200 h-11 font-medium"
                    value={formData.indicadores_desempenho}
                    onChange={(e) => handleChange("indicadores_desempenho", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1.5">
                    <MessageSquareWarning className="w-3 h-3" /> Registros de Reclamação
                  </Label>
                  <Textarea
                    placeholder="Principais dores relatadas pelos usuários no suporte/ouvidoria"
                    className="min-h-[100px] rounded-xl border-slate-200 font-medium"
                    value={formData.registros_reclamacao}
                    onChange={(e) => handleChange("registros_reclamacao", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1.5">
                    <Smile className="w-3 h-3" /> Avaliação de Satisfação
                  </Label>
                  <Input
                    placeholder="Ex: NPS 45 / 3.5 estrelas na loja"
                    className="rounded-xl border-slate-200 h-11 font-medium"
                    value={formData.registros_satisfacao}
                    onChange={(e) => handleChange("registros_satisfacao", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Hipóteses de Dificuldades</Label>
                  <Textarea
                    placeholder="Onde a equipe acredita que estão os maiores gargalos comportamentais?"
                    className="min-h-[100px] rounded-xl border-slate-200 font-medium"
                    value={formData.hipoteses_dificuldades}
                    onChange={(e) => handleChange("hipoteses_dificuldades", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}

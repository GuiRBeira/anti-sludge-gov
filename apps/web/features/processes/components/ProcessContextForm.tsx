"use client";

import React from "react";
import { Save } from "lucide-react";
import { Processo } from "../api/processService";
import { Button } from "@/components/ui/button";
import { useProcessContextForm } from "../hooks/useProcessContextForm";

// Seções
import { ContextSection } from "./sections/ContextSection";
import { UsersSection } from "./sections/UsersSection";
import { JourneySection } from "./sections/JourneySection";
import { AnalysisSection } from "./sections/AnalysisSection";

interface ProcessContextFormProps {
  processo: Processo;
}

export function ProcessContextForm({ processo }: ProcessContextFormProps) {
  const {
    formData,
    isDirty,
    isPending,
    handleChange,
    handleSubmit,
  } = useProcessContextForm(processo);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="flex items-center justify-between sticky top-0 z-20 bg-white/80 backdrop-blur-md border-slate-100 rounded-lg mb-6 p-4">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">Compreensão do Contexto</h2>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Etapa 1 da Metodologia F5 Anti-Sludge</p>
        </div>
        <Button
          type="submit"
          disabled={isPending || !isDirty}
          className="rounded-xl font-bold gap-2 shadow-lg shadow-primary/20 h-11 px-6"
        >
          <Save className="w-4 h-4" />
          {isPending ? "Salvando..." : "Salvar Contexto"}
        </Button>
      </div>

      <div className="space-y-8">
        {/* Seção 1: Contexto e Estrutura */}
        <ContextSection formData={formData} onChange={handleChange} />

        {/* Seção 2: Pessoas Usuárias */}
        <UsersSection formData={formData} onChange={handleChange} />

        {/* Seção 3: Jornada Ideal */}
        <JourneySection formData={formData} onChange={handleChange} />

        {/* Seção 4: Performance & Diagnóstico */}
        <AnalysisSection formData={formData} onChange={handleChange} />
      </div>
    </form>
  );
}

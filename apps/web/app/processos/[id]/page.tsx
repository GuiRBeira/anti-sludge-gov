// apps/web/app/processos/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GovButton, GovCard, GovTag } from "@/components/gov";
import { processService, ProcessoDetail } from "@/services/process-service";
import { ArrowLeft, Clock, Layers, Users, Building, Globe } from "lucide-react";

export default function ProcessDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<ProcessoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await processService.getById(Number(id));
        setData(res);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os detalhes do processo.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-slate-500 animate-pulse">Carregando jornada...</p></div>;
  if (error || !data) return <div className="bg-red-50 p-6 rounded-xl text-red-600 font-bold">{error || "Processo não encontrado."}</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Voltar para listagem
      </button>

      <section className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <h2 className="text-4xl font-black text-slate-900 tracking-tight">{data.nome}</h2>
             <GovTag 
               type="status" 
               color={data.status === "Crítico" ? "danger" : data.status === "Em Andamento" ? "warning" : "success"}
               value={data.status}
             />
          </div>
          <p className="text-slate-500 text-lg max-w-3xl">{data.descricao || "Sem descrição disponível."}</p>
        </div>

        <div className="flex gap-3">
           <GovButton type="secondary">Editar</GovButton>
           <GovButton type="primary">Nova Jornada</GovButton>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Esfera", value: data.esfera_governo, icon: Building },
          { label: "Abrangência", value: data.abrangencia, icon: Globe },
          { label: "Público Alvo", value: data.publico_alvo, icon: Users },
          { label: "Usuários/Ano", value: data.usuarios_estimados_ano?.toLocaleString("pt-BR"), icon: Clock },
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">
              <item.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
              <p className="text-sm font-black text-slate-900">{item.value || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>

      <GovCard title="Mapeamento da Jornada" icon="mdi:vector-arrange-below">
        <div className="p-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100 hidden md:block" />

            <div className="space-y-8 relative">
              {data.etapas?.length > 0 ? data.etapas.sort((a,b) => a.ordem - b.ordem).map((etapa, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  key={etapa.id} 
                  className="flex flex-col md:flex-row gap-6 relative"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center text-gov-blue-light font-black text-xl shadow-sm z-10">
                    {idx + 1}
                  </div>
                  
                  <div className="flex-1 bg-slate-50/50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                       <h4 className="text-lg font-black text-slate-900">{etapa.comportamento}</h4>
                       <GovTag 
                        type="text" 
                        color={etapa.e_obrigatorio ? "warning" : "neutral"} 
                        size="small"
                        value={etapa.e_obrigatorio ? "Obrigatório" : "Opcional"}
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-medium">
                       <span className="flex items-center gap-1">
                         <Clock size={14} /> Tempo Planejado: {etapa.tempo_planejado || "Não definido"}
                       </span>
                       <span className="flex items-center gap-1">
                         <Layers size={14} /> Ordem: {etapa.ordem}
                       </span>
                    </div>

                    <div className="mt-4 flex gap-2">
                       <button className="text-[11px] font-bold text-blue-600 hover:underline">Ver critérios de impacto</button>
                       <span className="text-slate-300">•</span>
                       <button className="text-[11px] font-bold text-blue-600 hover:underline">Histórico de tempos</button>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-10">
                  <p className="text-slate-400 italic">Nenhuma etapa mapeada para este processo.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </GovCard>
    </div>
  );
}

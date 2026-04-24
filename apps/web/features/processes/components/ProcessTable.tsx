import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import { GovButton, GovIcon } from "@/components/gov";
import { Processo } from "../api/processService";
import { Edit2, ArrowRight, Landmark, Activity } from "lucide-react";

interface ProcessTableProps {
  processos: Processo[];
  loading: boolean;
  error: any;
  onEdit: (processo: Processo) => void;
}

export function ProcessTable({ processos, loading, error, onEdit }: ProcessTableProps) {
  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="py-20 text-center animate-pulse">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
              <Activity className="text-slate-300 animate-spin" size={24} />
            </div>
            <p className="text-slate-400 font-bold text-sm">Carregando dados extraordinários...</p>
          </div>
        </div>
      ) : error ? (
        <div className="py-20 text-center bg-red-50/50 rounded-3xl m-4">
          <p className="text-red-500 font-bold italic">Erro ao carregar processos. Tente novamente.</p>
        </div>
      ) : processos.length === 0 ? (
         <div className="py-20 text-center text-slate-400 bg-slate-50/50 rounded-3xl m-4 border-2 border-dashed border-slate-100">
            <GovIcon icon="mdi:file-document-outline" size={48} className="mx-auto opacity-20 mb-4" />
            <p className="font-bold">Nenhum processo encontrado.</p>
            <GovButton type="secondary" size="small" className="mt-4">Importar Dados Iniciais</GovButton>
         </div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">ID</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Processo</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Esfera</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {processos.map((p, idx) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-slate-50 hover:bg-slate-50/80 transition-all group"
              >
                <td className="px-6 py-5 text-xs font-black text-slate-300 text-center">#0{p.id}</td>
                <td className="px-6 py-5">
                  <Link href={`/processos/${p.id}`} className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer block">
                    {p.nome}
                  </Link>
                  <div className="text-xs font-medium text-slate-400 mt-0.5 line-clamp-1 max-w-md">
                    {p.descricao || "Sem descrição disponível para este processo"}
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full w-fit mx-auto">
                    <Landmark size={20} />
                    <span className="text-xs font-black uppercase tracking-tighter">{p.esfera_governo || "Federal"}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className={clsx(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full w-fit border mx-auto",
                    p.status === "Finalizado" ? "bg-emerald-500/20 border-emerald-500 text-emerald-500" :
                    p.status === "Crítico" ? "bg-red-500/20 border-red-500 text-red-500" :
                    "bg-orange-500/20 border-orange-500 text-orange-500"
                  )}>
                    <div className={clsx(
                      "w-1.5 h-1.5 rounded-full animate-pulse",
                      p.status === "Finalizado" ? "bg-emerald-500" :
                      p.status === "Crítico" ? "bg-red-500" : "bg-orange-500"
                    )} />
                    <span className="text-xs font-black uppercase tracking-tighter">{p.status}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="flex justify-center gap-2 transition-opacity">
                    <button
                      onClick={() => onEdit(p)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      title="Editar Processo"
                    >
                      <Edit2 size={20} />
                    </button>
                    <Link
                      href={`/processos/${p.id}`}
                      className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                      title="Ver Detalhes"
                    >
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

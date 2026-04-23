// apps/web/features/processes/components/ProcessTable.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GovButton, GovTag, GovIcon } from "@/components/gov";
import { Processo } from "../api/processService";

interface ProcessTableProps {
  processos: Processo[];
  loading: boolean;
  error: any;
  onEdit: (processo: Processo) => void;
}

export function ProcessTable({ processos, loading, error, onEdit }: ProcessTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-black text-slate-800 uppercase text-xs tracking-tighter italic">
          Processos em Monitoramento
        </h3>
        <div className="flex gap-2">
           <GovTag type="status" color="success" value="ATIVO" />
        </div>
      </div>

      <div className="p-2 overflow-x-auto">
        {loading ? (
          <div className="py-20 text-center animate-pulse">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
              <p className="text-slate-400 font-bold text-sm">Carregando dados extraordinários...</p>
            </div>
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <p className="text-red-500 font-bold">Erro ao carregar processos.</p>
          </div>
        ) : processos.length === 0 ? (
           <div className="py-20 text-center text-slate-400">
              <GovIcon icon="mdi:file-document-outline" size={48} className="mx-auto opacity-20 mb-4" />
              <p className="font-bold">Nenhum processo encontrado.</p>
              <GovButton type="secondary" size="small" className="mt-4">Importar Dados Iniciais</GovButton>
           </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 italic">
                <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">ID</th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Processo</th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Esfera</th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Status</th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {processos.map((p) => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-4 py-4 text-xs font-bold text-slate-400">#{p.id}</td>
                  <td className="px-4 py-4">
                    <Link href={`/processos/${p.id}`} className="text-sm font-black text-slate-800 hover:text-blue-600 transition-colors cursor-pointer">
                      {p.nome}
                    </Link>
                    <div className="text-[10px] font-medium text-slate-400 truncate max-w-xs">{p.descricao || "Sem descrição"}</div>
                  </td>
                  <td className="px-4 py-4">
                    <GovTag type="icon" icon="fas fa-landmark" value={p.esfera_governo || "N/A"} size="small" className="text-[9px] font-black" />
                  </td>
                  <td className="px-4 py-4">
                    <GovTag
                      type="text"
                      color={p.status === "Concluído" ? "success" : "warning"}
                      value={p.status.toUpperCase()}
                      className="text-[9px] font-bold"
                    />
                  </td>
                  <td className="px-4 py-4 text-right flex justify-end gap-2">
                    <GovButton
                      type="secondary"
                      size="small"
                      circle
                      icon="mdi:pencil"
                      onClick={() => onEdit(p)}
                      className="text-blue-500 border-blue-100 hover:bg-blue-50"
                    />
                    <Link href={`/processos/${p.id}`}>
                      <GovButton type="secondary" size="small" circle icon="fas fa-arrow-right" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}

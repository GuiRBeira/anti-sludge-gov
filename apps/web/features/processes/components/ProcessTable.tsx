// apps/web/features/processes/components/ProcessTable.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Processo } from "../api/processService";
import { Edit2, ArrowRight, Landmark, Activity, SearchX } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";

// shadcn/ui components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProcessTableProps {
  processos: Processo[];
  loading: boolean;
  error: any;
  onEdit: (processo: Processo) => void;
}

export function ProcessTable({ processos, loading, error, onEdit }: ProcessTableProps) {
  const { canEdit } = useAuth();

  return (
    <div className="w-full">
      {loading ? (
        <div className="py-24 text-center animate-pulse">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
              <Activity className="text-primary/30 animate-spin" size={24} />
            </div>
            <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">Processando dados...</p>
          </div>
        </div>
      ) : error ? (
        <div className="py-20 text-center m-4">
          <p className="text-destructive font-black italic uppercase tracking-tighter">Erro ao carregar processos.</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Tentar Novamente</Button>
        </div>
      ) : processos.length === 0 ? (
         <div className="py-24 text-center text-slate-400 m-8 border-2 border-dashed border-slate-100 rounded-[2rem]">
            <SearchX size={48} className="mx-auto opacity-10 mb-4" />
            <p className="font-bold uppercase tracking-widest text-xs">Nenhum processo encontrado.</p>
         </div>
      ) : (
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="px-8 h-14 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-20">ID</TableHead>
              <TableHead className="px-8 h-14 text-[10px] font-black text-slate-400 uppercase tracking-widest">Processo</TableHead>
              <TableHead className="px-8 h-14 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Esfera</TableHead>
              <TableHead className="px-8 h-14 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</TableHead>
              <TableHead className="px-8 h-14 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {processos.map((p, idx) => (
                <motion.tr
                  key={p.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <TableCell className="px-8 py-5 text-[10px] font-black text-slate-300 text-center">
                    #0{p.id}
                  </TableCell>
                  <TableCell className="px-8 py-5">
                    <Link href={`/processos/${p.id}`} className="text-sm font-bold text-slate-900 hover:text-primary transition-colors cursor-pointer block">
                      {p.nome}
                    </Link>
                    <div className="text-[11px] font-medium text-slate-400 mt-0.5 line-clamp-1 max-w-md">
                      {p.descricao || "Sem descrição disponível para este processo"}
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-5">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-xl w-fit mx-auto border border-slate-200/50">
                      <Landmark size={14} className="text-slate-400" />
                      <span className="text-[10px] font-black uppercase tracking-tighter">{p.esfera_governo || "Federal"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-5">
                    <div className="flex justify-center">
                      <Badge
                        variant={p.status === "Crítico" ? "destructive" : p.status === "Finalizado" ? "default" : "secondary"}
                        className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter gap-1.5",
                          p.status === "Finalizado" && "bg-emerald-500 hover:bg-emerald-600 text-white border-none",
                          p.status === "Em Análise" && "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200"
                        )}
                      >
                        <div className={cn(
                          "w-1 h-1 rounded-full animate-pulse",
                          p.status === "Finalizado" ? "bg-white" :
                          p.status === "Crítico" ? "bg-white" : "bg-amber-500"
                        )} />
                        {p.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      {canEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(p)}
                          className="h-9 w-9 rounded-xl text-slate-400 hover:text-primary hover:bg-slate-50 transition-all"
                        >
                          <Edit2 size={16} />
                        </Button>
                      )}
                      <Link
                        href={`/processos/${p.id}`}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "h-9 w-9 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
                        )}
                        title="Ver Detalhes"
                      >
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      )}
    </div>
  );
}

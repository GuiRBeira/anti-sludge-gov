// apps/web/app/processos/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  useProcesses, 
  useProcessSummary 
} from "@/features/processes/api/useProcessQueries";
import { Processo } from "@/features/processes/api/processService";
import { ProcessTable } from "@/features/processes/components/ProcessTable";
import { ProcessModal } from "@/features/processes/components/ProcessModal";
import { useAuth } from "@/features/auth/context/AuthContext";

import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  ArrowRightLeft, 
  ShieldAlert,
  CheckCircle2,
  Clock
} from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProcessosPage() {
  const { canEdit } = useAuth();
  const { data: processos = [], isLoading: loading, error } = useProcesses();
  const { data: summary } = useProcessSummary();
  
  const [showModal, setShowModal] = useState(false);
  const [editingProcess, setEditingProcess] = useState<Processo | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProcessos = processos.filter(p => {
    const matchesSearch = p.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (processo: Processo) => {
    setEditingProcess(processo);
    setShowModal(true);
  };

  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
            Catálogo de Processos
          </h1>
          <p className="text-slate-500 font-medium">
            Repositório central de serviços públicos mapeados e auditados.
          </p>
        </div>

        {canEdit && (
          <Button 
            size="lg"
            className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs gap-2 shadow-xl shadow-primary/20"
            onClick={() => setShowModal(true)}
          >
            <Plus size={20} />
            Novo Processo
          </Button>
        )}
      </div>

      {/* Mini Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-3xl border-slate-100 shadow-sm bg-blue-50/50 border-blue-100/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-600/60 uppercase tracking-widest">Total</p>
              <p className="text-xl font-black text-blue-900">{processos.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-100 shadow-sm bg-red-50/50 border-red-100/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-red-600 rounded-xl text-white">
              <ShieldAlert size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-red-600/60 uppercase tracking-widest">Críticos</p>
              <p className="text-xl font-black text-red-900">{summary?.processos_criticos || 0}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-100 shadow-sm bg-emerald-50/50 border-emerald-100/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-emerald-600 rounded-xl text-white">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest">Finalizados</p>
              <p className="text-xl font-black text-emerald-900">
                {processos.filter(p => p.status === "Finalizado").length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-100 shadow-sm bg-amber-50/50 border-amber-100/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-amber-500 rounded-xl text-white">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-amber-600/60 uppercase tracking-widest">Em Análise</p>
              <p className="text-xl font-black text-amber-900">
                {processos.filter(p => p.status === "Em Análise").length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Table Card */}
      <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <CardHeader className="px-8 pt-8 border-b border-slate-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nome ou descrição..."
                className="pl-11 h-12 rounded-2xl bg-slate-50 border-none font-medium focus-visible:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest mr-2">
                <Filter size={14} />
                Filtrar:
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-12 w-[180px] rounded-xl bg-slate-50 border-none font-medium focus:ring-primary">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl">
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="Em Análise">Em Análise</SelectItem>
                  <SelectItem value="Crítico">Crítico</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <ProcessTable
            processos={filteredProcessos}
            loading={loading}
            error={error}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>

      {showModal && (
        <ProcessModal
          onClose={() => {
            setShowModal(false);
            setEditingProcess(null);
          }}
          initialData={editingProcess || undefined}
        />
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GovButton, GovIcon } from "@/components/gov";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { StatsGrid } from "@/components/features/dashboard/StatsGrid";
import { ProcessTable } from "@/components/features/dashboard/ProcessTable";
import { CreateProcessModal } from "@/components/features/dashboard/CreateProcessModal";
import { processService, Processo } from "@/services/process-service";

export default function Home() {
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function loadData() {
    setLoading(true);
    try {
      const data = await processService.list();
      setProcessos(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar processos. Verifique se a API está rodando.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const stats = [
    { 
      label: "Total de Processos", 
      value: processos.length, 
      icon: "mdi:file-document", 
      color: "bg-blue-600" 
    },
    { 
      label: "Em Andamento", 
      value: processos.filter(p => p.status === "Em Andamento").length, 
      icon: "mdi:clock-time-four-outline", 
      color: "bg-amber-500" 
    },
    { 
      label: "Análises Críticas", 
      value: 0, 
      icon: "mdi:alert-circle-outline", 
      color: "bg-red-500" 
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <GovIcon icon="mdi:view-dashboard" size={32} className="text-gov-blue" />
              Dashboard
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Bem-vindo ao sistema de monitoramento de fricção administrativa.
            </p>
          </motion.div>

          <GovButton 
            type="primary" 
            className="shadow-lg shadow-blue-500/20"
            onClick={() => setShowModal(true)}
          >
            <GovIcon icon="mdi:plus" size={20} className="mr-2" />
            Novo Processo
          </GovButton>
        </section>

        <StatsGrid stats={stats} />

        <ProcessTable 
          processos={processos} 
          loading={loading} 
          error={error} 
        />

        {showModal && (
          <CreateProcessModal 
            onClose={() => setShowModal(false)} 
            onSuccess={loadData} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

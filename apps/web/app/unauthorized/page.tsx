"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, LogOut, Home, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function UnauthorizedPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full"
      >
        <Card className="rounded-[2.5rem] border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden bg-white/80 backdrop-blur-xl">
          <CardContent className="p-10 text-center">
            <div className="flex justify-center mb-8">
              <div className="size-20 rounded-[2rem] bg-red-50 flex items-center justify-center text-red-500 shadow-inner">
                <ShieldAlert size={40} />
              </div>
            </div>

            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-4">
              Acesso Restrito
            </h1>
            
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              Olá, <span className="text-slate-900 font-bold">{user?.name}</span>. 
              Parece que seu e-mail (<span className="text-slate-900 font-bold">{user?.email}</span>) 
              não possui permissão para acessar o painel administrativo.
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100 flex items-start gap-4 text-left">
              <Mail className="text-slate-400 shrink-0 mt-1" size={20} />
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">O que fazer?</p>
                <p className="text-sm text-slate-600 font-medium">
                  Se você acredita que isso é um erro, entre em contato com o administrador do sistema para solicitar acesso.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/")}
                className="h-14 rounded-2xl font-bold gap-2 border-slate-100"
              >
                <Home size={18} />
                Página Inicial
              </Button>
              <Button
                size="lg"
                onClick={handleLogout}
                className="h-14 rounded-2xl font-bold gap-2 bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/20"
              >
                <LogOut size={18} />
                Trocar de Conta
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <p className="text-center mt-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
          Ambiente Seguro & Auditoria em Tempo Real
        </p>
      </motion.div>
    </div>
  );
}

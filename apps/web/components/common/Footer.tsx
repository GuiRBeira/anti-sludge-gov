// apps/web/components/common/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, GraduationCap, Building2, HelpCircle, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-100 bg-white/50 backdrop-blur-md py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Manifesto */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="font-black text-xl tracking-tighter uppercase text-slate-900">
                Anti-Sludge
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed uppercase tracking-tight">
              Plataforma acadêmica e institucional voltada à redução da carga cognitiva e burocracia invisível nos serviços públicos federais.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Navegação</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-600">
              <li><Link href="/" className="hover:text-primary transition-colors">Dashboard Principal</Link></li>
              <li><Link href="/processos" className="hover:text-primary transition-colors">Catálogo de Serviços</Link></li>
              <li><Link href="/analise" className="hover:text-primary transition-colors">Metodologia de Análise</Link></li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Suporte & Docs</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-600">
              <li><Link href="/ajuda" className="hover:text-primary transition-colors">Centro de Ajuda</Link></li>
              <li><Link href="/privacidade" className="hover:text-primary transition-colors">Políticas de Dados</Link></li>
              <li><Link href="/api-docs" className="hover:text-primary transition-colors">Documentação da API</Link></li>
            </ul>
          </div>

          {/* Parceiros */}
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Parceria Institucional</h4>
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors border border-slate-100">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-tighter leading-none">UTFPR</span>
               </div>
               <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors border border-slate-100">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-tighter leading-none">CINCO / MGI</span>
               </div>
               <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors border border-slate-100">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-tighter leading-none">MCTI / FINEP</span>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
            &copy; {currentYear} Anti-Sludge Gov — Laboratório de Inovação em Gestão Pública
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-1.5 text-xs font-black text-primary uppercase tracking-widest">
                <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                Sistemas Estáveis
             </div>
             <Link href="https://gov.br" className="text-xs font-black text-slate-300 hover:text-slate-900 uppercase tracking-widest transition-colors">
               gov.br
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

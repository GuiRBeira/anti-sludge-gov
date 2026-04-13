// apps/web/components/common/Sidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  FileText, 
  BarChart2, 
  History, 
  Settings, 
  HelpCircle,
  ShieldAlert
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Processos", href: "/processos", icon: FileText },
  { label: "Alertas Criticos", href: "/alertas", icon: ShieldAlert },
  { label: "Analise", href: "/analise", icon: BarChart2 },
  { label: "Historico", href: "/historico", icon: History },
];

const secondaryItems = [
  { label: "Configuracoes", href: "/settings", icon: Settings },
  { label: "Ajuda", href: "/ajuda", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-full sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-black text-gov-blue-light tracking-tight leading-none">
            Anti-Sludge
          </h2>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Gestao de Carga
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group relative",
                isActive 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"
                />
              )}
              <item.icon size={18} className={clsx(
                "transition-colors",
                isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
              )} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-1">
        {secondaryItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <item.icon size={18} className="text-slate-400" />
            {item.label}
          </Link>
        ))}
        
        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xs font-bold text-slate-900">Versao do Protótipo</p>
          <p className="text-[10px] text-slate-500 mt-1">v1.5.1 - 2026-04-13</p>
        </div>
      </div>
    </aside>
  );
}

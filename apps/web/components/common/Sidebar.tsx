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
  ShieldAlert,
  ChevronLeft,
  Menu
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Processos", href: "/processos", icon: FileText },
  { label: "Alertas Críticos", href: "/alertas", icon: ShieldAlert },
  { label: "Análise", href: "/analise", icon: BarChart2 },
  { label: "Histórico", href: "/historico", icon: History },
];

const secondaryItems = [
  { label: "Configurações", href: "/settings", icon: Settings },
  { label: "Ajuda", href: "/ajuda", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      className="border-r border-slate-200 bg-white flex flex-col h-full sticky top-0 overflow-y-auto overflow-x-hidden z-30 shadow-sm"
    >
      <div className="p-6 flex items-center justify-between min-h-[90px]">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <h2 className="text-lg font-black text-gov-blue-light tracking-tight leading-none">
              Anti-Sludge
            </h2>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              Gestão de Carga
            </span>
          </motion.div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors ml-auto"
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : ""}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon size={20} className={clsx(
                "shrink-0 transition-transform group-hover:scale-110",
                isActive ? "text-gov-blue-light" : "text-gov-blue-light-500 group-hover:text-gov-blue-light"
              )} />

              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="truncate"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-2">
        {secondaryItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={isCollapsed ? item.label : ""}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all group"
          >
            <item.icon size={20} className="text-slate-400 group-hover:text-slate-600 shrink-0" />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {item.label}
              </motion.span>
            )}
          </Link>
        ))}

        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100"
          >
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocolo</p>
            <p className="text-xs font-bold text-slate-900 mt-1 uppercase">v1.2-ALPHA</p>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}

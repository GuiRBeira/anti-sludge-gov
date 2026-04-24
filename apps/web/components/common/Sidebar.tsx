// apps/web/components/common/Sidebar.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
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
  Menu,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Processos", href: "/processos", icon: FileText },
  { label: "Alertas Críticos", href: "/alertas", icon: ShieldAlert },
  { label: "Análise", href: "/analise", icon: BarChart2 },
  { label: "Histórico", href: "/historico", icon: History },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { user, isAdmin } = useAuth();

  const secondaryItems = [
    ...(isAdmin
      ? [{ label: "Configurações", href: "/settings", icon: Settings }]
      : []),
    { label: "Ajuda", href: "/ajuda", icon: HelpCircle },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="border-r border-slate-200 bg-white flex flex-col h-full sticky top-0 overflow-y-auto overflow-x-hidden z-30 shadow-sm"
    >
      <div className="p-6 flex items-center justify-between min-h-[90px]">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <h2 className="text-xl font-black text-slate-900 tracking-tighter leading-none">
              Anti-Sludge
            </h2>
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mt-2">
              Ministério da Gestão e da Inovação em Serviços Públicos
            </span>
          </motion.div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-blue-600 transition-all ml-auto"
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : ""}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group relative",
                isActive
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <item.icon
                size={20}
                className={clsx(
                  "shrink-0 transition-transform group-hover:scale-110",
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-blue-600",
                )}
              />

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

      <div className="p-4 border-t border-slate-50 space-y-1">
        {secondaryItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={isCollapsed ? item.label : ""}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all group"
          >
            <item.icon
              size={18}
              className="group-hover:text-blue-600 shrink-0"
            />
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

        {!isCollapsed && user && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-3"
          >
            {user.picture ? (
              <Image
                src={user.picture}
                alt={user.name}
                className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm"
              />
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-200">
                {user.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                Nível {user.role}
              </p>
              <p className="text-xs font-black text-slate-900 truncate uppercase tracking-tighter">
                {user.name.split(" ")[0]}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}

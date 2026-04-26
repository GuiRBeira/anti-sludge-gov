// apps/web/components/common/Sidebar.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import icon from "@/assets/icon.png";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
  ChevronRight,
  Users,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Button } from "@/components/ui/button";

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
  const { user, isAdmin, logout } = useAuth();

  const secondaryItems = [
    ...(isAdmin
      ? [
          { label: "Gestão de Acessos", href: "/admin/rbac", icon: Users },
          { label: "Configurações", href: "/settings", icon: Settings },
        ]
      : []),
    { label: "Ajuda", href: "/ajuda", icon: HelpCircle },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? "6rem" : "18rem" }}
      className="border-r border-slate-200 bg-white flex flex-col h-full sticky top-0 overflow-y-auto overflow-x-hidden z-30 shadow-sm"
    >
      {/* Header / Logo */}
      <div className={cn("p-6 flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src={icon} 
            alt="Anti-Sludge Logo" 
            width={32} 
            height={32} 
            className="w-8 h-8 object-contain shadow-sm"
          />
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <h2 className="text-lg font-black text-slate-900 tracking-tighter leading-none">
                Anti-Sludge
              </h2>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.15em] mt-1">
                Ministério da Gestão
              </span>
            </motion.div>
          )}
        </Link>

        {!isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="rounded-xl hover:bg-slate-50 text-slate-400 hover:text-primary transition-all ml-auto"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        )}
      </div>

      {isCollapsed && (
        <div className="flex justify-center pb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="rounded-xl hover:bg-slate-50 text-slate-400 hover:text-primary transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 px-4 space-y-1.5 mt-4">
        {!isCollapsed && (
          <p className="px-4 text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            Menu Principal
          </p>
        )}
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : ""}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group relative",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                />
              )}
              <item.icon
                className={cn(
                  "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-primary",
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

        {isAdmin && !isCollapsed && (
          <p className="px-4 text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-8 mb-4">
            Administração
          </p>
        )}

        {secondaryItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={isCollapsed ? item.label : ""}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all group"
          >
            <item.icon
              className="w-4.5 h-4.5 group-hover:text-primary shrink-0"
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
      </nav>

      {/* User / Bottom Section */}
      <div className="p-4 border-t border-slate-50">
        {!isCollapsed && user && (
          <div className="mt-auto mb-2 p-4 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group/user">
            <div className="flex items-center gap-3 overflow-hidden">
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm object-cover shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-sm shadow-lg shadow-primary/20 shrink-0">
                  {user.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                  {user.role}
                </p>
                <p className="text-xs font-black text-slate-900 truncate uppercase tracking-tighter">
                  {user.name.split(" ")[0]}
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="w-8 h-8 rounded-xl text-slate-400 hover:text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut className="w-4.5 h-4.5" />
            </Button>
          </div>
        )}

        {isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="w-full h-12 rounded-2xl text-slate-400 hover:text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        )}
      </div>
    </motion.aside>
  );
}

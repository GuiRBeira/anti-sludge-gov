// apps/web/components/common/Shell.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { Menu, X } from "lucide-react";

import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/features/auth/context/AuthContext";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user && pathname !== "/login") {
      router.push("/login");
    }

    if (user?.role === "visitor") {
      // Redireciona para o GitHub se for visitante (não autorizado)
      window.location.href = "https://github.com/GuiRBeira/anti-sludge-gov";
    }
  }, [user, isLoading, pathname, router]);

  // Se estiver carregando ou sem usuário (e não estiver na login), não mostra o Shell completo
  if (isLoading || (!user && pathname !== "/login")) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Se for a página de login, renderiza apenas o conteúdo sem Shell (sidebar/header)
  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar Desktop */}
      <div className="hidden lg:flex h-full">
        <Sidebar />
      </div>

      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-slate-900/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Mobile Panel */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white transition-transform duration-300 transform lg:hidden
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
         <div className="absolute top-4 right-4 lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 text-slate-500 hover:text-slate-900"
            >
              <X size={20} />
            </button>
         </div>
         <Sidebar />
      </div>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

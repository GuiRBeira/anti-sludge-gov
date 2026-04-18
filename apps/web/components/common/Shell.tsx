// apps/web/components/common/Shell.tsx
"use client";

import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { Menu, X } from "lucide-react";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

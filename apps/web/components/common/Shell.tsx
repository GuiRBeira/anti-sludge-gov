// apps/web/components/common/Shell.tsx
"use client";

import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

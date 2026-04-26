"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xs font-black text-slate-300 uppercase tracking-widest text-center md:text-left">
          UTFPR & CINCO/MGI — Auditoria v1.0 <br />
          Plataforma de Combate à Burocracia Invisível
        </div>
        <div className="flex gap-4 grayscale opacity-30">
          <div className="h-6 w-20 bg-slate-300 rounded"></div>
          <div className="h-6 w-16 bg-slate-300 rounded"></div>
        </div>
      </div>
    </footer>
  );
}

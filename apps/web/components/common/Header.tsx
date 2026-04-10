"use client";

import React from "react";
import Image from "next/image";
import { GovButton } from "@/components/gov";

const NextImage = Image as unknown as React.ElementType;

export function Header() {
  return (
    <header className="br-header mb-0 border-b border-slate-200 bg-white shadow-sm">
      <div className="container-lg py-4 flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          {/* Logo Oficial gov.br */}
          <div className="flex items-center gap-4">
            <a href="https://www.gov.br" target="_blank" rel="noopener noreferrer">
              <NextImage 
                src="https://www.gov.br/++theme++padrao_govbr/img/govbr-logo-large.png" 
                alt="Logo gov.br" 
                width={120}
                height={35}
                priority
                className="h-8 w-auto"
              />
            </a>
            <div className="h-6 w-px bg-slate-200" />
          </div>

          {/* Nome do Sistema */}
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-gov-blue-light tracking-tight leading-none">
              Anti-Sludge Gov
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              Auditoria de Carga Administrativa
            </p>
          </div>
        </div>

        <div className="flex gap-2">
           <GovButton type="primary" size="small" circle icon="fas fa-search" />
           <GovButton type="primary" size="small" circle icon="fas fa-user" />
        </div>
      </div>
    </header>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { GovButton } from "@/components/gov";

const NextImage = Image as unknown as React.ElementType;

export function Header() {
  return (
    <header className="br-header mb-0 border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm py-1 transition-all duration-300">
      <div className="container-lg flex flex-col pl-6 pr-8 py-4">
        {/* Linha 1: Branding e Ações */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-5">
            {/* Logo Oficial gov.br */}
            <a
              href="https://www.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <NextImage
                src="https://www.gov.br/++theme++padrao_govbr/img/govbr-logo-large.png"
                alt="Logo gov.br"
                width={120}
                height={35}
                priority
                className="h-10 w-auto"
              />
            </a>
            <div className="h-8 w-px bg-slate-200" />

            {/* Nome do Sistema (h1 para SEO/Acessibilidade) */}
            <h1 className="text-2xl font-black text-gov-blue-light tracking-tight m-0 p-0 group cursor-default">
              Anti-Sludge{" "}
              <span className="text-blue-600 transition-colors duration-300 group-hover:text-blue-500">
                Gov
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Badge de Versão - Toque Profissional de TCC */}
            <div className="hidden sm:flex items-center px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-slate-500 text-[10px] font-bold tracking-widest uppercase mr-2">
              v1.5.1
            </div>

            <div className="flex gap-2">
              <GovButton
                type="primary"
                size="small"
                circle
                icon="fas fa-search"
                className="hover:scale-110 transition-transform"
              />
              <GovButton
                type="primary"
                size="small"
                circle
                icon="fas fa-user"
                className="hover:scale-110 transition-transform"
              />
            </div>
          </div>
        </div>

        {/* Linha 2: Subtítulo/Status de Auditoria */}
        <div className="flex items-center gap-3 mt-4 pb-1">
          <div className="flex items-center justify-center w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-sm font-bold text-slate-500 tracking-[0.2em] uppercase leading-none">
            Auditoria de Carga Administrativa
          </div>
        </div>
      </div>
    </header>
  );
}

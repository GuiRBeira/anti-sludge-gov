"use client";

import React from "react";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { ChevronRight, ShieldCheck, Activity } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { version } from "../../package.json";

export function Header() {
  const pathname = usePathname();

  // Mapeamento simples para breadcrumbs
  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    if (paths.length === 0) return [{ label: "Dashboard", href: "/" }];

    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
      return { label, href };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl transition-all">
      <div className="flex h-28 items-center justify-between px-3">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="h-14 w-14 rounded-[1.25rem] hover:bg-slate-100 transition-colors" />
            <div className="h-10 w-px bg-slate-200 mx-2 hidden md:block" />
          </div>

          {/* Branding & Breadcrumbs */}
          <div className="flex flex-col px-4">
            <div className="flex items-center gap-2">
              <a
                href="https://www.gov.br"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity hidden sm:block"
              >
                <NextImage
                  src="https://www.gov.br/++theme++padrao_govbr/img/govbr-logo-large.png"
                  alt="Logo gov.br"
                  width={130}
                  height={40}
                  priority
                  className="h-10 w-auto"
                />
              </a>
              <ChevronRight className="size-6 text-slate-300 hidden sm:block" />
              <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">
                Anti-Sludge <span className="text-blue-600">Gov</span>
              </span>
            </div>

            {/* Breadcrumb Path */}
            <nav className="flex items-center gap-2.5 text-base font-bold uppercase tracking-[0.2em] text-slate-400 group cursor-default">
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={crumb.href}>
                  {i > 0 && <ChevronRight className="size-5 text-slate-300" />}
                  <span className={cn(
                    "transition-colors",
                    i === breadcrumbs.length - 1 ? "text-slate-500" : "hover:text-blue-500"
                  )}>
                    {crumb.label}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* Status de Auditoria - Estilo Badge Tecnológico */}
          <div className="hidden lg:flex items-center gap-6 px-8 py-2 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
            <div className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] leading-none mb-2">
                Status de Auditoria
              </span>
              <span className="text-lg font-bold text-slate-700 leading-none flex items-center gap-2.5">
                <ShieldCheck className="size-4 text-emerald-600" />
                Monitoramento Ativo
              </span>
            </div>
          </div>

          <div className="h-14 w-px bg-slate-100 hidden sm:block" />

          {/* Badge de Versão */}
          <div className="flex items-center gap-3 px-6 py-3 bg-blue-500/20 rounded-2xl border border-blue-500">
            <Activity className="size-6 text-blue-600" />
            <span className="text-base font-black text-blue-600 uppercase tracking-widest">
              v{version}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

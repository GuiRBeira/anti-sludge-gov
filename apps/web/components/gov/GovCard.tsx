/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import React from "react";
import clsx from "clsx";
import { GovIcon } from "./GovIcon";

/**
 * Interface para as ações do menu do Card.
 */
export interface GovCardMenuAction {
  label: React.ReactNode;
  keepExpanded?: boolean;
  selected?: boolean;
  onClick: () => void;
}

export interface GovCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  disabled?: boolean;
  hover?: boolean;
  fixedHeight?: boolean;
  className?: string;
  onClick?: () => void;
  menuActions?: GovCardMenuAction[];
  /** Propriedades de imagem ou avatar podem ser adicionadas conforme necessário */
  avatar?: unknown;
  /** Ícone a ser exibido ao lado do título */
  icon?: string;
  /** Elemento opcional para exibir no cabeçalho (ex: botões de ação) */
  headerAction?: React.ReactNode;
}

export function GovCard({ 
  children, 
  title, 
  subtitle, 
  footer, 
  hover, 
  className, 
  icon, 
  headerAction 
}: GovCardProps) {
  return (
    <div className={clsx(
      "bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full transition-all duration-300",
      hover && "hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1",
      className
    )}>
      {/* Header */}
      {(title || subtitle || headerAction) && (
        <div className="px-8 pt-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {icon && (
              <div className="p-3 bg-slate-50 text-slate-600 rounded-2xl border border-slate-100">
                <GovIcon icon={icon} size={20} />
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {headerAction && (
            <div className="shrink-0">
              {headerAction}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 px-8 pb-8">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 mt-auto">
          {footer}
        </div>
      )}
    </div>
  );
}

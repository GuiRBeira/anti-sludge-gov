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
}

/**
 * Skeleton para o BrCard renderizado no Servidor.
 * Mantém a estrutura visual básica para evitar CLS.
 */
function GovCardSkeleton({ title, subtitle, footer, hover, fixedHeight, className, children, icon }: GovCardProps) {
  return (
    <div className={clsx(
      "br-card",
      hover && "hover",
      fixedHeight && "fixed-height",
      className
    )}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && (
            <div className="br-item header-title">
              <div className="flex items-center gap-2">
                {icon && <GovIcon icon={icon} size={20} className="text-gov-blue" />}
                <span>{title}</span>
              </div>
            </div>
          )}
          {subtitle && <div className="br-item header-subtitle">{subtitle}</div>}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
}

// Import dinâmico com Isolamento de tipos para React 19
const BrCard = dynamic(() => import("@govbr-ds/react-components").then(m => m.BrCard as any), { 
  ssr: false
}) as React.ElementType;

/**
 * Abstração Isomórfica do BrCard com Hydration Guard.
 * Permite usar Cards do Governo com performance de SSR e segurança de tipos.
 */
export function GovCard(props: GovCardProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <GovCardSkeleton {...props} />;
  }

  return <BrCard {...props}>{props.children}</BrCard>;
}

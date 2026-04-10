"use client";

import dynamic from "next/dynamic";
import React from "react";

// Import dinâmico para evitar erro de SSR (acesso ao 'self')
// Casting para 'any' para evitar conflitos de tipagem do React 19 no build
const BrButton = dynamic(() => import("@govbr-ds/react-components").then(m => m.BrButton as any), { 
  ssr: false,
  loading: () => <button className="br-button loading" disabled>Carregando...</button>
}) as any;

interface GovButtonProps {
  children?: React.ReactNode;
  type?: "primary" | "secondary" | "tertiary" | "magic";
  size?: "small" | "large";
  circle?: boolean;
  icon?: string;
  onClick?: () => void;
  className?: string;
  submit?: boolean;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

/**
 * Abstração do BrButton para esconder complexidade de SSR e Tipagem.
 */
export function GovButton({ children, ...props }: GovButtonProps) {
  return <BrButton {...props}>{children}</BrButton>;
}

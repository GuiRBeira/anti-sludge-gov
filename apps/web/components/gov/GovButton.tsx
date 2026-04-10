"use client";

import dynamic from "next/dynamic";
import React from "react";
import clsx from "clsx";

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
 * Placeholder renderizado no Servidor (SSR) enquanto o componente real carrega.
 * Usa as mesmas classes do DSGOV para evitar saltos de layout.
 */
function GovButtonSkeleton({ children, type = "primary", size, circle, block, className }: GovButtonProps) {
  return (
    <button
      className={clsx(
        "br-button",
        type,
        size === "small" && "small",
        size === "large" && "large",
        circle && "circle",
        block && "block",
        "loading", // Classe do DSGOV para estado de carregamento
        className
      )}
      disabled
    >
      {children}
    </button>
  );
}

// Import dinâmico simplificado (o controle de loading será feito no componente pai)
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const BrButton = dynamic(() => import("@govbr-ds/react-components").then(m => m.BrButton as any), { 
  ssr: false
}) as React.ElementType;

/**
 * Abstração Isomórfica do BrButton com Hydration Guard.
 */
export function GovButton({ submit, type: govType, ...props }: GovButtonProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Determina o tipo do botão HTML (submit ou button)
  const nativeType = submit ? "submit" : "button";

  // Mapeia o nosso "type" (estilo) para as props booleanas do DSGOV
  const isPrimary = govType === "primary";
  const isSecondary = govType === "secondary";

  if (!mounted) {
    return <GovButtonSkeleton type={govType} {...props} />;
  }

  return (
    <BrButton 
      type={nativeType} 
      primary={isPrimary}
      secondary={isSecondary}
      {...props} 
    >
      {props.children}
    </BrButton>
  );
}

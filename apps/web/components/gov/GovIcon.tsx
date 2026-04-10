"use client";

import { Icon, IconProps } from "@iconify/react";

/**
 * Componente unificado de ícones usando Iconify.
 * Facilita a migração para qualquer set de ícones futuramente.
 */
export function GovIcon({ icon, ...props }: IconProps) {
  return <Icon icon={icon} {...props} />;
}

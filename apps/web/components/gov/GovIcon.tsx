"use client";

import { Icon, IconProps } from "@iconify/react";

interface GovIconProps extends Omit<IconProps, "width" | "height"> {
  size?: string | number;
}

/**
 * Componente unificado de ícones usando Iconify.
 * Facilita a migração para qualquer set de ícones futuramente.
 */
export function GovIcon({ icon, size = 20, ...props }: GovIconProps) {
  return <Icon icon={icon} width={size} height={size} {...props} />;
}

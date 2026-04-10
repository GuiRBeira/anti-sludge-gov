"use client";

import dynamic from "next/dynamic";
import React from "react";
import clsx from "clsx";

/**
 * Skeleton para o BrTag renderizado no Servidor.
 */
function GovTagSkeleton({ type, color, value, icon, size, className }: GovTagProps) {
  return (
    <span className={clsx(
      "br-tag",
      type,
      color,
      size,
      className
    )}>
      {icon && <i className={icon} aria-hidden="true"></i>}
      <span>{value}</span>
    </span>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BrTag = dynamic(() => import("@govbr-ds/react-components").then(m => m.BrTag as any), { 
  ssr: false
}) as React.ElementType;

interface GovTagProps {
  type?: "status" | "icon" | "text" | "interaction" | "count";
  color?: "success" | "warning" | "danger" | "info" | "neutral";
  value?: string | number;
  icon?: string;
  size?: "small" | "large";
  className?: string;
}

/**
 * Abstração Isomórfica do BrTag com Hydration Guard.
 */
export function GovTag(props: GovTagProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <GovTagSkeleton {...props} />;
  }

  return <BrTag {...props} />;
}

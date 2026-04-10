"use client";

import dynamic from "next/dynamic";
import React from "react";
import clsx from "clsx";

/**
 * Skeleton para o BrSelect renderizado no Servidor.
 */
function GovSelectSkeleton({ label, placeholder, className }: GovSelectProps) {
  return (
    <div className={clsx("br-select", className)}>
      {label && <label>{label}</label>}
      <div className="br-input mb-0">
        <input type="text" placeholder={placeholder} disabled />
        <button
          className="br-button"
          type="button"
          aria-label="Exibir lista"
          disabled
        >
          <i className="fas fa-angle-down" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BrSelect = dynamic(() => import("@govbr-ds/react-components").then(m => m.BrSelect as any), { 
  ssr: false
}) as React.ElementType;

interface GovSelectProps {
  label?: string;
  placeholder?: string;
  options: { label: string; value: unknown }[];
  value?: unknown;
  onChange?: (value: unknown) => void;
  className?: string;
}

/**
 * Abstração Isomórfica do BrSelect com Hydration Guard.
 */
export function GovSelect(props: GovSelectProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <GovSelectSkeleton {...props} />;
  }

  return <BrSelect {...props} />;
}

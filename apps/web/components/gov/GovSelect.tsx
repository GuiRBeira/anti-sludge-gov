"use client";

import dynamic from "next/dynamic";
import React from "react";

const BrSelect = dynamic(() => import("@govbr-ds/react-components").then(m => m.BrSelect as any), { 
  ssr: false 
}) as any;

interface GovSelectProps {
  label?: string;
  placeholder?: string;
  options: { label: string; value: any }[];
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
}

/**
 * Abstração do BrSelect.
 */
export function GovSelect(props: GovSelectProps) {
  return <BrSelect {...props} />;
}

"use client";

import dynamic from "next/dynamic";
import React from "react";

const BrInput = dynamic(() => import("@govbr-ds/react-components").then(m => m.BrInput as any), { 
  ssr: false 
}) as any;

interface GovInputProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: any) => void;
  type?: string;
  required?: boolean;
  className?: string;
}

/**
 * Abstração do BrInput.
 */
export function GovInput(props: GovInputProps) {
  return <BrInput {...props} />;
}

"use client";

import dynamic from "next/dynamic";
import React from "react";

const BrTag = dynamic(() => import("@govbr-ds/react-components").then(m => m.BrTag as any), { 
  ssr: false 
}) as any;

interface GovTagProps {
  type?: "status" | "icon" | "text" | "interaction" | "count";
  color?: "success" | "warning" | "danger" | "info" | "neutral";
  value?: string | number;
  icon?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

/**
 * Abstração do BrTag.
 */
export function GovTag(props: GovTagProps) {
  return <BrTag {...props} />;
}

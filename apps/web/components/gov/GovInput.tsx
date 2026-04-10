/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import React from "react";
import clsx from "clsx";

/**
 * Skeleton para o BrInput renderizado no Servidor.
 */
function GovInputSkeleton({
  label,
  placeholder,
  size,
  className,
}: GovInputProps) {
  return (
    <div
      className={clsx(
        "br-input",
        size, // small ou large caso existam classes CSS
        className,
      )}
    >
      {label && <label>{label}</label>}
      <input type="text" placeholder={placeholder} disabled />
    </div>
  );
}

const BrInput = dynamic(
  () => import("@govbr-ds/react-components").then((m) => m.BrInput as any),
  {
    ssr: false,
  },
) as React.ElementType;

interface GovInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  de?: "small" | "medium" | "large";
  icon?: string;
  status?: "success" | "danger" | "info" | "warning";
  feedbackText?: string;
  mask?: string;
  numeric?: boolean | unknown;
  inline?: boolean;
  highlight?: boolean;
}

/**
 * Abstração Isomórfica do BrInput com Hydration Guard.
 */
export function GovInput({ size, ...props }: GovInputProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <GovInputSkeleton size={size} {...props} />;
  }

  return <BrInput density={size} {...props} />;
}

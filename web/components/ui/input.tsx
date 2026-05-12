import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Input alinhado ao DS gov.br:
 * - focus ring de 2px com offset (contraste 3:1)
 * - read-only é visualmente distinto de disabled: aria-readonly="true"
 *   mantém opacidade total e cursor texto, só remove o caret e a borda
 *   de foco. disabled escurece e bloqueia interação.
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-ring",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
          "read-only:cursor-default read-only:bg-muted/40 read-only:border-dashed",
          "aria-[readonly=true]:cursor-default aria-[readonly=true]:bg-muted/40 aria-[readonly=true]:border-dashed",
          "md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

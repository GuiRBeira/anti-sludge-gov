import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Textarea com mesmos estados do Input (Padrão Mínimo gov.br DS):
 * focus ring 2px com offset, read-only com borda tracejada, disabled
 * com fundo muted.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-ring",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
        "read-only:cursor-default read-only:bg-muted/40 read-only:border-dashed",
        "aria-[readonly=true]:cursor-default aria-[readonly=true]:bg-muted/40 aria-[readonly=true]:border-dashed",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };

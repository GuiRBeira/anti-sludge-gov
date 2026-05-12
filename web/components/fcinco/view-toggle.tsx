"use client";

import { List, Route } from "lucide-react";

type ViewMode = "trilha" | "tabela";

export function ViewToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}) {
  return (
    <div className="inline-flex overflow-hidden rounded-md border bg-card">
      <button
        type="button"
        aria-pressed={value === "trilha"}
        title="Trilha"
        onClick={() => onChange("trilha")}
        className={`inline-flex h-8 items-center gap-2 px-3 text-xs transition-colors ${
          value === "trilha"
            ? "bg-muted text-foreground"
            : "text-muted-foreground hover:bg-muted/60"
        }`}
      >
        <Route className="h-4 w-4" />
        Trilha
      </button>
      <button
        type="button"
        aria-pressed={value === "tabela"}
        title="Tabela"
        onClick={() => onChange("tabela")}
        className={`inline-flex h-8 items-center gap-2 border-l px-3 text-xs transition-colors ${
          value === "tabela"
            ? "bg-muted text-foreground"
            : "text-muted-foreground hover:bg-muted/60"
        }`}
      >
        <List className="h-4 w-4" />
        Tabela
      </button>
    </div>
  );
}

export type { ViewMode };

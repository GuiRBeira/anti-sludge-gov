import type { ReactNode } from "react";
import { AlertTriangle, CircleAlert, Info, type LucideIcon } from "lucide-react";

type AlertTone = "warning" | "info" | "danger";

const toneStyles: Record<
  AlertTone,
  { box: string; icon: string; title: string; Icon: LucideIcon }
> = {
  warning: {
    box: "border-[hsl(var(--accent)/0.45)] bg-[hsl(var(--accent)/0.12)]",
    icon: "text-accent",
    title: "text-foreground",
    Icon: AlertTriangle,
  },
  info: {
    box: "border-[hsl(var(--primary)/0.35)] bg-[hsl(var(--primary)/0.10)]",
    icon: "text-primary",
    title: "text-foreground",
    Icon: Info,
  },
  danger: {
    box: "border-[hsl(var(--destructive)/0.40)] bg-[hsl(var(--destructive)/0.10)]",
    icon: "text-destructive",
    title: "text-destructive",
    Icon: CircleAlert,
  },
};

export function Alert({
  tone = "info",
  title,
  children,
  action,
}: {
  tone?: AlertTone;
  title: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
}) {
  const t = toneStyles[tone];
  const Icon = t.Icon;

  return (
    <div
      role={tone === "danger" || tone === "warning" ? "alert" : "status"}
      className={`flex flex-col gap-3 rounded-md border p-4 text-sm ${t.box}`}
    >
      <div className="flex gap-3">
        <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${t.icon}`} />
        <div className="min-w-0">
          <div className={`font-semibold ${t.title}`}>{title}</div>
          {children && (
            <div className="mt-1 leading-6 text-muted-foreground">{children}</div>
          )}
        </div>
      </div>
      {action && <div className="pl-7">{action}</div>}
    </div>
  );
}

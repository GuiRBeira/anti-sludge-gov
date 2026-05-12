import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { FileStack, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";

type EmptyStateCta = {
  href: string;
  label: string;
  variant?: "default" | "outline";
};

export function EmptyState({
  title,
  description,
  cta,
  secondaryCta,
  icon: Icon = Route,
  children,
}: {
  title: string;
  description: string;
  cta?: EmptyStateCta;
  secondaryCta?: EmptyStateCta;
  icon?: ComponentType<{ className?: string }>;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-lg border border-dashed bg-card p-8 text-center">
      <WatercolorSplatter
        className="absolute -right-16 -top-24"
        size={220}
        opacity={0.22}
        seed={88}
      />
      <div className="relative">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-md border bg-background text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        {children}
        {(cta || secondaryCta) && (
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {secondaryCta && (
              <Button asChild variant={secondaryCta.variant ?? "outline"}>
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
            {cta && (
              <Button asChild variant={cta.variant ?? "default"}>
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function ProcessosEmptyIcon({ className }: { className?: string }) {
  return <FileStack className={className} />;
}

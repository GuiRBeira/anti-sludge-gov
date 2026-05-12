import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSessionOrRedirect } from "@/lib/auth/session";
import { atualizarBetaFeedbackStatus } from "@/features/feedback/actions";
import {
  betaFeedbackKindLabels,
  betaFeedbackSeverityLabels,
  betaFeedbackStatusLabels,
  betaFeedbackStatuses,
  canViewBetaFeedback,
} from "@/features/feedback/constants";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill, type StatusTone } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";
import type { BetaFeedback, BetaFeedbackSeverity, BetaFeedbackStatus } from "@/types/database";

const statusTone: Record<BetaFeedbackStatus, StatusTone> = {
  novo: "barreira",
  em_analise: "em_progresso",
  resolvido: "validada",
  ignorado: "pendente",
};

const severityTone: Record<BetaFeedbackSeverity, StatusTone> = {
  baixa: "pendente",
  media: "print",
  alta: "desvio",
  bloqueante: "barreira",
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

function formatDate(value: string): string {
  return dateFormatter.format(new Date(value));
}

export default async function FeedbackBetaPage() {
  const session = await getSessionOrRedirect();
  if (!canViewBetaFeedback(session.email)) redirect("/processos");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("beta_feedback")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) throw error;

  const feedbacks = (data ?? []) as BetaFeedback[];
  const counts = betaFeedbackStatuses.reduce(
    (acc, status) => {
      acc[status] = feedbacks.filter((item) => item.status === status).length;
      return acc;
    },
    {} as Record<BetaFeedbackStatus, number>,
  );

  return (
    <div className="flex flex-col gap-6">
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={280}
          opacity={0.3}
          seed={88}
          color="hsl(var(--destructive))"
        />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              admin privado · feedback beta
            </div>
            <h1 className="mt-1 text-3xl font-semibold leading-tight">
              Relatos dos testadores
            </h1>
            <SketchUnderline width={190} variant="short" color="hsl(var(--destructive))" />
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              Canal temporário do MVP v1 para bugs, inconsistências, sugestões
              e faltas de recurso reportadas dentro do app.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <StatusPill tone="validada">somente {session.email}</StatusPill>
            <StatusPill tone="print">{feedbacks.length} relatos</StatusPill>
          </div>
        </div>
      </header>

      <section className="grid gap-3 md:grid-cols-4">
        {betaFeedbackStatuses.map((status) => (
          <div key={status} className="rounded-lg border bg-card p-4">
            <StatusPill tone={statusTone[status]}>
              {betaFeedbackStatusLabels[status]}
            </StatusPill>
            <div className="mt-3 font-display text-3xl leading-none">
              {counts[status] ?? 0}
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4">
        {feedbacks.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
            Nenhum relato beta registrado ainda.
          </div>
        ) : (
          feedbacks.map((item) => (
            <article key={item.id} className="rounded-lg border bg-card p-4">
              <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <StatusPill tone={statusTone[item.status]}>
                      {betaFeedbackStatusLabels[item.status]}
                    </StatusPill>
                    <StatusPill tone={severityTone[item.severity]}>
                      {betaFeedbackSeverityLabels[item.severity]}
                    </StatusPill>
                    <StatusPill tone="print">
                      {betaFeedbackKindLabels[item.kind]}
                    </StatusPill>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {formatDate(item.created_at)}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold leading-tight">{item.title}</h2>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6">
                    {item.description}
                  </p>

                  <div className="mt-4 grid gap-2 rounded-md border bg-muted/25 p-3 text-xs text-muted-foreground sm:grid-cols-2">
                    <div>
                      <span className="font-medium text-foreground">Usuario:</span>{" "}
                      {item.user_name ?? "Sem nome"} ({item.user_email ?? "sem email"})
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Página:</span>{" "}
                      {item.page_path ?? "não capturada"}
                    </div>
                    {item.user_agent && (
                      <div className="min-w-0 sm:col-span-2">
                        <span className="font-medium text-foreground">Navegador:</span>{" "}
                        <span className="break-words">{item.user_agent}</span>
                      </div>
                    )}
                  </div>
                </div>

                <form action={atualizarBetaFeedbackStatus} className="grid gap-3 rounded-md border bg-background p-3">
                  <input type="hidden" name="id" value={item.id} />
                  <label className="grid gap-1.5 text-sm">
                    <span className="font-medium">Status</span>
                    <select
                      name="status"
                      defaultValue={item.status}
                      className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {betaFeedbackStatuses.map((status) => (
                        <option key={status} value={status}>
                          {betaFeedbackStatusLabels[status]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-1.5 text-sm">
                    <span className="font-medium">Notas internas</span>
                    <Textarea
                      name="admin_notes"
                      rows={4}
                      defaultValue={item.admin_notes ?? ""}
                      placeholder="Triagem, decisao ou link do fix."
                    />
                  </label>
                  <Button type="submit">Salvar triagem</Button>
                </form>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

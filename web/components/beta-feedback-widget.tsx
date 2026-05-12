"use client";

import { FormEvent, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Bug, Lightbulb, MessageSquareWarning, Send, X } from "lucide-react";
import { criarBetaFeedback } from "@/features/feedback/actions";
import {
  betaFeedbackKindLabels,
  betaFeedbackKinds,
  betaFeedbackSeverityLabels,
  betaFeedbackSeverities,
} from "@/features/feedback/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusPill } from "@/components/fcinco/status-pill";

type SubmitState = "idle" | "sent" | "error";

export function BetaFeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("page_path", window.location.pathname + window.location.search);
    formData.set("user_agent", window.navigator.userAgent);

    setState("idle");
    setErrorMessage(null);
    startTransition(async () => {
      try {
        await criarBetaFeedback(formData);
        form.reset();
        setState("sent");
      } catch (err) {
        setState("error");
        setErrorMessage(
          err instanceof Error ? err.message : "Não foi possível enviar o feedback.",
        );
      }
    });
  }

  function close() {
    setOpen(false);
    setState("idle");
    setErrorMessage(null);
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-40 inline-flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-lg shadow-black/10 transition-colors hover:border-destructive/60 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Enviar feedback da versão beta"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative grid h-7 w-7 place-items-center rounded-full bg-destructive/12 text-destructive">
          <MessageSquareWarning className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <span className="hidden text-left leading-tight sm:block">
          Versão beta
          <span className="block text-[11px] font-normal text-muted-foreground">
            reportar bug ou sugestão
          </span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-end bg-foreground/45 p-3 backdrop-blur-sm sm:place-items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="beta-feedback-title"
              className="relative w-full max-w-2xl overflow-hidden rounded-lg border bg-card shadow-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={close}
                className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Fechar feedback beta"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="border-b bg-muted/35 p-5 pr-12">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <StatusPill tone="barreira">beta testers</StatusPill>
                  <StatusPill tone="print">MVP v1</StatusPill>
                </div>
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-destructive/12 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 id="beta-feedback-title" className="text-xl font-semibold">
                      Esta é uma versão beta para testadores
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                      Caso tenha notado alguma inconsistência, bug ou falta de
                      recurso, registre aqui. O relato vai para o painel privado
                      do admin do piloto.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4 p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm">
                    <span className="font-medium">Tipo</span>
                    <select
                      name="kind"
                      defaultValue="bug"
                      className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {betaFeedbackKinds.map((kind) => (
                        <option key={kind} value={kind}>
                          {betaFeedbackKindLabels[kind]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-1.5 text-sm">
                    <span className="font-medium">Prioridade percebida</span>
                    <select
                      name="severity"
                      defaultValue="media"
                      className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {betaFeedbackSeverities.map((severity) => (
                        <option key={severity} value={severity}>
                          {betaFeedbackSeverityLabels[severity]}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium">Titulo curto</span>
                  <Input
                    name="title"
                    required
                    maxLength={160}
                    placeholder="Ex: escala de barreiras parece invertida"
                  />
                </label>

                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium">O que aconteceu?</span>
                  <Textarea
                    name="description"
                    required
                    maxLength={4000}
                    rows={5}
                    placeholder="Descreva o que você tentou fazer, o que esperava e o que apareceu."
                  />
                </label>

                {state === "sent" && (
                  <motion.div
                    className="rounded-md border border-fcinco-teal bg-muted/40 p-3 text-sm text-foreground"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Feedback enviado. Valeu por testar com olho de lupa.
                  </motion.div>
                )}
                {state === "error" && (
                  <motion.div
                    className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errorMessage}
                  </motion.div>
                )}

                <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Bug className="h-4 w-4" />
                    <span>Página e navegador entram junto para facilitar reprodução.</span>
                  </div>
                  <div className="flex gap-2 sm:justify-end">
                    <Button type="button" variant="outline" onClick={close}>
                      Fechar
                    </Button>
                    <Button type="submit" disabled={isPending}>
                      {isPending ? (
                        "Enviando..."
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Enviar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>

              <Lightbulb className="pointer-events-none absolute bottom-5 left-5 hidden h-20 w-20 text-accent/10 sm:block" />
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

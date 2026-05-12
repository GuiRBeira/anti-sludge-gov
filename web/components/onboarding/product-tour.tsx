"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  ChevronLeft,
  ClipboardCheck,
  Compass,
  Eye,
  FileStack,
  Moon,
  Route,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NumeroEtapa } from "@/components/fcinco/numero-etapa";
import { StatusPill, type StatusTone } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";
import type { PapelGlobal } from "@/types/database";

type TourStep = {
  title: string;
  eyebrow: string;
  body: string;
  concept: string;
  href?: string;
  hrefLabel?: string;
  icon: LucideIcon;
};

type ProductTourProps = {
  role: PapelGlobal;
  userId: string;
  userName?: string | null;
  canManageTeam?: boolean;
};

const roleLabels: Record<PapelGlobal, string> = {
  admin: "Admin",
  gestor: "Gestor",
  analista: "Analista",
  visitante: "Visitante",
};

const roleTones: Record<PapelGlobal, StatusTone> = {
  admin: "validada",
  gestor: "em_progresso",
  analista: "print",
  visitante: "pendente",
};

const roleOpeners: Record<PapelGlobal, string> = {
  admin:
    "Você está no cockpit completo do Anti-Sludge: governa órgãos, pessoas, escopos, processos e resultados.",
  gestor:
    "Você cuida do diagnóstico no escopo do seu órgão: processos, equipe de análise e evolução das evidências.",
  analista:
    "Você transforma observação em evidência: contexto, jornadas reais, questionários e resultados do método F5.",
  visitante:
    "Você entra em modo leitura: acompanha os processos atribuídos e entende onde as barreiras aparecem.",
};

const methodTrail = [
  "Contexto",
  "Jornada planejada",
  "Observação real",
  "Questionários",
  "Resultados",
];

function stepsForRole(role: PapelGlobal, canManageTeam: boolean): TourStep[] {
  if (role === "admin") {
    return [
      {
        eyebrow: "Governança do MVP",
        title: "Comece pela visão de processos",
        body: "A tela inicial lista todos os processos que você pode auditar. Admin enxerga tudo, então use os filtros para separar rascunhos, contextos completos e órgãos.",
        concept:
          "No método, cada processo é uma unidade de diagnóstico: objetivo, público, jornada, observação e resultado precisam ficar no mesmo trilho.",
        href: "/processos",
        hrefLabel: "Ver processos",
        icon: FileStack,
      },
      {
        eyebrow: "Papéis e escopos",
        title: "Admin define quem pode fazer o quê",
        body: "Em Usuários você promove admin, gestor, analista ou visitante, vincula pessoas a órgãos e atribui processos específicos para visitantes.",
        concept:
          "O app separa poder de edição e poder de leitura: visitante vê evidência, mas não altera a pesquisa.",
        href: "/admin/usuarios",
        hrefLabel: "Gerenciar usuários",
        icon: UsersRound,
      },
      {
        eyebrow: "Estrutura institucional",
        title: "Órgãos organizam o território de análise",
        body: "Cadastre órgãos antes de criar processos. Gestores e analistas passam a atuar dentro desse escopo institucional.",
        concept:
          "A governança do F5 depende de fronteiras claras: quem observa, quem valida e qual serviço está sob análise.",
        href: "/admin/orgaos",
        hrefLabel: "Gerenciar órgãos",
        icon: ShieldCheck,
      },
      {
        eyebrow: "Método F5",
        title: "Leia o processo como uma trilha",
        body: "Abra um processo e avance por contexto, jornada planejada, participantes, jornadas individuais, jornada padrão, questionários e resultados.",
        concept:
          "Desvio, repetição, barreira e print não são decoração: eles marcam onde a experiência pública acumula esforço desnecessário.",
        href: "/processos",
        hrefLabel: "Abrir trilhas",
        icon: Route,
      },
      {
        eyebrow: "Operação diária",
        title: "Use tema, catálogo e resultados para revisar",
        body: "O seletor de tema fica no rodapé lateral e no topo mobile. O Catálogo F5 ajuda a manter a linguagem dos critérios consistente.",
        concept:
          "Admin usa resultados completos para priorizar barreiras entre órgãos, serviços e grupos de usuários.",
        href: "/catalogo",
        hrefLabel: "Consultar catálogo",
        icon: Moon,
      },
    ];
  }

  if (role === "gestor") {
    return [
      {
        eyebrow: "Escopo do órgão",
        title: "Sua mesa mostra os processos sob sua gestão",
        body: "Você pode criar processos no órgão em que é gestor, acompanhar contexto e abrir cada diagnóstico pela sequência F5.",
        concept:
          "O gestor garante que o recorte do serviço esteja claro antes da equipe observar pessoas usando o fluxo real.",
        href: "/processos",
        hrefLabel: "Ver processos",
        icon: FileStack,
      },
      {
        eyebrow: "Equipe de análise",
        title: "Defina analistas para o órgão",
        body: canManageTeam
          ? "Em Usuários, vincule analistas ao seu órgão. Você não promove admins nem outros gestores: seu foco é montar o time de coleta e análise."
          : "Quando estiver vinculado como gestor de um órgão, a tela de usuários libera o vínculo de analistas no seu escopo.",
        concept:
          "Separar gestor e analista evita que criação, coleta e validação se misturem sem rastreabilidade.",
        href: canManageTeam ? "/admin/usuarios" : "/processos",
        hrefLabel: canManageTeam ? "Gerenciar equipe" : "Ver escopo",
        icon: UserCheck,
      },
      {
        eyebrow: "Contexto primeiro",
        title: "Abra o processo e complete a hipótese de trabalho",
        body: "Objetivo, público-alvo, indicadores e hipóteses orientam a jornada planejada e evitam uma análise sem pergunta de pesquisa.",
        concept:
          "No F5, contexto incompleto gera observação frouxa. A trilha visual mostra esse avanço antes da coleta.",
        href: "/processos",
        hrefLabel: "Abrir diagnóstico",
        icon: ClipboardCheck,
      },
      {
        eyebrow: "Validação",
        title: "Compare planejado, individual e padrão",
        body: "A jornada planejada descreve o ideal; as individuais revelam a realidade; a padrão organiza o que se repete no serviço.",
        concept:
          "Repetições e desvios são sinais: ajudam a localizar sludge antes de virar recomendação.",
        href: "/processos",
        hrefLabel: "Ver jornadas",
        icon: Route,
      },
      {
        eyebrow: "Decisão",
        title: "Use resultados para priorizar melhoria",
        body: "Os gráficos consolidam barreiras, impacto e tempo. Eles servem para decidir onde intervir primeiro dentro do órgão.",
        concept:
          "O método fecha o ciclo quando evidência observada vira priorização de barreiras públicas.",
        href: "/catalogo",
        hrefLabel: "Rever critérios",
        icon: BarChart3,
      },
    ];
  }

  if (role === "analista") {
    return [
      {
        eyebrow: "Coleta com método",
        title: "Você preenche a evidência do diagnóstico",
        body: "Acesse processos do seu órgão, complete contexto quando necessário e registre os passos da jornada planejada.",
        concept:
          "A jornada planejada é a promessa do serviço. Ela vira referência para comparar o que acontece na observação real.",
        href: "/processos",
        hrefLabel: "Ver processos",
        icon: ClipboardCheck,
      },
      {
        eyebrow: "Observação real",
        title: "Marque desvio, repetição, barreira e print",
        body: "Nas jornadas individuais, cada passo pode carregar tempo, tipo de comportamento, evidência visual e notas de campo.",
        concept:
          "O F5 trata esforço como evidência: onde a pessoa repete, erra, espera ou abandona, existe material para análise.",
        href: "/processos",
        hrefLabel: "Abrir jornadas",
        icon: Route,
      },
      {
        eyebrow: "Questionários",
        title: "Transforme observação em escala comparável",
        body: "Os questionários 1-5 qualificam barreiras e impacto. Responda com base na jornada, não em impressão solta.",
        concept:
          "As escalas conectam comportamento observado a critérios do catálogo F5, mantendo comparabilidade entre processos.",
        href: "/catalogo",
        hrefLabel: "Consultar critérios",
        icon: BookOpenCheck,
      },
      {
        eyebrow: "Resultados",
        title: "Confira se os achados estão coerentes",
        body: "Resultados exibem médias, tempos e ranking de barreiras. Use para revisar lacunas antes da validação final.",
        concept:
          "A análise fica mais forte quando as notas, tempos e comentários apontam para a mesma fricção.",
        href: "/processos",
        hrefLabel: "Ver resultados",
        icon: BarChart3,
      },
      {
        eyebrow: "Conforto de uso",
        title: "Ajuste tema e recupere este tour quando quiser",
        body: "Troque entre claro, escuro e sistema no seletor de tema. O botão Tour F5 fica disponível no canto da tela.",
        concept:
          "A interface tenta acompanhar o caderno de campo: visual, rápida e sem perder rastreabilidade.",
        icon: Moon,
      },
    ];
  }

  return [
    {
      eyebrow: "Leitura assistida",
      title: "Você vê apenas processos atribuídos",
      body: "Visitantes entram em modo leitura. O admin ou gestor atribui processos específicos para você acompanhar.",
      concept:
        "Essa separação permite compartilhar evidências sem abrir edição de dados sensíveis da pesquisa.",
      href: "/processos",
      hrefLabel: "Ver processos",
      icon: Eye,
    },
    {
      eyebrow: "Como ler o diagnóstico",
      title: "Siga a trilha F5 de cima para baixo",
      body: "Abra um processo e leia contexto, jornadas, questionários e resultados como uma sequência metodológica.",
      concept:
        "Contexto explica o recorte; jornadas mostram o comportamento; resultados sintetizam barreiras e impacto.",
      href: "/processos",
      hrefLabel: "Abrir processo",
      icon: Compass,
    },
    {
      eyebrow: "Conceitos",
      title: "Use o Catálogo F5 como glossário prático",
      body: "O catálogo reúne categorias, tipos de comportamento e critérios que aparecem nos questionários e resultados.",
      concept:
        "Quando todos usam a mesma linguagem, a leitura do diagnóstico fica mais precisa.",
      href: "/catalogo",
      hrefLabel: "Consultar catálogo",
      icon: BookOpenCheck,
    },
    {
      eyebrow: "Modo claro e escuro",
      title: "A aparência fica com você",
      body: "O seletor de tema permite claro, escuro ou sistema. No modo leitura, isso ajuda em revisão longa de evidências.",
      concept:
        "O tour fica sempre no canto inferior: use para reaprender o fluxo sem depender de documentação externa.",
      icon: Moon,
    },
  ];
}

export function ProductTour({
  role,
  userId,
  userName,
  canManageTeam = false,
}: ProductTourProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const steps = useMemo(
    () => stepsForRole(role, canManageTeam),
    [canManageTeam, role],
  );
  const storageKey = `antisludge:onboarding:v1:${userId}:${role}`;
  const snoozeKey = `${storageKey}:snoozed`;
  const step = steps[stepIndex];
  const Icon = step.icon;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const params = new URLSearchParams(window.location.search);
    const requestedTour = params.get("tour") === "1";
    const completed = localStorage.getItem(storageKey) === "done";
    const snoozed = sessionStorage.getItem(snoozeKey) === "true";

    if (requestedTour || (!completed && !snoozed)) {
      const timeout = window.setTimeout(() => setOpen(true), 650);
      return () => window.clearTimeout(timeout);
    }

    return undefined;
  }, [mounted, snoozeKey, storageKey]);

  if (!mounted) return null;

  function openTour() {
    setStepIndex(0);
    setOpen(true);
  }

  function snoozeTour() {
    sessionStorage.setItem(snoozeKey, "true");
    setOpen(false);
  }

  function completeTour() {
    localStorage.setItem(storageKey, "done");
    sessionStorage.removeItem(snoozeKey);
    setOpen(false);
    setStepIndex(0);
  }

  function nextStep() {
    if (stepIndex === steps.length - 1) {
      completeTour();
      return;
    }
    setStepIndex((current) => current + 1);
  }

  return (
    <>
      <button
        type="button"
        onClick={openTour}
        className="fixed bottom-4 right-4 z-40 inline-flex h-11 items-center gap-2 rounded-full border bg-card px-4 text-sm font-medium shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Abrir tour do produto"
      >
        <Sparkles className="h-4 w-4 text-accent" />
        <span className="hidden sm:inline">Tour F5</span>
      </button>

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
              aria-labelledby="product-tour-title"
              className="relative w-full max-w-4xl overflow-hidden rounded-lg border bg-card shadow-2xl"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <WatercolorSplatter
                className="absolute -right-16 -top-24"
                size={280}
                opacity={0.32}
                seed={stepIndex + 20}
              />
              <button
                type="button"
                onClick={snoozeTour}
                className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Fechar tour"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative grid gap-0 lg:grid-cols-[280px_1fr]">
                <aside className="border-b bg-muted/35 p-5 lg:border-b-0 lg:border-r">
                  <div className="mb-4 flex items-center gap-3">
                    <NumeroEtapa value={stepIndex + 1} size={44} tilt={-4} />
                    <div>
                      <StatusPill tone={roleTones[role]}>
                        {roleLabels[role]}
                      </StatusPill>
                      <div className="mt-2 font-mono text-[11px] uppercase text-muted-foreground">
                        Onboarding MVP v1
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {roleOpeners[role]}
                  </p>
                  {userName && (
                    <p className="mt-4 font-hand text-lg leading-5 text-foreground">
                      Bem-vindo, {userName.split(" ")[0]}.
                    </p>
                  )}

                  <div className="mt-6 space-y-3">
                    {methodTrail.map((label, index) => {
                      const active = index <= Math.min(stepIndex, methodTrail.length - 1);
                      return (
                        <div key={label} className="flex items-center gap-3">
                          <motion.span
                            className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] ${
                              active
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-card text-muted-foreground"
                            }`}
                            animate={{ scale: active ? 1 : 0.92 }}
                          >
                            {index + 1}
                          </motion.span>
                          <span
                            className={`text-xs ${
                              active ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </aside>

                <main className="p-5 sm:p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary/12 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[11px] uppercase text-muted-foreground">
                        {step.eyebrow}
                      </div>
                      <h2
                        id="product-tour-title"
                        className="font-hand text-3xl leading-tight"
                      >
                        {step.title}
                      </h2>
                    </div>
                  </div>

                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                    {step.body}
                  </p>

                  <div className="mt-5 rounded-md border bg-background p-4">
                    <div className="mb-2 font-mono text-[11px] uppercase text-muted-foreground">
                      Conceito do método
                    </div>
                    <p className="text-sm leading-6">{step.concept}</p>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        Passo {stepIndex + 1} de {steps.length}
                      </span>
                      <span>{Math.round(((stepIndex + 1) / steps.length) * 100)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={false}
                        animate={{
                          width: `${((stepIndex + 1) / steps.length) * 100}%`,
                        }}
                        transition={{ duration: 0.25 }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
                        disabled={stepIndex === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Voltar
                      </Button>
                      <Button type="button" onClick={nextStep}>
                        {stepIndex === steps.length - 1 ? "Concluir" : "Próximo"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex gap-2 sm:justify-end">
                      {step.href && (
                        <Button asChild variant="ghost">
                          <Link href={step.href} onClick={() => setOpen(false)}>
                            {step.hrefLabel ?? "Abrir tela"}
                          </Link>
                        </Button>
                      )}
                      <Button type="button" variant="ghost" onClick={completeTour}>
                        Não mostrar de novo
                      </Button>
                    </div>
                  </div>
                </main>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

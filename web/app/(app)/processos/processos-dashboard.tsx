"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Building2,
  FileStack,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { NumeroEtapa } from "@/components/fcinco/numero-etapa";
import { SketchFrame } from "@/components/fcinco/sketch-frame";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";
import type { PapelGlobal } from "@/types/database";

export type ProcessoDashboardItem = {
  id: string;
  nome: string;
  objetivo: string | null;
  publicoAlvo: string | null;
  orgaoSigla: string;
  orgaoNome: string | null;
  esfera: string;
  contextoPreenchido: number;
  contextoTotal: number;
  createdAt: string;
};

type FilterMode = "todos" | "contexto" | "rascunho";

export default function ProcessosDashboard({
  processos,
  canCreateProcess,
  role,
}: {
  processos: ProcessoDashboardItem[];
  canCreateProcess: boolean;
  role: PapelGlobal;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterMode>("todos");

  const orgaos = new Set(processos.map((p) => p.orgaoSigla)).size;
  const completos = processos.filter(
    (p) => p.contextoPreenchido === p.contextoTotal,
  ).length;
  const rascunhos = processos.length - completos;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return processos.filter((p) => {
      const matchesQuery =
        !q ||
        [p.nome, p.orgaoSigla, p.orgaoNome, p.esfera, p.objetivo, p.publicoAlvo]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(q));
      const matchesFilter =
        filter === "todos" ||
        (filter === "contexto" && p.contextoPreenchido === p.contextoTotal) ||
        (filter === "rascunho" && p.contextoPreenchido < p.contextoTotal);
      return matchesQuery && matchesFilter;
    });
  }, [filter, processos, query]);

  return (
    <motion.div
      className="flex flex-col gap-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="relative overflow-hidden rounded-lg border bg-card p-5 sm:p-7">
        <WatercolorSplatter
          className="absolute -right-16 -top-24"
          size={300}
          rotation={-10}
          opacity={0.34}
          seed={61}
        />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="min-w-0">
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              Mesa inicial de pesquisa e diagnóstico
            </div>
            <SketchFrame seed={13} padX={24} padY={12}>
              <span className="font-hand text-4xl leading-tight sm:text-5xl">
                Processos Anti-Sludge
              </span>
            </SketchFrame>
            <div className="mt-2 text-accent">
              <SketchUnderline width={240} variant="long" />
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
              Escolha um serviço público para mapear contexto, jornada
              planejada, observações individuais, questionários e resultados F5.
              O painel abaixo usa apenas campos cadastrados no processo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <ThemeSwitcher />
            {canCreateProcess && (
              <Button asChild>
                <Link href="/processos/novo">
                  <Plus className="h-4 w-4" />
                  Novo processo
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <motion.section
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07 } },
        }}
      >
        <MetricCard label="processos visíveis" value={processos.length} />
        <MetricCard label="órgãos no escopo" value={orgaos} />
        <MetricCard label="contexto completo" value={completos} tone="ok" />
        <MetricCard label="rascunhos de contexto" value={rascunhos} tone="warn" />
      </motion.section>

      <section className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center">
        <label className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por processo, órgão, esfera ou objetivo"
            className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <FilterButton active={filter === "todos"} onClick={() => setFilter("todos")}>
            Todos
          </FilterButton>
          <FilterButton
            active={filter === "contexto"}
            onClick={() => setFilter("contexto")}
          >
            Contexto completo
          </FilterButton>
          <FilterButton
            active={filter === "rascunho"}
            onClick={() => setFilter("rascunho")}
          >
            Rascunho
          </FilterButton>
        </div>
      </section>

      {processos.length === 0 ? (
        <EmptyState canCreateProcess={canCreateProcess} role={role} />
      ) : (
        <motion.section layout className="grid gap-4 xl:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((processo, index) => (
              <ProcessoCard
                key={processo.id}
                processo={processo}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.section>
      )}

      {processos.length > 0 && filtered.length === 0 && (
        <div className="rounded-lg border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
          Nenhum processo encontrado com esse filtro.
        </div>
      )}
    </motion.div>
  );
}

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: "ok" | "warn";
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -3 }}
      className="rounded-lg border bg-card p-4"
    >
      <div
        className={`font-display text-4xl leading-none ${
          tone === "ok"
            ? "text-primary"
            : tone === "warn"
              ? "text-accent"
              : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div className="mt-1 font-mono text-[11px] uppercase text-muted-foreground">
        {label}
      </div>
    </motion.div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 rounded-md border px-3 text-xs transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "bg-background text-muted-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}

function ProcessoCard({
  processo,
  index,
}: {
  processo: ProcessoDashboardItem;
  index: number;
}) {
  const progress = Math.round(
    (processo.contextoPreenchido / processo.contextoTotal) * 100,
  );
  const completo = processo.contextoPreenchido === processo.contextoTotal;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.34, delay: index * 0.04 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.99 }}
      className="group rounded-lg border bg-card p-4 transition-colors hover:border-primary/50"
    >
      <div className="grid gap-4 md:grid-cols-[1fr_180px]">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <StatusPill tone={completo ? "concluido" : "em_progresso"}>
              {completo ? "contexto completo" : "em análise"}
            </StatusPill>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Building2 className="h-3.5 w-3.5" />
              {processo.orgaoSigla} · {processo.esfera}
            </span>
          </div>

          <h2 className="text-xl font-semibold leading-tight text-foreground">
            {processo.nome}
          </h2>
          <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
            {processo.objetivo ||
              processo.publicoAlvo ||
              "Abra o processo para preencher objetivo, público e hipóteses do serviço."}
          </p>

          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>Contexto metodológico</span>
              <span>
                {processo.contextoPreenchido}/{processo.contextoTotal}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, delay: 0.15 + index * 0.05 }}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link href={`/processos/${processo.id}`}>
                Abrir diagnóstico
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/processos/${processo.id}/jornada-planejada`}>
                Jornada
              </Link>
            </Button>
          </div>
        </div>

        <F5TrailPreview progress={progress} />
      </div>
    </motion.article>
  );
}

function F5TrailPreview({ progress }: { progress: number }) {
  const activeStep = Math.max(1, Math.ceil((progress / 100) * 7));

  return (
    <div className="relative hidden min-h-40 rounded-md border bg-background p-4 md:block">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase text-muted-foreground">
          trilha F5
        </span>
        <NumeroEtapa value={activeStep} size={34} tilt={-3} />
      </div>
      <svg className="h-24 w-full" viewBox="0 0 180 84" aria-hidden="true">
        <path
          d="M 10 68 C 42 10, 72 78, 104 26 S 148 24, 170 58"
          fill="none"
          stroke="hsl(var(--trilha-muted))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="5 7"
        />
        <motion.path
          d="M 10 68 C 42 10, 72 78, 104 26 S 148 24, 170 58"
          fill="none"
          stroke="hsl(var(--trilha))"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        {[10, 42, 72, 104, 130, 150, 170].map((x, i) => (
          <motion.circle
            key={x}
            cx={x}
            cy={[68, 30, 61, 26, 18, 35, 58][i]}
            r={i + 1 <= activeStep ? 5 : 4}
            fill={i + 1 <= activeStep ? "hsl(var(--accent))" : "hsl(var(--card))"}
            stroke="hsl(var(--ink))"
            strokeWidth="1.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15 + i * 0.06 }}
          />
        ))}
      </svg>
      <div className="font-mono text-[11px] text-muted-foreground">
        {progress}% do contexto preenchido
      </div>
    </div>
  );
}

function EmptyState({
  canCreateProcess,
  role,
}: {
  canCreateProcess: boolean;
  role: PapelGlobal;
}) {
  const isVisitor = role === "visitante";

  return (
    <div className="rounded-lg border border-dashed bg-card p-8 text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-md bg-muted">
        <FileStack className="h-6 w-6 text-muted-foreground" />
      </div>
      <h2 className="font-semibold">Nenhum processo visível no seu escopo</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
        {isVisitor
          ? "Peça ao admin ou gestor para atribuir um processo ao seu usuário. Visitantes acessam somente processos específicos em modo leitura."
          : canCreateProcess
            ? "Comece criando um processo de diagnóstico no seu escopo, ou cadastre o órgão antes quando necessário."
            : "Peça ao gestor do órgão para vincular você a um processo ou equipe de análise."}
      </p>
      {canCreateProcess && (
        <div className="mt-5 flex justify-center gap-2">
          {role === "admin" && (
            <Button asChild variant="outline">
              <Link href="/admin/orgaos">Órgãos</Link>
            </Button>
          )}
          <Button asChild>
            <Link href="/processos/novo">
              <Plus className="h-4 w-4" />
              Novo processo
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

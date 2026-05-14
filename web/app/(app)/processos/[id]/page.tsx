import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { getSessionOrRedirect } from "@/lib/auth/session";
import { listMyOrgaos } from "@/lib/db/orgs";
import { getProcessoPermissions } from "@/lib/auth/processo-permissions";
import { ArrowRight, FileText, Route, Pencil } from "lucide-react";
import { NumeroEtapa } from "@/components/fcinco/numero-etapa";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill, type StatusTone } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";

export default async function ProcessoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSessionOrRedirect();
  const processo = await getProcesso(id);
  if (!processo) notFound();
  const { canEdit } = await getProcessoPermissions(id);

  const supabase = await createClient();

  // Pode editar a metadata (nome + órgão): admin global OU gestor do órgão atual.
  const isAdmin = session.profile.papel_global === "admin";
  let podeEditarMeta = isAdmin;
  if (!podeEditarMeta) {
    const meus = await listMyOrgaos();
    podeEditarMeta = meus.some(
      (m) => m.orgao_id === processo.orgao_id && m.papel_no_orgao === "gestor",
    );
  }

  const camposContexto = [
    { label: "Objetivo", v: processo.objetivo },
    { label: "Abrangência", v: processo.abrangencia },
    { label: "Público-alvo", v: processo.publico_alvo },
    { label: "Perfil foco", v: processo.perfil_foco },
    { label: "Indicadores de satisfação", v: processo.indicadores_satisfacao },
    { label: "Hipóteses", v: processo.hipoteses },
  ];
  const contextoPreenchidos = camposContexto.filter((c) => c.v && c.v.trim()).length;

  const { data: jornadaPlanejada } = await supabase
    .from("jornada")
    .select("id")
    .eq("processo_id", id)
    .eq("tipo_jornada", "planejada")
    .maybeSingle();

  let qtdPassosPlanejada = 0;
  if (jornadaPlanejada) {
    const { count } = await supabase
      .from("passo_jornada")
      .select("*", { count: "exact", head: true })
      .eq("jornada_id", jornadaPlanejada.id);
    qtdPassosPlanejada = count ?? 0;
  }

  const { count: qtdParticipantes } = await supabase
    .from("participante")
    .select("*", { count: "exact", head: true })
    .eq("processo_id", id);

  const { count: qtdProtocolos } = await supabase
    .from("protocolo_observacao")
    .select("*", { count: "exact", head: true })
    .eq("processo_id", id);

  const { data: jornadasIndividuais } = await supabase
    .from("jornada")
    .select("id, validada")
    .eq("processo_id", id)
    .eq("tipo_jornada", "individual");
  const qtdIndividuais = jornadasIndividuais?.length ?? 0;
  const qtdValidadas = jornadasIndividuais?.filter((j) => j.validada).length ?? 0;

  const { data: jornadaPadrao } = await supabase
    .from("jornada")
    .select("id")
    .eq("processo_id", id)
    .eq("tipo_jornada", "padrao")
    .maybeSingle();

  let qtdPassosPadrao = 0;
  if (jornadaPadrao) {
    const { count } = await supabase
      .from("passo_jornada")
      .select("*", { count: "exact", head: true })
      .eq("jornada_id", jornadaPadrao.id);
    qtdPassosPadrao = count ?? 0;
  }

  // Conta respostas concluídas
  const { count: qtdQuestionariosConcluidos } = await supabase
    .from("questionario_resposta")
    .select("id, jornada:jornada_id!inner (processo_id)", { count: "exact", head: true })
    .eq("jornada.processo_id", id)
    .eq("concluido", true);

  // Conta total de itens respondidos (qualquer estado) — mais robusto
  // para indicar atividade nos questionários
  let qtdItens = 0;
  {
    const { data: jornadasDoProcesso } = await supabase
      .from("jornada")
      .select("id")
      .eq("processo_id", id);
    const jids = (jornadasDoProcesso ?? []).map((j) => j.id as string);
    if (jids.length > 0) {
      const { data: respostas } = await supabase
        .from("questionario_resposta")
        .select("id")
        .in("jornada_id", jids);
      const rids = (respostas ?? []).map((r) => r.id as string);
      if (rids.length > 0) {
        const { count } = await supabase
          .from("resposta_item")
          .select("*", { count: "exact", head: true })
          .in("questionario_resposta_id", rids);
        qtdItens = count ?? 0;
      }
    }
  }

  const etapas: Array<{
    ordem: number;
    titulo: string;
    descricao: string;
    href: string;
    status: "concluido" | "em_progresso" | "pendente";
    detalhe: string;
  }> = [
    {
      ordem: 1,
      titulo: "Compreensão do contexto",
      descricao: "Objetivo, público, indicadores e hipóteses do serviço.",
      href: `/processos/${id}/contexto`,
      status:
        contextoPreenchidos === camposContexto.length
          ? "concluido"
          : contextoPreenchidos > 0
            ? "em_progresso"
            : "pendente",
      detalhe: `${contextoPreenchidos}/${camposContexto.length} campos preenchidos`,
    },
    {
      ordem: 2,
      titulo: "Jornada planejada",
      descricao: "Sequência ideal de passos do serviço.",
      href: `/processos/${id}/jornada-planejada`,
      status: qtdPassosPlanejada > 0 ? "em_progresso" : "pendente",
      detalhe:
        qtdPassosPlanejada === 0
          ? "Nenhum passo cadastrado"
          : `${qtdPassosPlanejada} passo${qtdPassosPlanejada === 1 ? "" : "s"}`,
    },
    {
      ordem: 3,
      titulo: "Participantes e observação",
      descricao: "Pessoas anonimizadas, protocolo da sessão e entrevista pós-observação.",
      href: `/processos/${id}/observacoes`,
      status:
        (qtdProtocolos ?? 0) > 0
          ? "em_progresso"
          : (qtdParticipantes ?? 0) > 0
            ? "em_progresso"
            : "pendente",
      detalhe:
        (qtdParticipantes ?? 0) === 0
          ? "Nenhum participante"
          : `${qtdParticipantes} participante${qtdParticipantes === 1 ? "" : "s"} · ${qtdProtocolos ?? 0} protocolo${(qtdProtocolos ?? 0) === 1 ? "" : "s"}`,
    },
    {
      ordem: 4,
      titulo: "Jornadas individuais",
      descricao: "Sequência real de passos por participante.",
      href: `/processos/${id}/jornadas-individuais`,
      status: qtdIndividuais > 0 ? "em_progresso" : "pendente",
      detalhe:
        qtdIndividuais === 0
          ? "Nenhuma iniciada"
          : `${qtdIndividuais} jornada${qtdIndividuais === 1 ? "" : "s"} (${qtdValidadas} validada${qtdValidadas === 1 ? "" : "s"})`,
    },
    {
      ordem: 5,
      titulo: "Jornada padrão",
      descricao: "Síntese normalizada das jornadas individuais.",
      href: `/processos/${id}/jornada-padrao`,
      status: qtdPassosPadrao > 0 ? "em_progresso" : "pendente",
      detalhe:
        qtdPassosPadrao === 0
          ? "Não iniciada"
          : `${qtdPassosPadrao} passo${qtdPassosPadrao === 1 ? "" : "s"}`,
    },
    {
      ordem: 6,
      titulo: "Questionários",
      descricao: "Avaliação 1-5 por critério em cada jornada.",
      href: `/processos/${id}/jornadas-individuais`,
      status: (qtdQuestionariosConcluidos ?? 0) > 0
        ? "em_progresso"
        : qtdItens > 0
          ? "em_progresso"
          : "pendente",
      detalhe:
        qtdItens === 0
          ? "Sem respostas"
          : `${qtdItens} item${qtdItens === 1 ? "" : "ns"} respondido${qtdItens === 1 ? "" : "s"} · ${qtdQuestionariosConcluidos ?? 0} concluído${(qtdQuestionariosConcluidos ?? 0) === 1 ? "" : "s"}`,
    },
    {
      ordem: 7,
      titulo: "Resultados e gráficos",
      descricao: "Médias por critério, tempo, ranking de sludge.",
      href: `/processos/${id}/resultados`,
      status: qtdItens > 0 ? "em_progresso" : "pendente",
      detalhe: qtdItens > 0 ? "Gráficos disponíveis" : "Aguardando respostas",
    },
  ];
  const concluidas = etapas.filter((e) => e.status === "concluido").length;
  const emProgresso = etapas.filter((e) => e.status === "em_progresso").length;

  return (
    <div className="flex flex-col gap-8">
      <header className="relative overflow-hidden rounded-lg border bg-card p-5 sm:p-7">
        <WatercolorSplatter
          className="absolute -right-16 -top-20"
          size={260}
          rotation={-12}
          opacity={0.32}
          seed={19}
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
          <Link
            href="/processos"
            className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            ← Processos
          </Link>
          <div className="mt-2 font-mono text-xs uppercase text-muted-foreground">
            {processo.orgao?.sigla} · {processo.orgao?.esfera}
          </div>
          <div className="flex items-start gap-3">
            <h1 className="font-hand text-4xl leading-tight text-foreground sm:text-5xl">
              {processo.nome}
            </h1>
            {podeEditarMeta && (
              <Link
                href={`/processos/${id}/editar`}
                className="mt-2 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Editar nome e órgão do processo"
                title="Editar nome e órgão"
              >
                <Pencil className="h-4 w-4" />
              </Link>
            )}
          </div>
          <div className="mt-1 text-accent">
            <SketchUnderline width={220} variant="long" />
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Acompanhe o processo pela sequência metodológica F5: contexto,
            jornadas, questionários e resultados derivados apenas de dados
            respondidos.
          </p>
        </div>

          <div className="grid grid-cols-3 gap-4 text-right">
            <HubStat label="etapas concluídas" value={`${concluidas}/7`} />
            <HubStat label="em andamento" value={emProgresso} />
            <HubStat label="participantes" value={qtdParticipantes ?? 0} />
            {!canEdit && (
              <div className="col-span-3 flex justify-end">
                <StatusPill tone="pendente">somente leitura</StatusPill>
              </div>
            )}
          </div>
        </div>
      </header>

      <section>
        <div className="mb-4 flex flex-wrap items-end gap-3">
          <div>
            <h2 className="text-xl font-semibold">Status metodológico</h2>
            <p className="text-sm text-muted-foreground">
              Cobertura operacional da planilha F5 neste processo.
            </p>
          </div>
          <div className="ml-auto flex flex-wrap gap-2">
            <Link href={`/processos/${id}/jornada-planejada`}>
              <Button variant="outline" size="sm">
                <Route className="h-4 w-4" />
                Jornada planejada
              </Button>
            </Link>
            <Link href={`/processos/${id}/resultados`}>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4" />
                Resultados
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-[38px] top-14 h-[calc(100%-7rem)] border-l-2 border-dashed border-trilha/70" />
          <div className="flex flex-col gap-3">
            {etapas.map((e, idx) => (
              <EtapaResumo key={e.ordem} etapa={e} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-wrap gap-2 border-t pt-5">
        {podeEditarMeta && (
          <Link href={`/processos/${id}/editar`}>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4" />
              Nome e órgão
            </Button>
          </Link>
        )}
        <Link href={`/processos/${id}/contexto`}>
          <Button variant="outline" size="sm">
            {canEdit ? "Editar contexto" : "Ver contexto"}
          </Button>
        </Link>
        <Link href={`/processos/${id}/jornada-planejada`}>
          <Button variant="outline" size="sm">Jornada planejada</Button>
        </Link>
        <Link href={`/processos/${id}/participantes`}>
          <Button variant="outline" size="sm">Participantes</Button>
        </Link>
        <Link href={`/processos/${id}/observacoes`}>
          <Button variant="outline" size="sm">Observações</Button>
        </Link>
        <Link href={`/processos/${id}/jornadas-individuais`}>
          <Button variant="outline" size="sm">Jornadas individuais</Button>
        </Link>
        <Link href={`/processos/${id}/jornada-padrao`}>
          <Button variant="outline" size="sm">Jornada padrão</Button>
        </Link>
        <Link href={`/processos/${id}/resultados`}>
          <Button variant="outline" size="sm">Resultados</Button>
        </Link>
        <Link href={`/processos/${id}/relatorio`}>
          <Button variant="outline" size="sm">Relatório</Button>
        </Link>
      </section>
    </div>
  );
}

function HubStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="font-display text-4xl leading-none text-foreground">{value}</div>
      <div className="mt-1 font-mono text-[10px] uppercase text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function EtapaResumo({
  etapa,
  index,
}: {
  etapa: {
    ordem: number;
    titulo: string;
    descricao: string;
    status: "concluido" | "em_progresso" | "pendente";
    detalhe: string;
    href: string;
  };
  index: number;
}) {
  const pendente = etapa.status === "pendente";
  const active = etapa.status === "em_progresso";
  return (
    <Link
      href={etapa.href}
      className={`group relative grid grid-cols-[76px_1fr] gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/30 sm:grid-cols-[92px_1fr] ${
        pendente ? "opacity-70" : ""
      }`}
    >
      <div className="relative min-h-20">
        <NumeroEtapa
          value={etapa.ordem}
          size={60}
          tilt={index % 2 === 0 ? -4 : 4}
          className={pendente ? "opacity-45" : ""}
        />
        <span
          className={`absolute left-[31px] top-12 h-5 w-5 rounded-full border-2 shadow-[0_0_0_5px_hsl(var(--background))] sm:left-[37px] ${
            pendente
              ? "border-dashed border-trilha bg-card"
              : "border-trilha bg-trilha"
          }`}
        />
      </div>
      <div className="min-w-0 py-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold">{etapa.titulo}</h3>
          <StatusPill tone={etapa.status as StatusTone}>
            {statusLabel(etapa.status)}
          </StatusPill>
          {active && (
            <span className="font-hand text-base text-accent">voce esta aqui</span>
          )}
        </div>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          {etapa.descricao}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">
            {etapa.detalhe}
          </span>
          <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

function statusLabel(status: "concluido" | "em_progresso" | "pendente") {
  if (status === "em_progresso") return "em progresso";
  return status;
}

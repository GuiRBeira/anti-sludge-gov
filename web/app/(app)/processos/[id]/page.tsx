import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

export default async function ProcessoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const processo = await getProcesso(id);
  if (!processo) notFound();

  const supabase = await createClient();

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
    nome: string;
    descricao: string;
    href: string;
    status: "concluido" | "em_progresso" | "pendente";
    detalhe: string;
  }> = [
    {
      nome: "1. Compreensão do contexto",
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
      nome: "2. Jornada planejada",
      descricao: "Sequência ideal de passos do serviço.",
      href: `/processos/${id}/jornada-planejada`,
      status: qtdPassosPlanejada > 0 ? "em_progresso" : "pendente",
      detalhe:
        qtdPassosPlanejada === 0
          ? "Nenhum passo cadastrado"
          : `${qtdPassosPlanejada} passo${qtdPassosPlanejada === 1 ? "" : "s"}`,
    },
    {
      nome: "3. Participantes",
      descricao: "Pessoas observadas anonimizadas.",
      href: `/processos/${id}/participantes`,
      status: (qtdParticipantes ?? 0) > 0 ? "em_progresso" : "pendente",
      detalhe:
        (qtdParticipantes ?? 0) === 0
          ? "Nenhum participante"
          : `${qtdParticipantes} participante${qtdParticipantes === 1 ? "" : "s"}`,
    },
    {
      nome: "4. Jornadas individuais",
      descricao: "Sequência real de passos por participante.",
      href: `/processos/${id}/jornadas-individuais`,
      status: qtdIndividuais > 0 ? "em_progresso" : "pendente",
      detalhe:
        qtdIndividuais === 0
          ? "Nenhuma iniciada"
          : `${qtdIndividuais} jornada${qtdIndividuais === 1 ? "" : "s"} (${qtdValidadas} validada${qtdValidadas === 1 ? "" : "s"})`,
    },
    {
      nome: "5. Jornada padrão",
      descricao: "Síntese normalizada das jornadas individuais.",
      href: `/processos/${id}/jornada-padrao`,
      status: qtdPassosPadrao > 0 ? "em_progresso" : "pendente",
      detalhe:
        qtdPassosPadrao === 0
          ? "Não iniciada"
          : `${qtdPassosPadrao} passo${qtdPassosPadrao === 1 ? "" : "s"}`,
    },
    {
      nome: "6. Questionários (barreiras, impactos, necessidade)",
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
      nome: "7. Resultados e gráficos",
      descricao: "Médias por critério, tempo, ranking de sludge.",
      href: `/processos/${id}/resultados`,
      status: qtdItens > 0 ? "em_progresso" : "pendente",
      detalhe: qtdItens > 0 ? "Gráficos disponíveis" : "Aguardando respostas",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/processos"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Processos
          </Link>
          <h1 className="text-2xl font-semibold mt-1">{processo.nome}</h1>
          <p className="text-sm text-muted-foreground">
            {processo.orgao?.sigla} · {processo.orgao?.esfera}
          </p>
        </div>
      </header>

      <section className="border rounded-lg overflow-hidden">
        <div className="bg-muted/40 px-5 py-3 text-sm font-medium border-b">
          Status metodológico (planilha F5)
        </div>
        <ul className="divide-y">
          {etapas.map((e) => (
            <li key={e.nome}>
              <Link
                href={e.href}
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/40"
              >
                <EtapaResumo etapa={e} />
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-wrap gap-2">
        <Link href={`/processos/${id}/contexto`}>
          <Button variant="outline" size="sm">Editar contexto</Button>
        </Link>
        <Link href={`/processos/${id}/jornada-planejada`}>
          <Button variant="outline" size="sm">Jornada planejada</Button>
        </Link>
        <Link href={`/processos/${id}/participantes`}>
          <Button variant="outline" size="sm">Participantes</Button>
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
      </section>
    </div>
  );
}

function EtapaResumo({
  etapa,
}: {
  etapa: {
    nome: string;
    descricao: string;
    status: "concluido" | "em_progresso" | "pendente";
    detalhe: string;
  };
}) {
  return (
    <>
      <StatusIcon status={etapa.status} />
      <div className="min-w-0 flex-1">
        <div className="font-medium">{etapa.nome}</div>
        <div className="text-xs text-muted-foreground">{etapa.descricao}</div>
      </div>
      <div className="hidden text-xs text-muted-foreground sm:block">
        {etapa.detalhe}
      </div>
    </>
  );
}

function StatusIcon({ status }: { status: "concluido" | "em_progresso" | "pendente" }) {
  if (status === "concluido") {
    return <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />;
  }
  if (status === "em_progresso") {
    return <Circle className="h-5 w-5 text-blue-500 shrink-0 fill-blue-500/20" />;
  }
  return <Circle className="h-5 w-5 text-muted-foreground/50 shrink-0" />;
}

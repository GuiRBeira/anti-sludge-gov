import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import {
  mediasPorCriterio,
  tempoTotalPorJornada,
} from "@/features/analysis/queries";
import GraficoMediaCriterios from "./grafico-criterios";
import GraficoTempoJornadas from "./grafico-tempos";

export default async function ResultadosPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const processo = await getProcesso(id);
  if (!processo) notFound();

  const [medias, tempos] = await Promise.all([
    mediasPorCriterio(id),
    tempoTotalPorJornada(id),
  ]);

  const barreiras = medias.filter((m) => m.dimensao === "barreira");
  const impactosNaoNec = medias.filter(
    (m) => m.dimensao === "impacto" && m.subdimensao !== "necessidade",
  );
  const necessidade = medias.filter(
    (m) => m.dimensao === "impacto" && m.subdimensao === "necessidade",
  );

  const totalRespondidasBarreira = barreiras.reduce((s, m) => s + m.qtd_respostas, 0);
  const totalRespondidasImpacto = impactosNaoNec.reduce((s, m) => s + m.qtd_respostas, 0);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <Link
          href={`/processos/${id}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          ← {processo.nome}
        </Link>
        <h1 className="text-2xl font-semibold mt-1">Resultados e gráficos</h1>
        <p className="text-sm text-muted-foreground">
          Médias derivadas das respostas reais dos questionários. Onde não há
          dado, mostramos &quot;sem dado&quot; — nada é estimado.
        </p>
      </header>

      <Secao
        titulo="Médias de barreiras por critério"
        descricao={`${totalRespondidasBarreira} resposta${totalRespondidasBarreira === 1 ? "" : "s"} considerada${totalRespondidasBarreira === 1 ? "" : "s"} (escala 1-5; N/A excluído).`}
      >
        <GraficoMediaCriterios data={barreiras} dimensao="barreira" />
      </Secao>

      <Secao
        titulo="Médias de impactos por critério"
        descricao={`Carga Cognitiva, Emoção e Consequência. ${totalRespondidasImpacto} resposta${totalRespondidasImpacto === 1 ? "" : "s"}.`}
      >
        <GraficoMediaCriterios data={impactosNaoNec} dimensao="impacto" />
      </Secao>

      <Secao
        titulo="Necessidade (uma por jornada)"
        descricao="Avaliada uma vez por jornada inteira, não por passo."
      >
        <NecessidadeBlock data={necessidade} />
      </Secao>

      <Secao
        titulo="Tempo total por jornada"
        descricao="Soma dos tempos por passo cadastrados em cada jornada."
      >
        <GraficoTempoJornadas data={tempos} />
      </Secao>
    </div>
  );
}

function Secao({
  titulo,
  descricao,
  children,
}: {
  titulo: string;
  descricao: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border rounded-lg p-5">
      <h2 className="font-medium">{titulo}</h2>
      <p className="text-xs text-muted-foreground mb-4">{descricao}</p>
      {children}
    </section>
  );
}

function NecessidadeBlock({
  data,
}: {
  data: { criterio_nome: string; media: number | null; qtd_respostas: number }[];
}) {
  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground italic">Sem critério de necessidade no catálogo.</p>;
  }
  return (
    <ul className="text-sm flex flex-col gap-2">
      {data.map((d) => (
        <li key={d.criterio_nome} className="flex items-center justify-between border rounded-md p-3">
          <span>{d.criterio_nome}</span>
          {d.media != null ? (
            <span>
              <strong>{d.media.toFixed(2)}</strong>{" "}
              <span className="text-xs text-muted-foreground">
                ({d.qtd_respostas} resp.)
              </span>
            </span>
          ) : (
            <span className="text-xs text-muted-foreground italic">sem dado</span>
          )}
        </li>
      ))}
    </ul>
  );
}

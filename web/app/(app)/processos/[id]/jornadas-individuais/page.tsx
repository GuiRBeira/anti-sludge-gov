import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import { listParticipantes } from "@/features/observations/queries";
import { listJornadasIndividuais } from "@/features/journeys/queries";
import { iniciarJornadaIndividual } from "@/features/journeys/actions";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/fcinco/empty-state";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";
import { StageNavigation } from "@/components/fcinco/stage-navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function JornadasIndividuaisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const processo = await getProcesso(id);
  if (!processo) notFound();

  const [participantes, jornadas] = await Promise.all([
    listParticipantes(id),
    listJornadasIndividuais(id),
  ]);

  const jornadaPorParticipante = new Map(
    jornadas.map((j) => [j.participante_id, j]),
  );

  return (
    <div className="flex flex-col gap-6">
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={240}
          opacity={0.3}
          seed={32}
          color="hsl(var(--accent))"
        />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
        <Link
          href={`/processos/${id}`}
          className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          ← {processo.nome}
        </Link>
            <div className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              etapa 04 de 06
            </div>
            <h1 className="mt-1 font-hand text-4xl leading-tight">
              Jornadas individuais
            </h1>
            <SketchUnderline width={220} variant="long" color="hsl(var(--accent))" />
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Equivalente às abas <strong>JU.Individual 01..05</strong> da
              planilha F5. Cada participante tem sua jornada com os passos
              realmente observados.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <StatusPill tone="em_progresso">
              {participantes.length} participantes
            </StatusPill>
            <StatusPill tone={jornadas.length > 0 ? "concluido" : "pendente"}>
              {jornadas.length} jornadas
            </StatusPill>
          </div>
        </div>
      </header>

      {participantes.length === 0 ? (
        <EmptyState
          title="Nenhum participante cadastrado"
          description="Cadastre participantes anonimizados antes de iniciar jornadas individuais. O consentimento LGPD precisa estar marcado para iniciar a observação."
          cta={{
            href: `/processos/${id}/participantes`,
            label: "Cadastrar participantes",
          }}
        />
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Participante</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead className="w-28">LGPD</TableHead>
                <TableHead className="w-32">Status</TableHead>
                <TableHead className="w-40">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participantes.map((p) => {
                const jornada = jornadaPorParticipante.get(p.id);
                const semConsent = !p.consentimento_lgpd;
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono font-medium">{p.codigo}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {[p.idade_faixa, p.escolaridade, p.genero].filter(Boolean).join(" · ") || "—"}
                    </TableCell>
                    <TableCell>
                      {p.consentimento_lgpd ? (
                        <StatusPill tone="validada">consentido</StatusPill>
                      ) : (
                        <StatusPill tone="pendente">pendente</StatusPill>
                      )}
                    </TableCell>
                    <TableCell>
                      {jornada ? (
                        jornada.validada ? (
                          <StatusPill tone="validada">validada</StatusPill>
                        ) : (
                          <StatusPill tone="em_progresso">em coleta</StatusPill>
                        )
                      ) : (
                        <span className="text-xs text-muted-foreground">não iniciada</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {jornada ? (
                        <Link
                          href={`/processos/${id}/jornadas-individuais/${jornada.id}`}
                          className="text-sm underline"
                        >
                          Abrir editor
                        </Link>
                      ) : (
                        <form
                          action={async () => {
                            "use server";
                            await iniciarJornadaIndividual(id, p.id);
                          }}
                        >
                          <Button
                            type="submit"
                            size="sm"
                            variant="outline"
                            disabled={semConsent}
                            title={semConsent ? "Falta consentimento LGPD" : undefined}
                          >
                            Iniciar jornada
                          </Button>
                        </form>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <StageNavigation currentStage={4} processoId={id} />
    </div>
  );
}


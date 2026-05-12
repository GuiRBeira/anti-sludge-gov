import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import { listParticipantes } from "@/features/observations/queries";
import { listJornadasIndividuais } from "@/features/journeys/queries";
import { iniciarJornadaIndividual } from "@/features/journeys/actions";
import { Button } from "@/components/ui/button";
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
      <header>
        <Link
          href={`/processos/${id}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          ← {processo.nome}
        </Link>
        <h1 className="text-2xl font-semibold mt-1">Jornadas individuais</h1>
        <p className="text-sm text-muted-foreground">
          Cada participante tem sua jornada com os passos realmente observados.
          Equivalente às abas <strong>JU.Individual 01..05</strong> da planilha.
        </p>
      </header>

      {participantes.length === 0 ? (
        <div className="border rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Nenhum participante cadastrado ainda.
          </p>
          <Link href={`/processos/${id}/participantes`}>
            <Button>Cadastrar participantes</Button>
          </Link>
        </div>
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
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-900 dark:bg-green-950/40 dark:text-green-200">
                          consentido
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                          pendente
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {jornada ? (
                        jornada.validada ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-900 dark:bg-green-950/40 dark:text-green-200">
                            validada
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
                            em coleta
                          </span>
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
    </div>
  );
}

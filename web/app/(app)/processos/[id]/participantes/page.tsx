import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import { listParticipantes } from "@/features/observations/queries";
import ParticipantesClient from "./client";

export default async function ParticipantesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const processo = await getProcesso(id);
  if (!processo) notFound();

  const participantes = await listParticipantes(id);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <Link
          href={`/processos/${id}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          ← {processo.nome}
        </Link>
        <h1 className="text-2xl font-semibold mt-1">Participantes</h1>
        <p className="text-sm text-muted-foreground">
          Pessoas observadas, anonimizadas por código (P01, P02, ...). Não
          armazenamos nome, CPF, email ou telefone — apenas perfil
          sociodemográfico mínimo. Cada participante terá uma jornada
          individual associada.
        </p>
      </header>

      <ParticipantesClient processoId={id} participantes={participantes} />
    </div>
  );
}

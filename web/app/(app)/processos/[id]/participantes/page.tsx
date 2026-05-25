import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import { getProcessoPermissions } from "@/lib/auth/processo-permissions";
import { listParticipantes } from "@/features/observations/queries";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";
import ParticipantesClient from "./client";

export default async function ParticipantesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const processo = await getProcesso(id);
  if (!processo) notFound();

  const [participantes, { canEdit }] = await Promise.all([
    listParticipantes(id),
    getProcessoPermissions(id),
  ]);
  const consentidos = participantes.filter((p) => p.consentimento_lgpd).length;
  const pendentes = participantes.length - consentidos;

  return (
    <div className="flex flex-col gap-6">
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={240}
          opacity={0.3}
          seed={13}
          color="hsl(var(--fcinco-teal))"
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
              etapa 03 de 06
            </div>
            <h1 className="mt-1 font-hand text-4xl leading-tight">
              Participantes da pesquisa
            </h1>
            <SketchUnderline width={220} variant="long" color="hsl(var(--accent))" />
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Cada participante é registrado por código curto (<strong>P01</strong>, <strong>P02</strong>…) — sem nome, CPF, e-mail ou telefone. O perfil sociodemográfico é mínimo e o consentimento <strong>LGPD</strong> é obrigatório para iniciar a jornada individual.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <StatusPill tone="em_progresso">
              {participantes.length} cadastrados
            </StatusPill>
            <StatusPill tone="validada">{consentidos} LGPD ok</StatusPill>
            {pendentes > 0 && (
              <StatusPill tone="pendente">{pendentes} sem consentimento</StatusPill>
            )}
            {!canEdit && <StatusPill tone="pendente">somente leitura</StatusPill>}
          </div>
        </div>
      </header>

      <div className="flex justify-end">
        <Link href={`/processos/${id}/observacoes`}>
          <StatusPill tone="print">planejar observações</StatusPill>
        </Link>
      </div>

      <ParticipantesClient
        processoId={id}
        participantes={participantes}
        canEdit={canEdit}
      />
    </div>
  );
}

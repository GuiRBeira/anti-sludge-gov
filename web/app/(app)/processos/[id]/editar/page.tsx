import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import { listOrgaos, listMyOrgaos } from "@/lib/db/orgs";
import { getSessionOrRedirect } from "@/lib/auth/session";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";
import { StatusPill } from "@/components/fcinco/status-pill";
import EditarProcessoMetaForm from "./form";

/**
 * Edição da metadata do processo (nome + órgão). Só admin global ou gestor
 * do órgão atual chegam aqui — analista ou visitante são bloqueados (e o
 * link da tela do hub também não aparece pra eles).
 */
export default async function EditarProcessoMetaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSessionOrRedirect();
  const processo = await getProcesso(id);
  if (!processo) notFound();

  const isAdmin = session.profile.papel_global === "admin";
  const meusOrgaos = isAdmin ? null : await listMyOrgaos();
  const ehGestorDoOrgaoAtual =
    isAdmin ||
    !!meusOrgaos?.some(
      (m) => m.orgao_id === processo.orgao_id && m.papel_no_orgao === "gestor",
    );

  if (!ehGestorDoOrgaoAtual) {
    // Não tem direito — volta pro hub do processo. Mensagem fica implícita.
    redirect(`/processos/${id}`);
  }

  // Para admin: pode mover pra qualquer órgão. Para gestor: só pode mover
  // pra órgãos onde ele também é gestor.
  const orgaosDestino = isAdmin
    ? await listOrgaos()
    : (meusOrgaos ?? [])
        .filter((m) => m.papel_no_orgao === "gestor")
        .map((m) => m.orgao);

  return (
    <div className="flex max-w-2xl flex-col gap-6 pb-12">
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={220}
          rotation={-12}
          opacity={0.28}
          seed={29}
          color="hsl(var(--accent))"
        />
        <div className="relative">
          <Link
            href={`/processos/${id}`}
            className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            ← {processo.nome}
          </Link>
          <div className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            processo · metadata
          </div>

          <h1 className="mt-1 font-hand text-4xl leading-tight">
            Editar metadata
          </h1>
          <SketchUnderline width={170} variant="long" color="hsl(var(--accent))" />
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Nome do processo e <strong>órgão responsável</strong>. As 7 etapas
            metodológicas continuam intactas — só a identificação muda.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {isAdmin ? (
              <StatusPill tone="validada">admin · pode mover</StatusPill>
            ) : (
              <StatusPill tone="em_progresso">gestor do órgão atual</StatusPill>
            )}
          </div>
        </div>
      </header>

      <EditarProcessoMetaForm
        processoId={id}
        initial={processo}
        orgaos={orgaosDestino}
      />
    </div>
  );
}

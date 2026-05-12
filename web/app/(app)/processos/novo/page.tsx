import { getSessionOrRedirect } from "@/lib/auth/session";
import { listOrgaos } from "@/lib/db/orgs";
import { listMyOrgaos } from "@/lib/db/orgs";
import { EmptyState } from "@/components/fcinco/empty-state";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";
import NovoProcessoForm from "./form";

export default async function NovoProcessoPage() {
  const session = await getSessionOrRedirect();
  const orgaos =
    session.profile.papel_global === "admin"
      ? await listOrgaos()
      : (await listMyOrgaos())
          .filter((m) => m.papel_no_orgao === "gestor")
          .map((m) => m.orgao);

  return (
    <div className="max-w-xl flex flex-col gap-6">
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={220}
          opacity={0.28}
          seed={23}
        />
        <div className="relative">
          <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            processo · cadastro
          </div>
          <h1 className="mt-1 font-hand text-4xl leading-tight">Novo processo</h1>
          <SketchUnderline width={170} variant="long" color="hsl(var(--accent))" />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Cadastre um serviço público para análise. Você precisa ter
            permissão de gestor no órgão ou papel admin.
          </p>
          <div className="mt-3">
            <StatusPill tone={orgaos.length > 0 ? "em_progresso" : "pendente"}>
              {orgaos.length} órgãos disponíveis
            </StatusPill>
          </div>
        </div>
      </header>

      {orgaos.length === 0 ? (
        <EmptyState
          title="Nenhum órgão disponível"
          description="Peça ao admin para adicionar você como gestor de um órgão antes de criar processos."
        />
      ) : (
        <NovoProcessoForm orgaos={orgaos} />
      )}
    </div>
  );
}

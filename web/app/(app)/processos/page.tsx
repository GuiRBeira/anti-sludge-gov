import { listProcessos } from "@/lib/db/processes";
import { getSessionOrRedirect } from "@/lib/auth/session";
import { listMyOrgaos } from "@/lib/db/orgs";
import ProcessosDashboard, {
  type ProcessoDashboardItem,
} from "./processos-dashboard";

const CAMPOS_CONTEXTO = [
  "objetivo",
  "abrangencia",
  "publico_alvo",
  "perfil_foco",
  "indicadores_satisfacao",
  "hipoteses",
] as const;

export default async function ProcessosPage() {
  const [session, processos, meusOrgaos] = await Promise.all([
    getSessionOrRedirect(),
    listProcessos(),
    listMyOrgaos(),
  ]);
  const canCreateProcess =
    session.profile.papel_global === "admin" ||
    meusOrgaos.some((m) => m.papel_no_orgao === "gestor");

  const items: ProcessoDashboardItem[] = processos.map((p) => {
    const contextoPreenchido = CAMPOS_CONTEXTO.filter((campo) => {
      const valor = p[campo];
      return typeof valor === "string" && valor.trim().length > 0;
    }).length;

    return {
      id: p.id,
      nome: p.nome,
      objetivo: p.objetivo,
      publicoAlvo: p.publico_alvo,
      orgaoSigla: p.orgao?.sigla ?? "Sem órgão",
      orgaoNome: p.orgao?.nome ?? null,
      esfera: p.orgao?.esfera ?? "não informada",
      contextoPreenchido,
      contextoTotal: CAMPOS_CONTEXTO.length,
      createdAt: p.created_at,
    };
  });

  return (
    <ProcessosDashboard
      processos={items}
      canCreateProcess={canCreateProcess}
      role={session.profile.papel_global}
    />
  );
}

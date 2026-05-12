import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import { getSessionOrRedirect } from "@/lib/auth/session";
import {
  atualizarPapelGlobal,
  atribuirProcessoVisitante,
  definirMembroOrgao,
  removerMembroOrgao,
  removerPermissaoProcesso,
} from "@/features/orgs/actions";
import { Button } from "@/components/ui/button";
import { NumeroEtapa } from "@/components/fcinco/numero-etapa";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";
import type {
  MembroOrgao,
  Orgao,
  PapelGlobal,
  PapelNoOrgao,
  Processo,
  ProcessoPermissao,
  Profile,
} from "@/types/database";

type MembroComOrgao = MembroOrgao & {
  orgao: Pick<Orgao, "sigla" | "nome" | "esfera"> | null;
};

type ProcessoComOrgao = Pick<Processo, "id" | "nome" | "orgao_id"> & {
  orgao: Pick<Orgao, "sigla" | "nome"> | null;
};

type PermissaoComProcesso = ProcessoPermissao & {
  processo: ProcessoComOrgao | null;
};

const papelGlobalLabels: Record<PapelGlobal, string> = {
  admin: "Admin",
  gestor: "Gestor",
  analista: "Analista",
  visitante: "Visitante",
};

const papelOrgaoLabels: Record<PapelNoOrgao, string> = {
  gestor: "Gestor do órgão",
  analista: "Analista do órgão",
};

export default async function UsuariosAdminPage() {
  const session = await getSessionOrRedirect();
  const isAdmin = session.profile.papel_global === "admin";
  const isGestor = session.profile.papel_global === "gestor";
  if (!isAdmin && !isGestor) redirect("/processos");

  const supabase = await createClient();
  const [
    { data: profilesRaw },
    { data: orgaosRaw },
    { data: membrosRaw },
    { data: processosRaw },
    { data: permissoesRaw },
  ] = await Promise.all([
    supabase.from("profile").select("*").order("created_at", { ascending: false }),
    supabase.from("orgao").select("*").order("sigla", { ascending: true }),
    supabase
      .from("membro_orgao")
      .select("*, orgao:orgao_id (sigla, nome, esfera)")
      .order("created_at", { ascending: false }),
    supabase
      .from("processo")
      .select("id, nome, orgao_id, orgao:orgao_id (sigla, nome)")
      .eq("arquivado", false)
      .order("nome", { ascending: true }),
    supabase
      .from("processo_permissao")
      .select("*, processo:processo_id (id, nome, orgao_id, orgao:orgao_id (sigla, nome))")
      .order("created_at", { ascending: false }),
  ]);

  const profiles = (profilesRaw ?? []) as Profile[];
  const orgaos = (orgaosRaw ?? []) as Orgao[];
  const membros = (membrosRaw ?? []) as unknown as MembroComOrgao[];
  const processos = (processosRaw ?? []) as unknown as ProcessoComOrgao[];
  const permissoes = (permissoesRaw ?? []) as unknown as PermissaoComProcesso[];
  const orgaosGeridos = new Set(
    membros
      .filter((m) => m.profile_id === session.userId && m.papel_no_orgao === "gestor")
      .map((m) => m.orgao_id),
  );
  const orgaosDisponiveis = isAdmin
    ? orgaos
    : orgaos.filter((orgao) => orgaosGeridos.has(orgao.id));
  const processosDisponiveis = isAdmin
    ? processos
    : processos.filter((processo) => orgaosGeridos.has(processo.orgao_id));
  const membrosVisiveis = isAdmin
    ? membros
    : membros.filter((membro) => orgaosGeridos.has(membro.orgao_id));
  const permissoesVisiveis = isAdmin
    ? permissoes
    : permissoes.filter((permissao) =>
        permissao.processo ? orgaosGeridos.has(permissao.processo.orgao_id) : false,
      );

  const membrosPorProfile = groupBy(membrosVisiveis, (m) => m.profile_id);
  const permissoesPorProfile = groupBy(permissoesVisiveis, (p) => p.profile_id);
  const counts = {
    admin: profiles.filter((p) => p.papel_global === "admin").length,
    gestor: profiles.filter((p) => p.papel_global === "gestor").length,
    analista: profiles.filter((p) => p.papel_global === "analista").length,
    visitante: profiles.filter((p) => p.papel_global === "visitante").length,
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={280}
          opacity={0.32}
          seed={72}
          color="hsl(var(--primary))"
        />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 font-mono text-xs uppercase text-muted-foreground">
              {isAdmin
                ? "Administração · funções e escopos"
                : "Gestão do órgão · analistas"}
            </div>
            <h1 className="text-3xl font-semibold leading-tight">
              {isAdmin ? "Usuários e acessos" : "Equipe do órgão"}
            </h1>
            <SketchUnderline width={150} variant="short" color="hsl(var(--primary))" />
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              {isAdmin
                ? "Defina o papel global, os vínculos por órgão e quais processos visitantes podem visualizar. Visitantes sempre entram em modo leitura para processos atribuídos."
                : "Vincule analistas aos órgãos em que você é gestor. Atribuição de visitantes e promoção de papéis globais continuam restritas ao admin."}
            </p>
          </div>
          {isAdmin ? (
            <div className="grid grid-cols-4 gap-3 text-right">
              {(["admin", "gestor", "analista", "visitante"] as PapelGlobal[]).map(
                (papel) => (
                  <div key={papel}>
                    <div className="font-display text-3xl leading-none">
                      {counts[papel]}
                    </div>
                    <div className="font-mono text-[10px] uppercase text-muted-foreground">
                      {papel}
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 text-right">
              <div>
                <div className="font-display text-3xl leading-none">
                  {orgaosDisponiveis.length}
                </div>
                <div className="font-mono text-[10px] uppercase text-muted-foreground">
                  órgãos geridos
                </div>
              </div>
              <div>
                <div className="font-display text-3xl leading-none">
                  {membrosVisiveis.filter((m) => m.papel_no_orgao === "analista").length}
                </div>
                <div className="font-mono text-[10px] uppercase text-muted-foreground">
                  analistas
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {isAdmin ? (
        <section className="grid gap-3 lg:grid-cols-4">
          <RoleRule
            number={1}
            title="Admin"
            text="Acesso total, todos os processos, usuários, órgãos e dashboards."
            tone="validada"
          />
          <RoleRule
            number={2}
            title="Gestor"
            text="Gerencia processos do órgão e pode definir analistas no escopo."
            tone="em_progresso"
          />
          <RoleRule
            number={3}
            title="Analista"
            text="Preenche informações e jornadas, sem criar ou apagar processos."
            tone="print"
          />
          <RoleRule
            number={4}
            title="Visitante"
            text="Visualiza somente processos atribuídos pelo admin."
            tone="pendente"
          />
        </section>
      ) : (
        <section className="grid gap-3 lg:grid-cols-3">
          <RoleRule
            number={1}
            title="Gestor"
            text="Cria, edita e arquiva processos dos órgãos que gerencia."
            tone="em_progresso"
          />
          <RoleRule
            number={2}
            title="Analista"
            text="Recebe vínculo no órgão e preenche contexto, jornadas e questionários."
            tone="print"
          />
          <RoleRule
            number={3}
            title="Visitante"
            text="Atribuição de leitura por processo fica com o admin."
            tone="pendente"
          />
        </section>
      )}

      <section className="grid gap-4">
        {profiles.map((profile) => (
          <article key={profile.id} className="rounded-lg border bg-card p-4">
            <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
              <div>
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent font-mono text-xs font-semibold text-accent-foreground">
                    {(profile.nome_completo ?? "US").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold">
                      {profile.nome_completo ?? "Usuário sem nome"}
                    </h2>
                    <p className="truncate font-mono text-[11px] text-muted-foreground">
                      {profile.id}
                    </p>
                    <div className="mt-2">
                      <StatusPill tone={profile.papel_global === "admin" ? "validada" : "em_progresso"}>
                        {papelGlobalLabels[profile.papel_global]}
                      </StatusPill>
                    </div>
                  </div>
                </div>

                {isAdmin ? (
                  <form action={atualizarPapelGlobal} className="mt-4 flex gap-2">
                    <input type="hidden" name="profile_id" value={profile.id} />
                    <select
                      name="papel_global"
                      defaultValue={profile.papel_global}
                      className="h-9 min-w-0 flex-1 rounded-md border bg-background px-2 text-sm"
                    >
                      {(["admin", "gestor", "analista", "visitante"] as PapelGlobal[]).map(
                        (papel) => (
                          <option key={papel} value={papel}>
                            {papelGlobalLabels[papel]}
                          </option>
                        ),
                      )}
                    </select>
                    <Button type="submit" size="sm">
                      Salvar
                    </Button>
                  </form>
                ) : (
                  <p className="mt-4 rounded-md border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                    Gestores vinculam analistas ao órgão. Mudança de papel
                    global é feita pelo admin.
                  </p>
                )}
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <AccessPanel title="Órgãos e função">
                  <div className="flex flex-col gap-2">
                    {(membrosPorProfile.get(profile.id) ?? []).map((membro) => (
                      <div
                        key={membro.id}
                        className="flex items-center justify-between gap-2 rounded-md border bg-background p-2"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">
                            {membro.orgao?.sigla ?? "Órgão"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {papelOrgaoLabels[membro.papel_no_orgao]}
                          </div>
                        </div>
                        <form action={removerMembroOrgao}>
                          <input type="hidden" name="membro_id" value={membro.id} />
                          <Button type="submit" variant="outline" size="sm">
                            Remover
                          </Button>
                        </form>
                      </div>
                    ))}
                    <form action={definirMembroOrgao} className="grid gap-2 sm:grid-cols-[1fr_130px_auto]">
                      <input type="hidden" name="profile_id" value={profile.id} />
                      <select
                        name="orgao_id"
                        className="h-9 rounded-md border bg-background px-2 text-sm"
                        required
                      >
                        <option value="">Selecionar órgão</option>
                        {orgaosDisponiveis.map((orgao) => (
                          <option key={orgao.id} value={orgao.id}>
                            {orgao.sigla} · {orgao.nome}
                          </option>
                        ))}
                      </select>
                      <select
                        name="papel_no_orgao"
                        className="h-9 rounded-md border bg-background px-2 text-sm"
                        defaultValue="analista"
                      >
                        <option value="analista">Analista</option>
                        {isAdmin && <option value="gestor">Gestor</option>}
                      </select>
                      <Button type="submit" size="sm">
                        Vincular
                      </Button>
                    </form>
                  </div>
                </AccessPanel>

                {isAdmin ? (
                  <AccessPanel title="Processos visíveis ao visitante">
                    <div className="flex flex-col gap-2">
                      {(permissoesPorProfile.get(profile.id) ?? []).map((permissao) => (
                        <div
                          key={permissao.id}
                          className="flex items-center justify-between gap-2 rounded-md border bg-background p-2"
                        >
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium">
                              {permissao.processo?.nome ?? "Processo"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {permissao.processo?.orgao?.sigla ?? "órgão"} · leitura
                            </div>
                          </div>
                          <form action={removerPermissaoProcesso}>
                            <input
                              type="hidden"
                              name="permissao_id"
                              value={permissao.id}
                            />
                            <Button type="submit" variant="outline" size="sm">
                              Remover
                            </Button>
                          </form>
                        </div>
                      ))}
                      <form action={atribuirProcessoVisitante} className="grid gap-2 sm:grid-cols-[1fr_auto]">
                        <input type="hidden" name="profile_id" value={profile.id} />
                        <select
                          name="processo_id"
                          className="h-9 rounded-md border bg-background px-2 text-sm"
                          required
                        >
                          <option value="">Selecionar processo</option>
                          {processosDisponiveis.map((processo) => (
                            <option key={processo.id} value={processo.id}>
                              {processo.orgao?.sigla ?? "Órgão"} · {processo.nome}
                            </option>
                          ))}
                        </select>
                        <Button type="submit" size="sm">
                          Atribuir
                        </Button>
                      </form>
                    </div>
                  </AccessPanel>
                ) : (
                  <AccessPanel title="Escopo do gestor">
                    <p className="text-sm leading-6 text-muted-foreground">
                      Você pode vincular e remover analistas dos órgãos em que é
                      gestor. Visitantes e papéis globais permanecem sob
                      responsabilidade do admin.
                    </p>
                  </AccessPanel>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function RoleRule({
  number,
  title,
  text,
  tone,
}: {
  number: number;
  title: string;
  text: string;
  tone: "validada" | "em_progresso" | "print" | "pendente";
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-3 flex items-center gap-3">
        <NumeroEtapa value={number} size={36} tilt={number % 2 ? -3 : 3} />
        <StatusPill tone={tone}>{title}</StatusPill>
      </div>
      <p className="text-sm leading-5 text-muted-foreground">{text}</p>
    </div>
  );
}

function AccessPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-md border bg-muted/20 p-3">
      <h3 className="mb-3 font-mono text-[11px] uppercase text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}

function groupBy<T>(items: T[], getKey: (item: T) => string) {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = getKey(item);
    map.set(key, [...(map.get(key) ?? []), item]);
  }
  return map;
}

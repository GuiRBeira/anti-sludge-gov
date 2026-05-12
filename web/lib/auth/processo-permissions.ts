import { createClient } from "@/lib/supabase/server";

export type ProcessoPermissions = {
  canRead: boolean;
  canEdit: boolean;
  canAdmin: boolean;
};

/**
 * Resolve as três autorizações de um processo para o usuário corrente
 * chamando as funções SECURITY DEFINER do Postgres (definidas em 0007).
 * Espelha exatamente a regra que está nas policies RLS — usar isto antes
 * de qualquer escrita evita que uma UPDATE filtrada por RLS retorne
 * silenciosamente "0 linhas afetadas" enquanto a UI exibe "salvo".
 */
export async function getProcessoPermissions(
  processoId: string,
): Promise<ProcessoPermissions> {
  const supabase = await createClient();
  const [readRes, editRes, adminRes] = await Promise.all([
    supabase.rpc("app_can_read_processo", { p_processo_id: processoId }),
    supabase.rpc("app_can_edit_processo", { p_processo_id: processoId }),
    supabase.rpc("app_can_admin_processo", { p_processo_id: processoId }),
  ]);
  return {
    canRead: !!readRes.data,
    canEdit: !!editRes.data,
    canAdmin: !!adminRes.data,
  };
}

export async function assertCanReadProcesso(processoId: string): Promise<void> {
  const { canRead } = await getProcessoPermissions(processoId);
  if (!canRead) {
    throw new Error("Sem permissão para visualizar este processo.");
  }
}

export async function assertCanEditProcesso(processoId: string): Promise<void> {
  const { canEdit } = await getProcessoPermissions(processoId);
  if (!canEdit) {
    throw new Error(
      "Sem permissão para editar este processo. Visitantes têm acesso somente leitura.",
    );
  }
}

export async function assertCanAdminProcesso(
  processoId: string,
): Promise<void> {
  const { canAdmin } = await getProcessoPermissions(processoId);
  if (!canAdmin) {
    throw new Error("Apenas admin ou gestor do órgão pode executar esta ação.");
  }
}

-- 0009_rbac_visitante_readonly.sql
-- Ajusta a regra de visitante para leitura pura: permissões por processo
-- dão visibilidade, mas nunca edição.

update public.processo_permissao
set pode_editar = false
where pode_editar = true;

create or replace function public.app_can_edit_processo(p_processo_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.app_is_admin()
    or exists (
      select 1
      from public.processo p
      join public.membro_orgao m on m.orgao_id = p.orgao_id
      where p.id = p_processo_id
        and m.profile_id = auth.uid()
        and m.papel_no_orgao in ('gestor', 'analista')
    );
$$;

drop policy if exists ppermissao_admin_all on public.processo_permissao;
create policy ppermissao_admin_all on public.processo_permissao
  for all to authenticated
  using (public.app_can_admin_processo(processo_id))
  with check (
    public.app_can_admin_processo(processo_id)
    and pode_editar = false
  );

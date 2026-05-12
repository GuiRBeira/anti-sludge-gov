-- 0010_onboarding_gestor_team_rbac.sql
-- Ajustes do MVP v1 para onboarding e gestão por papel:
-- - gestor com órgão consegue localizar perfis não-admin para vincular analistas;
-- - atribuição de visitante a processo fica restrita ao admin.

create or replace function public.app_is_gestor_any()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.membro_orgao
    where profile_id = auth.uid()
      and papel_no_orgao = 'gestor'
  );
$$;

drop policy if exists profile_select on public.profile;
create policy profile_select on public.profile
  for select to authenticated
  using (
    id = auth.uid()
    or public.app_is_admin()
    or (
      papel_global <> 'admin'
      and public.app_is_gestor_any()
    )
  );

drop policy if exists ppermissao_admin_all on public.processo_permissao;
create policy ppermissao_admin_all on public.processo_permissao
  for all to authenticated
  using (public.app_is_admin())
  with check (
    public.app_is_admin()
    and pode_editar = false
  );

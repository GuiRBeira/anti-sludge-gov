-- 0007_rls_policies.sql
-- Helpers de autorização e Row Level Security para todas as tabelas.
-- Estratégia em docs/04_RBAC.md.

-- ----------------------------------------------------------------------------
-- Funções helper (em schema public; podem ser chamadas de policies)
-- Definidas como SECURITY DEFINER + STABLE para serem performáticas.
-- ----------------------------------------------------------------------------

create or replace function public.app_papel_global()
returns papel_global
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select papel_global from public.profile where id = auth.uid()),
    'visitante'::papel_global
  );
$$;

create or replace function public.app_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.app_papel_global() = 'admin';
$$;

create or replace function public.app_is_member_of(p_orgao_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.membro_orgao
    where profile_id = auth.uid()
      and orgao_id = p_orgao_id
  );
$$;

create or replace function public.app_is_gestor_of(p_orgao_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.membro_orgao
    where profile_id = auth.uid()
      and orgao_id = p_orgao_id
      and papel_no_orgao = 'gestor'
  );
$$;

create or replace function public.app_can_read_processo(p_processo_id uuid)
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
      where p.id = p_processo_id and m.profile_id = auth.uid()
    )
    or exists (
      select 1 from public.processo_permissao
      where processo_id = p_processo_id and profile_id = auth.uid()
    );
$$;

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
    )
    or exists (
      select 1 from public.processo_permissao
      where processo_id = p_processo_id
        and profile_id = auth.uid()
        and pode_editar = true
    );
$$;

create or replace function public.app_can_admin_processo(p_processo_id uuid)
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
        and m.papel_no_orgao = 'gestor'
    );
$$;

-- ----------------------------------------------------------------------------
-- profile
-- ----------------------------------------------------------------------------

drop policy if exists profile_select on public.profile;
create policy profile_select on public.profile
  for select to authenticated
  using (
    id = auth.uid()
    or public.app_is_admin()
  );

drop policy if exists profile_update_self on public.profile;
create policy profile_update_self on public.profile
  for update to authenticated
  using (id = auth.uid())
  with check (
    id = auth.uid()
    -- usuário comum não pode promover a si mesmo a admin
    and (papel_global = (select papel_global from public.profile where id = auth.uid()))
  );

drop policy if exists profile_update_admin on public.profile;
create policy profile_update_admin on public.profile
  for update to authenticated
  using (public.app_is_admin())
  with check (public.app_is_admin());

-- ----------------------------------------------------------------------------
-- orgao
-- ----------------------------------------------------------------------------

drop policy if exists orgao_select on public.orgao;
create policy orgao_select on public.orgao
  for select to authenticated
  using (
    public.app_is_admin()
    or public.app_is_member_of(id)
    or exists (
      select 1 from public.processo p
      join public.processo_permissao pp on pp.processo_id = p.id
      where p.orgao_id = orgao.id and pp.profile_id = auth.uid()
    )
  );

drop policy if exists orgao_admin_all on public.orgao;
create policy orgao_admin_all on public.orgao
  for all to authenticated
  using (public.app_is_admin())
  with check (public.app_is_admin());

-- ----------------------------------------------------------------------------
-- membro_orgao
-- ----------------------------------------------------------------------------

drop policy if exists membro_select on public.membro_orgao;
create policy membro_select on public.membro_orgao
  for select to authenticated
  using (
    profile_id = auth.uid()
    or public.app_is_admin()
    or public.app_is_gestor_of(orgao_id)
  );

drop policy if exists membro_admin_all on public.membro_orgao;
create policy membro_admin_all on public.membro_orgao
  for all to authenticated
  using (public.app_is_admin())
  with check (public.app_is_admin());

drop policy if exists membro_gestor_manage on public.membro_orgao;
create policy membro_gestor_manage on public.membro_orgao
  for all to authenticated
  using (public.app_is_gestor_of(orgao_id))
  with check (
    public.app_is_gestor_of(orgao_id)
    -- Gestor só gerencia analistas (não outros gestores nem admins).
    and papel_no_orgao = 'analista'
  );

-- ----------------------------------------------------------------------------
-- catálogo (read aberto a autenticados; escrita só admin)
-- ----------------------------------------------------------------------------

do $$
declare
  t text;
begin
  for t in
    select unnest(array[
      'categoria','tipo_comportamento','criterio_template','escala_avaliacao',
      'tipo_criterio','grupo_analise','grupo_analise_criterio','glossario'
    ])
  loop
    execute format('drop policy if exists %I_read on public.%I;', t, t);
    execute format(
      'create policy %I_read on public.%I for select to authenticated using (true);',
      t, t
    );
    execute format('drop policy if exists %I_admin_all on public.%I;', t, t);
    execute format(
      'create policy %I_admin_all on public.%I for all to authenticated
         using (public.app_is_admin()) with check (public.app_is_admin());',
      t, t
    );
  end loop;
end $$;

-- ----------------------------------------------------------------------------
-- processo
-- ----------------------------------------------------------------------------

drop policy if exists processo_select on public.processo;
create policy processo_select on public.processo
  for select to authenticated
  using (public.app_can_read_processo(id));

drop policy if exists processo_insert on public.processo;
create policy processo_insert on public.processo
  for insert to authenticated
  with check (
    public.app_is_admin()
    or public.app_is_gestor_of(orgao_id)
  );

drop policy if exists processo_update on public.processo;
create policy processo_update on public.processo
  for update to authenticated
  using (public.app_can_edit_processo(id))
  with check (public.app_can_edit_processo(id));

drop policy if exists processo_delete on public.processo;
create policy processo_delete on public.processo
  for delete to authenticated
  using (public.app_can_admin_processo(id));

-- ----------------------------------------------------------------------------
-- processo_permissao
-- ----------------------------------------------------------------------------

drop policy if exists ppermissao_select on public.processo_permissao;
create policy ppermissao_select on public.processo_permissao
  for select to authenticated
  using (
    profile_id = auth.uid()
    or public.app_can_admin_processo(processo_id)
  );

drop policy if exists ppermissao_admin_all on public.processo_permissao;
create policy ppermissao_admin_all on public.processo_permissao
  for all to authenticated
  using (public.app_can_admin_processo(processo_id))
  with check (public.app_can_admin_processo(processo_id));

-- ----------------------------------------------------------------------------
-- Tabelas filhas de processo: participante, protocolo, jornada, passo_jornada,
-- entrevista, questionario_resposta, resposta_item, resultado_analise.
-- Padrão: read se can_read, write se can_edit.
-- ----------------------------------------------------------------------------

-- participante
drop policy if exists participante_select on public.participante;
create policy participante_select on public.participante
  for select to authenticated
  using (public.app_can_read_processo(processo_id));
drop policy if exists participante_write on public.participante;
create policy participante_write on public.participante
  for all to authenticated
  using (public.app_can_edit_processo(processo_id))
  with check (public.app_can_edit_processo(processo_id));

-- protocolo_observacao
drop policy if exists protocolo_select on public.protocolo_observacao;
create policy protocolo_select on public.protocolo_observacao
  for select to authenticated
  using (public.app_can_read_processo(processo_id));
drop policy if exists protocolo_write on public.protocolo_observacao;
create policy protocolo_write on public.protocolo_observacao
  for all to authenticated
  using (public.app_can_edit_processo(processo_id))
  with check (public.app_can_edit_processo(processo_id));

-- jornada
drop policy if exists jornada_select on public.jornada;
create policy jornada_select on public.jornada
  for select to authenticated
  using (public.app_can_read_processo(processo_id));
drop policy if exists jornada_write on public.jornada;
create policy jornada_write on public.jornada
  for all to authenticated
  using (public.app_can_edit_processo(processo_id))
  with check (public.app_can_edit_processo(processo_id));

-- passo_jornada (deriva processo_id via jornada)
drop policy if exists passo_select on public.passo_jornada;
create policy passo_select on public.passo_jornada
  for select to authenticated
  using (
    exists (
      select 1 from public.jornada j
      where j.id = passo_jornada.jornada_id
        and public.app_can_read_processo(j.processo_id)
    )
  );
drop policy if exists passo_write on public.passo_jornada;
create policy passo_write on public.passo_jornada
  for all to authenticated
  using (
    exists (
      select 1 from public.jornada j
      where j.id = passo_jornada.jornada_id
        and public.app_can_edit_processo(j.processo_id)
    )
  )
  with check (
    exists (
      select 1 from public.jornada j
      where j.id = passo_jornada.jornada_id
        and public.app_can_edit_processo(j.processo_id)
    )
  );

-- entrevista_pos_observacao (deriva via protocolo)
drop policy if exists entrevista_select on public.entrevista_pos_observacao;
create policy entrevista_select on public.entrevista_pos_observacao
  for select to authenticated
  using (
    exists (
      select 1 from public.protocolo_observacao p
      where p.id = entrevista_pos_observacao.protocolo_id
        and public.app_can_read_processo(p.processo_id)
    )
  );
drop policy if exists entrevista_write on public.entrevista_pos_observacao;
create policy entrevista_write on public.entrevista_pos_observacao
  for all to authenticated
  using (
    exists (
      select 1 from public.protocolo_observacao p
      where p.id = entrevista_pos_observacao.protocolo_id
        and public.app_can_edit_processo(p.processo_id)
    )
  )
  with check (
    exists (
      select 1 from public.protocolo_observacao p
      where p.id = entrevista_pos_observacao.protocolo_id
        and public.app_can_edit_processo(p.processo_id)
    )
  );

-- questionario_template (read aberto a autenticados; escrita só admin)
drop policy if exists qtemplate_read on public.questionario_template;
create policy qtemplate_read on public.questionario_template
  for select to authenticated using (true);
drop policy if exists qtemplate_admin on public.questionario_template;
create policy qtemplate_admin on public.questionario_template
  for all to authenticated
  using (public.app_is_admin()) with check (public.app_is_admin());

drop policy if exists ptemplate_read on public.pergunta_template;
create policy ptemplate_read on public.pergunta_template
  for select to authenticated using (true);
drop policy if exists ptemplate_admin on public.pergunta_template;
create policy ptemplate_admin on public.pergunta_template
  for all to authenticated
  using (public.app_is_admin()) with check (public.app_is_admin());

-- questionario_resposta (deriva via jornada)
drop policy if exists qresp_select on public.questionario_resposta;
create policy qresp_select on public.questionario_resposta
  for select to authenticated
  using (
    exists (
      select 1 from public.jornada j
      where j.id = questionario_resposta.jornada_id
        and public.app_can_read_processo(j.processo_id)
    )
  );
drop policy if exists qresp_write on public.questionario_resposta;
create policy qresp_write on public.questionario_resposta
  for all to authenticated
  using (
    exists (
      select 1 from public.jornada j
      where j.id = questionario_resposta.jornada_id
        and public.app_can_edit_processo(j.processo_id)
    )
  )
  with check (
    exists (
      select 1 from public.jornada j
      where j.id = questionario_resposta.jornada_id
        and public.app_can_edit_processo(j.processo_id)
    )
  );

-- resposta_item (deriva via questionario_resposta → jornada)
drop policy if exists ritem_select on public.resposta_item;
create policy ritem_select on public.resposta_item
  for select to authenticated
  using (
    exists (
      select 1 from public.questionario_resposta qr
      join public.jornada j on j.id = qr.jornada_id
      where qr.id = resposta_item.questionario_resposta_id
        and public.app_can_read_processo(j.processo_id)
    )
  );
drop policy if exists ritem_write on public.resposta_item;
create policy ritem_write on public.resposta_item
  for all to authenticated
  using (
    exists (
      select 1 from public.questionario_resposta qr
      join public.jornada j on j.id = qr.jornada_id
      where qr.id = resposta_item.questionario_resposta_id
        and public.app_can_edit_processo(j.processo_id)
    )
  )
  with check (
    exists (
      select 1 from public.questionario_resposta qr
      join public.jornada j on j.id = qr.jornada_id
      where qr.id = resposta_item.questionario_resposta_id
        and public.app_can_edit_processo(j.processo_id)
    )
  );

-- resultado_analise
drop policy if exists resultado_select on public.resultado_analise;
create policy resultado_select on public.resultado_analise
  for select to authenticated
  using (public.app_can_read_processo(processo_id));
drop policy if exists resultado_write on public.resultado_analise;
create policy resultado_write on public.resultado_analise
  for all to authenticated
  using (public.app_can_edit_processo(processo_id))
  with check (public.app_can_edit_processo(processo_id));

-- log_auditoria (apenas admin lê; insert via Server Action com service role ou
-- dentro do escopo do próprio usuário).
drop policy if exists log_admin_select on public.log_auditoria;
create policy log_admin_select on public.log_auditoria
  for select to authenticated
  using (public.app_is_admin());
drop policy if exists log_self_insert on public.log_auditoria;
create policy log_self_insert on public.log_auditoria
  for insert to authenticated
  with check (actor_id = auth.uid() or public.app_is_admin());

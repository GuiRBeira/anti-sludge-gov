-- 0012_beta_feedback.sql
-- Canal operacional do MVP v1 beta para testers reportarem bugs,
-- inconsistencias, sugestoes e falta de recursos.
--
-- A tabela e permanente para preservar historico durante o piloto, mas o
-- escopo e temporario/operacional da versao beta. A leitura fica restrita ao
-- admin responsavel pelo piloto: pedrolucas@alunos.utfpr.edu.br.

create table if not exists public.beta_feedback (
  id            uuid primary key default uuid_generate_v4(),
  created_at    timestamptz not null default now(),
  created_by    uuid references public.profile(id) on delete set null,
  user_email    text,
  user_name     text,
  page_path     text,
  user_agent    text,
  kind          text not null default 'bug'
    check (kind in ('bug', 'inconsistencia', 'sugestao', 'falta_recurso', 'outro')),
  severity      text not null default 'media'
    check (severity in ('baixa', 'media', 'alta', 'bloqueante')),
  title         text not null
    check (char_length(trim(title)) > 0 and char_length(title) <= 160),
  description   text not null
    check (char_length(trim(description)) > 0 and char_length(description) <= 4000),
  status        text not null default 'novo'
    check (status in ('novo', 'em_analise', 'resolvido', 'ignorado')),
  admin_notes   text
);

comment on table public.beta_feedback is
  'Canal temporario/operacional do MVP v1 beta para feedback de testers.';

create index if not exists idx_beta_feedback_created_at
  on public.beta_feedback(created_at desc);

create index if not exists idx_beta_feedback_status
  on public.beta_feedback(status, created_at desc);

create index if not exists idx_beta_feedback_created_by
  on public.beta_feedback(created_by);

alter table public.beta_feedback enable row level security;

create or replace function public.app_is_beta_feedback_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select lower(coalesce(auth.jwt()->>'email', '')) = 'pedrolucas@alunos.utfpr.edu.br';
$$;

drop policy if exists beta_feedback_insert_own on public.beta_feedback;
create policy beta_feedback_insert_own on public.beta_feedback
  for insert to authenticated
  with check (created_by = auth.uid());

drop policy if exists beta_feedback_select_owner on public.beta_feedback;
create policy beta_feedback_select_owner on public.beta_feedback
  for select to authenticated
  using (public.app_is_beta_feedback_owner());

drop policy if exists beta_feedback_update_owner on public.beta_feedback;
create policy beta_feedback_update_owner on public.beta_feedback
  for update to authenticated
  using (public.app_is_beta_feedback_owner())
  with check (public.app_is_beta_feedback_owner());

drop policy if exists beta_feedback_delete_owner on public.beta_feedback;
create policy beta_feedback_delete_owner on public.beta_feedback
  for delete to authenticated
  using (public.app_is_beta_feedback_owner());

grant select, insert, update, delete on public.beta_feedback to authenticated;
grant execute on function public.app_is_beta_feedback_owner() to authenticated;

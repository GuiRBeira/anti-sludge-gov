-- supabase/storage/setup_passo_screenshots.sql
-- Cria o bucket privado "passo-screenshots" e suas policies de RLS.
-- Rodar uma vez no SQL Editor do painel do Supabase.

-- 1. Bucket privado
insert into storage.buckets (id, name, public)
values ('passo-screenshots', 'passo-screenshots', false)
on conflict (id) do nothing;

-- 2. Policies de acesso
-- Usuários autenticados podem ler/criar arquivos no bucket; só podem
-- atualizar/apagar os que eles mesmos enviaram (auth.uid() = owner).
-- A descobribilidade fica protegida pela RLS de `passo_jornada` no app:
-- ninguém vê o path se não pode ler o passo.

drop policy if exists "passo_screenshots_select" on storage.objects;
create policy "passo_screenshots_select"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'passo-screenshots');

drop policy if exists "passo_screenshots_insert" on storage.objects;
create policy "passo_screenshots_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'passo-screenshots');

drop policy if exists "passo_screenshots_update_own" on storage.objects;
create policy "passo_screenshots_update_own"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'passo-screenshots' and auth.uid() = owner)
  with check (bucket_id = 'passo-screenshots' and auth.uid() = owner);

drop policy if exists "passo_screenshots_delete_own" on storage.objects;
create policy "passo_screenshots_delete_own"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'passo-screenshots' and auth.uid() = owner);

-- 0011_view_security_invoker_and_grants.sql
-- Corrige os 3 avisos críticos do Supabase Security Advisor:
--   "Security Definer View" em v_avaliacao_barreira / impacto / necessidade.
--
-- Por padrão, views em Postgres rodam como SECURITY DEFINER (com privilégios do
-- dono da view), o que faz o motor IGNORAR o RLS das tabelas subjacentes.
-- Em Postgres 15+ é possível pedir explicitamente que a view rode como o
-- usuário que faz o SELECT (security_invoker = true). Aí o RLS de
-- resposta_item / questionario_resposta / jornada / processo volta a valer
-- também quando consultadas via view — exatamente o comportamento esperado
-- para um visitante de processo X não enxergar dados do processo Y.
--
-- Também concedemos EXECUTE explícito nos helpers app_can_* para que
-- Server Actions possam chamá-los via supabase.rpc(...) com a sessão do
-- usuário (defesa em profundidade, complementando o RLS).
--
-- A passagem de GRANT é feita em um DO block que ignora funções que
-- ainda não existem (caso 0010 não tenha sido aplicada ainda no banco
-- onde rodar 0011) — assim a migration nunca falha por causa de uma
-- migration anterior pulada.

alter view public.v_avaliacao_barreira    set (security_invoker = true);
alter view public.v_avaliacao_impacto     set (security_invoker = true);
alter view public.v_avaliacao_necessidade set (security_invoker = true);

do $$
declare
  fname text;
  args  text;
begin
  for fname, args in
    values
      ('app_papel_global',        ''),
      ('app_is_admin',            ''),
      ('app_is_member_of',        'uuid'),
      ('app_is_gestor_of',        'uuid'),
      ('app_is_gestor_any',       ''),
      ('app_can_read_processo',   'uuid'),
      ('app_can_edit_processo',   'uuid'),
      ('app_can_admin_processo',  'uuid')
  loop
    if exists (
      select 1
      from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
      where n.nspname = 'public'
        and p.proname = fname
    ) then
      execute format(
        'grant execute on function public.%I(%s) to authenticated',
        fname, args
      );
    else
      raise notice
        '0011: skip grant — public.%(%) ainda não existe (rode a migration que cria essa função antes).',
        fname, args;
    end if;
  end loop;
end $$;

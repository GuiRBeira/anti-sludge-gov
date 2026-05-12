-- 0001_init_extensions_and_enums.sql
-- Extensões e tipos enumerados base do Anti-Sludge Gov.
-- Pode ser aplicada via SQL Editor do painel do Supabase ou via Supabase CLI.

-- ----------------------------------------------------------------------------
-- Extensões
-- ----------------------------------------------------------------------------

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Enums de domínio
-- Centralizar aqui evita inconsistência entre tabelas.
-- ----------------------------------------------------------------------------

do $$ begin
  create type esfera_governamental as enum ('federal', 'estadual', 'municipal');
exception when duplicate_object then null; end $$;

do $$ begin
  create type papel_global as enum ('admin', 'gestor', 'analista', 'visitante');
exception when duplicate_object then null; end $$;

do $$ begin
  create type papel_no_orgao as enum ('gestor', 'analista');
exception when duplicate_object then null; end $$;

do $$ begin
  create type tipo_jornada as enum ('planejada', 'individual', 'padrao');
exception when duplicate_object then null; end $$;

do $$ begin
  create type dimensao_criterio as enum ('barreira', 'impacto');
exception when duplicate_object then null; end $$;

do $$ begin
  create type subdimensao_impacto as enum ('necessidade', 'carga_cognitiva', 'emocao', 'consequencia');
exception when duplicate_object then null; end $$;

do $$ begin
  create type tipo_resposta as enum ('escala_1_5', 'texto', 'sim_nao', 'multipla');
exception when duplicate_object then null; end $$;

do $$ begin
  create type tipo_metrica as enum (
    'barreira_media',
    'impacto_medio',
    'sludge_index',
    'tempo_total',
    'tempo_diferenca'
  );
exception when duplicate_object then null; end $$;

-- ----------------------------------------------------------------------------
-- Função utilitária: timestamp de updated_at
-- ----------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function public.set_updated_at() is
  'Trigger BEFORE UPDATE para manter updated_at consistente.';

-- 0002_orgs_profiles_rbac.sql
-- Órgãos, perfis de usuário, vínculo usuário-órgão e permissões por processo.
-- RLS é habilitada aqui mas as policies finais ficam em 0008_rls_policies.sql.

-- ----------------------------------------------------------------------------
-- orgao
-- ----------------------------------------------------------------------------

create table if not exists public.orgao (
  id            uuid primary key default uuid_generate_v4(),
  nome          text not null unique,
  sigla         text not null unique,
  esfera        esfera_governamental not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists trg_orgao_updated_at on public.orgao;
create trigger trg_orgao_updated_at
  before update on public.orgao
  for each row execute function public.set_updated_at();

alter table public.orgao enable row level security;

-- ----------------------------------------------------------------------------
-- profile (1:1 com auth.users)
-- ----------------------------------------------------------------------------

create table if not exists public.profile (
  id            uuid primary key references auth.users(id) on delete cascade,
  nome_completo text,
  papel_global  papel_global not null default 'visitante',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists trg_profile_updated_at on public.profile;
create trigger trg_profile_updated_at
  before update on public.profile
  for each row execute function public.set_updated_at();

alter table public.profile enable row level security;

-- Auto-criar profile quando um auth.user é criado.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profile (id, nome_completo, papel_global)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nome_completo', new.email),
    'visitante'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists trg_on_auth_user_created on auth.users;
create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- membro_orgao (associação profile ↔ orgao com papel)
-- ----------------------------------------------------------------------------

create table if not exists public.membro_orgao (
  id              uuid primary key default uuid_generate_v4(),
  profile_id      uuid not null references public.profile(id) on delete cascade,
  orgao_id        uuid not null references public.orgao(id) on delete cascade,
  papel_no_orgao  papel_no_orgao not null,
  created_at      timestamptz not null default now(),
  unique(profile_id, orgao_id)
);

create index if not exists idx_membro_orgao_profile on public.membro_orgao(profile_id);
create index if not exists idx_membro_orgao_orgao on public.membro_orgao(orgao_id);

alter table public.membro_orgao enable row level security;

comment on table public.membro_orgao is
  'Associa profile a orgao com papel (gestor/analista). Um usuário pode pertencer a múltiplos órgãos com papéis distintos.';

-- 0003_catalog_f5.sql
-- Catálogo metodológico F5: categorias, tipos, critérios, escalas, glossário, grupos.
-- Os dados são populados via supabase/seed/0001_seed_catalog_f5.sql (derivados da planilha).

-- ----------------------------------------------------------------------------
-- categoria comportamental
-- ----------------------------------------------------------------------------

create table if not exists public.categoria (
  id          uuid primary key default uuid_generate_v4(),
  codigo      text not null unique,                  -- ex: BUSCA, PREP, INTER, ESCO, ESPE, OUTR
  nome        text not null,
  conceito    text,
  descricao   text,
  ordem       int not null,
  created_at  timestamptz not null default now()
);

create index if not exists idx_categoria_ordem on public.categoria(ordem);

alter table public.categoria enable row level security;

-- ----------------------------------------------------------------------------
-- tipo de comportamento (dentro de uma categoria)
-- ----------------------------------------------------------------------------

create table if not exists public.tipo_comportamento (
  id            uuid primary key default uuid_generate_v4(),
  categoria_id  uuid not null references public.categoria(id) on delete cascade,
  codigo        text not null unique,                -- ex: BUSCA_PROCURAR, PREP_PREENCHER
  nome          text not null,
  conceito      text,
  descricao     text,
  ordem         int not null,
  created_at    timestamptz not null default now(),
  unique(categoria_id, ordem)
);

create index if not exists idx_tipo_categoria on public.tipo_comportamento(categoria_id);

alter table public.tipo_comportamento enable row level security;

-- ----------------------------------------------------------------------------
-- critério (template) — barreira ou impacto
-- ----------------------------------------------------------------------------

create table if not exists public.criterio_template (
  id                      uuid primary key default uuid_generate_v4(),
  codigo                  text not null unique,
  nome                    text not null,
  dimensao                dimensao_criterio not null,
  subdimensao_impacto     subdimensao_impacto,         -- só para dimensao = 'impacto'
  conceito                text,
  pergunta_padrao         text not null,
  texto_nota_1            text,
  texto_nota_5            text,
  escala_min              int not null default 1,
  escala_max              int not null default 5,
  permite_nao_se_aplica   boolean not null default true,
  ordem                   int,
  ativo                   boolean not null default true,
  created_at              timestamptz not null default now(),
  -- consistência: subdimensao_impacto só faz sentido para dimensao='impacto'
  check (
    (dimensao = 'barreira' and subdimensao_impacto is null)
    or (dimensao = 'impacto' and subdimensao_impacto is not null)
  )
);

create index if not exists idx_criterio_dimensao on public.criterio_template(dimensao);

alter table public.criterio_template enable row level security;

-- ----------------------------------------------------------------------------
-- escala_avaliacao — texto explicativo de cada nota por critério
-- ----------------------------------------------------------------------------

create table if not exists public.escala_avaliacao (
  criterio_template_id uuid not null references public.criterio_template(id) on delete cascade,
  nota                 int not null check (nota between 1 and 5),
  descricao            text not null,
  primary key (criterio_template_id, nota)
);

alter table public.escala_avaliacao enable row level security;

-- ----------------------------------------------------------------------------
-- tipo_criterio — quais critérios se aplicam a quais tipos (#CritériosPorTipo)
-- ----------------------------------------------------------------------------

create table if not exists public.tipo_criterio (
  tipo_comportamento_id  uuid not null references public.tipo_comportamento(id) on delete cascade,
  criterio_template_id   uuid not null references public.criterio_template(id) on delete cascade,
  ordem                  int,
  primary key (tipo_comportamento_id, criterio_template_id)
);

alter table public.tipo_criterio enable row level security;

comment on table public.tipo_criterio is
  'Restringe quais critérios de barreira/impacto se aplicam a cada tipo de comportamento (planilha #CritériosPorTipo).';

-- ----------------------------------------------------------------------------
-- grupo_analise (lentes de análise — agrupam vários critérios-B)
-- ----------------------------------------------------------------------------

create table if not exists public.grupo_analise (
  id          uuid primary key default uuid_generate_v4(),
  codigo      text not null unique,
  nome        text not null,
  descricao   text,
  ordem       int,
  created_at  timestamptz not null default now()
);

create table if not exists public.grupo_analise_criterio (
  grupo_analise_id      uuid not null references public.grupo_analise(id) on delete cascade,
  criterio_template_id  uuid not null references public.criterio_template(id) on delete cascade,
  primary key (grupo_analise_id, criterio_template_id)
);

alter table public.grupo_analise enable row level security;
alter table public.grupo_analise_criterio enable row level security;

-- ----------------------------------------------------------------------------
-- glossario
-- ----------------------------------------------------------------------------

create table if not exists public.glossario (
  id          uuid primary key default uuid_generate_v4(),
  termo       text not null unique,
  definicao   text not null,
  aba_origem  text,
  created_at  timestamptz not null default now()
);

alter table public.glossario enable row level security;

-- 0005_questionnaires.sql
-- Templates de questionário, perguntas, instâncias de resposta e itens.

-- ----------------------------------------------------------------------------
-- questionario_template (versionado)
-- ----------------------------------------------------------------------------

create table if not exists public.questionario_template (
  id            uuid primary key default uuid_generate_v4(),
  codigo        text not null,
  versao        int not null default 1,
  nome          text not null,
  descricao     text,
  aplicavel_a   text not null check (aplicavel_a in ('jornada_planejada', 'jornada_individual', 'ambas')),
  dimensao      text not null check (dimensao in ('barreira', 'impacto', 'necessidade', 'contexto')),
  ativo         boolean not null default true,
  created_at    timestamptz not null default now(),
  unique(codigo, versao)
);

alter table public.questionario_template enable row level security;

-- ----------------------------------------------------------------------------
-- pergunta_template
-- ----------------------------------------------------------------------------

create table if not exists public.pergunta_template (
  id                       uuid primary key default uuid_generate_v4(),
  questionario_template_id uuid not null references public.questionario_template(id) on delete cascade,
  criterio_template_id     uuid references public.criterio_template(id) on delete set null,
  texto                    text not null,
  ordem                    int not null,
  tipo_resposta            tipo_resposta not null default 'escala_1_5',
  permite_nao_se_aplica    boolean not null default true,
  permite_observacao       boolean not null default true,
  created_at               timestamptz not null default now(),
  unique(questionario_template_id, ordem)
);

create index if not exists idx_pergunta_questionario
  on public.pergunta_template(questionario_template_id);

alter table public.pergunta_template enable row level security;

-- ----------------------------------------------------------------------------
-- questionario_resposta (instância para uma jornada)
-- ----------------------------------------------------------------------------

create table if not exists public.questionario_resposta (
  id                       uuid primary key default uuid_generate_v4(),
  questionario_template_id uuid not null references public.questionario_template(id) on delete restrict,
  jornada_id               uuid not null references public.jornada(id) on delete cascade,
  respondente_id           uuid references public.profile(id) on delete set null,
  data_resposta            timestamptz not null default now(),
  concluido                boolean not null default false,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now(),
  unique(questionario_template_id, jornada_id)
);

create index if not exists idx_qresposta_jornada on public.questionario_resposta(jornada_id);
create index if not exists idx_qresposta_template on public.questionario_resposta(questionario_template_id);

drop trigger if exists trg_qresposta_updated_at on public.questionario_resposta;
create trigger trg_qresposta_updated_at
  before update on public.questionario_resposta
  for each row execute function public.set_updated_at();

alter table public.questionario_resposta enable row level security;

-- ----------------------------------------------------------------------------
-- resposta_item — uma resposta a uma pergunta dentro de uma instância.
-- passo_jornada_id é nullable porque Necessidade é por jornada inteira.
-- ----------------------------------------------------------------------------

create table if not exists public.resposta_item (
  id                       uuid primary key default uuid_generate_v4(),
  questionario_resposta_id uuid not null references public.questionario_resposta(id) on delete cascade,
  pergunta_template_id     uuid not null references public.pergunta_template(id) on delete restrict,
  passo_jornada_id         uuid references public.passo_jornada(id) on delete cascade,
  nota                     int check (nota between 1 and 5),
  nao_se_aplica            boolean not null default false,
  observacao_discursiva    text,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now(),
  unique(questionario_resposta_id, pergunta_template_id, passo_jornada_id)
);

create index if not exists idx_ritem_qresposta on public.resposta_item(questionario_resposta_id);
create index if not exists idx_ritem_pergunta on public.resposta_item(pergunta_template_id);
create index if not exists idx_ritem_passo on public.resposta_item(passo_jornada_id);

drop trigger if exists trg_ritem_updated_at on public.resposta_item;
create trigger trg_ritem_updated_at
  before update on public.resposta_item
  for each row execute function public.set_updated_at();

alter table public.resposta_item enable row level security;

-- ----------------------------------------------------------------------------
-- Views materializáveis das avaliações (derivadas de resposta_item)
-- Implementadas como VIEWs — sempre frescas, sem custo de manutenção.
-- ----------------------------------------------------------------------------

create or replace view public.v_avaliacao_barreira as
select
  qr.jornada_id,
  ri.passo_jornada_id,
  pt.criterio_template_id,
  ri.nota,
  ri.nao_se_aplica,
  ri.observacao_discursiva
from public.resposta_item ri
join public.pergunta_template pt    on pt.id = ri.pergunta_template_id
join public.questionario_resposta qr on qr.id = ri.questionario_resposta_id
join public.criterio_template ct    on ct.id = pt.criterio_template_id
where ct.dimensao = 'barreira';

create or replace view public.v_avaliacao_impacto as
select
  qr.jornada_id,
  ri.passo_jornada_id,
  pt.criterio_template_id,
  ct.subdimensao_impacto,
  ri.nota,
  ri.nao_se_aplica,
  ri.observacao_discursiva
from public.resposta_item ri
join public.pergunta_template pt    on pt.id = ri.pergunta_template_id
join public.questionario_resposta qr on qr.id = ri.questionario_resposta_id
join public.criterio_template ct    on ct.id = pt.criterio_template_id
where ct.dimensao = 'impacto'
  and ct.subdimensao_impacto <> 'necessidade';

create or replace view public.v_avaliacao_necessidade as
select
  qr.jornada_id,
  pt.criterio_template_id,
  ri.nota,
  ri.nao_se_aplica,
  ri.observacao_discursiva
from public.resposta_item ri
join public.pergunta_template pt    on pt.id = ri.pergunta_template_id
join public.questionario_resposta qr on qr.id = ri.questionario_resposta_id
join public.criterio_template ct    on ct.id = pt.criterio_template_id
where ct.subdimensao_impacto = 'necessidade'
  and ri.passo_jornada_id is null;

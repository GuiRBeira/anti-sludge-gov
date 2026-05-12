-- 0004_processes_journeys.sql
-- Processo (serviço sob análise), participantes, protocolos, jornadas e passos.

-- ----------------------------------------------------------------------------
-- processo (serviço público)
-- ----------------------------------------------------------------------------

create table if not exists public.processo (
  id                       uuid primary key default uuid_generate_v4(),
  orgao_id                 uuid not null references public.orgao(id) on delete restrict,
  nome                     text not null,
  objetivo                 text,
  abrangencia              text,
  publico_alvo             text,
  perfil_foco              text,
  indicadores_satisfacao   text,
  hipoteses                text,
  arquivado                boolean not null default false,
  created_by               uuid references public.profile(id) on delete set null,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create index if not exists idx_processo_orgao on public.processo(orgao_id);
create index if not exists idx_processo_arquivado on public.processo(arquivado);

drop trigger if exists trg_processo_updated_at on public.processo;
create trigger trg_processo_updated_at
  before update on public.processo
  for each row execute function public.set_updated_at();

alter table public.processo enable row level security;

-- ----------------------------------------------------------------------------
-- processo_permissao (atribui processos específicos a um profile,
-- tipicamente para visitantes)
-- ----------------------------------------------------------------------------

create table if not exists public.processo_permissao (
  id          uuid primary key default uuid_generate_v4(),
  profile_id  uuid not null references public.profile(id) on delete cascade,
  processo_id uuid not null references public.processo(id) on delete cascade,
  pode_editar boolean not null default false,
  created_at  timestamptz not null default now(),
  unique(profile_id, processo_id)
);

create index if not exists idx_processo_permissao_profile on public.processo_permissao(profile_id);
create index if not exists idx_processo_permissao_processo on public.processo_permissao(processo_id);

alter table public.processo_permissao enable row level security;

-- ----------------------------------------------------------------------------
-- participante (anonimizado, código curto P01, P02 …)
-- ----------------------------------------------------------------------------

create table if not exists public.participante (
  id                      uuid primary key default uuid_generate_v4(),
  processo_id             uuid not null references public.processo(id) on delete cascade,
  codigo                  text not null,
  idade_faixa             text,
  escolaridade            text,
  regiao                  text,
  genero                  text,
  outras_caracteristicas  jsonb,
  consentimento_lgpd      boolean not null default false,
  data_consentimento      timestamptz,
  created_at              timestamptz not null default now(),
  unique(processo_id, codigo)
);

create index if not exists idx_participante_processo on public.participante(processo_id);

alter table public.participante enable row level security;

comment on table public.participante is
  'Pessoa observada, anonimizada por código (P01, P02…). Não armazenar nome real, CPF, email.';

-- ----------------------------------------------------------------------------
-- protocolo_observacao (planejamento da observação por participante)
-- ----------------------------------------------------------------------------

create table if not exists public.protocolo_observacao (
  id                   uuid primary key default uuid_generate_v4(),
  processo_id          uuid not null references public.processo(id) on delete cascade,
  participante_id      uuid not null references public.participante(id) on delete cascade,
  observador_id        uuid references public.profile(id) on delete set null,
  tarefa               text,
  data_observacao      timestamptz,
  local                text,
  dispositivos         text,
  consentimento_obtido boolean not null default false,
  notas_pre            text,
  notas_pos            text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  unique(processo_id, participante_id)
);

create index if not exists idx_protocolo_processo on public.protocolo_observacao(processo_id);
create index if not exists idx_protocolo_participante on public.protocolo_observacao(participante_id);

drop trigger if exists trg_protocolo_updated_at on public.protocolo_observacao;
create trigger trg_protocolo_updated_at
  before update on public.protocolo_observacao
  for each row execute function public.set_updated_at();

alter table public.protocolo_observacao enable row level security;

-- ----------------------------------------------------------------------------
-- jornada (planejada, individual, padrão — discriminada por tipo_jornada)
-- ----------------------------------------------------------------------------

create table if not exists public.jornada (
  id              uuid primary key default uuid_generate_v4(),
  processo_id     uuid not null references public.processo(id) on delete cascade,
  tipo_jornada    tipo_jornada not null,
  participante_id uuid references public.participante(id) on delete cascade,
  observador_id   uuid references public.profile(id) on delete set null,
  protocolo_id    uuid references public.protocolo_observacao(id) on delete set null,
  data_observacao timestamptz,
  validada        boolean not null default false,
  notas           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists idx_jornada_processo on public.jornada(processo_id);
create index if not exists idx_jornada_tipo on public.jornada(tipo_jornada);
create index if not exists idx_jornada_participante on public.jornada(participante_id);

-- Garante: 1 planejada por processo; 1 padrão por processo;
-- 1 individual por (processo, participante).
create unique index if not exists uniq_jornada_planejada_por_processo
  on public.jornada(processo_id)
  where tipo_jornada = 'planejada';
create unique index if not exists uniq_jornada_padrao_por_processo
  on public.jornada(processo_id)
  where tipo_jornada = 'padrao';
create unique index if not exists uniq_jornada_individual_por_participante
  on public.jornada(processo_id, participante_id)
  where tipo_jornada = 'individual';

-- Consistência: individual exige participante; planejada/padrão não tem participante.
alter table public.jornada drop constraint if exists chk_jornada_participante;
alter table public.jornada add constraint chk_jornada_participante check (
  (tipo_jornada = 'individual' and participante_id is not null)
  or (tipo_jornada in ('planejada', 'padrao') and participante_id is null)
);

drop trigger if exists trg_jornada_updated_at on public.jornada;
create trigger trg_jornada_updated_at
  before update on public.jornada
  for each row execute function public.set_updated_at();

alter table public.jornada enable row level security;

-- ----------------------------------------------------------------------------
-- passo_jornada (substitui o antigo tempo_etapa)
-- Permite ordem real, desvios, repetições, passos extras.
-- ----------------------------------------------------------------------------

create table if not exists public.passo_jornada (
  id                    uuid primary key default uuid_generate_v4(),
  jornada_id            uuid not null references public.jornada(id) on delete cascade,
  ordem                 int not null,
  passo_planejado_id    uuid references public.passo_jornada(id) on delete set null,
  tipo_comportamento_id uuid references public.tipo_comportamento(id) on delete set null,
  descricao             text,
  obrigatorio           boolean not null default true,
  tempo_segundos        int,
  eh_desvio             boolean not null default false,
  eh_repeticao          boolean not null default false,
  notas                 text,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  unique(jornada_id, ordem)
);

create index if not exists idx_passo_jornada on public.passo_jornada(jornada_id);
create index if not exists idx_passo_tipo on public.passo_jornada(tipo_comportamento_id);

drop trigger if exists trg_passo_updated_at on public.passo_jornada;
create trigger trg_passo_updated_at
  before update on public.passo_jornada
  for each row execute function public.set_updated_at();

alter table public.passo_jornada enable row level security;

comment on table public.passo_jornada is
  'Sequência real de passos. Auto-referência passo_planejado_id liga um passo individual ao passo equivalente da jornada planejada do mesmo processo.';

-- ----------------------------------------------------------------------------
-- entrevista_pos_observacao
-- ----------------------------------------------------------------------------

create table if not exists public.entrevista_pos_observacao (
  id            uuid primary key default uuid_generate_v4(),
  protocolo_id  uuid not null references public.protocolo_observacao(id) on delete cascade,
  observador_id uuid references public.profile(id) on delete set null,
  respostas     jsonb not null default '{}'::jsonb,
  data          timestamptz,
  created_at    timestamptz not null default now()
);

create index if not exists idx_entrevista_protocolo on public.entrevista_pos_observacao(protocolo_id);

alter table public.entrevista_pos_observacao enable row level security;

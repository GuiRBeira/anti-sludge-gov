-- 0006_analysis_audit.sql
-- Resultados materializados (calculados por Server Action) e log de auditoria.

-- ----------------------------------------------------------------------------
-- resultado_analise (materializado por Server Action explícita)
-- ----------------------------------------------------------------------------

create table if not exists public.resultado_analise (
  id                  uuid primary key default uuid_generate_v4(),
  processo_id         uuid not null references public.processo(id) on delete cascade,
  jornada_id          uuid references public.jornada(id) on delete cascade,
  passo_jornada_id    uuid references public.passo_jornada(id) on delete cascade,
  criterio_template_id uuid references public.criterio_template(id) on delete cascade,
  tipo_metrica        tipo_metrica not null,
  valor               numeric,
  metadados           jsonb not null default '{}'::jsonb,
  versao_metodologia  text,
  calculado_em        timestamptz not null default now(),
  -- impede duplicar a mesma combinação de métrica para o mesmo escopo
  unique(processo_id, jornada_id, passo_jornada_id, criterio_template_id, tipo_metrica)
);

create index if not exists idx_resultado_processo on public.resultado_analise(processo_id);
create index if not exists idx_resultado_jornada on public.resultado_analise(jornada_id);
create index if not exists idx_resultado_metrica on public.resultado_analise(tipo_metrica);

alter table public.resultado_analise enable row level security;

comment on table public.resultado_analise is
  'Resultado calculado a partir das respostas. Recalculado por Server Action explícita; nunca por GET com side effect.';

-- ----------------------------------------------------------------------------
-- log_auditoria
-- ----------------------------------------------------------------------------

create table if not exists public.log_auditoria (
  id            uuid primary key default uuid_generate_v4(),
  actor_id      uuid references public.profile(id) on delete set null,
  acao          text not null,                       -- ex: insert, update, delete, recalcular
  entidade      text not null,                       -- ex: processo, jornada, resposta_item
  entidade_id   uuid,
  dados_antes   jsonb,
  dados_depois  jsonb,
  contexto      jsonb,
  criado_em     timestamptz not null default now()
);

create index if not exists idx_log_actor on public.log_auditoria(actor_id);
create index if not exists idx_log_entidade on public.log_auditoria(entidade, entidade_id);
create index if not exists idx_log_criado_em on public.log_auditoria(criado_em desc);

alter table public.log_auditoria enable row level security;

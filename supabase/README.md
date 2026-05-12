# supabase/

Schema, migrations e seeds do Supabase.

## Estrutura

- `migrations/` — migrations SQL numeradas. **Nunca editar uma migration
  já aplicada** em ambiente compartilhado; criar nova.
- `seed/` — seeds idempotentes do catálogo F5 (extraídos da planilha).

## Convenção de nomes

`<NNNN>_<descricao_curta>.sql`, com `NNNN` = 4 dígitos.

Exemplos:
- `0001_init_extensions_and_enums.sql`
- `0002_auth_orgs_profiles.sql`
- `0003_catalog_f5.sql`
- `0004_processes_journeys.sql`
- `0005_questionnaires.sql`
- `0006_observations.sql`
- `0007_analysis_results.sql`
- `0008_audit_log.sql`
- `0009_rls_policies.sql`

## Como aplicar

Durante a Fase 0 (esta sessão), aplicar manualmente pelo SQL Editor do
painel do Supabase. A partir da Fase 1, usar Supabase CLI:

```bash
supabase link --project-ref <ref>
supabase db push
```

## Política de RLS

Toda tabela com dados de domínio nasce com `enable row level security`.
Policies em `0009_rls_policies.sql` para manter visibilidade. Tabelas de
catálogo (read-only para usuários comuns) têm policy aberta de SELECT
e INSERT/UPDATE/DELETE somente para admins.

# Como aplicar o schema (modo SQL Editor)

Você já rodou `0001_init_extensions_and_enums.sql`. Os próximos passos
abaixo terminam a Fase 1. Rodar **na ordem** pelo SQL Editor do Supabase
(novo "query" para cada um, ou pode colar tudo numa query só).

## Migrations (estrutura)

| Ordem | Arquivo | O que faz |
|---|---|---|
| ✓ 1 | `migrations/0001_init_extensions_and_enums.sql` | Extensions + enums (já rodada) |
| 2 | `migrations/0002_orgs_profiles_rbac.sql` | Órgãos, perfis, membros, trigger de auto-criar profile |
| 3 | `migrations/0003_catalog_f5.sql` | Categorias, tipos, critérios, escalas, glossário, grupos |
| 4 | `migrations/0004_processes_journeys.sql` | Processos, participantes, protocolos, jornadas, passos, entrevistas |
| 5 | `migrations/0005_questionnaires.sql` | Templates, perguntas, respostas, itens + views derivadas |
| 6 | `migrations/0006_analysis_audit.sql` | Resultado_analise + log_auditoria |
| 7 | `migrations/0007_rls_policies.sql` | Helpers de autorização + RLS em todas as tabelas |
| 7.5 | `migrations/0008_passo_screenshot.sql` | Coluna `screenshot_path` em `passo_jornada` |
| 7.6 | `storage/setup_passo_screenshots.sql` | Bucket privado e policies para prints dos passos |

## Seeds (depois das migrations)

| Ordem | Arquivo | O que faz |
|---|---|---|
| 8 | `seed/0001_seed_catalog_f5.sql` | Insere categorias, tipos, critérios, escalas, glossário, grupos (tudo derivado da planilha F5) |
| 9 | `seed/0002_seed_questionarios.sql` | Cria os 6 templates de questionário e gera as perguntas a partir dos critérios |

## Promover seu usuário a admin

Depois das migrations + seeds, faça login uma vez no app web (`pnpm dev`),
e rode no SQL Editor para promover você:

```sql
update public.profile
set papel_global = 'admin',
    nome_completo = coalesce(nome_completo, 'Admin')
where id = (select id from auth.users where email = 'SEU_EMAIL_AQUI');
```

(Substitua `SEU_EMAIL_AQUI` pelo email que você usou no signup.)

## Conferência rápida

Depois de tudo aplicado, no SQL Editor:

```sql
-- Deve retornar 6
select count(*) from public.categoria;

-- Deve retornar 16
select count(*) from public.tipo_comportamento;

-- Deve retornar 14 (barreiras) + 4 (impactos) = 18
select dimensao, count(*) from public.criterio_template group by dimensao;

-- Deve retornar 6 (templates de questionário)
select count(*) from public.questionario_template;

-- Deve retornar exatamente 36
-- (14 critérios-B × 2 templates) + (3 critérios-I × 2) + (1 necessidade × 2)
select count(*) from public.pergunta_template;

-- Deve retornar 45 termos
select count(*) from public.glossario;

-- Deve retornar 68. A planilha #CritériosPorTipo tem 93 entradas, mas com
-- repetições do mesmo critério no mesmo tipo (ex: 'Acessar conteúdo' lista
-- 'Conteúdo' 3× seguidas). A tabela é um SET (PK composta), então sobram
-- 68 pares únicos.
select count(*) from public.tipo_criterio;
```

Se algum número estiver zero ou muito diferente, há erro no seed —
me avisa e ajustamos.

# features/catalog

Catálogo metodológico F5 versionado: categorias, tipos de comportamento,
critérios, escalas e glossário.

## Estado atual

Leitura consolidada implementada em `/catalogo`, incluindo glossário.

## Cobre da metodologia

- `2 Mapeamento Comportamental` — categorias e tipos.
- `#CritériosPorTipo` — critérios aplicáveis por tipo.
- `#Conceitos&Escalas` — texto das notas 1 e 5 por critério.
- `#Glossário`.
- `#Listas`.

## Tabelas principais

- `categoria`
- `tipo_comportamento`
- `criterio_template`
- `tipo_criterio`
- `escala_avaliacao`
- `glossario`

## Origem dos dados

Toda linha vem da planilha F5 e dos seeds SQL em `supabase/seed/`.
Mudanças passam por nova migration/seed, nunca por edição manual no painel.

## Telas

- `/catalogo` — leitura consolidada de categorias, tipos e critérios.

## Pendências

- Filtros/abas por categoria, tipo e critério.

# features/catalog

Catálogo metodológico F5 versionado: categorias, tipos de comportamento,
critérios, escalas e glossário.

## Cobre da metodologia
- `2 Mapeamento Comportamental` — categorias e tipos.
- `#CritériosPorTipo` — quais critérios se aplicam a cada tipo.
- `#Conceitos&Escalas` — texto das notas 1 e 5 por critério.
- `#Glossário`.
- `#Listas`.

## Tabelas principais
- `categoria`
- `tipo_comportamento`
- `criterio_template` (barreira ou impacto, com pergunta padrão e textos
  de nota 1 e 5)
- `tipo_criterio` (M:N entre tipo e critério)
- `escala_avaliacao` (descrição por nota dentro de cada critério)
- `glossario`

## Origem dos dados
**Toda linha vem da planilha** (`F5 - Mapeamento Anti-Sludge_02.04 (1).xlsx`).
Mudanças passam por nova migration de seed, nunca por edição manual no painel.

## Telas (futuro, somente leitura)
- `/catalogo/categorias`
- `/catalogo/tipos`
- `/catalogo/criterios`
- `/catalogo/glossario`

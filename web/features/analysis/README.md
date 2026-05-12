# features/analysis

Avaliações materializadas (barreira, impacto, necessidade), cálculo do
índice de sludge e resultados consolidados.

## Cobre da metodologia
- `5 Validação` — verificação de completude antes de calcular.
- `6 Resultados Analise` — cálculo dos resultados.
- `JP. Resultados` — resultados específicos da jornada padrão.

## Tabelas principais
- `avaliacao_barreira` (view ou mat-view sobre `resposta_item`)
- `avaliacao_impacto`
- `avaliacao_necessidade`
- `resultado_analise` (resultados materializados)

## Regras de cálculo (a confirmar com a planilha na Fase 3)
- Médias por critério, categoria, comportamento, jornada.
- Tempo absoluto, tempo escalonado, diferença de tempo.
- Índice de sludge por etapa = composição de barreira + impacto.
- Necessidade entra como peso de jornada inteira, não por passo.

## Anti-heurística
**Não calcular nada se faltar resposta.** Resultado vazio é melhor que
resultado estimado em silêncio. Se um passo não tem resposta de um
critério aplicável, mostrar "sem dado" no gráfico — não preencher com
média ou zero.

## Server Actions (futuro)
- `recalcularResultado(processo_id)` — explícita; idempotente.
- `obterResultados(processo_id, filtros)` — leitura pura.

# features/analysis

Consultas analíticas para barreiras, impactos, necessidade e tempos.

## Estado atual

Parcial. A tela de resultados já usa queries reais sobre respostas e passos,
incluindo tabela dinâmica e ranking operacional de sludge. O cálculo
materializado em `resultado_analise` ainda não foi implementado.

## Cobre da metodologia

- `6 Resultados Analise` — parcialmente, via médias, tempos, tabela dinâmica e ranking.
- `JP. Resultados` — parcialmente, via resultados por processo.
- `5 Validação` — ainda depende das flags de jornada/questionário e de
  sinalização visual; não há pipeline formal de validação.

## Tabelas e views relacionadas

- `resposta_item`
- `questionario_resposta`
- `criterio_template`
- `jornada`
- `passo_jornada`
- `resultado_analise` (schema pronto, uso pendente)
- `v_avaliacao_barreira`
- `v_avaliacao_impacto`
- `v_avaliacao_necessidade`

## Queries implementadas

- `mediasPorCriterio(processo_id, options?)`
- `temposPorPasso(processo_id)`
- `tempoTotalPorJornada(processo_id)`
- `tabelaDimensionamento(processo_id)`
- `rankingSludgePorPasso(processo_id)`

## Regras atuais

- Respostas com `nao_se_aplica = true` são ignoradas no cálculo de média.
- Critérios sem resposta retornam `media = null` para a UI mostrar “sem dado”.
- Nada é estimado silenciosamente.

## Pendências

- `recalcularResultado(processo_id)` idempotente.
- Persistência em `resultado_analise`.
- Persistir o ranking/índice em `resultado_analise`.
- Incorporar Necessidade como peso formal depois de validação metodológica.

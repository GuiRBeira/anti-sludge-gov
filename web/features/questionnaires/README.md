# features/questionnaires

Questionários da metodologia F5: templates, perguntas, respostas e itens.

## Cobre da metodologia
- `4.1 Dimensionamento Barreiras` — questionário de barreiras.
- `4.2 Dimensionamento Impactos` — questionário de impactos
  (Carga Cognitiva, Emoção, Consequência por etapa; Necessidade uma vez por jornada).
- "6 questionários por jornada planejada e por jornada individual"
  (anotação Wendel/Janaina).

## Tabelas principais
- `questionario_template` (versionado)
- `pergunta_template` (vinculada a critério)
- `questionario_resposta` (instância para uma jornada)
- `resposta_item` (cada pergunta respondida — nota 1-5, NA, observação)

## Regras importantes
- Toda resposta tem rastreabilidade: `pergunta_template_id` (versão),
  `respondente_id`, `data_resposta`, opcional `passo_jornada_id`.
- Necessidade não é por passo. A pergunta de Necessidade tem
  `passo_jornada_id = NULL` na resposta.
- `nao_se_aplica = true` é diferente de `nota = NULL` — interpretar como
  "respondeu N/A explicitamente".

## Server Actions (futuro)
- `salvarRespostaBarreira(jornada_id, passo_id, criterio_id, nota|na, observacao)`
- `salvarRespostaImpacto(...)` — análoga.
- `salvarNecessidade(jornada_id, criterio_id, nota|na, observacao)`.
- `concluirQuestionario(questionario_resposta_id)` — marca como pronto
  para entrar nos cálculos.

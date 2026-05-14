# features/questionnaires

Questionários da metodologia F5: templates, perguntas, respostas e itens.

## Estado atual

Implementado para barreiras, impactos e necessidade, em jornadas planejadas,
individuais e padrão.

## Cobre da metodologia

- `4.1 Dimensionamento Barreiras`.
- `4.2 Dimensionamento Impactos` — Carga Cognitiva, Emoção e Consequência por
  etapa; Necessidade uma vez por jornada.
- Escala 1-5 com N/A e observação discursiva.

## Tabelas principais

- `questionario_template`
- `pergunta_template`
- `questionario_resposta`
- `resposta_item`

## Regras importantes

- Barreiras são filtradas por tipo de comportamento via `tipo_criterio`.
- Impactos e Necessidade usam perguntas universais.
- Necessidade não é por passo: `passo_jornada_id = NULL`.
- `nao_se_aplica = true` é diferente de ausência de resposta.
- Escalas exibidas:
  - Barreiras: `1 = sem barreiras` e `5 = barreiras impeditivas`.
  - Impacto/Necessidade: `1 = sem prejuízo` e `5 = com prejuízos`.

## Server Actions

- `ensureRespostaQuestionario(questionario_template_id, jornada_id)`
- `upsertItemResposta(input)`
- `concluirQuestionario(questionario_resposta_id)`
- `reabrirQuestionario(questionario_resposta_id)`

## Queries

- `listQuestionariosAplicaveis(tipo_jornada)`
- `getQuestionarioByCodigo(codigo)`
- `listPerguntas(questionario_template_id)`
- `listPerguntasParaTipo(questionario_template_id, tipo_comportamento_id)`
- `getRespostaInstance(questionario_template_id, jornada_id)`
- `listItensResposta(resposta_id)`

## Tela

- `/processos/[id]/jornadas/[jornadaId]/questionario/[codigo]`

## Pendências

- Melhorar feedback agregado de completude por questionário.
- Testes de regressão para filtro de perguntas por tipo.

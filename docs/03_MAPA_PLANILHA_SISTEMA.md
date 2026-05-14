# 03 — Mapa de Cobertura: Planilha F5 → Sistema

Esta tabela é **viva**. A cada feature implementada, atualizar a coluna
**Status**. O MVP só deve ser chamado de fechado quando as linhas críticas
estiverem em `completo` ou `validado`.

Status: `nao_iniciado` | `em_progresso` | `completo` | `validado`

| # | Aba/Conceito da planilha | Objetivo metodológico | Entidade no banco | Tela / Rota | Server Action / Cálculo | Status |
|---|---|---|---|---|---|---|
| 1 | `1 Compreensão do Contexto` | Coletar contexto do serviço | `processo` | `/processos/[id]/contexto` | `salvarContexto()` | completo |
| 2 | `2 Mapeamento Comportamental` | Mapear comportamentos por categoria/tipo | `categoria`, `tipo_comportamento` | `/catalogo` | seed | completo |
| 3 | `2.1 Mapeamento JorPlanejada` | Definir jornada planejada estruturada | `jornada (planejada)`, `passo_jornada` | `/processos/[id]/jornada-planejada` | `ensureJornadaPlanejada()`, `adicionarPasso()`, `atualizarPasso()` | completo |
| 4 | `JU.Planejamento` | Planejar observações | `protocolo_observacao` | `/processos/[id]/observacoes` | `upsertProtocoloObservacao()` | completo |
| 5 | `JU.Protocolo 01..05` | Protocolo por participante | `protocolo_observacao`, `participante` | `/processos/[id]/observacoes` | `upsertProtocoloObservacao()` | completo |
| 6 | `JU.Individual 01..05` | Jornada individual real | `jornada (individual)`, `passo_jornada` | `/processos/[id]/jornadas-individuais/[jornadaId]` | `iniciarJornadaIndividual()`, `adicionarPasso()`, `atualizarPasso()` | completo |
| 7 | `2.2 Mapeamento JorPadrão` + `# Tabela JorPadrão` | Construir jornada padrão | `jornada (padrao)`, `passo_jornada` | `/processos/[id]/jornada-padrao` | `ensureJornadaPadrao()`, `clonarPassosDaPlanejada()`, `consolidarJornadaPadrao()` | completo |
| 8 | `JP. Cpto.Ord.Dur.Clas` | Comportamento, ordem, duração, classificação por passo | `passo_jornada` | editores de jornada | `atualizarPasso()`, `moverPasso()`, `vincularPassoPlanejado()` | completo |
| 9 | `3 Classificação Comportamental` | Aplicar categoria/tipo aos passos | `passo_jornada.tipo_comportamento_id` | editores de jornada | `atualizarPasso()` | completo |
| 10 | `#CritériosPorTipo` | Quais critérios aplicar por tipo | `tipo_criterio` | `/catalogo` + questionários | seed + `listPerguntasParaTipo()` | completo |
| 11 | `#Conceitos&Escalas` | Texto das notas 1 e 5 por critério | `criterio_template`, `escala_avaliacao` | `/catalogo` + questionários | seed | completo |
| 12 | `4.1 Dimensionamento Barreiras` | Responder barreiras por passo | `questionario_template`, `resposta_item` | `/processos/[id]/jornadas/[jornadaId]/questionario/[codigo]` | `ensureRespostaQuestionario()`, `upsertItemResposta()` | completo |
| 13 | `4.2 Dimensionamento Impactos` | Responder Carga Cognitiva, Emoção, Consequência por passo | `questionario_template`, `resposta_item` | `/processos/[id]/jornadas/[jornadaId]/questionario/[codigo]` | `ensureRespostaQuestionario()`, `upsertItemResposta()` | completo |
| 14 | Regra Necessidade | Necessidade uma vez por jornada | `resposta_item.passo_jornada_id = null` | mesmo questionário | `upsertItemResposta()` | completo |
| 15 | `5 Validação` | Validar coleta antes de gerar resultado | `jornada.validada`, `questionario_resposta.concluido` | editores e questionários | `toggleValidacaoJornada()`, `concluirQuestionario()` | em_progresso (sem pipeline formal) |
| 16 | `6 Resultados Analise` | Tabela de resultados por jornada | derivado de `resposta_item`; `resultado_analise` reservado | `/processos/[id]/resultados` | `mediasPorCriterio()`, `tabelaDimensionamento()` | em_progresso (sem materialização em `resultado_analise`) |
| 17 | `JP. Resultados` | Resultados da jornada padrão | derivado de respostas da jornada padrão | `/processos/[id]/resultados` | mesmas queries de análise | em_progresso |
| 18 | `6 Resultados Graficos` | Gráficos finais | derivado de `resposta_item` e `passo_jornada` | `/processos/[id]/resultados` | Recharts + queries server-side | completo |
| 19 | `#TabDinDim` | Tabela dinâmica de dimensionamento | derivado de `resposta_item` | `/processos/[id]/resultados` | `tabelaDimensionamento()` + CSV | completo |
| 20 | `#Glossário` | Termos da metodologia | `glossario` | `/catalogo` | seed | completo |
| 21 | `#Listas` | Listas auxiliares | seeds/enums/listas locais | formulários e catálogo | seed + constantes UI | em_progresso |
| 22 | Relatório final | Exportar relatório metodológico | n/a | `/processos/[id]/relatorio` | CSV implementado; PDF pendente | em_progresso |
| 23 | Canal beta do piloto | Capturar bugs/sugestões dos testers | `beta_feedback` | botão flutuante + `/admin/feedback-beta` | `criarBetaFeedback()`, `atualizarBetaFeedbackStatus()` | completo |

## Gráficos Obrigatórios

Cada gráfico precisa de fonte explícita e mostrar dados reais ou `sem dado`.

| Gráfico | Fonte | Visualização | Status |
|---|---|---|---|
| Média de barreiras por critério | `resposta_item` + `criterio_template` | bar chart | completo |
| Média de barreiras por categoria/comportamento | `resposta_item` + `passo_jornada` + `tipo_comportamento` + `categoria` | tabela/export + ranking; gráfico agrupado dedicado pendente | em_progresso |
| Média de impactos por subdimensão | `resposta_item` + `criterio_template.subdimensao_impacto` | bar chart | completo |
| Comparação barreiras × impactos | agregações por critério/passo | ranking e seções lado a lado; visual pareado dedicado pendente | em_progresso |
| Tempo absoluto por passo | `passo_jornada.tempo_segundos` | gráficos de tempo por jornada | completo |
| Tempo escalonado | normalização do tempo absoluto | pendente | nao_iniciado |
| Diferença de tempo (planejada × individual × padrão) | jornadas do mesmo processo | tempo total por jornada | em_progresso |
| Ranking de sludge por etapa | médias de barreira + impacto por passo | tabela ranqueada | completo |

## Pendências Reais Depois do MVP v1

- Materializar resultados em `resultado_analise` por Server Action idempotente.
- Exportação PDF com layout metodológico final.
- Smoke tests de RLS por papel.
- Validação humana da metodologia com Janaina/Wendel antes de marcar qualquer
  linha como `validado`.

## Como atualizar este mapa

- Ao começar uma feature: mover para `em_progresso`.
- Ao terminar: mover para `completo` e linkar commit/PR quando houver.
- Ao receber validação de Janaina/Wendel: mover para `validado`.
- Se descobrir um item que falta: adicionar nova linha antes de implementar.

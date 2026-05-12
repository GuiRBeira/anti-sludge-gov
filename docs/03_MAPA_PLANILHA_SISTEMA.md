# 03 — Mapa de Cobertura: Planilha F5 → Sistema

Esta tabela é **viva**. A cada feature implementada, atualizar a coluna
**Status**. O MVP só é considerado pronto quando todas as linhas estão em
"completo" ou "validado".

Status: `nao_iniciado` | `em_progresso` | `completo` | `validado`

| # | Aba/Conceito da planilha | Objetivo metodológico | Entidade no banco | Tela / Rota | Server Action / Cálculo | Status |
|---|---|---|---|---|---|---|
| 1 | `1 Compreensão do Contexto` | Coletar contexto do serviço | `processo` | `/processos/[id]/contexto` | `salvarContexto()` | em_progresso (form pronto) |
| 2 | `2 Mapeamento Comportamental` | Mapear comportamentos por categoria/tipo | `categoria`, `tipo_comportamento` | `/catalogo` (read) | seed | em_progresso (banco + UI read prontos) |
| 3 | `2.1 Mapeamento JorPlanejada` | Definir jornada planejada estruturada | `jornada (planejada)`, `passo_jornada` | `/processos/[id]/jornada-planejada` | `salvarJornadaPlanejada()` | nao_iniciado |
| 4 | `JU.Planejamento` | Planejar observações | `protocolo_observacao` | `/processos/[id]/observacoes/planejamento` | `criarProtocolo()` | nao_iniciado |
| 5 | `JU.Protocolo 01..05` | Protocolo por participante | `protocolo_observacao`, `participante` | `/processos/[id]/observacoes/[id]` | `lancarProtocolo()` | nao_iniciado |
| 6 | `JU.Individual 01..05` | Jornada individual real | `jornada (individual)`, `passo_jornada` | `/processos/[id]/jornadas/[id]` | `salvarJornadaIndividual()` | nao_iniciado |
| 7 | `2.2 Mapeamento JorPadrão` + `# Tabela JorPadrão` | Construir jornada padrão | `jornada (padrao)`, `passo_jornada` | `/processos/[id]/jornada-padrao` | `consolidarJornadaPadrao()` | nao_iniciado |
| 8 | `JP. Cpto.Ord.Dur.Clas` | Comportamento, ordem, duração, classificação por passo | `passo_jornada` | dentro da tela de jornada padrão | `classificarPasso()` | nao_iniciado |
| 9 | `3 Classificação Comportamental` | Aplicar categoria/tipo aos passos | `passo_jornada.tipo_comportamento_id` | dentro de jornada planejada/individual | `classificarPasso()` | nao_iniciado |
| 10 | `#CritériosPorTipo` | Quais critérios aplicar por tipo | `tipo_criterio` | `/catalogo` (read) | seed | em_progresso (banco + seed) |
| 11 | `#Conceitos&Escalas` | Texto das notas 1 e 5 por critério | `criterio_template`, `escala_avaliacao` | `/catalogo` (read) | seed | em_progresso (banco + seed) |
| 12 | `4.1 Dimensionamento Barreiras` | Responder barreiras por passo | `questionario_template (barreiras)`, `resposta_item` | `/processos/[id]/jornadas/[id]/barreiras` | `salvarRespostaBarreira()` | nao_iniciado |
| 13 | `4.2 Dimensionamento Impactos` | Responder Carga Cognitiva, Emoção, Consequência por passo | `questionario_template (impactos)`, `resposta_item` | `/processos/[id]/jornadas/[id]/impactos` | `salvarRespostaImpacto()` | nao_iniciado |
| 14 | (regra Necessidade) | Necessidade uma vez por jornada | `avaliacao_necessidade` (via resposta_item com passo null) | aba dentro de impactos | `salvarNecessidade()` | nao_iniciado |
| 15 | `5 Validação` | Validar coleta antes de gerar resultado | `jornada.validada` (campo) | `/processos/[id]/jornadas/[id]/validar` | `validarJornada()` | nao_iniciado |
| 16 | `6 Resultados Analise` | Tabela de resultados por jornada | `resultado_analise` | `/processos/[id]/resultados` | `recalcularResultado()` | nao_iniciado |
| 17 | `JP. Resultados` | Resultados da jornada padrão | `resultado_analise (jornada_padrao)` | dentro de `/resultados` | `recalcularResultado()` | nao_iniciado |
| 18 | `6 Resultados Graficos` | Gráficos finais | derivado de `resposta_item` | `/processos/[id]/graficos` | `gerarGraficos()` (read) | nao_iniciado |
| 19 | `#TabDinDim` | Tabela dinâmica de dimensionamento | derivado de `resposta_item` | dentro de `/graficos` | query agregadora | nao_iniciado |
| 20 | `#Glossário` | Termos da metodologia | `glossario` | `/catalogo/glossario` | seed | em_progresso (45 termos seedados) |
| 21 | `#Listas` | Listas auxiliares | seeds variados | n/a | seed | nao_iniciado |
| 22 | (relatório final) | Exportar relatório metodológico | n/a | `/processos/[id]/relatorio` | `exportarRelatorio()` (PDF/CSV) | nao_iniciado |

## Gráficos obrigatórios (linha 18)

Cada gráfico precisa de fonte explícita e mostrar dados reais ou "sem dado".

| Gráfico | Fonte | Visualização |
|---|---|---|
| Média de barreiras por critério | `resposta_item` (dimensão barreira) agregado por `criterio_template_id` | bar chart |
| Média de barreiras por categoria/comportamento | join `resposta_item` + `passo_jornada` + `tipo_comportamento` + `categoria` | grouped bar |
| Média de impactos por subdimensão | `resposta_item` (dimensão impacto) agregado por subdimensão | bar chart |
| Comparação barreiras × impactos | duas séries no mesmo eixo | scatter ou paired bar |
| Tempo absoluto por passo | `passo_jornada.tempo_segundos` | bar chart |
| Tempo escalonado | normalização do tempo absoluto | bar chart |
| Diferença de tempo (planejada × individual × padrão) | join entre jornadas do mesmo processo | grouped bar |
| Ranking de sludge por etapa | composição barreira + impacto por passo | bar chart ranqueado |

## Como atualizar este mapa

- Ao começar uma feature: mover para `em_progresso`.
- Ao terminar: mover para `completo` e linkar PR/commit.
- Ao receber validação de Janaina/Wendel: mover para `validado`.
- Se descobrir um item que falta: adicionar nova linha aqui antes de
  implementar.

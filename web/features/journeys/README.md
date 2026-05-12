# features/journeys

Jornadas (planejada, individual, padrão) e os passos de cada uma.

## Cobre da metodologia
- `2.1 Mapeamento JorPlanejada` — jornada planejada estruturada.
- `JU.Individual 01..05` — jornadas individuais por participante.
- `2.2 Mapeamento JorPadrão` + `# Tabela JorPadrão` — jornada padrão.
- `JP. Cpto.Ord.Dur.Clas` — comportamento, ordem, duração, classificação por passo.

## Tabelas principais
- `jornada` (uma tabela com `tipo_jornada` discriminando)
- `passo_jornada` (substitui o antigo `tempo_etapa`; permite ordem real,
  desvios, repetições, passos extras)

## Por que uma tabela só de jornada
A planilha trata as três como conceitos distintos, mas o esquema
relacional fica mais limpo com discriminador. Reduz duplicação de joins
e mantém histórico unificado.

## Server Actions (futuro)
- `salvarJornadaPlanejada(processo_id, passos[])`
- `salvarJornadaIndividual(processo_id, participante_id, passos[])`
- `consolidarJornadaPadrao(processo_id)` — algoritmo de convergência das
  individuais. Definir regra exata na Fase 3.
- `validarJornada(jornada_id)` — marca como pronta para análise.

## Telas (futuro)
- `/processos/[id]/jornada-planejada`
- `/processos/[id]/jornadas/[id]` (individual)
- `/processos/[id]/jornada-padrao`
